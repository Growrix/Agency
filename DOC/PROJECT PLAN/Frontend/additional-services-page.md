---
document_type: page-plan
page_id: additional-services
route: /additional-services
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
  - services-page.md
---

# Additional Services Page

## Page Definition
- Route: `/additional-services`
- Purpose: dedicated landing page for the agency's one-time setup and configuration services—SEO & Visibility, Tracking & Analytics, and Technical SEO—presented as complementary to the primary development offers.
- Target audience: existing or prospective clients who need a strong technical foundation (search indexing, analytics, schema, Core Web Vitals) without a full custom development engagement.
- Primary CTA: Book Appointment.
- Secondary CTA: Custom Collaboration (WhatsApp).
- Parent surface: Services. Linked from the Services nav dropdown, Services overview page, and all page-level AdditionalServices section CTAs on the homepage and services page.

## Sections In Visual Order

### 1. Hero
- Badge: "Additional Services"
- Headline: "Get discovered, tracked, and optimized from day one."
- Subheadline: "Beyond development, we offer essential one-time setup services to give your product a strong technical foundation—search visibility, analytics, and SEO configuration handled right from the start."
- CTAs: Book Appointment (primary), WhatsApp (secondary).
- Visual treatment: bg-grid overlay, teal glow pulse, left-aligned on desktop.

### 2. Category Cards Grid
- Three cards in a 3-column desktop / 1-column mobile grid.
- Each card: icon (Heroicon), title, optional badge (e.g. "One-Time Services"), horizontal rule divider, checklist of service items (CheckCircleIcon + text).
- **Category 1 — SEO & Visibility Setup** (badge: "One-Time Services"):
  - Google Search Console setup & Google Indexing
  - Sitemap & robots.txt configuration
  - On-page SEO fundamentals (meta tags, titles, descriptions)
  - Technical SEO audits and fixes
  - Page speed and performance optimization
- **Category 2 — Tracking & Analytics**:
  - Meta Pixel (Facebook Pixel) setup
  - Google Analytics integration
  - Conversion tracking and event configuration
- **Category 3 — Technical SEO**:
  - Structured data (schema markup)
  - URL structure optimization
  - Core Web Vitals improvements
  - Indexing and crawlability fixes

### 3. Why It Matters (Value Proposition Strip)
- Four inline stat/value bullets explaining why these configurations matter: discoverability, data-driven decisions, indexing speed, conversion baseline.
- Layout: 4-column grid on desktop, 2-column on tablet, 1-column on mobile.
- Each: icon + short headline + one sentence description.

### 4. Delivery Model
- "How We Handle It" section explaining the one-time nature of the work.
- Two-column inset panel (similar to the Template Purchase & Customization panel on the homepage):
  - Left: What's included (audit + setup + handoff docs + verification).
  - Right: What's not in scope (ongoing monthly SEO retainers, paid ad management, content creation).
- Footer note: custom collaboration availability.

### 5. Process Steps
- Reuse `<ProcessSteps>` component with a 4-step variant specific to this service:
  1. Audit — we review the current state of your site's technical setup.
  2. Configuration — we implement the missing or broken settings.
  3. Verification — we confirm indexing, tracking events, and performance metrics.
  4. Handoff — full documentation so you own and understand every setting.

### 6. Frequently Asked Questions
- Minimum 4 entries:
  - "Do I need these services if you already built my website?" — Yes, many builds ship without these critical post-launch configurations. We recommend them regardless of who built the site.
  - "Are these really one-time?" — Mostly yes. The initial setup is one-time. Ongoing SEO strategy and content work are separate.
  - "What's the timeline?" — Most configurations complete in 3–7 business days after a brief audit. Larger audit-heavy engagements run 1–2 weeks.
  - "Can you do this alongside an ongoing build?" — Yes. We often run these configurations in parallel with website and SaaS delivery.

### 7. CTA Band
- Title: "Ready to set a strong technical foundation?"
- Description: "One-time configurations that pay for themselves. Book a quick discovery call or message us on WhatsApp."
- Primary: Book Appointment → /book-appointment
- Secondary: WhatsApp → WHATSAPP_HREF

## State Requirements
- Static page — no server-side data requirements.
- All content is hardcoded from page-level constants; no CMS dependency.

## Responsive Adaptation
- Desktop: 3-column category grid, 4-column value strip, side-by-side delivery panels.
- Tablet: 2-column category grid, 2-column value strip.
- Mobile: single-column stacked layout, full-width cards with generous padding, tap-safe CTA sizing.

## SEO and Metadata
- Title: "Additional Services | SEO Setup, Analytics & Technical Optimization"
- Description: "One-time SEO and analytics setup services: Google Search Console, Meta Pixel, GA4, structured data, Core Web Vitals, and more. Get your product found from day one."

## Conversion Path
- Homepage Additional Services section CTA → /additional-services
- Services page Additional Services section CTA → /additional-services
- Services nav dropdown → Additional Services → /additional-services
- Page → Book Appointment or WhatsApp → booking or chat

## Navigation Placement
- Nav dropdown: add "Additional Services" as a fifth child under the Services dropdown.
- Footer nav: add under the Services column.
- AdditionalServices shared component: add a "See full additional services" CTA link pointing to /additional-services.
