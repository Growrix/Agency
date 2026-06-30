import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { SubmissionType } from "@/server/data/schema";
import { assignSubmission, getSubmissionDetail, updateSubmissionStatus } from "@/server/domain/submissions";

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

function parseType(raw: string): SubmissionType {
  if (!ALLOWED_TYPES.includes(raw as SubmissionType)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Unsupported submission type.");
  }
  return raw as SubmissionType;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { type, id } = await context.params;
    const detail = await getSubmissionDetail(parseType(type), id);
    if (!detail) {
      throw new ApiError("NOT_FOUND", 404, "Submission not found.");
    }
    return successResponse(detail);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load submission."),
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { type, id } = await context.params;
    const submissionType = parseType(type);
    const body = (await request.json().catch(() => ({}))) as {
      status?: unknown;
      assigned_to_user_id?: unknown;
    };

    if (body.status !== undefined) {
      if (typeof body.status !== "string" || body.status.trim() === "") {
        throw new ApiError("FIELD_VALIDATION_FAILED", 400, "status must be a non-empty string.");
      }
      await updateSubmissionStatus({
        type: submissionType,
        id,
        status: body.status,
        actorEmail: admin.email,
      });
    }

    if (body.assigned_to_user_id !== undefined) {
      const value = body.assigned_to_user_id;
      if (value !== null && typeof value !== "string") {
        throw new ApiError("FIELD_VALIDATION_FAILED", 400, "assigned_to_user_id must be a string or null.");
      }
      await assignSubmission({
        type: submissionType,
        id,
        assignedToUserId: value === null ? undefined : value,
        actorEmail: admin.email,
      });
    }

    const detail = await getSubmissionDetail(submissionType, id);
    if (!detail) {
      throw new ApiError("NOT_FOUND", 404, "Submission not found.");
    }

    return successResponse(detail);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update submission."),
    );
  }
}
