import type { ApiEnvelope } from "@blog-automation/contracts";

export function okEnvelope<T>(data: T, meta?: Record<string, string>): ApiEnvelope<T> {
  return { status: "ok", data, meta };
}

export function acceptedEnvelope<T>(data: T, meta?: Record<string, string>): ApiEnvelope<T> {
  return { status: "accepted", data, meta };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}