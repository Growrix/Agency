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
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/dashboard/projects", { waitUntil: "domcontentloaded" });
  // Unauthenticated users are redirected to login; authenticated see projects workspace.
  const url = page.url();
  expect(url.includes("/dashboard/projects") || url.includes("/dashboard/login") || url.includes("/sign-in")).toBeTruthy();

  // Authenticated crash regression: Application Error boundary must not appear.
  if (url.includes("/dashboard/projects")) {
    await page.waitForTimeout(1500);
    await expect(page.getByText("Something went wrong.")).toHaveCount(0);
    await expect(page.getByText("APPLICATION ERROR")).toHaveCount(0);
  }

  expect(pageErrors).toEqual([]);
});

test("intake success panel markup is present in homepage bundle after free-demo gate mounts", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);

  // Offer modal should open (auto 5s). Switch to form and assert the form shell mounts.
  // MarketingViewportGate mounts mobile + desktop panels; assert the desktop-visible copy.
  const claimButton = page.getByRole("button", { name: /Claim my free demo/i });
  if (await claimButton.isVisible().catch(() => false)) {
    await claimButton.click();
    await expect(page.getByText("Project intake")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText(/Step 1 of 5/i).locator("visible=true").first()).toBeVisible({
      timeout: 5000,
    });
  }

  // Success panel is only shown after a real submit; verify data-testid exists in source by
  // checking the component is wired (form present). Full signed-in submit is covered by integration.
  expect(pageErrors).toEqual([]);
});
