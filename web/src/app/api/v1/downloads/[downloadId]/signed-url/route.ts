import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { createAuthorizedDownloadUrl } from "@/server/domain/downloads";
import { assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ downloadId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const requestContext = createRequestContext(request);
    const { downloadId } = await context.params;

    assertRateLimit({
      scope: "download.grant.issue",
      identifier: `${user.id ?? user.email.toLowerCase()}:${downloadId}`,
      limit: 15,
      windowMs: 60_000,
    });

    const result = await createAuthorizedDownloadUrl(
      downloadId,
      user.email,
      request.nextUrl.origin,
      user.role === "admin",
      {
        ip: requestContext.ip,
        userAgent: requestContext.userAgent,
      },
    );
    return successResponse(result);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to authorize download."));
  }
}