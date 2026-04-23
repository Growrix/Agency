import "server-only";

import { type NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/server/core/api";
import { getUserById } from "@/server/auth/users";
import { parseSessionTokenFromCookieHeader, SESSION_COOKIE_NAME, verifySessionToken, type SessionPayload } from "@/server/auth/token";

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: SessionPayload["role"];
  firstName?: string;
  lastName?: string;
};

export async function getAuthenticatedUser(request: Request | NextRequest): Promise<AuthenticatedUser | null> {
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

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  } catch {
    return null;
  }
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
    name: SESSION_COOKIE_NAME,
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
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
