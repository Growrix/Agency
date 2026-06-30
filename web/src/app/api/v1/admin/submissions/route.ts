import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { SubmissionType } from "@/server/data/schema";
import { listSubmissions } from "@/server/domain/submissions";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES: SubmissionType[] = [
  "inquiry",
  "appointment",
  "service_request",
  "order",
  "newsletter",
  "support_thread",
];

function parseInt(value: string | null, fallback: number, max: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);

    const typeRaw = url.searchParams.get("type");
    const type = typeRaw && ALLOWED_TYPES.includes(typeRaw as SubmissionType)
      ? (typeRaw as SubmissionType)
      : undefined;

    const result = await listSubmissions({
      type,
      status: url.searchParams.get("status") ?? undefined,
      search: url.searchParams.get("q") ?? undefined,
      dateFrom: url.searchParams.get("from") ?? undefined,
      dateTo: url.searchParams.get("to") ?? undefined,
      assignedTo: url.searchParams.get("assigned") ?? undefined,
      limit: parseInt(url.searchParams.get("limit"), 50, 200),
      offset: parseInt(url.searchParams.get("offset"), 0, 10_000),
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to list submissions."),
    );
  }
}
