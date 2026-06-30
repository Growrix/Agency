import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { getCartForUser, mergeLocalIntoServer, replaceCart, type CartItemInput } from "@/server/domain/cart";

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

function parseItems(value: unknown): CartItemInput[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(parseItem)
    .filter((item): item is CartItemInput => item !== null);
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const view = await getCartForUser(user.id);
    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load cart."),
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const items = parseItems(body.items);
    const mode = typeof body.mode === "string" ? body.mode : "replace";

    const view =
      mode === "merge"
        ? await mergeLocalIntoServer(user.id, items)
        : await replaceCart(user.id, items);

    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update cart."),
    );
  }
}
