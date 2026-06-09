import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getLeadById, listLeadEvents } from "@/server/domain/leads";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ leadId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { leadId } = await context.params;
    const lead = await getLeadById(leadId);
    if (!lead) {
      throw new ApiError("NOT_FOUND", 404, "Lead not found.");
    }
    const events = await listLeadEvents(leadId, 200);
    return successResponse({ lead, events });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load lead."));
  }
}
