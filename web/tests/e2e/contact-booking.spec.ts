import { expect, test, type Locator } from "@playwright/test";

async function setNativeInputValue(locator: Locator, value: string) {
  await locator.evaluate((node: HTMLInputElement, nextValue: string) => {
    const prototype = Object.getPrototypeOf(node) as HTMLInputElement;
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    node.focus();
    valueSetter?.call(node, nextValue);
    node.dispatchEvent(new Event("input", { bubbles: true }));
    node.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
}

test("contact inquiry flow works", async ({ page }) => {
  await page.goto("/contact");
  const uniqueSeed = Date.now();
  await page.getByLabel("Name").fill("Test Contact");
  await page.getByLabel("Email").fill(`contact+${uniqueSeed}@example.com`);
  await page.getByLabel("Service interest").selectOption({ label: "Premium custom website" });
  await page.getByLabel("Budget band").selectOption({ index: 1 });
  await page.getByLabel("Urgency").selectOption({ index: 1 });
  await page.getByLabel("Project summary").fill("Need a premium website launch in the next month.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText(/Thanks\s*[—-]\s*we got it\./)).toBeVisible({ timeout: 20000 });
});

test("booking flow works", async ({ page }) => {
  await page.goto("/book-appointment");
  await expect(page.getByRole("heading", { name: "Reserve a real discovery slot." })).toBeVisible();
  await page.waitForLoadState("networkidle");

  const uniqueSeed = Date.now();
  const bookingDate = new Date(Date.now() + (8 + (uniqueSeed % 14)) * 24 * 60 * 60 * 1000);
  const dateValue = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, "0")}-${String(bookingDate.getDate()).padStart(2, "0")}`;
  const timeValue = `${String(10 + (uniqueSeed % 8)).padStart(2, "0")}:${uniqueSeed % 2 === 0 ? "00" : "30"}`;
  const submitButton = page.getByRole("button", { name: /Reserve slot|Saving/ });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.locator('input[name="visitor_name"]').fill("Test Booker");
    await page.locator('input[name="visitor_email"]').fill(`booker+${uniqueSeed}@example.com`);
    await page.locator('select[name="service_interested_in"]').selectOption({ index: 1 });
    await setNativeInputValue(page.locator('input[type="date"]'), dateValue);
    await expect(page.locator('input[type="date"]')).toHaveValue(dateValue);
    await setNativeInputValue(page.locator('input[type="time"]'), timeValue);
    await expect(page.locator('input[type="time"]')).toHaveValue(timeValue);
    await page.locator('textarea[name="notes"]').fill("Website relaunch and conversion improvements.");

    if (await submitButton.isEnabled()) {
      break;
    }

    await page.waitForLoadState("networkidle");
  }

  await expect(submitButton).toBeEnabled({ timeout: 15000 });
  await submitButton.click();
  await expect(page.getByRole("heading", { name: "Slot requested." })).toBeVisible({ timeout: 20000 });
});

test("live chat queue request works", async ({ page }) => {
  await page.goto("/live-chat");
  await expect(page.getByRole("heading", { name: "Start a real support handoff." })).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Topic *").fill("Need urgent pricing help");
  await page.getByLabel("Context").fill("Need a response before tomorrow's client meeting.");
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/v1/chat/start") && response.request().method() === "POST",
    { timeout: 20000 }
  );
  await page.getByRole("button", { name: "Start live chat" }).click();
  await expect.poll(async () => (await responsePromise).status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Request queued." })).toBeVisible({ timeout: 20000 });
});