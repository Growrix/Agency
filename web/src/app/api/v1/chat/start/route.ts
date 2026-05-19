import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";
import { WHATSAPP_HREF } from "@/lib/nav";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    assertNoBotTrap(body.website);
    assertRateLimit({ scope: "live-chat", identifier: context.ip, limit: 8 });

    const topic = typeof body.topic === "string" ? body.topic.trim() : "General support";
    const sessionId = crypto.randomUUID();

    await Promise.all([
      recordAnalyticsEvent({
        event_name: "live_chat_requested",
        route: "/live-chat",
        source: "chat_start",
        metadata: { session_id: sessionId, topic },
      }),
      recordAuditLog({
        level: "info",
        action: "live_chat.started",
        request_id: context.requestId,
        ip: context.ip,
        metadata: { session_id: sessionId, topic },
      }),
    ]);

    return successResponse({
      session_id: sessionId,
      status: "queued",
      escalation_url: WHATSAPP_HREF,
      topic,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to start live chat."));
  }
}
