import "server-only";

import { ApiError } from "@/server/core/api";
import type { ServiceRequestRecord, ServiceRequestStatus } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { recordLeadEvent } from "@/server/domain/leads";
import { dispatchNotification } from "@/server/domain/notifications";
import { safeSendServiceRequestConfirmationEmail } from "@/server/domain/commerce-emails";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateServiceRequestInput = {
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  company?: string;
  product_slug?: string;
  product_name?: string;
  variant_slug?: string;
  variant_tier_name?: string;
  budget?: string;
  timeline?: string;
  brief: string;
  metadata?: Record<string, unknown>;
  requestId?: string;
  ip?: string;
};

function generateRequestNumber() {
  const prefix = "SR";
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

export async function createServiceRequest(input: CreateServiceRequestInput): Promise<ServiceRequestRecord> {
  if (!input.customer_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Name is required.");
  }
  if (!EMAIL_REGEX.test(input.customer_email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }
  if (input.brief.trim().length < 20) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Project brief must be at least 20 characters.");
  }

  const now = new Date().toISOString();
  const record: ServiceRequestRecord = {
    id: crypto.randomUUID(),
    request_number: generateRequestNumber(),
    customer_email: input.customer_email.trim().toLowerCase(),
    customer_name: input.customer_name.trim(),
    customer_phone: input.customer_phone?.trim() || undefined,
    company: input.company?.trim() || undefined,
    product_slug: input.product_slug?.trim() || undefined,
    product_name: input.product_name?.trim() || undefined,
    variant_slug: input.variant_slug?.trim() || undefined,
    variant_tier_name: input.variant_tier_name?.trim() || undefined,
    budget: input.budget?.trim() || undefined,
    timeline: input.timeline?.trim() || undefined,
    brief: input.brief.trim(),
    status: "new",
    metadata: input.metadata ?? {},
    created_at: now,
    updated_at: now,
  };

  const { lead } = await recordLeadEvent({
    email: record.customer_email,
    eventType: "service_request",
    source: "service_request",
    route: "/service-requests",
    name: record.customer_name,
    phone: record.customer_phone,
    company: record.company,
    relatedServiceRequestId: record.id,
    metadata: {
      product_slug: record.product_slug,
      variant_slug: record.variant_slug,
      budget: record.budget,
      timeline: record.timeline,
    },
  });

  record.lead_id = lead.id;

  await writeDatabase((database) => ({
    ...database,
    service_requests: [record, ...database.service_requests],
  }));

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "service_request_created",
      route: "/service-requests",
      source: "service_request",
      actor_email: record.customer_email,
      metadata: {
        service_request_id: record.id,
        product_slug: record.product_slug,
        variant_slug: record.variant_slug,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "service_request.created",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: record.customer_email,
      metadata: {
        service_request_id: record.id,
        product_slug: record.product_slug,
        lead_id: lead.id,
      },
    }),
    dispatchNotification({
      kind: "service_request_created",
      title: `New service request: ${record.customer_name}`,
      payload: {
        request_number: record.request_number,
        email: record.customer_email,
        product: record.product_name ?? record.product_slug,
        tier: record.variant_tier_name,
        budget: record.budget,
        timeline: record.timeline,
      },
      relatedServiceRequestId: record.id,
      relatedLeadId: lead.id,
    }),
    safeSendServiceRequestConfirmationEmail(record),
  ]);

  return record;
}

export async function listServiceRequests(options?: { status?: ServiceRequestStatus; limit?: number }) {
  const database = await readDatabase();
  let records = database.service_requests;
  if (options?.status) records = records.filter((record) => record.status === options.status);
  return records.slice(0, options?.limit ?? 200);
}

export async function getServiceRequestById(id: string) {
  const database = await readDatabase();
  return database.service_requests.find((record) => record.id === id) ?? null;
}

export async function updateServiceRequestStatus(
  id: string,
  status: ServiceRequestStatus,
  notes?: string,
): Promise<ServiceRequestRecord> {
  const now = new Date().toISOString();
  let updated: ServiceRequestRecord | null = null;

  await writeDatabase((database) => {
    const existing = database.service_requests.find((record) => record.id === id);
    if (!existing) return database;
    const next: ServiceRequestRecord = {
      ...existing,
      status,
      notes: notes?.trim() || existing.notes,
      updated_at: now,
      completed_at: status === "delivered" || status === "cancelled" ? now : existing.completed_at,
    };
    updated = next;
    return {
      ...database,
      service_requests: database.service_requests.map((record) => (record.id === id ? next : record)),
    };
  });

  if (!updated) {
    throw new ApiError("NOT_FOUND", 404, "Service request not found.");
  }

  await recordAuditLog({
    level: "info",
    action: "service_request.status_updated",
    metadata: { service_request_id: id, status, notes: notes ?? null },
  });

  return updated;
}
