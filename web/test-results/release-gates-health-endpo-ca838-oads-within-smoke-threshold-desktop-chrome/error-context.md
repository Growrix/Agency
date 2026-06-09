# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: release-gates.spec.ts >> health endpoints respond and homepage loads within smoke threshold
- Location: tests\e2e\release-gates.spec.ts:30:5

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 10000
Received:   14853
```

# Test source

```ts
  1  | import AxeBuilder from "@axe-core/playwright";
  2  | import { expect, test } from "@playwright/test";
  3  | 
  4  | test("home and contact pages pass accessibility smoke checks", async ({ page }) => {
  5  |   test.setTimeout(120_000);
  6  |   for (const route of ["/", "/contact"]) {
  7  |     await page.goto(route, { waitUntil: "domcontentloaded" });
  8  |     const results = await new AxeBuilder({ page })
  9  |       .disableRules(["color-contrast", "definition-list", "region"])
  10 |       .analyze();
  11 |     const criticalViolations = results.violations.filter((violation) => violation.impact === "critical");
  12 |     expect(criticalViolations).toEqual([]);
  13 |   }
  14 | });
  15 | 
  16 | test("security headers and auth protection are present", async ({ request }) => {
  17 |   const response = await request.get("/");
  18 |   expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  19 |   expect(response.headers()["x-frame-options"]).toBe("DENY");
  20 |   expect(response.headers()["strict-transport-security"]).toContain("max-age=31536000");
  21 | 
  22 |   const adminApi = await request.get("/api/v1/admin/analytics");
  23 |   expect(adminApi.status()).toBe(401);
  24 | 
  25 |   const adminPageResponse = await request.get("/admin", { maxRedirects: 0 });
  26 |   expect([307, 308]).toContain(adminPageResponse.status());
  27 |   expect(adminPageResponse.headers()["location"] ?? "").toContain("/admin/login");
  28 | });
  29 | 
  30 | test("health endpoints respond and homepage loads within smoke threshold", async ({ request, page }) => {
  31 |   const health = await request.get("/api/health");
  32 |   const ready = await request.get("/api/ready");
  33 |   expect(health.ok()).toBeTruthy();
  34 |   expect(ready.ok()).toBeTruthy();
  35 | 
  36 |   const started = Date.now();
  37 |   await page.goto("/", { waitUntil: "domcontentloaded" });
  38 |   const duration = Date.now() - started;
> 39 |   expect(duration).toBeLessThan(10_000);
     |                    ^ Error: expect(received).toBeLessThan(expected)
  40 | });
```