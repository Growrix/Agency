# Customer Dashboard Experience E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
- Affected downstream role docs:
  - `DOC/PROJECT PLAN/Frontend/customer-dashboard-frontend.md`
  - `DOC/PROJECT PLAN/Backend/customer-dashboard-backend.md`
  - `DOC/PROJECT PLAN/API and Data/customer-dashboard-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/customer-dashboard-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/customer-dashboard-security.md`
- Planning request source: Operator session 2026-06-29 — customer dashboard must adopt public header/footer, complete all page flows, replace dead-end settings/support UX, and define full frontend/backend/data/security plan.
- Planning mode: Scale
- Status: Active — planning created, implementation not started
- Last updated: 2026-06-29

## 1. Planning Mode And Objective
- Planning mode: scale-existing
- Why this mode fits the request:
  - The repository already has `/dashboard/**` routes, a `CustomerDashboard` shell, authenticated `/api/v1/me/**` endpoints, download/license/service-request flows, and Clerk auth.
  - The gap is not missing routing from scratch; the gap is incomplete UX, incomplete end-flows, missing profile/settings/account-management behavior, and no canonical dedicated dashboard plan.
- Scope boundaries:
  - Customer-facing dashboard only: `/dashboard`, `/dashboard/products`, `/dashboard/downloads`, `/dashboard/orders`, `/dashboard/appointments`, `/dashboard/support`, plus new settings/profile and modal flows required to make existing actions complete.
  - Shared public site chrome decision for customer dashboard pages.
  - Backend/API/data/schema planning required to support those flows end-to-end.
  - Admin/operator implications where customer-initiated flows require staff follow-up or visibility.
- Explicit non-goals:
  - No redesign of internal `/admin` information architecture except where customer-initiated actions require admin handling.
  - No new CMS authoring model for dashboard content; dashboard remains application-authored.
  - No replacement of Clerk, Supabase, or existing order/download architecture.
  - No native mobile app planning.
- Current implementation compatibility requirements:
  - Preserve existing protected `/dashboard/**` route group and Clerk-backed auth.
  - Preserve current `/api/v1/me`, `/api/v1/me/orders`, `/api/v1/me/downloads`, `/api/v1/me/licenses`, `/api/v1/me/appointments`, `/api/v1/service-requests` contracts unless versioned.
  - Reuse existing `AppChrome`, `SiteTopChrome`, `Footer`, `MobileBottomNav`, `DashboardShell`, and current primitives before introducing new layout systems.

## 2. Current-State Audit

### Tracker Status
- Done:
  - Auth Clerk migration (P11)
  - Initial customer dashboard shell and route group as part of product-led platform implementation
  - Protected customer reads for orders, downloads, licenses, appointments
- Partial:
  - Customer dashboard UX is implemented as a basic shell with view switching, but several workflows stop at read-only or thin mutation surfaces.
  - Product-led platform docs mention dashboard routes but do not fully specify all customer dashboard page flows.
  - Security docs mention dashboard ownership and private downloads, but not account settings or support-case end-to-end states.
- Blocked:
  - No canonical dedicated customer-dashboard planning artifact existed before this plan.
- Not started:
  - Public header/footer integration on customer dashboard.
  - Profile/settings/account UI with real end-flow.
  - Dashboard notifications, modal workflows, account preferences, support request history, appointment follow-up UX, order detail UX, and post-purchase/product management UX.

### Existing Codebase Inventory
- Reusable routes:
  - `web/src/app/dashboard/page.tsx`
  - `web/src/app/dashboard/products/page.tsx`
  - `web/src/app/dashboard/downloads/page.tsx`
  - `web/src/app/dashboard/orders/page.tsx`
  - `web/src/app/dashboard/appointments/page.tsx`
  - `web/src/app/dashboard/support/page.tsx`
  - `web/src/app/dashboard/login/page.tsx`
- Reusable layouts and shells:
  - `web/src/components/shell/AppChrome.tsx`
  - `web/src/components/shell/SiteTopChrome.tsx`
  - `web/src/components/shell/Footer.tsx`
  - `web/src/components/shell/MobileBottomNav.tsx`
  - `web/src/components/dashboard/DashboardShell.tsx`
  - `web/src/components/dashboard/DashboardHeaderControls.tsx`
- Reusable sections and components:
  - `Card`, `Button`, `LinkButton`, theme toggle, popover patterns, status cards
  - customer dashboard cards and summary sections in `CustomerDashboard.tsx`
- Reusable data/store modules:
  - `web/src/server/auth/guards.ts`
  - `web/src/server/auth/clerk-sync.ts`
  - `web/src/server/domain/downloads.ts`
  - `web/src/server/domain/orders.ts`
  - `web/src/server/domain/service-requests.ts`
  - `web/src/server/data/schema.ts`
  - `web/src/server/data/store.ts`
- Existing API handlers and contracts:
  - `GET /api/v1/me`
  - `POST /api/v1/me/update`
  - `GET /api/v1/me/orders`
  - `GET /api/v1/me/downloads`
  - `GET /api/v1/me/licenses`
  - `GET /api/v1/me/appointments`
  - `POST /api/v1/service-requests`
  - `POST /api/v1/downloads/[downloadId]/signed-url`
- Existing CMS or Studio schemas:
  - None required for dashboard transactional UX today.
- Existing admin/operator flows:
  - Admin analytics/orders/downloads/licenses/leads/service-request surfaces already exist at baseline and can be extended to reflect new customer dashboard actions.
- Existing integrations already wired:
  - Clerk
  - Supabase/file-backed persistence mode
  - Resend
  - Lark notifications
  - Stripe placeholder/partial checkout wiring

