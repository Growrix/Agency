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
  await expect(page.getByText(/Thanks\s*[—-]\s*we got it\./)).toBeVisible();
});

test("booking flow works", async ({ page }) => {
  await page.goto("/book-appointment");
  await page.locator('input[name="visitor_name"]').fill("Test Booker");
  await page.locator('input[name="visitor_email"]').fill("booker@example.com");
  await page.locator('select[name="service_interested_in"]').selectOption({ index: 1 });
  const bookingDate = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000);
  const dateValue = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, "0")}-${String(bookingDate.getDate()).padStart(2, "0")}`;
  await page.locator('input[type="date"]').fill(dateValue);
  await page.locator('input[type="time"]').fill("14:00");
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