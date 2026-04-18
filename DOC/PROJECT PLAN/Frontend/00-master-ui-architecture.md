---
document_type: master-architecture
scope: site-wide
build_stage: 1-architecture
recommended_next_reads:
  - ai-context.yaml
  - README.md
  - 01-design-system.md
  - 02-component-system.md
---

# Agency SaaS Website UI Architecture

## AI Consumption Guidance
- AI first-stop file for this folder: ai-context.yaml.
- Human index for this folder: README.md.
- Read this file when defining route structure, shared journeys, conversion paths, and cross-page dependencies.
- Do not read every page file before implementation; use ai-context.yaml and README.md to select only the relevant page plans.

## Product Intent
- Build a premium SaaS-style web presence for a web development agency that sells high-trust custom services and productized digital assets.
- Position the agency as a product-minded technical partner for SaaS applications, websites, Model Context Protocol (MCP) servers, and automation systems.
- Support direct conversion paths for discovery, consultation, AI-assisted qualification, WhatsApp escalation, and Stripe-powered commerce.

## Recommended Experience Direction
- Visual theme: editorial-premium meets product dashboard.
- Default mood: light-first, high-contrast, warm-neutral surfaces with controlled teal and copper accents.
- Brand personality: precise, technical, modern, calm, high-trust.
- Mobile posture: app-like, thumb-friendly, fast-scanning, persistent utility access.

## Experience Principles
- Lead with proof before complexity: show outcomes, shipped work, and product depth quickly.
- Make the agency feel operational, not just promotional: expose process, stack, delivery system, and response speed.
- Keep every conversion path visible: book, chat, WhatsApp, and buy should remain close to the user at all times.
- Let the site behave like a lightweight product: sticky utilities, live assistant, saved filters, and sheet-based mobile actions.
- Treat the shop as a serious revenue surface, not an afterthought.

## Core Journeys
- New prospect: Home -> Services -> Service Detail -> Book Appointment.
- Product buyer: Home or Shop -> Product Detail -> Checkout.
- Proof-seeking lead: Home -> Portfolio -> Case Study -> Contact or Book Appointment.
- Fast-answer visitor: Any page -> AI Chat Widget or AI Concierge -> WhatsApp or Booking.
- Mobile visitor: Landing section -> sticky bottom dock -> chat/shop/services/booking without hunting.

## Site Map

### Primary Marketing Pages
- Home
- Services Overview
- SaaS Applications Service
- Websites Service
- MCP Servers Service
- Automation Service
- Portfolio Overview
- Case Study Detail
- Pricing
- About
- Contact
- FAQ

### Commerce Pages
- Shop Overview
- Product Detail
- Checkout

### Assisted Conversion Pages
- AI Concierge
- Book Appointment

### Utility and Trust Pages
- Privacy Policy
- Terms of Service
- 404

## Global Navigation Model
- Header links: Services, Shop, Portfolio, Pricing, About, AI Concierge.
- Persistent primary CTA: Book Appointment.
- Persistent secondary utilities: Live Chat, WhatsApp, Cart.
- Footer groups: Services, Shop Categories, Portfolio, Company, Support, Legal.
- Deep-link behavior: every service card, case study teaser, and featured product routes to a detail surface.

## Mobile Navigation Model
- Bottom dock items: Home, Services, Shop, Portfolio, Chat.
- Sticky mobile action bar: Book, WhatsApp, Cart.
- Drawer menu for secondary pages: Pricing, About, Contact, FAQ, Legal.
- Mobile filters, cart, and chat use bottom sheets instead of full-page interruptions where possible.

## Shared Conversion Infrastructure
- AI chat widget pinned globally with contextual prompts per page.
- Live chat entry for high-intent pages and support pages.
- WhatsApp CTA in header utility, mobile sticky action, AI fallback, and contact surfaces.
- Booking flow connected from hero sections, service pages, pricing, and AI escalation.
- Stripe checkout for template, ready-site, mobile app, and packaged MCP product purchases.

## Frontend Visual Strategy
- Hero sections combine editorial typography with product-like panels, motion traces, and code or workflow previews.
- Surfaces should feel layered: paper base, frosted panels, inset data wells, and elevated CTA cards.
- Imagery should mix shipped UI screenshots, technical workflow diagrams, and device mockups rather than generic stock photos.
- Repeating visual motif: blueprint lines, subtle grid overlays, and animated signal paths that imply systems integration.

## Layout System
- Desktop: 12-column grid, 72px outer margins on wide screens, 24px gutters.
- Tablet: 8-column grid, stacked content blocks, preserved proof modules.
- Mobile: single-column flow with sectional card grouping and sticky utilities.
- Max content widths: 1440px marketing shell, 1200px reading shell, 960px dense detail shell.

## Page Inventory

### Home
- Goal: explain offer fast, establish proof, and route users into service, portfolio, shop, or booking journeys.
- Primary CTA: Book Appointment.
- Secondary CTA: Explore Portfolio.

### Services Overview
- Goal: show the complete capability map and help users self-select the right engagement.
- Primary CTA: Discuss My Project.
- Secondary CTA: Compare Services.

### SaaS Applications Service
- Goal: sell product strategy plus engineering execution for startup and enterprise SaaS builds.
- Primary CTA: Start a SaaS Build.
- Secondary CTA: See SaaS Work.

### Websites Service
- Goal: position the agency as a high-conversion, design-forward website partner.
- Primary CTA: Plan My Website.
- Secondary CTA: View Website Portfolio.

