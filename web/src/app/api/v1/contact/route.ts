import { NextRequest } from "next/server";
import { createRequestContext, errorResponse, successResponse, ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { createContactInquiry } from "@/server/domain/contact";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "contact",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.contactLimitPerMinute,
    });

    const body = (await request.json()) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const result = await createContactInquiry({
      visitor_name: typeof body.visitor_name === "string" ? body.visitor_name : typeof body.name === "string" ? body.name : "",
      visitor_email: typeof body.visitor_email === "string" ? body.visitor_email : typeof body.email === "string" ? body.email : "",
      company: typeof body.company === "string" ? body.company : undefined,
      service: typeof body.service === "string" ? body.service : undefined,
      budget: typeof body.budget === "string" ? body.budget : undefined,
      urgency: typeof body.urgency === "string" ? body.urgency : undefined,
      message: typeof body.message === "string" ? body.message : "",
      inquiry_type: typeof body.inquiry_type === "string" ? body.inquiry_type as "general" | "support" | "partnership" | "other" : undefined,
      source: typeof body.source === "string" ? body.source : "contact_form",
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse({
      inquiry_id: result.inquiry.id,
      status: result.inquiry.status,
      email_delivery: result.email_delivery,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create inquiry."));
  }
}
