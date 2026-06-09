# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-booking.spec.ts >> contact inquiry flow works
- Location: tests\e2e\contact-booking.spec.ts:18:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:5000/contact", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | async function postWithRetry<T>(execute: () => Promise<T>, attempts = 3): Promise<T> {
  4  |   let lastError: unknown;
  5  |   for (let attempt = 0; attempt < attempts; attempt += 1) {
  6  |     try {
  7  |       return await execute();
  8  |     } catch (error) {
  9  |       lastError = error;
  10 |       if (attempt === attempts - 1) {
  11 |         break;
  12 |       }
  13 |     }
  14 |   }
  15 |   throw lastError;
  16 | }
  17 | 
  18 | test("contact inquiry flow works", async ({ page, request }) => {
> 19 |   await page.goto("/contact", { waitUntil: "domcontentloaded" });
     |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  20 |   await expect(page.getByRole("heading", { name: "The fastest way to start the right conversation." })).toBeVisible();
  21 |   const uniqueSeed = Date.now();
  22 |   const response = await request.post("/api/v1/contact", {
  23 |     headers: {
  24 |       "x-forwarded-for": `203.0.113.${(uniqueSeed % 200) + 1}`,
  25 |     },
  26 |     data: {
  27 |       name: "Test Contact",
  28 |       email: `contact+${uniqueSeed}@example.com`,
  29 |       service: "Premium custom website",
  30 |       budget: "$1k - $3k",
  31 |       urgency: "Within 30 days",
  32 |       message: "Need a premium website launch in the next month.",
  33 |       source: "contact_page",
  34 |     },
  35 |   });
  36 |   expect(response.ok()).toBeTruthy();
  37 | });
  38 | 
  39 | test("booking flow works", async ({ page, request }) => {
  40 |   await page.goto("/book-appointment", { waitUntil: "domcontentloaded" });
  41 |   await expect(page.getByRole("heading", { name: "Reserve a real discovery slot." })).toBeVisible();
  42 |   const uniqueSeed = Date.now();
  43 |   const bookingDate = new Date(Date.now() + (14 + (uniqueSeed % 60)) * 24 * 60 * 60 * 1000);
  44 |   const response = await postWithRetry(() => request.post("/api/v1/appointments", {
  45 |     data: {
  46 |       visitor_name: "Test Booker",
  47 |       visitor_email: `booker+${uniqueSeed}@example.com`,
  48 |       visitor_phone: "",
  49 |       service_interested_in: "Premium custom website",
  50 |       preferred_datetime: bookingDate.toISOString(),
  51 |       timezone: "UTC",
  52 |       notes: "Website relaunch and conversion improvements.",
  53 |       source: "booking_page",
  54 |     },
  55 |   }));
  56 |   expect(response.ok()).toBeTruthy();
  57 | });
  58 | 
  59 | test("live chat queue request works", async ({ page, request }) => {
  60 |   await page.goto("/live-chat", { waitUntil: "domcontentloaded" });
  61 |   await expect(page.getByRole("heading", { name: "Start a real support handoff." })).toBeVisible();
  62 |   const uniqueSeed = Date.now();
  63 |   const response = await postWithRetry(() => request.post("/api/v1/chat/start", {
  64 |     headers: {
  65 |       "x-forwarded-for": `198.51.100.${(uniqueSeed % 200) + 1}`,
  66 |     },
  67 |     data: {
  68 |       topic: "Need urgent pricing help",
  69 |       context: "Need a response before tomorrow's client meeting.",
  70 |     },
  71 |   }));
  72 |   expect(response.ok()).toBeTruthy();
  73 | });
```