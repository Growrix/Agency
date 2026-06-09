import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";
import { recordLeadEvent, upsertLead } from "@/server/domain/leads";
import type { LeadSource } from "@/server/data/schema";

export const dynamic = "force-dynamic";

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
      scope: "lead-create",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.contactLimitPerMinute,
    });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const email = typeof body.email === "string" ? body.email : "";
    const source = typeof body.source === "string" ? (body.source as LeadSource) : "admin_manual";
    if (!ALLOWED_SOURCES.includes(source)) {
      throw new ApiError("INVALID_REQUEST", 400, "Unsupported source.");
    }

    const name = typeof body.name === "string" ? body.name : undefined;
    const phone = typeof body.phone === "string" ? body.phone : undefined;
    const company = typeof body.company === "string" ? body.company : undefined;
    const notes = typeof body.notes === "string" ? body.notes : undefined;
    const route = typeof body.route === "string" ? body.route : undefined;

    const lead = await upsertLead({ email, name, phone, company, source, route, notes });

    // Always log an admin_note event so the timeline reflects manual creation.
    await recordLeadEvent({
      email,
      eventType: "admin_note",
      source,
      route,
      metadata: { reason: "manual_lead_capture" },
    });

    return successResponse({
      lead_id: lead.id,
      email: lead.email,
      status: lead.status,
      score: lead.score,
      temperature: lead.temperature,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create lead."),
    );
  }
}
