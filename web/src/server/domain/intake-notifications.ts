import "server-only";

import { Resend } from "resend";
import type { ClientIntakeSubmissionRecord, NotificationStatus } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { getRuntimeConfig } from "@/server/config/runtime";
import {
  buildBrandedEmailHtml,
  buildDetailRow,
  buildDetailsTable,
  buildEmailButton,
  buildHighlightedCallout,
  EMAIL_BRAND,
  escapeHtml,
  getTransactionalFromEmail,
} from "@/server/domain/email-layout";
import { notifyTeam } from "@/server/domain/team-notifications";
import { recordAuditLog } from "@/server/logging/observability";

const CLIENT_EMAIL_TIMEOUT_MS = 5_000;

function absoluteAdminIntakeUrl(intakeId: string) {
  const base = getRuntimeConfig().appBaseUrl.replace(/\/$/, "");
  return `${base}/admin/intakes/${intakeId}`;
}

function absoluteClientProjectsUrl() {
  const base = getRuntimeConfig().appBaseUrl.replace(/\/$/, "");
  return `${base}/dashboard/projects`;
}

async function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), CLIENT_EMAIL_TIMEOUT_MS)),
  ]);
}

async function appendIntakeNotificationLog(input: {
  channel: "resend" | "console";
  kind: "client_intake_received" | "client_intake_confirmed";
  status: NotificationStatus;
  title: string;
  payload: Record<string, unknown>;
  errorMessage?: string;
}) {
  const now = new Date().toISOString();
  await writeDatabase((database) => ({
    ...database,
    notifications: [
      {
        id: crypto.randomUUID(),
        channel: input.channel,
        kind: input.kind,
        status: input.status,
        title: input.title,
        payload: input.payload,
        error_message: input.errorMessage,
        attempt_count: 1,
        delivered_at: input.status === "sent" ? now : undefined,
        created_at: now,
      },
      ...database.notifications,
    ],
  }));
}

