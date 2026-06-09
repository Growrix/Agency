import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { createAuthorizedDownloadUrl } from "@/server/domain/downloads";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ downloadId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { downloadId } = await context.params;
    const result = await createAuthorizedDownloadUrl(downloadId, user.email, user.role === "admin");
    return successResponse(result);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to authorize download."));
  }
}