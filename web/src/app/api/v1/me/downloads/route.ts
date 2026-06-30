import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { listDownloadsByEmail } from "@/server/domain/downloads";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireCompletedSubscriber(request);
    const downloads = await listDownloadsByEmail(user.email);
    return successResponse(downloads);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load downloads."));
  }
}