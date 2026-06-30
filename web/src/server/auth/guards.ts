import "server-only";

import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/server/core/api";
import { isClerkConfigured, isLegacyTestAuthEnabled } from "@/server/auth/clerk-config";
import { getUserByClerkId, syncClerkUser, upsertUserFromClerk } from "@/server/auth/clerk-sync";
import { getUserById } from "@/server/auth/users";
import {
  LEGACY_SESSION_COOKIE_NAME,
  parseSessionTokenFromCookieHeader,
  verifySessionToken,
  type SessionPayload,
} from "@/server/auth/token";

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: SessionPayload["role"];
  firstName?: string;
  lastName?: string;
  phone?: string;
  marketingOptIn?: boolean;
  clerkUserId?: string;
};

function mapUserRecord(user: NonNullable<Awaited<ReturnType<typeof getUserById>>>): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    marketingOptIn: user.marketing_opt_in,
    clerkUserId: user.clerk_user_id,
  };
}

async function getLegacyAuthenticatedUser(request: Request | NextRequest): Promise<AuthenticatedUser | null> {
  if (!isLegacyTestAuthEnabled()) {
    return null;
  }

  const token = parseSessionTokenFromCookieHeader(request.headers.get("cookie"));
  if (!token) {
    return null;
  }

  try {
    const payload = await verifySessionToken(token);
    const user = await getUserById(payload.sub);
    if (!user) {
      return null;
    }

    return mapUserRecord(user);
  } catch {
    return null;
  }
}

async function getClerkAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return null;
  }

  let user = await getUserByClerkId(userId);
  if (!user) {
    try {
      user = await syncClerkUser(userId);
    } catch {
      user = null;
    }
  }

  if (!user) {
    const claims = (sessionClaims ?? {}) as Record<string, unknown>;
    const claimEmail =
      (typeof claims.email === "string" ? claims.email : undefined) ??
      (typeof claims.email_address === "string" ? claims.email_address : undefined);

    if (claimEmail) {
      user = await upsertUserFromClerk({
        clerkUserId: userId,
        email: claimEmail,
        firstName:
          (typeof claims.first_name === "string" ? claims.first_name : undefined) ??
          (typeof claims.given_name === "string" ? claims.given_name : undefined),
        lastName:
          (typeof claims.last_name === "string" ? claims.last_name : undefined) ??
          (typeof claims.family_name === "string" ? claims.family_name : undefined),
      });
    }
  }

  if (!user) {
    return null;
  }

  return mapUserRecord(user);
}

export async function getAuthenticatedUser(request: Request | NextRequest): Promise<AuthenticatedUser | null> {
  if (isClerkConfigured()) {
    return getClerkAuthenticatedUser();
  }

  return getLegacyAuthenticatedUser(request);
}

export async function requireAuthenticatedUser(request: Request | NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    throw new ApiError("UNAUTHORIZED", 401, "Authentication is required.");
  }

  return user;
}

export async function requireAdminUser(request: Request | NextRequest) {
  const user = await requireAuthenticatedUser(request);
  if (user.role !== "admin") {
    throw new ApiError("FORBIDDEN", 403, "Admin access is required.");
  }

  return user;
}

export function applySessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: LEGACY_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: LEGACY_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
