# Ecommerce Blueprint Realignment E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: DOC/PROJECT PLAN/ecommerce-blueprint-realignment-e2e-plan.md
- Affected downstream role docs:
  - DOC/PROJECT PLAN/Frontend/ecommerce-blueprint-realignment-frontend.md
  - DOC/PROJECT PLAN/Backend/ecommerce-blueprint-realignment-backend.md
  - DOC/PROJECT PLAN/API and Data/ecommerce-blueprint-realignment-api-data.md
  - DOC/PROJECT PLAN/Security/ecommerce-blueprint-realignment-security.md
  - DOC/PROJECT PLAN/DevOps/ecommerce-blueprint-realignment-devops.md
  - DOC/PROJECT PLAN/QA/ecommerce-blueprint-realignment-qa.md
  - DOC/PROJECT PLAN/Admin Dashboard/ecommerce-blueprint-realignment-admin-dashboard.md
  - DOC/PROJECT PLAN/Supabase/ecommerce-blueprint-realignment-supabase.md
- Planning request source: 2026-07-11 re-audit request to finalize ecommerce plan against Ongoing DOCS/ecommerce blueprint after scattered development
- Planning mode: hybrid scale
- Status: active - planning finalized, implementation backlog realigned
- Last updated: 2026-07-11

## 1. Planning Mode And Objective
- Planning mode: hybrid (reuse-heavy scale planning + targeted contract correction)
- Why this mode fits the request:
  - Ecommerce implementation exists across many surfaces and services, but execution order and contract closure are fragmented.
  - Ongoing DOCS/ecommerce blueprint remains mostly planned-state while repository implementation has partial/advanced slices.
- Scope boundaries:
  - Reconcile current implementation against blueprint phases 1-18.
  - Define a deterministic gap-closure roadmap for ecommerce functionality.
  - Keep existing architecture and route surfaces unless required by contract gaps.
- Explicit non-goals:
  - No greenfield ecommerce rebuild.
  - No framework/platform replacement.
  - No ad hoc feature addition outside blueprint-aligned gap closure.
- Compatibility requirements:
  - Preserve existing live routes, APIs, data models, and admin/customer shells.
  - Preserve paid-download security controls and recently restored full preview policy.

## 2. Current-State Audit

### Tracker Status
- Project tracker (`DOC/PROJECT PLAN/Tasks/tasks.md`): implementation-rich, with multiple phases done/partial.
- Blueprint tracker (`Ongoing DOCS/ecommerce/execution/tasks.md`): mostly planned, now with alignment snapshot but not full phase-level closure.
- Planning drift: same system has two valid planning surfaces but status granularity differs.

