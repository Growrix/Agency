import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getConversationSession } from "@/server/domain/conversations";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(_request);
    const { sessionId } = await context.params;
    const session = await getConversationSession(sessionId);
    if (!session) {
      throw new ApiError("NOT_FOUND", 404, "Conversation session not found.");
    }

    return successResponse(session);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load conversation."));
  }
}