### MCP Servers Service
- Goal: explain MCP value clearly and convert technical buyers who need integrations or agent tooling.
- Primary CTA: Scope an MCP Server.
- Secondary CTA: Browse MCP Products.

### Automation Service
- Goal: show automation as measurable operational leverage rather than abstract consulting.
- Primary CTA: Audit My Workflow.
- Secondary CTA: View Automation Examples.

### Shop Overview
- Goal: sell reusable digital products and make category discovery effortless.
- Primary CTA: Browse Products.
- Secondary CTA: View Bundles.

### Product Detail
- Goal: convert product interest into checkout with clear previews, specs, and trust.
- Primary CTA: Buy Now.
- Secondary CTA: Chat Before Buying.

### Portfolio Overview
- Goal: establish credibility with a filterable showcase of shipped outcomes.
- Primary CTA: View Case Study.
- Secondary CTA: Book a Discovery Call.

### Case Study Detail
- Goal: show decision quality, craft, technical thinking, and business outcomes.
- Primary CTA: Build Something Similar.
- Secondary CTA: Explore More Work.

### Pricing
- Goal: explain engagement models without making custom work feel commodity-priced.
- Primary CTA: Get a Tailored Proposal.
- Secondary CTA: Book Appointment.

### About
- Goal: humanize the agency, explain operating principles, and reinforce quality standards.
- Primary CTA: Meet Through a Call.
- Secondary CTA: Explore Process.

### AI Concierge
- Goal: provide instant business-aware answers and route to the right next action.
- Primary CTA: Ask the AI Concierge.
- Secondary CTA: Escalate to WhatsApp.

### Book Appointment
- Goal: qualify leads, schedule efficiently, and reduce back-and-forth.
- Primary CTA: Confirm Appointment.
- Secondary CTA: Ask a Question First.

### Checkout
- Goal: complete payment with confidence and low friction.
- Primary CTA: Pay with Stripe.
- Secondary CTA: Return to Product.

### Contact
- Goal: provide multi-channel communication paths for different urgency levels.
- Primary CTA: Send Inquiry.
- Secondary CTA: Open WhatsApp.

### FAQ
- Goal: remove common objections around scope, timing, pricing, support, and delivery.
- Primary CTA: Ask the AI Concierge.
- Secondary CTA: Book Appointment.

### Privacy Policy
- Goal: provide transparent data handling and trust for chat, booking, analytics, and payments.
- Primary CTA: Contact for Privacy Questions.
- Secondary CTA: Read Terms.

### Terms of Service
- Goal: define product, service, payment, refund, and delivery expectations.
- Primary CTA: Contact for Clarification.
- Secondary CTA: Read Privacy Policy.

### 404
- Goal: recover the user and route them to a useful next step.
- Primary CTA: Go Home.
- Secondary CTA: Open Chat.

## Cross-Page Components
- Global header with utility strip and mega menu.
- AI chat widget with service-aware prompts.
- WhatsApp quick-launch component.
- Booking CTA rail.
- Social proof marquee.
- Case study teaser cards.
- Product cards and bundle cards.
- Sticky mobile dock.
- Footer with trust, support, and legal navigation.

## Shared State Requirements
- All forms: default, focus, validation error, submitting, success, server error.
- Listings: loading skeleton, loaded, empty, filtered-empty, error.
- Chat: collapsed, greeting, typing, active thread, handoff, offline.
- Checkout: editable cart summary, coupon applied, payment processing, success, failure, retry.
- Navigation: default, hover, active, open, sticky, mobile expanded.

## Motion Rules
- Default motion band: 180ms to 260ms.
- Hero and section reveal: fade plus translate Y between 8px and 16px.
- Card hover: subtle lift with shadow shift, never exaggerated.
- Mobile sheets: spring-open with reduced-motion fallback to instant state change.
- AI chat and WhatsApp launch affordances should feel immediate and reliable.

## Accessibility and Trust Requirements
- WCAG 2.1 AA contrast and keyboard behavior across all interactions.
- Skip links and landmark roles on every public page.
- Accessible chat launcher labels, booking form instructions, and Stripe handoff messaging.
- Visible privacy disclosure around AI chat, booking data, and payment handling.

## Suggested Frontend Implementation Structure
- Framework: Next.js App Router.
- UI: React, Tailwind CSS, Radix UI primitives where useful, Framer Motion for controlled motion.
- Content: MDX or headless CMS for case studies, FAQs, and shop content.
- Search and filters: URL-synced query params for portfolio and shop pages.
- State: local state for lightweight interactions, Zustand for cart and assistant session continuity.
- Integrations: Stripe, Calendly or custom booking provider, WhatsApp deep links, AI chat backend, analytics.

## Route Map
- /
- /services
- /services/saas-applications
- /services/websites
- /services/mcp-servers
- /services/automation
- /shop
- /shop/[slug]
- /portfolio
- /portfolio/[slug]
- /pricing
- /about
- /ai-concierge
- /book-appointment
- /checkout
- /contact
- /faq
- /privacy-policy
- /terms-of-service
- /404

## File Output Inventory
- ai-context.yaml
- README.md
- 00-master-ui-architecture.md
- 01-design-system.md
- 02-component-system.md
- home-page.md
- services-page.md
- service-saas-applications-page.md
- service-websites-page.md
- service-mcp-servers-page.md
- service-automation-page.md
- shop-page.md
- product-detail-page.md
- portfolio-page.md
- case-study-page.md
- pricing-page.md
- about-page.md
- ai-concierge-page.md
- book-appointment-page.md
- checkout-page.md
- contact-page.md
- faq-page.md
- privacy-policy-page.md
- terms-of-service-page.md
- 404-page.md