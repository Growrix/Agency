import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireCompletedSubscriber } from "@/server/auth/guards";
import { rescheduleAppointment } from "@/server/domain/appointments";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ appointmentId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCompletedSubscriber(request);
    const { appointmentId } = await context.params;
    const body = (await request.json().catch(() => ({}))) as {
      preferred_datetime?: unknown;
      cancel?: unknown;
    };

    const preferredDatetime =
      typeof body.preferred_datetime === "string" && body.preferred_datetime.trim() !== ""
        ? body.preferred_datetime
        : undefined;
    const cancel = body.cancel === true;

    if (!preferredDatetime && !cancel) {
      throw new ApiError(
        "FIELD_VALIDATION_FAILED",
        400,
        "Provide a new preferred_datetime or set cancel=true.",
      );
    }

    const updated = await rescheduleAppointment(appointmentId, {
      preferred_datetime: preferredDatetime,
      cancel,
      requesterEmail: user.email,
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to update appointment."),
    );
  }
}
