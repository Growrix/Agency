# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-booking.spec.ts >> live chat queue request works
- Location: tests\e2e\contact-booking.spec.ts:60:5

# Error details

```
Error: Timeout 10000ms exceeded while waiting on the predicate
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | 
  3  | async function setNativeInputValue(locator: Locator, value: string) {
  4  |   await locator.evaluate((node: HTMLInputElement, nextValue: string) => {
  5  |     const prototype = Object.getPrototypeOf(node) as HTMLInputElement;
  6  |     const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  7  |     node.focus();
  8  |     valueSetter?.call(node, nextValue);
  9  |     node.dispatchEvent(new Event("input", { bubbles: true }));
  10 |     node.dispatchEvent(new Event("change", { bubbles: true }));
  11 |   }, value);
  12 | }
  13 | 
  14 | test("contact inquiry flow works", async ({ page }) => {
  15 |   await page.goto("/contact");
  16 |   const uniqueSeed = Date.now();
  17 |   await page.getByLabel("Name").fill("Test Contact");
  18 |   await page.getByLabel("Email").fill(`contact+${uniqueSeed}@example.com`);
  19 |   await page.getByLabel("Service interest").selectOption({ label: "Premium custom website" });
  20 |   await page.getByLabel("Budget band").selectOption({ index: 1 });
  21 |   await page.getByLabel("Urgency").selectOption({ index: 1 });
  22 |   await page.getByLabel("Project summary").fill("Need a premium website launch in the next month.");
  23 |   await page.getByRole("button", { name: "Send inquiry" }).click();
  24 |   await expect(page.getByText(/Thanks\s*[—-]\s*we got it\./)).toBeVisible({ timeout: 20000 });
  25 | });
  26 | 
  27 | test("booking flow works", async ({ page }) => {
  28 |   await page.goto("/book-appointment");
  29 |   await expect(page.getByRole("heading", { name: "Reserve a real discovery slot." })).toBeVisible();
  30 |   await page.waitForLoadState("networkidle");
  31 | 
  32 |   const uniqueSeed = Date.now();
  33 |   const bookingDate = new Date(Date.now() + (8 + (uniqueSeed % 14)) * 24 * 60 * 60 * 1000);
  34 |   const dateValue = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, "0")}-${String(bookingDate.getDate()).padStart(2, "0")}`;
  35 |   const timeValue = `${String(10 + (uniqueSeed % 8)).padStart(2, "0")}:${uniqueSeed % 2 === 0 ? "00" : "30"}`;
  36 |   const submitButton = page.getByRole("button", { name: /Reserve slot|Saving/ });
  37 | 
  38 |   for (let attempt = 0; attempt < 2; attempt += 1) {
  39 |     await page.locator('input[name="visitor_name"]').fill("Test Booker");
  40 |     await page.locator('input[name="visitor_email"]').fill(`booker+${uniqueSeed}@example.com`);
  41 |     await page.locator('select[name="service_interested_in"]').selectOption({ index: 1 });
  42 |     await setNativeInputValue(page.locator('input[type="date"]'), dateValue);
  43 |     await expect(page.locator('input[type="date"]')).toHaveValue(dateValue);
  44 |     await setNativeInputValue(page.locator('input[type="time"]'), timeValue);
  45 |     await expect(page.locator('input[type="time"]')).toHaveValue(timeValue);
  46 |     await page.locator('textarea[name="notes"]').fill("Website relaunch and conversion improvements.");
  47 | 
  48 |     if (await submitButton.isEnabled()) {
  49 |       break;
  50 |     }
  51 | 
  52 |     await page.waitForLoadState("networkidle");
  53 |   }
  54 | 
  55 |   await expect(submitButton).toBeEnabled({ timeout: 15000 });
  56 |   await submitButton.click();
  57 |   await expect(page.getByRole("heading", { name: "Slot requested." })).toBeVisible({ timeout: 20000 });
  58 | });
  59 | 
  60 | test("live chat queue request works", async ({ page }) => {
  61 |   await page.goto("/live-chat");
  62 |   await expect(page.getByRole("heading", { name: "Start a real support handoff." })).toBeVisible();
  63 |   await page.waitForLoadState("networkidle");
  64 |   await page.getByLabel("Topic *").fill("Need urgent pricing help");
  65 |   await page.getByLabel("Context").fill("Need a response before tomorrow's client meeting.");
  66 |   const responsePromise = page.waitForResponse(
  67 |     (response) => response.url().includes("/api/v1/chat/start") && response.request().method() === "POST",
  68 |     { timeout: 20000 }
  69 |   );
  70 |   await page.getByRole("button", { name: "Start live chat" }).click();
> 71 |   await expect.poll(async () => (await responsePromise).status()).toBe(200);
     |   ^ Error: Timeout 10000ms exceeded while waiting on the predicate
  72 |   await expect(page.getByRole("heading", { name: "Request queued." })).toBeVisible({ timeout: 20000 });
  73 | });
```