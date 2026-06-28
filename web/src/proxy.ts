import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/server/auth/clerk-config";
import { parseSessionTokenFromCookieHeader, verifySessionToken } from "@/server/auth/token";

const protectedPrefixes = ["/admin", "/dashboard", "/api/v1/admin", "/api/v1/me"];
const loginPrefixes = ["/admin/login", "/dashboard/login", "/sign-in", "/sign-up"];

function businessProfileRewrite(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Business-profile" || pathname === "/business-profile") {
    const response = NextResponse.rewrite(new URL("/businessprofile", request.url));
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return null;
}

function isProtectedPath(pathname: string) {
  if (loginPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }

  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function rejectLegacy(request: NextRequest) {
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
  url.pathname = request.nextUrl.pathname.startsWith("/dashboard")
    ? "/dashboard/login"
    : "/admin/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

async function legacyProxy(request: NextRequest) {
  const rewrite = businessProfileRewrite(request);
  if (rewrite) {
    return rewrite;
  }

  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = parseSessionTokenFromCookieHeader(request.headers.get("cookie"));
  if (!token) {
    return rejectLegacy(request);
  }

  try {
    await verifySessionToken(token);
    return NextResponse.next();
  } catch {
    return rejectLegacy(request);
  }
}

const clerkProxy = clerkMiddleware(async (auth, request) => {
  const rewrite = businessProfileRewrite(request);
  if (rewrite) {
    return rewrite;
  }

  if (isProtectedPath(request.nextUrl.pathname)) {
    await auth.protect();
  }

  return NextResponse.next();
});

const proxyHandler = isClerkConfigured() ? clerkProxy : legacyProxy;

export default proxyHandler;

export const config = {
  matcher: [
    "/Business-profile",
    "/business-profile",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
