import { NextRequest, NextResponse } from "next/server";
import { ApiError, createRequestContext, errorResponse } from "@/server/core/api";
import { applySessionCookie } from "@/server/auth/guards";
import { issueSessionToken } from "@/server/auth/token";
import { createUser, getRequiredAdminCredentialsConfigured } from "@/server/auth/users";
import { getRuntimeConfig } from "@/server/config/runtime";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    getRequiredAdminCredentialsConfigured();
    assertRateLimit({
      scope: "auth",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.authLimitPerMinute,
    });

    const body = (await request.json()) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const user = await createUser({
      email: typeof body.email === "string" ? body.email : "",
      password: typeof body.password === "string" ? body.password : "",
      firstName: typeof body.first_name === "string" ? body.first_name : typeof body.firstName === "string" ? body.firstName : undefined,
      lastName: typeof body.last_name === "string" ? body.last_name : typeof body.lastName === "string" ? body.lastName : undefined,
      role: "subscriber",
    });

    const token = await issueSessionToken({ userId: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          first_name: user.first_name ?? null,
          last_name: user.last_name ?? null,
        },
      },
      timestamp: new Date().toISOString(),
      request_id: context.requestId,
    });

    return applySessionCookie(response, token);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to register account."));
  }
}