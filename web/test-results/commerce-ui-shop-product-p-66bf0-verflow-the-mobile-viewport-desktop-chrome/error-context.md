# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-ui.spec.ts >> shop product pages do not overflow the mobile viewport
- Location: tests\e2e\commerce-ui.spec.ts:28:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:5000/shop/mobile-app-landing-pack", waiting until "load"

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
        - button "Toggle theme" [ref=e39]:
          - img [ref=e40]
        - link "Book Appointment" [ref=e42] [cursor=pointer]:
          - /url: /book-appointment
  - main [ref=e43]:
    - generic [ref=e45]:
      - link "Back to shop" [ref=e46] [cursor=pointer]:
        - /url: /shop
        - img [ref=e47]
        - text: Back to shop
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e52]:
            - generic [ref=e57]: Preview environment
            - generic [ref=e72]:
              - paragraph [ref=e74]: Launch layout
              - generic [ref=e80]:
                - generic [ref=e81]:
                  - paragraph [ref=e82]: Layouts
                  - paragraph [ref=e83]: "11"
                - generic [ref=e84]:
                  - paragraph [ref=e85]: CTA modes
                  - paragraph [ref=e86]: "08"
                - generic [ref=e87]:
                  - paragraph [ref=e88]: Tuned breakpoints
                  - paragraph [ref=e89]: "06"
          - generic [ref=e90]:
            - heading "About this product" [level=2] [ref=e91]
            - paragraph [ref=e92]: A ready website for mobile app launches with app-store panels, feature storytelling, and device-first sections.
            - paragraph [ref=e93]: Useful when the product is mobile-first and the launch site needs to ship with the app instead of weeks later.
          - generic [ref=e94]:
            - heading "At a glance" [level=2] [ref=e95]
            - generic [ref=e96]:
              - generic [ref=e97]:
                - paragraph [ref=e98]: Layouts
                - paragraph [ref=e99]: "11"
              - generic [ref=e100]:
                - paragraph [ref=e101]: Breakpoints tuned
                - paragraph [ref=e102]: "6"
              - generic [ref=e103]:
                - paragraph [ref=e104]: CTA variants
                - paragraph [ref=e105]: "8"
          - generic [ref=e106]:
            - heading "What's included" [level=2] [ref=e107]
            - list [ref=e108]:
              - listitem [ref=e109]:
                - img [ref=e110]
                - text: Hero + feature strips
              - listitem [ref=e112]:
                - img [ref=e113]
                - text: Device showcase layouts
              - listitem [ref=e115]:
                - img [ref=e116]
                - text: Download CTA modules
              - listitem [ref=e118]:
                - img [ref=e119]
                - text: Pricing + FAQ sections
              - listitem [ref=e121]:
                - img [ref=e122]
                - text: 12 months support + maintenance
              - listitem [ref=e124]:
                - img [ref=e125]
                - text: Social proof variants
          - generic [ref=e127]:
            - heading "Stack" [level=2] [ref=e128]
            - generic [ref=e129]:
              - generic [ref=e130]: Next.js
              - generic [ref=e131]: Responsive UI
              - generic [ref=e132]: Mobile-first sections
        - complementary [ref=e133]:
          - generic [ref=e134]:
            - paragraph [ref=e135]: Ready Websites · Launch Website
            - heading "Mobile App Landing Pack" [level=1] [ref=e136]
          - generic [ref=e137]:
            - generic "4.7 out of 5" [ref=e138]:
              - img [ref=e139]
              - img [ref=e141]
              - img [ref=e143]
              - img [ref=e145]
              - img [ref=e147]
            - generic [ref=e149]: "4.7"
            - generic [ref=e150]: (980 reviews)
            - generic [ref=e151]: ·
            - generic [ref=e152]: 174 sales
          - paragraph [ref=e153]: $1,950
          - generic [ref=e154]:
            - link "Start Purchase" [ref=e155] [cursor=pointer]:
              - /url: /checkout?product=mobile-app-landing-pack
              - img [ref=e156]
              - text: Start Purchase
            - link "Live Preview" [ref=e158] [cursor=pointer]:
              - /url: /shop/mobile-app-landing-pack#preview
              - text: Live Preview
              - img [ref=e159]
          - separator [ref=e161]
          - generic [ref=e162]:
            - generic [ref=e163]:
              - term [ref=e164]: Category
              - definition [ref=e165]: Ready Websites
            - generic [ref=e166]:
              - term [ref=e167]: Type
              - definition [ref=e168]: Launch Website
            - generic [ref=e169]:
              - term [ref=e170]: Industry
              - definition [ref=e171]: Mobile Apps
            - generic [ref=e172]:
              - term [ref=e173]: Layouts
              - definition [ref=e174]: "11"
            - generic [ref=e175]:
              - term [ref=e176]: Breakpoints tuned
              - definition [ref=e177]: "6"
          - separator [ref=e178]
          - generic [ref=e179]:
            - paragraph [ref=e180]: Ideal for
            - paragraph [ref=e181]: Mobile app launches, consumer SaaS, founders shipping MVPs
          - link "Need flexible payment or a custom fit? Talk to us first" [ref=e183] [cursor=pointer]:
            - /url: /book-appointment
    - generic [ref=e185]:
      - heading "More in the catalog" [level=2] [ref=e186]
      - paragraph [ref=e187]: Browse more website templates and ready websites.
      - generic [ref=e188]:
        - generic [ref=e189]:
          - generic [ref=e190]:
            - img "Designer workspace with laptop and visual design tools for a premium website template." [ref=e191]
            - generic [ref=e192]: Best seller
          - generic [ref=e193]:
            - paragraph [ref=e194]: Templates · Marketing Site
            - heading "Atelier Marketing Theme" [level=3] [ref=e195]
            - paragraph [ref=e196]: $790
            - generic [ref=e197]:
              - generic "4.8 out of 5 stars" [ref=e198]:
                - img [ref=e199]
                - img [ref=e201]
                - img [ref=e203]
                - img [ref=e205]
                - img [ref=e207]
              - generic [ref=e209]: "4.8"
              - generic [ref=e210]: (3.2K)
              - generic [ref=e211]: ·
              - generic [ref=e212]: 412 sales
            - generic [ref=e213]:
              - link "Add Atelier Marketing Theme to cart" [ref=e214] [cursor=pointer]:
                - /url: /checkout?product=atelier-marketing-theme
                - img [ref=e215]
              - link "Live Preview" [ref=e217] [cursor=pointer]:
                - /url: /shop/atelier-marketing-theme
                - text: Live Preview
                - img [ref=e218]
        - generic [ref=e220]:
          - generic [ref=e221]:
            - img "Product-focused interface representing a SaaS dashboard and onboarding flow." [ref=e222]
            - generic [ref=e223]: Updated
          - generic [ref=e224]:
            - paragraph [ref=e225]: Templates · Dashboard Website
            - heading "Operator Dashboard Kit" [level=3] [ref=e226]
            - paragraph [ref=e227]: $1,850
            - generic [ref=e228]:
              - generic "4.6 out of 5 stars" [ref=e229]:
                - img [ref=e230]
                - img [ref=e232]
                - img [ref=e234]
                - img [ref=e236]
                - img [ref=e238]
              - generic [ref=e240]: "4.6"
              - generic [ref=e241]: (1.4K)
              - generic [ref=e242]: ·
              - generic [ref=e243]: 238 sales
            - generic [ref=e244]:
              - link "Add Operator Dashboard Kit to cart" [ref=e245] [cursor=pointer]:
                - /url: /checkout?product=operator-dashboard-kit
                - img [ref=e246]
              - link "Live Preview" [ref=e248] [cursor=pointer]:
                - /url: /shop/operator-dashboard-kit
                - text: Live Preview
                - img [ref=e249]
        - generic [ref=e251]:
          - generic [ref=e252]:
            - img "Team planning a launch-ready service website with booking and payments." [ref=e253]
            - generic [ref=e254]: Bundle
          - generic [ref=e255]:
            - paragraph [ref=e256]: Ready Websites · Booking Website
            - heading "Booking + Stripe Bundle" [level=3] [ref=e257]
            - paragraph [ref=e258]: $3,900
            - generic [ref=e259]:
              - generic "4.9 out of 5 stars" [ref=e260]:
                - img [ref=e261]
                - img [ref=e263]
                - img [ref=e265]
                - img [ref=e267]
                - img [ref=e269]
              - generic [ref=e271]: "4.9"
              - generic [ref=e272]: (2.1K)
              - generic [ref=e273]: ·
              - generic [ref=e274]: 307 sales
            - generic [ref=e275]:
              - link "Add Booking + Stripe Bundle to cart" [ref=e276] [cursor=pointer]:
                - /url: /checkout?product=booking-stripe-bundle
                - img [ref=e277]
              - link "Live Preview" [ref=e279] [cursor=pointer]:
                - /url: /shop/booking-stripe-bundle
                - text: Live Preview
                - img [ref=e280]
  - contentinfo [ref=e282]:
    - generic [ref=e283]:
      - generic [ref=e284]:
        - generic [ref=e285]:
          - link "Growrix logo" [ref=e286] [cursor=pointer]:
            - /url: /
            - img "Growrix logo" [ref=e287]
          - paragraph [ref=e288]: A product-minded studio building SaaS applications, websites, MCP servers, and automation systems for ambitious teams.
          - paragraph [ref=e289]: Average response time
          - paragraph [ref=e290]: Under 2 business hours
        - generic [ref=e291]:
          - heading "Services" [level=3] [ref=e292]
          - list [ref=e293]:
            - listitem [ref=e294]:
              - link "SaaS Applications" [ref=e295] [cursor=pointer]:
                - /url: /services/saas-applications
            - listitem [ref=e296]:
              - link "Websites" [ref=e297] [cursor=pointer]:
                - /url: /services/websites
            - listitem [ref=e298]:
              - link "MCP Servers" [ref=e299] [cursor=pointer]:
                - /url: /services/mcp-servers
            - listitem [ref=e300]:
              - link "Automation" [ref=e301] [cursor=pointer]:
                - /url: /services/automation
        - generic [ref=e302]:
          - heading "Shop" [level=3] [ref=e303]
          - list [ref=e304]:
            - listitem [ref=e305]:
              - link "Templates" [ref=e306] [cursor=pointer]:
                - /url: /shop?category=templates
            - listitem [ref=e307]:
              - link "Ready Websites" [ref=e308] [cursor=pointer]:
                - /url: /shop?category=ready-websites
            - listitem [ref=e309]:
              - link "B2B SaaS" [ref=e310] [cursor=pointer]:
                - /url: /shop?industry=b2b-saas
            - listitem [ref=e311]:
              - link "Mobile Apps" [ref=e312] [cursor=pointer]:
                - /url: /shop?industry=mobile-apps
            - listitem [ref=e313]:
              - link "Service Businesses" [ref=e314] [cursor=pointer]:
                - /url: /shop?industry=service-businesses
        - generic [ref=e315]:
          - heading "Company" [level=3] [ref=e316]
          - list [ref=e317]:
            - listitem [ref=e318]:
              - link "About" [ref=e319] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e320]:
              - link "Portfolio" [ref=e321] [cursor=pointer]:
                - /url: /portfolio
            - listitem [ref=e322]:
              - link "Pricing" [ref=e323] [cursor=pointer]:
                - /url: /pricing
            - listitem [ref=e324]:
              - link "Blog" [ref=e325] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e326]:
              - link "Contact" [ref=e327] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e328]:
          - heading "Support" [level=3] [ref=e329]
          - list [ref=e330]:
            - listitem [ref=e331]:
              - link "FAQ" [ref=e332] [cursor=pointer]:
                - /url: /faq
            - listitem [ref=e333]:
              - link "AI Growrix OS" [ref=e334] [cursor=pointer]:
                - /url: /ai-concierge
            - listitem [ref=e335]:
              - link "Book Appointment" [ref=e336] [cursor=pointer]:
                - /url: /book-appointment
            - listitem [ref=e337]:
              - link "WhatsApp" [ref=e338] [cursor=pointer]:
                - /url: https://wa.me/8801986925425
        - generic [ref=e339]:
          - heading "Legal" [level=3] [ref=e340]
          - list [ref=e341]:
            - listitem [ref=e342]:
              - link "Privacy Policy" [ref=e343] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e344]:
              - link "Terms of Service" [ref=e345] [cursor=pointer]:
                - /url: /terms-of-service
      - generic [ref=e346]:
        - paragraph [ref=e347]: © 2026 Growrix OS. All rights reserved.
        - paragraph [ref=e348]: Built deliberately. Shipped with care.
  - button "Open concierge chat" [ref=e350]:
    - img [ref=e352]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("checkout placeholders remain visible", async ({ page }) => {
  4  |   await page.goto("/checkout?product=atelier-marketing-theme");
  5  | 
  6  |   const nameField = page.locator('input[name="customer_name"]');
  7  |   const emailField = page.locator('input[name="customer_email"]');
  8  | 
  9  |   await expect(nameField).toBeVisible();
  10 |   await expect(emailField).toBeVisible();
  11 | 
  12 |   const namePlaceholder = await nameField.evaluate((node) => ({
  13 |     color: getComputedStyle(node, "::placeholder").color,
  14 |     opacity: getComputedStyle(node, "::placeholder").opacity,
  15 |   }));
  16 | 
  17 |   const emailPlaceholder = await emailField.evaluate((node) => ({
  18 |     color: getComputedStyle(node, "::placeholder").color,
  19 |     opacity: getComputedStyle(node, "::placeholder").opacity,
  20 |   }));
  21 | 
  22 |   expect(namePlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  23 |   expect(emailPlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  24 |   expect(Number(namePlaceholder.opacity || "0")).toBeGreaterThan(0.9);
  25 |   expect(Number(emailPlaceholder.opacity || "0")).toBeGreaterThan(0.9);
  26 | });
  27 | 
  28 | test("shop product pages do not overflow the mobile viewport", async ({ page }) => {
  29 |   for (const slug of ["atelier-marketing-theme", "mobile-app-landing-pack", "booking-stripe-bundle"]) {
> 30 |     await page.goto(`/shop/${slug}`);
     |                ^ Error: page.goto: Test timeout of 45000ms exceeded.
  31 |     await page.waitForLoadState("networkidle");
  32 | 
  33 |     const viewport = page.viewportSize();
  34 |     const dimensions = await page.evaluate(() => ({
  35 |       clientWidth: document.documentElement.clientWidth,
  36 |       scrollWidth: document.documentElement.scrollWidth,
  37 |     }));
  38 | 
  39 |     expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  40 | 
  41 |     const sidebarButton = page.getByRole("link", { name: /Talk to us first/i });
  42 |     await expect(sidebarButton).toBeVisible();
  43 | 
  44 |     const buttonBox = await sidebarButton.boundingBox();
  45 |     expect(buttonBox).not.toBeNull();
  46 |     expect((buttonBox?.x ?? 0) + (buttonBox?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? dimensions.clientWidth) + 1);
  47 |   }
  48 | });
```