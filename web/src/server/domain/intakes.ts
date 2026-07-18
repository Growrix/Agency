import "server-only";

import { ApiError } from "@/server/core/api";
import type {
  ClientIntakeSubmissionRecord,
  DriveLinkType,
  IntakeDriveLink,
  IntakeReferenceSite,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import type { AuthenticatedUser } from "@/server/auth/guards";
import { uploadIntakeFiles } from "@/server/domain/intake-assets";
import { ensureFreeDemoCampaign, reserveFreeDemoSlot } from "@/server/domain/free-demo-campaign";
import { notifyAdminIntakeReceived } from "@/server/domain/intake-notifications";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CreateIntakeInput = {
  user: AuthenticatedUser;
  business_name: string;
  industry?: string;
  target_audience?: string;
  brand_voice?: string;
  business_description: string;
  goals?: string[];
  competitors?: string[];
  reference_sites?: IntakeReferenceSite[];
  drive_links?: IntakeDriveLink[];
  budget_range?: string;
  timeline?: string;
  must_have_features?: string[];
  is_free_demo?: boolean;
  files?: File[];
  metadata?: Record<string, unknown>;
  requestId?: string;
  ip?: string;
};

function generateSubmissionNumber() {
  const prefix = "INT";
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function parseReferenceSites(value: unknown): IntakeReferenceSite[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const sites: IntakeReferenceSite[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const record = item as Record<string, unknown>;
    const url = typeof record.url === "string" ? record.url.trim() : "";
    if (!url) {
      continue;
    }
    sites.push({
      url,
      note: typeof record.note === "string" ? record.note.trim() : undefined,
    });
  }
  return sites;
}

function parseDriveLinks(value: unknown): IntakeDriveLink[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const allowed: DriveLinkType[] = ["gdrive", "dropbox", "onedrive", "other"];
  const links: IntakeDriveLink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const record = item as Record<string, unknown>;
    const url = typeof record.url === "string" ? record.url.trim() : "";
    if (!url) {
      continue;
    }
    const type = typeof record.type === "string" && allowed.includes(record.type as DriveLinkType)
      ? (record.type as DriveLinkType)
      : "other";
    links.push({
      url,
      label: typeof record.label === "string" ? record.label.trim() : undefined,
      type,
    });
  }
  return links;
}

export function parseCreateIntakePayload(body: Record<string, unknown>) {
  return {
    business_name: typeof body.business_name === "string" ? body.business_name : "",
    industry: typeof body.industry === "string" ? body.industry : undefined,
    target_audience: typeof body.target_audience === "string" ? body.target_audience : undefined,
    brand_voice: typeof body.brand_voice === "string" ? body.brand_voice : undefined,
    business_description: typeof body.business_description === "string" ? body.business_description : "",
    goals: parseStringArray(body.goals),
    competitors: parseStringArray(body.competitors),
    reference_sites: parseReferenceSites(body.reference_sites),
    drive_links: parseDriveLinks(body.drive_links),
    budget_range: typeof body.budget_range === "string" ? body.budget_range : undefined,
    timeline: typeof body.timeline === "string" ? body.timeline : undefined,
    must_have_features: parseStringArray(body.must_have_features),
    is_free_demo: body.is_free_demo === true || body.is_free_demo === "true",
    metadata: body.metadata && typeof body.metadata === "object" ? (body.metadata as Record<string, unknown>) : {},
  };
}

function validateCreateIntakeInput(input: Omit<CreateIntakeInput, "user" | "files" | "requestId" | "ip">) {
  if (!input.business_name.trim()) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Business name is required.");
  }
  if (input.business_description.trim().length < 20) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Tell us a bit more about your business (at least 20 characters).");
  }
}

