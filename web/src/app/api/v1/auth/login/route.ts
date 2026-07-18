import { NextRequest, NextResponse } from "next/server";
import { isClerkConfigured } from "@/server/auth/clerk-config";
import { ApiError, createRequestContext, errorResponse } from "@/server/core/api";
import { applySessionCookie } from "@/server/auth/guards";
import { issueSessionToken } from "@/server/auth/token";
import { authenticateUser, getRequiredAdminCredentialsConfigured } from "@/server/auth/users";
import { recordAuditLog } from "@/server/logging/observability";
import { getRuntimeConfig } from "@/server/config/runtime";
import { assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    if (isClerkConfigured()) {
      throw new ApiError("GONE", 410, "Password login is deprecated. Use Clerk sign-in.");
    }

    getRequiredAdminCredentialsConfigured();
    assertRateLimit({
      scope: "auth",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.authLimitPerMinute,
    });

    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Email and password are required.");
    }

    const user = await authenticateUser(email, password);
    if (!user) {
      await recordAuditLog({
        level: "warning",
        action: "auth.admin_login_failed",
        actor_email: email,
        ip: context.ip,
        metadata: {
          reason: "invalid_credentials",
          user_agent: context.userAgent,
        },
      });
      throw new ApiError("UNAUTHORIZED", 401, "Invalid credentials.");
    }

    await recordAuditLog({
      level: "info",
      action: "auth.admin_login_success",
      actor_email: user.email,
      ip: context.ip,
      metadata: {
        role: user.role,
        user_agent: context.userAgent,
      },
    });

    const token = await issueSessionToken({ userId: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, email: user.email, role: user.role },
      },
      timestamp: new Date().toISOString(),
      request_id: context.requestId,
    });

    return applySessionCookie(response, token);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to sign in."));
  }
}
