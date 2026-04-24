import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { authenticateUser, createUser, updateUserProfile, validatePasswordStrength } from "@/server/auth/users";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe.sequential("auth users", () => {
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
    expect(() => validatePasswordStrength("weak")).toThrow(/Password must be at least 8 characters/);
  });

  it("creates authenticates and updates a subscriber", async () => {
    const user = await createUser({
      email: "user@example.com",
      password: "StrongPass1!",
      firstName: "Test",
      lastName: "User",
    });

    expect(user.role).toBe("subscriber");

    const authenticated = await authenticateUser("user@example.com", "StrongPass1!");
    expect(authenticated?.email).toBe("user@example.com");

    const updated = await updateUserProfile(authenticated!.id, { firstName: "Updated", lastName: "Name" });
    expect(updated.first_name).toBe("Updated");
    expect(updated.last_name).toBe("Name");
  });
});