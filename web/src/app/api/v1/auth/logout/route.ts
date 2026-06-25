import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/server/auth/clerk-config";
import { clearSessionCookie } from "@/server/auth/guards";
import { ApiError, errorResponse } from "@/server/core/api";

export const dynamic = "force-dynamic";

export async function POST() {
  if (isClerkConfigured()) {
    return errorResponse(new ApiError("GONE", 410, "Use Clerk sign-out from the account menu."));
  }

  const response = NextResponse.json({
    success: true,
    data: { logged_out: true },
    timestamp: new Date().toISOString(),
    request_id: crypto.randomUUID(),
  });

  return clearSessionCookie(response);
}
