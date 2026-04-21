import { NextResponse } from "next/server";
import { generateConciergeReply } from "@/server/ai/concierge";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      pagePath?: unknown;
      sessionId?: unknown;
    };

    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pagePath = typeof body.pagePath === "string" ? body.pagePath : "/ai-concierge";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : undefined;

    if (message.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Message must be at least 2 characters long.",
          },
        },
        { status: 400 }
      );
    }

    if (message.length > 600) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Message is too long. Keep it under 600 characters.",
          },
        },
        { status: 400 }
      );
    }

    const reply = await generateConciergeReply({ message, pagePath, sessionId });

    return NextResponse.json({
      success: true,
      data: reply,
      timestamp: new Date().toISOString(),
      request_id: crypto.randomUUID(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The concierge could not answer right now.";

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message,
        },
        timestamp: new Date().toISOString(),
        request_id: crypto.randomUUID(),
      },
      { status: 500 }
    );
  }
}