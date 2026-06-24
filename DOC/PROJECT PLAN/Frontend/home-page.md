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
- Target audience: founders, operators, agencies, and growth teams seeking premium websites, HTML business profiles, SaaS applications, mobile app launch systems, and ready-to-buy website products.
- Primary CTA: Browse Products.
- Secondary CTA: Book a Free Consultation.

## Sections In Visual Order

### 1. Utility Ribbon
- Content: fast-trust items, average response time, WhatsApp shortcut, and limited-time product bundle notice.
- Components: utility strip, badge, link buttons.
- Interaction notes: grouped with the header inside `SiteTopChrome` (fixed top chrome); both hide on scroll down and reappear on scroll up via a shared visibility provider.

### 2. Header and Mega Navigation
- Content: logo, service categories, shop, portfolio, pricing, AI concierge, booking CTA, cart, chat.
- Components: header, mega menu, icon buttons.
- State requirements: default, scrolled, menu open, mobile drawer open, hidden-on-scroll-down, visible-on-scroll-up.

### 3. Hero Statement and Proof Deck
- Content: product-led headline — ready-made SaaS templates, AI tools, and custom development support — with Browse Products, Book a Free Consultation, Need Custom Work, WhatsApp, and Ask AI Assistant actions.
- Components: hero section, stat blocks, stack line.
- Interaction notes: centered single-column hero with product-led proof stats.

### 4. Service Cards
- Content: services as upsell path with Template Customization featured first.
- Components: `ServiceCards`, `ServiceCardsMobile`, `ServiceCardsDesktop`, `FeatureCard`.
- Interaction notes: rendered immediately after the hero as the second homepage section. Below `lg`, `MarketingViewportGate` mounts a centered editorial header (badge, title, description, outline compare CTA) and a vertical stack of horizontal service rows (icon, copy, duration pill, chevron) backed by shared `--mobile-type-*` tokens via `.home-services-mobile__*` classes. At `lg+`, the existing `SectionHeading` + `FeatureCard` grid is unchanged.

### 4b. Ready-Made Solutions
- Content: tabbed website templates and HTML business profile previews.
- Components: `ReadyMadeSolutionsSection`, `ReadyMadeSolutionsMobile`, `ReadyMadeSolutionsDesktop`, `ShopProductHomeMobileRowCard`.
- Interaction notes: section 3 on `/`. Mobile uses `.home-mobile-marketing__*` tokens, accent title split, pill tabs, monitor note, and horizontal product rows.

### 4c. Templates Marketplace (HTML Business Profiles)
- Content: featured HTML business profile cards with preview CTAs.
- Components: `HomeTemplatesMarketplaceSection`, `ShopProductHomeMobileRowCard`.
- Interaction notes: mobile uses centered marketing header, dual pill CTAs, and stacked horizontal row cards (phone preview left, dual teal category labels, price, cart + Live Preview, View details link).

### 4d. Featured Templates
- Components: `FeaturedProducts` with mobile gate — centered header, browse CTA, horizontal row cards for html-preview variant.

### 4e. HTML Preview Showcase
- Components: `HomeHtmlPreviewSection`.
- Interaction notes: mobile uses centered eyebrow header; stacks desktop preview panel then mobile preview panel inside `.home-mobile-marketing__preview-stack` token-backed shells.

### 4f. Digital Products Showcase
- Components: `HomeDigitalProductsShowcase`, `ShopProductHomeCatalogMobileCard`.
- Interaction notes: mobile filter card (category/type chips), product count + sort toolbar, 2-column compact catalog grid.

### 4g. Three-Path Explainer
- Components: `ThreePathExplainerMobile` / `ThreePathExplainerDesktop` — stacked path cards with icon, bullets, and pill CTAs on mobile.

### 4h. Case Studies / Featured Builds
- Components: `HomeFeaturedBuildsSection`, `PortfolioCardMobile`, `MobileMarketingTabs` (`variant="segmented"`).
- Interaction notes: mobile left-aligned header with teal eyebrow rule; full-width segmented tab bar (Website projects / About this product) with teal underline on active; stacked cards with filled teal service badge, industry label, contained preview, divider-separated footer links, and centered outline CTA.

### 4i. Operating System (Process)
- Components: `HomeProcessSection`, `ProcessStepsMobile` — vertical timeline cards on mobile.

### 4j. AI Concierge
- Components: `HomeAiConciergeSection` — mobile chat demo card with quick-reply pills and highlight grid.

### 4k. Proof (Testimonials)
- Components: `TestimonialsMobile` / `TestimonialsDesktop`.

### 4l. Final CTA
- Components: `ProductLedFinalCTAMobile` — dark contrast card with stacked CTAs and 3-column feature grid on mobile.

### 4m. Field Notes (Blog)
- Components: `HomeFieldNotesSection`, `BlogCardMobile`.
- Interaction notes: mobile left-aligned header, outline blog CTA, stacked article cards with excerpt clamp.

### 4n. Footer
- Components: `Footer` (`MarketingViewportGate`), `FooterMobile`, `FooterDesktop`.
- Interaction notes: mobile response-time card, 2-column services icon grid, chevron digital-products list, Company/Support/Legal columns, copyright + social links.

### 4o. Mobile Bottom Nav
- Components: `MobileBottomNav`.
- Interaction notes: five-item bar; digital products tab label is **Products** (space-saving).

### 5. HTML Business Profiles Category Hero
- Content: category-based HTML business profile spotlight with template counts and direct links to preview hub and shop category.
- Components: `HtmlBusinessProfilesCategoryHero`.

