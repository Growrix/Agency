import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";

const originalFetch = globalThis.fetch;

function setSupabaseEnv() {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  process.env.SUPABASE_SECRET_KEY = "service-role-key";
  process.env.SUPABASE_ANON_KEY = "anon-key";
}

function clearSupabaseEnv() {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_SECRET_KEY;
  delete process.env.SUPABASE_ANON_KEY;
}

async function resetModules() {
  resetRuntimeConfigForTests();
  resetSupabaseClientsForTests();
  const { resetStoreCacheForTests } = await import("@/server/data/store");
  resetStoreCacheForTests();
}

describe("reserveFreeDemoSlot — atomic Supabase path", () => {
  beforeEach(async () => {
    setSupabaseEnv();
    await resetModules();
  });

  afterEach(async () => {
    globalThis.fetch = originalFetch;
    clearSupabaseEnv();
    await resetModules();
  });

  it("increments via the RPC and does not fall back to read-modify-write", async () => {
    let rpcCalls = 0;

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/rpc/increment_free_demo_claimed_count")) {
        rpcCalls += 1;
        return new Response(
          JSON.stringify({
            found: true,
            incremented: true,
            claimed_count: 4,
            total_slots: 20,
            is_active: true,
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      throw new Error(`Unexpected fetch to ${url} — read-modify-write fallback should not run`);
    }) as typeof fetch;

    const { reserveFreeDemoSlot } = await import("@/server/domain/free-demo-campaign");
    const result = await reserveFreeDemoSlot();

    assert.equal(rpcCalls, 1);
    assert.equal(result.claimed_count, 4);
    assert.equal(result.total_slots, 20);
    assert.equal(result.is_active, true);
  });

  it("retries after a transient RPC failure (e.g. PostgREST thread killed by timeout) and succeeds", async () => {
    let rpcCalls = 0;

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/rpc/increment_free_demo_claimed_count")) {
        rpcCalls += 1;
        if (rpcCalls === 1) {
          throw new Error("fetch failed: socket hang up");
        }
        return new Response(
          JSON.stringify({ found: true, incremented: true, claimed_count: 1, total_slots: 20, is_active: true }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      throw new Error(`Unexpected fetch to ${url}`);
    }) as typeof fetch;

    const { reserveFreeDemoSlot } = await import("@/server/domain/free-demo-campaign");
    const result = await reserveFreeDemoSlot();

    assert.equal(rpcCalls, 2);
    assert.equal(result.claimed_count, 1);
  });

  it("throws CAMPAIGN_FULL when the RPC reports the campaign is full", async () => {
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({ found: true, incremented: false, claimed_count: 20, total_slots: 20, is_active: true }),
        { status: 200, headers: { "content-type": "application/json" } },
      )) as typeof fetch;

    const { reserveFreeDemoSlot } = await import("@/server/domain/free-demo-campaign");
    await assert.rejects(reserveFreeDemoSlot(), (error) => error instanceof Error && error.message === "CAMPAIGN_FULL");
  });

  it("throws CAMPAIGN_INACTIVE when the RPC reports the campaign is inactive", async () => {
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({ found: true, incremented: false, claimed_count: 3, total_slots: 20, is_active: false }),
        { status: 200, headers: { "content-type": "application/json" } },
      )) as typeof fetch;

    const { reserveFreeDemoSlot } = await import("@/server/domain/free-demo-campaign");
    await assert.rejects(
      reserveFreeDemoSlot(),
      (error) => error instanceof Error && error.message === "CAMPAIGN_INACTIVE",
    );
  });

  it("falls back to the read-modify-write path when the Supabase row has no campaign yet", async () => {
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/rpc/increment_free_demo_claimed_count")) {
        return new Response(
          JSON.stringify({ found: false, incremented: false, claimed_count: null, total_slots: null, is_active: null }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      if (url.includes("/app_state")) {
        return new Response(JSON.stringify({ payload: null }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch to ${url}`);
    }) as typeof fetch;

    const { reserveFreeDemoSlot } = await import("@/server/domain/free-demo-campaign");
    const result = await reserveFreeDemoSlot();

    assert.equal(result.claimed_count, 1);
    assert.equal(result.id, "growrixos-launch-2026");
  });
});
