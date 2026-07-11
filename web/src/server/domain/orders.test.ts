import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { listDownloadsByEmail, listLicensesByEmail } from "@/server/domain/downloads";
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

    const licenses = await listLicensesByEmail("morgan@example.com");
    assert.equal(licenses.length, 1);
    assert.equal(licenses[0]?.order_id, created.order.id);

    const downloads = await listDownloadsByEmail("morgan@example.com");
    assert.equal(downloads.length, 0);
  });

  it("stores selected variant and tier details on order records", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      product_variant_slug: "premium_plus",
      product_tier_name: "Premium Plus",
      fulfillment_type: "Done For You",
      customer_name: "Casey Buyer",
      customer_email: "casey@example.com",
    });

    assert.equal(created.order.selected_variant_slug, "premium-plus");
    assert.equal(created.order.selected_tier_name, "Premium Plus");
    assert.equal(created.order.selected_fulfillment_type, "done-for-you");
    assert.equal(created.order.items[0]?.product_variant_slug, "premium-plus");
    assert.equal(created.order.items[0]?.product_tier_name, "Premium Plus");
    assert.equal(created.order.items[0]?.fulfillment_type, "done-for-you");
  });

  it("attaches local user ownership when provided", async () => {
    const ownerUserId = crypto.randomUUID();
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Jamie Owner",
      customer_email: "jamie@example.com",
      user_id: ownerUserId,
    });

    assert.equal(created.order.user_id, ownerUserId);

    const persisted = await getOrderById(created.order.id);
    assert.equal(persisted?.user_id, ownerUserId);
  });

  it("applies webhook selection metadata when payment completes", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Riley Buyer",
      customer_email: "riley@example.com",
    });

    const paid = await markOrderPaid(created.order.id, "pi_test_meta", {
      variantSlug: "enterprise-tier",
      tierName: "Enterprise",
      fulfillmentType: "Done For You",
    });

    assert.equal(paid?.selected_variant_slug, "enterprise-tier");
    assert.equal(paid?.selected_tier_name, "Enterprise");
    assert.equal(paid?.selected_fulfillment_type, "done-for-you");
    assert.equal(paid?.items[0]?.product_variant_slug, "enterprise-tier");
    assert.equal(paid?.items[0]?.product_tier_name, "Enterprise");
    assert.equal(paid?.items[0]?.fulfillment_type, "done-for-you");
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

    const downloads = await listDownloadsByEmail("jordan@example.com");
    assert.equal(downloads.length, 1);
    assert.equal(downloads[0]?.order_id, created.order.id);
    assert.equal(downloads[0]?.asset_path, "https://downloads.example.com/orders/order-1.zip");
    assert.equal(downloads[0]?.file_label, "order-1.zip");

    const licenses = await listLicensesByEmail("jordan@example.com");
    assert.equal(licenses.length, 1);
  });

  it("does not duplicate entitlements when an order is edited after fulfillment", async () => {
    const created = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Dana Buyer",
      customer_email: "dana@example.com",
    });

    await markOrderPaid(created.order.id, "pi_test_repeat");
    await updateOrderOperations(created.order.id, { fulfillment_status: "fulfilling" });
    await updateOrderOperations(created.order.id, { fulfillment_status: "qa_review" });
    await updateOrderOperations(created.order.id, {
      fulfillment_status: "delivered",
      delivery_urls: ["https://downloads.example.com/orders/order-2.zip"],
    });
    await updateOrderOperations(created.order.id, { notes: "Customer confirmed receipt." });

    const downloads = await listDownloadsByEmail("dana@example.com");
    const licenses = await listLicensesByEmail("dana@example.com");

    assert.equal(downloads.length, 1);
    assert.equal(licenses.length, 1);
  });

  it("reuses an existing order when the same idempotency key is submitted", async () => {
    const first = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Idempotent Buyer",
      customer_email: "idempotent@example.com",
      idempotency_key: "checkout-key-001",
    });

    const second = await createOrder({
      product_slug: "legal-practice-website",
      customer_name: "Idempotent Buyer",
      customer_email: "idempotent@example.com",
      idempotency_key: "checkout-key-001",
    });

    assert.equal(second.order.id, first.order.id);
    assert.equal(second.order.idempotency_key, "checkout-key-001");
  });

  it("blocks oversell when stock_on_hand is exhausted", async () => {
    await writeFile(
      databasePath,
      JSON.stringify(
        {
          products: [
            {
              slug: "limited-website-template",
              name: "Limited Website Template",
              price: "$99",
              stock_on_hand: 1,
              category: "Templates",
              categorySlug: "templates",
              type: "Website",
              typeSlug: "website",
              industry: "General",
              industrySlug: "general",
              published: true,
              teaser: "Limited stock template.",
              summary: "Limited stock template.",
              audience: "Teams",
              previewVariant: "marketing",
              includes: ["Template"],
              stack: ["HTML"],
              highlights: [{ label: "Stock", value: "1" }],
              image: null,
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    await createOrder({
      product_slug: "limited-website-template",
      customer_name: "First Buyer",
      customer_email: "first-buyer@example.com",
    });

    await assert.rejects(
      async () => {
        await createOrder({
          product_slug: "limited-website-template",
          customer_name: "Second Buyer",
          customer_email: "second-buyer@example.com",
        });
      },
      /Insufficient inventory/,
    );
  });
});
