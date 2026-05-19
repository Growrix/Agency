import { NextRequest } from "next/server";
import { ApiError, errorResponse, paginatedResponse } from "@/server/core/api";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get("page_size") || "24")));
    const products = await listPublicShopProducts({
      category: url.searchParams.get("category") || undefined,
      type: url.searchParams.get("type") || undefined,
      industry: url.searchParams.get("industry") || undefined,
      search: url.searchParams.get("search") || undefined,
    });
    const start = (page - 1) * pageSize;

    return paginatedResponse(products.slice(start, start + pageSize), {
      total: products.length,
      page,
      page_size: pageSize,
      total_pages: Math.max(1, Math.ceil(products.length / pageSize)),
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load shop products."));
  }
}