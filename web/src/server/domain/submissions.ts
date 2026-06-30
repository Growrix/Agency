import "server-only";

import { ApiError } from "@/server/core/api";
import type {
  AppointmentRecord,
  AppointmentStatus,
  ContactInquiryRecord,
  CustomerVisibleStatus,
  InquiryStatus,
  NewsletterSubscriberRecord,
  OrderFulfillmentStatus,
  OrderRecord,
  ServiceRequestRecord,
  ServiceRequestStatus,
  SubmissionAuthorRole,
  SubmissionNoteRecord,
  SubmissionType,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";
import { notifyTeam, escapeHtml } from "@/server/domain/team-notifications";
import { fireOrUndefined as createCustomerNotificationOrUndefined } from "@/server/domain/customer-notifications";

const NOTES_PAGE_LIMIT = 500;

type SubmissionStatusValue =
  | InquiryStatus
  | AppointmentStatus
  | ServiceRequestStatus
  | OrderFulfillmentStatus
  | "subscribed";

export type SubmissionListItem = {
  id: string;
  type: SubmissionType;
  status: SubmissionStatusValue;
  customer_visible_status: CustomerVisibleStatus;
  customer_name: string;
  customer_email: string;
  summary: string;
  created_at: string;
  assigned_to_user_id?: string;
  has_customer_visible_notes: boolean;
};

export type SubmissionDetailEnvelope =
  | { type: "inquiry"; record: ContactInquiryRecord; notes: SubmissionNoteRecord[] }
  | { type: "appointment"; record: AppointmentRecord; notes: SubmissionNoteRecord[] }
  | { type: "service_request"; record: ServiceRequestRecord; notes: SubmissionNoteRecord[] }
  | { type: "order"; record: OrderRecord; notes: SubmissionNoteRecord[] }
  | { type: "newsletter"; record: NewsletterSubscriberRecord; notes: SubmissionNoteRecord[] };

export type ListSubmissionsFilters = {
  type?: SubmissionType;
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  assignedTo?: string;
  limit?: number;
  offset?: number;
};

type AddNoteInput = {
  type: SubmissionType;
  id: string;
  authorUserId?: string;
  authorEmail?: string;
  authorRole: SubmissionAuthorRole;
  body: string;
  customerVisible: boolean;
  emailCustomer: boolean;
};

const REPLY_CAPABLE_TYPES: ReadonlySet<SubmissionType> = new Set(["service_request", "support_thread"]);

export function isReplyCapableType(type: SubmissionType) {
  return REPLY_CAPABLE_TYPES.has(type);
}

export function mapToCustomerVisibleStatus(
  type: SubmissionType,
  internalStatus: string,
): CustomerVisibleStatus {
  if (type === "inquiry") {
    switch (internalStatus as InquiryStatus) {
      case "new":
        return "open";
      case "read":
        return "in_progress";
      case "responded":
        return "resolved";
      case "closed":
      case "spam":
        return "closed";
    }
  }

  if (type === "appointment") {
    switch (internalStatus as AppointmentStatus) {
      case "inquiry":
        return "open";
      case "confirmed":
        return "in_progress";
      case "completed":
        return "resolved";
      case "cancelled":
      case "no_show":
        return "closed";
    }
  }

  if (type === "service_request" || type === "support_thread") {
    switch (internalStatus as ServiceRequestStatus) {
      case "new":
        return "open";
      case "scoping":
      case "in_progress":
      case "qa_review":
        return "in_progress";
      case "delivered":
        return "resolved";
      case "cancelled":
        return "closed";
    }
  }

  if (type === "order") {
    switch (internalStatus as OrderFulfillmentStatus) {
      case "pending":
      case "intake_pending":
        return "open";
      case "fulfilling":
      case "qa_review":
        return "in_progress";
      case "delivered":
        return "resolved";
      case "archived":
        return "closed";
    }
  }

  if (type === "newsletter") {
    return "resolved";
  }

  return "open";
}

function normalizeInquiry(record: ContactInquiryRecord): SubmissionListItem {
  return {
    id: record.id,
    type: "inquiry",
    status: record.status,
    customer_visible_status: mapToCustomerVisibleStatus("inquiry", record.status),
    customer_name: record.visitor_name,
    customer_email: record.visitor_email,
    summary: record.subject || record.message.slice(0, 120),
    created_at: record.created_at,
    assigned_to_user_id: record.assigned_to_user_id,
    has_customer_visible_notes: false,
  };
}

function normalizeAppointment(record: AppointmentRecord): SubmissionListItem {
  return {
    id: record.id,
    type: "appointment",
    status: record.status,
    customer_visible_status: mapToCustomerVisibleStatus("appointment", record.status),
    customer_name: record.visitor_name,
    customer_email: record.visitor_email,
    summary: `${record.service_interested_in} @ ${record.preferred_datetime}`,
    created_at: record.created_at,
    assigned_to_user_id: record.assigned_to_user_id,
    has_customer_visible_notes: false,
  };
}

function normalizeServiceRequest(record: ServiceRequestRecord): SubmissionListItem {
  return {
    id: record.id,
    type: "service_request",
    status: record.status,
    customer_visible_status: mapToCustomerVisibleStatus("service_request", record.status),
    customer_name: record.customer_name,
    customer_email: record.customer_email,
    summary: `${record.request_number}: ${record.brief.slice(0, 100)}`,
    created_at: record.created_at,
    assigned_to_user_id: record.assigned_to_user_id,
    has_customer_visible_notes: false,
  };
}

function normalizeOrder(record: OrderRecord): SubmissionListItem {
  return {
    id: record.id,
    type: "order",
    status: record.fulfillment_status,
    customer_visible_status: mapToCustomerVisibleStatus("order", record.fulfillment_status),
    customer_name: record.customer_name ?? record.customer_email,
    customer_email: record.customer_email,
    summary: `${record.order_number} · ${(record.total_cents / 100).toFixed(2)} ${record.currency.toUpperCase()}`,
    created_at: record.created_at,
    has_customer_visible_notes: false,
  };
}

function normalizeNewsletter(record: NewsletterSubscriberRecord): SubmissionListItem {
  return {
    id: record.id,
    type: "newsletter",
    status: "subscribed",
    customer_visible_status: "resolved",
    customer_name: record.email,
    customer_email: record.email,
    summary: `Subscribed via ${record.source ?? "unknown"}`,
    created_at: record.subscribed_at,
    has_customer_visible_notes: false,
  };
}

function applyFilters(item: SubmissionListItem, filters: ListSubmissionsFilters) {
  if (filters.type && item.type !== filters.type) {
    return false;
  }

  if (filters.status && item.status !== filters.status) {
    return false;
  }

  if (filters.assignedTo) {
    if (filters.assignedTo === "unassigned" && item.assigned_to_user_id) {
      return false;
    }
    if (filters.assignedTo !== "unassigned" && item.assigned_to_user_id !== filters.assignedTo) {
      return false;
    }
  }

  if (filters.dateFrom && item.created_at < filters.dateFrom) {
    return false;
  }
  if (filters.dateTo && item.created_at > filters.dateTo) {
    return false;
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = [item.customer_name, item.customer_email, item.summary]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) {
      return false;
    }
  }

  return true;
}

