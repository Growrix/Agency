import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { listAllProjects } from "@/server/domain/projects";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const items = await listAllProjects();
    return successResponse({ items, total: items.length });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load projects."),
    );
  }
}
