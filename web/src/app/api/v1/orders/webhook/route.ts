import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { handleStripeWebhook } from "@/server/domain/orders";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");
    const eventType = await handleStripeWebhook(payload, signature);
    return successResponse({ received: true, event_type: eventType });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to process Stripe webhook."));
  }
}
