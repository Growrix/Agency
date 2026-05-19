import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseSessionTokenFromCookieHeader, verifySessionToken } from "@/server/auth/token";

const protectedPrefixes = ["/admin", "/api/v1/admin", "/api/v1/me"];

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (!protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const token = parseSessionTokenFromCookieHeader(request.headers.get("cookie"));
  if (!token) {
    return reject(request);
  }

  try {
    await verifySessionToken(token);
    return NextResponse.next();
  } catch {
    return reject(request);
  }
}

function reject(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication is required.",
          details: null,
        },
        timestamp: new Date().toISOString(),
        request_id: crypto.randomUUID(),
      },
      { status: 401 }
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/v1/admin/:path*", "/api/v1/me/:path*"],
};