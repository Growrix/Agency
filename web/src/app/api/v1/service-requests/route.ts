import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";
import { createServiceRequest } from "@/server/domain/service-requests";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "service-request",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.contactLimitPerMinute,
    });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const record = await createServiceRequest({
      customer_email:
        typeof body.customer_email === "string"
          ? body.customer_email
          : typeof body.email === "string"
            ? body.email
            : "",
      customer_name:
        typeof body.customer_name === "string"
          ? body.customer_name
          : typeof body.name === "string"
            ? body.name
            : "",
      customer_phone: typeof body.customer_phone === "string" ? body.customer_phone : undefined,
      company: typeof body.company === "string" ? body.company : undefined,
      product_slug: typeof body.product_slug === "string" ? body.product_slug : undefined,
      product_name: typeof body.product_name === "string" ? body.product_name : undefined,
      variant_slug: typeof body.variant_slug === "string" ? body.variant_slug : undefined,
      variant_tier_name: typeof body.variant_tier_name === "string" ? body.variant_tier_name : undefined,
      budget: typeof body.budget === "string" ? body.budget : undefined,
      timeline: typeof body.timeline === "string" ? body.timeline : undefined,
      brief: typeof body.brief === "string" ? body.brief : typeof body.message === "string" ? body.message : "",
      metadata: body.metadata && typeof body.metadata === "object" ? (body.metadata as Record<string, unknown>) : {},
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse({
      service_request_id: record.id,
      request_number: record.request_number,
      status: record.status,
      lead_id: record.lead_id,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create service request."),
    );
  }
}
