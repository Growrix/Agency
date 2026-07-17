import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextFetchEvent } from "next/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/admin", "/dashboard", "/api/v1/admin", "/api/v1/me"];
const loginPrefixes = ["/admin/login", "/dashboard/login", "/sign-in", "/sign-up"];
const completionExemptApiPaths = ["/api/v1/me", "/api/v1/me/update", "/api/v1/me/complete-signup"];
const blockedPreviewPrefixes = [
  "/previews/html-template-websites/",
  "/previews/html-business-profiles/",
  "/previews/website-templates-html/",
];

/**
 * Middleware-safe Clerk gate — reads env directly.
 * Do NOT import `@/server/auth/clerk-config` or `@/server/config/runtime` here:
 * those modules use `server-only` and crash Vercel middleware boot
 * (`MIDDLEWARE_INVOCATION_FAILED`) even on marketing routes.
 */
function isClerkConfiguredInProxy() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() && process.env.CLERK_SECRET_KEY?.trim(),
  );
}

/** Routes that need Clerk middleware (auth handshake, protect, session sync). */
const isClerkRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/complete-account(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/trpc(.*)",
  "/__clerk(.*)",
]);

function businessProfileRewrite(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Business-profile" || pathname === "/business-profile") {
    const response = NextResponse.rewrite(new URL("/businessprofile", request.url));
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return null;
}

function blockPublicPreviewSource(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!blockedPreviewPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return new NextResponse("Not found.", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
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

  const blockedPreview = blockPublicPreviewSource(request);
  if (blockedPreview) {
    return blockedPreview;
  }

  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Lazy-load JWT helpers so marketing routes never pull `server-only` / runtime config.
  const { parseSessionTokenFromCookieHeader, verifySessionToken } = await import("@/server/auth/token");
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

async function resolveMirroredClerkUser(userId: string) {
  const { getUserByClerkId, syncClerkUser } = await import("@/server/auth/clerk-sync");
  const existing = await getUserByClerkId(userId).catch(() => null);
  if (existing) {
    return existing;
  }

  return syncClerkUser(userId).catch(() => null);
}

async function clerkProxy(request: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, nextRequest) => {
    const rewrite = businessProfileRewrite(nextRequest);
    if (rewrite) {
      return rewrite;
    }

    const blockedPreview = blockPublicPreviewSource(nextRequest);
    if (blockedPreview) {
      return blockedPreview;
    }

    if (isProtectedPath(nextRequest.nextUrl.pathname)) {
      await auth.protect();
    }

    const { userId } = await auth();
    const pathname = nextRequest.nextUrl.pathname;
    const needsMirroredUser =
      Boolean(userId) && (isAdminPath(pathname) || shouldEnforceCompletion(pathname));
    const mirroredUser = needsMirroredUser && userId ? await resolveMirroredClerkUser(userId) : null;

    if (userId && isAdminPath(pathname)) {
      if (mirroredUser?.role !== "admin") {
        return rejectForbidden(nextRequest);
      }
    }

    if (userId && shouldEnforceCompletion(pathname)) {
      const isCompleted = Boolean(mirroredUser?.signup_completed_at);
      const isAdmin = mirroredUser?.role === "admin";

      if (!isCompleted && !isAdmin) {
        if (nextRequest.nextUrl.pathname.startsWith("/api/")) {
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

        const url = nextRequest.nextUrl.clone();
        url.pathname = "/complete-account";
        url.searchParams.set("next", nextRequest.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  })(request, event);
}

export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  const rewrite = businessProfileRewrite(request);
  if (rewrite) {
    return rewrite;
  }

  const blockedPreview = blockPublicPreviewSource(request);
  if (blockedPreview) {
    return blockedPreview;
  }

  if (!isClerkConfiguredInProxy()) {
    return legacyProxy(request);
  }

  // Marketing pages skip clerkMiddleware to avoid handshake redirect loops for anonymous visitors.
  if (!isClerkRoute(request)) {
    return legacyProxy(request);
  }

  return clerkProxy(request, event);
}

export const config = {
  matcher: [
    "/Business-profile",
    "/business-profile",
    "/previews/html-template-websites/:path*",
    "/previews/html-business-profiles/:path*",
    "/previews/website-templates-html/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/complete-account/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/api/:path*",
    "/trpc/:path*",
    "/__clerk/:path*",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