### 7. Three-Path Explainer
- Content: DIY buyer, non-technical owner, serious founder, curious visitor funnels.
- Components: `ThreePathExplainer`.

### 8. Digital Products Showcase
- Content: compact full-viewport shop browse with filter sidebar/chips and a capped product grid linking to the full catalog.
- Components: `HomeDigitalProductsShowcase`, `ShopProductCard`.
- Interaction notes: `min-h-[100dvh]` section with client-side filter state; Featured Products block removed from homepage.

### 4. Trust Bar (hidden on homepage)
- Content: production-ready products, Done-For-You entry pricing, response window, secure checkout.
- Components: `TrustBar`.
- Interaction notes: retained in code behind `SHOW_HOME_TRUST_BAR`; not rendered on `/` by default.

### 6. Featured Builds and Outcomes
- Content: selected case studies weighted toward websites, SaaS applications, mobile launch work, and ready-to-deploy website systems.
- Components: portfolio tiles, metric strips, testimonial quote.
- State requirements: loaded, loading skeleton, empty fallback if no featured work.

### 7. Blog and Insights Section
- Content: featured articles, operator playbooks, architecture notes, and direct links into the blog hub.
- Components: article cards, tag badges, eyebrow label, section CTA.
- Interaction notes: featured article can use larger layout treatment; supporting cards should remain scannable on mobile.

### 8. Shop Spotlight
- Content: website templates and ready websites only, with pricing language aligned to the new ranges: templates from $500 to $10k and ready websites from $1k to $15k.
- Components: product tiles (4-col grid on desktop), price chips, category label, tag badge, direct link to product detail page.
- Interaction notes: each product card links directly to its `/shop/[slug]` detail page. Section CTA links to `/shop`.

### 9. Process and Collaboration Model
- Content: discovery, strategy, design system, build, QA, launch, optimization.
- Components: step indicator, content blocks, timeline strip.
- Interaction notes: step hover highlights outputs and cadence.

### 10. AI Concierge and Live Chat Section
- Content: prompt suggestions, assistant capabilities, privacy note, escalation to WhatsApp or booking.
- Components: chat widget preview, prompt chips, action bar.
- State requirements: online, loading, fallback to live or WhatsApp.

### 11. Pricing and Engagement Snapshot
- Content: starting ranges for website templates, ready websites, custom SaaS work, and mobile app launch systems, plus flexible-payment messaging, delivery-first international option for the first 100 clients, and 1 year of free support and maintenance.
- Components: pricing tiers, comparison rows, CTA block.
- Interaction notes: monthly and project toggle if needed.

### 12. Testimonial and Credibility Strip
- Content: a stack-and-integrations marquee on the homepage, live Google review feed, shipping principles, and tech stack badges, while other proof surfaces can still use client-name marquees.
- Components: marquee, Google review cards, leave-review CTA, badges.

### 13. Final Conversion Band
- Content: booking CTA, WhatsApp CTA, and chat CTA with expectation setting.
- Components: CTA section, dual buttons, reassurance list.

### 14. Footer
- Content: deep links, support, legal, social, response-time promise.
- Components: footer, menu groups, small badges.

## Section Size + Layout Map (Desktop-First)
- Hero statement: `size=hero`, `layout=viewport`.
- Service cards: `size=standard`, `layout=viewport`.
- HTML business profiles spotlight hero: `size=hero`, `layout=viewport`.
- Three-path explainer: `size=standard`, `layout=viewport`.
- Digital products showcase: `min-h-[100dvh]`, full width.
- Featured builds: `size=standard`, `layout=viewport`.
- Trust strip marquee: `size=compact`, `layout=content`.
- Process and collaboration model: `size=standard`, `layout=viewport`.
- AI concierge and live chat section: `size=standard`, `layout=viewport`.
- Testimonials and Google reviews: `size=standard`, `layout=viewport`.
- Final conversion band (`CTABand`): outer wrapper `size=none`, `layout=content` (inner CTA slab keeps its own padding).

## State Requirements
- Home hero media loads with skeleton frames.
- Featured work and shop cards handle empty and loading states.
- AI section supports online, offline, and handoff states.

## Responsive Adaptation
- Desktop uses split hero with layered panels.
- Tablet keeps two-column hero but compresses stats into a swipe row.
- Mobile uses a single-column hero (`HomeHeroMobile`): **center-aligned** copy matching the approved mock — compact title scale (`clamp(1.875rem, 8.2vw, 2.25rem)`), 15px description, pill CTAs (48px height), divider-flanked trust logos (SVG manifest), live preview monitor with CSS phone bezel (desktop-scaled preview), carousel pagination, and a 2×2 feature grid with icon+label rows. `HomeHeroViewportGate` mounts only one hero layout for iframe budget (≤2). Sizing and spacing are token-driven via `.home-hero-mobile` in `globals.css`; mobile band does not force full viewport height.
- Sticky bottom dock, swipeable proofs, and sheet-based quick previews apply elsewhere on the page.

## SEO and Metadata
- Title: Premium Websites, HTML Business Profiles, SaaS Applications, Ready Websites, and Mobile App Launch Systems.
- Description: Premium web development agency focused on websites, category-based HTML business profiles, SaaS applications, mobile app launch systems, and ready-to-buy website products, with MCP and automation as secondary services.

## Conversion Path
- Primary path: Hero -> Featured builds -> Process -> Booking.
- Secondary path: Hero -> Blog and insights -> Blog detail -> Booking.
- Secondary path: Hero -> Shop spotlight -> Product detail -> Checkout.
- Assisted path: AI concierge -> WhatsApp or booking.