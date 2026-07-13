import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import type { OrderRecord } from "@/server/data/schema";
import {
  buildOrderCreatedTeamEmail,
  getOrderCreatedEmailTemplate,
  updateOrderCreatedEmailTemplate,
} from "@/server/domain/email-templates";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "email-templates-domain-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

function buildOrderFixture(): OrderRecord {
  return {
    id: "order_1",
    order_number: "ORD-20260101-ABC123",
    customer_name: "Taylor Buyer",
    customer_email: "taylor@example.com",
    customer_phone: "+15551234567",
    payment_status: "pending",
    fulfillment_status: "pending",
    subtotal_cents: 99900,
    tax_cents: 0,
    discount_cents: 0,
    total_cents: 99900,
    currency: "USD",
    items: [
      {
        product_slug: "sample-template",
        product_name: "Sample Template",
        quantity: 1,
        unit_price_cents: 99900,
        total_cents: 99900,
      },
    ],
    delivery_urls: [],
    created_at: new Date().toISOString(),
  };
}

describe("email templates domain", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("loads the default order-created template", async () => {
    const template = await getOrderCreatedEmailTemplate();

    assert.ok(template.subject.includes("{{order_number}}"));
    assert.ok(template.text.includes("{{customer_email}}"));
    assert.ok(template.html.includes("{{items_html}}"));
  });

  it("renders order-created notifications using customized template fields", async () => {
    await updateOrderCreatedEmailTemplate({
      subject: "Order {{order_number}} from {{customer_email}}",
      text: "{{customer_name}} ordered {{item_count}} item(s). Notes: {{notes}}",
      html: "<p>{{customer_name}}</p><div>{{items_html}}</div>",
    });

    const rendered = await buildOrderCreatedTeamEmail(buildOrderFixture());

    assert.equal(rendered.subject, "Order ORD-20260101-ABC123 from taylor@example.com");
    assert.ok(rendered.text.includes("Taylor Buyer ordered 1 item(s)."));
    assert.ok(rendered.text.includes("Notes: N/A"));
    assert.ok(rendered.html.includes("<li>Sample Template x1 - 999.00 USD</li>"));
  });
});
