import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { getInvoiceByOrder, markInvoicePaidForOrder, sendOrCreateInvoiceForOrder } from "@/server/domain/invoices";
import { createOrder, getOrderById } from "@/server/domain/orders";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "invoices-domain-test");
testEnv.SANITY_PROJECT_ID = "";
testEnv.SANITY_DATASET = "";
testEnv.SANITY_API_TOKEN = "";
testEnv.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";
testEnv.STRIPE_SECRET_KEY = "";
testEnv.STRIPE_WEBHOOK_SECRET = "";

testEnv.RESEND_API_KEY = "";
testEnv.CONTACT_FROM_EMAIL = "";
testEnv.CONTACT_TO_EMAIL = "";

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
            slug: "invoice-template-product",
            name: "Invoice Template Product",
            price: "$149",
            livePreviewUrl: "https://example.com/preview",
            embeddedPreviewUrl: "https://example.com/preview",
            category: "Templates",
            categorySlug: "templates",
            type: "Website",
            typeSlug: "website",
            industry: "General",
            industrySlug: "general",
            published: true,
            teaser: "Invoice test product",
            summary: "Invoice test product",
            audience: "Businesses",
            previewVariant: "marketing",
            includes: ["Template files"],
            stack: ["HTML"],
            highlights: [{ label: "Pages", value: "6" }],
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

describe("invoices domain", () => {
  beforeEach(async () => {
    await resetDatabase();
    await seedManagedProduct();
    resetRuntimeConfigForTests();
  });

  it("creates and sends an invoice for invoice-preference orders", async () => {
    const created = await createOrder({
      product_slug: "invoice-template-product",
      customer_name: "Invoice Buyer",
      customer_email: "invoice-buyer@example.com",
      payment_method_preference: "invoice",
    });

    const invoiceResult = await sendOrCreateInvoiceForOrder(created.order.id, {
      paymentMethod: "invoice",
    });

    assert.ok(invoiceResult.invoice.id);
    assert.equal(invoiceResult.invoice.order_id, created.order.id);
    assert.equal(invoiceResult.invoice.status, "sent");

    const persistedOrder = await getOrderById(created.order.id);
    assert.equal(persistedOrder?.invoice_id, invoiceResult.invoice.id);

    const invoice = await getInvoiceByOrder(created.order.id);
    assert.equal(invoice?.invoice_number.startsWith("INV-"), true);
  });

  it("marks invoice and order as paid", async () => {
    const created = await createOrder({
      product_slug: "invoice-template-product",
      customer_name: "Manual Pay Buyer",
      customer_email: "manual-pay@example.com",
      payment_method_preference: "invoice",
    });

    await sendOrCreateInvoiceForOrder(created.order.id, {
      paymentMethod: "invoice",
    });

    const paid = await markInvoicePaidForOrder(created.order.id, {
      actorEmail: "admin@example.com",
      notes: "Payment confirmed manually",
    });

    assert.equal(paid.invoice.status, "paid");
    assert.equal(paid.order.payment_status, "succeeded");
    assert.equal(Boolean(paid.invoice.paid_at), true);
  });
});
