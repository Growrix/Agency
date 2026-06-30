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
import { syncOrderEntitlements } from "@/server/domain/downloads";
import {
  safeSendDownloadReadyEmail,
  safeSendPurchaseConfirmationEmail,
} from "@/server/domain/commerce-emails";
import { dispatchNotification } from "@/server/domain/notifications";
import { notifyTeam } from "@/server/domain/team-notifications";
import { fireOrUndefined as createCustomerNotification } from "@/server/domain/customer-notifications";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { getCheckoutHref } from "@/lib/shop";

type CreateOrderInput = {
  product_slug: string;
  product_variant_slug?: string;
  product_tier_name?: string;
  fulfillment_type?: string;
  items?: Array<{
    product_slug: string;
    product_name?: string;
    variant_slug?: string;
    tier_name?: string;
    fulfillment_type?: string;
    quantity?: number;
    unit_price_cents?: number;
  }>;
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

function normalizeSelectionValue(value: string | undefined) {
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeVariantSlug(value: string | undefined) {
  const normalized = normalizeSelectionValue(value);
  if (!normalized) {
    return undefined;
  }

  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function createOrder(input: CreateOrderInput) {
  if (!input.customer_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Customer name is required.");
  }

  if (!EMAIL_REGEX.test(input.customer_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const requestedCartItems = (input.items ?? []).filter((item) => item.product_slug.trim().length > 0);
  const hasCartItems = requestedCartItems.length > 0;

  if (!hasCartItems && !input.product_slug.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "A product is required to create an order.");
  }

  const itemRequests = hasCartItems
    ? requestedCartItems.map((item) => ({
        productSlug: item.product_slug,
        variantSlug: item.variant_slug,
        tierName: item.tier_name,
        fulfillmentType: item.fulfillment_type,
        quantity: item.quantity,
      }))
    : [
        {
          productSlug: input.product_slug,
          variantSlug: input.product_variant_slug,
          tierName: input.product_tier_name,
          fulfillmentType: input.fulfillment_type,
          quantity: 1,
        },
      ];

  const resolvedItems = await Promise.all(
    itemRequests.map(async (item) => {
      const product = await getPublicShopProduct(item.productSlug);
      if (!product || product.published === false) {
        throw new ApiError("NOT_FOUND", 404, `Selected product could not be found: ${item.productSlug}`);
      }

      const unitPriceCents = parseUsdPriceToCents(product.price);
      const quantity = Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity ?? 1)) : 1;
      const selectedVariantSlug = normalizeVariantSlug(item.variantSlug);
      const selectedTierName = normalizeSelectionValue(item.tierName);
      const selectedFulfillmentType = normalizeVariantSlug(item.fulfillmentType);

      return {
        product,
        orderItem: {
          product_slug: product.slug,
          product_name: product.name,
          product_variant_slug: selectedVariantSlug,
          product_tier_name: selectedTierName,
          fulfillment_type: selectedFulfillmentType,
          quantity,
          unit_price_cents: unitPriceCents,
          total_cents: unitPriceCents * quantity,
        } satisfies OrderItemRecord,
      };
    })
  );

  const orderItems = resolvedItems.map((entry) => entry.orderItem);
  const primaryProduct = resolvedItems[0]?.product;
  const primaryOrderItem = orderItems[0];
  const subtotalCents = orderItems.reduce((sum, item) => sum + item.total_cents, 0);

  const now = new Date().toISOString();
  const order: OrderRecord = {
    id: crypto.randomUUID(),
    order_number: buildOrderNumber(),
    customer_name: input.customer_name.trim(),
    customer_email: input.customer_email.trim().toLowerCase(),
    customer_phone: input.customer_phone?.trim() || undefined,
    payment_status: "pending",
    fulfillment_status: "pending",
    subtotal_cents: subtotalCents,
    tax_cents: 0,
    discount_cents: 0,
    total_cents: subtotalCents,
    currency: "USD",
    items: orderItems,
    selected_variant_slug: primaryOrderItem?.product_variant_slug,
    selected_tier_name: primaryOrderItem?.product_tier_name,
    selected_fulfillment_type: primaryOrderItem?.fulfillment_type,
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

  if (stripe && primaryProduct) {
    const successUrl = new URL("/success", runtime.appBaseUrl);
    successUrl.searchParams.set("order", order.id);
    successUrl.searchParams.set("product", primaryProduct.slug);

    const checkoutSelection = {
      variantSlug: order.selected_variant_slug,
      tierName: order.selected_tier_name,
      fulfillmentType: order.selected_fulfillment_type,
    };

    if (checkoutSelection.variantSlug) {
      successUrl.searchParams.set("variant", checkoutSelection.variantSlug);
    }

    if (checkoutSelection.tierName) {
      successUrl.searchParams.set("tier", checkoutSelection.tierName);
    }

    if (checkoutSelection.fulfillmentType) {
      successUrl.searchParams.set("fulfillment", checkoutSelection.fulfillmentType);
    }

    const cancelHref = hasCartItems
      ? "/checkout?cart=1"
      : getCheckoutHref(primaryProduct, checkoutSelection);
    const cancelUrl = new URL(cancelHref, runtime.appBaseUrl);
    cancelUrl.searchParams.set("status", "cancelled");

    const checkoutMetadata: Record<string, string> = {
      orderId: order.id,
      productSlug: primaryProduct.slug,
    };

    if (order.selected_variant_slug) {
      checkoutMetadata.variantSlug = order.selected_variant_slug;
    }

    if (order.selected_tier_name) {
      checkoutMetadata.tierName = order.selected_tier_name;
    }

    if (order.selected_fulfillment_type) {
      checkoutMetadata.fulfillmentType = order.selected_fulfillment_type;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      customer_email: order.customer_email,
      metadata: checkoutMetadata,
      line_items: resolvedItems.map(({ product, orderItem }) => {
        const lineItemName = orderItem.product_tier_name
          ? `${product.name} - ${orderItem.product_tier_name}`
          : product.name;
        const lineItemDescription = [
          product.summary,
          orderItem.fulfillment_type ? `Fulfillment: ${orderItem.fulfillment_type}` : null,
        ]
          .filter((value): value is string => Boolean(value))
          .join(" | ");

        return {
          quantity: orderItem.quantity,
          price_data: {
            currency: "usd",
            unit_amount: orderItem.unit_price_cents,
            product_data: {
              name: lineItemName,
              description: lineItemDescription,
            },
          },
        };
      }),
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
        product_slug: primaryProduct?.slug,
        variant_slug: order.selected_variant_slug ?? null,
        tier_name: order.selected_tier_name ?? null,
        fulfillment_type: order.selected_fulfillment_type ?? null,
        item_count: order.items.length,
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
        product_slug: primaryProduct?.slug,
        variant_slug: order.selected_variant_slug ?? null,
        tier_name: order.selected_tier_name ?? null,
        fulfillment_type: order.selected_fulfillment_type ?? null,
        item_count: order.items.length,
        stripe_ready: Boolean(checkoutUrl),
      },
    }),
    notifyTeam({
      kind: "purchase_created",
      subject: `New order created: ${order.order_number}`,
      text: [
        `Order: ${order.order_number}`,
        `Customer: ${order.customer_name ?? "N/A"} <${order.customer_email}>`,
        `Phone: ${order.customer_phone ?? "N/A"}`,
        `Total: ${(order.total_cents / 100).toFixed(2)} ${order.currency.toUpperCase()}`,
        `Stripe ready: ${checkoutUrl ? "yes" : "no"}`,
        ``,
        `Items:`,
        ...order.items.map(
          (item) =>
            `  - ${item.product_name}${item.product_tier_name ? ` (${item.product_tier_name})` : ""} x${item.quantity} — ${(item.unit_price_cents / 100).toFixed(2)}`,
        ),
        order.notes ? `\nNotes:\n${order.notes}` : "",
      ]
        .filter((line) => line !== "")
        .join("\n"),
      replyTo: order.customer_email,
      payload: {
        order_id: order.id,
        order_number: order.order_number,
        customer_email: order.customer_email,
        total_cents: order.total_cents,
        currency: order.currency,
        item_count: order.items.length,
        stripe_ready: Boolean(checkoutUrl),
      },
      relatedOrderId: order.id,
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

type StripeCheckoutSelection = {
  variantSlug?: string;
  tierName?: string;
  fulfillmentType?: string;
};

export async function markOrderPaid(
  orderId: string,
  paymentIntentId?: string,
  selection?: StripeCheckoutSelection,
): Promise<OrderRecord | null> {
  const selectedVariantSlug = normalizeVariantSlug(selection?.variantSlug);
  const selectedTierName = normalizeSelectionValue(selection?.tierName);
  const selectedFulfillmentType = normalizeVariantSlug(selection?.fulfillmentType);

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

      const nextVariantSlug = selectedVariantSlug ?? order.selected_variant_slug;
      const nextTierName = selectedTierName ?? order.selected_tier_name;
      const nextFulfillmentType = selectedFulfillmentType ?? order.selected_fulfillment_type;

      updatedOrder = {
        ...order,
        payment_status: "succeeded",
        fulfillment_status: nextFulfillment,
        stripe_payment_intent_id: paymentIntentId ?? order.stripe_payment_intent_id,
        selected_variant_slug: nextVariantSlug,
        selected_tier_name: nextTierName,
        selected_fulfillment_type: nextFulfillmentType,
        items: order.items.map((item) => ({
          ...item,
          product_variant_slug: nextVariantSlug ?? item.product_variant_slug,
          product_tier_name: nextTierName ?? item.product_tier_name,
          fulfillment_type: nextFulfillmentType ?? item.fulfillment_type,
        })),
      };

      return updatedOrder;
    }),
  }));

  if (updatedOrder) {
    await syncOrderEntitlements(updatedOrder);
    const paidOrder: OrderRecord = updatedOrder;
    if (paidOrder.payment_status === "succeeded") {
      await safeSendPurchaseConfirmationEmail(paidOrder);
      await createCustomerNotification({
        userEmail: paidOrder.customer_email,
        kind: "order_completed",
        title: `Payment received for ${paidOrder.order_number}`,
        body: `Your order is now in fulfillment. We will notify you when downloads are ready.`,
        href: `/dashboard/orders/${paidOrder.id}`,
        relatedOrderId: paidOrder.id,
      });
      try {
        await dispatchNotification({
          kind: "purchase_completed",
          title: `Purchase completed for order ${paidOrder.order_number}`,
          payload: {
            order_id: paidOrder.id,
            order_number: paidOrder.order_number,
            customer_email: paidOrder.customer_email,
            total_cents: paidOrder.total_cents,
            currency: paidOrder.currency,
            product_slug: paidOrder.items[0]?.product_slug,
            fulfillment_status: paidOrder.fulfillment_status,
          },
          relatedOrderId: paidOrder.id,
        });
      } catch (error) {
        await recordAuditLog({
          level: "warning",
          action: "order.notification_purchase_failed",
          metadata: {
            order_id: paidOrder.id,
            error: error instanceof Error ? error.message : "unknown",
          },
        });
      }
    }
  }

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

  if (updatedOrder) {
    await syncOrderEntitlements(updatedOrder);
    const opsOrder: OrderRecord = updatedOrder;
    if (
      opsOrder.fulfillment_status === "delivered" &&
      opsOrder.payment_status === "succeeded" &&
      opsOrder.delivery_urls.length > 0
    ) {
      await safeSendDownloadReadyEmail(opsOrder);
      await createCustomerNotification({
        userEmail: opsOrder.customer_email,
        kind: "download_ready",
        title: `Your downloads are ready · ${opsOrder.order_number}`,
        body: `${opsOrder.delivery_urls.length} delivery link${opsOrder.delivery_urls.length === 1 ? "" : "s"} available from your dashboard.`,
        href: `/dashboard/orders/${opsOrder.id}`,
        relatedOrderId: opsOrder.id,
      });
      try {
        await dispatchNotification({
          kind: "download_issued",
          title: `Downloads delivered for order ${opsOrder.order_number}`,
          payload: {
            order_id: opsOrder.id,
            order_number: opsOrder.order_number,
            customer_email: opsOrder.customer_email,
            delivery_urls: opsOrder.delivery_urls,
            product_slug: opsOrder.items[0]?.product_slug,
          },
          relatedOrderId: opsOrder.id,
        });
      } catch (error) {
        await recordAuditLog({
          level: "warning",
          action: "order.notification_download_failed",
          metadata: {
            order_id: opsOrder.id,
            error: error instanceof Error ? error.message : "unknown",
          },
        });
      }
    }
  }

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
    const variantSlug = typeof session.metadata?.variantSlug === "string"
      ? session.metadata.variantSlug
      : undefined;
    const tierName = typeof session.metadata?.tierName === "string"
      ? session.metadata.tierName
      : undefined;
    const fulfillmentType = typeof session.metadata?.fulfillmentType === "string"
      ? session.metadata.fulfillmentType
      : undefined;

    if (orderId) {
      const order = await markOrderPaid(
        orderId,
        typeof session.payment_intent === "string" ? session.payment_intent : undefined,
        {
          variantSlug,
          tierName,
          fulfillmentType,
        },
      );
      await recordAuditLog({
        level: "info",
        action: "order.payment_succeeded",
        metadata: {
          order_id: orderId,
          stripe_session_id: session.id,
          variant_slug: order?.selected_variant_slug ?? null,
          tier_name: order?.selected_tier_name ?? null,
          fulfillment_type: order?.selected_fulfillment_type ?? null,
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