### Reuse-First Delta Map
- Reuse without changes:
  - Protected route group `/dashboard/**`
  - Clerk sign-in/up and dashboard redirect model
  - Existing transactional order/download/license/support domains
  - `AppChrome` public-shell machinery
  - Core dashboard primitives and responsive shell patterns
- Extend carefully:
  - `AppChrome` to include customer dashboard under public chrome while preserving admin exclusion
  - `DashboardShell` so it supports hybrid public-chrome + in-page dashboard navigation
  - `DashboardHeaderControls` so notifications/profile/settings actions become real flows instead of placeholders
  - `/api/v1/me/update` to support more than first/last name if profile editing expands
  - support, order, appointment, and download APIs for timeline/detail/modals/history states
- Refactor in place:
  - `CustomerDashboard.tsx` should be decomposed into route-specific sections/components instead of one large client file with switch rendering and mixed concerns.
  - current read-only order/download cards should evolve into detail-first workflows with reusable modal/drawer components.
- Net-new additions that are truly required:
  - Dedicated customer dashboard planning docs
  - Profile/settings/account route or modal system
  - Notification center and preferences model
  - Support request history and detail surface
  - Order detail modal/page contract
  - Appointment detail/reschedule/cancel request flows
  - Download entitlement detail and recovery UX
  - Account-security flow planning (session devices, password/MFA references, support fallback)
- Items rejected to avoid architecture drift:
  - No separate second customer app shell disconnected from site chrome
  - No new dashboard-only design system
  - No CMS-managed dashboard content model
  - No client-only state pretending to be transactional truth

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | Active | Reuse | Required now | Dashboard remains in App Router under `web/` |
| React | Active | Reuse | Required now | Existing dashboard shell and modal patterns are sufficient |
| TypeScript | Active | Reuse | Required now | Required for route/data contracts |
| Sanity CMS | Active for public editorial content | Exclude from dashboard transactional flows | Excluded now | Dashboard content stays code-authored except indirect product/blog references |
| Supabase | Partial transactional baseline | Extend | Required now | Source of truth for richer customer dashboard states and preferences |
| PostgreSQL | Via Supabase | Extend | Required now | Needed for normalized dashboard entities/preferences/history |
| Prisma | Not used | Excluded | Excluded | Existing direct typed data/store pattern remains |
| Lark | Active | Extend | Later/conditional | Only if customer actions need ops alerts (e.g., urgent support, cancellation requests) |
| Resend | Active | Extend | Required now | Customer settings/security/support confirmation emails |
| Pusher | Not present | Excluded | Deferred | Polling/manual refresh acceptable for customer dashboard now |
| S3 | Planned for downloads | Extend | Required now if P17 proceeds | Download UX must acknowledge signed URL / asset lifecycle |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog:
  - Dashboard may deep-link to relevant help/blog content but does not manage it.
- Services:
  - Dashboard support and upsell modules can reference services, but source remains existing public content model.
- Shop/catalog:
  - Dashboard products/orders/downloads consume shop/product data already normalized or adapted from existing catalog.
- Case studies/portfolio:
  - Not directly managed from customer dashboard.
- FAQ, landing pages, and static trust content:
  - Account help and billing/download help content may remain code-authored or later move to CMS, but not in this scope.

### Sanity Structure
- Document types:
  - No new Sanity document types required now.
- Field groups and validation:
  - Not applicable for customer transactional dashboard.
- Taxonomies and references:
  - Dashboard surfaces can reference existing products/services by slug only.
- Media model:
  - Reuse existing product preview/media if product cards are shown in dashboard.
- Slug and preview rules:
  - No new dashboard slug rules required.
- Draft, review, publish flow:
  - Dashboard remains application-authored.
- Revalidation or cache invalidation model:
  - Dashboard customer data is no-store/server-authenticated, not CMS-revalidated.
- Studio runtime and deployment isolation plan:
  - No Studio runtime changes needed.

### Editorial And Operator Workflow
- Who creates blog posts and where:
  - Sanity Studio, unchanged.
- How services are created or updated:
  - Sanity/admin hybrid, unchanged.
- How shop content is managed:
  - Existing catalog model, unchanged for this dashboard plan.
- How portfolio and proof content is managed:
  - Unchanged.
- What belongs in Sanity Studio vs admin dashboard vs code:
  - Sanity Studio: public editorial assets/content
  - Admin dashboard: operational customer follow-up states, support queues, refunds/cancellations, delivery actions
  - Code/backend: customer dashboard IA, account preferences, auth-connected transactional UX

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
  - Profile basics and auth identity: Clerk + mirrored `users`
  - Customer preferences/settings: Supabase/Postgres transactional tables
  - Orders/order items/downloads/licenses/service requests/appointments: Supabase/Postgres (with existing file fallback during development)
  - Product display metadata shown in dashboard: catalog adapter from Sanity + managed catalog
  - Notification center state: Supabase/Postgres new table or derived events table
- Supabase responsibilities:
  - Persist customer preferences
  - Persist support request history/status detail surfaced to customer
  - Persist appointment customer-facing follow-up state and optional action requests
  - Persist notification feed records and read/unread status if implemented
  - Persist account audit-like user-visible events (optional derived timeline)
- PostgreSQL schema impact:
  - Additive tables/fields likely required:
    - `customer_preferences`
    - `customer_notifications`
    - `support_request_messages` or `service_request_updates`
    - `appointment_change_requests` (if reschedule/cancel request flow is enabled)
    - optional order/download timeline event table if user-facing event history is introduced
  - Existing `users` mirror likely needs optional fields for avatar URL, phone, timezone, marketing consent, billing profile summary.
- Prisma decision and justification:
  - Excluded. Existing typed direct data/store approach is already embedded and avoids introducing ORM drift.
- Row-level security or access policy considerations:
  - Every customer-facing transactional record must enforce ownership by `user_id` or email-linked mirror identity.
  - Notification, preference, and support update tables require explicit RLS deny-all to clients and server-mediated reads.
