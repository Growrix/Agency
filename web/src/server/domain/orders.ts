import "server-only";

import Stripe from "stripe";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { OrderItemRecord, OrderRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { getCheckoutHref, getShopProduct } from "@/lib/shop";

type CreateOrderInput = {
  product_slug: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
  requestId?: string;
  ip?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseUsdPriceToCents(value: string) {
  const normalized = value.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    throw new ApiError("INTERNAL_ERROR", 500, "Product price could not be parsed.");
  }

  return Math.round(parsed * 100);
}

function buildOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `ORD-${date}-${suffix}`;
}

function createStripeClient() {
  const runtime = getRuntimeConfig();
  if (!runtime.stripe.secretKey) {
    return null;
  }

  return new Stripe(runtime.stripe.secretKey);
}

export async function createOrder(input: CreateOrderInput) {
  if (!input.customer_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Customer name is required.");
  }

  if (!EMAIL_REGEX.test(input.customer_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const product = getShopProduct(input.product_slug);
  if (!product || product.published === false) {
    throw new ApiError("NOT_FOUND", 404, "Selected product could not be found.");
  }

  const unitPriceCents = parseUsdPriceToCents(product.price);
  const orderItem: OrderItemRecord = {
    product_slug: product.slug,
    product_name: product.name,
    quantity: 1,
    unit_price_cents: unitPriceCents,
    total_cents: unitPriceCents,
  };

  const now = new Date().toISOString();
  const order: OrderRecord = {
    id: crypto.randomUUID(),
    order_number: buildOrderNumber(),
    customer_name: input.customer_name.trim(),
    customer_email: input.customer_email.trim().toLowerCase(),
    customer_phone: input.customer_phone?.trim() || undefined,
    payment_status: "pending",
    fulfillment_status: "pending",
    subtotal_cents: unitPriceCents,
    tax_cents: 0,
    discount_cents: 0,
    total_cents: unitPriceCents,
    currency: "USD",
    items: [orderItem],
    delivery_urls: [],
    notes: input.notes?.trim() || undefined,
    created_at: now,
  };

  await writeDatabase((next) => ({
    ...next,
    orders: [order, ...next.orders],
  }));

  const runtime = getRuntimeConfig();
  const stripe = createStripeClient();
  let checkoutUrl: string | null = null;

  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${runtime.appBaseUrl}/checkout?product=${product.slug}&status=success&order=${order.id}`,
      cancel_url: `${runtime.appBaseUrl}${getCheckoutHref(product)}&status=cancelled`,
      customer_email: order.customer_email,
      metadata: {
        orderId: order.id,
        productSlug: product.slug,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitPriceCents,
            product_data: {
              name: product.name,
              description: product.summary,
            },
          },
        },
      ],
    });

    checkoutUrl = session.url;

    await writeDatabase((next) => ({
      ...next,
      orders: next.orders.map((entry) =>
        entry.id === order.id
          ? { ...entry, stripe_checkout_session_id: session.id }
          : entry
      ),
    }));
  }

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "checkout_started",
      route: "/checkout",
      source: "checkout_form",
      actor_email: order.customer_email,
      metadata: {
        order_id: order.id,
        product_slug: product.slug,
        stripe_ready: Boolean(checkoutUrl),
      },
    }),
    recordAuditLog({
      level: "info",
      action: "order.created",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: order.customer_email,
      metadata: {
        order_id: order.id,
        product_slug: product.slug,
        stripe_ready: Boolean(checkoutUrl),
      },
    }),
  ]);

  return {
    order,
    checkout_url: checkoutUrl,
    integration_ready: Boolean(checkoutUrl),
  };
}

export async function getOrderById(orderId: string) {
  const database = await readDatabase();
  return database.orders.find((order) => order.id === orderId) ?? null;
}

export async function listOrders() {
  const database = await readDatabase();
  return database.orders;
}

export async function listOrdersByEmail(email: string) {
  const database = await readDatabase();
  return database.orders.filter((order) => order.customer_email === email.toLowerCase());
}

export async function markOrderPaid(orderId: string, paymentIntentId?: string): Promise<OrderRecord | null> {
  const runtime = getRuntimeConfig();
  let updatedOrder: OrderRecord | null = null;
  await writeDatabase((next) => ({
    ...next,
    orders: next.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      updatedOrder = {
        ...order,
        payment_status: "succeeded",
        fulfillment_status: "delivered",
        stripe_payment_intent_id: paymentIntentId,
        delivery_urls: [`${runtime.appBaseUrl}/api/v1/orders/${order.id}/download`],
        completed_at: new Date().toISOString(),
      };

      return updatedOrder;
    }),
  }));

  return updatedOrder;
}

export async function markOrderFailed(orderId: string): Promise<OrderRecord | null> {
  let updatedOrder: OrderRecord | null = null;
  await writeDatabase((next) => ({
    ...next,
    orders: next.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      updatedOrder = { ...order, payment_status: "failed" };
      return updatedOrder;
    }),
  }));

  return updatedOrder;
}

export async function handleStripeWebhook(payload: string, signature: string | null) {
  const runtime = getRuntimeConfig();
  const stripe = createStripeClient();
  if (!stripe || !runtime.stripe.webhookSecret) {
    throw new ApiError("SERVICE_UNAVAILABLE", 503, "Stripe webhook is not configured.");
  }

  if (!signature) {
    throw new ApiError("INVALID_REQUEST", 400, "Missing Stripe signature.");
  }

  const event = stripe.webhooks.constructEvent(payload, signature, runtime.stripe.webhookSecret);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = typeof session.metadata?.orderId === "string" ? session.metadata.orderId : null;
    if (orderId) {
      const order = await markOrderPaid(orderId, typeof session.payment_intent === "string" ? session.payment_intent : undefined);
      await recordAuditLog({
        level: "info",
        action: "order.payment_succeeded",
        metadata: {
          order_id: orderId,
          stripe_session_id: session.id,
          delivery_urls: order?.delivery_urls ?? [],
        },
      });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = typeof session.metadata?.orderId === "string" ? session.metadata.orderId : null;
    if (orderId) {
      await markOrderFailed(orderId);
    }
  }

  return event.type;
}