function annotateVisibleNotes(items: SubmissionListItem[], notes: SubmissionNoteRecord[]) {
  if (items.length === 0 || notes.length === 0) {
    return items;
  }
  const byTarget = new Map<string, true>();
  for (const note of notes) {
    if (note.customer_visible) {
      byTarget.set(`${note.submission_type}::${note.submission_id}`, true);
    }
  }
  return items.map((item) =>
    byTarget.has(`${item.type}::${item.id}`)
      ? { ...item, has_customer_visible_notes: true }
      : item,
  );
}

export async function listSubmissions(filters: ListSubmissionsFilters = {}) {
  const database = await readDatabase();

  const items: SubmissionListItem[] = [
    ...database.inquiries.map(normalizeInquiry),
    ...database.appointments.map(normalizeAppointment),
    ...database.service_requests.map(normalizeServiceRequest),
    ...database.orders.map(normalizeOrder),
    ...(database.newsletter_subscribers ?? []).map(normalizeNewsletter),
  ];

  const annotated = annotateVisibleNotes(items, database.submission_notes ?? []);
  const filtered = annotated.filter((item) => applyFilters(item, filters));
  filtered.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  const limit = Math.min(filters.limit ?? 50, 200);
  const offset = Math.max(filters.offset ?? 0, 0);
  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    limit,
    offset,
  };
}

