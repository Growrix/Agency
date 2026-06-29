import "server-only";

import { getRuntimeConfig } from "@/server/config/runtime";

export function isClerkConfigured() {
  const runtime = getRuntimeConfig();
  // Treat Clerk as active when publishable key is present so middleware and UI stay in sync.
  return Boolean(runtime.clerk.publishableKey);
}

export function isLegacyTestAuthEnabled() {
  return process.env.NODE_ENV === "test" && !isClerkConfigured();
}
