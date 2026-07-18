import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { assertProjectAccess, getProjectWorkspace } from "@/server/domain/projects";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    await assertProjectAccess(id, user);
    const workspace = await getProjectWorkspace(id);
    if (!workspace) {
      throw new ApiError("NOT_FOUND", 404, "Project not found.");
    }
    return successResponse(workspace);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load project."),
    );
  }
}
