import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { ServiceRequestStatus } from "@/server/data/schema";
import { getServiceRequestById, updateServiceRequestStatus } from "@/server/domain/service-requests";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const STATUSES: ServiceRequestStatus[] = ["new", "scoping", "in_progress", "qa_review", "delivered", "cancelled"];

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { id } = await context.params;
    const record = await getServiceRequestById(id);
    if (!record) {
      throw new ApiError("NOT_FOUND", 404, "Service request not found.");
    }
    return successResponse(record);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load service request."));
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const requestContext = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.status !== "string" || !STATUSES.includes(body.status as ServiceRequestStatus)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid status value.");
    }
    const notes = typeof body.notes === "string" ? body.notes : undefined;

    const updated = await updateServiceRequestStatus(id, body.status as ServiceRequestStatus, notes);

    await recordAuditLog({
      level: "info",
      action: "admin.service_request_updated",
      request_id: requestContext.requestId,
      ip: requestContext.ip,
      actor_email: admin.email,
      metadata: {
        service_request_id: id,
        status: updated.status,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update service request."));
  }
}