export async function notifyAdminIntakeReceived(intake: ClientIntakeSubmissionRecord) {
  const adminHref = absoluteAdminIntakeUrl(intake.id);
  const subject = intake.is_free_demo
    ? `Free demo intake: ${intake.business_name}`
    : `New client intake: ${intake.business_name}`;

  const text = [
    `Submission: ${intake.submission_number}`,
    `Client: ${intake.client_name} <${intake.client_email}>`,
    `Business: ${intake.business_name}`,
    intake.industry ? `Industry: ${intake.industry}` : "",
    intake.is_free_demo ? "Campaign: Growrix OS Launch Free Demo" : "",
    "",
    "Summary:",
    intake.business_description.slice(0, 500),
    "",
    `Admin: ${adminHref}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = [
    "<h2>New client intake received</h2>",
    `<p><strong>Submission:</strong> ${escapeHtml(intake.submission_number)}</p>`,
    `<p><strong>Client:</strong> ${escapeHtml(intake.client_name)} &lt;${escapeHtml(intake.client_email)}&gt;</p>`,
    `<p><strong>Business:</strong> ${escapeHtml(intake.business_name)}</p>`,
    intake.industry ? `<p><strong>Industry:</strong> ${escapeHtml(intake.industry)}</p>` : "",
    intake.is_free_demo ? "<p><strong>Campaign:</strong> Free Demo (launch)</p>" : "",
    "<h3>Business description</h3>",
    `<p>${escapeHtml(intake.business_description.slice(0, 500))}</p>`,
    `<p><a href="${adminHref}">Open in admin</a></p>`,
  ]
    .filter(Boolean)
    .join("");

  const result = await notifyTeam({
    kind: "client_intake_received",
    subject,
    text,
    html,
    replyTo: intake.client_email,
    payload: {
      intake_id: intake.id,
      submission_number: intake.submission_number,
      business_name: intake.business_name,
      client_email: intake.client_email,
      is_free_demo: intake.is_free_demo,
      admin_href: adminHref,
    },
  });

  let status: NotificationStatus = "skipped";
  let channel: "resend" | "console" = "console";
  let errorMessage: string | undefined;

  if (result.emailDelivered) {
    status = "sent";
    channel = "resend";
  } else if (result.emailAttempted) {
    status = "failed";
    channel = "resend";
    errorMessage = "resend_delivery_failed_or_timed_out";
  } else {
    status = "skipped";
    channel = "console";
    errorMessage = "email_config_incomplete";
  }

  await appendIntakeNotificationLog({
    channel,
    kind: "client_intake_received",
    status,
    title: subject,
    payload: {
      intake_id: intake.id,
      submission_number: intake.submission_number,
      admin_href: adminHref,
      email_delivered: result.emailDelivered,
      email_attempted: result.emailAttempted,
      email_fallback_used: result.emailFallbackUsed,
    },
    errorMessage,
  });

  return result;
}

export async function notifyClientIntakeConfirmed(intake: ClientIntakeSubmissionRecord) {
  const runtime = getRuntimeConfig();
  const fromEmail = getTransactionalFromEmail();
  const projectsUrl = absoluteClientProjectsUrl();
  const subject = `We received your request (${intake.submission_number})`;
  const missingConfig: string[] = [];

  if (!runtime.contact.resendApiKey) missingConfig.push("RESEND_API_KEY");
  if (!fromEmail) missingConfig.push("CONTACT_FROM_EMAIL");
  if (!intake.client_email.trim()) missingConfig.push("client_email");

  if (missingConfig.length > 0) {
    await recordAuditLog({
      level: "warning",
      action: "client_intake.confirmation_email_skipped_missing_config",
      actor_email: intake.client_email,
      metadata: {
        intake_id: intake.id,
        submission_number: intake.submission_number,
        missing: missingConfig,
      },
    });
    await appendIntakeNotificationLog({
      channel: "console",
      kind: "client_intake_confirmed",
      status: "skipped",
      title: subject,
      payload: {
        intake_id: intake.id,
        client_email: intake.client_email,
        missing: missingConfig,
      },
      errorMessage: "email_config_incomplete",
    });
    return { delivered: false, attempted: false };
  }

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Thanks${intake.client_name ? `, <strong>${escapeHtml(intake.client_name)}</strong>` : ""}!
      We received your website request for <strong>${escapeHtml(intake.business_name)}</strong>.
    </p>
    ${buildHighlightedCallout("Our team will review your details and follow up with next steps.")}
    ${buildDetailsTable(
      [
        buildDetailRow("Submission", escapeHtml(intake.submission_number)),
        buildDetailRow("Business", escapeHtml(intake.business_name)),
        intake.is_free_demo ? buildDetailRow("Campaign", "Free Demo") : "",
      ]
        .filter(Boolean)
        .join(""),
    )}
    ${buildEmailButton(projectsUrl, "Open my projects")}
    <p style="margin:18px 0 0 0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Track progress anytime in your Growrix dashboard under <strong>Projects</strong>
      (not Submissions — that area is for contact forms and bookings).
    </p>
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Request ${intake.submission_number} received`,
    title: "Request received",
    bodyHtml,
  });

  const text = [
    `Thanks${intake.client_name ? `, ${intake.client_name}` : ""}!`,
    `We received your website request for ${intake.business_name}.`,
    `Submission: ${intake.submission_number}`,
    intake.is_free_demo ? "Campaign: Free Demo" : "",
    "",
    `Open your projects: ${projectsUrl}`,
    "",
    "Track progress under Projects in your dashboard (not Submissions).",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(runtime.contact.resendApiKey);
    const sendResult = await withTimeout(
      resend.emails.send({
        from: fromEmail!,
        to: [intake.client_email],
        replyTo: runtime.contact.toEmail,
        subject,
        html,
        text,
      }),
      {
        data: null,
        error: { name: "EmailTimeout", message: "Send timed out", statusCode: 408 },
        headers: null,
      } as unknown as Awaited<ReturnType<Resend["emails"]["send"]>>,
    );

    const delivered = !sendResult.error;
    if (!delivered) {
      await recordAuditLog({
        level: "error",
        action: "client_intake.confirmation_email_failed",
        actor_email: intake.client_email,
        metadata: {
          intake_id: intake.id,
          submission_number: intake.submission_number,
          message: sendResult.error?.message ?? "unknown_error",
        },
      });
    }

    await appendIntakeNotificationLog({
      channel: "resend",
      kind: "client_intake_confirmed",
      status: delivered ? "sent" : "failed",
      title: subject,
      payload: {
        intake_id: intake.id,
        client_email: intake.client_email,
        projects_href: projectsUrl,
      },
      errorMessage: delivered ? undefined : sendResult.error?.message ?? "resend_delivery_failed",
    });

    return { delivered, attempted: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_error";
    await recordAuditLog({
      level: "error",
      action: "client_intake.confirmation_email_failed",
      actor_email: intake.client_email,
      metadata: {
        intake_id: intake.id,
        submission_number: intake.submission_number,
        message,
      },
    });
    await appendIntakeNotificationLog({
      channel: "resend",
      kind: "client_intake_confirmed",
      status: "failed",
      title: subject,
      payload: {
        intake_id: intake.id,
        client_email: intake.client_email,
      },
      errorMessage: message,
    });
    return { delivered: false, attempted: true };
  }
}

export async function listRecentIntakeNotifications(limit = 20) {
  const database = await readDatabase();
  return database.notifications
    .filter((item) => item.kind === "client_intake_received" || item.kind === "client_intake_confirmed")
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit);
}
