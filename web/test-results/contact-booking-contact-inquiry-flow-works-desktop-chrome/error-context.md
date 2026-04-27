# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-booking.spec.ts >> contact inquiry flow works
- Location: tests\e2e\contact-booking.spec.ts:14:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Thanks\s*[—-]\s*we got it\./)
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText(/Thanks\s*[—-]\s*we got it\./)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: Booking discovery calls for Q2
      - generic [ref=e8]:
        - img [ref=e9]
        - text: Avg response under 2 business hours
    - generic [ref=e11]:
      - link "WhatsApp" [ref=e12] [cursor=pointer]:
        - /url: https://wa.me/8801986925425
        - img [ref=e13]
        - text: WhatsApp
      - 'link "Spring bundle: 20% off MCP starters →" [ref=e15] [cursor=pointer]':
        - /url: /shop
  - banner [ref=e16]:
    - generic [ref=e17]:
      - link "Growrix logo" [ref=e18] [cursor=pointer]:
        - /url: /
        - img "Growrix logo" [ref=e19]
      - navigation [ref=e20]:
        - link "Home" [ref=e21] [cursor=pointer]:
          - /url: /
        - button "Services" [ref=e23]:
          - text: Services
          - img [ref=e24]
        - link "Shop" [ref=e26] [cursor=pointer]:
          - /url: /shop
        - link "Portfolio" [ref=e27] [cursor=pointer]:
          - /url: /portfolio
        - link "Pricing" [ref=e28] [cursor=pointer]:
          - /url: /pricing
        - link "Blog" [ref=e29] [cursor=pointer]:
          - /url: /blog
        - link "About" [ref=e30] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e31] [cursor=pointer]:
          - /url: /contact
      - generic [ref=e32]:
        - button "Open chat" [ref=e33]:
          - img [ref=e34]
        - link "Open cart" [ref=e36] [cursor=pointer]:
          - /url: /shop
          - img [ref=e37]
        - 'button "Theme: system (light). Click to switch to dark." [ref=e39]':
          - img [ref=e41]
        - link "Book Appointment" [ref=e43] [cursor=pointer]:
          - /url: /book-appointment
  - main [ref=e44]:
    - generic [ref=e47]:
      - generic [ref=e48]: Contact
      - heading "The fastest way to start the right conversation." [level=1] [ref=e50]
      - paragraph [ref=e51]: Most inquiries here are about websites, SaaS builds, mobile app launches, and ready websites. We respond to every inquiry within 2 business hours.
      - generic [ref=e52]:
        - generic [ref=e53]:
          - img [ref=e54]
          - text: Mon–Fri · 9am–6pm CET
        - generic [ref=e56]:
          - img [ref=e57]
          - text: Conversations stay private
    - generic [ref=e60]:
      - generic [ref=e61]:
        - generic [ref=e63]: Channels
        - heading "Pick the route that fits." [level=2] [ref=e66]
      - generic [ref=e67]:
        - link "Recommended Inquiry form Best for website, SaaS, mobile app, or ready-website briefs that need clear scoping. Use the form below →" [ref=e68] [cursor=pointer]:
          - /url: "#form"
          - generic [ref=e69]:
            - generic [ref=e70]:
              - img [ref=e72]
              - generic [ref=e74]: Recommended
            - heading "Inquiry form" [level=3] [ref=e75]
            - paragraph [ref=e76]: Best for website, SaaS, mobile app, or ready-website briefs that need clear scoping.
            - paragraph [ref=e77]: Use the form below →
        - link "WhatsApp Best for fast questions about pricing, timelines, and product fit during business hours. Open WhatsApp →" [ref=e78] [cursor=pointer]:
          - /url: https://wa.me/8801986925425
          - generic [ref=e79]:
            - img [ref=e82]
            - heading "WhatsApp" [level=3] [ref=e84]
            - paragraph [ref=e85]: Best for fast questions about pricing, timelines, and product fit during business hours.
            - paragraph [ref=e86]: Open WhatsApp →
        - button "AI Growrix OS Best for instant answers about websites, ready websites, SaaS work, and launch timing. Ask AI Growrix OS →" [ref=e87]:
          - generic [ref=e88]:
            - img [ref=e91]
            - heading "AI Growrix OS" [level=3] [ref=e93]
            - paragraph [ref=e94]: Best for instant answers about websites, ready websites, SaaS work, and launch timing.
            - paragraph [ref=e95]: Ask AI Growrix OS →
        - link "Book a call Best for discovery, scoping, and decision-grade conversations around a real launch plan. Book appointment →" [ref=e96] [cursor=pointer]:
          - /url: /book-appointment
          - generic [ref=e97]:
            - img [ref=e100]
            - heading "Book a call" [level=3] [ref=e102]
            - paragraph [ref=e103]: Best for discovery, scoping, and decision-grade conversations around a real launch plan.
            - paragraph [ref=e104]: Book appointment →
    - generic [ref=e107]:
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e111]: Inquiry form
          - heading "Tell us what you want to launch." [level=2] [ref=e114]
          - paragraph [ref=e116]: Share the website, SaaS product, mobile launch, or ready-site need, plus the timeline and constraints. We'll respond with a written next step within 2 business hours.
        - generic [ref=e117]:
          - paragraph [ref=e118]: Trust note
          - paragraph [ref=e119]:
            - text: Your message is sent over HTTPS, stored securely, and only used to respond to your inquiry. Qualifying international clients can also use our delivery-first payment option. See our
            - link "privacy policy" [ref=e120] [cursor=pointer]:
              - /url: /privacy-policy
            - text: .
      - generic [ref=e123]:
        - generic [ref=e124]:
          - generic [ref=e125]:
            - generic [ref=e126]: Name *
            - textbox "Name *" [ref=e128]:
              - /placeholder: Your name
              - text: Test Contact
          - generic [ref=e129]:
            - generic [ref=e130]: Email *
            - textbox "Email *" [ref=e132]:
              - /placeholder: you@company.com
              - text: contact+1777316792915@example.com
        - generic [ref=e133]:
          - generic [ref=e134]: Company
          - textbox "Company" [ref=e136]:
            - /placeholder: Optional
        - generic [ref=e137]:
          - generic [ref=e138]: Service interest
          - combobox "Service interest" [ref=e140]:
            - option "Select one…" [disabled]
            - option "Website template"
            - option "Ready website"
            - option "Premium custom website" [selected]
            - option "SaaS application"
            - option "Mobile app launch / marketing site"
            - option "MCP Server"
            - option "Automation"
            - option "Not sure yet"
        - generic [ref=e141]:
          - generic [ref=e142]:
            - generic [ref=e143]: Budget band
            - combobox "Budget band" [ref=e145]:
              - option "Select one…" [disabled]
              - option "$500 - $1k" [selected]
              - option "$1k - $3k"
              - option "$3k - $10k"
              - option "$10k - $25k"
              - option "$25k+"
              - option "Not sure yet"
          - generic [ref=e146]:
            - generic [ref=e147]: Urgency
            - combobox "Urgency" [ref=e149]:
              - option "Select one…" [disabled]
              - option "Exploring" [selected]
              - option "Within 30 days"
              - option "Within 90 days"
              - option "ASAP"
        - generic [ref=e150]:
          - generic [ref=e151]: Project summary *
          - textbox "Project summary *" [ref=e153]:
            - /placeholder: What are you building? What problem are we solving?
            - text: Need a premium website launch in the next month.
        - generic [ref=e154]:
          - paragraph [ref=e155]: By submitting, you agree to our privacy policy.
          - button "Sending…" [disabled]
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e160]: FAQ
        - heading "Common questions before you write." [level=2] [ref=e163]
      - generic [ref=e165]:
        - button "How do projects typically start?" [ref=e167]:
          - generic [ref=e168]: How do projects typically start?
          - img [ref=e169]
        - button "What is your typical timeline?" [ref=e172]:
          - generic [ref=e173]: What is your typical timeline?
          - img [ref=e174]
        - button "Do you handle content, copy, and assets?" [ref=e177]:
          - generic [ref=e178]: Do you handle content, copy, and assets?
          - img [ref=e179]
        - button "How do payments work?" [ref=e182]:
          - generic [ref=e183]: How do payments work?
          - img [ref=e184]
  - contentinfo [ref=e186]:
    - generic [ref=e187]:
      - generic [ref=e188]:
        - generic [ref=e189]:
          - link "Growrix logo" [ref=e190] [cursor=pointer]:
            - /url: /
            - img "Growrix logo" [ref=e191]
          - paragraph [ref=e192]: A product-minded studio building SaaS applications, websites, MCP servers, and automation systems for ambitious teams.
          - paragraph [ref=e193]: Average response time
          - paragraph [ref=e194]: Under 2 business hours
        - generic [ref=e195]:
          - heading "Services" [level=3] [ref=e196]
          - list [ref=e197]:
            - listitem [ref=e198]:
              - link "SaaS Applications" [ref=e199] [cursor=pointer]:
                - /url: /services/saas-applications
            - listitem [ref=e200]:
              - link "Websites" [ref=e201] [cursor=pointer]:
                - /url: /services/websites
            - listitem [ref=e202]:
              - link "MCP Servers" [ref=e203] [cursor=pointer]:
                - /url: /services/mcp-servers
            - listitem [ref=e204]:
              - link "Automation" [ref=e205] [cursor=pointer]:
                - /url: /services/automation
        - generic [ref=e206]:
          - heading "Shop" [level=3] [ref=e207]
          - list [ref=e208]:
            - listitem [ref=e209]:
              - link "Templates" [ref=e210] [cursor=pointer]:
                - /url: /shop?category=templates
            - listitem [ref=e211]:
              - link "Ready Websites" [ref=e212] [cursor=pointer]:
                - /url: /shop?category=ready-websites
            - listitem [ref=e213]:
              - link "B2B SaaS" [ref=e214] [cursor=pointer]:
                - /url: /shop?industry=b2b-saas
            - listitem [ref=e215]:
              - link "Mobile Apps" [ref=e216] [cursor=pointer]:
                - /url: /shop?industry=mobile-apps
            - listitem [ref=e217]:
              - link "Service Businesses" [ref=e218] [cursor=pointer]:
                - /url: /shop?industry=service-businesses
        - generic [ref=e219]:
          - heading "Company" [level=3] [ref=e220]
          - list [ref=e221]:
            - listitem [ref=e222]:
              - link "About" [ref=e223] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e224]:
              - link "Portfolio" [ref=e225] [cursor=pointer]:
                - /url: /portfolio
            - listitem [ref=e226]:
              - link "Pricing" [ref=e227] [cursor=pointer]:
                - /url: /pricing
            - listitem [ref=e228]:
              - link "Blog" [ref=e229] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e230]:
              - link "Contact" [ref=e231] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e232]:
          - heading "Support" [level=3] [ref=e233]
          - list [ref=e234]:
            - listitem [ref=e235]:
              - link "FAQ" [ref=e236] [cursor=pointer]:
                - /url: /faq
            - listitem [ref=e237]:
              - link "AI Growrix OS" [ref=e238] [cursor=pointer]:
                - /url: /ai-concierge
            - listitem [ref=e239]:
              - link "Book Appointment" [ref=e240] [cursor=pointer]:
                - /url: /book-appointment
            - listitem [ref=e241]:
              - link "WhatsApp" [ref=e242] [cursor=pointer]:
                - /url: https://wa.me/8801986925425
        - generic [ref=e243]:
          - heading "Legal" [level=3] [ref=e244]
          - list [ref=e245]:
            - listitem [ref=e246]:
              - link "Privacy Policy" [ref=e247] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e248]:
              - link "Terms of Service" [ref=e249] [cursor=pointer]:
                - /url: /terms-of-service
      - generic [ref=e250]:
        - paragraph [ref=e251]: © 2026 Growrix OS. All rights reserved.
        - paragraph [ref=e252]: Built deliberately. Shipped with care.
  - button "Open concierge chat" [ref=e254]:
    - img [ref=e256]
  - button "Open Next.js Dev Tools" [ref=e263] [cursor=pointer]:
    - img [ref=e264]
  - alert [ref=e267]
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
> 24 |   await expect(page.getByText(/Thanks\s*[—-]\s*we got it\./)).toBeVisible({ timeout: 20000 });
     |                                                               ^ Error: expect(locator).toBeVisible() failed
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
  71 |   await expect.poll(async () => (await responsePromise).status()).toBe(200);
  72 |   await expect(page.getByRole("heading", { name: "Request queued." })).toBeVisible({ timeout: 20000 });
  73 | });
```