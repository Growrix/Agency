import { expect, test } from "@playwright/test";

async function postWithRetry<T>(execute: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await execute();
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1) {
        break;
      }
    }
  }
  throw lastError;
}

test("contact inquiry flow works", async ({ page, request }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "The fastest way to start the right conversation." })).toBeVisible();
  const uniqueSeed = Date.now();
  const response = await request.post("/api/v1/contact", {
    headers: {
      "x-forwarded-for": `203.0.113.${(uniqueSeed % 200) + 1}`,
    },
    data: {
      name: "Test Contact",
      email: `contact+${uniqueSeed}@example.com`,
      service: "Premium custom website",
      budget: "$1k - $3k",
      urgency: "Within 30 days",
      message: "Need a premium website launch in the next month.",
      source: "contact_page",
    },
  });
  expect(response.ok()).toBeTruthy();
});

test("booking flow works", async ({ page, request }) => {
  await page.goto("/book-appointment", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Reserve a real discovery slot." })).toBeVisible();
  const uniqueSeed = Date.now();
  const bookingDate = new Date(Date.now() + (14 + (uniqueSeed % 60)) * 24 * 60 * 60 * 1000);
  const response = await postWithRetry(() => request.post("/api/v1/appointments", {
    data: {
      visitor_name: "Test Booker",
      visitor_email: `booker+${uniqueSeed}@example.com`,
      visitor_phone: "",
      service_interested_in: "Premium custom website",
      preferred_datetime: bookingDate.toISOString(),
      timezone: "UTC",
      notes: "Website relaunch and conversion improvements.",
      source: "booking_page",
    },
  }));
  expect(response.ok()).toBeTruthy();
});

test("live chat queue request works", async ({ page, request }) => {
  await page.goto("/live-chat", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Start a real support handoff." })).toBeVisible();
  const uniqueSeed = Date.now();
  const response = await postWithRetry(() => request.post("/api/v1/chat/start", {
    headers: {
      "x-forwarded-for": `198.51.100.${(uniqueSeed % 200) + 1}`,
    },
    data: {
      topic: "Need urgent pricing help",
      context: "Need a response before tomorrow's client meeting.",
    },
  }));
  expect(response.ok()).toBeTruthy();
});