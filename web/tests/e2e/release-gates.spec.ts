import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home and contact pages pass accessibility smoke checks", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["/", "/contact"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast", "definition-list", "region"])
      .analyze();
    const criticalViolations = results.violations.filter((violation) => violation.impact === "critical");
    expect(criticalViolations).toEqual([]);
  }
});

test("security headers and auth protection are present", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["strict-transport-security"]).toContain("max-age=31536000");

  const adminApi = await request.get("/api/v1/admin/analytics");
  expect(adminApi.status()).toBe(401);

  const adminPageResponse = await request.get("/admin", { maxRedirects: 0 });
  expect([307, 308]).toContain(adminPageResponse.status());
  expect(adminPageResponse.headers()["location"] ?? "").toContain("/admin/login");
});

test("health endpoints respond and homepage loads within smoke threshold", async ({ request, page }) => {
  const health = await request.get("/api/health");
  const ready = await request.get("/api/ready");
  expect(health.ok()).toBeTruthy();
  expect(ready.ok()).toBeTruthy();

  const started = Date.now();
  await page.goto("/", { waitUntil: "networkidle" });
  const duration = Date.now() - started;
  expect(duration).toBeLessThan(10_000);
});