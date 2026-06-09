import "server-only";

import { getRuntimeConfig } from "@/server/config/runtime";
import type {
  NotificationChannel,
  NotificationKind,
  NotificationLogRecord,
  NotificationStatus,
} from "@/server/data/schema";
import { writeDatabase, readDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";

const NOTIFICATION_LOG_LIMIT = 2_000;
const LARK_TIMEOUT_MS = 4_000;

type NotifyInput = {
  kind: NotificationKind;
  title: string;
  payload: Record<string, unknown>;
  relatedLeadId?: string;
  relatedOrderId?: string;
  relatedServiceRequestId?: string;
};

async function appendLog(entry: NotificationLogRecord) {
  await writeDatabase((database) => ({
    ...database,
    notifications: [entry, ...database.notifications].slice(0, NOTIFICATION_LOG_LIMIT),
  }));
}

function buildLogEntry(
  input: NotifyInput,
  channel: NotificationChannel,
  status: NotificationStatus,
  errorMessage: string | undefined,
  attempt: number,
): NotificationLogRecord {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    channel,
    kind: input.kind,
    status,
    title: input.title,
    payload: input.payload,
    related_lead_id: input.relatedLeadId,
    related_order_id: input.relatedOrderId,
    related_service_request_id: input.relatedServiceRequestId,
    error_message: errorMessage,
    attempt_count: attempt,
    delivered_at: status === "sent" ? now : undefined,
    created_at: now,
  };
}

function buildLarkText(input: NotifyInput) {
  const lines: string[] = [`[${input.kind}] ${input.title}`];
  for (const [key, value] of Object.entries(input.payload)) {
    if (value === undefined || value === null) continue;
    const display = typeof value === "string" ? value : JSON.stringify(value);
    lines.push(`• ${key}: ${display}`);
  }
  return lines.join("\n");
}

async function sendLarkWebhook(input: NotifyInput): Promise<{ ok: boolean; error?: string }> {
  const { notifications } = getRuntimeConfig();
  if (!notifications.larkWebhookUrl) {
    return { ok: false, error: "lark_not_configured" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LARK_TIMEOUT_MS);

  try {
    const response = await fetch(notifications.larkWebhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        msg_type: "text",
        content: { text: buildLarkText(input) },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, error: `lark_status_${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "lark_unknown_error" };
  } finally {
    clearTimeout(timer);
  }
}

export async function dispatchNotification(input: NotifyInput) {
  const { notifications } = getRuntimeConfig();

  if (!notifications.larkWebhookUrl) {
    const entry = buildLogEntry(input, "console", "skipped", "lark_not_configured", 0);
    await appendLog(entry);
    console.info(`[notify:${input.kind}] ${input.title}`, input.payload);
    return entry;
  }

  const result = await sendLarkWebhook(input);

  if (result.ok) {
    const entry = buildLogEntry(input, "lark", "sent", undefined, 1);
    await appendLog(entry);
    return entry;
  }

  const entry = buildLogEntry(input, "lark", "failed", result.error, 1);
  await appendLog(entry);
  await recordAuditLog({
    level: "warning",
    action: "notification.lark_failed",
    metadata: {
      kind: input.kind,
      error: result.error,
      title: input.title,
    },
  });
  return entry;
}

export async function listRecentNotifications(limit = 50) {
  const database = await readDatabase();
  return database.notifications.slice(0, limit);
}
