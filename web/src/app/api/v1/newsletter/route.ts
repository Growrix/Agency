import { NextRequest } from "next/server";
import { createRequestContext, errorResponse, successResponse, ApiError } from "@/server/core/api";
import { assertRateLimit } from "@/server/security/rate-limit";
import { subscribeToNewsletter } from "@/server/domain/newsletter";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "contact",
      identifier: context.ip,
      limit: 5,
    });

    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";

    const result = await subscribeToNewsletter(email, "blog_sidebar");

    return successResponse({ subscribed: true, alreadySubscribed: result.alreadySubscribed });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to subscribe. Please try again.")
    );
  }
}
