import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import { resetSupabaseClientsForTests } from "@/server/supabase/client";
import { createUser } from "@/server/auth/users";
import { issueSessionToken, LEGACY_SESSION_COOKIE_NAME } from "@/server/auth/token";
import { writeDatabase } from "@/server/data/store";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "customer-dashboard-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("customer dashboard aggregate", () => {
  beforeEach(async () => {
    await resetDatabase();
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    delete process.env.CLERK_SECRET_KEY;
    process.env.AUTH_JWT_SECRET = "test-customer-dashboard-jwt-secret!";
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_ANON_KEY = "";
    process.env.SUPABASE_SECRET_KEY = "";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "";
    resetRuntimeConfigForTests();
    resetSupabaseClientsForTests();
  });

  afterEach(() => {
    resetRuntimeConfigForTests();
  });

  it("returns a one-shot snapshot scoped to the authenticated customer", async () => {
    const user = await createUser({
      email: "customer@example.com",
      password: "StrongPass1!",
      firstName: "Cust",
      lastName: "Omer",
    });

    const now = new Date().toISOString();

    await writeDatabase((next) => ({
      ...next,
      orders: [
        {
          id: "order-1",
          order_number: "ORD-1",
          customer_email: "customer@example.com",
          customer_name: "Cust Omer",
          user_id: user.id,
          payment_status: "succeeded",
          fulfillment_status: "delivered",
          subtotal_cents: 1000,
          tax_cents: 0,
          discount_cents: 0,
          total_cents: 1000,
          currency: "USD",
          items: [
            {
              product_slug: "kit",
              product_name: "Kit",
              quantity: 1,
              unit_price_cents: 1000,
              total_cents: 1000,
            },
          ],
          delivery_urls: [],
          created_at: now,
        },
        {
          id: "order-other",
          order_number: "ORD-OTHER",
          customer_email: "other@example.com",
          customer_name: "Other",
          payment_status: "succeeded",
          fulfillment_status: "delivered",
          subtotal_cents: 2000,
          tax_cents: 0,
          discount_cents: 0,
          total_cents: 2000,
          currency: "USD",
          items: [
            {
              product_slug: "kit",
              product_name: "Kit",
              quantity: 1,
              unit_price_cents: 2000,
              total_cents: 2000,
            },
          ],
          delivery_urls: [],
          created_at: now,
        },
      ],
      downloads: [
        {
          id: "dl-1",
          order_id: "order-1",
          product_slug: "kit",
          user_email: "customer@example.com",
          asset_path: "/files/kit.zip",
          download_count: 0,
          max_downloads: 5,
          status: "issued",
          created_at: now,
        },
      ],
      licenses: [
        {
          id: "lic-1",
          order_id: "order-1",
          product_slug: "kit",
          user_email: "customer@example.com",
          license_key: "KEY-1",
          license_type: "single_site",
          status: "active",
          issued_at: now,
        },
      ],
      appointments: [
        {
          id: "appt-1",
          visitor_name: "Cust Omer",
          visitor_email: "customer@example.com",
          service_interested_in: "Website",
          preferred_datetime: now,
          timezone: "UTC",
          duration_minutes: 30,
          status: "inquiry",
          created_at: now,
        },
      ],
      projects: [
        {
          id: "prj-1",
          project_number: "PRJ-1",
          title: "Customer site",
          status: "in_progress",
          client_user_id: user.id,
          submission_id: "intake-1",
          created_at: now,
          updated_at: now,
        },
      ],
      client_intake_submissions: [
        {
          id: "intake-1",
          submission_number: "INT-1",
          business_name: "Acme",
          business_description: "Acme business",
          client_email: "customer@example.com",
          client_name: "Cust Omer",
          goals: [],
          competitors: [],
          reference_sites: [],
          drive_links: [],
          uploaded_files: [],
          must_have_features: [],
          is_free_demo: false,
          status: "submitted",
          user_id: user.id,
          metadata: {},
          created_at: now,
          updated_at: now,
        },
      ],
    }));

    const token = await issueSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { GET } = await import("@/app/api/v1/me/dashboard/route");
    const response = await GET(
      new NextRequest("http://localhost/api/v1/me/dashboard", {
        method: "GET",
        headers: {
          cookie: `${LEGACY_SESSION_COOKIE_NAME}=${token}`,
          "x-forwarded-for": "203.0.113.50",
        },
      }),
    );

    assert.equal(response.status, 200);
    const payload = (await response.json()) as {
      success: boolean;
      data: {
        user: { email: string };
        orders: Array<{ id: string }>;
        downloads: Array<{ id: string }>;
        licenses: Array<{ id: string }>;
        appointments: Array<{ id: string }>;
        projects: Array<{ id: string }>;
        intakes: Array<{ id: string }>;
      };
    };

    assert.equal(payload.success, true);
    assert.equal(payload.data.user.email, "customer@example.com");
    assert.equal(payload.data.orders.length, 1);
    assert.equal(payload.data.orders[0]?.id, "order-1");
    assert.equal(payload.data.downloads.length, 1);
    assert.equal(payload.data.licenses.length, 1);
    assert.equal(payload.data.appointments.length, 1);
    assert.equal(payload.data.projects.length, 1);
    assert.equal(payload.data.intakes.length, 1);
  });
});
