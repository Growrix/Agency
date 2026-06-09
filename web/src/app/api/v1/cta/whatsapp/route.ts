import { NextRequest, NextResponse } from "next/server";
import { createRequestContext } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { recordLeadEvent } from "@/server/domain/leads";
import { recordAnalyticsEvent } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

// Tracked WhatsApp redirect: GET /api/v1/cta/whatsapp?email=...&route=...&product=...
// - Records a lead event when an email is provided
// - Always emits an analytics event for funnel measurement
// - Redirects to the configured WhatsApp href (with optional `text=` passthrough)
export async function GET(request: NextRequest) {
  const context = createRequestContext(request);
  const url = new URL(request.url);
  const params = url.searchParams;

  const email = (params.get("email") ?? "").trim();
  const route = params.get("route") ?? request.headers.get("referer") ?? "/";
  const productSlug = params.get("product") ?? undefined;
  const variantSlug = params.get("variant") ?? undefined;
  const text = params.get("text") ?? undefined;
  const name = params.get("name") ?? undefined;

  const runtime = getRuntimeConfig();
  const targetUrl = new URL(runtime.cta.whatsappHref);
  if (text) {
    targetUrl.searchParams.set("text", text);
  }

  try {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await recordLeadEvent({
        email,
        eventType: "whatsapp_click",
        source: "whatsapp_cta",
        route,
        name: name ?? undefined,
        metadata: {
          product_slug: productSlug,
          variant_slug: variantSlug,
        },
      });
    } else {
      await recordAnalyticsEvent({
        event_name: "whatsapp_click_anonymous",
        route,
        source: "whatsapp_cta",
        metadata: { ip: context.ip, product_slug: productSlug, variant_slug: variantSlug },
      });
    }
  } catch {
    // Never block the redirect on telemetry failure.
  }

  return NextResponse.redirect(targetUrl.toString(), { status: 302 });
}
