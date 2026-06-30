import "server-only";

import { ApiError } from "@/server/core/api";
import type { AppointmentRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { recordLeadEvent } from "@/server/domain/leads";
import { notifyTeam } from "@/server/domain/team-notifications";

type CreateAppointmentInput = {
  visitor_name: string;
  visitor_email: string;
  visitor_phone?: string;
  service_interested_in: string;
  preferred_datetime: string;
  timezone: string;
  notes?: string;
  requestId?: string;
  ip?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parsePreferredDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Preferred date/time is invalid.");
  }

  if (date.getTime() < Date.now() + 30 * 60 * 1000) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Appointment must be at least 30 minutes in the future.");
  }

  return date;
}

async function sendAppointmentEmail(appointment: AppointmentRecord) {
  const summary = [
    `Name: ${appointment.visitor_name}`,
    `Email: ${appointment.visitor_email}`,
    `Phone: ${appointment.visitor_phone ?? "N/A"}`,
    `Service: ${appointment.service_interested_in}`,
    `Timezone: ${appointment.timezone}`,
    `Preferred date: ${appointment.preferred_datetime}`,
    `Notes: ${appointment.notes ?? "N/A"}`,
  ].join("\n");

  const result = await notifyTeam({
    kind: "appointment_requested",
    subject: `New booking request from ${appointment.visitor_name}`,
    text: summary,
    replyTo: appointment.visitor_email,
    payload: {
      appointment_id: appointment.id,
      name: appointment.visitor_name,
      email: appointment.visitor_email,
      phone: appointment.visitor_phone,
      service: appointment.service_interested_in,
      preferred_datetime: appointment.preferred_datetime,
      timezone: appointment.timezone,
    },
  });

  return { delivered: result.emailDelivered };
}

export async function createAppointment(input: CreateAppointmentInput) {
  if (!input.visitor_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Name is required.");
  }

  if (!EMAIL_REGEX.test(input.visitor_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  if (!input.service_interested_in.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Service interest is required.");
  }

  const preferredDate = parsePreferredDate(input.preferred_datetime);
  const database = await readDatabase();
  const isoValue = preferredDate.toISOString();
  const conflicting = database.appointments.find(
    (appointment) =>
      appointment.preferred_datetime === isoValue &&
      (appointment.status === "inquiry" || appointment.status === "confirmed")
  );

  if (conflicting) {
    throw new ApiError("CONFLICT", 409, "That time slot has already been reserved. Please choose another one.");
  }

  const now = new Date().toISOString();
  const appointment: AppointmentRecord = {
    id: crypto.randomUUID(),
    visitor_name: input.visitor_name.trim(),
    visitor_email: input.visitor_email.trim().toLowerCase(),
    visitor_phone: input.visitor_phone?.trim() || undefined,
    service_interested_in: input.service_interested_in.trim(),
    preferred_datetime: isoValue,
    timezone: input.timezone.trim() || "UTC",
    duration_minutes: 30,
    status: "inquiry",
    notes: input.notes?.trim() || undefined,
    created_at: now,
  };

  await writeDatabase((next) => ({
    ...next,
    appointments: [appointment, ...next.appointments],
  }));

  const emailDelivery = await sendAppointmentEmail(appointment).catch(async (error: unknown) => {
    await recordAuditLog({
      level: "error",
      action: "appointment.email_failed",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: appointment.visitor_email,
      metadata: {
        appointment_id: appointment.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });

    return { delivered: false };
  });

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "appointment_requested",
      route: "/book-appointment",
      source: "booking_form",
      actor_email: appointment.visitor_email,
      metadata: {
        appointment_id: appointment.id,
        service: appointment.service_interested_in,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "appointment.created",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: appointment.visitor_email,
      metadata: {
        appointment_id: appointment.id,
        preferred_datetime: appointment.preferred_datetime,
        email_delivered: emailDelivery.delivered,
      },
    }),
    recordLeadEvent({
      email: appointment.visitor_email,
      eventType: "booking",
      source: "booking_form",
      route: "/book-appointment",
      name: appointment.visitor_name,
      phone: appointment.visitor_phone,
      relatedAppointmentId: appointment.id,
      metadata: {
        service: appointment.service_interested_in,
        preferred_datetime: appointment.preferred_datetime,
        timezone: appointment.timezone,
      },
    }).catch(async (error: unknown) => {
      await recordAuditLog({
        level: "warning",
        action: "appointment.lead_event_failed",
        actor_email: appointment.visitor_email,
        metadata: { message: error instanceof Error ? error.message : "Unknown error" },
      });
      return undefined;
    }),
  ]);

  return {
    appointment,
    email_delivery: emailDelivery,
  };
}

export async function getAppointmentById(appointmentId: string) {
  const database = await readDatabase();
  return database.appointments.find((appointment) => appointment.id === appointmentId) ?? null;
}

export async function listAppointments() {
  const database = await readDatabase();
  return database.appointments;
}

export async function listAppointmentsByEmail(email: string) {
  const database = await readDatabase();
  return database.appointments.filter((appointment) => appointment.visitor_email === email.toLowerCase());
}
