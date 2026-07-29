import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "clerk-sync-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("clerk user mirror", () => {
  it("preserves internal user id when syncing by email", async () => {
    await resetDatabase();
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();

    const { createUser } = await import("@/server/auth/users");
    const { upsertUserFromClerk, getUserByClerkId } = await import("@/server/auth/clerk-sync");

    const existing = await createUser({
      email: "buyer@example.com",
      password: "StrongPass1!",
      firstName: "Buyer",
      lastName: "Example",
    });

    const synced = await upsertUserFromClerk({
      clerkUserId: "user_clerk_test_123",
      email: "buyer@example.com",
      firstName: "Buyer",
      lastName: "Example",
    });

    assert.equal(synced.id, existing.id);
    assert.equal(synced.clerk_user_id, "user_clerk_test_123");
    assert.equal((await getUserByClerkId("user_clerk_test_123"))?.email, "buyer@example.com");
  });

  it("resolveRoleFromClerkMetadata defaults to subscriber and accepts admin", async () => {
    const { resolveRoleFromClerkMetadata } = await import("@/server/auth/clerk-sync");
    assert.equal(resolveRoleFromClerkMetadata(undefined), "subscriber");
    assert.equal(resolveRoleFromClerkMetadata({}), "subscriber");
    assert.equal(resolveRoleFromClerkMetadata({ role: "admin" }), "admin");
    assert.equal(resolveRoleFromClerkMetadata({ role: "invalid" }), "subscriber");
  });

  it("resolveRoleFromClerkMetadata trims and lowercases role values", async () => {
    const { resolveRoleFromClerkMetadata } = await import("@/server/auth/clerk-sync");
    assert.equal(resolveRoleFromClerkMetadata({ role: "Admin" }), "admin");
    assert.equal(resolveRoleFromClerkMetadata({ role: " admin " }), "admin");
    assert.equal(resolveRoleFromClerkMetadata({ role: "CUSTOMER" }), "customer");
    assert.equal(resolveRoleFromClerkMetadata({ role: " Subscriber " }), "subscriber");
  });

  it("demotes prior admin when webhook-style role subscriber is applied", async () => {
    await resetDatabase();
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();

    const { upsertUserFromClerk, resolveRoleFromClerkMetadata } = await import(
      "@/server/auth/clerk-sync"
    );

    await upsertUserFromClerk({
      clerkUserId: "user_admin_demote",
      email: "demote@example.com",
      role: "admin",
    });

    // Simulates webhook user.updated after publicMetadata.role was removed in Clerk.
    const demoted = await upsertUserFromClerk({
      clerkUserId: "user_admin_demote",
      email: "demote@example.com",
      role: resolveRoleFromClerkMetadata({}),
    });

    assert.equal(demoted.role, "subscriber");
  });

  it("promotes subscriber when explicit admin role is supplied", async () => {
    await resetDatabase();
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();

    const { upsertUserFromClerk } = await import("@/server/auth/clerk-sync");

    await upsertUserFromClerk({
      clerkUserId: "user_promote",
      email: "promote@example.com",
      role: "subscriber",
    });

    const promoted = await upsertUserFromClerk({
      clerkUserId: "user_promote",
      email: "promote@example.com",
      role: "admin",
    });

    assert.equal(promoted.role, "admin");
  });
});
