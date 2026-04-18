---
document_type: page-plan
page_id: pricing
route: /pricing
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Pricing Page

## Page Definition
- Purpose: explain engagement models clearly without reducing custom work to a commodity table.
- Target audience: buyers comparing budget fit, scope fit, and speed-to-value.
- Primary CTA: Get a Tailored Proposal.
- Secondary CTA: Book Appointment.

## Sections In Visual Order

### 1. Pricing Hero
- Content: transparent pricing philosophy, difference between custom services and productized offers, and expectation-setting copy.
- Components: hero, badge row, CTA pair.

### 2. Engagement Model Selector
- Content: custom build, sprint, retainer, digital products, bundles.
- Components: segmented control, pricing cards.
- Interaction notes: changing mode updates comparison content and sticky summary.

### 3. Service Pricing Blocks
- Content: typical ranges for SaaS apps, websites, MCP servers, and automation engagements.
- Components: pricing tiers, scope cards, feature comparison.

### 4. Productized and Shop Offers
- Content: templates, ready websites, mobile apps, MCP packages, automation kits.
- Components: product cards, bundle cards.

### 5. What Influences Cost
- Content: complexity, integrations, content, timeline, support, migration effort.
- Components: accordion or expandable cards.

### 6. ROI and Value Framing
- Content: expected payback logic, conversion improvements, operational savings, faster launch cycle.
- Components: stat blocks, example comparisons.

### 7. FAQ and Objection Handling
- Content: deposits, revisions, payment plans, support, scope changes.
- Components: accordion.

### 8. Final CTA
- Content: book a pricing call, open WhatsApp, or use AI to understand best-fit options.
- Components: CTA band, action bar.

## State Requirements
- Pricing selector: default, selected, reduced-motion transition.
- Comparison areas: expanded, collapsed, mobile accordion equivalent.

## Responsive Adaptation
- Desktop uses a sticky pricing summary rail.
- Mobile collapses larger comparison tables into cards and keeps one sticky CTA.

## SEO and Metadata
- Title: Pricing | Custom Builds, Productized Services, and Digital Products.
- Description: Review pricing ranges, engagement models, and value drivers for websites, SaaS products, MCP servers, automation, and digital assets.

## Conversion Path
- Pricing hero -> model selector -> scope explanation -> CTA.