import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getIntakeById } from "@/server/domain/intakes";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { id } = await context.params;
    const intake = await getIntakeById(id);
    if (!intake) {
      throw new ApiError("NOT_FOUND", 404, "Intake not found.");
    }
    return successResponse(intake);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load intake."),
    );
  }
}
