import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { createOrder, getOrderById, markOrderPaid, updateOrderOperations } from "@/server/domain/orders";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "orders-domain-test");
testEnv.SANITY_PROJECT_ID = "";
testEnv.SANITY_DATASET = "";
testEnv.SANITY_API_TOKEN = "";

testEnv.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";

testEnv.STRIPE_SECRET_KEY = "";
testEnv.STRIPE_WEBHOOK_SECRET = "";

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

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
            slug: "legal-practice-website",
            name: "Legal Practice Website",
            price: "$1299",
            livePreviewUrl: "https://legal-practice-demo.vercel.app",
            embeddedPreviewUrl: "https://legal-practice-demo.vercel.app",
            category: "Professional Services",
            categorySlug: "professional-services",
            type: "Website",
            typeSlug: "website",
            industry: "Legal",
            industrySlug: "legal",
            published: true,
            teaser: "A trust-first website template for legal practices.",
            summary: "A launch-ready website template for law firms and solo practitioners.",
            audience: "Law firms and legal consultants",
            previewVariant: "marketing",
            includes: ["Homepage", "Services"],
            stack: ["Next.js", "Sanity"],
            highlights: [{ label: "Pages", value: "14" }],
            image: null,
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );
}

describe("orders domain", () => {
  beforeEach(async () => {
    await resetDatabase();
    await seedManagedProduct();
    resetRuntimeConfigForTests();
  });

  it("moves paid orders into intake_pending instead of delivered", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Morgan Buyer",
      customer_email: "morgan@example.com",
    });

    const paid = await markOrderPaid(created.order.id, "pi_test_123");

    assert.equal(paid?.payment_status, "succeeded");
    assert.equal(paid?.fulfillment_status, "intake_pending");
    assert.deepEqual(paid?.delivery_urls, []);
  });

  it("rejects delivered status when no delivery URL exists", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Taylor Buyer",
      customer_email: "taylor@example.com",
    });

    await markOrderPaid(created.order.id, "pi_test_456");
    await updateOrderOperations(created.order.id, { fulfillment_status: "fulfilling" });
    await updateOrderOperations(created.order.id, { fulfillment_status: "qa_review" });

    await assert.rejects(
      async () => {
        await updateOrderOperations(created.order.id, { fulfillment_status: "delivered" });
      },
      /Delivery URL is required before marking an order as delivered/,
    );
  });

  it("allows delivery once a delivery URL is attached", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Jordan Buyer",
      customer_email: "jordan@example.com",
    });

    await markOrderPaid(created.order.id, "pi_test_789");
    await updateOrderOperations(created.order.id, { fulfillment_status: "fulfilling" });
    await updateOrderOperations(created.order.id, { fulfillment_status: "qa_review" });

    const delivered = await updateOrderOperations(created.order.id, {
      fulfillment_status: "delivered",
      delivery_urls: ["https://downloads.example.com/orders/order-1.zip"],
    });

    assert.equal(delivered?.fulfillment_status, "delivered");
    assert.deepEqual(delivered?.delivery_urls, ["https://downloads.example.com/orders/order-1.zip"]);
    assert.equal(Boolean(delivered?.completed_at), true);

    const persisted = await getOrderById(created.order.id);
    assert.equal(persisted?.fulfillment_status, "delivered");
  });
});