export async function listSubmissionsForEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const database = await readDatabase();

  const items: SubmissionListItem[] = [
    ...database.inquiries.filter((r) => r.visitor_email === normalized).map(normalizeInquiry),
    ...database.appointments.filter((r) => r.visitor_email === normalized).map(normalizeAppointment),
    ...database.service_requests
      .filter((r) => r.customer_email === normalized)
      .map(normalizeServiceRequest),
    ...database.orders.filter((r) => r.customer_email === normalized).map(normalizeOrder),
  ];

  const customerVisibleNotes = (database.submission_notes ?? []).filter((note) => note.customer_visible);
  const annotated = annotateVisibleNotes(items, customerVisibleNotes);
  annotated.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return annotated;
}

export async function getSubmissionDetail(
  type: SubmissionType,
  id: string,
): Promise<SubmissionDetailEnvelope | null> {
  const database = await readDatabase();
  const notes = (database.submission_notes ?? [])
    .filter((note) => note.submission_type === type && note.submission_id === id)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  if (type === "inquiry") {
    const record = database.inquiries.find((r) => r.id === id);
    return record ? { type: "inquiry", record, notes } : null;
  }
  if (type === "appointment") {
    const record = database.appointments.find((r) => r.id === id);
    return record ? { type: "appointment", record, notes } : null;
  }
  if (type === "service_request" || type === "support_thread") {
    const record = database.service_requests.find((r) => r.id === id);
    return record ? { type: "service_request", record, notes } : null;
  }
  if (type === "order") {
    const record = database.orders.find((r) => r.id === id);
    return record ? { type: "order", record, notes } : null;
  }
  if (type === "newsletter") {
    const record = (database.newsletter_subscribers ?? []).find((r) => r.id === id);
    return record ? { type: "newsletter", record, notes } : null;
  }
  return null;
}

async function findSubmissionEmail(type: SubmissionType, id: string): Promise<string | null> {
  const database = await readDatabase();
  if (type === "inquiry") return database.inquiries.find((r) => r.id === id)?.visitor_email ?? null;
  if (type === "appointment") return database.appointments.find((r) => r.id === id)?.visitor_email ?? null;
  if (type === "service_request" || type === "support_thread")
    return database.service_requests.find((r) => r.id === id)?.customer_email ?? null;
  if (type === "order") return database.orders.find((r) => r.id === id)?.customer_email ?? null;
  if (type === "newsletter")
    return (database.newsletter_subscribers ?? []).find((r) => r.id === id)?.email ?? null;
  return null;
}

export async function addSubmissionNote(input: AddNoteInput): Promise<SubmissionNoteRecord> {
  const trimmedBody = input.body.trim();
  if (trimmedBody.length < 1) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Note body cannot be empty.");
  }

  const customerEmail = await findSubmissionEmail(input.type, input.id);
  if (!customerEmail) {
    throw new ApiError("NOT_FOUND", 404, "Submission not found.");
  }

  const note: SubmissionNoteRecord = {
    id: crypto.randomUUID(),
    submission_type: input.type,
    submission_id: input.id,
    author_user_id: input.authorUserId,
    author_email: input.authorEmail,
    author_role: input.authorRole,
    body: trimmedBody,
    customer_visible: input.customerVisible,
    email_customer: input.emailCustomer,
    created_at: new Date().toISOString(),
  };

  await writeDatabase((database) => ({
    ...database,
    submission_notes: [note, ...(database.submission_notes ?? [])].slice(0, NOTES_PAGE_LIMIT * 10),
  }));

  await recordAuditLog({
    level: "info",
    action: "submission_notes.created",
    actor_email: input.authorEmail,
    metadata: {
      note_id: note.id,
      type: input.type,
      submission_id: input.id,
      author_role: input.authorRole,
      customer_visible: input.customerVisible,
      email_customer: input.emailCustomer,
    },
  });

  if (input.customerVisible && input.authorRole === "admin") {
    await createCustomerNotificationOrUndefined({
      userEmail: customerEmail,
      kind: "submission_reply",
      title: "The Growrix team replied to your submission",
      body: trimmedBody.length > 240 ? `${trimmedBody.slice(0, 237)}...` : trimmedBody,
      href: `/dashboard/submissions/${input.type}/${input.id}`,
      relatedSubmissionId: input.id,
      relatedSubmissionType: input.type,
    });
  }

  if (input.customerVisible && input.emailCustomer && input.authorRole === "admin") {
    await notifyTeam({
      kind: "service_request_created",
      subject: `Update on your submission`,
      text: `Hi,\n\nWe have an update for you:\n\n${trimmedBody}\n\n— The Growrix team`,
      html: `<p>Hi,</p><p>We have an update for you:</p><blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#444">${escapeHtml(
        trimmedBody,
      )}</blockquote><p>— The Growrix team</p>`,
      replyTo: input.authorEmail,
      payload: {
        note_id: note.id,
        type: input.type,
        submission_id: input.id,
        recipient: customerEmail,
      },
    });
  }

  return note;
}

