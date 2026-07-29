import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { getCustomerDashboardSnapshot } from "@/server/domain/customer-dashboard";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const snapshot = await getCustomerDashboardSnapshot(user);
    return successResponse(snapshot);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to load dashboard."),
    );
  }
}
