import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { withDatabase } from "@/server/data/store";

export const dynamic = "force-dynamic";

type FunnelCounts = {
  page_views: number;
  product_views: number;
  product_clicks: number;
  add_to_cart: number;
  checkout_started: number;
  orders_created: number;
  orders_paid: number;
  orders_delivered: number;
  service_requests: number;
  ai_messages: number;
  whatsapp_clicks: number;
  contact_form_submits: number;
  appointment_bookings: number;
};

function emptyCounts(): FunnelCounts {
  return {
    page_views: 0,
    product_views: 0,
    product_clicks: 0,
    add_to_cart: 0,
    checkout_started: 0,
    orders_created: 0,
    orders_paid: 0,
    orders_delivered: 0,
    service_requests: 0,
    ai_messages: 0,
    whatsapp_clicks: 0,
    contact_form_submits: 0,
    appointment_bookings: 0,
  };
}

const EVENT_TO_BUCKET: Record<string, keyof FunnelCounts> = {
  page_view: "page_views",
  product_view: "product_views",
  product_click: "product_clicks",
  add_to_cart: "add_to_cart",
  checkout_started: "checkout_started",
  ai_message: "ai_messages",
  whatsapp_click: "whatsapp_clicks",
  contact_form: "contact_form_submits",
  booking: "appointment_bookings",
  service_request_created: "service_requests",
};

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const { searchParams } = new URL(request.url);
    const sinceParam = searchParams.get("since");
    const since = sinceParam ? new Date(sinceParam) : null;
    if (sinceParam && Number.isNaN(since?.getTime() ?? Number.NaN)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid since parameter (expect ISO date).");
    }

    const summary = await withDatabase((database) => {
      const counts = emptyCounts();
      const inWindow = (iso?: string) => {
        if (!since) return true;
        if (!iso) return false;
        return new Date(iso).getTime() >= since.getTime();
      };

      for (const event of database.analytics_events) {
        if (!inWindow(event.created_at)) continue;
        const bucket = EVENT_TO_BUCKET[event.event_name];
        if (bucket) counts[bucket] += 1;
      }

      for (const ev of database.lead_events ?? []) {
        if (!inWindow(ev.created_at)) continue;
        const bucket = EVENT_TO_BUCKET[ev.event_type];
        if (bucket) counts[bucket] += 1;
      }

      let ordersCreated = 0;
      let ordersPaid = 0;
      let ordersDelivered = 0;
      for (const order of database.orders) {
        if (!inWindow(order.created_at)) continue;
        ordersCreated += 1;
        if (order.payment_status === "succeeded") ordersPaid += 1;
        if (order.fulfillment_status === "delivered") ordersDelivered += 1;
      }
      counts.orders_created = ordersCreated;
      counts.orders_paid = ordersPaid;
      counts.orders_delivered = ordersDelivered;

      const serviceRequestsInWindow = database.service_requests.filter((record) => inWindow(record.created_at)).length;
      counts.service_requests = serviceRequestsInWindow;

      const leadsByTemperature = {
        cold: 0,
        warm: 0,
        hot: 0,
        customer: 0,
      };
      for (const lead of database.leads) {
        leadsByTemperature[lead.temperature] += 1;
      }

      return {
        window: { since: since?.toISOString() ?? null, generated_at: new Date().toISOString() },
        counts,
        conversion_rates: {
          view_to_click: counts.product_views ? counts.product_clicks / counts.product_views : 0,
          click_to_cart: counts.product_clicks ? counts.add_to_cart / counts.product_clicks : 0,
          cart_to_checkout: counts.add_to_cart ? counts.checkout_started / counts.add_to_cart : 0,
          checkout_to_paid: counts.checkout_started ? counts.orders_paid / counts.checkout_started : 0,
          paid_to_delivered: counts.orders_paid ? counts.orders_delivered / counts.orders_paid : 0,
        },
        leads_by_temperature: leadsByTemperature,
        totals: {
          leads: database.leads.length,
          lead_events: (database.lead_events ?? []).length,
          orders: database.orders.length,
          service_requests: database.service_requests.length,
          downloads: database.downloads.length,
          licenses: database.licenses.length,
          notifications: database.notifications.length,
        },
      };
    });

    return successResponse(summary);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load funnel analytics."));
  }
}
