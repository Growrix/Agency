import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import {
  addWishlistItem,
  clearWishlist,
  getWishlistForUser,
  removeWishlistItem,
} from "@/server/domain/wishlist";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const view = await getWishlistForUser(user.id);
    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load wishlist."),
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const slug = typeof body.product_slug === "string" ? body.product_slug.trim() : "";
    if (!slug) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "product_slug is required.");
    }
    const view = await addWishlistItem(user.id, slug);
    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to add wishlist item."),
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("product_slug")?.trim();
    if (slug) {
      const view = await removeWishlistItem(user.id, slug);
      return successResponse(view);
    }
    const view = await clearWishlist(user.id);
    return successResponse(view);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to remove wishlist item."),
    );
  }
}
