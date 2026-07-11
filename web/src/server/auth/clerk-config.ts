import "server-only";

import { getRuntimeConfig } from "@/server/config/runtime";

export function isClerkConfigured() {
  const runtime = getRuntimeConfig();
  // Clerk middleware requires both keys; partial config should fail closed to legacy auth.
  return Boolean(runtime.clerk.publishableKey && runtime.clerk.secretKey);
}

export function isLegacyTestAuthEnabled() {
  return process.env.NODE_ENV === "test" && !isClerkConfigured();
}
