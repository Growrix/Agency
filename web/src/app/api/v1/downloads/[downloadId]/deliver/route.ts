import { NextRequest, NextResponse } from "next/server";
import { ApiError, createRequestContext, errorResponse } from "@/server/core/api";
import { consumeAuthorizedDownload, verifyDownloadGrantToken } from "@/server/domain/downloads";
import { assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ downloadId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const requestContext = createRequestContext(request);
    const { downloadId } = await context.params;
    const grantToken = request.nextUrl.searchParams.get("grant");

    if (!grantToken) {
      throw new ApiError("UNAUTHORIZED", 401, "Missing download grant token.");
    }

    const grant = await verifyDownloadGrantToken(grantToken).catch(() => null);
    if (!grant || grant.sub !== downloadId) {
      throw new ApiError("UNAUTHORIZED", 401, "Download grant is invalid or expired.");
    }

    const grantEmail = typeof grant.email === "string" ? grant.email : null;
    if (!grantEmail) {
      throw new ApiError("UNAUTHORIZED", 401, "Download grant is invalid or expired.");
    }

    const grantId = typeof grant.jti === "string" ? grant.jti : `${downloadId}:${grantEmail}`;
    assertRateLimit({
      scope: "download.grant.redeem",
      identifier: grantId,
      limit: 20,
      windowMs: 60_000,
    });

    const consumed = await consumeAuthorizedDownload(downloadId, grantEmail, Boolean(grant.admin), {
      ip: requestContext.ip,
      userAgent: requestContext.userAgent,
      grantId,
    });

    let redirectUrl: URL;
    try {
      redirectUrl = new URL(consumed.asset_url);
    } catch {
      redirectUrl = new URL(consumed.asset_url, request.nextUrl.origin);
    }

    return NextResponse.redirect(redirectUrl, {
      status: 307,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to deliver download."));
  }
}