- File or asset storage plan:
  - Continue S3 signed URL model for downloads.
  - Avatar uploads are deferred unless explicitly required; if added later they must use private/public storage rules explicitly.
- Data migration or backfill needs:
  - Existing users may need first-login bootstrap rows for customer preferences.
  - Existing service requests and appointments may need derived customer-visible status labels.
  - Existing orders/downloads should backfill timeline/notification records only if that feature is adopted.

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark | Optional operator alerting for urgent customer actions | support escalation, cancellation request, download issue | backend/admin | silent log + audit fallback | not required for first dashboard UX completion |
| Resend | Customer-facing confirmations and status emails | profile email change confirmation, support request submitted, appointment change request, download issue received | backend/customer dashboard | in-app confirmation + audit log | required now |
| Pusher | realtime notifications | dashboard notification feed | excluded | manual refresh / polling | deferred |
| S3 | download delivery | signed-url generation from downloads page/modal | backend/downloads | contact support fallback when unavailable | required for download UX completeness |
| Payments | order/payment detail context | order status pages, invoice/payment records | backend/orders | show manual follow-up state | preserve current placeholder/manual support paths |
| Calendar | appointment status and change requests | appointment detail/reschedule/cancel request | backend/appointments | create request record and mark pending manual follow-up | required for full appointment UX planning |

## 7. Global Site Invariants
- Customer dashboard pages should use public site header/footer and mobile chrome unless a route is explicitly carved out for auth-only or focused transactional flow.
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- The common footer copyright string must be planned as:
  `© {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.`
- Link `Growrix OS` to `https://www.growrixos.com`.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs:
  - Existing shared contract role model, product-led platform docs, current dashboard implementation audit
- Deliverables:
  - Customer dashboard scope, route map, role boundary, public-chrome decision, customer action lifecycle map
- Reuse targets:
  - Existing subscriber/customer role model and `/api/v1/me/**` surfaces
- Entry criteria:
  - Dashboard gaps documented and confirmed against code
- Exit criteria:
  - A builder can identify every dashboard route, action, and owner surface without guessing
- Risks and fallback:
  - Avoid conflicting with older Supabase-auth wording in legacy docs; explicitly align to current Clerk reality

### CMS And Content Operations
- Inputs:
  - Existing CMS/content-ops docs
- Deliverables:
  - Explicit statement that customer dashboard is application-authored and not a CMS surface in this phase
- Reuse targets:
  - Existing product/service references only
- Entry criteria:
  - Root dashboard plan approved
- Exit criteria:
  - No CMS ambiguity remains for dashboard scope
- Risks and fallback:
  - If later account-help content becomes editorial, add a follow-up CMS scope instead of overloading this plan

### Frontend
- Inputs:
  - Current `CustomerDashboard`, `DashboardShell`, `AppChrome`, product-led frontend docs
- Deliverables:
  - Route-by-route customer dashboard IA
  - Public header/footer integration plan
  - Modal/drawer UX plan for profile settings, order detail, download detail/help, support request, appointment change/cancel, notification center
  - End-state definitions for loading, empty, error, success, pending review, and permission states on every page
- Reuse targets:
  - `AppChrome`, `SiteTopChrome`, `Footer`, `MobileBottomNav`, `DashboardShell`, `DashboardHeaderControls`, `Card`, `Button`, `LinkButton`
- Entry criteria:
  - Shared contract and current implementation audit complete
- Exit criteria:
  - Every dashboard page has a complete user journey and component plan
- Risks and fallback:
  - Keep modal complexity bounded; if a flow becomes too deep, graduate it to a dedicated sub-route

### Backend
- Inputs:
  - Existing auth/orders/downloads/service-request/appointments domains
- Deliverables:
  - Customer dashboard application service map for profile, notification feed, support request history, appointment requests, order detail, entitlement issue reporting
  - Clerk mirror/bootstrap responsibility clarified
  - User role escalation and account-state rules clarified
- Reuse targets:
  - Existing guards, order/download/service-request modules, Resend and notification services
- Entry criteria:
  - Frontend flow inventory complete
- Exit criteria:
  - Backend responsibilities per dashboard workflow are explicit
- Risks and fallback:
  - Avoid creating dashboard-only duplicate services when existing order/service-request modules can be extended

### API And Data
- Inputs:
  - Existing `/api/v1/me/**`, `/api/v1/service-requests`, `/api/v1/downloads/**`
- Deliverables:
  - API contract additions/changes for profile settings, support history, order detail, notification feed, appointment change requests, download issue reporting
  - Schema additions and migration plan
  - Ownership and RLS policy plan
- Reuse targets:
  - Existing me/download/order/service-request endpoints where sufficient
- Entry criteria:
  - Frontend actions and backend service map defined
- Exit criteria:
  - All customer dashboard actions are backed by explicit request/response contracts
- Risks and fallback:
  - Preserve backwards compatibility for existing thin endpoints where possible

### Security
- Inputs:
  - Current customer dashboard security docs, Clerk route protection, existing ownership guards
- Deliverables:
  - Customer-account threat model for dashboard pages
  - Session/account management policy
  - User-visible profile update, notification, support, and appointment request protections
- Entry criteria:
  - API/data additions drafted
- Exit criteria:
  - No dashboard flow lacks explicit authz/ownership/audit rules
- Risks and fallback:
  - Avoid exposing sensitive operational notes or internal statuses through customer endpoints

### DevOps
- Inputs:
  - Current no-store dashboard delivery and health checks
- Deliverables:
  - No-store/cache rules for new dashboard routes and endpoints
  - Observability additions for customer dashboard failures and auth bounce loops
- Entry criteria:
  - Route and API additions defined
- Exit criteria:
  - Operational validation and rollout rules are explicit
