import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { addProjectUpdate, assertProjectAccess } from "@/server/domain/projects";
import type { ProjectUpdateKind } from "@/server/data/schema";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

const ALLOWED_KINDS: ProjectUpdateKind[] = ["note", "instruction", "reference", "drive_link", "status_change"];

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    await assertProjectAccess(id, admin);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const kind = typeof body.kind === "string" && ALLOWED_KINDS.includes(body.kind as ProjectUpdateKind)
      ? (body.kind as ProjectUpdateKind)
      : "note";

    const record = await addProjectUpdate({
      projectId: id,
      author: admin,
      authorRole: "admin",
      kind,
      body: typeof body.body === "string" ? body.body : undefined,
      referenceUrl: typeof body.reference_url === "string" ? body.reference_url : undefined,
      filePath: typeof body.file_path === "string" ? body.file_path : undefined,
    });

    return successResponse(record);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to add project update."),
    );
  }
}
