import "server-only";

import { ApiError } from "@/server/core/api";

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

function getBucketKey(scope: string, identifier: string) {
  return `${scope}:${identifier}`;
}

export function assertRateLimit(input: {
  scope: string;
  identifier: string;
  limit: number;
  windowMs?: number;
}) {
  const windowMs = input.windowMs ?? 60_000;
  const key = getBucketKey(input.scope, input.identifier);
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || current.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (current.count >= input.limit) {
    throw new ApiError("RATE_LIMIT_EXCEEDED", 429, "Too many requests. Please wait and try again.", {
      scope: input.scope,
      retry_after_ms: current.resetAt - now,
    });
  }

  current.count += 1;
  memoryBuckets.set(key, current);
}

export function assertNoBotTrap(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) {
    throw new ApiError("FORBIDDEN", 403, "Bot submission rejected.");
  }
}
