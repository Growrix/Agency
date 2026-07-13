import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { listOrdersForUser } from "@/server/domain/orders";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const orders = await listOrdersForUser({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return successResponse(orders);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load orders."));
  }
}