- Risks and fallback:
  - If no new infra is needed, keep scope to monitoring and release gates only

### CMS Studio Runtime Isolation Checklist
- Studio directory and package manifest audited: yes, unchanged
- Studio lockfile strategy defined: yes, unchanged
- Node version policy defined for Studio: yes, unchanged
- Root install/deploy coupling explicitly accepted or rejected: rejected, unchanged
- Separate CI workflow defined: yes, unchanged
- Separate hosting project and CMS domain defined: yes, unchanged

### QA
- Inputs:
  - Existing release-gates suite and dashboard baseline
- Deliverables:
  - Customer dashboard-specific validation matrix for signup -> dashboard -> settings/support/download/order flows
  - Responsive/accessibility checks for public chrome + dashboard coexistence
- Entry criteria:
  - Route and action inventory finalized
- Exit criteria:
  - Every critical customer flow has unit/integration/e2e ownership
- Risks and fallback:
  - Where third-party auth/captcha blocks deterministic e2e, use authenticated session seeding plus route-level smoke checks

## 9. Execution Backlog
1. Update shared contracts to add explicit customer dashboard route map, page purpose, and action ownership; owner hint: planning/shared-contracts; dependency: current audit; target docs/files: `DOC/PROJECT PLAN/Shared Contracts/**`, `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
2. Refactor frontend architecture plan for customer dashboard shell with public header/footer and internal subnav coexistence; owner hint: frontend; dependency: backlog item 1; target docs/files: `DOC/PROJECT PLAN/Frontend/customer-dashboard-frontend.md`, `web/src/components/shell/AppChrome.tsx`, `web/src/components/dashboard/**`
3. Define profile/settings/account-management UX including modal and/or sub-route behavior, validation states, confirmation states, and logout/session controls; owner hint: frontend/backend/security; dependency: backlog item 2; target docs/files: frontend/backend/security role docs and `web/src/app/dashboard/**`
4. Define order detail, download detail/help, and entitlement recovery flows with customer-visible timelines and escalation paths; owner hint: frontend/api-data/backend; dependency: backlog item 1; target docs/files: `DOC/PROJECT PLAN/API and Data/customer-dashboard-api-data.md`, `DOC/PROJECT PLAN/Backend/customer-dashboard-backend.md`
5. Define appointment detail plus reschedule/cancel request workflow, including operator handoff and notification steps; owner hint: backend/api-data/admin-dashboard/security; dependency: backlog items 1 and 4; target docs/files: role docs and `web/src/app/api/v1/me/appointments`, appointment domain files
6. Define support request history, detail, follow-up timeline, and message/update model for customer-facing service requests; owner hint: backend/api-data/admin-dashboard; dependency: backlog item 4; target docs/files: service request domain/API/admin docs
7. Define dashboard notification center and read/unread/preferences model or explicitly defer with justification; owner hint: frontend/api-data/backend; dependency: backlog item 3; target docs/files: role docs and `DashboardHeaderControls`
8. Add QA plan for full post-signup customer journey: sign-up/sign-in -> dashboard overview -> profile edit -> support request -> order detail -> download -> appointment action -> logout; owner hint: QA; dependency: all above docs; target docs/files: `DOC/PROJECT PLAN/QA/**`, Playwright plan references

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation | dashboard route/components and API additions | Yes | Frontend/Backend | lint, typecheck, build pass |
| Unit tests | profile update helpers, notification reducers, ownership/state transition helpers | Yes | Frontend/Backend | passing targeted tests |
| Integration tests | `/api/v1/me/**`, service requests, downloads, appointments, customer ownership checks | Yes | API/Backend | passing contract tests |
| E2E tests | sign-in/up to dashboard, profile settings, downloads, support, appointments, order detail | Yes | QA | Playwright scenarios pass |
| Accessibility | public chrome + dashboard shell, modal flows, keyboard/focus management | Yes | Frontend/QA | Axe/manual evidence |
| Performance | dashboard overview, orders, downloads, support routes | Yes | QA/DevOps | route timing and no major regressions |
| Security | authz, cross-customer access, sensitive data exposure, session handling | Yes | Security/QA | negative tests and review evidence |
| Regression | existing shop/checkout/admin/dashboard login flows | Yes | QA | unchanged critical paths validated |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - Mixing full public chrome with a dense dashboard shell may create navigation overload or duplicated affordances if not designed intentionally.
  - Existing file-backed fallback data model may limit richer notification/timeline features until Supabase normalization progresses.
  - Clerk-only session/account operations may not support all desired “security settings” UX directly inside app without linking out or defining limited in-app scope.
- Assumptions:
  - Customer dashboard should be a branded portal integrated with public navigation/header/footer rather than an isolated app shell.
  - Customer settings should remain application-authoritative for profile preferences while identity primitives still rely on Clerk.
  - Support, order, and appointment state changes can remain mostly server-mediated and not realtime.
- Open decisions:
  - Should settings live as a modal-first experience, a dedicated `/dashboard/settings` route, or hybrid (route for full settings, modal for quick edits)?
  - Should the public header on dashboard be identical to marketing pages or use a dashboard-aware variant with reduced CTA noise?
  - Should customer notifications be backed by a persisted feed now or explicitly deferred in favor of simpler inline confirmations?
  - Should account security controls link out to Clerk-hosted management or be wrapped in local UI primitives?

## 12. Tracker And Documentation Updates
- Files updated:
  - `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
- Downstream role docs updated:
  - `DOC/PROJECT PLAN/Frontend/customer-dashboard-frontend.md`
  - `DOC/PROJECT PLAN/Backend/customer-dashboard-backend.md`
  - `DOC/PROJECT PLAN/API and Data/customer-dashboard-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/customer-dashboard-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/customer-dashboard-security.md`
- Task tracker deltas:
  - Add dedicated planning tasks for customer dashboard scope after docs are materialized.
- New planning artifacts created:
  - `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`# Customer Dashboard Experience E2E Plan

## 0. Artifact Metadata
- Canonical artifact path: `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
- Affected downstream role docs:
  - `DOC/PROJECT PLAN/Frontend/customer-dashboard-frontend.md`
  - `DOC/PROJECT PLAN/Backend/customer-dashboard-backend.md`
  - `DOC/PROJECT PLAN/API and Data/customer-dashboard-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/customer-dashboard-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/customer-dashboard-security.md`
- Planning request source: Operator request on 2026-06-29 to plan the full signed-in customer dashboard, identify dead-end UX and missing backend flows, and define end-to-end implementation coverage.
- Planning mode: Scale-existing
- Status: Active — planning complete, implementation not started
- Last updated: 2026-06-29

## 1. Planning Mode And Objective
- Planning mode: scale-existing
- Why this mode fits the request:
  - The workspace already contains `/dashboard/**` routes, a reusable `DashboardShell`, protected customer APIs, Clerk auth, downloads, orders, appointments, and service-request plumbing.
  - The missing work is not greenfield auth or commerce. It is the completion of the customer portal into a fully connected post-sign-in experience.
- Scope boundaries:
  - Customer dashboard overview, products, downloads, orders, appointments, support, notifications, and profile/settings UX.
  - Public chrome compatibility so signed-in customer pages feel like part of the site rather than an isolated internal console.
  - Backend orchestration, API contracts, schema additions, support-thread model, and customer-safe order/download timelines.
  - Admin operator mirror flows needed to respond to customer dashboard actions.
- Explicit non-goals:
  - No replacement of Clerk.
  - No replacement of the current admin dashboard shell.
  - No realtime websocket layer in this phase; polling and server refresh remain acceptable.
  - No CMS/Sanity ownership changes for public marketing content.
  - No billing-provider replatforming beyond already-planned invoice and manual-payment tracks.
- Current implementation compatibility requirements:
  - Preserve `/dashboard`, `/dashboard/products`, `/dashboard/downloads`, `/dashboard/orders`, `/dashboard/appointments`, `/dashboard/support`, and `/dashboard/login`.
  - Preserve current order, download, appointment, and service-request records while extending them.
  - Reuse the current `AppChrome`, `SiteTopChrome`, `Footer`, and `DashboardShell` rather than introducing a second shell hierarchy.
  - Keep `/admin/**` visually and operationally distinct from customer routes.

## 2. Current-State Audit

### Tracker Status
- Done:
  - Clerk customer auth routes and protected dashboard access baseline.
  - Customer dashboard route group exists.
  - Customer APIs exist for profile, orders, appointments, downloads, and licenses.
  - Support request creation exists via `POST /api/v1/service-requests`.
- Partial:
  - Customer dashboard UX is present but shallow.
  - Dashboard header/profile actions are not end-to-end functional.
  - Download flow is one-shot only, with no rich history or issue-handling path.
  - Orders and appointments are read-only summaries without detail or follow-up actions.
  - Support is submit-only and not a full conversation or tracking surface.
- Blocked:
  - No canonical customer-dashboard-specific plan existed before this artifact.
- Not started:
  - Profile/settings modal flow.
  - Notification center backed by real data.
  - Support thread UI and customer-visible status history.
  - Customer-safe detail modals for orders, downloads, and appointments.

### Existing Codebase Inventory
- Reusable routes:
  - `web/src/app/dashboard/**`
  - `web/src/app/dashboard/login/page.tsx`
- Reusable layouts and shells:
  - `web/src/components/shell/AppChrome.tsx`
  - `web/src/components/dashboard/DashboardShell.tsx`
  - `web/src/components/dashboard/DashboardHeaderControls.tsx`
- Reusable sections and components:
  - `Card`, `Button`, `LinkButton`, theme toggle, popovers, site header/footer, chat launcher, mobile nav.
- Reusable data/store modules:
  - `web/src/server/data/schema.ts`
  - `web/src/server/data/store.ts`
  - `web/src/server/domain/orders.ts`
  - `web/src/server/domain/downloads.ts`
  - `web/src/server/domain/service-requests.ts`
  - `web/src/server/domain/notifications.ts`
- Existing API handlers and contracts:
  - `GET /api/v1/me`
  - `POST /api/v1/me/update`
  - `GET /api/v1/me/orders`
  - `GET /api/v1/me/appointments`
  - `GET /api/v1/me/downloads`
  - `GET /api/v1/me/licenses`
  - `POST /api/v1/downloads/[downloadId]/signed-url`
  - `POST /api/v1/service-requests`
- Existing CMS or Studio schemas:
  - None needed for dashboard transactional UI.
- Existing admin/operator flows:
  - Admin dashboard routes and order, inquiry, appointment, download, license, analytics endpoints already exist.
- Existing integrations already wired:
  - Clerk, Supabase/file-store dual mode, Resend, Lark, Stripe placeholder, S3 planned, calendar placeholder patterns.

### Reuse-First Delta Map
- Reuse without changes:
  - Clerk sign-in/sign-up routes and middleware protection.
  - Public top chrome primitives and footer implementation.
  - Core transactional entities: orders, downloads, licenses, appointments, service requests.
- Extend carefully:
  - `AppChrome` and `DashboardShell` composition so dashboard pages can expose public header/footer without trapping the user in a full-screen internal app frame.
  - `CustomerDashboard.tsx` from a single summary renderer into a route-aware dashboard module system.
  - `DashboardHeaderControls.tsx` from placeholder popovers into functional notification/profile actions.
  - `/api/v1/me/update` into a broader profile/preferences endpoint family.
- Refactor in place:
  - Split dashboard data aggregation from the monolithic `CustomerDashboard.tsx` component.
  - Separate customer-visible support thread records from internal-only admin notes.
  - Normalize dashboard notifications and customer timeline states instead of embedding fake notifications in UI.
- Net-new additions that are truly required:
  - Customer profile and preference persistence.
  - Notification center data model and endpoints.
  - Support-thread message model and customer-visible conversation endpoints.
  - Detail modal and drawer contract for orders, downloads, appointments, and settings.
  - Customer-safe request flows for reschedule, cancel, issue-report, and data/account requests.
- Items rejected to avoid architecture drift:
  - No separate dashboard micro-frontend.
  - No separate BFF service just for the dashboard.
  - No Sanity-managed customer dashboard content model.
  - No Pusher requirement in this phase.

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js | Active App Router | Reuse | Required now | Dashboard remains route-based under current app |
| React | Active | Reuse | Required now | Modal-first interactions stay in React client components |
| TypeScript | Active | Reuse | Required now | All new dashboard contracts typed end-to-end |
| Sanity CMS | Active for public content | Exclude from dashboard ownership | Excluded for this scope | Dashboard is transactional, not editorial |
| Supabase | Partial transactional target | Extend | Required now | Dashboard needs normalized customer-profile and support-thread data |
| PostgreSQL | Via Supabase | Extend | Required now | Additive schema only |
| Prisma | Not present | Exclude | Excluded | Existing direct store/domain pattern remains preferred |
| Lark | Active for operator notifications | Extend | Required later in dashboard implementation | Use for escalated support/order/appointment updates |
| Resend | Active | Extend | Required now | Customer notification and support-thread email updates |
| Pusher | Not present | Defer | Later | Polling and refresh states are sufficient in this phase |
| S3 | Planned | Reuse planned path | Later | Needed for download asset lifecycle, not for dashboard UI planning |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog: unchanged; no dashboard ownership.
- Services: unchanged; dashboard may link to service routes only.
- Shop/catalog: dashboard consumes transactional product entitlements, not CMS authoring.
- Case studies/portfolio: unchanged; dashboard may link out to relevant public content.
- FAQ, landing pages, and static trust content: unchanged; customer help copy stays code-authored in this scope.

### Sanity Structure
- Document types: no new dashboard document types.
- Field groups and validation: not applicable for dashboard transactions.
- Taxonomies and references: no new Sanity taxonomies required.
- Media model: customer avatar and document attachments belong in transactional storage, not Sanity.
- Slug and preview rules: not applicable.
- Draft, review, publish flow: not applicable.
- Revalidation or cache invalidation model: dashboard remains `no-store` and server-authoritative.
- Studio runtime and deployment isolation plan: unchanged.

### Editorial And Operator Workflow
- Who creates blog posts and where: unchanged in Sanity Studio.
- How services are created or updated: unchanged in existing public-content/admin plans.
- How shop content is managed: unchanged for catalog authoring; dashboard only reads entitlement-facing outputs.
- How portfolio and proof content is managed: unchanged.
- What belongs in Sanity Studio vs admin dashboard vs code:
  - Sanity Studio: public editorial content.
  - Admin dashboard: operator responses, support-thread handling, appointment/order operations, customer-facing status visibility.
  - Code: dashboard layout, modal UX, route logic, customer-state rendering, notification orchestration.

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
  - Identity: Clerk.
  - User mirror and role: `users` in Supabase/file-backed fallback.
  - Profile details and dashboard preferences: new transactional profile tables.
  - Orders, downloads, licenses, appointments, support requests: existing transactional tables/domains extended in place.
  - Customer notifications: new dashboard notifications table.
- Supabase responsibilities:
  - Persist customer profile data, preference settings, notification states, support-thread messages, and customer request workflows.
  - Remain source of truth for read models powering `/dashboard/**`.
- PostgreSQL schema impact:
  - Add `customer_profiles` table: `user_id`, `phone`, `company_name`, `job_title`, `timezone`, `avatar_url`, `country_code`, `marketing_opt_in`, `created_at`, `updated_at`.
  - Add `customer_preferences` table: `user_id`, `email_order_updates`, `email_support_updates`, `email_marketing`, `preferred_contact_channel`, `ui_preferences_json`, timestamps.
  - Add `dashboard_notifications` table: `id`, `user_id`, `kind`, `title`, `body`, `cta_href`, `read_at`, `created_at`, `metadata`.
  - Add `service_request_messages` table: `id`, `service_request_id`, `author_type`, `author_user_id`, `body`, `visibility`, `created_at`.
  - Extend `appointments` with customer-request fields: `reschedule_requested_at`, `cancellation_requested_at`, `customer_note`, `customer_action_status`.
  - Add `customer_account_requests` table for data export / deletion / access requests.
- Prisma decision and justification:
  - Excluded. The existing direct domain/store approach is already live and avoids introducing a second schema source.
- Row-level security or access policy considerations:
  - Customer reads and writes limited to owned records only.
  - Internal-only notes/messages separated from customer-visible messages.
  - Notifications readable by owner only.
  - Account-request records readable by owner + admin only.
- File or asset storage plan:
  - Continue S3/private-download path for deliverables.
  - Customer avatar storage may reuse S3 later; until then avatar remains optional and nullable.
- Data migration or backfill needs:
  - Backfill `customer_profiles` from existing `users` mirror where possible.
  - Existing service requests can initialize with zero thread messages.
  - Existing orders/downloads derive dashboard detail summaries without destructive migration.

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark | Operator escalation for customer issues | support escalation, appointment issue, order problem | backend/admin ops | audit log + no-op notification | Reuse existing notification channel |
| Resend | Customer emails from dashboard actions | support replies, profile/account requests, appointment updates | backend/customer dashboard | in-app status only + audit log | Required for customer-visible follow-up |
| Pusher | Realtime updates | notification center, support thread live refresh | frontend/backend | polling fallback | Deferred |
| S3 | Download assets, optional avatars later | download authorization, later asset attachments | backend/downloads | contact-us fallback | Existing downloads path remains canonical |
| Payments | Order and invoice status reflection | order detail, invoice detail, payment pending/resolved | orders/domain | manual status fallback | Reuse current order/payment domain |
| Calendar | Appointment state and customer request handling | reschedule/cancel request, confirmation updates | appointment domain | manual ops queue fallback | Existing appointment workflow extended |

## 7. Global Site Invariants
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- Customer dashboard must visually read as a signed-in extension of the public site, while still preserving a focused workspace interior.
- Public header and footer remain canonical outer chrome for customer routes; admin routes remain excluded.
- The common footer copyright string must be planned as:
  `© {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.`
- Link `Growrix OS` to `https://www.growrixos.com`.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs:
  - Existing role model, dashboard routes, order/download/support entities.
- Deliverables:
  - Customer dashboard route map, page-to-flow matrix, modal taxonomy, ownership boundaries, and customer-vs-admin visibility rules.
- Reuse targets:
  - Existing `customer`, `subscriber`, `admin` role model and `/dashboard/**` surface.
- Entry criteria:
  - Current route audit complete.
- Exit criteria:
  - Every dashboard page and modal has an explicit backend/data owner and user outcome.
- Risks and fallback:
  - Risk: dashboard expands into a second admin app. Fallback: enforce customer-only scope and public chrome invariant.

### CMS And Content Operations
- Inputs:
  - Public content routing only.
- Deliverables:
  - Explicit exclusion of Sanity for transactional dashboard surfaces.
- Reuse targets:
  - Existing product/service/public route content.
- Entry criteria:
  - Dashboard scope confirmed as transactional.
- Exit criteria:
  - No dashboard implementation depends on new CMS content models.
- Risks and fallback:
  - Risk: support/help copy drifts across code and CMS. Fallback: keep dashboard help copy code-authored in this phase.

### Frontend
- Inputs:
  - Shared contracts, current `AppChrome`, `DashboardShell`, and dashboard routes.
- Deliverables:
  - Public-chrome-aware dashboard composition.
  - Modal-first UX for profile settings, notifications, order detail, download detail, appointment detail, support thread, and account requests.
  - Route-specific flows for overview, products, downloads, orders, appointments, support, profile/security deep links.
- Reuse targets:
  - `AppChrome`, `SiteTopChrome`, `Footer`, `MobileBottomNav`, `DashboardShell`, primitives, `LinkButton`, existing route wrappers.
- Entry criteria:
  - Layout contract approved.
- Exit criteria:
  - Every dashboard view has complete loading/empty/error/success states and action affordances.
- Risks and fallback:
  - Risk: footer/header fight with `h-screen` dashboard shell. Fallback: convert shell interior to content-height sections under public chrome rather than full viewport lock.

### Backend
- Inputs:
  - Existing domains for orders, downloads, appointments, service requests, and notifications.
- Deliverables:
  - Dashboard aggregator service.
  - Customer profile/preferences service.
  - Support thread service and customer action orchestrators.
  - Notification service extensions.
- Reuse targets:
  - `orders.ts`, `downloads.ts`, `service-requests.ts`, `notifications.ts`, `guards.ts`, `clerk-sync.ts`.
- Entry criteria:
  - Schema and API delta approved.
- Exit criteria:
  - Customer dashboard actions no longer depend on frontend-only placeholder state.
- Risks and fallback:
  - Risk: domain sprawl. Fallback: keep dashboard orchestration layered on existing transactional domains.

### API And Data
- Inputs:
  - Existing `/api/v1/me/**` family and service-request endpoint.
- Deliverables:
  - `GET /api/v1/me/dashboard`
  - `GET/PATCH /api/v1/me/profile`
  - `GET/PATCH /api/v1/me/preferences`
  - `GET /api/v1/me/notifications`
  - `POST /api/v1/me/notifications/[id]/read`
  - `GET /api/v1/me/service-requests`
  - `GET/POST /api/v1/me/service-requests/[id]/messages`
  - `POST /api/v1/me/appointments/[id]/reschedule-request`
  - `POST /api/v1/me/appointments/[id]/cancel-request`
  - `POST /api/v1/me/account-requests`
- Reuse targets:
  - Current response envelope and ownership guards.
- Entry criteria:
  - Schema delta approved.
- Exit criteria:
  - All dashboard actions are backed by explicit APIs and owned tables.
- Risks and fallback:
  - Risk: customer writes leak into admin/internal notes. Fallback: visibility field split and separate endpoints.

### Security
- Inputs:
  - Existing Clerk auth, route protection, signed-download ownership checks.
- Deliverables:
  - Ownership matrix for every dashboard entity.
  - Customer-safe message visibility rules.
  - Session/account request, notification privacy, and export/delete controls.
- Entry criteria:
  - Endpoint list frozen.
- Exit criteria:
  - No dashboard mutation can expose another customer’s data or internal-only admin notes.
- Risks and fallback:
  - Risk: customer route inherits admin affordances from reused shell primitives. Fallback: explicit customer-only action whitelist.

### DevOps
- Inputs:
  - Existing no-store dashboard policy and release-gate setup.
- Deliverables:
  - Dashboard auth smoke in CI.
  - Route-level readiness checks for `/dashboard`, `/dashboard/orders`, `/dashboard/downloads`, `/dashboard/support`.
- Entry criteria:
  - Frontend/backend contracts frozen.
- Exit criteria:
  - Protected-route smoke checks are automated in release gates.
- Risks and fallback:
  - Risk: authenticated E2E flakiness. Fallback: seeded customer fixture and Clerk test-mode/session bootstrap strategy.

### CMS Studio Runtime Isolation Checklist
- Studio directory and package manifest audited: yes, already isolated.
- Studio lockfile strategy defined: yes, unchanged.
- Node version policy defined for Studio: yes, unchanged.
- Root install/deploy coupling explicitly accepted or rejected: rejected.
- Separate CI workflow defined: yes, unchanged.
- Separate hosting project and CMS domain defined: yes, unchanged.

### QA
- Inputs:
  - Final route/action matrix.
- Deliverables:
  - Dashboard-specific unit, integration, authenticated E2E, accessibility, and regression plan.
- Entry criteria:
  - Page flows and endpoint contracts approved.
- Exit criteria:
  - Every dashboard page has a validated end flow from entry to resolution.
- Risks and fallback:
  - Risk: modal-heavy flows regress mobile usability. Fallback: route fallback pages for deep links and keyboard escape hatches.

## 9. Execution Backlog
1. Create shared contracts delta for customer dashboard routes, modal taxonomy, ownership rules, and page-to-flow matrix; owner hint: planning/shared-contracts; dependency: current dashboard audit; target docs/files: `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`, shared-contract updates if later required.
2. Refactor customer dashboard shell to operate inside public chrome and remove the current full-viewport isolation pattern; owner hint: frontend; dependency: backlog item 1; target files: `web/src/components/shell/AppChrome.tsx`, `web/src/components/dashboard/DashboardShell.tsx`, `web/src/app/dashboard/**`.
3. Build real notification center with read/unread state and activity-driven messages; owner hint: frontend/backend/api-data; dependency: notification schema; target files: `DashboardHeaderControls.tsx`, `/api/v1/me/notifications`, domain notification modules.
4. Build profile settings and preferences flow with modal-first UI and route fallback; owner hint: frontend/backend/api-data/security; dependency: customer profile schema; target files: `/dashboard/profile` fallback route, profile modal components, `/api/v1/me/profile`, `/api/v1/me/preferences`.
5. Add order detail modal + order timeline + invoice/download status summary; owner hint: frontend/backend/api-data; dependency: aggregated order detail contract; target files: `CustomerDashboard.tsx`, order domain/read models, `/api/v1/me/orders` or detail endpoint.
6. Add download detail modal and issue-report path; owner hint: frontend/backend; dependency: support-thread model; target files: downloads view, signed-url flow, support request linking.
7. Add appointment detail, reschedule request, and cancellation request UX; owner hint: frontend/backend/api-data; dependency: appointment action endpoints; target files: appointments view, appointment domain/API.
8. Replace submit-only support page with support inbox, thread view, message composer, and status chips; owner hint: frontend/backend/api-data/admin; dependency: service-request message model; target files: `/dashboard/support`, service request APIs, admin queue mirror.
9. Extend admin dashboard so operators can answer customer-originated dashboard requests with customer-visible replies and internal-only notes separated; owner hint: admin/backend; dependency: support-thread schema; target files: `/admin/**`, admin APIs.
10. Add authenticated release gates for sign-up -> dashboard -> profile update -> support request -> download authorize happy path; owner hint: QA/frontend/backend; dependency: implementation completion; target files: Playwright suite, integration tests.

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation | dashboard frontend, APIs, domain modules | Yes | Frontend/Backend | lint, typecheck, build pass |
| Unit tests | profile service, notification helpers, support-thread logic | Yes | Backend | green unit suite |
| Integration tests | `/api/v1/me/**`, support-thread, appointment action, account request endpoints | Yes | API/Data | passing integration tests |
| E2E tests | sign-in/sign-up, dashboard overview, profile modal, support thread, download authorize, order detail | Yes | QA | authenticated Playwright evidence |
| Accessibility | public chrome + dashboard combined layout, popovers, dialogs, forms | Yes | Frontend/QA | Axe + manual keyboard evidence |
| Performance | dashboard initial load and protected route hydration | Yes | QA/DevOps | route timing and no severe regressions |
| Security | ownership, signed download, note visibility, account request protection | Yes | Security | authz test evidence |
| Regression | public site header/footer, auth redirects, admin dashboard | Yes | QA | regression report |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
  - The current dashboard shell may continue to suppress footer visibility until its viewport-lock layout is refactored.
  - Customer support threads can leak internal notes if visibility boundaries are not explicit.
  - Dashboard expansion may drift into an admin-like workspace if the public-chrome invariant is not enforced.
- Assumptions:
  - Clerk remains canonical auth provider.
  - Supabase/Postgres remains the target transactional store.
  - Customer dashboard can rely on polling/refetch instead of realtime transport in this phase.
- Open decisions:
  - Whether profile/settings should be modal-first only or also get dedicated `/dashboard/profile` and `/dashboard/security` deep-link routes.
  - Whether customer notifications should be generated exclusively from existing audit/business events or also support manual admin-authored notices.
  - Whether appointment reschedule/cancel requests should be customer-self-service mutations or queue-only requests awaiting manual approval.

## 12. Tracker And Documentation Updates
- Files updated:
  - `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
  - `DOC/PROJECT PLAN/README.md`
  - `DOC/PROJECT PLAN/ai-context.yaml`
  - `DOC/PROJECT PLAN/Tasks/tasks.md`
- Downstream role docs updated:
  - `DOC/PROJECT PLAN/Frontend/customer-dashboard-frontend.md`
  - `DOC/PROJECT PLAN/Backend/customer-dashboard-backend.md`
  - `DOC/PROJECT PLAN/API and Data/customer-dashboard-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/customer-dashboard-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/customer-dashboard-security.md`
- Task tracker deltas:
  - Added customer-dashboard planning entry and follow-up execution tasks.
- New planning artifacts created:
  - `DOC/PROJECT PLAN/customer-dashboard-experience-e2e-plan.md`
