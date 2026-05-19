import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getAppointmentById } from "@/server/domain/appointments";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ appointmentId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { appointmentId } = await context.params;
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      throw new ApiError("NOT_FOUND", 404, "Appointment not found.");
    }

    return successResponse(appointment);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load appointment."));
  }
}
