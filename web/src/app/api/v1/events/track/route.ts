import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";
import { recordLeadEvent } from "@/server/domain/leads";
import type { LeadEventType, LeadSource } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const ALLOWED_EVENT_TYPES: LeadEventType[] = [
  "product_view",
  "demo_click",
  "buy_click",
  "checkout_started",
  "customization_cta",
  "whatsapp_click",
  "contact_form",
  "booking",
  "ai_message",
  "download",
];

const ALLOWED_SOURCES: LeadSource[] = [
  "contact_form",
  "booking_form",
  "newsletter",
  "ai_concierge",
  "live_chat",
  "product_view",
  "checkout",
  "whatsapp_cta",
  "service_request",
  "admin_manual",
];

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "lead-event",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.leadEventLimitPerMinute,
    });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const email = typeof body.email === "string" ? body.email : "";
    const eventType = typeof body.event_type === "string" ? (body.event_type as LeadEventType) : undefined;
    const source = typeof body.source === "string" ? (body.source as LeadSource) : undefined;
    const route = typeof body.route === "string" ? body.route : undefined;
    const metadata =
      body.metadata && typeof body.metadata === "object" ? (body.metadata as Record<string, unknown>) : {};
    const name = typeof body.name === "string" ? body.name : undefined;
    const phone = typeof body.phone === "string" ? body.phone : undefined;
    const company = typeof body.company === "string" ? body.company : undefined;

    if (!eventType || !ALLOWED_EVENT_TYPES.includes(eventType)) {
      throw new ApiError("INVALID_REQUEST", 400, "Unsupported event_type.");
    }
    if (source && !ALLOWED_SOURCES.includes(source)) {
      throw new ApiError("INVALID_REQUEST", 400, "Unsupported source.");
    }

    const result = await recordLeadEvent({
      email,
      eventType,
      source,
      route,
      metadata,
      name,
      phone,
      company,
    });

    return successResponse({
      lead_id: result.lead.id,
      event_id: result.event.id,
      score: result.lead.score,
      temperature: result.lead.temperature,
      status: result.lead.status,
      promoted: result.promoted,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to record lead event."),
    );
  }
}
