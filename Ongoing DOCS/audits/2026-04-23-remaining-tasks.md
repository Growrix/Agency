# Remaining Tasks from 2026-04-23 E2E Progress Audit

This list is extracted from the audit report and includes only the remaining (not done) tasks as of the audit date.

## Priority P0 (Must Do Before Full Production Release)
- Implement persistent backend domain and storage layer for key entities
- Implement booking APIs and real scheduling flow
- Implement Stripe checkout and webhook-based payment/order flow
- Implement auth/session/RBAC middleware and protected admin/read APIs
- Implement endpoint abuse controls for public APIs (contact, concierge)

## Priority P1 (Strongly Recommended for MVP Stability)
- Add inquiry persistence and admin visibility for contact submissions
- Add observability (errors, latency, integration failures)
- Add analytics instrumentation for conversion paths
- Add integration and e2e tests for contact, booking, checkout, concierge

## Priority P2 (Quality and Scale)
- Add full regression test matrix and performance/accessibility gates
- Add production runbooks with rollback criteria and on-call playbook
- Add CMS integration only if editorial workflow requires it now

## Sequential Phase Checklist (Remaining Only)

### Phase P2 Frontend Surface
- [ ] Booking integrated flow (still placeholder)
- [ ] Live chat dedicated route
- [ ] Admin interface routes

### Phase P3 Backend and API
- [ ] Public read API contract surface (v1 services/portfolio/shop routes)
- [ ] Conversion APIs (appointments/chat start/full contract parity)
- [ ] Commerce APIs (orders, payment webhooks, fulfillment)
- [ ] Subscriber and admin APIs with auth enforcement

### Phase P4 Security
- [ ] Auth/session/RBAC implementation
- [ ] Request validation and audit logs framework
- [ ] Runtime env validation policy
- [ ] Rate limit and abuse controls

### Phase P5 DevOps and Reliability
- [ ] Production observability stack
- [ ] Full infrastructure/runtime hardening

### Phase P6 QA and Release Gates
- [ ] Unit tests
- [ ] Integration/API tests
- [ ] E2E tests
- [ ] Accessibility/performance/security automation
- [ ] Full release gate execution evidence

### Integration Checklist (Explicit)
- [ ] Stripe
- [ ] Sanity
- [~] AI Growrix OS concierge (session persistence, rate limiting, analytics)
- [~] WhatsApp (full API integration if required)
- [ ] Calendar booking integration
- [ ] Analytics stack implementation
