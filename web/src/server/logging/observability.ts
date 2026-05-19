import "server-only";

import { writeDatabase } from "@/server/data/store";
import type { AnalyticsEventRecord, AuditLogRecord } from "@/server/data/schema";

type AuditLogInput = Omit<AuditLogRecord, "id" | "created_at">;
type AnalyticsEventInput = Omit<AnalyticsEventRecord, "id" | "created_at">;

export async function recordAuditLog(input: AuditLogInput) {
  const entry: AuditLogRecord = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  };

  await writeDatabase((database) => ({
    ...database,
    audit_logs: [entry, ...database.audit_logs].slice(0, 5000),
  }));

  if (entry.level === "error") {
    console.error(`[audit] ${entry.action}`, entry.metadata);
    return;
  }

  console.info(`[audit] ${entry.action}`, entry.metadata);
}

export async function recordAnalyticsEvent(input: AnalyticsEventInput) {
  const event: AnalyticsEventRecord = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  };

  await writeDatabase((database) => ({
    ...database,
    analytics_events: [event, ...database.analytics_events].slice(0, 5000),
  }));
}
