import { NextRequest } from "next/server";
import { errorResponse, paginatedResponse, ApiError } from "@/server/core/api";
import { listPublicServices } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get("page_size") || "50")));
    const services = await listPublicServices();
    const start = (page - 1) * pageSize;
    const data = services.slice(start, start + pageSize);

    return paginatedResponse(data, {
      total: services.length,
      page,
      page_size: pageSize,
      total_pages: Math.max(1, Math.ceil(services.length / pageSize)),
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load services."));
  }
}