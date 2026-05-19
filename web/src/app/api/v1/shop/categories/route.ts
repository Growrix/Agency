import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { listPublicShopCategories } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return successResponse(await listPublicShopCategories());
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load shop categories."));
  }
}