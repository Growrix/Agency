import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { readDatabase } from "@/server/data/store";
import type { AuditLogRecord } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const EMAIL_ACTION_PREFIXES = ["team_notification.email_"];
const EMAIL_FAILED_SUFFIXES = [".email_failed"];

function isEmailAction(action: string) {
  if (EMAIL_ACTION_PREFIXES.some((prefix) => action.startsWith(prefix))) {
    return true;
  }
  if (EMAIL_FAILED_SUFFIXES.some((suffix) => action.endsWith(suffix))) {
    return true;
  }
  return false;
}

type EmailLogEntry = {
  id: string;
  created_at: string;
  level: AuditLogRecord["level"];
  action: string;
  kind: string | null;
  subject: string | null;
  recipients: string[];
  status: "delivered" | "failed" | "skipped";
  error_message: string | null;
  actor_email: string | null;
};

function actionToStatus(action: string): EmailLogEntry["status"] {
  if (action.endsWith("email_failed")) return "failed";
  if (action.endsWith("email_skipped_missing_config")) return "skipped";
  if (action.endsWith("email_sent")) return "delivered";
  return "skipped";
}

function projectEntry(record: AuditLogRecord): EmailLogEntry {
  const meta = (record.metadata ?? {}) as Record<string, unknown>;
  const recipients = Array.isArray(meta.recipients)
    ? meta.recipients.filter((value): value is string => typeof value === "string")
    : [];
  const errorMessage =
    typeof meta.message === "string"
      ? meta.message
      : typeof meta.error === "string"
        ? meta.error
        : null;

  return {
    id: record.id,
    created_at: record.created_at,
    level: record.level,
    action: record.action,
    kind: typeof meta.kind === "string" ? meta.kind : null,
    subject: typeof meta.subject === "string" ? meta.subject : null,
    recipients,
    status: actionToStatus(record.action),
    error_message: errorMessage,
    actor_email: record.actor_email ?? null,
  };
}

function parsePositiveInt(value: string | null, fallback: number, max: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);

    const kindFilter = url.searchParams.get("kind")?.trim() || null;
    const statusFilter = url.searchParams.get("status")?.trim() as EmailLogEntry["status"] | null;
    const limit = parsePositiveInt(url.searchParams.get("limit"), 100, 500);
    const offset = parsePositiveInt(url.searchParams.get("offset"), 0, 10_000);

    const database = await readDatabase();
    const matches = database.audit_logs
      .filter((record) => isEmailAction(record.action))
      .map(projectEntry)
      .filter((entry) => {
        if (kindFilter && entry.kind !== kindFilter) return false;
        if (statusFilter && entry.status !== statusFilter) return false;
        return true;
      });

    const total = matches.length;
    const items = matches.slice(offset, offset + limit);

    return successResponse({ items, total, limit, offset });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to load email log."),
    );
  }
}
