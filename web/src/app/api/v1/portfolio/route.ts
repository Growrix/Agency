import { NextRequest } from "next/server";
import { ApiError, errorResponse, paginatedResponse } from "@/server/core/api";
import { listPublicPortfolio } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get("page_size") || "50")));
    const service = url.searchParams.get("service") || undefined;
    const query = url.searchParams.get("search")?.trim().toLowerCase();

    const all = (await listPublicPortfolio()).filter((project) => {
      if (service && project.service !== service) {
        return false;
      }

      if (query && !`${project.name} ${project.industry} ${project.summary}`.toLowerCase().includes(query)) {
        return false;
      }

      return true;
    });

    const start = (page - 1) * pageSize;
    return paginatedResponse(all.slice(start, start + pageSize), {
      total: all.length,
      page,
      page_size: pageSize,
      total_pages: Math.max(1, Math.ceil(all.length / pageSize)),
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load portfolio."));
  }
}