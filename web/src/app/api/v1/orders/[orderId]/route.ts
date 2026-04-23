import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { getOrderById } from "@/server/domain/orders";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { orderId } = await context.params;
    const order = await getOrderById(orderId);
    if (!order) {
      throw new ApiError("NOT_FOUND", 404, "Order not found.");
    }

    if (user.role !== "admin" && order.customer_email !== user.email.toLowerCase()) {
      throw new ApiError("FORBIDDEN", 403, "You do not have access to this order.");
    }

    return successResponse(order);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load order."));
  }
}
