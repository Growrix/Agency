---
document_type: page-plan
page_id: home
route: /
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Home Page

## Page Definition
- Purpose: turn first-time visitors into qualified leads, product buyers, or chat-assisted prospects.
- Target audience: founders, operators, agencies, and growth teams seeking premium websites, SaaS applications, mobile app launch systems, and ready-to-buy website products.
- Primary CTA: Book Appointment.
- Secondary CTA: Explore Portfolio.

## Sections In Visual Order

### 1. Utility Ribbon
- Content: fast-trust items, average response time, WhatsApp shortcut, and limited-time product bundle notice.
- Components: utility strip, badge, link buttons.
- Interaction notes: sticky after slight scroll on desktop, condensed on mobile.

### 2. Header and Mega Navigation
- Content: logo, service categories, shop, portfolio, pricing, AI concierge, booking CTA, cart, chat.
- Components: header, mega menu, icon buttons.
- State requirements: default, scrolled, menu open, mobile drawer open.

### 3. Hero Statement and Proof Deck
- Content: bold headline prioritizing premium websites, SaaS applications, mobile app launch experiences, and ready websites, plus supporting copy that keeps MCP servers and automation as secondary capabilities.
- Components: hero section, stat blocks, proof badges, media panel.
- Interaction notes: subtle panel parallax and CTA hover; reduced-motion version keeps static layering.
- Responsive notes: mobile stacks proof below CTA, keeps one visible media mockup plus swipe gallery.

### 4. Capability Rail
- Content: four service pillars with websites and SaaS positioned first, while MCP servers and automation are framed as secondary support capabilities.
- Components: feature cards, icon badges.
- Interaction notes: hover reveals delivery angle and typical outcome.

### 5. Featured Builds and Outcomes
- Content: selected case studies weighted toward websites, SaaS applications, mobile launch work, and ready-to-deploy website systems.
- Components: portfolio tiles, metric strips, testimonial quote.
- State requirements: loaded, loading skeleton, empty fallback if no featured work.

### 6. Blog and Insights Section
- Content: featured articles, operator playbooks, architecture notes, and direct links into the blog hub.
- Components: article cards, tag badges, eyebrow label, section CTA.
- Interaction notes: featured article can use larger layout treatment; supporting cards should remain scannable on mobile.

### 7. Shop Spotlight
- Content: website templates and ready websites only, with pricing language aligned to the new ranges: templates from $500 to $10k and ready websites from $1k to $15k.
- Components: product tiles (4-col grid on desktop), price chips, category label, tag badge, direct link to product detail page.
- Interaction notes: each product card links directly to its `/shop/[slug]` detail page. Section CTA links to `/shop`.

### 8. Process and Collaboration Model
- Content: discovery, strategy, design system, build, QA, launch, optimization.
- Components: step indicator, content blocks, timeline strip.
- Interaction notes: step hover highlights outputs and cadence.

### 9. AI Concierge and Live Chat Section
- Content: prompt suggestions, assistant capabilities, privacy note, escalation to WhatsApp or booking.
- Components: chat widget preview, prompt chips, action bar.
- State requirements: online, loading, fallback to live or WhatsApp.

### 10. Pricing and Engagement Snapshot
- Content: starting ranges for website templates, ready websites, custom SaaS work, and mobile app launch systems, plus flexible-payment messaging, delivery-first international option for the first 100 clients, and 1 year of free support and maintenance.
- Components: pricing tiers, comparison rows, CTA block.
- Interaction notes: monthly and project toggle if needed.

### 11. Testimonial and Credibility Strip
- Content: client logos, live Google review feed, shipping principles, tech stack badges.
- Components: marquee, Google review cards, leave-review CTA, badges.

### 12. Final Conversion Band
- Content: booking CTA, WhatsApp CTA, and chat CTA with expectation setting.
- Components: CTA section, dual buttons, reassurance list.

### 13. Footer
- Content: deep links, support, legal, social, response-time promise.
- Components: footer, menu groups, small badges.

## State Requirements
- Home hero media loads with skeleton frames.
- Featured work and shop cards handle empty and loading states.
- AI section supports online, offline, and handoff states.

## Responsive Adaptation
- Desktop uses split hero with layered panels.
- Tablet keeps two-column hero but compresses stats into a swipe row.
- Mobile uses a single-column hero, sticky bottom dock, swipeable proofs, and sheet-based quick previews.

## SEO and Metadata
- Title: Premium Websites, SaaS Applications, Ready Websites, and Mobile App Launch Systems.
- Description: Premium web development agency focused on websites, SaaS applications, mobile app launch systems, and ready-to-buy website products, with MCP and automation as secondary services.

## Conversion Path
- Primary path: Hero -> Featured builds -> Process -> Booking.
- Secondary path: Hero -> Blog and insights -> Blog detail -> Booking.
- Secondary path: Hero -> Shop spotlight -> Product detail -> Checkout.
- Assisted path: AI concierge -> WhatsApp or booking.