---
document_type: page-plan
page_id: portfolio
route: /portfolio
scope: proof
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Portfolio Page

## Page Definition
- Purpose: prove quality through a filterable showcase of shipped products and websites.
- Target audience: high-intent buyers comparing the agency against alternatives.
- Primary CTA: View Case Study.
- Secondary CTA: Book a Discovery Call.

## Sections In Visual Order

### 1. Portfolio Hero
- Content: positioning around outcomes, craft, and technical depth.
- Components: hero, stat blocks, filter prompt.

### 2. Filter and Search Rail
- Content: industry, service type, platform, goal, build type.
- Components: filter bar, search bar, sort control.
- State requirements: default, active filters, clear-all, filtered-empty.

### 3. Featured Work
- Content: top case studies with larger visuals and richer metrics.
- Components: large portfolio tiles, quote strips.

### 4. Full Project Grid
- Content: remaining work with card previews, tags, and quick outcomes.
- Components: portfolio tiles, pagination control.

### 5. Capability Insights Section
- Content: what the portfolio proves about frontend systems, commerce, automation, and MCP work.
- Components: stat tiles, feature blocks.

### 6. Testimonials and Social Proof
- Content: client voices, retention or repeat work proof, stack credibility.
- Components: testimonial cards, logo rail.

### 7. CTA Section
- Content: build something similar, talk through a project, or ask AI for project fit.
- Components: CTA band, action bar.

## State Requirements
- Grid: skeleton, populated, empty, filtered-empty, error.
- Filters remain URL-synced and shareable.

## Responsive Adaptation
- Mobile prioritizes filter chips and stacked large cards.
- Full grid becomes a single-column or two-up masonry depending on screen width.

## SEO and Metadata
- Title: Portfolio | Shipped SaaS, Websites, MCP Systems, and Automation.
- Description: Explore selected digital products, custom builds, and case studies showing design, engineering, and business outcomes.

## Conversion Path
- Hero -> featured work -> project grid -> case study -> booking.