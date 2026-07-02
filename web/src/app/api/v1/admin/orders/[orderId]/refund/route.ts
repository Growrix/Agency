import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { refundOrder } from "@/server/domain/orders";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { orderId } = await context.params;

    const result = await refundOrder(orderId, admin.email);

    return successResponse({
      order: result.order,
      stripe_refund_id: result.refundId,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to issue refund."),
    );
  }
}