### Existing Codebase Inventory (ecommerce-relevant)
- Reusable routes:
  - Product/catalog routes: /digital-products, /shop compatibility, /checkout, /cart, /success.
  - Customer routes: /dashboard/**.
  - Admin routes: /admin/**.
- Reusable modules:
  - Catalog domain, cart domain, orders domain, downloads domain, coupons, leads/service-requests, notifications, analytics.
- API contracts already present:
  - /api/v1/shop, /orders, /downloads, /me, /admin, /events, /leads, /service-requests, /reviews, /coupons.
- CMS inventory:
  - Sanity schemas for shop items, categories, case studies, services, html business profile templates, site settings.
- Security and fulfillment controls:
  - signed grant URL issuance, redemption checks, throttling, fingerprinting, rejected-grant auditing.

### Blueprint Phase Gap Matrix

| Blueprint Phase | Current Status | Gap Class | Priority |
|---|---|---|---|
| 1 Project setup | Advanced/Done | documentation parity only | Low |
| 2 Authentication | Partial-Advanced | ownership and policy hardening | High |
| 3 Database | Partial | normalized transactional activation and migration closure | Critical |
| 4 Products | Advanced | cleanup and governance parity | Medium |
| 5 Categories | Advanced | SEO/filter parity closure | Medium |
| 6 Inventory | Partial | reservation/oversell guarantees not fully closed | Critical |
| 7 Cart | Partial-Advanced | deterministic merge and coupon invariants need closure | High |
| 8 Checkout | Partial-Advanced | idempotent start/confirm and failure contracts need closure | Critical |
| 9 Payments | Partial | webhook reconciliation/fraud controls must close | Critical |
| 10 Orders | Partial-Advanced | lifecycle consistency + returns/refunds parity | High |
| 11 Reviews | Partial | moderation and verified-purchase linkage | Medium |
| 12 Notifications | Partial-Advanced | provider fallback and operator observability standardization | Medium |
| 13 Admin dashboard | Partial-Advanced | operations UX and policy closure | High |
| 14 Analytics | Partial-Advanced | canonical taxonomy and dashboard parity | Medium |
| 15 Testing | Advanced | broaden contract matrix to blueprint coverage | High |
| 16 Deployment | Partial | production operations gates not fully closed | Critical |
| 17 Optimization | Partial | performance/search/cache roadmap incomplete | Medium |
| 18 Production launch | Not closed | launch runbook and hard gate closure pending | Critical |

### Reuse-First Delta Map
- Reuse without changes:
  - current route map and major commerce surfaces
  - current signed-download controls
  - current content + transactional split (Sanity + app data)
- Extend carefully:
  - checkout/payment/inventory invariants
  - admin workflows and policy constraints
  - analytics/event consistency
- Refactor in place:
  - phase/status tracking across planning surfaces
  - Supabase transactional migration adoption and fallback governance
- Net-new required:
  - unified phase closure matrix and deterministic implementation backlog
  - role-level gap closure docs for each owning surface
- Rejected to avoid drift:
  - new architecture branches
  - replacing existing route families
  - broad UI redesign unrelated to blueprint gaps

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | Active | Reuse | Required now | Keep App Router contract. |
| React | Active | Reuse | Required now | No UI framework switch. |
| TypeScript | Active | Reuse | Required now | Keep contract strictness. |
| Sanity CMS | Active | Reuse + governance | Required now | Catalog/editorial ownership remains. |
| Supabase | Active partial mode | Complete activation | Required now | Critical for phase 3 closure. |
| PostgreSQL | Active via Supabase | Reuse | Required now | Transactional source of truth. |
| Prisma | Not used | Excluded | Excluded | Avoid migration churn now. |
| Lark | Active partial | Standardize | Required now | Keep operator events deterministic. |
| Resend | Active partial | Standardize | Required now | Retry/observability closure needed. |
| Pusher | Not active | Deferred | Later | Not blocker for blueprint closure. |
| S3 | Planned/partial | Complete paid assets path | Required now | Needed for delivery maturity. |

## 4. CMS And Content Operations Plan
- Blog/services/shop/case studies remain Sanity-owned content surfaces.
- Transactional commerce states remain app-owned (orders/payments/downloads/licenses/carts).
- CMS and admin dashboard ownership split:
  - Sanity: authored content and catalog metadata.
  - Admin dashboard: operational state transitions and support workflows.
- Required governance additions:
  - publish-state auditability
  - taxonomy consistency across storefront + admin filters
  - revalidation ownership and failure runbook

## 5. Data, Database, And Storage Plan
- Source-of-truth split retained:
  - Sanity for editorial/catalog content.
  - Supabase/PostgreSQL for transactional domains.
- Critical gaps to close:
  - normalize outstanding app_state fallback paths into transactional tables where required
  - migration execution and verification pipeline closure
  - inventory reservation schema guarantees for oversell prevention
- Storage plan:
  - paid assets through private path with signed URLs
  - public previews are intentionally public and separate from paid artifacts

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Payments (Stripe + manual rails) | Payment state | checkout + webhook + admin ops | Backend/API | idempotent retry + manual reconcile | Critical phase 9/10 closure. |
| Resend | transactional messaging | order, support, appointment, delivery | Backend | no-op with auditable warning | Must add failure dashboards. |
| Lark | operator alerting | purchase/service/download events | Backend | no-op + log | Align taxonomy with analytics. |
| Calendar | appointment lifecycle | booking + reschedule/cancel | Backend | queue/manual workflow | Needed for phase 8/10 parity. |
| S3/private assets | paid fulfillment delivery | delivery issuance | Backend | operator recovery path | Critical for delivery trust. |
| Search/indexing | discovery quality | product/category updates | Backend/Frontend | stale fallback mode | Optimization phase scope. |

## 7. Global Site Invariants
- Reuse existing design system and route families.
- Preserve current preview policy decision and separate it from paid delivery controls.
- Keep shared copyright string standard:
  - © {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.
- Keep Growrix OS link target: https://www.growrixos.com.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs: Ongoing DOCS/ecommerce blueprint + current project trackers.
- Deliverables: unified phase closure matrix and contract ownership map.
- Exit criteria: every phase has owner, acceptance gates, and evidence model.

### Frontend
- Deliverables: discovery, PDP, cart, checkout, customer/account/admin UX parity closure.
- Exit criteria: no placeholder UX paths on critical commerce flows.

### Backend
- Deliverables: cart/checkout/order/payment/inventory invariants and service boundaries finalized.
- Exit criteria: idempotent financial + fulfillment transitions with auditable events.

### API And Data
- Deliverables: endpoint and schema parity against blueprint phases.
- Exit criteria: contract tests and ownership rules cover all critical flows.

### Security
- Deliverables: authz ownership checks, webhook/fraud hardening, audit coverage closure.
- Exit criteria: no critical payment/auth/admin surfaces with unresolved mitigation.

### Supabase
- Deliverables: transactional activation, migration verification, fallback governance closure.
- Exit criteria: production path does not rely on undefined fallback behavior.

### Admin Dashboard
- Deliverables: operator-grade workflows for catalog, orders, support, submissions, and audits.
- Exit criteria: admin mutations are policy-safe and auditable with usable UX.

### DevOps
- Deliverables: release runbook, observability, rollback, and incident posture for ecommerce-critical flows.
- Exit criteria: production gate ownership and monitoring are explicit.

### QA
- Deliverables: blueprint-mapped test matrix for all critical paths.
- Exit criteria: release gates cover payment, order, inventory, support, auth, and admin paths.

## 9. Execution Backlog (Realignment Sequence)
1. Normalize phase status parity between project tracker and ecommerce blueprint execution tracker.
2. Close critical transactional gaps: inventory reservation, checkout idempotency, payment webhook reconciliation.
3. Close order lifecycle parity: returns/refunds/invoice consistency and customer/admin visibility.
4. Complete admin operations parity: structured workflows over JSON-style operations.
5. Finalize Supabase transactional activation and migration verification.
6. Standardize notifications + analytics taxonomy and dashboards.
7. Run blueprint-mapped QA gate suite and generate launch-blocker report.
8. Close DevOps production readiness controls and run launch checklist.

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Contract parity | blueprint phases 1-18 vs implementation | Yes | Product/Architecture | phase-by-phase status and gap evidence |
| Static validation | web app touched scope | Yes | Frontend/Backend | lint + typecheck pass |
| Integration/API | commerce critical APIs | Yes | Backend/API/QA | integration matrix pass |
| E2E | checkout/order/dashboard/admin critical paths | Yes | QA | e2e evidence with failures resolved |
| Security | authz/webhook/fraud/admin controls | Yes | Security | mitigation and test evidence |
| Operations | monitoring/rollback/runbooks | Yes | DevOps | release runbook completion |
| Launch gate | no critical blockers | Yes | Cross-role | signed phase closure record |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - Scattered implementation may hide edge-case regressions.
  - Parallel tracker surfaces can drift again.
- Assumptions:
  - Existing architecture remains viable for full blueprint closure.
  - Team accepts phased hardening instead of rebuild.
- Open decisions:
  - strict deadline and phase owner assignments for critical phases 3/6/8/9/16/18.
  - exact production go-live criteria for payment rails and fulfillment stack.

## 12. Tracker And Documentation Updates
- Files updated:
  - DOC/PROJECT PLAN/ecommerce-blueprint-realignment-e2e-plan.md
  - role-specific ecommerce-blueprint-realignment docs across Frontend/Backend/API/Security/DevOps/QA/Admin/Supabase
  - DOC/PROJECT PLAN/ai-context.yaml and DOC/PROJECT PLAN/README.md
  - DOC/PROJECT PLAN/Tasks/tasks.md
- Downstream role docs updated: yes (8 role folders)
- Task tracker deltas: add P22 blueprint realignment phase and tasks
- New planning artifacts created:
  - DOC/PROJECT PLAN/ecommerce-blueprint-realignment-e2e-plan.md