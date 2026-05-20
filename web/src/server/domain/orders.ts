import "server-only";

import Stripe from "stripe";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import type {
  OrderFulfillmentStatus,
  OrderItemRecord,
  OrderPaymentStatus,
  OrderRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { getPublicShopProduct } from "@/server/domain/catalog";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { getCheckoutHref } from "@/lib/shop";

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

const PAYMENT_TRANSITIONS: Record<OrderPaymentStatus, OrderPaymentStatus[]> = {
  pending: ["succeeded", "failed"],
  succeeded: ["refunded"],
  failed: ["pending"],
  refunded: [],
};

const FULFILLMENT_TRANSITIONS: Record<OrderFulfillmentStatus, OrderFulfillmentStatus[]> = {
  pending: ["intake_pending", "fulfilling", "archived"],
  intake_pending: ["fulfilling", "archived"],
  fulfilling: ["qa_review", "delivered", "archived"],
  qa_review: ["fulfilling", "delivered", "archived"],
  delivered: ["archived"],
  archived: [],
};

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
  if (!runtime.stripe.secretKey || !runtime.stripe.webhookSecret) {
    return null;
  }

  return new Stripe(runtime.stripe.secretKey);
}

function canTransitionPayment(current: OrderPaymentStatus, next: OrderPaymentStatus) {
  return current === next || PAYMENT_TRANSITIONS[current].includes(next);
}

function canTransitionFulfillment(current: OrderFulfillmentStatus, next: OrderFulfillmentStatus) {
  return current === next || FULFILLMENT_TRANSITIONS[current].includes(next);
}

function normalizeDeliveryUrls(input: string[] | undefined) {
  if (!input) {
    return undefined;
  }

  return input.map((value) => value.trim()).filter(Boolean);
}

function normalizeNotes(notes: string | undefined) {
  if (notes === undefined) {
    return undefined;
  }

  const trimmed = notes.trim();
  return trimmed ? trimmed : null;
}

export async function createOrder(input: CreateOrderInput) {
  if (!input.customer_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Customer name is required.");
  }

  if (!EMAIL_REGEX.test(input.customer_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const product = await getPublicShopProduct(input.product_slug);
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
  let updatedOrder: OrderRecord | null = null;
  await writeDatabase((next) => ({
    ...next,
    orders: next.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      if (order.payment_status === "succeeded") {
        updatedOrder = order;
        return order;
      }

      const nextFulfillment: OrderFulfillmentStatus =
        order.fulfillment_status === "pending" ? "intake_pending" : order.fulfillment_status;

      updatedOrder = {
        ...order,
        payment_status: "succeeded",
        fulfillment_status: nextFulfillment,
        stripe_payment_intent_id: paymentIntentId ?? order.stripe_payment_intent_id,
      };

      return updatedOrder;
    }),
  }));

  return updatedOrder;
}

export type UpdateOrderOperationsInput = {
  payment_status?: OrderPaymentStatus;
  fulfillment_status?: OrderFulfillmentStatus;
  delivery_urls?: string[];
  notes?: string;
};

export async function updateOrderOperations(
  orderId: string,
  input: UpdateOrderOperationsInput,
): Promise<OrderRecord | null> {
  if (
    input.payment_status === undefined &&
    input.fulfillment_status === undefined &&
    input.delivery_urls === undefined &&
    input.notes === undefined
  ) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "At least one order update field is required.");
  }

  const normalizedDeliveryUrls = normalizeDeliveryUrls(input.delivery_urls);
  const normalizedNotes = normalizeNotes(input.notes);

  let updatedOrder: OrderRecord | null = null;
  await writeDatabase((next) => ({
    ...next,
    orders: next.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      const nextOrder: OrderRecord = { ...order };

      if (input.payment_status) {
        if (!canTransitionPayment(order.payment_status, input.payment_status)) {
          throw new ApiError(
            "CONFLICT",
            409,
            `Invalid payment status transition: ${order.payment_status} -> ${input.payment_status}.`,
          );
        }

        nextOrder.payment_status = input.payment_status;

        if (input.payment_status === "refunded") {
          nextOrder.refunded_at = new Date().toISOString();
        }
      }

      if (normalizedDeliveryUrls !== undefined) {
        nextOrder.delivery_urls = normalizedDeliveryUrls;
      }

      if (input.notes !== undefined) {
        nextOrder.notes = normalizedNotes ?? undefined;
      }

      if (input.fulfillment_status) {
        if (!canTransitionFulfillment(order.fulfillment_status, input.fulfillment_status)) {
          throw new ApiError(
            "CONFLICT",
            409,
            `Invalid fulfillment status transition: ${order.fulfillment_status} -> ${input.fulfillment_status}.`,
          );
        }

        if (input.fulfillment_status === "delivered" && nextOrder.delivery_urls.length === 0) {
          throw new ApiError(
            "MISSING_REQUIRED_FIELD",
            400,
            "Delivery URL is required before marking an order as delivered.",
          );
        }

        nextOrder.fulfillment_status = input.fulfillment_status;
        if (input.fulfillment_status === "delivered") {
          nextOrder.completed_at = nextOrder.completed_at ?? new Date().toISOString();
        }
      }

      updatedOrder = nextOrder;
      return nextOrder;
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
