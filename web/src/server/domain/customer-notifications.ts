import "server-only";

import { ApiError } from "@/server/core/api";
import type {
  CustomerNotificationKind,
  CustomerNotificationRecord,
  SubmissionType,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

const NOTIFICATION_CAP = 5_000;

type CreateInput = {
  userEmail: string;
  userId?: string;
  kind: CustomerNotificationKind;
  title: string;
  body?: string;
  href?: string;
  relatedOrderId?: string;
  relatedSubmissionId?: string;
  relatedSubmissionType?: SubmissionType;
};

export async function createCustomerNotification(input: CreateInput): Promise<CustomerNotificationRecord> {
  const record: CustomerNotificationRecord = {
    id: crypto.randomUUID(),
    user_email: input.userEmail.trim().toLowerCase(),
    user_id: input.userId,
    kind: input.kind,
    title: input.title,
    body: input.body,
    href: input.href,
    related_order_id: input.relatedOrderId,
    related_submission_id: input.relatedSubmissionId,
    related_submission_type: input.relatedSubmissionType,
    created_at: new Date().toISOString(),
  };

  await writeDatabase((database) => ({
    ...database,
    customer_notifications: [record, ...(database.customer_notifications ?? [])].slice(0, NOTIFICATION_CAP),
  }));

  return record;
}

export async function listCustomerNotificationsForEmail(
  email: string,
  limit = 50,
): Promise<CustomerNotificationRecord[]> {
  const normalized = email.trim().toLowerCase();
  const database = await readDatabase();
  const entries = (database.customer_notifications ?? []).filter(
    (record) => record.user_email === normalized,
  );
  entries.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return entries.slice(0, limit);
}

export async function markCustomerNotificationsRead(
  email: string,
  ids?: string[],
): Promise<{ marked: number }> {
  const normalized = email.trim().toLowerCase();
  const now = new Date().toISOString();
  const targetIds = ids ? new Set(ids) : null;
  let marked = 0;

  await writeDatabase((database) => {
    const next = (database.customer_notifications ?? []).map((record) => {
      if (record.user_email !== normalized) return record;
      if (record.read_at) return record;
      if (targetIds && !targetIds.has(record.id)) return record;
      marked += 1;
      return { ...record, read_at: now };
    });
    return { ...database, customer_notifications: next };
  });

  return { marked };
}

export function notificationCounts(records: CustomerNotificationRecord[]) {
  let unread = 0;
  for (const record of records) {
    if (!record.read_at) unread += 1;
  }
  return { total: records.length, unread };
}

export async function fireOrUndefined(input: CreateInput): Promise<CustomerNotificationRecord | undefined> {
  try {
    return await createCustomerNotification(input);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    return undefined;
  }
}
