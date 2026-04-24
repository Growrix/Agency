import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { generateConciergeReply } from "@/server/ai/concierge";
import { appendConciergeExchange } from "@/server/domain/conversations";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const body = (await request.json()) as {
      message?: unknown;
      pagePath?: unknown;
      sessionId?: unknown;
      website?: unknown;
    };

    assertNoBotTrap(body.website);
    assertRateLimit({
      scope: "ai-concierge",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.conciergeLimitPerMinute,
    });

    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pagePath = typeof body.pagePath === "string" ? body.pagePath : "/ai-concierge";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : undefined;

    if (message.length < 2) {
      throw new ApiError("INVALID_REQUEST", 400, "Message must be at least 2 characters long.");
    }

    if (message.length > 600) {
      throw new ApiError("INVALID_REQUEST", 400, "Message is too long. Keep it under 600 characters.");
    }

    const reply = await generateConciergeReply({ message, pagePath, sessionId });
    const session = await appendConciergeExchange({
      sessionId: reply.sessionId,
      pagePath,
      userMessage: message,
      assistantMessage: reply.answer,
      responseState: reply.responseState,
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse({
      ...reply,
      sessionId: session.id,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "AI Growrix OS could not answer right now."));
  }
}
