import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { createOrder } from "@/server/domain/orders";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    assertNoBotTrap(body.website);
    assertRateLimit({
      scope: "orders",
      identifier: context.ip,
      limit: 6,
    });

    const result = await createOrder({
      product_slug: typeof body.product_slug === "string" ? body.product_slug : "",
      customer_name: typeof body.customer_name === "string" ? body.customer_name : "",
      customer_email: typeof body.customer_email === "string" ? body.customer_email : "",
      customer_phone: typeof body.customer_phone === "string" ? body.customer_phone : undefined,
      notes: typeof body.notes === "string" ? body.notes : undefined,
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse(result, { status: 201 });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create order."));
  }
}
