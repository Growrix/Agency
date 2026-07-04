import "server-only";

import type { JobKind, JobRecord, JobStatus, NotificationLogRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";
import { getRuntimeConfig } from "@/server/config/runtime";

const JOB_LOG_LIMIT = 2_000;
const LARK_TIMEOUT_MS = 4_000;
const DEFAULT_MAX_ATTEMPTS = 3;
const RETRY_BACKOFF_MINUTES = [5, 30, 120] as const;

export type EnqueueJobInput = {
  kind: JobKind;
  payload?: Record<string, unknown>;
  max_attempts?: number;
  delay_seconds?: number;
};

function now() {
  return new Date().toISOString();
}

export async function enqueueJob(input: EnqueueJobInput): Promise<JobRecord> {
  const runAt = new Date(Date.now() + (input.delay_seconds ?? 0) * 1000).toISOString();
  const record: JobRecord = {
    id: crypto.randomUUID(),
    kind: input.kind,
    payload: input.payload ?? {},
    status: "pending",
    attempts: 0,
    max_attempts: input.max_attempts ?? DEFAULT_MAX_ATTEMPTS,
    next_run_at: runAt,
    created_at: now(),
    updated_at: now(),
  };

  await writeDatabase((next) => ({
    ...next,
    jobs: [record, ...next.jobs].slice(0, JOB_LOG_LIMIT),
  }));

  return record;
}

export async function listJobs(status?: JobStatus): Promise<JobRecord[]> {
  const database = await readDatabase();
  const filtered = status ? database.jobs.filter((job) => job.status === status) : database.jobs;
  return [...filtered].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
}

async function updateJob(
  jobId: string,
  patch: Partial<Pick<JobRecord, "status" | "attempts" | "next_run_at" | "last_error" | "completed_at">>,
) {
  await writeDatabase((next) => ({
    ...next,
    jobs: next.jobs.map((job) =>
      job.id === jobId ? { ...job, ...patch, updated_at: now() } : job,
    ),
  }));
}

async function retryLarkWebhook(payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
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
      body: JSON.stringify(payload),
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

type NotificationRetryPayload = {
  notification_id: string;
};

function buildRetryPayload(notification: NotificationLogRecord): Record<string, unknown> {
  const lines: string[] = [`[${notification.kind}] ${notification.title} (retry)`];
  for (const [key, value] of Object.entries(notification.payload)) {
    if (value === undefined || value === null) continue;
    const display = typeof value === "string" ? value : JSON.stringify(value);
    lines.push(`• ${key}: ${display}`);
  }
  return { msg_type: "text", content: { text: lines.join("\n") } };
}

async function runNotificationRetryJob(job: JobRecord): Promise<{ ok: boolean; error?: string }> {
  const payload = job.payload as NotificationRetryPayload;
  const database = await readDatabase();
  const notification = database.notifications.find((entry) => entry.id === payload.notification_id);
  if (!notification) {
    return { ok: false, error: "notification_not_found" };
  }

  const result = await retryLarkWebhook(buildRetryPayload(notification));

  const nextAttempt = notification.attempt_count + 1;
  await writeDatabase((next) => ({
    ...next,
    notifications: next.notifications.map((entry) =>
      entry.id === notification.id
        ? {
            ...entry,
            status: result.ok ? "sent" : "failed",
            attempt_count: nextAttempt,
            error_message: result.ok ? undefined : result.error,
            delivered_at: result.ok ? new Date().toISOString() : entry.delivered_at,
          }
        : entry,
    ),
  }));

  return result;
}

export type JobRunResult = {
  processed: number;
  succeeded: number;
  failed: number;
  skipped: number;
};

async function runOne(job: JobRecord): Promise<{ ok: boolean; error?: string }> {
  try {
    switch (job.kind) {
      case "notification_retry":
        return await runNotificationRetryJob(job);
      case "email_retry":
      case "invoice_regenerate":
        return { ok: false, error: `job_kind_${job.kind}_not_implemented` };
      default:
        return { ok: false, error: `unknown_job_kind_${String(job.kind)}` };
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "unknown_error" };
  }
}

export async function runDueJobs(limit = 25): Promise<JobRunResult> {
  const nowMs = Date.now();
  const database = await readDatabase();
  const due = database.jobs
    .filter((job) => job.status === "pending" && new Date(job.next_run_at).getTime() <= nowMs)
    .slice(0, limit);

  const result: JobRunResult = { processed: 0, succeeded: 0, failed: 0, skipped: 0 };

  for (const job of due) {
    result.processed += 1;
    const attempts = job.attempts + 1;
    await updateJob(job.id, { status: "processing", attempts });

    const outcome = await runOne(job);

    if (outcome.ok) {
      result.succeeded += 1;
      await updateJob(job.id, {
        status: "completed",
        completed_at: now(),
        last_error: undefined,
      });
      continue;
    }

    if (attempts >= job.max_attempts) {
      result.failed += 1;
      await updateJob(job.id, {
        status: "failed",
        last_error: outcome.error,
      });
      await recordAuditLog({
        level: "warning",
        action: "job.exhausted_retries",
        metadata: { kind: job.kind, job_id: job.id, error: outcome.error },
      });
      continue;
    }

    const backoffIndex = Math.min(attempts - 1, RETRY_BACKOFF_MINUTES.length - 1);
    const delayMs = RETRY_BACKOFF_MINUTES[backoffIndex] * 60_000;
    result.skipped += 1;
    await updateJob(job.id, {
      status: "pending",
      last_error: outcome.error,
      next_run_at: new Date(Date.now() + delayMs).toISOString(),
    });
  }

  return result;
}

export async function enqueueNotificationRetriesFromLog(): Promise<number> {
  const database = await readDatabase();
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const candidates = database.notifications.filter(
    (entry) =>
      entry.status === "failed" &&
      entry.attempt_count < DEFAULT_MAX_ATTEMPTS &&
      entry.channel === "lark" &&
      new Date(entry.created_at).getTime() >= cutoff,
  );

  const existingIds = new Set(
    database.jobs
      .filter((job) => job.kind === "notification_retry" && (job.status === "pending" || job.status === "processing"))
      .map((job) => (job.payload as NotificationRetryPayload).notification_id),
  );

  let enqueued = 0;
  for (const candidate of candidates) {
    if (existingIds.has(candidate.id)) continue;
    await enqueueJob({ kind: "notification_retry", payload: { notification_id: candidate.id } });
    enqueued += 1;
  }

  return enqueued;
}
