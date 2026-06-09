import { NextRequest, NextResponse } from "next/server";
import { ApiError, errorResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { createAuthorizedDownloadUrl, listDownloadsByOrderId } from "@/server/domain/downloads";
import { getOrderById } from "@/server/domain/orders";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
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

    if (order.fulfillment_status !== "delivered") {
      throw new ApiError("CONFLICT", 409, "Order fulfillment is not complete yet.");
    }

    const downloads = await listDownloadsByOrderId(order.id);
    const primaryDownload = downloads[0];
    if (!primaryDownload) {
      throw new ApiError("CONFLICT", 409, "No downloadable asset has been issued for this order yet.");
    }

    const result = await createAuthorizedDownloadUrl(primaryDownload.id, user.email, user.role === "admin");

    let redirectUrl: URL;
    try {
      redirectUrl = new URL(result.download_url);
    } catch {
      redirectUrl = new URL(result.download_url, request.nextUrl.origin);
    }

    return NextResponse.redirect(redirectUrl, 307);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to download order."));
  }
}
