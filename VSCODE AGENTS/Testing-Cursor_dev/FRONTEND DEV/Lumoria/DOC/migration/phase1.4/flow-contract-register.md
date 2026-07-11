# Flow Contract Register

Date: 2026-05-23

## Audited Flows
- Navigation menu (desktop and mobile toggle)
- FAQ accordion expand and collapse
- Contact form validation and submit state messaging
- Route-level CTA interactions

## Native State Ownership
- src/components/site/site-header.tsx owns mobile navigation open and close state
- src/components/site/faq-accordion.tsx owns FAQ disclosure state
- src/components/site/contact-form.tsx owns input values, validation, and success or error contract

## Frontend Contract Boundaries
- Contact form currently implements frontend validation and local success/error messaging only
- Backend submission endpoint is not configured in this phase and is intentionally declared as a not-configured boundary

## Status
- Phase 1.4 flow contract gate: PASS for frontend-native interaction ownership
