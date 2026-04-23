import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getPublicShopProduct } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ productSlug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { productSlug } = await context.params;
    const product = await getPublicShopProduct(productSlug);
    if (!product) {
      throw new ApiError("NOT_FOUND", 404, "Product not found.");
    }

    return successResponse(product);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load product."));
  }
}