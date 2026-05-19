import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "agency-db.json");
const originalFetch = globalThis.fetch;

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

async function seedManagedProduct() {
  await writeFile(
    databasePath,
    JSON.stringify(
      {
        products: [
          {
            slug: "three-circles-template",
            name: "Three Circles Template",
            price: "$999",
            livePreviewUrl: "https://three-circles-demo.vercel.app",
            embeddedPreviewUrl: "https://three-circles-demo.vercel.app",
            category: "Interior Designer Company",
            categorySlug: "interior-designer-company",
            type: "SaaS",
            typeSlug: "saas",
            industry: "Service",
            industrySlug: "service",
            published: true,
            teaser: "Premium website template for interior design brands.",
            summary: "A polished website template built for premium service businesses.",
            audience: "Interior design studios",
            previewVariant: "marketing",
            includes: ["Homepage", "Services page"],
            stack: ["Next.js", "Sanity"],
            highlights: [{ label: "Pages", value: "12" }],
            image: null,
          },
        ],
      },
      null,
      2
    ),
    "utf8"
  );
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

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

describe("API flows", () => {
  beforeEach(async () => {
    await resetDatabase();
    process.env.OPENAI_API_KEY = "test-openai-key";
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SECRET_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    resetRuntimeConfigForTests();
    globalThis.fetch = (async (input) => {
      const url = getRequestUrl(input);

      if (url === "https://api.openai.com/v1/chat/completions") {
        return new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    answer: "We can help with booking.",
                    response_state: "answered",
                    source_ids: ["booking-path"],
                    action_ids: ["book"],
                  }),
                },
              },
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (originalFetch) {
        return originalFetch(input);
      }

      throw new Error(`Unexpected fetch request: ${url}`);
    }) as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    resetRuntimeConfigForTests();
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
    assert.equal(response.status, 200);

    const database = await readDatabaseFile();
    assert.equal(database.inquiries.length, 1);
    assert.equal(database.inquiries[0]?.visitor_email, "alex@example.com");
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

    assert.equal(firstResponse.status, 200);

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

    assert.equal(secondResponse.status, 409);
  });

  it("creates persisted orders even when Stripe is not configured", async () => {
    const { POST } = await import("@/app/api/v1/orders/route");
    await seedManagedProduct();

    const response = await POST(
      new NextRequest("http://localhost/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
        body: JSON.stringify({
          customer_name: "Morgan Buyer",
          customer_email: "morgan@example.com",
          product_slug: "three-circles-template",
        }),
      })
    );

    assert.equal(response.status, 201);

    const payload = await response.json() as { data: { integration_ready: boolean } };
    assert.equal(payload.data.integration_ready, false);

    const database = await readDatabaseFile();
    assert.equal(database.orders.length, 1);
    assert.equal(database.orders[0]?.customer_email, "morgan@example.com");
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

    assert.equal(response.status, 200);

    const database = await readDatabaseFile();
    assert.equal(database.conversations.length, 1);
    assert.equal(database.conversations[0]?.messages.length, 2);
    assert.match(database.conversations[0]?.messages[0]?.content ?? "", /booking/i);
  });
});