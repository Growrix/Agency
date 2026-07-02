import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";

const dataDirectory = path.join(process.cwd(), ".data", "store-domain-test");
const databasePath = path.join(dataDirectory, "agency-db.json");
const originalFetch = globalThis.fetch;

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("store fail-closed guardrails", () => {
  beforeEach(async () => {
    await resetDatabase();
    process.env.AGENCY_DATA_DIRECTORY = dataDirectory;
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
    process.env.SUPABASE_SECRET_KEY = "service-role-key";
    process.env.SUPABASE_ANON_KEY = "anon-key";
    process.env.APP_ENV = "production";
    delete process.env.ALLOW_SUPABASE_FILE_FALLBACK;

    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();

    globalThis.fetch = (async () => {
      throw new Error("Supabase unavailable");
    }) as typeof fetch;
  });

  afterEach(async () => {
    globalThis.fetch = originalFetch;
    delete process.env.APP_ENV;
    delete process.env.ALLOW_SUPABASE_FILE_FALLBACK;
    delete process.env.AGENCY_DATA_DIRECTORY;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SECRET_KEY;
    delete process.env.SUPABASE_ANON_KEY;

    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();
    await resetDatabase();
  });

  it("fails closed in production when Supabase is unavailable", async () => {
    const { readDatabase } = await import("@/server/data/store");

    await assert.rejects(
      async () => {
        await readDatabase();
      },
      (error) =>
        error instanceof Error &&
        error.message.includes("Supabase persistence is unavailable and file fallback is disabled in production")
    );
  });

  it("allows explicit emergency file fallback override", async () => {
    process.env.ALLOW_SUPABASE_FILE_FALLBACK = "1";
    const { readDatabase, writeDatabase } = await import("@/server/data/store");

    const initial = await readDatabase();
    assert.equal(initial.inquiries.length, 0);

    await writeDatabase((next) => ({
      ...next,
      inquiries: [
        {
          id: "inquiry-test-1",
          visitor_email: "fallback@example.com",
          visitor_name: "Fallback User",
          subject: "Fallback active",
          message: "Emergency write path",
          inquiry_type: "general",
          status: "new",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    }));

    const content = await readFile(databasePath, "utf8");
    const parsed = JSON.parse(content) as { inquiries?: Array<{ visitor_email: string }> };
    assert.equal(parsed.inquiries?.[0]?.visitor_email, "fallback@example.com");
  });
});
