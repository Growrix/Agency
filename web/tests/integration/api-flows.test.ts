import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "agency-db.json");

vi.mock("@/server/ai/concierge", () => ({
  generateConciergeReply: vi.fn(async () => ({
    answer: "We can help with that.",
    messageId: "message-1",
    responseState: "answered",
    sessionId: "session-1",
    sources: [{ label: "Pricing", sourcePath: "/pricing", sourceType: "page" }],
    suggestedActions: [{ label: "Book appointment", href: "/book-appointment" }],
  })),
}));

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

async function readDatabaseFile() {
  const content = await readFile(databasePath, "utf8");
  return JSON.parse(content) as {
    inquiries: Array<{ visitor_email: string }>;
    appointments: Array<{ id: string; preferred_datetime: string }>;
    orders: Array<{ customer_email: string }>;
    conversations: Array<{ id: string; messages: Array<{ content: string }> }>;
  };
}

describe.sequential("API flows", () => {
  beforeEach(async () => {
    await resetDatabase();
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SECRET_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it("persists contact inquiries through the v1 route", async () => {
    const { POST } = await import("@/app/api/v1/contact/route");
    const request = new NextRequest("http://localhost/api/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
      body: JSON.stringify({
        visitor_name: "Alex Founder",
        visitor_email: "alex@example.com",
        message: "Need a premium website launch within the next month.",
        service: "Premium custom website",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const database = await readDatabaseFile();
    expect(database.inquiries).toHaveLength(1);
    expect(database.inquiries[0]?.visitor_email).toBe("alex@example.com");
  });

  it("creates appointments and rejects duplicate reserved slots", async () => {
    const { POST } = await import("@/app/api/v1/appointments/route");
    const slot = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const firstResponse = await POST(
      new NextRequest("http://localhost/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
        body: JSON.stringify({
          visitor_name: "Jamie Builder",
          visitor_email: "jamie@example.com",
          service_interested_in: "SaaS application",
          preferred_datetime: slot,
          timezone: "UTC",
        }),
      })
    );

    expect(firstResponse.status).toBe(200);

    const secondResponse = await POST(
      new NextRequest("http://localhost/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
        body: JSON.stringify({
          visitor_name: "Taylor Builder",
          visitor_email: "taylor@example.com",
          service_interested_in: "SaaS application",
          preferred_datetime: slot,
          timezone: "UTC",
        }),
      })
    );

    expect(secondResponse.status).toBe(409);
  });

  it("creates persisted orders even when Stripe is not configured", async () => {
    const { POST } = await import("@/app/api/v1/orders/route");

    const response = await POST(
      new NextRequest("http://localhost/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
        body: JSON.stringify({
          customer_name: "Morgan Buyer",
          customer_email: "morgan@example.com",
          product_slug: "booking-stripe-bundle",
        }),
      })
    );

    expect(response.status).toBe(201);

    const payload = await response.json() as { data: { integration_ready: boolean } };
    expect(payload.data.integration_ready).toBe(false);

    const database = await readDatabaseFile();
    expect(database.orders).toHaveLength(1);
    expect(database.orders[0]?.customer_email).toBe("morgan@example.com");
  });

  it("persists concierge conversations through the public route", async () => {
    const { POST } = await import("@/app/api/v1/ai-concierge/route");

    const response = await POST(
      new NextRequest("http://localhost/api/v1/ai-concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
        body: JSON.stringify({
          message: "Can you help with booking?",
          pagePath: "/book-appointment",
        }),
      })
    );

    expect(response.status).toBe(200);

    const database = await readDatabaseFile();
    expect(database.conversations).toHaveLength(1);
    expect(database.conversations[0]?.messages).toHaveLength(2);
    expect(database.conversations[0]?.messages[0]?.content).toContain("booking");
  });
});