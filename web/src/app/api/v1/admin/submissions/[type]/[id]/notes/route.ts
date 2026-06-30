import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { SubmissionType } from "@/server/data/schema";
import { addSubmissionNote } from "@/server/domain/submissions";

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

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { type, id } = await context.params;
    if (!ALLOWED_TYPES.includes(type as SubmissionType)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Unsupported submission type.");
    }

    const body = (await request.json().catch(() => ({}))) as {
      body?: unknown;
      customer_visible?: unknown;
      email_customer?: unknown;
    };

    if (typeof body.body !== "string" || body.body.trim().length === 0) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "body is required.");
    }

    const note = await addSubmissionNote({
      type: type as SubmissionType,
      id,
      authorUserId: admin.id,
      authorEmail: admin.email,
      authorRole: "admin",
      body: body.body,
      customerVisible: Boolean(body.customer_visible),
      emailCustomer: Boolean(body.email_customer),
    });

    return successResponse(note);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to add note."),
    );
  }
}
