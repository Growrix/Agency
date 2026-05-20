import { NextRequest } from "next/server";
import { requireAdminUser } from "@/server/auth/guards";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import type { OrderFulfillmentStatus, OrderPaymentStatus } from "@/server/data/schema";
import { getOrderById, updateOrderOperations } from "@/server/domain/orders";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

const PAYMENT_STATUSES: OrderPaymentStatus[] = ["pending", "succeeded", "failed", "refunded"];
const FULFILLMENT_STATUSES: OrderFulfillmentStatus[] = [
  "pending",
  "intake_pending",
  "fulfilling",
  "qa_review",
  "delivered",
  "archived",
];

function parsePaymentStatus(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || !PAYMENT_STATUSES.includes(value as OrderPaymentStatus)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid payment_status value.");
  }

  return value as OrderPaymentStatus;
}

function parseFulfillmentStatus(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || !FULFILLMENT_STATUSES.includes(value as OrderFulfillmentStatus)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid fulfillment_status value.");
  }

  return value as OrderFulfillmentStatus;
}

function parseDeliveryUrls(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "delivery_urls must be an array of strings.");
  }

  return value;
}

function parseNotes(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "notes must be a string.");
  }

  return value;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { orderId } = await context.params;
    const order = await getOrderById(orderId);

    if (!order) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    return successResponse(order);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load order."));
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const requestContext = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const { orderId } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    const paymentStatus = parsePaymentStatus(body.payment_status);
    const fulfillmentStatus = parseFulfillmentStatus(body.fulfillment_status);
    const deliveryUrls = parseDeliveryUrls(body.delivery_urls);
    const notes = parseNotes(body.notes);

    const updatedOrder = await updateOrderOperations(orderId, {
      payment_status: paymentStatus,
      fulfillment_status: fulfillmentStatus,
      delivery_urls: deliveryUrls,
      notes,
    });

    if (!updatedOrder) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    await recordAuditLog({
      level: "info",
      action: "admin.order_updated",
      request_id: requestContext.requestId,
      ip: requestContext.ip,
      actor_email: admin.email,
      metadata: {
        order_id: orderId,
        payment_status: paymentStatus ?? null,
        fulfillment_status: fulfillmentStatus ?? null,
        delivery_urls_updated: deliveryUrls !== undefined,
        notes_updated: notes !== undefined,
      },
    });

    return successResponse(updatedOrder);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update order."));
  }
}
