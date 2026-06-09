import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { ServiceRequestStatus } from "@/server/data/schema";
import { listServiceRequests } from "@/server/domain/service-requests";

export const dynamic = "force-dynamic";

const STATUSES: ServiceRequestStatus[] = ["new", "scoping", "in_progress", "qa_review", "delivered", "cancelled"];

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const limitParam = searchParams.get("limit");

    if (statusParam && !STATUSES.includes(statusParam as ServiceRequestStatus)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid status filter.");
    }

    const limit = limitParam ? Math.min(Math.max(Number.parseInt(limitParam, 10) || 0, 1), 500) : undefined;

    const records = await listServiceRequests({
      status: statusParam ? (statusParam as ServiceRequestStatus) : undefined,
      limit,
    });

    return successResponse(records);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load service requests."));
  }
}
