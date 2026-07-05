import { NextRequest, NextResponse } from "next/server";
import { ApiError, createRequestContext, errorResponse } from "@/server/core/api";
import { consumeAuthorizedDownload, verifyDownloadGrantToken } from "@/server/domain/downloads";
import { recordAuditLog } from "@/server/logging/observability";
import { assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ downloadId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const requestContext = createRequestContext(request);
  const { downloadId } = await context.params;

  try {
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
    const resolvedError = error instanceof ApiError
      ? error
      : error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to deliver download.");

    if (resolvedError instanceof ApiError && [401, 403, 429].includes(resolvedError.status)) {
      await recordAuditLog({
        level: "warning",
        action: "download.grant_rejected",
        metadata: {
          download_id: downloadId,
          reason_code: resolvedError.code,
          reason_status: resolvedError.status,
          reason_message: resolvedError.message,
          grant_present: Boolean(request.nextUrl.searchParams.get("grant")),
          request_ip: requestContext.ip,
          request_user_agent: requestContext.userAgent,
        },
      }).catch(() => undefined);
    }

    return errorResponse(resolvedError);
  }
}
