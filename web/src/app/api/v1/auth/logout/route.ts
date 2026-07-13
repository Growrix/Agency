import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/server/auth/clerk-config";
import { clearSessionCookie } from "@/server/auth/guards";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    data: {
      logged_out: true,
      clerk_configured: isClerkConfigured(),
    },
    timestamp: new Date().toISOString(),
    request_id: crypto.randomUUID(),
  });

  return clearSessionCookie(response);
}
