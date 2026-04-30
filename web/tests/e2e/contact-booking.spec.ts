import { expect, test } from "@playwright/test";

test("contact inquiry flow works", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const uniqueSeed = Date.now();
  await page.getByLabel("Name").fill("Test Contact");
  await page.getByLabel("Email").fill(`contact+${uniqueSeed}@example.com`);
  await page.getByLabel("Service interest").selectOption({ label: "Premium custom website" });
  await page.getByLabel("Budget band").selectOption({ index: 1 });
  await page.getByLabel("Urgency").selectOption({ index: 1 });
  await page.getByLabel("Project summary").fill("Need a premium website launch in the next month.");
  const submitInquiryButton = page.getByRole("button", { name: "Send inquiry" });
  await expect(submitInquiryButton).toBeEnabled();
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/v1/contact") && response.request().method() === "POST",
    { timeout: 20000 }
  );
  await submitInquiryButton.click();
  await expect.poll(async () => (await responsePromise).status()).toBe(200);
  await expect(page.getByRole("heading", { name: /Thanks\s*[—-]\s*we got it\./ })).toBeVisible({ timeout: 20000 });
});

test("booking flow works", async ({ page }) => {
  await page.goto("/book-appointment", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Reserve a real discovery slot." })).toBeVisible();

  const uniqueSeed = Date.now();
  const bookingDate = new Date(Date.now() + (8 + (uniqueSeed % 14)) * 24 * 60 * 60 * 1000);
  const dateValue = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, "0")}-${String(bookingDate.getDate()).padStart(2, "0")}`;
  const timeValue = `${String(10 + (uniqueSeed % 8)).padStart(2, "0")}:${uniqueSeed % 2 === 0 ? "00" : "30"}`;
  const submitButton = page.getByRole("button", { name: /Reserve slot|Saving/ });
  await page.locator('input[name="visitor_name"]').fill("Test Booker");
  await page.locator('input[name="visitor_email"]').fill(`booker+${uniqueSeed}@example.com`);
  await page.locator('select[name="service_interested_in"]').selectOption({ index: 1 });
  await page.locator('input[type="date"]').fill(dateValue);
  await expect(page.locator('input[type="date"]')).toHaveValue(dateValue);
  await page.locator('input[type="time"]').fill(timeValue);
  await expect(page.locator('input[type="time"]')).toHaveValue(timeValue);
  await page.locator('textarea[name="notes"]').fill("Website relaunch and conversion improvements.");

  await expect(submitButton).toBeEnabled({ timeout: 20000 });
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/v1/appointments") && response.request().method() === "POST",
    { timeout: 20000 }
  );
  await submitButton.click();
  await expect.poll(async () => (await responsePromise).status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Slot requested." })).toBeVisible({ timeout: 20000 });
});

test("live chat queue request works", async ({ page }) => {
  await page.goto("/live-chat", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Start a real support handoff." })).toBeVisible();
  await page.getByLabel("Topic *").fill("Need urgent pricing help");
  await page.getByLabel("Context").fill("Need a response before tomorrow's client meeting.");
  const startChatButton = page.getByRole("button", { name: "Start live chat" });
  await expect(startChatButton).toBeEnabled();
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/v1/chat/start") && response.request().method() === "POST",
    { timeout: 20000 }
  );
  await startChatButton.click();
  await expect.poll(async () => (await responsePromise).status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Request queued." })).toBeVisible({ timeout: 20000 });
});