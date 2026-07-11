# Ecommerce Preview Restoration and Blueprint Alignment E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: DOC/PROJECT PLAN/ecommerce-preview-restoration-e2e-plan.md
- Affected downstream role docs:
  - DOC/PROJECT PLAN/Frontend/ecommerce-preview-restoration-frontend.md
  - DOC/PROJECT PLAN/Backend/ecommerce-preview-restoration-backend.md
  - DOC/PROJECT PLAN/API and Data/ecommerce-preview-restoration-api-data.md
  - DOC/PROJECT PLAN/Admin Dashboard/ecommerce-preview-restoration-admin-dashboard.md
  - DOC/PROJECT PLAN/Security/ecommerce-preview-restoration-security.md
- Planning request source: 2026-07-11 operator request to restore full public preview and replan against shared ecommerce blueprint
- Planning mode: hybrid scale
- Status: active - planning complete, implementation pending
- Last updated: 2026-07-11

## 1. Planning Mode And Objective
- Planning mode: hybrid (scale existing implementation + targeted contract corrections)
- Why this mode fits the request:
  - The codebase already has mature ecommerce flows, preview APIs, signed download delivery, and admin/customer surfaces.
  - The preview redaction strategy was intentionally introduced and now must be selectively rolled back to match current business direction.
- Scope boundaries:
  - Restore full-site HTML preview behavior for website templates and html business profiles.
  - Keep paid delivery hardening (grant token, audit, fingerprint, throttling) as the primary protection layer.
  - Re-align active implementation phases with the shared ecommerce blueprint and execution tracker.
- Explicit non-goals:
  - No attempt to make browser preview fully uncopyable.
  - No greenfield replacement of catalog/order/download architecture.
  - No replatform away from Next.js/Sanity/Supabase.
- Current implementation compatibility requirements:
  - Preserve existing preview URLs and product preview components.
  - Preserve existing signed download delivery API contracts.
  - Preserve existing dashboard/admin route surfaces.

## 2. Current-State Audit

### Tracker Status
- Done:
  - P0, P1, P2, P6, P11 implementation tracks are already marked done in tracker baseline.
  - Security hardening slices are implemented for paid-download grant flow and auditability.
- Partial:
  - P3, P4, P5, P7, P8, P9, P10, and P20+ tracks remain partial or mixed.
  - Earlier template-theft phases 1-5 were started, but Phase 2 preview redaction now conflicts with business direction for full preview.
- Blocked:
  - Production launch remains blocked by final operational and integration gates (live infra, migration, and some admin workflows).
- Not started:
  - Blueprint-wide phase closure and strict documentation-to-implementation parity checks are not yet complete.

### Earlier Planned Phase Review (Ongoing Implementation)
- Template-theft remediation Phase 1 and Phase 2 are partially incompatible with new decision:
  - Current code redacts preview HTML and truncates sections.
  - New decision accepts full preview exposure risk.
- Template-theft remediation Phase 3/4/5 remain valid and should continue:
  - Signed grant delivery, forensic logging, asset fingerprinting, rejected-grant detection.
- Ecommerce execution phases in Ongoing DOCS/ecommerce/execution/tasks.md are still globally marked Planned, while real code is substantially ahead in many areas. This is documentation drift and must be corrected in implementation-facing trackers.

