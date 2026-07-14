import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { canAccessOrderByUser, getOrderById, updateOrderOperations } from "@/server/domain/orders";
import { safeSendOrderCancellationEmail } from "@/server/domain/commerce-emails";
import { createCustomerNotification } from "@/server/domain/customer-notifications";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

function assertOrderAccess(
  order: { customer_email: string; user_id?: string },
  user: { id: string; email: string; role: string },
) {
  if (!canAccessOrderByUser(order, user)) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this order.");
  }
}

function parseNotes(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "notes must be a string.");
  }

  const trimmed = value.trim();
  if (trimmed.length > 2_000) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "notes must be 2000 characters or less.");
  }

  return value;
}

function parseCancelFlag(value: unknown) {
  if (value === undefined) {
    return false;
  }

  if (typeof value !== "boolean") {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "cancel must be a boolean.");
  }

  return value;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCompletedSubscriber(request);
    const { orderId } = await context.params;
    const order = await getOrderById(orderId);

    if (!order) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    assertOrderAccess(order, user);

    return successResponse(order);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load order."),
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const requestContext = createRequestContext(request);

  try {
    const user = await requireCompletedSubscriber(request);
    const { orderId } = await context.params;
    const existing = await getOrderById(orderId);

    if (!existing) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    assertOrderAccess(existing, user);

    const body = (await request.json().catch(() => ({}))) as {
      notes?: unknown;
      cancel?: unknown;
    };

    const notes = parseNotes(body.notes);
    const cancel = parseCancelFlag(body.cancel);

    if (notes === undefined && !cancel) {
      throw new ApiError(
        "MISSING_REQUIRED_FIELD",
        400,
        "Provide at least one update field (notes or cancel).",
      );
    }

    if (cancel && ["delivered", "archived"].includes(existing.fulfillment_status)) {
      throw new ApiError(
        "CONFLICT",
        409,
        "This order can no longer be cancelled.",
      );
    }

    const updatedOrder = await updateOrderOperations(orderId, {
      notes,
      fulfillment_status: cancel ? "archived" : undefined,
    });

    if (!updatedOrder) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    if (cancel) {
      await safeSendOrderCancellationEmail(updatedOrder);
      await createCustomerNotification({
        userEmail: updatedOrder.customer_email,
        kind: "submission_status",
        title: `Order cancelled: ${updatedOrder.order_number}`,
        body:
          "Your order was cancelled as requested. Browse our digital products or consult with our team if you'd like help choosing the right next step.",
        href: `/dashboard/orders/${updatedOrder.id}`,
        relatedOrderId: updatedOrder.id,
      }).catch(() => undefined);
    }

    await recordAuditLog({
      level: "info",
      action: "customer.order_updated",
      request_id: requestContext.requestId,
      ip: requestContext.ip,
      actor_email: user.email,
      metadata: {
        order_id: orderId,
        notes_updated: notes !== undefined,
        cancelled: cancel,
      },
    });

    return successResponse(updatedOrder);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update order."),
    );
  }
}
