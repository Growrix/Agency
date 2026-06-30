import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { listSubmissionsForEmail } from "@/server/domain/submissions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const items = await listSubmissionsForEmail(user.email);
    return successResponse(items);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load submissions."),
    );
  }
}
