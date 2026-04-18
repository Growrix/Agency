---
document_type: page-plan
page_id: services-overview
route: /services
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Services Overview Page

## Page Definition
- Purpose: help visitors understand the capability map and choose the right engagement path.
- Target audience: buyers who know they need help but have not yet chosen the service model.
- Primary CTA: Discuss My Project.
- Secondary CTA: Compare Services.

## Sections In Visual Order

### 1. Hero and Service Selector
- Content: services headline, concise positioning, segmented selector for SaaS apps, websites, MCP servers, and automation.
- Components: hero section, segmented control, service preview cards.

### 2. Service Grid
- Content: four detailed cards showing typical projects, outcomes, timelines, and fit indicators.
- Components: feature blocks, cards, badges.
- Interaction notes: hover expands scope summary and ideal client profile.

### 3. Comparison Matrix
- Content: decision matrix across business goal, complexity, timeline, maintenance, and ideal engagement style.
- Components: comparison section, table-like rows, icons.
- State requirements: desktop table and mobile accordion equivalent.

### 4. Delivery System
- Content: discovery, strategy, UX, development, QA, launch, support.
- Components: step indicator, process blocks, stat badges.

### 5. Stack and Integration Capabilities
- Content: frontend, backend, automation, AI tooling, payments, analytics, CMS, hosting.
- Components: logo cloud, icon grid, content block.

### 6. Proof by Service Type
- Content: one case study teaser and one testimonial for each service category.
- Components: case-study cards, testimonial cards.

### 7. FAQ and Objection Handling
- Content: custom vs template, project length, maintenance, team collaboration, pricing approach.
- Components: accordion group.

### 8. Conversion Section
- Content: choose service CTA, WhatsApp CTA, AI concierge shortcut.
- Components: CTA band, action bar.

## State Requirements
- Selector filters must support default, selected, and reduced-motion transitions.
- Comparison section needs scroll assistance on small screens.

## Responsive Adaptation
- Desktop uses a two-row capability layout with persistent comparison anchor nav.
- Mobile turns comparison into stacked accordions and keeps a sticky choose-service action.

## SEO and Metadata
- Title: Web Development Services | SaaS Apps, Websites, MCP Servers, Automation.
- Description: Compare the agency's service offerings and choose the right path for custom SaaS, websites, MCP servers, and automation.

## Conversion Path
- Services overview -> chosen service detail -> booking or chat.