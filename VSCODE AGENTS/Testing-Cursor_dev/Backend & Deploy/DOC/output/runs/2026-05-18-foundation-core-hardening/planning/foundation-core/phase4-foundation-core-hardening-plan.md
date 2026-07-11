# Phase 4 Foundation-Core Hardening Plan (High Value, Low Chaos)

## 1. Mission
Upgrade Foundation-Core as the reusable backend blueprint first, then let Phase 5 materialize those capabilities into template roots.

This plan is intentionally scoped to cross-project runtime primitives only.
No template-specific page logic or project-specific content decisions are allowed in this phase.

## 2. Current Foundation-Core Audit Snapshot

Status legend:
- implemented: capability exists and is wired
- partial: capability exists but is not production-complete
- missing: capability not present yet

### Content Layer (CMS)
- implemented: content provider switch fixtures/sanity via CONTENT_SOURCE
- implemented: content APIs for page, collection, site-config
- implemented: webhook signature validation + revalidate API contract
- implemented: preview enable flow with token gate
- partial: Sanity querying exists but schema/studio ownership is not implemented in repo
- partial: typed DTO mapping exists, but no generated CMS type contract pipeline
- missing: deterministic seed pipeline from baseline fixtures to CMS documents

### Forms Pipeline
- implemented: Zod request validation
- implemented: honeypot trap and rate-limit flow
- implemented: provider delivery via Resend and optional Lark notification
- implemented: optional DB persistence (postgres)
- partial: rate limiting is in-memory only (not distributed)
- partial: no unified provider adapter contract (email/logging/notifications are coupled)
- missing: durable delivery log model with retry/attempt lifecycle for operators

### Media Pipeline
- implemented: upload-intent abstraction with signed S3 URL and fallback mode
- partial: storage adapter supports S3-compatible endpoints, but no metadata extraction
- missing: responsive image metadata pipeline (width/height/format/placeholder)
- missing: signed read URL strategy for private assets (only upload signing exists)

### Auth and Session
- implemented: signed session token verification and snapshot endpoint
- partial: role data can be read from token, but no reusable role guard helpers
- missing: route-guard utilities for private/admin API surfaces

### Env and Readiness
- implemented: strict env schema validation with adapter readiness model
- implemented: health endpoint and runtime summary
- partial: startup diagnostics are available through smoke behavior, but no explicit diagnostic report endpoint

### Observability
- implemented: request-id generation and envelope response shape
- partial: event notifications (Lark) exist for a subset of failures/events
- missing: structured logger abstraction with correlation propagation across modules
- missing: first-class error tracking hooks (Sentry)
- missing: product analytics hooks (PostHog/GA4) at backend event boundaries

## 3. Safety Constraints for Phase 4 Execution
- Work only in Foundation-Core runtime plus Foundation lane docs/contracts.
- Preserve Phase 1-3 frontend and template runtime behavior.
- Keep optional integrations non-blocking at boot.
- Do not invent provider env vars, SDK members, or endpoint contracts.
- If a provider requires rules that are not in the knowledge base, block and record `MISSING_KNOWLEDGE`.

Important governance note:
- The repository currently references knowledge/integration-rules in core governance, but that folder is missing.
- For new provider-specific additions, the agent must either:
  - use already-existing verified runtime patterns in this repo, or
  - stop and request the missing knowledge entries before adding new provider contracts.

## 4. Build Plan (Ordered)

## Phase A - Content Layer Hardening (Priority 1)
Goal: make CMS reusable and deterministic, not project-specific.

Deliverables:
- Add a CMS domain contract package inside Foundation-Core for:
  - document types to support existing DTO contracts (page, collection, site-config)
  - normalized field contracts and slug invariants
- Add Sanity schema ownership and versioned schema registry in Foundation-Core.
- Add deterministic seed command:
  - source: foundation fixtures
  - output: idempotent upsert into CMS
- Strengthen preview/revalidate lifecycle:
  - event filtering and path derivation tests
  - secret validation + failure telemetry consistency

Acceptance checks:
- content endpoints pass unit/integration tests in fixtures and sanity modes
- seed command runs idempotently with no schema drift
- revalidation contract tests pass for valid/invalid signatures and payload variants

## Phase B - Forms Pipeline Hardening (Priority 2)
Goal: reliable lead ingestion with provider abstraction and operator visibility.

