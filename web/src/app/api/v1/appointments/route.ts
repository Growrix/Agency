import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { createAppointment } from "@/server/domain/appointments";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "appointments",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.bookingLimitPerMinute,
    });

    const body = (await request.json()) as Record<string, unknown>;
    assertNoBotTrap(body.website);

    const result = await createAppointment({
      visitor_name: typeof body.visitor_name === "string" ? body.visitor_name : typeof body.name === "string" ? body.name : "",
      visitor_email: typeof body.visitor_email === "string" ? body.visitor_email : typeof body.email === "string" ? body.email : "",
      visitor_phone: typeof body.visitor_phone === "string" ? body.visitor_phone : typeof body.phone === "string" ? body.phone : undefined,
      service_interested_in:
        typeof body.service_interested_in === "string"
          ? body.service_interested_in
          : typeof body.service === "string"
            ? body.service
            : "",
      preferred_datetime: typeof body.preferred_datetime === "string" ? body.preferred_datetime : "",
      timezone: typeof body.timezone === "string" ? body.timezone : "UTC",
      notes: typeof body.notes === "string" ? body.notes : typeof body.message === "string" ? body.message : undefined,
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse({
      ...result.appointment,
      email_delivery: result.email_delivery,
      status_url: `/api/v1/appointments/${result.appointment.id}`,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create appointment."));
  }
}
