import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getProjectWorkspace, updateProject } from "@/server/domain/projects";
import type { ProjectStatus } from "@/server/data/schema";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

const ALLOWED_STATUSES: ProjectStatus[] = [
  "intake",
  "planning",
  "in_progress",
  "review",
  "delivered",
  "archived",
];

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { id } = await context.params;
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

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const status =
      typeof body.status === "string" && ALLOWED_STATUSES.includes(body.status as ProjectStatus)
        ? (body.status as ProjectStatus)
        : undefined;

    const project = await updateProject({
      projectId: id,
      status,
      title: typeof body.title === "string" ? body.title : undefined,
      adminAssignedUserId:
        body.admin_assigned_user_id === null
          ? null
          : typeof body.admin_assigned_user_id === "string"
            ? body.admin_assigned_user_id
            : admin.id,
    });

    if (!project) {
      throw new ApiError("NOT_FOUND", 404, "Project not found.");
    }

    return successResponse(project);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update project."),
    );
  }
}
