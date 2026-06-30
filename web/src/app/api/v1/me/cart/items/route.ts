import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { addCartItem, removeCartItem, type CartItemInput } from "@/server/domain/cart";

export const dynamic = "force-dynamic";

function parseItem(value: unknown): CartItemInput | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.product_slug !== "string" || item.product_slug.trim() === "") return null;
  if (typeof item.product_name !== "string" || item.product_name.trim() === "") return null;
  if (typeof item.quantity !== "number" || !Number.isFinite(item.quantity)) return null;
  if (typeof item.unit_price_cents !== "number" || !Number.isFinite(item.unit_price_cents)) return null;
  return {
    product_slug: item.product_slug,
    product_name: item.product_name,
    product_variant_slug:
      typeof item.product_variant_slug === "string" ? item.product_variant_slug : undefined,
    product_tier_name:
      typeof item.product_tier_name === "string" ? item.product_tier_name : undefined,
    fulfillment_type:
      typeof item.fulfillment_type === "string" ? item.fulfillment_type : undefined,
    quantity: item.quantity,
    unit_price_cents: item.unit_price_cents,
  };
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const item = parseItem(body.item);
    if (!item) {
      throw new ApiError(
        "FIELD_VALIDATION_FAILED",
        400,
        "item.product_slug, product_name, quantity, and unit_price_cents are required.",
      );
    }

    const view = await addCartItem(user.id, item);
    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to add cart item."),
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const url = new URL(request.url);
    const productSlug = url.searchParams.get("productSlug");
    if (!productSlug) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "productSlug is required.");
    }

    const view = await removeCartItem(user.id, {
      product_slug: productSlug,
      product_variant_slug: url.searchParams.get("variantSlug") ?? undefined,
      product_tier_name: url.searchParams.get("tierName") ?? undefined,
    });

    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to remove cart item."),
    );
  }
}
