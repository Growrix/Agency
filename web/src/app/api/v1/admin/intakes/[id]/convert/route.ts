import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getIntakeById } from "@/server/domain/intakes";
import { convertIntakeToProject } from "@/server/domain/projects";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    const intake = await getIntakeById(id);
    if (!intake) {
      throw new ApiError("NOT_FOUND", 404, "Intake not found.");
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const project = await convertIntakeToProject({
      intake,
      adminUserId: admin.id,
      title: typeof body.title === "string" ? body.title : undefined,
    });

    return successResponse({ project, intake_id: intake.id });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to convert intake."),
    );
  }
}
