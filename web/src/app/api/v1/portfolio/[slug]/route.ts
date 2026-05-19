import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getPublicPortfolioProject } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const project = await getPublicPortfolioProject(slug);
    if (!project) {
      throw new ApiError("NOT_FOUND", 404, "Portfolio project not found.");
    }

    return successResponse(project);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load portfolio project."));
  }
}