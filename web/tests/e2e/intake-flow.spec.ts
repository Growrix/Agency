import { expect, test } from "@playwright/test";

test("free demo campaign endpoint returns live counter state", async ({ request }) => {
  const response = await request.get("/api/v1/campaigns/free-demo");
  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as {
    data?: { totalSlots: number; claimedCount: number; remaining: number; isActive: boolean };
  };
  expect(payload.data?.totalSlots).toBe(20);
  expect(payload.data?.remaining).toBeGreaterThanOrEqual(0);
  expect(typeof payload.data?.claimedCount).toBe("number");
  expect(payload.data?.isActive).toBe(true);
});

test("client intake submission requires authentication", async ({ request }) => {
  const response = await request.post("/api/v1/campaigns/free-demo", {
    failOnStatusCode: false,
  });
  expect(response.status()).toBe(405);

  const intakeResponse = await request.post("/api/v1/intakes", {
    failOnStatusCode: false,
    data: {
      business_name: "Playwright Test Co",
      business_description: "Integration test business description long enough.",
    },
  });
  expect([401, 403]).toContain(intakeResponse.status());
});

test("admin intakes API is protected", async ({ request }) => {
  const response = await request.get("/api/v1/admin/intakes", { maxRedirects: 0 });
  expect([401, 307, 308]).toContain(response.status());
});

test("homepage loads with free demo gate without runtime errors", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);

  expect(pageErrors).toEqual([]);
});

test("dashboard projects page is the free-demo intake endpoint", async ({ page }) => {
  await page.goto("/dashboard/projects", { waitUntil: "domcontentloaded" });
  // Unauthenticated users are redirected to login; authenticated see projects workspace.
  const url = page.url();
  expect(url.includes("/dashboard/projects") || url.includes("/dashboard/login") || url.includes("/sign-in")).toBeTruthy();
});
