import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { markCustomerNotificationsRead } from "@/server/domain/customer-notifications";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json().catch(() => ({}))) as { ids?: unknown };
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((value): value is string => typeof value === "string")
      : undefined;

    const result = await markCustomerNotificationsRead(user.email, ids);
    return successResponse(result);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to mark notifications read."),
    );
  }
}
