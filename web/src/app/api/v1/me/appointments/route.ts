import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { listAppointments, listAppointmentsByEmail } from "@/server/domain/appointments";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const appointments = user.role === "admin" ? await listAppointments() : await listAppointmentsByEmail(user.email);
    return successResponse(appointments);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load appointments."));
  }
}
