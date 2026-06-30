import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import {
  listCustomerNotificationsForEmail,
  notificationCounts,
} from "@/server/domain/customer-notifications";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const items = await listCustomerNotificationsForEmail(user.email, 50);
    const counts = notificationCounts(items);
    return successResponse({ items, ...counts });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to load notifications."),
    );
  }
}
