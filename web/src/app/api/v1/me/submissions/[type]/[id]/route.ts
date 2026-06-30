import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import type { SubmissionType } from "@/server/data/schema";
import { filterCustomerVisibleNotes, getSubmissionDetail } from "@/server/domain/submissions";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES: SubmissionType[] = [
  "inquiry",
  "appointment",
  "service_request",
  "order",
  "newsletter",
  "support_thread",
];

type RouteContext = {
  params: Promise<{ type: string; id: string }>;
};

function extractOwnerEmail(detail: Awaited<ReturnType<typeof getSubmissionDetail>>): string | null {
  if (!detail) return null;
  if (detail.type === "inquiry") return detail.record.visitor_email;
  if (detail.type === "appointment") return detail.record.visitor_email;
  if (detail.type === "service_request") return detail.record.customer_email;
  if (detail.type === "order") return detail.record.customer_email;
  if (detail.type === "newsletter") return detail.record.email;
  return null;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCompletedSubscriber(request);
    const { type, id } = await context.params;
    if (!ALLOWED_TYPES.includes(type as SubmissionType)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Unsupported submission type.");
    }

    const detail = await getSubmissionDetail(type as SubmissionType, id);
    if (!detail) {
      throw new ApiError("NOT_FOUND", 404, "Submission not found.");
    }

    const ownerEmail = extractOwnerEmail(detail);
    if (!ownerEmail || ownerEmail.toLowerCase() !== user.email.toLowerCase()) {
      throw new ApiError("FORBIDDEN", 403, "You do not have access to this submission.");
    }

    return successResponse({
      type: detail.type,
      record: detail.record,
      notes: filterCustomerVisibleNotes(detail.notes),
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load submission."),
    );
  }
}
