import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { authenticateUser, createUser, updateUserProfile, validatePasswordStrength } from "@/server/auth/users";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";

const dataDirectory = path.join(process.cwd(), ".data");
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

    const updated = await updateUserProfile(authenticated!.id, { firstName: "Updated", lastName: "Name" });
    assert.equal(updated.first_name, "Updated");
    assert.equal(updated.last_name, "Name");
  });
});