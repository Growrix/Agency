import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { createOrder } from "@/server/domain/orders";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const items = Array.isArray(body.items)
      ? body.items
          .filter((entry): entry is Record<string, unknown> => typeof entry === "object" && entry !== null)
          .map((entry) => ({
            product_slug: typeof entry.product_slug === "string" ? entry.product_slug : "",
            product_name: typeof entry.product_name === "string" ? entry.product_name : undefined,
            variant_slug: typeof entry.variant_slug === "string" ? entry.variant_slug : undefined,
            tier_name: typeof entry.tier_name === "string" ? entry.tier_name : undefined,
            fulfillment_type: typeof entry.fulfillment_type === "string" ? entry.fulfillment_type : undefined,
            quantity: typeof entry.quantity === "number" ? entry.quantity : undefined,
            unit_price_cents: typeof entry.unit_price_cents === "number" ? entry.unit_price_cents : undefined,
          }))
      : undefined;
    assertNoBotTrap(body.website);
    assertRateLimit({
      scope: "orders",
      identifier: context.ip,
      limit: 6,
    });

    const result = await createOrder({
      product_slug: typeof body.product_slug === "string" ? body.product_slug : "",
      product_variant_slug: typeof body.product_variant_slug === "string" ? body.product_variant_slug : undefined,
      product_tier_name: typeof body.product_tier_name === "string" ? body.product_tier_name : undefined,
      fulfillment_type: typeof body.fulfillment_type === "string" ? body.fulfillment_type : undefined,
      items,
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
