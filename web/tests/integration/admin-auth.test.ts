import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";
import { LEGACY_SESSION_COOKIE_NAME } from "@/server/auth/token";
import { createUser } from "@/server/auth/users";
import { issueSessionToken } from "@/server/auth/token";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "admin-auth-integration-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

async function readDatabaseFile() {
  const content = await readFile(databasePath, "utf8");
  return JSON.parse(content) as {
    audit_logs: Array<{ action: string; actor_email?: string; metadata?: Record<string, unknown> }>;
    users: Array<{ email: string; password_hash: string; deleted_at?: string }>;
  };
}

function clearClerkEnv() {
  delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  delete process.env.CLERK_SECRET_KEY;
  delete process.env.CLERK_WEBHOOK_SIGNING_SECRET;
}

describe("admin auth API flows", () => {
  beforeEach(async () => {
    await resetDatabase();
    clearClerkEnv();
    process.env.AUTH_JWT_SECRET = "test-admin-auth-jwt-secret!";
    process.env.ADMIN_EMAIL = "admin@growrixos.test";
    process.env.ADMIN_PASSWORD = "StrongAdminPass1!";
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_ANON_KEY = "";
    process.env.SUPABASE_SECRET_KEY = "";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "";
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();
  });

  afterEach(() => {
    clearClerkEnv();
    resetRuntimeConfigForTests();
  });

  it("legacy admin login succeeds with correct credentials and sets an httpOnly cookie", async () => {
    const { POST } = await import("@/app/api/v1/auth/login/route");
    const response = await POST(
      new NextRequest("http://localhost/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.10" },
        body: JSON.stringify({
          email: "admin@growrixos.test",
          password: "StrongAdminPass1!",
        }),
      }),
    );

    assert.equal(response.status, 200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    assert.match(setCookie, new RegExp(`${LEGACY_SESSION_COOKIE_NAME}=`));
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /SameSite=Strict/i);

    const payload = (await response.json()) as {
      success: boolean;
      data: { user: { email: string; role: string } };
    };
    assert.equal(payload.success, true);
    assert.equal(payload.data.user.email, "admin@growrixos.test");
    assert.equal(payload.data.user.role, "admin");

    const database = await readDatabaseFile();
    assert.ok(database.audit_logs.some((entry) => entry.action === "auth.admin_login_success"));
    assert.ok(
      database.users.every((user) => user.password_hash !== "env-admin"),
      "must never persist the env-admin sentinel",
    );
  });

  it("legacy admin login fails with the wrong password and records a failure audit", async () => {
    const { POST } = await import("@/app/api/v1/auth/login/route");
    const response = await POST(
      new NextRequest("http://localhost/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.11" },
        body: JSON.stringify({
          email: "admin@growrixos.test",
          password: "WrongPassword1!",
        }),
      }),
    );

    assert.equal(response.status, 401);
    const payload = (await response.json()) as { success: boolean; error: { code: string } };
    assert.equal(payload.success, false);
    assert.equal(payload.error.code, "UNAUTHORIZED");

    const database = await readDatabaseFile();
    assert.ok(database.audit_logs.some((entry) => entry.action === "auth.admin_login_failed"));
  });

  it("rejects arbitrary passwords after the admin is seeded (env-admin bypass regression)", async () => {
    const { ensureSeedAdminUser, authenticateUser } = await import("@/server/auth/users");
    await ensureSeedAdminUser();

    const bypass = await authenticateUser("admin@growrixos.test", "any-random-password-9");
    assert.equal(bypass, null);

    const { POST } = await import("@/app/api/v1/auth/login/route");
    const response = await POST(
      new NextRequest("http://localhost/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.12" },
        body: JSON.stringify({
          email: "admin@growrixos.test",
          password: "any-random-password-9",
        }),
      }),
    );
    assert.equal(response.status, 401);
  });

  it("returns 410 when Clerk is configured", async () => {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_fake";
    process.env.CLERK_SECRET_KEY = "sk_test_fake";
    resetRuntimeConfigForTests();

    const { POST } = await import("@/app/api/v1/auth/login/route");
    const response = await POST(
      new NextRequest("http://localhost/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.13" },
        body: JSON.stringify({
          email: "admin@growrixos.test",
          password: "StrongAdminPass1!",
        }),
      }),
    );

    assert.equal(response.status, 410);
    const payload = (await response.json()) as { error: { code: string } };
    assert.equal(payload.error.code, "GONE");
  });

  it("returns 401 for /api/v1/admin/analytics when unauthenticated", async () => {
    const { GET } = await import("@/app/api/v1/admin/analytics/route");
    const response = await GET(
      new NextRequest("http://localhost/api/v1/admin/analytics", {
        method: "GET",
        headers: { "x-forwarded-for": "203.0.113.14" },
      }),
    );
    assert.equal(response.status, 401);
  });

  it("returns 403 for /api/v1/admin/analytics when authenticated as a non-admin", async () => {
    const subscriber = await createUser({
      email: "subscriber@example.com",
      password: "StrongPass1!",
      firstName: "Sub",
      lastName: "Scriber",
    });
    const token = await issueSessionToken({
      userId: subscriber.id,
      email: subscriber.email,
      role: subscriber.role,
    });

    const { GET } = await import("@/app/api/v1/admin/analytics/route");
    const response = await GET(
      new NextRequest("http://localhost/api/v1/admin/analytics", {
        method: "GET",
        headers: {
          "x-forwarded-for": "203.0.113.15",
          cookie: `${LEGACY_SESSION_COOKIE_NAME}=${token}`,
        },
      }),
    );
    assert.equal(response.status, 403);
  });

  it("excludes soft-deleted Clerk users from lookups while keeping the DB row", async () => {
    const { upsertUserFromClerk, softDeleteClerkUser, getUserByClerkId } = await import(
      "@/server/auth/clerk-sync"
    );
    const { getUserById } = await import("@/server/auth/users");

    const synced = await upsertUserFromClerk({
      clerkUserId: "clerk_soft_delete_test",
      email: "soft-delete@example.com",
      firstName: "Soft",
      lastName: "Delete",
      role: "admin",
    });

    await softDeleteClerkUser("clerk_soft_delete_test");

    assert.equal(await getUserByClerkId("clerk_soft_delete_test"), null);
    assert.equal(await getUserById(synced.id), null);

    const database = await readDatabaseFile();
    const retained = database.users.find((user) => user.email === "soft-delete@example.com");
    assert.ok(retained, "soft-deleted user must remain in storage");
    assert.ok(retained?.deleted_at, "deleted_at must be set");
  });

  it("does not resurrect soft-deleted admin role without explicit Clerk metadata", async () => {
    const { upsertUserFromClerk, softDeleteClerkUser } = await import("@/server/auth/clerk-sync");

    await upsertUserFromClerk({
      clerkUserId: "clerk_admin_offboard",
      email: "former-admin@example.com",
      role: "admin",
    });
    await softDeleteClerkUser("clerk_admin_offboard");

    // Re-provision without an explicit role (simulates webhook with no publicMetadata.role).
    const restored = await upsertUserFromClerk({
      clerkUserId: "clerk_admin_offboard_new",
      email: "former-admin@example.com",
    });

    assert.equal(restored.role, "subscriber", "must not inherit prior admin role from soft-deleted mirror");
    assert.equal(restored.deleted_at, undefined);
  });
});
