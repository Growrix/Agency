import { successResponse } from "@/server/core/api";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse({ status: "ok", service: "web", now: new Date().toISOString() });
}