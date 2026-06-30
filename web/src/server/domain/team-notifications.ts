import "server-only";

import { Resend } from "resend";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { NotificationKind } from "@/server/data/schema";
import { dispatchNotification } from "@/server/domain/notifications";
import { recordAuditLog } from "@/server/logging/observability";

const TEAM_EMAIL_TIMEOUT_MS = 3_000;

type EmailBody = { html: string; text?: string } | { text: string; html?: string };

type NotifyTeamInput = EmailBody & {
  kind: NotificationKind;
  subject: string;
  replyTo?: string;
  payload: Record<string, unknown>;
  relatedLeadId?: string;
  relatedOrderId?: string;
  relatedServiceRequestId?: string;
};

type NotifyTeamResult = {
  emailDelivered: boolean;
  emailFallbackUsed: boolean;
  emailAttempted: boolean;
};

async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

async function sendTeamEmail(input: NotifyTeamInput): Promise<{ delivered: boolean; fallbackUsed: boolean }> {
  const runtime = getRuntimeConfig();
  if (!runtime.contact.resendApiKey || runtime.contact.toEmails.length === 0 || !runtime.contact.fromEmail) {
    return { delivered: false, fallbackUsed: false };
  }

  const resend = new Resend(runtime.contact.resendApiKey);
  const bodyOptions = input.html !== undefined
    ? { html: input.html, ...(input.text ? { text: input.text } : {}) }
    : { text: input.text! };
  const base = {
    to: runtime.contact.toEmails,
    subject: input.subject,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    ...bodyOptions,
  };

  const send = await resend.emails.send({
    ...base,
    from: runtime.contact.fromEmail,
  });

  if (!send.error) {
    return { delivered: true, fallbackUsed: false };
  }

  const retry = await resend.emails.send({
    ...base,
    from: runtime.contact.fallbackFromEmail,
    headers: {
      "X-Original-From": runtime.contact.fromEmail,
    },
  });

  return { delivered: !retry.error, fallbackUsed: !retry.error };
}

export async function notifyTeam(input: NotifyTeamInput): Promise<NotifyTeamResult> {
  const runtime = getRuntimeConfig();
  const emailAttempted =
    Boolean(runtime.contact.resendApiKey) &&
    runtime.contact.toEmails.length > 0 &&
    Boolean(runtime.contact.fromEmail) &&
    (input.html !== undefined || input.text !== undefined);

  const emailPromise = emailAttempted
    ? withTimeout(sendTeamEmail(input), TEAM_EMAIL_TIMEOUT_MS, { delivered: false, fallbackUsed: false }).catch(
        async (error: unknown) => {
          await recordAuditLog({
            level: "error",
            action: "team_notification.email_failed",
            metadata: {
              kind: input.kind,
              subject: input.subject,
              message: error instanceof Error ? error.message : "unknown_error",
            },
          });
          return { delivered: false, fallbackUsed: false };
        },
      )
    : Promise.resolve({ delivered: false, fallbackUsed: false });

  const larkPromise = dispatchNotification({
    kind: input.kind,
    title: input.subject,
    payload: input.payload,
    relatedLeadId: input.relatedLeadId,
    relatedOrderId: input.relatedOrderId,
    relatedServiceRequestId: input.relatedServiceRequestId,
  }).catch(async (error: unknown) => {
    await recordAuditLog({
      level: "warning",
      action: "team_notification.lark_failed",
      metadata: {
        kind: input.kind,
        message: error instanceof Error ? error.message : "unknown_error",
      },
    });
    return undefined;
  });

  const [emailResult] = await Promise.all([emailPromise, larkPromise]);

  return {
    emailDelivered: emailResult.delivered,
    emailFallbackUsed: emailResult.fallbackUsed,
    emailAttempted,
  };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
