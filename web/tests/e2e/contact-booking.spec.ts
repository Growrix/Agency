import { expect, test } from "@playwright/test";

test("contact inquiry flow works", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Test Contact");
  await page.getByLabel("Email").fill("contact@example.com");
  await page.getByLabel("Service interest").selectOption({ label: "Premium custom website" });
  await page.getByLabel("Budget band").selectOption({ index: 1 });
  await page.getByLabel("Urgency").selectOption({ index: 1 });
  await page.getByLabel("Project summary").fill("Need a premium website launch in the next month.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("heading", { name: "Thanks — we got it." })).toBeVisible();
});

test("booking flow works", async ({ page }) => {
  await page.goto("/book-appointment");
  await page.locator('input[name="visitor_name"]').fill("Test Booker");
  await page.locator('input[name="visitor_email"]').fill("booker@example.com");
  await page.locator('select[name="service_interested_in"]').selectOption({ index: 1 });
  const uniqueSlot = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString();
  await page.evaluate((slotValue) => {
    const select = document.querySelector('select[name="preferred_datetime"]') as HTMLSelectElement | null;
    if (!select) return;

    const option = document.createElement("option");
    option.value = slotValue;
    option.text = `${slotValue} · 30 minute discovery call`;
    select.append(option);
    select.value = slotValue;
  }, uniqueSlot);
  await page.locator('textarea[name="notes"]').fill("Website relaunch and conversion improvements.");
  await page.getByRole("button", { name: /Reserve slot|Saving/ }).click();
  await expect(page.getByRole("heading", { name: "Slot requested." })).toBeVisible();
});

test("live chat queue request works", async ({ page }) => {
  await page.goto("/live-chat");
  await page.getByLabel("Topic *").fill("Need urgent pricing help");
  await page.getByLabel("Context").fill("Need a response before tomorrow's client meeting.");
  await page.getByRole("button", { name: "Start live chat" }).click();
  await expect(page.getByRole("heading", { name: "Request queued." })).toBeVisible();
});