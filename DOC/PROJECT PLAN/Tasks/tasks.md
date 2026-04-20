---
document_type: execution-tracker
human_index: true
machine_readable: true
tracker_version: 1
canonical_ai_entrypoint: ai-context.yaml
canonical_template: DOC/Universal/Template/tasks-template.md
last_audit_date: 2026-04-20
current_state:
  repo_branch_audited: main
  frontend_shell: done
  frontend_routes: mostly_done
  frontend_conversion_integrations: partial
  backend_implementation: not_started
  api_implementation: not_started
  security_implementation: not_started
  devops_implementation: partial
  qa_implementation: not_started
  deployable: false
release_blockers:
  - Vercel production build is failing and deployment configuration is unresolved.
  - No backend or API implementation exists under web/src/app/api/** or a server domain layer.
  - Checkout, booking, and AI concierge routes are placeholders rather than real integrated flows.
  - The contact form is UI-only and does not submit to a persisted backend endpoint.
  - No automated test suite or CI workflow exists.
phase_sequence:
  - P0-documentation-tracking-alignment
  - P1-frontend-foundation
  - P2-frontend-surface-implementation
  - P3-backend-api-implementation
  - P4-security-hardening
  - P5-devops-release-readiness
  - P6-qa-release-gates
next_recommended_phase: P3-backend-api-implementation
next_recommended_tasks:
  - T013
  - T014
  - T015
  - T016
phase_status_counts:
  done: 2
  partial: 2
  blocked: 0
  not_started: 3
task_status_counts:
  done: 10
  partial: 0
  blocked: 0
  not_started: 23
---

# Tasks / Execution Tracker

## Audit Snapshot
- Audit basis:
	- DOC/PROJECT PLAN/ai-context.yaml
	- DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml
	- DOC/PROJECT PLAN/*/README.md
	- current `web/` codebase on `main`
- Working conclusion:
	- the documented frontend surface is largely implemented
	- the documented backend, API, Security, DevOps, and QA phases are still mostly documentation-only
	- deployment is blocked by runtime, integration, and release-engineering gaps rather than missing marketing pages

## Status Legend
- `done`: implemented in code and present in the audited codebase.
- `partial`: scaffold, mock, or placeholder exists, but the real server-backed flow is not complete.
- `blocked`: cannot proceed until an upstream dependency or blocker is removed.
- `not_started`: documented in the project plan, but no implementation evidence exists yet.

## Machine-Readable Phase Map
```yaml
phases:
  - id: P0
    name: Documentation Tracking Alignment
    status: done
  - id: P1
    name: Frontend Foundation
    status: done
  - id: P2
    name: Frontend Surface Implementation
    status: partial
  - id: P3
    name: Backend API Implementation
    status: not_started
  - id: P4
    name: Security Hardening
    status: not_started
  - id: P5
    name: DevOps Release Readiness
    status: partial
  - id: P6
    name: QA Release Gates
    status: not_started
```

## Phase Overview
| Phase | Status | Summary |
| --- | --- | --- |
| P0 | done | Task tracking and documentation alignment established. |
| P1 | done | Workspace, shell, primitives, theme system, and styling foundation are built. |
| P2 | partial | Marketing, blog, proof, and shop preview surfaces exist; contact/checkout/booking/AI are not integrated. |
| P3 | not_started | No backend domain layer or route handlers exist. |
| P4 | not_started | Security rules exist in docs only; auth, audit, validation, and abuse controls are not implemented. |
| P5 | partial | Local build scripts exist, but production deployment and CI/CD are not release-ready. |
| P6 | not_started | No unit, integration, e2e, accessibility, performance, or security automation exists. |

## Tasks By Phase

