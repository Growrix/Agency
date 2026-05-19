import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";

export const SESSION_COOKIE_NAME = "agency_session";

export type SessionPayload = JWTPayload & {
  sub: string;
  email: string;
  role: "public" | "subscriber" | "customer" | "admin";
};

function getJwtSecret() {
  const secret = requireRuntimeValue(getRuntimeConfig().auth.jwtSecret, "AUTH_JWT_SECRET");
  return new TextEncoder().encode(secret);
}

export async function issueSessionToken(input: { userId: string; email: string; role: SessionPayload["role"] }) {
  return new SignJWT({ email: input.email, role: input.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .setSubject(input.userId)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const verified = await jwtVerify(token, getJwtSecret());
  return verified.payload as SessionPayload;
}

export function parseSessionTokenFromCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const sessionCookie = cookies.find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!sessionCookie) {
    return null;
  }

  const [, value] = sessionCookie.split("=");
  return value ?? null;
}
