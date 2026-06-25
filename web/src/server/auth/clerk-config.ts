import "server-only";

import { getRuntimeConfig } from "@/server/config/runtime";

export function isClerkConfigured() {
  const runtime = getRuntimeConfig();
  return Boolean(runtime.clerk.publishableKey && runtime.clerk.secretKey);
}

export function isLegacyTestAuthEnabled() {
  return process.env.NODE_ENV === "test" && !isClerkConfigured();
}
