import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { listOrders } from "@/server/domain/orders";
import type { OrderFulfillmentStatus, OrderPaymentStatus } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const PAYMENT_FILTERS: OrderPaymentStatus[] = ["pending", "succeeded", "failed", "refunded"];

const FULFILLMENT_FILTERS: Array<OrderFulfillmentStatus | "pending" | "fulfilled"> = [
  "pending",
  "fulfilled",
  "intake_pending",
  "fulfilling",
  "qa_review",
  "delivered",
  "archived",
];

function parseIntValue(value: string | null, fallback: number, max: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

function isFulfilledStatus(status: OrderFulfillmentStatus) {
  return status === "delivered" || status === "archived";
}

function matchesFulfillmentFilter(
  status: OrderFulfillmentStatus,
  filter: OrderFulfillmentStatus | "pending" | "fulfilled" | undefined,
) {
  if (!filter) return true;
  if (filter === "pending") return !isFulfilledStatus(status);
  if (filter === "fulfilled") return isFulfilledStatus(status);
  return status === filter;
}

function matchesSearch(
  order: Awaited<ReturnType<typeof listOrders>>[number],
  search: string | undefined,
) {
  if (!search) return true;
  const q = search.toLowerCase();
  const itemSummary = order.items
    .map((item) => `${item.product_name} ${item.product_slug} ${item.product_tier_name ?? ""}`)
    .join(" ")
    .toLowerCase();
  const haystack = [
    order.order_number,
    order.customer_name,
    order.customer_email,
    order.notes,
    itemSummary,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);

    const search = url.searchParams.get("q")?.trim() || undefined;

    const paymentFilterRaw = url.searchParams.get("payment")?.trim();
    const paymentFilter =
      paymentFilterRaw && PAYMENT_FILTERS.includes(paymentFilterRaw as OrderPaymentStatus)
        ? (paymentFilterRaw as OrderPaymentStatus)
        : undefined;

    const fulfillmentFilterRaw = url.searchParams.get("fulfillment")?.trim();
    const fulfillmentFilter =
      fulfillmentFilterRaw &&
      FULFILLMENT_FILTERS.includes(fulfillmentFilterRaw as OrderFulfillmentStatus | "pending" | "fulfilled")
        ? (fulfillmentFilterRaw as OrderFulfillmentStatus | "pending" | "fulfilled")
        : undefined;

    const limit = parseIntValue(url.searchParams.get("limit"), 250, 1_000);
    const offset = parseIntValue(url.searchParams.get("offset"), 0, 10_000);

    const allOrders = await listOrders();
    const filtered = allOrders
      .filter((order) => (paymentFilter ? order.payment_status === paymentFilter : true))
      .filter((order) => matchesFulfillmentFilter(order.fulfillment_status, fulfillmentFilter))
      .filter((order) => matchesSearch(order, search))
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return successResponse(filtered.slice(offset, offset + limit));
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load orders."));
  }
}
