---
document_type: execution-tracker
human_index: true
machine_readable: true
tracker_version: 1
canonical_ai_entrypoint: ai-context.yaml
canonical_template: DOC/Universal/Template/tasks-template.md
last_audit_date: 2026-04-23
current_state:
  repo_branch_audited: main
  frontend_shell: done
  frontend_routes: done
  frontend_conversion_integrations: partial
  backend_phase_deferred: false
  development_frontend_deployable: true
  backend_implementation: mostly_done
  api_implementation: partial
  security_implementation: partial
  devops_implementation: partial
  qa_implementation: done
  deployable: false
release_blockers:
  - Full integrated production release is still blocked by external integrations intentionally deferred in this phase (Stripe live go-live/fulfillment asset pipeline, calendar synchronization, and optional CMS workflow).
  - Customer/subscriber RBAC and protected self-service ownership flows are implemented to a baseline level, but richer policy granularity remains a hardening follow-up.
  - Infrastructure-as-code and external monitoring/alerting stack work are still pending if deployment expands beyond frontend-hosted runtime.
phase_sequence:
  - P0-documentation-tracking-alignment
  - P1-frontend-foundation
  - P2-frontend-surface-implementation
  - P3-backend-api-implementation
  - P4-security-hardening
  - P5-devops-release-readiness
  - P6-qa-release-gates
next_recommended_phase: P5-devops-release-readiness
next_recommended_tasks:
  - T027
  - T028
  - T019
phase_status_counts:
  done: 4
  partial: 3
  blocked: 0
  not_started: 0
task_status_counts:
  done: 26
  partial: 6
  blocked: 0
  not_started: 1
---

# Tasks / Execution Tracker

