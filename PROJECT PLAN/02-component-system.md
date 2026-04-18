---
document_type: component-system
scope: site-wide
build_stage: 3-component-foundation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
recommended_next_reads:
  - home-page.md
  - services-page.md
---

# Component System

## System Strategy
- Use reusable product-grade components only.
- Components should support both editorial marketing layouts and product-like utility surfaces.
- Every component must define accessibility, responsive behavior, empty handling where relevant, and loading treatment.

## Atoms

### Button
- Variants: primary, secondary, ghost, destructive, text-link.
- States: default, hover, active, loading, disabled.
- Accessibility: visible focus, aria-busy in loading, icon-only buttons require labels.
- Responsive rule: full-width option on mobile for booking and checkout contexts.

### Input Family
- Includes input, textarea, select, checkbox, radio, switch.
- States: default, focus, success, error, disabled.
- Behavior: helper text below field, inline validation, clear error recovery path.
- Responsive rule: stacked labels and wider hit areas on mobile.

### Badge
- Variants: service type, product type, proof metric, status.
- Behavior: compact but readable, never used as the sole source of meaning.

### Icon
- Semantic use only.
- Decorative icons should be `aria-hidden`.

### Avatar and Tooltip
- Used in testimonials, live chat, team, and AI concierge.
- Tooltips must remain keyboard accessible and not contain critical-only information.

## Molecules

### Card
- Variants: service card, product card, proof card, case-study card, utility card.
- States: default, hover, selected, loading.
- Interaction: subtle lift, border emphasis, CTA reveal only when useful.

### FeatureBlock
- Used for service capabilities, differentiators, and process steps.
- Responsive: collapses from horizontal modules into vertical stacked cards.

### StatBlock
- Supports short metrics with optional sparkline or directional icon.
- Motion: count-up only on first reveal and only when reduced motion is not requested.

### PricingTier
- Used for packaged offers, support plans, or bundles.
- States: default, featured, expanded, unavailable.

### Testimonial
- Formats: quote card, client video teaser, pull quote with metric.
- Accessibility: transcripts or text alternatives for video testimony.

### SearchBar, FilterBar, SortControl, PaginationControl
- Shared between shop and portfolio.
- Behavior: URL sync, clear reset, loading skeleton, filtered-empty state.

### ProductTile and PortfolioTile
- Support hover preview, quick metadata, and strong image hierarchy.
- Mobile behavior: no hover-only dependencies; key actions remain visible.

### AlertMessage and ToastMessage
- Use for coupon state, booking confirmation, chat handoff, and form feedback.
- Accessibility: assertive announcements only for critical states.

## Organisms

### Header and Navbar
- Includes utility strip, main nav, mega menu for services, chat shortcut, WhatsApp link, and booking CTA.
- States: default, scrolled, mobile open, submenu open.

### Footer
- Includes grouped navigation, trust badges, support links, newsletter or updates opt-in, and legal routes.

### HeroSection
- Must support editorial heading, value stack, proof, media panel, and dual CTA logic.
- Variants: service hero, product hero, portfolio hero, utility hero.

### FeatureSection and ContentSection
- Support text-plus-media, cards, comparison rows, and process storytelling.
- Responsive rule: preserve content order and readability without collapsing meaning.

### ListingSection
- Powers shop and portfolio grids.
- States: loading, populated, empty, filtered-empty, error.

### DetailSection
- Supports service detail, product spec detail, and case study narrative blocks.

### FormSection
- Used for contact, booking, checkout, and lead capture.
- Includes step logic, validation, submit feedback, and privacy disclosures.

### SearchPanel and FilterPanel
- Desktop uses side or inline rail.
- Mobile uses bottom sheet or full-screen drawer with sticky apply/reset actions.

### CheckoutSection
- Includes order summary, coupon row, billing fields, Stripe handoff, and reassurance modules.

### ChatWidget
- States: collapsed, greeting, active, loading, handoff, offline.
- Capabilities: suggested prompts, service-aware replies, escalation to WhatsApp or booking.

### DashboardShell-Inspired Surfaces
- Used lightly on marketing pages to imply product sophistication through control panels, data cards, and workflow previews.
- Not used for actual logged-in app functionality unless product scope expands later.

### MobileBottomNav
- Appears on mobile only.
- Items: Home, Services, Shop, Portfolio, Chat.
- States: default, active, attention badge.

## Shared Accessibility Rules
- Every interactive surface must be keyboard reachable and visibly focused.
- Accordions, tabs, drawers, and dialogs use correct ARIA patterns.
- Toasts, cart updates, and chat state changes announce important changes without overwhelming screen readers.

## Responsive Behavior Rules
- No hover-only discovery path may gate information or action.
- Cards can shift from editorial widths on desktop to dense stacked modules on mobile.
- CTA hierarchy must simplify on mobile: one primary action, one secondary action, utility actions in sheets or dock.

## State Management Guidance
- Cart state: persisted client-side and synced to checkout.
- AI assistant session: keep lightweight continuity across pages.
- Filters: keep route-synced for shareable URLs.
- Booking form: preserve progress if the user temporarily leaves the flow.

## Why This Pattern Fits
- The agency needs both credibility marketing and product commerce, so the system blends rich storytelling blocks with product-like utility primitives.
- The component set supports future expansion into gated tools, knowledge bases, or client portal surfaces without rewriting the design language.