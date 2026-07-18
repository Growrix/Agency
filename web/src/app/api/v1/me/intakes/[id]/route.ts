import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { getIntakeForUser } from "@/server/domain/intakes";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const intake = await getIntakeForUser(id, user.id);
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
