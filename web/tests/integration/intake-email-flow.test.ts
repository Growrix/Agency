import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { issueSessionToken } from "@/server/auth/token";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";

const dataDirectory = path.join(process.cwd(), ".data", "intake-email-tests");
const databasePath = path.join(dataDirectory, "agency-db.json");

const TEST_USER = {
  id: "intake-test-user-1",
  email: "intake.client@example.com",
  role: "subscriber" as const,
};

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

async function seedUserDatabase() {
  const now = new Date().toISOString();
  await writeFile(
    databasePath,
    JSON.stringify(
      {
        users: [
          {
            id: TEST_USER.id,
            email: TEST_USER.email,
            password_hash: "clerk-auth",
            role: TEST_USER.role,
            first_name: "Intake",
            last_name: "Client",
            signup_completed_at: now,
            created_at: now,
            updated_at: now,
          },
        ],
        client_intake_submissions: [],
        projects: [],
        project_updates: [],
        project_assets: [],
        free_demo_campaigns: [],
        notifications: [],
        audit_logs: [],
        analytics_events: [],
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function readDatabaseFile() {
  const content = await readFile(databasePath, "utf8");
  return JSON.parse(content) as {
    client_intake_submissions: Array<{
      id: string;
      business_name: string;
      project_id?: string;
      status: string;
      is_free_demo?: boolean;
    }>;
    projects: Array<{ id: string; submission_id: string; client_user_id: string }>;
    free_demo_campaigns: Array<{ id: string; claimed_count: number; total_slots: number }>;
    notifications: Array<{
      kind: string;
      status: string;
      channel: string;
      payload?: Record<string, unknown>;
    }>;
    audit_logs: Array<{ action: string; metadata?: Record<string, unknown> }>;
  };
}

describe("Client intake email + project wiring", () => {
  const previous = {
    clerkPub: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSecret: process.env.CLERK_SECRET_KEY,
    resend: process.env.RESEND_API_KEY,
    contactTo: process.env.CONTACT_TO_EMAIL,
    contactFrom: process.env.CONTACT_FROM_EMAIL,
    jwt: process.env.AUTH_JWT_SECRET,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnon: process.env.SUPABASE_ANON_KEY,
    supabaseSecret: process.env.SUPABASE_SECRET_KEY,
    supabaseService: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  beforeEach(async () => {
    process.env.AGENCY_DATA_DIRECTORY = dataDirectory;
    await resetDatabase();
    await seedUserDatabase();

    process.env.AUTH_JWT_SECRET = "test-jwt-secret-intake";
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SECRET_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    resetRuntimeConfigForTests();
  });

  afterEach(async () => {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = previous.clerkPub;
    process.env.CLERK_SECRET_KEY = previous.clerkSecret;
    process.env.RESEND_API_KEY = previous.resend;
    process.env.CONTACT_TO_EMAIL = previous.contactTo;
    process.env.CONTACT_FROM_EMAIL = previous.contactFrom;
    process.env.AUTH_JWT_SECRET = previous.jwt;
    process.env.SUPABASE_URL = previous.supabaseUrl;
    process.env.SUPABASE_ANON_KEY = previous.supabaseAnon;
    process.env.SUPABASE_SECRET_KEY = previous.supabaseSecret;
    process.env.SUPABASE_SERVICE_ROLE_KEY = previous.supabaseService;
    delete process.env.AGENCY_DATA_DIRECTORY;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    resetRuntimeConfigForTests();
    await rm(dataDirectory, { recursive: true, force: true });
  });

  it("creates intake + project when email config is missing, and logs skipped notifications", async () => {
    const token = await issueSessionToken({
      userId: TEST_USER.id,
      email: TEST_USER.email,
      role: TEST_USER.role,
    });

    const { POST: createIntake } = await import("@/app/api/v1/intakes/route");
    const response = await createIntake(
      new NextRequest("http://localhost/api/v1/intakes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `agency_session=${token}`,
        },
        body: JSON.stringify({
          business_name: "Acme Solar Co",
          business_description: "We install residential solar systems across the metro area.",
          industry: "Energy",
          is_free_demo: true,
        }),
      }),
    );

    assert.equal(response.status, 200);
    const payload = (await response.json()) as {
      data: { intake_id: string; submission_number: string; project_id: string | null; status: string };
    };
    assert.ok(payload.data.intake_id);
    assert.ok(payload.data.submission_number);
    assert.ok(payload.data.project_id, "auto-convert should create a project without email config");

    const database = await readDatabaseFile();
    assert.equal(database.client_intake_submissions.length, 1);
    assert.equal(database.projects.length, 1);
    assert.equal(database.projects[0]?.client_user_id, TEST_USER.id);
    assert.equal(database.projects[0]?.submission_id, payload.data.intake_id);

    const adminNotify = database.notifications.find((item) => item.kind === "client_intake_received");
    const clientNotify = database.notifications.find((item) => item.kind === "client_intake_confirmed");
    assert.ok(adminNotify, "admin intake notification log expected");
    assert.ok(clientNotify, "client confirmation notification log expected");
    assert.equal(adminNotify?.status, "skipped");
    assert.equal(clientNotify?.status, "skipped");

    const skipAudits = database.audit_logs.filter(
      (entry) =>
        entry.action === "team_notification.email_skipped_missing_config" ||
        entry.action === "client_intake.confirmation_email_skipped_missing_config",
    );
    assert.ok(skipAudits.length >= 1, "expected email skip audit breadcrumbs");
  });

  it("records absolute admin_href in admin notification payload", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://growrix.example";
    resetRuntimeConfigForTests();

    const { notifyAdminIntakeReceived } = await import("@/server/domain/intake-notifications");
    const now = new Date().toISOString();
    await notifyAdminIntakeReceived({
      id: "intake-abs-url-1",
      submission_number: "INT-TEST-1",
      user_id: TEST_USER.id,
      client_email: TEST_USER.email,
      client_name: "Intake Client",
      business_name: "Absolute URL Co",
      business_description: "Long enough business description for intake notification testing.",
      goals: [],
      competitors: [],
      reference_sites: [],
      drive_links: [],
      uploaded_files: [],
      must_have_features: [],
      is_free_demo: false,
      status: "submitted",
      metadata: {},
      created_at: now,
      updated_at: now,
    });

    const database = await readDatabaseFile();
    const adminNotify = database.notifications.find((item) => item.kind === "client_intake_received");
    assert.ok(adminNotify);
    assert.equal(adminNotify?.payload?.admin_href, "https://growrix.example/admin/intakes/intake-abs-url-1");
    assert.equal(adminNotify?.status, "skipped");
  });

  it("increments free-demo claimed_count on free-demo submit and not on regular submit", async () => {
    const token = await issueSessionToken({
      userId: TEST_USER.id,
      email: TEST_USER.email,
      role: TEST_USER.role,
    });
    const { POST: createIntake } = await import("@/app/api/v1/intakes/route");

    const freeDemoResponse = await createIntake(
      new NextRequest("http://localhost/api/v1/intakes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `agency_session=${token}`,
        },
        body: JSON.stringify({
          business_name: "Counter Demo Co",
          business_description: "Long enough business description for free demo counter testing.",
          is_free_demo: true,
        }),
      }),
    );
    assert.equal(freeDemoResponse.status, 200);

    let database = await readDatabaseFile();
    const campaignAfterFree = database.free_demo_campaigns.find(
      (item) => item.id === "growrixos-launch-2026",
    );
    assert.ok(campaignAfterFree, "free demo campaign should exist after free-demo submit");
    assert.equal(campaignAfterFree?.claimed_count, 1);

    const regularResponse = await createIntake(
      new NextRequest("http://localhost/api/v1/intakes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `agency_session=${token}`,
        },
        body: JSON.stringify({
          business_name: "Regular Intake Co",
          business_description: "Long enough business description for non free-demo counter testing.",
          is_free_demo: false,
        }),
      }),
    );
    assert.equal(regularResponse.status, 200);

    database = await readDatabaseFile();
    const campaignAfterRegular = database.free_demo_campaigns.find(
      (item) => item.id === "growrixos-launch-2026",
    );
    assert.equal(campaignAfterRegular?.claimed_count, 1, "non free-demo submit must not increment counter");
  });
});
