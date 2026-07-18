import "server-only";

import type { ClientIntakeSubmissionRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { notifyTeam, escapeHtml } from "@/server/domain/team-notifications";

export async function notifyAdminIntakeReceived(intake: ClientIntakeSubmissionRecord) {
  const adminHref = `/admin/intakes/${intake.id}`;
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

  await notifyTeam({
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

  const now = new Date().toISOString();
  await writeDatabase((database) => ({
    ...database,
    notifications: [
      {
        id: crypto.randomUUID(),
        channel: "console",
        kind: "client_intake_received",
        status: "sent",
        title: subject,
        payload: {
          intake_id: intake.id,
          submission_number: intake.submission_number,
          admin_href: adminHref,
        },
        attempt_count: 1,
        delivered_at: now,
        created_at: now,
      },
      ...database.notifications,
    ],
  }));
}

export async function listRecentIntakeNotifications(limit = 20) {
  const database = await readDatabase();
  return database.notifications
    .filter((item) => item.kind === "client_intake_received")
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit);
}