## Audit Snapshot
- Audit basis:
	- DOC/PROJECT PLAN/ai-context.yaml
	- DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml
	- DOC/PROJECT PLAN/*/README.md
  - current `web/` codebase on `Complete_Execution`
- Active implementation session:
  - improved the popup-first AI concierge mobile experience so the modal now behaves like a phone-first single-column chat sheet with no desktop escalation rail, a stacked composer, and a consistently visible send action on small screens
  - fixed concierge suggested-action navigation so WhatsApp, booking, contact, and other routed suggestions now close the popup immediately and reveal the destination without requiring manual chat close
  - improved the blog detail route so the slug page now collapses share and navigation utilities cleanly, adds generated on-page navigation, and keeps long-form reading and comments readable across mobile breakpoints
  - redesigning the shop index into a denser e-commerce catalog focused on website templates and ready-made websites only, with category, type, and industry organization plus direct checkout actions from every published listing
  - realigning the site's marketing copy around premium websites, SaaS applications, mobile app launch work, and ready websites as the primary offer, while keeping MCP servers and automation as secondary services
  - added a shared file-backed server persistence layer for inquiries, appointments, conversations, orders, users, analytics events, and audit logs under `web/src/server/**`
  - connected the public contact, booking, checkout, and concierge flows to versioned server APIs with request validation, request IDs, rate limiting, honeypot abuse checks, analytics events, and audit logging
  - implemented a seeded-admin JWT auth flow with protected admin and `/api/v1/me` reads, and moved the route guard to the Next.js 16 `proxy.ts` entrypoint
  - replaced the placeholder booking and checkout routes with real server-backed forms, added a protected admin login/dashboard route, and introduced integration tests for contact, booking, checkout, and concierge flows
- Working conclusion:
	- the documented frontend surface is largely implemented
  - the documented backend, API, Security, and QA phases now each have a first real implementation slice, though full production hardening is still pending
  - frontend-only development deployment is now configured, but full integrated release is still blocked by deferred backend and remaining release-engineering gaps
  - the AI concierge entry points now open a shared popup chat surface backed by `/api/v1/ai-concierge`, while the dedicated `/ai-concierge` route remains available as a secondary full-page view
  - concierge popup behavior now auto-closes on route changes and action-link clicks so conversion routes appear immediately after suggestion taps
  - the shop is being repositioned as a website-product storefront; MCP and automation offers should remain outside the active shop catalog until the commerce strategy expands again
  - current content work should stay text-only and documentation-first: no route logic changes, only copy, pricing language, FAQs, and related positioning updates

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
    status: done
  - id: P3
    name: Backend API Implementation
    status: partial
  - id: P4
    name: Security Hardening
    status: partial
  - id: P5
    name: DevOps Release Readiness
    status: partial
  - id: P6
    name: QA Release Gates
    status: done
```

## Phase Overview
| Phase | Status | Summary |
| --- | --- | --- |
| P0 | done | Task tracking and documentation alignment established. |
| P1 | done | Workspace, shell, primitives, theme system, and styling foundation are built. |
| P2 | done | Marketing, blog, proof, shop, booking, checkout, concierge, live-chat, and admin surface routes are implemented and connected to live backend flows. |
| P3 | partial | Public read APIs and managed catalog persistence are now implemented, while commerce fulfillment and richer ownership policy coverage remain partially complete. |
| P4 | partial | JWT admin auth, proxy-based protection, request validation, audit logging, and in-memory abuse controls now exist, but broader RBAC and production-grade security hardening remain incomplete. |
| P5 | partial | Runtime hardening headers, health/readiness probes, and client error capture hooks now exist; infrastructure-as-code and external monitoring stack are still pending. |
| P6 | done | Unit, integration, and browser E2E gates now run with accessibility/security/performance smoke checks and full release-gate execution evidence. |

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
- [x] T011 Build the contact conversion flow in `web/src/app/contact/page.tsx` and connect it to `web/src/app/api/v1/contact/route.ts`.
- [x] T012 Replace placeholder conversion routes in `web/src/app/ai-concierge/page.tsx`, `web/src/app/book-appointment/page.tsx`, and `web/src/app/checkout/page.tsx` with real integrated flows.
  - AI concierge implementation note: the homepage CTA, floating launcher, header chat utility, FAQ/contact shortcuts, and mobile bottom nav now open the shared popup chat interface in place; `/ai-concierge` remains available as the dedicated full chat route.
- [x] T013 Build the missing live chat surface at `web/src/app/live-chat/page.tsx` and the supporting UI state modules.
- [x] T014 Build the missing admin surface at `web/src/app/admin/**` for services, products, portfolio, orders, appointments, inquiries, and analytics.
  - Current state: protected admin login plus a full operations workspace now supports analytics and managed CRUD updates for services, products, and portfolio alongside inquiry/appointment/order views.

### Phase P3 — Backend & API Implementation
- [x] T015 Create the shared server domain and data access layer under `web/src/server/**` for services, products, orders, appointments, inquiries, conversations, and users.
  - Current state: a persistent file-backed store now includes managed records for services, products, and portfolio projects in addition to orders, appointments, inquiries, conversations, analytics, audit logs, and users.
- [x] T016 Implement public read APIs at:
	- `web/src/app/api/v1/services/route.ts`
	- `web/src/app/api/v1/services/[serviceId]/route.ts`
	- `web/src/app/api/v1/portfolio/route.ts`
	- `web/src/app/api/v1/portfolio/[slug]/route.ts`
	- `web/src/app/api/v1/shop/categories/route.ts`
	- `web/src/app/api/v1/shop/products/route.ts`
	- `web/src/app/api/v1/shop/products/[productSlug]/route.ts`
- [x] T017 Implement conversion APIs at:
	- `web/src/app/api/v1/contact/route.ts`
	- `web/src/app/api/v1/appointments/route.ts`
	- `web/src/app/api/v1/appointments/[appointmentId]/route.ts`
	- `web/src/app/api/v1/ai-concierge/route.ts`
	- `web/src/app/api/v1/chat/start/route.ts`
  - AI concierge implementation note: `POST /api/v1/ai-concierge` now exists as a grounded OpenAI-backed endpoint that answers only from curated Growrix content, returns source metadata, normalizes model success states to the contract response model, uses the live page path as request context, and falls back to `no_answer` plus escalation when the knowledge base does not support the request.
- [~] T018 Implement commerce APIs at:
	- `web/src/app/api/v1/orders/route.ts`
	- `web/src/app/api/v1/orders/[orderId]/route.ts`
	- `web/src/app/api/v1/orders/[orderId]/download/route.ts`
  - Current state: persisted order creation, Stripe checkout handoff, status reads, manual summary download delivery, and webhook handling now exist; production fulfillment assets still need to replace the temporary download summary.
- [~] T019 Implement subscriber and admin APIs plus auth enforcement at:
	- `web/src/app/api/v1/me/route.ts`
	- `web/src/app/api/v1/me/update/route.ts`
	- `web/src/app/api/v1/me/orders/route.ts`
	- `web/src/app/api/v1/me/appointments/route.ts`
	- `web/src/app/api/v1/admin/**`
  - `web/src/proxy.ts`
	- `web/src/server/auth/**`
  - Current state: registration, login, `/api/v1/me`, `/api/v1/me/update`, `/api/v1/me/orders`, `/api/v1/me/appointments`, managed admin catalog endpoints, admin operational reads, and route protection now exist; deeper ownership policy hardening remains incomplete.

### Phase P4 — Security Hardening
- [~] T020 Implement secure auth, session, and RBAC enforcement in `web/src/proxy.ts`, `web/src/server/auth/**`, and `web/src/server/policies/**`.
- [~] T021 Implement request validation, audit logging, and request IDs in `web/src/server/validation/**`, `web/src/server/logging/**`, and `web/src/app/api/**`.
- [~] T022 Add runtime environment validation and secret separation in `.env.example`, `web/src/server/config/**`, and integration-specific config modules.
  - AI concierge implementation note: include server-only validation for `OPENAI_API_KEY`, model identifier, knowledge snapshot version, and any assistant feature flags or rate-limit settings.
- [x] T023 Add rate limiting, CSRF/XSS protection, and abuse controls for public forms and auth-sensitive routes.
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
- [~] T028 Add production observability and error reporting hooks for frontend and backend runtime.

### Phase P6 — QA & Release Gates
- [x] T029 Add unit tests for UI, content utilities, and helpers in `web/src/**/*.test.ts(x)`.
- [x] T030 Add API and integration tests in `web/tests/integration/**` or equivalent.
- [x] T031 Add end-to-end coverage for checkout, booking, contact, and admin in `tests/e2e/**` or the project Playwright suite.
- [x] T032 Add accessibility, performance, and security validation automation before release.
- [x] T033 Run full release-gate validation against the QA, Security, and DevOps documents and record the outcome in this tracker.

## What Is Done Already
- The public-facing design system, layout shell, and route scaffolding are built.
- The main marketing, services, blog, proof, and legal surfaces exist in code.
- Shared trust sections can now pull live Google Business reviews through the frontend Google Maps integration.
- The shop browsing and product preview experience exists in code.
- The AI concierge route now renders a real chat UI and the site includes a first server-backed `/api/v1/ai-concierge` endpoint grounded in current website content only.
- The AI concierge answer pipeline now correctly treats model success replies as grounded answers and preserves live page context for popup and route-based chat requests.
- The mobile AI concierge popup now uses a cleaner app-style sheet layout, hides the mobile dock while open, removes the desktop escalation rail on small screens, and keeps prompts, messages, and the send action responsive without route-specific hardcoding.
- The blog detail surface now derives on-page navigation from article headings, uses a cleaner one-column mobile reading flow, and shares improved article, share-rail, and comment responsiveness across slugs.
- Blog routes now support Sanity CMS as an optional primary source, with automatic fallback to local static blog content when Sanity is not configured or unavailable.
- The contact form now persists inquiries through `/api/v1/contact`, records analytics/audit events, and exposes protected admin visibility.
- The booking route now persists real appointment requests through `/api/v1/appointments` instead of showing a placeholder.
- The checkout route now creates persisted orders and hands off to Stripe when configured, with a webhook endpoint and fallback manual delivery summary.
- Seeded admin auth, protected `/admin` routes, and `/api/v1/me` plus `/api/v1/admin/**` reads now exist behind JWT cookie sessions.
- Supabase-backed auth and persistence adapters now exist and can be enabled by environment configuration without changing route contracts.
- Local API integration tests now cover contact, booking, checkout, and concierge persistence flows.
- Local build and lint entrypoints exist through the root and `web/` package scripts.
- The repository now includes a frontend-only Vercel deployment baseline, CI lint/build workflow, and documented environment setup.

## What Is Next To Build
1. T018: replace the temporary manual order delivery artifact with actual product fulfillment assets and production Stripe configuration.
2. T019 + T020: extend auth and RBAC beyond the current baseline into richer subscriber/customer ownership policy enforcement.
3. T027 + T028: add infrastructure-as-code plus external observability/alerting for expanded production operations.

## Release Readiness Checklist
- [x] Local production build passes.
- [ ] Vercel development deployment is verified on the live project.
- [x] Contact form persists inquiries through a real API.
- [x] Booking flow is connected to a real inquiry backend.
- [x] Checkout is connected to a real order and payment backend.
- [x] AI concierge and live chat have real server-backed behavior, with the concierge restricted to approved internal knowledge and explicit escalation when no grounded answer exists.
- [~] Auth, RBAC, and admin management exist for protected flows.
- [x] CI, tests, and release gates are passing.
- [ ] Security and compliance controls are implemented beyond documentation.

## Tracker Maintenance Rule
- Update this file before starting a new phase, after completing a task, and whenever implementation diverges from the documented contract.
- Never mark a task as done unless code evidence exists and the relevant validation step has been completed.
