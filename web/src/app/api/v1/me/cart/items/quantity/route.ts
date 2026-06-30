import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { updateCartQuantity } from "@/server/domain/cart";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const productSlug = typeof body.product_slug === "string" ? body.product_slug : null;
    const quantity = typeof body.quantity === "number" ? body.quantity : null;

    if (!productSlug) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "product_slug is required.");
    }
    if (quantity === null || !Number.isFinite(quantity)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "quantity is required.");
    }

    const view = await updateCartQuantity(
      user.id,
      {
        product_slug: productSlug,
        product_variant_slug:
          typeof body.product_variant_slug === "string" ? body.product_variant_slug : undefined,
        product_tier_name:
          typeof body.product_tier_name === "string" ? body.product_tier_name : undefined,
      },
      quantity,
    );

    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to update cart quantity."),
    );
  }
}
