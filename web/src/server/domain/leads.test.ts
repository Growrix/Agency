import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import {
  classifyLeadTemperature,
  getLeadByEmail,
  getLeadScoreWeight,
  listLeadEvents,
  recordLeadEvent,
  upsertLead,
} from "@/server/domain/leads";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "leads-domain-test");
testEnv.SUPABASE_URL = "";
testEnv.SUPABASE_ANON_KEY = "";
testEnv.SUPABASE_SECRET_KEY = "";
testEnv.SUPABASE_SERVICE_ROLE_KEY = "";
testEnv.LARK_WEBHOOK_URL = "";
testEnv.LEAD_HOT_THRESHOLD = "30";

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY!;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("leads domain", () => {
  beforeEach(async () => {
    await resetDatabase();
    resetRuntimeConfigForTests();
  });

  it("computes deterministic score weights for known event types", () => {
    assert.equal(getLeadScoreWeight("product_view"), 1);
    assert.equal(getLeadScoreWeight("checkout_completed"), 30);
    assert.equal(getLeadScoreWeight("booking"), 20);
    assert.equal(getLeadScoreWeight("whatsapp_click"), 6);
  });

  it("classifies temperature against the hot-lead threshold", () => {
    assert.equal(classifyLeadTemperature(0, false), "cold");
    assert.equal(classifyLeadTemperature(15, false), "warm");
    assert.equal(classifyLeadTemperature(30, false), "hot");
    assert.equal(classifyLeadTemperature(5, true), "customer");
  });

  it("upserts a lead idempotently by email", async () => {
    const first = await upsertLead({ email: "Buyer@Example.com", source: "contact_form", name: "Buyer" });
    const second = await upsertLead({ email: "buyer@example.com", source: "ai_concierge", phone: "+10001" });

    assert.equal(first.email, "buyer@example.com");
    assert.equal(second.id, first.id);
    assert.equal(second.phone, "+10001");
    assert.equal(second.last_source, "ai_concierge");
    assert.equal(second.primary_source, "contact_form");
  });

  it("records lead events, accumulates score, and promotes temperature", async () => {
    const view = await recordLeadEvent({ email: "hot@example.com", eventType: "product_view", route: "/digital-products/x" });
    assert.equal(view.lead.score, 1);
    assert.equal(view.lead.temperature, "cold");

    const checkout = await recordLeadEvent({ email: "hot@example.com", eventType: "checkout_started", route: "/checkout" });
    assert.equal(checkout.lead.score, 11);
    assert.equal(checkout.lead.temperature, "warm");

    const completed = await recordLeadEvent({
      email: "hot@example.com",
      eventType: "checkout_completed",
      route: "/success",
      relatedOrderId: "order-123",
    });
    assert.equal(completed.lead.score, 41);
    assert.equal(completed.lead.temperature, "customer");
    assert.equal(completed.lead.status, "customer");
    assert.equal(completed.promoted, true);
    assert.deepEqual(completed.lead.related_order_ids, ["order-123"]);

    const events = await listLeadEvents(completed.lead.id);
    assert.equal(events.length, 3);
    const stored = await getLeadByEmail("hot@example.com");
    assert.ok(stored);
    assert.equal(stored?.score, 41);
  });

  it("rejects invalid emails", async () => {
    await assert.rejects(() => upsertLead({ email: "not-an-email", source: "contact_form" }));
    await assert.rejects(() => recordLeadEvent({ email: "x", eventType: "product_view" }));
  });
});
