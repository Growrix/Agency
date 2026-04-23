import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    await recordAuditLog({
      level: "error",
      action: "client.error_reported",
      request_id: context.requestId,
      ip: context.ip,
      metadata: {
        message: typeof body.message === "string" ? body.message : "Unknown client error",
        route: typeof body.route === "string" ? body.route : null,
        stack: typeof body.stack === "string" ? body.stack : null,
      },
    });

    return successResponse({ accepted: true });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to record client error."));
  }
}