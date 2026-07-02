import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/server/auth/clerk-config";
import { getUserByClerkId, syncClerkUser } from "@/server/auth/clerk-sync";
import { parseSessionTokenFromCookieHeader, verifySessionToken } from "@/server/auth/token";

const protectedPrefixes = ["/admin", "/dashboard", "/api/v1/admin", "/api/v1/me"];
const loginPrefixes = ["/admin/login", "/dashboard/login", "/sign-in", "/sign-up"];
const completionExemptApiPaths = ["/api/v1/me", "/api/v1/me/update", "/api/v1/me/complete-signup"];

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

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/v1/admin");
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

function rejectForbidden(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Admin access is required.",
          details: null,
        },
        timestamp: new Date().toISOString(),
        request_id: crypto.randomUUID(),
      },
      { status: 403 }
    );
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
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
    const payload = await verifySessionToken(token);
    if (isAdminPath(request.nextUrl.pathname) && payload.role !== "admin") {
      return rejectForbidden(request);
    }
    return NextResponse.next();
  } catch {
    return rejectLegacy(request);
  }
}

function shouldEnforceCompletion(pathname: string) {
  if (pathname === "/complete-account" || pathname.startsWith("/complete-account/")) {
    return false;
  }

  if (pathname === "/dashboard/login" || pathname.startsWith("/dashboard/login/")) {
    return false;
  }

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return true;
  }

  if (pathname.startsWith("/api/v1/me/")) {
    if (completionExemptApiPaths.some((exempt) => pathname === exempt || pathname.startsWith(`${exempt}/`))) {
      return false;
    }
    return true;
  }

  if (pathname === "/api/v1/me") {
    return false;
  }

  return false;
}

const clerkProxy = clerkMiddleware(async (auth, request) => {
  const rewrite = businessProfileRewrite(request);
  if (rewrite) {
    return rewrite;
  }

  if (isProtectedPath(request.nextUrl.pathname)) {
    await auth.protect();
  }

  const { userId } = await auth();
  if (userId && isAdminPath(request.nextUrl.pathname)) {
    const record = (await getUserByClerkId(userId).catch(() => null)) ?? (await syncClerkUser(userId).catch(() => null));

    if (record?.role !== "admin") {
      return rejectForbidden(request);
    }
  }

  if (userId && shouldEnforceCompletion(request.nextUrl.pathname)) {
    const record = await getUserByClerkId(userId).catch(() => null);
    const isCompleted = Boolean(record?.signup_completed_at);
    const isAdmin = record?.role === "admin";

    if (!isCompleted && !isAdmin) {
      if (request.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "FORBIDDEN",
              message: "Complete your account before continuing.",
              details: null,
            },
            timestamp: new Date().toISOString(),
            request_id: crypto.randomUUID(),
          },
          { status: 403 },
        );
      }

      const url = request.nextUrl.clone();
      url.pathname = "/complete-account";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
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