Deliverables:
- Introduce forms provider adapter boundary:
  - delivery adapter (email)
  - notification adapter (ops)
  - persistence adapter (database)
- Add durable submission/delivery log model with status lifecycle:
  - accepted, persisted, delivered, notify_failed, delivery_failed
- Upgrade rate limiting abstraction to support distributed backing (Upstash when enabled) while preserving local fallback.
- Add replay-safe idempotency key handling on submission paths.

Acceptance checks:
- form submit route tests cover success, validation error, honeypot, rate-limit, provider failure
- logs contain requestId and provider result for each submission
- local fallback mode still works with zero external providers configured

## Phase C - Media Pipeline Hardening (Priority 3)
Goal: reusable upload and asset contract suitable for frontend materialization.

Deliverables:
- Keep existing upload-intent route and add metadata extraction pipeline for image assets.
- Add asset record contract with metadata fields required for responsive rendering.
- Add optional signed-read URL helper for private/protected assets.
- Keep S3-compatible storage abstraction to allow S3 or R2 through endpoint config.

Acceptance checks:
- upload-intent and metadata creation are test-covered
- fallback mode remains deterministic when storage adapter is disabled

## Phase D - Auth/Session Baseline Hardening (Priority 4)
Goal: reusable access control primitives for downstream template routes.

Deliverables:
- Add reusable role guard helpers:
  - requireAuthenticated
  - requireAnyRole
  - requireAllRoles
- Apply guards to private/admin route contracts where relevant.
- Add tests for token role decoding and guard decisions.

Acceptance checks:
- unauthorized access paths return normalized envelope failures
- role-based tests pass across cookie and bearer token modes

## Phase E - Env, Readiness, and Startup Diagnostics (Priority 5)
Goal: predictable runtime readiness before attach/materialization phases.

Deliverables:
- Extend readiness output with categorized blocker classes:
  - required_for_boot
  - required_for_production
  - optional
- Add startup diagnostics endpoint/report for operator troubleshooting.
- Ensure verify/smoke scripts emit machine-readable readiness evidence.

Acceptance checks:
- verify command fails clearly on invalid env
- diagnostics output maps to env schema and adapter status without ambiguity

## Phase F - Observability Baseline (Priority 6)
Goal: consistent traceability without coupling to one project.

Deliverables:
- Add structured logger utility with requestId propagation.
- Add error tracking hook points (Sentry) as optional adapter.
- Add backend analytics event hook points (PostHog or GA4) as optional adapter.
- Add PII scrubbing rules for telemetry payloads.

Acceptance checks:
- requestId appears consistently in API logs and failure envelopes
- telemetry adapters remain non-blocking when not configured
- tests validate scrubbed payload behavior

## 5. Integrations Matrix (Use Now vs Add)

Use now (already present in runtime):
- CMS: Sanity (client + content switching present)
- Email: Resend
- Storage: S3-compatible adapter (supports custom endpoint)

Add now as optional adapters with fallback:
- Rate-limit/cache backing: Upstash Redis
- Error tracking: Sentry
- Product analytics: PostHog (or GA4)

Rule for all new adapter work:
- no provider-specific implementation without matching knowledge rule coverage

## 6. Definition of Done for Phase 4 Hardening
- Foundation-Core verify passes with zero warnings/errors.
- New capabilities are reusable and template-agnostic.
- Attach contract remains stable for Phase 5 materialization.
- ENV.example and RUN.md are updated for new optional adapters.
- Foundation self-audit records what is implemented now vs staged later.

## 7. Handoff Contract to Phase 5
When this plan is complete in Foundation-Core:
- Phase 5 copies/materializes the hardened modules into template root in single_root_independent mode.
- Phase 6 performs template-specific mapping/seed completion and environment binding.

## 8. Execution Prompt Block (Paste to Phase 4 Agent)
Use this exact intent with the Phase 4 Foundation Development Agent:

"Implement the Phase 4 Foundation-Core hardening plan at Backend & Deploy/DOC/output/runs/2026-05-18-foundation-core-hardening/planning/foundation-core/phase4-foundation-core-hardening-plan.md. Execute phases in order (A to F), keep template-agnostic boundaries, preserve fallback behavior, and stop with MISSING_KNOWLEDGE if provider-specific rules are unavailable. Validate with lint, typecheck, tests, build, and smoke from Foundation-Core root, then emit updated self-audit and readiness evidence."