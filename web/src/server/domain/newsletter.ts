import "server-only";

import { Resend } from "resend";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { NewsletterSubscriberRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent } from "@/server/logging/observability";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendWelcomeEmail(email: string) {
  const runtime = getRuntimeConfig();
  if (!runtime.contact.resendApiKey || !runtime.contact.fromEmail) {
    return;
  }

  const resend = new Resend(runtime.contact.resendApiKey);
  const safeEmail = escapeHtml(email);
  await resend.emails.send({
    from: runtime.contact.fromEmail,
    to: email,
    subject: "You're on the Field Notes list",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111">
        <h2 style="font-size:20px;font-weight:700;margin:0 0 12px">Welcome to Field Notes</h2>
        <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 16px">
          You&apos;re subscribed at <strong>${safeEmail}</strong>. One short email a month with the studio&apos;s best writing on shipping software.
        </p>
        <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 24px">
          In the meantime, browse the blog at <a href="https://www.growrixos.com/blog" style="color:#22c55e">growrixos.com/blog</a>.
        </p>
        <p style="font-size:13px;color:#888;margin:0">
          — The Growrix OS team
        </p>
      </div>
    `,
  });
}

export async function subscribeToNewsletter(email: string, source = "blog_sidebar") {
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const database = await readDatabase();
  const existing = (database.newsletter_subscribers ?? []).find(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    // Idempotent — treat as success so the UI can confirm
    return { alreadySubscribed: true };
  }

  const record: NewsletterSubscriberRecord = {
    id: crypto.randomUUID(),
    email: email.toLowerCase().trim(),
    subscribed_at: new Date().toISOString(),
    source,
  };

  await writeDatabase((db) => ({
    ...db,
    newsletter_subscribers: [...(db.newsletter_subscribers ?? []), record],
  }));

  await recordAnalyticsEvent({
    event_name: "newsletter_subscribe",
    route: "/api/v1/newsletter",
    source,
    actor_email: email,
    metadata: {},
  });

  // Fire-and-forget welcome email — do not block the API response
  void sendWelcomeEmail(email).catch(() => undefined);

  return { alreadySubscribed: false };
}
