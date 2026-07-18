import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getFreeDemoCampaignState } from "@/server/domain/free-demo-campaign";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await getFreeDemoCampaignState();
    return successResponse(state);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load campaign state."),
    );
  }
}
