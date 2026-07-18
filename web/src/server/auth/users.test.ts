import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { authenticateUser, createUser, ensureSeedAdminUser, updateUserProfile, validatePasswordStrength } from "@/server/auth/users";
import { readDatabase } from "@/server/data/store";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "auth-users-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("auth users", () => {
  beforeEach(async () => {
    await resetDatabase();
    process.env.AUTH_JWT_SECRET = "test-secret-key-123!";
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_ANON_KEY = "";
    process.env.SUPABASE_SECRET_KEY = "";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "";
    process.env.ADMIN_EMAIL = "";
    process.env.ADMIN_PASSWORD = "";
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();
  });

  it("rejects weak passwords", () => {
    assert.throws(() => validatePasswordStrength("weak"), /Password must be at least 8 characters/);
  });

  it("creates authenticates and updates a subscriber", async () => {
    const user = await createUser({
      email: "user@example.com",
      password: "StrongPass1!",
      firstName: "Test",
      lastName: "User",
    });

    assert.equal(user.role, "subscriber");

    const authenticated = await authenticateUser("user@example.com", "StrongPass1!");
    assert.equal(authenticated?.email, "user@example.com");

    const updated = await updateUserProfile(authenticated!.id, {
      phone: "+15551234567",
      marketingOptIn: true,
    });
    assert.equal(updated.phone, "+15551234567");
    assert.equal(updated.marketing_opt_in, true);
  });
});

describe("legacy admin auth hardening", () => {
  beforeEach(async () => {
    await resetDatabase();
    process.env.AUTH_JWT_SECRET = "test-secret-key-123!";
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_ANON_KEY = "";
    process.env.SUPABASE_SECRET_KEY = "";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "";
    process.env.ADMIN_EMAIL = "admin@growrixos.test";
    process.env.ADMIN_PASSWORD = "StrongAdminPass1!";
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();
  });

  it("seeds the admin user with a bcrypt hash on first login", async () => {
    const seeded = await ensureSeedAdminUser();
    assert.ok(seeded, "ensureSeedAdminUser should return the seeded admin");
    assert.equal(seeded?.role, "admin");
    assert.equal(seeded?.email, "admin@growrixos.test");
    assert.notEqual(seeded?.password_hash, "env-admin", "must not store the env-admin sentinel");
    assert.notEqual(seeded?.password_hash, "StrongAdminPass1!", "must not store the plaintext password");
    assert.ok(seeded?.password_hash.startsWith("$2"), "password_hash must be a bcrypt hash");
  });

  it("authenticates the admin with the correct password", async () => {
    const user = await authenticateUser("admin@growrixos.test", "StrongAdminPass1!");
    assert.equal(user?.email, "admin@growrixos.test");
    assert.equal(user?.role, "admin");
  });

  it("rejects the admin with the wrong password", async () => {
    const user = await authenticateUser("admin@growrixos.test", "WrongPassword1!");
    assert.equal(user, null, "wrong password must not authenticate");
  });

  it("does not bypass password verification after the admin is seeded", async () => {
    // Seed the admin first.
    await ensureSeedAdminUser();

    // Attempt to authenticate with an arbitrary password — must fail.
    const bypassAttempt = await authenticateUser("admin@growrixos.test", "any-random-password-9");
    assert.equal(bypassAttempt, null, "env-admin bypass must no longer accept arbitrary passwords");

    // Correct password still works.
    const valid = await authenticateUser("admin@growrixos.test", "StrongAdminPass1!");
    assert.equal(valid?.email, "admin@growrixos.test");
  });

  it("migrates a legacy env-admin sentinel record to a bcrypt hash on next ensureSeedAdminUser", async () => {
    // Simulate a polluted database with the legacy sentinel.
    const { writeDatabase } = await import("@/server/data/store");
    const now = new Date().toISOString();
    await writeDatabase((next) => ({
      ...next,
      users: [
        {
          id: "legacy-admin-id",
          email: "admin@growrixos.test",
          password_hash: "env-admin",
          role: "admin",
          created_at: now,
          updated_at: now,
        },
        ...next.users,
      ],
    }));

    const migrated = await ensureSeedAdminUser();
    assert.equal(migrated?.id, "legacy-admin-id");
    assert.notEqual(migrated?.password_hash, "env-admin", "sentinel must be replaced");
    assert.ok(migrated?.password_hash.startsWith("$2"), "must be a bcrypt hash after migration");

    // The bypass must no longer work.
    const bypassAttempt = await authenticateUser("admin@growrixos.test", "any-random-password-9");
    assert.equal(bypassAttempt, null);

    // The configured env password must now work against the migrated hash.
    const valid = await authenticateUser("admin@growrixos.test", "StrongAdminPass1!");
    assert.equal(valid?.email, "admin@growrixos.test");
  });

  it("excludes soft-deleted users from authentication and lookups", async () => {
    const { softDeleteClerkUser, upsertUserFromClerk, getUserByClerkId } = await import("@/server/auth/clerk-sync");
    const { getUserById } = await import("@/server/auth/users");

    const synced = await upsertUserFromClerk({
      clerkUserId: "clerk-deleted-user",
      email: "deleted@example.com",
      firstName: "Deleted",
      lastName: "User",
    });

    await softDeleteClerkUser("clerk-deleted-user");

    // Lookups by clerk id and by internal id must return null.
    assert.equal(await getUserByClerkId("clerk-deleted-user"), null);
    assert.equal(await getUserById(synced.id), null);

    // The record must still exist in the database (soft delete, not hard delete).
    const database = await readDatabase();
    const record = database.users.find((user) => user.id === synced.id);
    assert.ok(record, "soft-deleted record must still exist");
    assert.ok(record?.deleted_at, "deleted_at must be set");
  });
});