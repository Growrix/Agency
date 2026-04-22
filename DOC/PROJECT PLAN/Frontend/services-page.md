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
- Purpose: help visitors understand the capability map while clearly prioritizing websites, SaaS applications, mobile app launch work, and ready website offers.
- Target audience: buyers who know they need help but have not yet chosen the service model.
- Primary CTA: Discuss My Project.
- Secondary CTA: Compare Services.

## Sections In Visual Order

### 1. Hero and Service Selector
- Content: services headline and concise positioning that lead with websites and SaaS, reference mobile app launch work, and keep MCP plus automation as secondary specialist services.
- Components: hero section, segmented control, service preview cards.

### 2. Service Grid
- Content: four detailed cards showing typical projects, outcomes, timelines, and fit indicators, with the first-message emphasis on websites, SaaS applications, and launch-ready digital products.
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
- Content: proof weighted toward website, SaaS, mobile launch, and ready-website outcomes, while still leaving room for secondary MCP and automation examples deeper in the page.
- Components: case-study cards, Google review cards, leave-review CTA.

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
- Description: Compare the agency's service offerings with primary emphasis on websites, SaaS applications, mobile launch work, and ready websites, plus secondary MCP and automation services.

## Conversion Path
- Services overview -> chosen service detail -> booking or chat.