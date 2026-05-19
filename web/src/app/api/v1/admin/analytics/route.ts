import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { withDatabase } from "@/server/data/store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);

    const summary = await withDatabase((database) => ({
      totals: {
        inquiries: database.inquiries.length,
        appointments: database.appointments.length,
        orders: database.orders.length,
        concierge_sessions: database.conversations.filter((item) => item.source === "ai_concierge").length,
      },
      latest_events: database.analytics_events.slice(0, 20),
      latest_logs: database.audit_logs.slice(0, 20),
    }));

    return successResponse(summary);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load analytics."));
  }
}