### Existing Codebase Inventory
- Reusable routes:
  - Public and commerce routes under web/src/app/** including /digital-products, /shop, /checkout, /success, /dashboard/**, /admin/**.
- Reusable layouts and shells:
  - Dashboard shell, admin shell, global app chrome, responsive navigation.
- Reusable sections and components:
  - Product preview frames and surfaces, cart/checkout UI, product detail tier components, dashboard cards and lists.
- Reusable data/store modules:
  - web/src/server/data/store.ts and schema.ts, catalog domain, orders domain, downloads domain.
- Existing API handlers and contracts:
  - 80+ API routes across /api/v1/** including cart, orders, downloads, me, admin, reviews, analytics, notifications.
- Existing CMS or Studio schemas:
  - blogPost, caseStudy, shopItem, shopCategory, servicePage, htmlBusinessProfileTemplate, siteSettings, aboutPage.
- Existing admin/operator flows:
  - admin analytics, leads, service requests, orders, downloads, licenses, submissions, users.
- Existing integrations already wired:
  - Clerk, Supabase, Stripe (conditional), Resend, Lark notifications, Sanity, and private-download grant flow.

### Reuse-First Delta Map
- Reuse without changes:
  - Signed download authorization and redemption pipeline.
  - Download forensic audit and fingerprint propagation.
  - Existing product preview UI components and API URL shape.
- Extend carefully:
  - Preview APIs to return full HTML instead of redacted content.
  - Integration tests to assert full-preview mode behavior instead of redaction markers.
  - Security documentation to shift from prevention posture to risk-accepted deterrence posture for preview only.
- Refactor in place:
  - Tracker and plan alignment between DOC/PROJECT PLAN/Tasks/tasks.md and Ongoing DOCS/ecommerce/execution/tasks.md.
- Net-new additions that are truly required:
  - Canonical hybrid planning artifact and role-specific plan docs for preview-restoration + blueprint alignment.
  - Explicit phase crosswalk and backlog for reconciliation work.
- Items rejected to avoid architecture drift:
  - No new preview rendering stack.
  - No replacement of existing download entitlement system.
  - No attempt to solve browser screenshot/save-as with frontend-only controls.

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | Active in web app | Reuse | Required now | App Router remains canonical runtime. |
| React | Active | Reuse | Required now | Keep existing component architecture. |
| TypeScript | Active | Reuse | Required now | Maintain strict contracts. |
| Sanity CMS | Active | Reuse and extend governance | Required now | Content source of truth for editorial/catalog surfaces. |
| Supabase | Active with mixed fallback usage | Reuse and continue activation | Required now | Keep PostgreSQL transactional ownership path. |
| PostgreSQL | Active via Supabase | Reuse | Required now | Transactional system of record. |
| Prisma | Not active | Intentionally excluded | Excluded | Current direct typed data layer remains. |
| Lark | Active for selected notifications | Reuse and extend | Required now | Continue operator alerting where needed. |
| Resend | Active | Reuse and extend | Required now | Continue transactional email ownership. |
| Pusher | Not active | Deferred | Later | No immediate requirement for realtime channels. |
| S3 | Partially planned for assets | Continue planned rollout | Required now (paid assets) | Keep preview/public split from paid private assets. |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog:
  - Managed in Sanity and rendered through existing content loaders.
- Services:
  - Managed in Sanity/service content models and reused in public routes.
- Shop/catalog:
  - Product metadata and presentation content managed via Sanity and catalog domain mappers.
- Case studies/portfolio:
  - Managed in Sanity caseStudy and related schemas.
- FAQ, landing pages, and static trust content:
  - Managed through existing route content contracts and CMS-backed where already enabled.

### Sanity Structure
- Document types:
  - blogPost, caseStudy, shopItem, shopCategory, servicePage, htmlBusinessProfileTemplate, siteSettings, aboutPage, author/category.
- Field groups and validation:
  - Keep existing schema-level validation and add incremental constraints only where required by blueprint deltas.
- Taxonomies and references:
  - Preserve category/type/industry references already used by digital-products and shop pipelines.
- Media model:
  - Continue Sanity image assets for catalog/editorial; paid downloadable assets remain outside Sanity in private delivery path.
- Slug and preview rules:
  - Keep current slug stability and route-compatible mapping.
- Draft, review, publish flow:
  - Continue Studio draft/publish lifecycle; admin dashboard handles operational commerce actions.
- Revalidation or cache invalidation model:
  - Keep existing /api/revalidate + webhook path with route-level updates.
- Studio runtime and deployment isolation plan:
  - Keep studio as isolated app with separate lockfile, CI, and deploy pipeline.

### Editorial And Operator Workflow
- Who creates blog posts and where:
  - Editorial operators in Sanity Studio.
- How services are created or updated:
  - Sanity Studio content team; frontend consumes normalized data.
- How shop content is managed:
  - Product content and positioning in Sanity; transactional states (orders/downloads/invoices) in app backend.
- How portfolio and proof content is managed:
  - Sanity Studio with existing schema and image references.
- What belongs in Sanity Studio vs admin dashboard vs code:
  - Sanity: editorial and catalog content.
  - Admin dashboard: operational state changes, order/support/download workflows.
  - Code: business invariants, authz, payment, entitlement, delivery security.

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
  - Editorial/catalog content: Sanity.
  - Transactional commerce and account data: Supabase/PostgreSQL through server data layer.
- Supabase responsibilities:
  - Orders, order items, downloads, licenses, leads, service requests, notifications, user mirrors, and related operational records.
- PostgreSQL schema impact:
  - Keep additive migration-only approach; do not break existing table contracts.
- Prisma decision and justification:
  - Excluded now; current typed domain + store modules are already integrated.
- Row-level security or access policy considerations:
  - Keep service-role server mediation and ownership checks on all /api/v1/me/** and admin surfaces.
- File or asset storage plan:
  - Public preview HTML remains intentionally public via API delivery.
  - Paid fulfillment assets remain private and accessed only through signed delivery grant flow.
- Data migration or backfill needs:
  - Reconcile tracker phase statuses with implementation evidence and maintain additive schema governance.

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark | Operator alerts | Order/payment/download and high-intent events | Backend domain services | No-op + audit breadcrumb | Keep existing try/catch non-blocking pattern. |
| Resend | Transactional email | Purchase, download-ready, service-request, invoice flows | Backend domain services | No-op + audit breadcrumb | Continue existing safe wrappers. |
| Pusher | Realtime notifications | Optional future dashboard updates | Deferred | None now | Deferred by scope. |
| S3 | Private paid asset storage | Download fulfillment issuance and redemption | Backend downloads/storage layer | Support escalation if unavailable | Required for stronger paid-asset control. |
| Payments | Checkout/payment state | Order creation, webhook reconciliation, invoice workflows | Orders/payments services | Fail-safe pending state + operator action | Keep idempotency and auditability. |
| Calendar | Appointment sync | Booking confirmation and updates | Appointment services | Queue/manual fallback | Preserve existing booking resilience. |

## 7. Global Site Invariants
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- The common footer copyright string must be planned as:
  © {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.
- Link Growrix OS to https://www.growrixos.com.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs:
  - Ongoing DOCS/ecommerce/blueprint and execution contracts.
  - Existing project shared contracts and tasks tracker.
- Deliverables:
  - Phase crosswalk matrix and explicit risk-accepted preview policy statement.
- Reuse targets:
  - Existing domain/service/entity model and route ownership.
- Entry criteria:
  - Audit of current implementation completed.
- Exit criteria:
  - Shared contract deltas documented and traceable.
- Risks and fallback:
  - Risk: policy drift between docs and code.
  - Fallback: mandatory contract-gate review before implementation slices close.

### CMS And Content Operations
- Inputs:
  - Existing Sanity schemas, current CMS operations docs.
- Deliverables:
  - No schema replacement; governance alignment and ownership clarifications.
- Reuse targets:
  - Existing schema and publish/revalidate pipeline.
- Entry criteria:
  - Current schema inventory validated.
- Exit criteria:
  - All content-bearing surfaces have explicit ownership and workflow.
- Risks and fallback:
  - Risk: content/transactional boundary confusion.
  - Fallback: enforce role-specific source-of-truth matrix.

### Frontend
- Inputs:
  - Preview APIs, product preview frame components, product pages.
- Deliverables:
  - Restore full preview rendering behavior in preview API responses.
  - Keep preview UX unchanged in product pages while removing constrained mode assumptions.
- Reuse targets:
  - Existing preview frame components and route-level consumers.
- Entry criteria:
  - Preview routes and tests mapped.
- Exit criteria:
  - Full preview is visible and functional as before.
- Risks and fallback:
  - Risk: increased copy exposure (accepted).
  - Fallback: maintain paid-delivery security and attribution controls.

### Backend
- Inputs:
  - downloads domain, audit logging, orders domain, notifications.
- Deliverables:
  - Preserve signed grant delivery and abuse controls as non-negotiable paid flow controls.
  - Keep idempotency and reconciliation for payment/order lifecycle per blueprint.
- Reuse targets:
  - Existing domain modules and guardrails.
- Entry criteria:
  - No regressions from preview policy shift into paid flow logic.
- Exit criteria:
  - Paid delivery controls unchanged and verified.
- Risks and fallback:
  - Risk: false confidence from preview openness.
  - Fallback: explicit operator/legal enforcement pipeline.

### API And Data
- Inputs:
  - Preview API handlers, /api/v1 download endpoints, schema contracts.
- Deliverables:
  - Preview endpoint contract revision (full-html mode).
  - Test contract update to match full-preview decision.
- Reuse targets:
  - Existing endpoint paths and response envelopes.
- Entry criteria:
  - Contract review with security and frontend docs complete.
- Exit criteria:
  - API tests pass with updated preview expectations.
- Risks and fallback:
  - Risk: unstable headers break template scripts.
  - Fallback: simplify preview headers to compatibility-safe baseline.

### Security
- Inputs:
  - Threat model docs and implemented paid-delivery controls.
- Deliverables:
  - Formal risk acceptance: public preview copy risk is accepted.
  - Compensating control matrix for paid assets and forensic response.
- Entry criteria:
  - Business decision documented.
- Exit criteria:
  - Security plan explicitly separates preview risk from paid-delivery protection.
- Risks and fallback:
  - Risk: leak incidents from public preview.
  - Fallback: fingerprinted delivery + takedown + legal workflow.

### DevOps
- Inputs:
  - Existing health-check and deployment baselines.
- Deliverables:
  - No pipeline replatform; add monitoring callouts for preview traffic and grant abuse trends.
- Entry criteria:
  - Existing production checks remain green.
- Exit criteria:
  - Observability ownership documented.
- Risks and fallback:
  - Risk: increased preview scraping volume.
  - Fallback: throttle and edge-rate controls if abuse spikes.

### CMS Studio Runtime Isolation Checklist
- Studio directory and package manifest audited: yes
- Studio lockfile strategy defined: yes
- Node version policy defined for Studio: yes (20.x policy retained)
- Root install/deploy coupling explicitly accepted or rejected: rejected
- Separate CI workflow defined: yes
- Separate hosting project and CMS domain defined: yes

### QA
- Inputs:
  - Existing integration tests and release-gate suite.
- Deliverables:
  - Update preview API integration assertions from redacted-mode to full-mode.
  - Keep security regression tests for signed delivery and rejected grants.
- Entry criteria:
  - Contract updates merged in docs.
- Exit criteria:
  - Health-check and relevant tests pass with no new gate failures.
- Risks and fallback:
  - Risk: brittle preview HTML assertions.
  - Fallback: assert stable headers/mode markers and critical behavior only.

## 9. Execution Backlog
1. Restore full preview response behavior in website template preview API and html business profile preview API, owner Frontend/Backend, dependency shared-contract approval, targets web/src/app/api/website-templates-html-preview/[templateSlug]/route.ts and web/src/app/api/html-business-profiles/[templateSlug]/route.ts.
2. Remove constrained-preview redaction dependency from preview routes while preserving preview URL API shape, owner Frontend, dependency task 1, targets web/src/server/security/preview-redaction.ts and preview route imports.
3. Rebaseline preview integration tests for full-preview mode and keep download grant security assertions unchanged, owner QA/API, dependency tasks 1-2, target web/tests/integration/api-flows.test.ts.
4. Keep paid delivery controls unchanged and run focused security regression pass on signed-url and deliver routes, owner Backend/Security, dependency task 3, targets web/src/app/api/v1/downloads/** and web/src/server/domain/downloads.ts.
5. Add phase-crosswalk update in DOC/PROJECT PLAN/Tasks/tasks.md mapping earlier security phases (1-5) and active ecommerce phases to new policy, owner Planning, dependency docs sync, target DOC/PROJECT PLAN/Tasks/tasks.md.
6. Align Ongoing DOCS/ecommerce/execution/tasks.md planned-vs-implemented status review in a follow-up documentation session, owner Product/Architecture, dependency tracker update, target Ongoing DOCS/ecommerce/execution/tasks.md.
7. Run validation gates for touched scope (lint/type/integration/build/health-check) after implementation, owner QA/DevOps, dependency tasks 1-4.

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation | Touched preview API and tests | Yes | Frontend/API | Lint and typecheck pass |
| Unit tests | Touched domain helpers as needed | Yes | Backend | Relevant unit suite pass |
| Integration tests | Preview + download grant flows | Yes | QA/API | api-flows integration pass |
| E2E tests | Preview open + checkout/download critical path smoke | Yes | QA | Release gate evidence |
| Accessibility | Preview embeds and product pages | Yes | Frontend/QA | No regression findings |
| Performance | Preview load and route responsiveness | Yes | Frontend/DevOps | Perf budget checks for touched pages |
| Security | Signed delivery controls and audit events | Yes | Security/Backend | No regression in grant security behavior |
| Regression | Product preview and entitlement journeys | Yes | QA | Health-check + targeted smoke logs |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - Full HTML preview increases direct copy/save-as exposure.
  - Documentation drift may continue if tracker and blueprint execution docs diverge.
- Assumptions:
  - Business accepts preview leakage risk in exchange for conversion and transparency.
  - Paid delivery security remains the enforceable control boundary.
- Open decisions:
  - Whether to keep optional visual watermark in full-preview mode.
  - Whether to maintain any restrictive preview headers beyond noindex/nosniff.
  - Whether to add automated scraper detection thresholds at edge/CDN layer now or later.

## 12. Tracker And Documentation Updates
- Files updated:
  - DOC/PROJECT PLAN/ecommerce-preview-restoration-e2e-plan.md
  - DOC/PROJECT PLAN/Frontend/ecommerce-preview-restoration-frontend.md
  - DOC/PROJECT PLAN/Backend/ecommerce-preview-restoration-backend.md
  - DOC/PROJECT PLAN/API and Data/ecommerce-preview-restoration-api-data.md
  - DOC/PROJECT PLAN/Admin Dashboard/ecommerce-preview-restoration-admin-dashboard.md
  - DOC/PROJECT PLAN/Security/ecommerce-preview-restoration-security.md
  - DOC/PROJECT PLAN/README.md
  - DOC/PROJECT PLAN/ai-context.yaml
  - DOC/PROJECT PLAN/Tasks/tasks.md
- Downstream role docs updated:
  - Frontend, Backend, API and Data, Admin Dashboard, Security
- Task tracker deltas:
  - Add new planning and implementation-ready phase block for preview restoration + blueprint alignment
- New planning artifacts created:
  - DOC/PROJECT PLAN/ecommerce-preview-restoration-e2e-plan.md