### Phase P0 — Documentation Tracking Alignment
- [x] T001 Create and maintain the canonical execution tracker at `DOC/PROJECT PLAN/Tasks/tasks.md`.
- [x] T002 Add a machine-readable entrypoint and human index at `DOC/PROJECT PLAN/Tasks/ai-context.yaml` and `DOC/PROJECT PLAN/Tasks/README.md`.
- [x] T003 Align root planning docs so `DOC/PROJECT PLAN/ai-context.yaml` and `DOC/PROJECT PLAN/README.md` reference the Tasks layer.
- [x] T004 Align shared contract route maps with the implemented frontend route plan in `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml` and `DOC/PROJECT PLAN/Shared Contracts/README.md`.

### Phase P1 — Frontend Foundation
- [x] T005 Build root workspace scripts in `package.json` and `web/package.json`.
- [x] T006 Build the global shell in `web/src/app/layout.tsx`, `web/src/components/shell/Header.tsx`, `web/src/components/shell/Footer.tsx`, `web/src/components/shell/MobileBottomNav.tsx`, `web/src/components/shell/UtilityRibbon.tsx`, and `web/src/components/shell/ChatLauncher.tsx`.
- [x] T007 Build design primitives and motion foundation in `web/src/components/primitives/**`, `web/src/components/motion/Motion.tsx`, and `web/src/app/globals.css`.

### Phase P2 — Frontend Surface Implementation
- [x] T008 Build marketing and trust routes in `web/src/app/page.tsx`, `web/src/app/about/page.tsx`, `web/src/app/pricing/page.tsx`, `web/src/app/services/page.tsx`, `web/src/app/services/[slug]/page.tsx`, `web/src/app/faq/page.tsx`, `web/src/app/privacy-policy/page.tsx`, `web/src/app/terms-of-service/page.tsx`, and `web/src/app/not-found.tsx`.
- [x] T009 Build editorial and proof routes in `web/src/app/blog/page.tsx`, `web/src/app/blog/[slug]/page.tsx`, `web/src/app/portfolio/page.tsx`, and `web/src/app/portfolio/[slug]/page.tsx`.
- [x] T010 Build the shop browse and product preview surface in `web/src/app/shop/page.tsx`, `web/src/app/shop/[slug]/page.tsx`, `web/src/components/shop/**`, `web/src/lib/shop.ts`, and `web/src/lib/site-images.ts`.
- [ ] T011 Build the contact conversion flow in `web/src/app/contact/page.tsx` and connect it to `web/src/app/api/v1/contact/route.ts`.
	- Current state: UI exists, but submission is simulated in the client and never reaches a real endpoint.
- [ ] T012 Replace placeholder conversion routes in `web/src/app/ai-concierge/page.tsx`, `web/src/app/book-appointment/page.tsx`, and `web/src/app/checkout/page.tsx` with real integrated flows.
	- Current state: all three routes render `ComingSoon` placeholders.
- [ ] T013 Build the missing live chat surface at `web/src/app/live-chat/page.tsx` and the supporting UI state modules.
- [ ] T014 Build the missing admin surface at `web/src/app/admin/**` for services, products, portfolio, orders, appointments, inquiries, and analytics.

### Phase P3 — Backend & API Implementation
- [ ] T015 Create the shared server domain and data access layer under `web/src/server/**` for services, products, orders, appointments, inquiries, conversations, and users.
- [ ] T016 Implement public read APIs at:
	- `web/src/app/api/v1/services/route.ts`
	- `web/src/app/api/v1/services/[serviceId]/route.ts`
	- `web/src/app/api/v1/portfolio/route.ts`
	- `web/src/app/api/v1/portfolio/[slug]/route.ts`
	- `web/src/app/api/v1/shop/categories/route.ts`
	- `web/src/app/api/v1/shop/products/route.ts`
	- `web/src/app/api/v1/shop/products/[productSlug]/route.ts`
- [ ] T017 Implement conversion APIs at:
	- `web/src/app/api/v1/contact/route.ts`
	- `web/src/app/api/v1/appointments/route.ts`
	- `web/src/app/api/v1/appointments/[appointmentId]/route.ts`
	- `web/src/app/api/v1/ai-concierge/route.ts`
	- `web/src/app/api/v1/chat/start/route.ts`