export async function createClientIntake(input: CreateIntakeInput): Promise<ClientIntakeSubmissionRecord> {
  validateCreateIntakeInput(input);

  if (!EMAIL_REGEX.test(input.user.email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid account email is required.");
  }

  const clientName = [input.user.firstName, input.user.lastName].filter(Boolean).join(" ").trim() || input.user.email;
  const now = new Date().toISOString();
  const submissionId = crypto.randomUUID();

  const uploadedFiles = input.files?.length
    ? await uploadIntakeFiles({ submissionId, files: input.files })
    : [];

  if (input.is_free_demo) {
    await ensureFreeDemoCampaign();
    try {
      await reserveFreeDemoSlot();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message === "CAMPAIGN_FULL") {
        throw new ApiError("CONFLICT", 409, "All free demo spots have been claimed. Join the waitlist via contact.");
      }
      if (message === "CAMPAIGN_INACTIVE") {
        throw new ApiError("CONFLICT", 409, "The free demo campaign is not active right now.");
      }
      throw error;
    }
  }

  const record: ClientIntakeSubmissionRecord = {
    id: submissionId,
    submission_number: generateSubmissionNumber(),
    user_id: input.user.id,
    client_email: input.user.email.trim().toLowerCase(),
    client_name: clientName,
    business_name: input.business_name.trim(),
    industry: input.industry?.trim() || undefined,
    target_audience: input.target_audience?.trim() || undefined,
    brand_voice: input.brand_voice?.trim() || undefined,
    business_description: input.business_description.trim(),
    goals: input.goals ?? [],
    competitors: input.competitors ?? [],
    reference_sites: input.reference_sites ?? [],
    drive_links: input.drive_links ?? [],
    uploaded_files: uploadedFiles,
    budget_range: input.budget_range?.trim() || undefined,
    timeline: input.timeline?.trim() || undefined,
    must_have_features: input.must_have_features ?? [],
    is_free_demo: Boolean(input.is_free_demo),
    status: "submitted",
    metadata: input.metadata ?? {},
    created_at: now,
    updated_at: now,
  };

  await writeDatabase((database) => ({
    ...database,
    client_intake_submissions: [record, ...database.client_intake_submissions],
  }));

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "client_intake_submitted",
      route: "/intakes",
      source: "client_intake",
      actor_email: record.client_email,
      metadata: {
        intake_id: record.id,
        is_free_demo: record.is_free_demo,
        submission_number: record.submission_number,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "client_intake.created",
      request_id: input.requestId,
      ip: input.ip,
      actor_email: record.client_email,
      metadata: {
        intake_id: record.id,
        submission_number: record.submission_number,
        is_free_demo: record.is_free_demo,
      },
    }),
    notifyAdminIntakeReceived(record),
  ]);

  return record;
}

export async function listIntakesForUser(userId: string) {
  const database = await readDatabase();
  return database.client_intake_submissions
    .filter((item) => item.user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function listAllIntakes() {
  const database = await readDatabase();
  return [...database.client_intake_submissions].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getIntakeById(intakeId: string) {
  const database = await readDatabase();
  return database.client_intake_submissions.find((item) => item.id === intakeId) ?? null;
}

export async function getIntakeForUser(intakeId: string, userId: string) {
  const intake = await getIntakeById(intakeId);
  if (!intake || intake.user_id !== userId) {
    return null;
  }
  return intake;
}

export async function updateIntakeStatus(intakeId: string, status: ClientIntakeSubmissionRecord["status"], projectId?: string) {
  let updated: ClientIntakeSubmissionRecord | null = null;

  await writeDatabase((database) => {
    const index = database.client_intake_submissions.findIndex((item) => item.id === intakeId);
    if (index < 0) {
      return database;
    }
    const current = database.client_intake_submissions[index];
    updated = {
      ...current,
      status,
      project_id: projectId ?? current.project_id,
      updated_at: new Date().toISOString(),
    };
    const next = [...database.client_intake_submissions];
    next[index] = updated;
    return {
      ...database,
      client_intake_submissions: next,
    };
  });

  return updated;
}
