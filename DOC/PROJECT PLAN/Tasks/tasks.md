---
document_type: execution-tracker
human_index: true
machine_readable: true
tracker_version: 1
canonical_ai_entrypoint: ai-context.yaml
canonical_template: DOC/Universal/Template/tasks-template.md
last_audit_date: 2026-04-21
current_state:
  repo_branch_audited: main
  frontend_shell: done
  frontend_routes: mostly_done
  frontend_conversion_integrations: partial
  backend_phase_deferred: true
  development_frontend_deployable: true
  backend_implementation: partial
  api_implementation: partial
  security_implementation: not_started
  devops_implementation: partial
  qa_implementation: not_started
  deployable: false
release_blockers:
  - Full integrated production release is blocked because backend and API work remain deferred.
  - Booking and checkout routes are still placeholders rather than real integrated flows.
  - The contact form is UI-only and does not submit to a persisted backend endpoint.
  - The AI concierge is now backed by current site content, but it still lacks conversation persistence, broader knowledge ingestion, live-chat escalation, and abuse controls.
  - Production observability and runtime asset hardening are still not implemented.
phase_sequence:
  - P0-documentation-tracking-alignment
  - P1-frontend-foundation
  - P2-frontend-surface-implementation
  - P3-backend-api-implementation
  - P4-security-hardening
  - P5-devops-release-readiness
  - P6-qa-release-gates
next_recommended_phase: P2-frontend-surface-implementation
next_recommended_tasks:
  - T012
  - T017
  - T022
  - T023
phase_status_counts:
  done: 2
  partial: 3
  blocked: 0
  not_started: 2
task_status_counts:
  done: 13
  partial: 2
  blocked: 0
  not_started: 18
---

# Tasks / Execution Tracker

## Audit Snapshot
- Audit basis:
	- DOC/PROJECT PLAN/ai-context.yaml
	- DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml
	- DOC/PROJECT PLAN/*/README.md
  - current `web/` codebase on `Complete_Execution`
- Active implementation session:
  - improved the popup-first AI concierge mobile experience so the modal behaves like a full-height app-style chat sheet with cleaner message flow, safe-area spacing, and dock-aware behavior on phones
  - improved the blog detail route so the slug page now collapses share and navigation utilities cleanly, adds generated on-page navigation, and keeps long-form reading and comments readable across mobile breakpoints
- Working conclusion:
	- the documented frontend surface is largely implemented
	- the documented backend, API, Security, DevOps, and QA phases are still mostly documentation-only, though the AI concierge now has an initial server-backed slice
  - frontend-only development deployment is now configured, but full integrated release is still blocked by deferred backend and remaining release-engineering gaps
  - the AI concierge entry points now open a shared popup chat surface backed by `/api/v1/ai-concierge`, while the dedicated `/ai-concierge` route remains available as a secondary full-page view

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
    status: partial
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
| P2 | partial | Marketing, blog, proof, and shop preview surfaces exist, including live Google review proof; AI chat now has modal-first activation, but contact persistence plus booking and checkout integrations remain incomplete. |
| P3 | partial | The AI concierge route handler exists, but the broader backend domain and remaining API surface are still not implemented. |
| P4 | not_started | Security rules exist in docs only; auth, audit, validation, and abuse controls are not implemented. |
| P5 | partial | Development deployment baseline, CI, and runbook assets now exist, but observability and broader runtime hardening are still pending. |
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
  - Current state: `/ai-concierge` is now a real chat interface, but `/book-appointment` and `/checkout` still render `ComingSoon` placeholders.
  - AI concierge implementation note: the homepage CTA, floating launcher, header chat utility, FAQ/contact shortcuts, and mobile bottom nav now open the shared popup chat interface in place; `/ai-concierge` remains available as the dedicated full chat route.
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
  - AI concierge implementation note: `POST /api/v1/ai-concierge` now exists as a grounded OpenAI-backed endpoint that answers only from curated Growrix content, returns source metadata, normalizes model success states to the contract response model, uses the live page path as request context, and falls back to `no_answer` plus escalation when the knowledge base does not support the request.
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
  - AI concierge implementation note: include server-only validation for `OPENAI_API_KEY`, model identifier, knowledge snapshot version, and any assistant feature flags or rate-limit settings.
- [ ] T023 Add rate limiting, CSRF/XSS protection, and abuse controls for public forms and auth-sensitive routes.
  - AI concierge implementation note: protect the concierge endpoint with per-IP and per-session request throttles, payload length limits, bot-abuse checks, and safe logging that excludes raw secrets.

### Phase P5 — DevOps, Deployment & Reliability
- [x] T024 Fix production deployment configuration by aligning:
	- `package.json`
	- `web/package.json`
	- `vercel.json` (if used)
	- Vercel project root, install command, and build command settings
- [x] T025 Add CI workflow automation in `.github/workflows/ci.yml` for lint, build, and test execution.
- [x] T026 Add environment and deployment runbook assets in `.env.example`, `README.md`, and `DOC/PROJECT PLAN/DevOps/README.md`.
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
- Shared trust sections can now pull live Google Business reviews through the frontend Google Maps integration.
- The shop browsing and product preview experience exists in code.
- The AI concierge route now renders a real chat UI and the site includes a first server-backed `/api/v1/ai-concierge` endpoint grounded in current website content only.
- The AI concierge answer pipeline now correctly treats model success replies as grounded answers and preserves live page context for popup and route-based chat requests.
- The mobile AI concierge popup now uses a cleaner app-style sheet layout, hides the mobile dock while open, and keeps prompts, messages, and composer spacing responsive without route-specific hardcoding.
- The blog detail surface now derives on-page navigation from article headings, uses a cleaner one-column mobile reading flow, and shares improved article, share-rail, and comment responsiveness across slugs.
- Local build and lint entrypoints exist through the root and `web/` package scripts.
- The repository now includes a frontend-only Vercel deployment baseline, CI lint/build workflow, and documented environment setup.

## What Is Next To Build
1. T012: finish the remaining placeholder conversion routes for booking and checkout.
2. T017 + T013: add contact persistence, live-chat entry, and the rest of the conversion API surface around the concierge.
3. T022 + T023: add stronger OpenAI runtime validation, rate limiting, abuse controls, and safe operational logging around the assistant.
4. T028-T033: add observability, automated validation, and release evidence before promoting the assistant publicly.

## Release Readiness Checklist
- [ ] Local production build passes; current validation is blocked in this environment because Next.js cannot fetch the configured Google fonts through Turbopack.
- [ ] Vercel development deployment is verified on the live project.
- [ ] Contact form persists inquiries through a real API.
- [ ] Booking flow is connected to a real calendar or inquiry backend.
- [ ] Checkout is connected to a real order and payment backend.
- [ ] AI concierge and live chat have real server-backed behavior, with the concierge restricted to approved internal knowledge and explicit escalation when no grounded answer exists.
- [ ] Auth, RBAC, and admin management exist for protected flows.
- [ ] CI, tests, and release gates are passing.
- [ ] Security and compliance controls are implemented beyond documentation.

## Tracker Maintenance Rule
- Update this file before starting a new phase, after completing a task, and whenever implementation diverges from the documented contract.
- Never mark a task as done unless code evidence exists and the relevant validation step has been completed.
