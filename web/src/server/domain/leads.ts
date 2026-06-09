import "server-only";

import { ApiError } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import type {
  LeadEventRecord,
  LeadEventType,
  LeadRecord,
  LeadSource,
  LeadStatus,
  LeadTemperature,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { dispatchNotification } from "@/server/domain/notifications";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_EVENT_LIMIT = 10_000;

// Scoring weights — single source of truth for lead temperature math.
const SCORE_WEIGHTS: Record<LeadEventType, number> = {
  product_view: 1,
  demo_click: 3,
  buy_click: 5,
  checkout_started: 10,
  checkout_completed: 30,
  customization_cta: 8,
  whatsapp_click: 6,
  contact_form: 12,
  booking: 20,
  ai_qualification: 15,
  ai_message: 1,
  download: 5,
  service_request: 18,
  admin_note: 0,
};

const STATUS_BY_TEMPERATURE: Record<LeadTemperature, LeadStatus> = {
  cold: "new",
  warm: "engaged",
  hot: "qualified",
  customer: "customer",
};

export function getLeadScoreWeight(eventType: LeadEventType): number {
  return SCORE_WEIGHTS[eventType] ?? 0;
}

export function classifyLeadTemperature(score: number, hasPurchase: boolean): LeadTemperature {
  if (hasPurchase) return "customer";
  const threshold = getRuntimeConfig().notifications.hotLeadThreshold;
  if (score >= threshold) return "hot";
  if (score >= Math.max(10, Math.round(threshold / 3))) return "warm";
  return "cold";
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

type UpsertLeadInput = {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  route?: string;
  user_id?: string;
  notes?: string;
  relatedInquiryId?: string;
  relatedAppointmentId?: string;
  relatedOrderId?: string;
  relatedServiceRequestId?: string;
  conversationId?: string;
};

function mergeLead(existing: LeadRecord, input: UpsertLeadInput, now: string): LeadRecord {
  const related_order_ids = input.relatedOrderId && !existing.related_order_ids.includes(input.relatedOrderId)
    ? [...existing.related_order_ids, input.relatedOrderId]
    : existing.related_order_ids;
  const related_service_request_ids = input.relatedServiceRequestId && !existing.related_service_request_ids.includes(input.relatedServiceRequestId)
    ? [...existing.related_service_request_ids, input.relatedServiceRequestId]
    : existing.related_service_request_ids;
  const conversation_ids = input.conversationId && !existing.conversation_ids.includes(input.conversationId)
    ? [...existing.conversation_ids, input.conversationId]
    : existing.conversation_ids;

  return {
    ...existing,
    name: input.name?.trim() || existing.name,
    phone: input.phone?.trim() || existing.phone,
    company: input.company?.trim() || existing.company,
    user_id: input.user_id || existing.user_id,
    notes: input.notes?.trim() || existing.notes,
    last_source: input.source,
    last_route: input.route || existing.last_route,
    related_inquiry_id: input.relatedInquiryId || existing.related_inquiry_id,
    related_appointment_id: input.relatedAppointmentId || existing.related_appointment_id,
    related_order_ids,
    related_service_request_ids,
    conversation_ids,
    updated_at: now,
  };
}

export async function upsertLead(input: UpsertLeadInput): Promise<LeadRecord> {
  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const now = new Date().toISOString();
  let result: LeadRecord | null = null;

  await writeDatabase((database) => {
    const existing = database.leads.find((lead) => lead.email === email);
    if (existing) {
      const updated = mergeLead(existing, { ...input, email }, now);
      result = updated;
      return {
        ...database,
        leads: database.leads.map((lead) => (lead.id === existing.id ? updated : lead)),
      };
    }

    const created: LeadRecord = {
      id: crypto.randomUUID(),
      email,
      name: input.name?.trim() || undefined,
      phone: input.phone?.trim() || undefined,
      company: input.company?.trim() || undefined,
      status: "new",
      temperature: "cold",
      score: 0,
      primary_source: input.source,
      last_source: input.source,
      last_route: input.route,
      notes: input.notes?.trim() || undefined,
      user_id: input.user_id,
      related_inquiry_id: input.relatedInquiryId,
      related_appointment_id: input.relatedAppointmentId,
      related_order_ids: input.relatedOrderId ? [input.relatedOrderId] : [],
      related_service_request_ids: input.relatedServiceRequestId ? [input.relatedServiceRequestId] : [],
      conversation_ids: input.conversationId ? [input.conversationId] : [],
      created_at: now,
      updated_at: now,
    };
    result = created;
    return {
      ...database,
      leads: [created, ...database.leads],
    };
  });

  if (!result) {
    throw new ApiError("INTERNAL_ERROR", 500, "Lead upsert failed.");
  }

  return result;
}

type RecordLeadEventInput = {
  email: string;
  eventType: LeadEventType;
  source?: LeadSource;
  route?: string;
  metadata?: Record<string, unknown>;
  name?: string;
  phone?: string;
  company?: string;
  user_id?: string;
  relatedInquiryId?: string;
  relatedAppointmentId?: string;
  relatedOrderId?: string;
  relatedServiceRequestId?: string;
  conversationId?: string;
  scoreOverride?: number;
};

export type RecordLeadEventResult = {
  lead: LeadRecord;
  event: LeadEventRecord;
  promoted: boolean;
};

export async function recordLeadEvent(input: RecordLeadEventInput): Promise<RecordLeadEventResult> {
  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }

  const source: LeadSource = input.source ?? inferSourceFromEvent(input.eventType);
  const baseLead = await upsertLead({
    email,
    name: input.name,
    phone: input.phone,
    company: input.company,
    source,
    route: input.route,
    user_id: input.user_id,
    relatedInquiryId: input.relatedInquiryId,
    relatedAppointmentId: input.relatedAppointmentId,
    relatedOrderId: input.relatedOrderId,
    relatedServiceRequestId: input.relatedServiceRequestId,
    conversationId: input.conversationId,
  });

  const delta = input.scoreOverride ?? getLeadScoreWeight(input.eventType);
  const now = new Date().toISOString();
  const event: LeadEventRecord = {
    id: crypto.randomUUID(),
    lead_id: baseLead.id,
    event_type: input.eventType,
    score_delta: delta,
    route: input.route,
    source,
    metadata: input.metadata ?? {},
    created_at: now,
  };

  const hasPurchase = input.eventType === "checkout_completed" || baseLead.related_order_ids.length > 0;
  const newScore = baseLead.score + delta;
  const newTemperature = classifyLeadTemperature(newScore, hasPurchase);

  let updatedLead: LeadRecord = baseLead;
  await writeDatabase((database) => {
    const current = database.leads.find((lead) => lead.id === baseLead.id) ?? baseLead;
    const merged: LeadRecord = {
      ...current,
      score: current.score + delta,
      temperature: classifyLeadTemperature(
        current.score + delta,
        hasPurchase || current.related_order_ids.length > 0,
      ),
      status:
        STATUS_BY_TEMPERATURE[
          classifyLeadTemperature(
            current.score + delta,
            hasPurchase || current.related_order_ids.length > 0,
          )
        ],
      last_source: source,
      last_route: input.route || current.last_route,
      last_event_type: input.eventType,
      updated_at: now,
    };
    updatedLead = merged;
    return {
      ...database,
      leads: database.leads.map((lead) => (lead.id === baseLead.id ? merged : lead)),
      lead_events: [event, ...database.lead_events].slice(0, LEAD_EVENT_LIMIT),
    };
  });

  const promoted = baseLead.temperature !== newTemperature && (newTemperature === "hot" || newTemperature === "customer");

  await Promise.all([
    recordAnalyticsEvent({
      event_name: `lead_event_${input.eventType}`,
      route: input.route ?? "/",
      source: source ?? "ai_concierge",
      actor_email: email,
      metadata: {
        lead_id: baseLead.id,
        score_delta: delta,
        new_score: updatedLead.score,
        temperature: updatedLead.temperature,
        ...input.metadata,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "lead.event_recorded",
      actor_email: email,
      metadata: {
        lead_id: baseLead.id,
        event_type: input.eventType,
        delta,
        score: updatedLead.score,
        temperature: updatedLead.temperature,
        promoted,
      },
    }),
  ]);

  if (promoted && newTemperature === "hot") {
    await dispatchNotification({
      kind: "lead_hot",
      title: `Hot lead: ${updatedLead.name ?? email}`,
      payload: {
        email,
        score: updatedLead.score,
        last_event: input.eventType,
        last_route: input.route,
        primary_source: updatedLead.primary_source,
      },
      relatedLeadId: updatedLead.id,
    });
  }

  return { lead: updatedLead, event, promoted };
}

function inferSourceFromEvent(eventType: LeadEventType): LeadSource {
  switch (eventType) {
    case "contact_form":
      return "contact_form";
    case "booking":
      return "booking_form";
    case "ai_message":
    case "ai_qualification":
      return "ai_concierge";
    case "checkout_started":
    case "checkout_completed":
    case "buy_click":
    case "demo_click":
    case "product_view":
    case "customization_cta":
      return "checkout";
    case "whatsapp_click":
      return "whatsapp_cta";
    case "service_request":
      return "service_request";
    case "download":
      return "checkout";
    case "admin_note":
      return "admin_manual";
    default:
      return "ai_concierge";
  }
}

export async function getLeadById(leadId: string): Promise<LeadRecord | null> {
  const database = await readDatabase();
  return database.leads.find((lead) => lead.id === leadId) ?? null;
}

export async function getLeadByEmail(email: string): Promise<LeadRecord | null> {
  const normalized = normalizeEmail(email);
  const database = await readDatabase();
  return database.leads.find((lead) => lead.email === normalized) ?? null;
}

export async function listLeadEvents(leadId: string, limit = 100): Promise<LeadEventRecord[]> {
  const database = await readDatabase();
  return database.lead_events.filter((event) => event.lead_id === leadId).slice(0, limit);
}

export async function listLeads(options?: {
  temperature?: LeadTemperature;
  status?: LeadStatus;
  limit?: number;
}): Promise<LeadRecord[]> {
  const database = await readDatabase();
  let leads = database.leads;
  if (options?.temperature) leads = leads.filter((lead) => lead.temperature === options.temperature);
  if (options?.status) leads = leads.filter((lead) => lead.status === options.status);
  return leads.slice(0, options?.limit ?? 200);
}