type StatusUpdateInput = {
  type: SubmissionType;
  id: string;
  status: string;
  actorEmail?: string;
};

export async function updateSubmissionStatus(input: StatusUpdateInput) {
  const now = new Date().toISOString();
  let updated = false;

  await writeDatabase((database) => {
    if (input.type === "inquiry") {
      const next = database.inquiries.map((record) =>
        record.id === input.id
          ? { ...record, status: input.status as InquiryStatus, updated_at: now }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, inquiries: next };
    }
    if (input.type === "appointment") {
      const next = database.appointments.map((record) =>
        record.id === input.id
          ? {
              ...record,
              status: input.status as AppointmentStatus,
              confirmed_at:
                input.status === "confirmed" && !record.confirmed_at ? now : record.confirmed_at,
              completed_at:
                input.status === "completed" && !record.completed_at ? now : record.completed_at,
            }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, appointments: next };
    }
    if (input.type === "service_request" || input.type === "support_thread") {
      const next = database.service_requests.map((record) =>
        record.id === input.id
          ? {
              ...record,
              status: input.status as ServiceRequestStatus,
              updated_at: now,
              completed_at:
                input.status === "delivered" || input.status === "cancelled"
                  ? now
                  : record.completed_at,
            }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, service_requests: next };
    }
    if (input.type === "order") {
      const next = database.orders.map((record) =>
        record.id === input.id
          ? { ...record, fulfillment_status: input.status as OrderFulfillmentStatus }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, orders: next };
    }
    return database;
  });

  if (!updated) {
    throw new ApiError("NOT_FOUND", 404, "Submission not found.");
  }

  await recordAuditLog({
    level: "info",
    action: "submission.status_updated",
    actor_email: input.actorEmail,
    metadata: { type: input.type, id: input.id, status: input.status },
  });
}

type AssignInput = {
  type: SubmissionType;
  id: string;
  assignedToUserId?: string;
  actorEmail?: string;
};

export async function assignSubmission(input: AssignInput) {
  let updated = false;
  await writeDatabase((database) => {
    if (input.type === "inquiry") {
      const next = database.inquiries.map((record) =>
        record.id === input.id
          ? { ...record, assigned_to_user_id: input.assignedToUserId, updated_at: new Date().toISOString() }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, inquiries: next };
    }
    if (input.type === "appointment") {
      const next = database.appointments.map((record) =>
        record.id === input.id
          ? { ...record, assigned_to_user_id: input.assignedToUserId }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, appointments: next };
    }
    if (input.type === "service_request" || input.type === "support_thread") {
      const next = database.service_requests.map((record) =>
        record.id === input.id
          ? { ...record, assigned_to_user_id: input.assignedToUserId, updated_at: new Date().toISOString() }
          : record,
      );
      updated = next.some((r) => r.id === input.id);
      return { ...database, service_requests: next };
    }
    return database;
  });

  if (!updated) {
    throw new ApiError("NOT_FOUND", 404, "Submission not found or does not support assignment.");
  }

  await recordAuditLog({
    level: "info",
    action: "submission.assigned",
    actor_email: input.actorEmail,
    metadata: { type: input.type, id: input.id, assigned_to_user_id: input.assignedToUserId ?? null },
  });
}

export function filterCustomerVisibleNotes(notes: SubmissionNoteRecord[]) {
  return notes.filter((note) => note.customer_visible);
}