- [ ] T018 Implement commerce APIs at:
	- `web/src/app/api/v1/orders/route.ts`
	- `web/src/app/api/v1/orders/[orderId]/route.ts`
	- `web/src/app/api/v1/orders/[orderId]/download/route.ts`
- [ ] T019 Implement subscriber and admin APIs plus auth enforcement at:
	- `web/src/app/api/v1/me/route.ts`
	- `web/src/app/api/v1/me/update/route.ts`
	- `web/src/app/api/v1/me/orders/route.ts`
	- `web/src/app/api/v1/me/appointments/route.ts`
	- `web/src/app/api/v1/admin/**`
	- `web/src/middleware.ts`
	- `web/src/server/auth/**`

### Phase P4 — Security Hardening
- [ ] T020 Implement secure auth, session, and RBAC enforcement in `web/src/middleware.ts`, `web/src/server/auth/**`, and `web/src/server/policies/**`.
- [ ] T021 Implement request validation, audit logging, and request IDs in `web/src/server/validation/**`, `web/src/server/logging/**`, and `web/src/app/api/**`.
- [ ] T022 Add runtime environment validation and secret separation in `.env.example`, `web/src/server/config/**`, and integration-specific config modules.
- [ ] T023 Add rate limiting, CSRF/XSS protection, and abuse controls for public forms and auth-sensitive routes.

### Phase P5 — DevOps, Deployment & Reliability
- [ ] T024 Fix production deployment configuration by aligning:
	- `package.json`
	- `web/package.json`
	- `vercel.json` (if used)
	- Vercel project root, install command, and build command settings
- [ ] T025 Add CI workflow automation in `.github/workflows/ci.yml` for lint, build, and test execution.
- [ ] T026 Add environment and deployment runbook assets in `.env.example`, `README.md`, and `DOC/PROJECT PLAN/DevOps/README.md`.
- [ ] T027 Add infrastructure/runtime assets in `infra/**` if the project moves beyond pure Vercel-hosted frontend deployment.
- [ ] T028 Add production observability and error reporting hooks for frontend and backend runtime.

### Phase P6 — QA & Release Gates
- [ ] T029 Add unit tests for UI, content utilities, and helpers in `web/src/**/*.test.ts(x)`.
- [ ] T030 Add API and integration tests in `web/tests/integration/**` or equivalent.
- [ ] T031 Add end-to-end coverage for checkout, booking, contact, and admin in `tests/e2e/**` or the project Playwright suite.
- [ ] T032 Add accessibility, performance, and security validation automation before release.
- [ ] T033 Run full release-gate validation against the QA, Security, and DevOps documents and record the outcome in this tracker.

## What Is Done Already
- The public-facing design system, layout shell, and route scaffolding are built.
- The main marketing, services, blog, proof, and legal surfaces exist in code.
- The shop browsing and product preview experience exists in code.
- Local build and lint entrypoints exist through the root and `web/` package scripts.

## What Is Next To Build
1. T013-T019: implement the real backend and API layer so the current UI stops depending on placeholders or local-only mocks.
2. T024: fix the production deployment configuration that is currently blocking Vercel release.
3. T020-T023: add security enforcement around auth, validation, secrets, logging, and abuse prevention.
4. T029-T033: add QA automation and release evidence before pointing the Namecheap domain to production.

## Release Readiness Checklist
- [ ] Production build passes in Vercel.
- [ ] Contact form persists inquiries through a real API.
- [ ] Booking flow is connected to a real calendar or inquiry backend.
- [ ] Checkout is connected to a real order and payment backend.
- [ ] AI concierge and live chat have real server-backed behavior or are explicitly removed from navigation.
- [ ] Auth, RBAC, and admin management exist for protected flows.
- [ ] CI, tests, and release gates are passing.
- [ ] Security and compliance controls are implemented beyond documentation.

## Tracker Maintenance Rule
- Update this file before starting a new phase, after completing a task, and whenever implementation diverges from the documented contract.
- Never mark a task as done unless code evidence exists and the relevant validation step has been completed.
