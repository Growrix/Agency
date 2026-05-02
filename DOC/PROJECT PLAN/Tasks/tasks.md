---
document_type: execution-tracker
human_index: true
machine_readable: true
tracker_version: 1
canonical_ai_entrypoint: ai-context.yaml
canonical_template: DOC/Universal/Template/tasks-template.md
last_audit_date: 2026-05-03
current_state:
  repo_branch_audited: BOT
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
  - Full integrated production release is still blocked by external integrations and content-operations rollout work intentionally deferred in this phase (Stripe live go-live/fulfillment asset pipeline, calendar synchronization, and the now-documented CMS/content operations implementation plan).
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
  - P7-admin-dashboard-e2e-expansion
  - P8-frontend-cms-content-operations
next_recommended_phase: P8-frontend-cms-content-operations
next_recommended_tasks:
  - T041
  - T042
  - T043
  - T044
phase_status_counts:
  done: 4
  partial: 5
  blocked: 0
  not_started: 0
task_status_counts:
  done: 29
  partial: 7
  blocked: 0
  not_started: 8
---

# Tasks / Execution Tracker

## Audit Snapshot
- Audit basis:
	- DOC/PROJECT PLAN/ai-context.yaml
	- DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md
	- DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml
	- DOC/PROJECT PLAN/*/README.md
  - current `web/` codebase on `CMS`
- Active tracked sessions:
  - identified and fixed stale production homepage catalog cards after Sanity deletions by correcting webhook revalidation coverage: `shopItem`, `caseStudy`, `blogPost`, and `servicePage` now revalidate `/` in addition to their detail/index routes so home sections invalidate alongside shop/portfolio/blog/service updates
  - removed remaining Tailwind canonical utility warnings in portfolio slug/card surfaces by normalizing alpha and spacing utility syntax (`bg-primary/5`, `bg-primary/4`, `min-h-52.5`), then revalidated lint, typecheck, unit/integration tests, production build, and targeted cross-device portfolio E2E to restore zero-warning gate expectations
  - resolved Sanity Studio missing-key edit blockers for object-array fields by adding importer `_key` generation, shipping a one-time maintenance script (`cms:fix-array-keys`) for existing `shopItem`/`caseStudy` documents, and redesigning shop slug-page `Key features` into an Envato-style checklist layout aligned with `Files and delivery scope` while upgrading shop-item authoring guidance for deeper end-to-end feature detail
  - removed the case-study slug-page fallback counter strip, redesigned delivery/build cards with stronger heading hierarchy plus icon-led visual anchors, made case-study primary metric optional across Studio schema/import pipeline/rendering, and updated template/default content language to avoid relaunch/rebuild phrasing in favor of delivered-build framing
  - completed CMS text-only content-automation hardening by stripping/ignoring importer media fields, adding UUID-safe slug upsert behavior, extending shop schema/model/query support for feature/scope/enhancement fields, simplifying shop slug IA to Envato-style non-duplicative sections, aligning portfolio slug content emphasis to stacks/integrations, and importing fresh shop and portfolio records that render without image assignments
  - resolved operator confusion around dry-run vs live-write by creating three truly new Sanity documents via authenticated CLI (`caseStudy.three-circles-relaunch-2026`, `shopItem.commodity-website-pro-2026`, `blogPost.relaunching-service-websites-with-a-cms-first-workflow-2026`) with seeded image references so they appear immediately in Studio for final manual image replacement
  - prepared three production-ready CMS import payloads in `web/content-import/inbox` (portfolio three-circles redo, shop commodity-website redo, and a new blog post), validated batch dry-run mapping, and confirmed live write is currently blocked until `SANITY_API_TOKEN` is provided in the terminal environment
  - hardened Sanity-to-live publish reliability for blog content by adding ISR revalidation on blog index/detail routes, extending `/api/revalidate` to accept both query-param and JSON webhook payload document types, increasing Sanity client timeout for production reliability, and replacing silent Sanity fetch failures with explicit server logs for faster incident diagnosis
  - refreshed the repository AI memory baseline after full-site content updates by creating `memories/repo/site-brain.md` with live route/API/CMS/runtime snapshots and wiring the project-plan root docs to use it as a first-class memory input for future sessions
  - remediated Sanity Studio Vercel warning surface by aligning `studio` React dependencies to 19.2.5 (matching current Sanity peer expectations), validating a clean Studio production build, and documenting required Vercel Node runtime setting (`20.x`) plus known transitive `EBADENGINE` warning behavior from Sanity CLI packages
  - refined CMS-driven portfolio presentation quality by removing homepage portfolio card zoom/crop behavior, prioritizing slug-page hero image rendering with gallery fallback to hero media when gallery entries are missing, and moving the live-site CTA below the media card with an external-link affordance
  - removed placeholder `new-product` leakage from public shop output by enforcing CMS-first public catalog selection and filtering admin placeholder records from shop/portfolio surfaces, then switched homepage featured shop/portfolio sections to shared preview-capable cards and updated commerce E2E fixtures to consume live CMS slugs
  - hardened the planner agent, planning template, execution constitution, and root project-plan routing so every cross-role planning request must materialize a canonical `DOC/PROJECT PLAN/` artifact before `Tasks/tasks.md` is updated or a plan is treated as complete
  - created the canonical root planning artifact `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md` for the CMS/content-operations rollout, covering content ownership, Sanity structure, data boundaries, operator workflow, integrations, phase sequencing, backlog, and validation gates without starting implementation
  - hardened local development startup by replacing the raw `next dev` script with a wrapper that enforces Node 20 through `fnm`, automatically restarts stale same-workspace Next.js processes still holding port `5000`, and falls back to the next free local port when another application owns the default port
  - fixed the noisy local `next build` SWC warnings by removing the corrupted `@next/swc-win32-x64-msvc` install from `web/node_modules`, reinstalling dependencies, confirming the native binding loads cleanly again, adding local Node 20 guard files plus strict engine enforcement so future installs do not drift back onto an unsupported major runtime, and isolating unit-test data directories so the file-backed store no longer races across parallel test files
  - revised the about route after the first redesign overshot: restored the original page structure, kept the existing team/process/philosophy sections, and replaced the heavy third-person layout with three lighter first-person founder sections anchored by the optimized portrait
  - redesigned the about route around Nayeem's founder story, replaced the stock hero with an optimized real portrait, and expanded the page with journey, operating model, and collaboration sections
  - stabilized main-branch local development startup by switching the Next.js dev script to Webpack mode after Turbopack failed on this Windows environment due to unavailable native bindings, and removed an accidental root lockfile that created extra workspace-root warnings
  - stabilized the remaining local release gates by routing the Next.js build script through Webpack as well, and removed the shared route transition wrapper after booking-page navigation intermittently surfaced a React unmounted-update warning and transient JSON parse overlay during first-load E2E runs
  - removed a booking-form hydration mismatch caused by SSR time-derived minimum-slot values, hardened JS-dependent booking and live-chat forms against pre-hydration native submits, and moved local unit/integration execution to `tsx --test` after Windows-specific Vitest rolldown/native-binding failures prevented clean release-gate runs
  - rebuilt the admin dashboard shell into a strict two-row app layout so the transparent header and sidebar never overlap, added reusable dashboard header controls (theme toggle reuse + notification/profile popovers), and anchored utility actions (including logout) to the sidebar bottom
  - introduced a reusable dashboard shell component with collapsible sidebar behavior, responsive mobile drawer navigation, and shared dashboard layout tokens, then refactored admin routes to run inside that shell for future multi-tenant reuse
  - replaced the admin sidebar with a fixed-on-desktop layout using shared CSS offset/width settings so the sidebar no longer scrolls with page content, and simplified the sidebar heading copy to "Admin Dashboard" only
  - refined sticky sidebar behavior by aligning admin section top spacing with a shared sidebar offset setting so sticky engages immediately and no initial sidebar/page co-scroll phase is visible
  - identified a sticky gating bug where sidebar stickiness was restricted to `lg:` breakpoints, causing non-sticky behavior on smaller effective viewport widths (including zoomed desktop); fixed by applying sticky classes without breakpoint gating
  - identified the sticky-sidebar root cause as sticky classes attached to the transform-enabled Card primitive (`will-change-transform`), and corrected by moving sticky positioning back to a plain aside wrapper
  - corrected the admin sticky-sidebar implementation by applying sticky positioning to the sidebar card itself (not just the wrapper) to avoid grid-flow release behavior during deep catalog scrolling
  - fixed a sticky-sidebar regression in admin routes by removing internal sidebar overflow scrolling so the sidebar remains fixed while page content scrolls
  - hardened admin sidebar stickiness for desktop route pages by using a grid items-start layout and viewport-bounded sticky sidebar behavior
  - made the admin dashboard sidebar sticky across the admin route pages and adjusted related E2E coverage to align with current contact, booking, checkout, and accessibility behaviors
  - converted the admin sidebar from single-page anchor scrolling to route-based navigation so overview, activity, catalog management, and pipeline now open as dedicated admin dashboard routes
  - merged Growrix Strict Executor rules into universal docs: strict 8-step execution workflow, tool discipline, zero-gate pass rule, local commit discipline, design-system-first and mobile-first frontend constraints, and standardised output format are now reflected in ai-collaboration-playbook.md, development-standards.md, and contribution-guide.md with machine-readable routing updated in ai-context.yaml
  - added a universal Enterprise Testing and Quality Enforcement (v2) protocol document and wired it into universal handbook indexes plus machine-readable ai-context routing for release and QA work
  - fixed admin login 500 failures caused by Supabase `app_state` read/write errors by adding graceful fallback to local file-backed persistence in the shared data store
  - replaced the booking page's fixed slot dropdown with native date and time controls so appointment requests are chosen from calendar-style inputs instead of a prebuilt list
  - updated the homepage hero proof line and animated marquee to feature framework, language, infrastructure, and integration names instead of the previous client-name text
  - fixed a mobile concierge runtime crash by replacing direct client `crypto.randomUUID()` calls with a browser-safe message ID fallback for older or restricted mobile environments
  - fixed mobile LAN dev access for the AI concierge by replacing the stale hardcoded Next.js dev origin IP with dynamic local IPv4 detection and development websocket allowance
  - fixed a mobile concierge regression by restoring popup overlay stacking above the fixed bottom dock so the chat opens visibly from the mobile chat shortcut
  - restored mobile footer bottom-safe spacing so the copyright strip clears the fixed dock instead of being hidden behind it
  - converted the homepage hero from a two-column composition to a centered single-column layout and removed the legacy mockup/image column so the hero aligns with topbar/header rhythm
  - redesigned the admin workspace into a sidebar-driven dashboard layout and removed public-site chrome from `/admin` routes so operators get a dedicated back-to-site control inside the dashboard
  - improved the popup-first AI concierge mobile experience so the modal now behaves like a phone-first single-column chat sheet with no desktop escalation rail, a stacked composer, and a consistently visible send action on small screens
  - fixed concierge suggested-action navigation so WhatsApp, booking, contact, and other routed suggestions now close the popup immediately and reveal the destination without requiring manual chat close
  - improved the blog detail route so the slug page now collapses share and navigation utilities cleanly, adds generated on-page navigation, and keeps long-form reading and comments readable across mobile breakpoints
  - redesigning the shop index into a denser e-commerce catalog focused on website templates and ready-made websites only, with category, type, and industry organization plus direct checkout actions from every published listing
  - realigning the site's marketing copy around premium websites, SaaS applications, mobile app launch work, and ready websites as the primary offer, while keeping MCP servers and automation as secondary services
  - added a shared file-backed server persistence layer for inquiries, appointments, conversations, orders, users, analytics events, and audit logs under `web/src/server/**`
  - connected the public contact, booking, checkout, and concierge flows to versioned server APIs with request validation, request IDs, rate limiting, honeypot abuse checks, analytics events, and audit logging
  - implemented a seeded-admin JWT auth flow with protected admin and `/api/v1/me` reads, and moved the route guard to the Next.js 16 `proxy.ts` entrypoint
  - replaced the placeholder booking and checkout routes with real server-backed forms, added a protected admin login/dashboard route, and introduced integration tests for contact, booking, checkout, and concierge flows
  - fixed legal contact accuracy across the remaining user-facing admin/profile fallback copy by routing contact email to `admin@growrixos.com`, strengthened shared checkout/form placeholder visibility with broader base placeholder and autofill styling, and hardened `/shop/[slug]` plus preview surfaces with min-width and wrap controls so mobile layouts do not overflow across desktop, tablet, or phone viewport tests
  - reran the release pipeline on a clean production server instance and confirmed lint, typecheck, build, unit, integration, accessibility smoke, security header/auth checks, performance smoke, and full Playwright desktop/tablet/mobile coverage pass when executed serially in this Windows workspace
  - added an "Additional Services" section (SEO & Visibility Setup, Tracking & Analytics, Technical SEO) as a shared component rendered on the homepage after the Capability Rail and on the services overview page before the CTABand, with all bullet items, footer disclaimer, and a CTA link to the new dedicated page
  - created the `/additional-services` dedicated page with a full 7-section design: hero, category card grid (3 columns desktop/1 mobile), why-it-matters value strip, delivery model two-panel (included vs not-included), 4-step process, FAQ accordion, and CTA band; added page-plan doc, updated Frontend ai-context.yaml route registry, updated PRIMARY_NAV Services dropdown and FOOTER_NAV Services column in nav.ts
- Working conclusion:
	- the documented frontend surface is largely implemented
  - the documented backend, API, Security, and QA phases now each have a first real implementation slice, though full production hardening is still pending
  - the planner workflow is now documentation-first at the root level: canonical end-to-end plans must exist in `DOC/PROJECT PLAN/` before tracker updates or later implementation routing
  - the CMS/content-operations expansion is now canonically planned in `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`, but implementation has not started in this slice
  - frontend-only development deployment is now configured, but full integrated release is still blocked by deferred backend and remaining release-engineering gaps
  - the AI concierge entry points now open a shared popup chat surface backed by `/api/v1/ai-concierge`, while the dedicated `/ai-concierge` route remains available as a secondary full-page view
  - concierge popup behavior now auto-closes on route changes and action-link clicks so conversion routes appear immediately after suggestion taps
  - the shop is being repositioned as a website-product storefront; MCP and automation offers should remain outside the active shop catalog until the commerce strategy expands again
  - current content work should stay text-only and documentation-first: no route logic changes, only copy, pricing language, FAQs, and related positioning updates
  - adjusted the shared StatBlock section to use the global Container width for consistent sizing across routes, and moved the about-page stack marquee to follow the process section
  - identified the Version_3 Vercel install failure root cause as Windows-only native binaries being declared as direct web dependencies, removed those direct pins, refreshed the lockfile, and verified the branch still passes lint, unit, integration, and build gates
  - identified and fixed the CMS branch Vercel build blocker as a Sanity client typing misuse (`timeout` passed as a GROQ params field), removed the invalid query param to restore typecheck compatibility, and aligned GitHub Actions Node to 20 to match local/Vercel runtime expectations
  - audited recurring Vercel Node-engine warnings and normalized root/web `engines.node` from strict `20.x` to `>=20 <25` so the project setting `24.x` no longer conflicts while local Node 20 remains supported
  - codified Sanity Studio best-practice rules across universal and project docs so AI must treat Studio as an isolated app with Node 20, its own lockfile/install flow/CI/deploy, and a separate CMS domain rather than coupling it to the public web lifecycle
  - implemented the Studio isolation baseline in code by removing root-level Studio script coupling, adding Studio-local runtime files and agent guidance, generating a dedicated `studio/package-lock.json`, adding a separate Studio CI workflow and Vercel config, and verifying both `web` and `studio` production builds pass under Node 20
  - hardened Studio local startup to a reliable one-command flow by replacing direct `sanity dev` with a Node-20 enforcing bootstrap runner that self-checks required dependencies and launches Sanity through `npm exec` for Windows-safe execution
  - moved the shop and portfolio surfaces further into the CMS-first path by removing legacy mock catalog dependence from homepage, services, checkout, orders, concierge knowledge, and portfolio/shop detail flows; added richer case-study authoring fields plus live/embedded preview URL support; and updated tests/templates for managed catalog records instead of static mock slugs

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
  - id: P7
    name: Admin Dashboard E2E Expansion
    status: partial
  - id: P8
    name: Frontend CMS Content Operations
    status: partial
```

## Phase Overview
| Phase | Status | Summary |
| --- | --- | --- |
| P0 | done | Task tracking, documentation alignment, and the root planning-artifact contract are established. |
| P1 | done | Workspace, shell, primitives, theme system, and styling foundation are built. |
| P2 | done | Marketing, blog, proof, shop, booking, checkout, concierge, live-chat, and admin surface routes are implemented and connected to live backend flows. |
| P3 | partial | Public read APIs and managed catalog persistence are now implemented, while commerce fulfillment and richer ownership policy coverage remain partially complete. |
| P4 | partial | JWT admin auth, proxy-based protection, request validation, audit logging, and in-memory abuse controls now exist, but broader RBAC and production-grade security hardening remain incomplete. |
| P5 | partial | Runtime hardening headers, health/readiness probes, and client error capture hooks now exist; infrastructure-as-code and external monitoring stack are still pending. |
| P6 | done | Unit, integration, and browser E2E gates now run with accessibility/security/performance smoke checks and full release-gate execution evidence. |
| P7 | partial | The CMS/content-operations and admin information architecture is now documented, while implementation for production-grade shop, portfolio, newsletter, and submissions operations remains ahead. |
| P8 | partial | Shop and portfolio surfaces are now being moved to Sanity-backed loaders and CMS-authored preview metadata, while draft preview and broader route migration remain incomplete. |

## Tasks By Phase

### Phase P0 — Documentation Tracking Alignment
- [x] T001 Create and maintain the canonical execution tracker at `DOC/PROJECT PLAN/Tasks/tasks.md`.
- [x] T002 Add a machine-readable entrypoint and human index at `DOC/PROJECT PLAN/Tasks/ai-context.yaml` and `DOC/PROJECT PLAN/Tasks/README.md`.
- [x] T003 Align root planning docs so `DOC/PROJECT PLAN/ai-context.yaml` and `DOC/PROJECT PLAN/README.md` reference the Tasks layer.
- [x] T004 Align shared contract route maps with the implemented frontend route plan in `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml` and `DOC/PROJECT PLAN/Shared Contracts/README.md`.
- [x] T039 Harden the planner agent, planning template, execution constitution, and root project-plan routing so end-to-end planning always materializes a canonical artifact under `DOC/PROJECT PLAN/` before `Tasks/tasks.md` is updated.
- [x] T040 Create the canonical CMS/content-operations planning artifact at `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`, create the downstream role-specific planning docs in Frontend, API and Data, Admin Dashboard, and Security, and align the project-plan docs to reference them.

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

### Phase P7 — Admin Dashboard E2E Expansion (Fresh)
- [x] T034 Define and document the canonical CMS/content-operations information architecture, module boundaries, and route map for Shop Management, Portfolio Management, Newsletter Operations, and Submissions Inbox surfaces in `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`.
- [~] T035 Implement production-grade backend contracts for Sanity-backed shop and portfolio admin CRUD, publish/unpublish controls, and media lifecycle handling.
- [ ] T036 Implement operational records surfaces and APIs for newsletter subscribers, contact inquiries, and booking submissions with status workflow, assignment, notes, and unsubscribe/send-log handling.
- [ ] T037 Harden admin authorization, role policies, preview secret handling, webhook authentication, and auditability for all admin mutations and sensitive reads.
- [ ] T038 Add admin-focused validation gates (unit, integration, e2e, accessibility, security, regression) and release-readiness criteria for dashboard rollout.

### Phase P8 — Frontend CMS Content Operations
- [~] T041 Implement Sanity-backed typed loaders with static fallbacks for `web/src/app/portfolio/**`, `web/src/app/shop/**`, `web/src/app/services/**`, `web/src/app/page.tsx`, `web/src/app/about/page.tsx`, and `web/src/app/faq/page.tsx`.
- [~] T042 Add Sanity schema coverage and normalized view-model mappers for case studies, shop items/categories, service pages, FAQ items, home page, about page, and site settings in `studio/schemaTypes/**` and `web/src/server/sanity/**`.
- [ ] T043 Implement authenticated draft-mode preview and exact-path revalidation for migrated frontend surfaces in `web/src/app/api/**` and supporting server helpers.
- [ ] T044 Add frontend CMS validation coverage across unit, integration, and e2e gates for migrated routes, preview, and fallback behavior.

## What Is Done Already
- The public-facing design system, layout shell, and route scaffolding are built.
- The main marketing, services, blog, proof, and legal surfaces exist in code.
- Shared trust sections can now pull live Google Business reviews through the frontend Google Maps integration.
- The shop browsing and product preview experience exists in code.
- The AI concierge route now renders a real chat UI and the site includes a first server-backed `/api/v1/ai-concierge` endpoint grounded in current website content only.
- The AI concierge answer pipeline now correctly treats model success replies as grounded answers and preserves live page context for popup and route-based chat requests.
- The client concierge now uses a browser-safe local message ID fallback so starter prompts and manual sends do not crash on mobile browsers that lack `crypto.randomUUID()`.
- The homepage hero proof line and marquee now foreground stack, language, infrastructure, and integration names such as Next.js, React, Python, Django, Supabase, Stripe, and OpenAI instead of repeating client names.
- The booking surface now uses native date and time controls with a selected-slot preview instead of a fixed generated slot dropdown, while still submitting the same `preferred_datetime` API contract.
- Auth and related server flows now gracefully fall back to local file-backed persistence when Supabase `app_state` reads/writes fail, avoiding hard 500 errors during admin sign-in.
- The mobile AI concierge popup now uses a cleaner app-style sheet layout, stacks above the fixed mobile dock, hides that dock while open, removes the desktop escalation rail on small screens, and keeps prompts, messages, and the send action responsive without route-specific hardcoding.
- The Next.js development config now auto-allows active local IPv4 origins and development websocket connections so mobile devices on the same LAN receive hydrated interactive behavior instead of dead chat triggers.
- The mobile footer now preserves enough bottom-safe spacing for the copyright strip to remain visible above the fixed dock.
- The blog detail surface now derives on-page navigation from article headings, uses a cleaner one-column mobile reading flow, and shares improved article, share-rail, and comment responsiveness across slugs.
- Blog routes now support Sanity CMS as an optional primary source, with automatic fallback to local static blog content when Sanity is not configured or unavailable.
- The contact form now persists inquiries through `/api/v1/contact`, records analytics/audit events, and exposes protected admin visibility.
- The booking route now persists real appointment requests through `/api/v1/appointments` instead of showing a placeholder.
- The checkout route now creates persisted orders and hands off to Stripe when configured, with a webhook endpoint and fallback manual delivery summary.
- Seeded admin auth, protected `/admin` routes, and `/api/v1/me` plus `/api/v1/admin/**` reads now exist behind JWT cookie sessions.
- Admin sidebar navigation now uses route-based pages (`/admin`, `/admin/activity`, `/admin/catalog`, `/admin/pipeline`) instead of in-page anchor jumps.
- Admin dashboard sidebar now remains sticky while scrolling, and the full Playwright E2E suite is passing after updating booking date/time, checkout fallback/redirect handling, and accessibility smoke-test stability.
- Admin sidebar sticky behavior is now hardened for long admin pages with viewport-bounded sticky positioning and independent sidebar overflow handling on desktop.
- Admin sidebar no longer uses internal scrolling; sticky behavior now keeps the whole sidebar fixed while users scroll page content in long admin views.
- Sticky behavior is now attached to the actual sidebar panel element, preventing wrapper-level layout interactions from causing the sidebar to drift during long-page scroll.
- Sticky behavior is now anchored to a non-transform aside wrapper so Card animation/transform styles do not interfere with sticky positioning.
- Sticky behavior now applies at all viewport sizes for admin pages (`sticky top-4 self-start h-fit`), removing breakpoint-gated failures.
- Admin sticky offset is now controlled via a shared CSS variable and used consistently for both section top spacing and sticky top positioning, preventing apparent co-scrolling before sticky lock engages.
- Admin sidebar now uses a deterministic fixed desktop layout with configuration variables (`--admin-sidebar-top`, `--admin-sidebar-width`) so page content scroll never moves the sidebar panel.
- Supabase-backed auth and persistence adapters now exist and can be enabled by environment configuration without changing route contracts.
- Local API integration tests now cover contact, booking, checkout, and concierge persistence flows.
- Local build and lint entrypoints exist through the root and `web/` package scripts.
- The repository now includes a frontend-only Vercel deployment baseline, CI lint/build workflow, and documented environment setup.
- Universal handbook quality guidance now includes a dedicated Enterprise Testing and Quality Enforcement (v2) protocol, referenced by both human indexes and machine-readable ai-context files.
- The universal AI collaboration playbook, development standards, and contribution guide now reflect the strict execution workflow (doc-first, zero-gate pass, local commit discipline, design-system-first mobile frontend rules, and standardised output format).
- The planner agent, planning template, execution constitution, and root project-plan routing now require a canonical `DOC/PROJECT PLAN/` planning artifact before tracker updates.
- The CMS/content-operations rollout now has a canonical root planning artifact at `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`.
- The CMS/content-operations rollout now also has role-specific implementation-planning docs under `DOC/PROJECT PLAN/Frontend/`, `DOC/PROJECT PLAN/API and Data/`, `DOC/PROJECT PLAN/Admin Dashboard/`, and `DOC/PROJECT PLAN/Security/`.
- Shop CMS authoring now includes grouped editor fields, example-driven field labels, real preview URL support, real uploaded image rendering on shop surfaces, and project-specific content templates for shop items, blog posts, and case studies under `DOC/PROJECT PLAN/`.

## What Is Next To Build
Use `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md` plus the downstream role-specific CMS/content-operations docs as the canonical input for the remaining P7 execution work.

1. T035: ship production-grade Sanity-backed backend contracts for shop and portfolio admin CRUD, publish/unpublish controls, and media lifecycle handling.
2. T036: deliver an admin submissions and newsletter-operations stack for subscribers, contact inquiries, and booking requests with status workflow, assignment, notes, unsubscribe handling, and send logs.
3. T037: harden admin authorization, preview and webhook secret handling, and auditability for the new CMS and operator flows.
4. T038: enforce dedicated admin dashboard and CMS rollout release gates before migration completion.
5. T018: replace the temporary manual order delivery artifact with actual product fulfillment assets and production Stripe configuration.
6. T019 + T020: extend auth and RBAC beyond the current baseline into richer subscriber/customer ownership policy enforcement.
7. T027 + T028: add infrastructure-as-code plus external observability and alerting for expanded production operations.

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
