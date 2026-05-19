---
document_type: page-plan
page_id: book-appointment
route: /book-appointment
scope: conversion
build_stage: 5-booking-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
---

# Book Appointment Page

## Page Definition
- Purpose: qualify leads and schedule calls with low friction.
- Target audience: prospects ready to discuss a project, audit, or product customization.
- Primary CTA: Confirm Appointment.
- Secondary CTA: Ask a Question First.

## Sections In Visual Order

### 1. Booking Hero
- Content: headline, expected call outcome, call length, and response expectations.
- Components: hero, reassurance badges.

### 2. Service Intent Selector
- Content: SaaS app, website, MCP server, automation, product support, not sure yet.
- Components: segmented control, service cards.

### 3. Qualification Form
- Content: company, goal, timeline, budget band, platform needs, current blockers, preferred channel.
- Components: multi-step form, progress bar, helper text.
- State requirements: default, validation error, save progress, submitting, success, failure.

### 4. Calendar and Time Selection
- Content: timezone-aware availability and alternate contact option.
- Components: date picker, native time picker or time input, selected-slot preview, inline alerts.

### 5. Confirmation and Next Steps
- Content: meeting summary, preparation guidance, WhatsApp fallback, confirmation email note.
- Components: summary card, alert message, CTA section.

### 6. FAQ and Objection Handling
- Content: what to prepare, who should join, consultation cost, rescheduling.
- Components: accordion.

## State Requirements
- Multi-step flow needs preserved progress.
- Calendar must handle no slots, loading, selected slot, confirmed booking, and API error.

## Responsive Adaptation
- Mobile uses a progress-first step flow with sticky bottom continue action.
- Calendar uses native mobile-friendly date and time controls rather than a long fixed slot dropdown.

## SEO and Metadata
- Title: Book an Appointment | Discovery Call and Project Scoping.
- Description: Book a project call to discuss SaaS builds, websites, MCP servers, automation, or product customization.

## Conversion Path
- Hero -> service intent -> qualification form -> calendar -> confirmation.