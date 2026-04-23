import "server-only";

import { Resend } from "resend";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { ContactInquiryRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";

type CreateContactInquiryInput = {
  visitor_name: string;
  visitor_email: string;
  company?: string;
  service?: string;
  budget?: string;
  urgency?: string;
  message: string;
  inquiry_type?: ContactInquiryRecord["inquiry_type"];
  source?: string;
  requestId?: string;
  ip?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInquirySubject(input: CreateContactInquiryInput) {
  return input.service ? `${input.service} inquiry from ${input.visitor_name}` : `New inquiry from ${input.visitor_name}`;
}

async function sendInquiryEmail(inquiry: ContactInquiryRecord) {
  const runtime = getRuntimeConfig();
  if (!runtime.contact.resendApiKey || !runtime.contact.toEmail || !runtime.contact.fromEmail) {
    return { delivered: false, fallbackSenderUsed: false };
  }

  const resend = new Resend(runtime.contact.resendApiKey);
  const html = `
    <h2>New inquiry from Growrix</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(inquiry.visitor_name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(inquiry.visitor_email)}</td></tr>
      ${inquiry.company ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(inquiry.company)}</td></tr>` : ""}
      ${inquiry.service ? `<tr><td><strong>Service</strong></td><td>${escapeHtml(inquiry.service)}</td></tr>` : ""}
      ${inquiry.budget ? `<tr><td><strong>Budget</strong></td><td>${escapeHtml(inquiry.budget)}</td></tr>` : ""}
      ${inquiry.urgency ? `<tr><td><strong>Urgency</strong></td><td>${escapeHtml(inquiry.urgency)}</td></tr>` : ""}
      <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</td></tr>
    </table>
  `;

  const subject = buildInquirySubject({
    visitor_name: inquiry.visitor_name,
    visitor_email: inquiry.visitor_email,
    company: inquiry.company,
    service: inquiry.service,
    budget: inquiry.budget,
    urgency: inquiry.urgency,
    message: inquiry.message,
  });

  const send = await resend.emails.send({
    from: runtime.contact.fromEmail,
    to: [runtime.contact.toEmail],
    replyTo: inquiry.visitor_email,
    subject,
    html,
  });

  if (!send.error) {
    return { delivered: true, fallbackSenderUsed: false };
  }

  const retry = await resend.emails.send({
    from: runtime.contact.fallbackFromEmail,
    to: [runtime.contact.toEmail],
    replyTo: inquiry.visitor_email,
    subject,
    html,
    headers: {
      "X-Original-From": runtime.contact.fromEmail,
    },
  });

  return { delivered: !retry.error, fallbackSenderUsed: !retry.error };
}

export async function createContactInquiry(input: CreateContactInquiryInput) {
  if (!input.visitor_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Name is required.");
  }

  if (!EMAIL_REGEX.test(input.visitor_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  if (input.message.trim().length < 10) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Message must be at least 10 characters.");
  }

  const now = new Date().toISOString();
  const inquiry: ContactInquiryRecord = {
    id: crypto.randomUUID(),
    visitor_name: input.visitor_name.trim(),
    visitor_email: input.visitor_email.trim().toLowerCase(),
    company: input.company?.trim() || undefined,
    subject: buildInquirySubject(input),
    message: input.message.trim(),
    inquiry_type: input.inquiry_type ?? "general",
    status: "new",
    service: input.service?.trim() || undefined,
    budget: input.budget?.trim() || undefined,
    urgency: input.urgency?.trim() || undefined,
    created_at: now,
    updated_at: now,
  };

  await writeDatabase((database) => ({
    ...database,
    inquiries: [inquiry, ...database.inquiries],
  }));

  const emailDelivery = await sendInquiryEmail(inquiry).catch(async (error: unknown) => {
    await recordAuditLog({
      level: "error",
      action: "contact.email_failed",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: inquiry.visitor_email,
      metadata: {
        inquiry_id: inquiry.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });

    return { delivered: false, fallbackSenderUsed: false };
  });

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "contact_submitted",
      route: "/contact",
      source: input.source ?? "contact_form",
      actor_email: inquiry.visitor_email,
      metadata: {
        inquiry_id: inquiry.id,
        service: inquiry.service ?? null,
        email_delivered: emailDelivery.delivered,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "contact.created",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: inquiry.visitor_email,
      metadata: {
        inquiry_id: inquiry.id,
        service: inquiry.service ?? null,
        source: input.source ?? "contact_form",
      },
    }),
  ]);

  return {
    inquiry,
    email_delivery: emailDelivery,
  };
}

export async function listInquiries() {
  const database = await readDatabase();
  return database.inquiries;
}
