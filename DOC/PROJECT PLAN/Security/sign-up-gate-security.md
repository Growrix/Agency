---
document_type: role-plan
role: Security
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Sign-up Gate — Security Plan

## Threat model

| # | Threat | Today | After gate |
|---|--------|-------|------------|
| T1 | Any Google account can reach `/dashboard` and `/api/v1/me/*` | Open. Clerk session + guards.ts session-claims fallback auto-creates a local `subscriber` and admits the user | Closed. Guard requires `signup_completed_at` set via deliberate `/complete-account` step |
| T2 | Webhook handler accepts events without verifying signatures | Closed (operator gap). `verifyWebhook(...)` already runs; missing `CLERK_WEBHOOK_SIGNING_SECRET` returns 503 (fail-closed) | Same. Operator action: set the secret in Clerk dashboard + `.env.local`. No code change |
| T3 | Bypass of email verification on social providers (OAuth) | Open. Clerk dashboard default may not enforce email-verification on Google | Closed. Operator action: enable "Email verification required" for ALL strategies in Clerk dashboard |
| T4 | Privilege escalation via `public_metadata.role` injection through webhook | Partial. Webhook already validates role against `"admin" | "customer" | "subscriber"` allow-list | Same. Guarded by allow-list; admin assignment still requires deliberate operator action via `/admin/users` (Phase 4 D3) |
| T5 | CSRF on `/complete-account` POST | N/A today | Closed. Same-origin POST + Clerk session check + idempotent (no-op if already completed) |

## Required code controls (Phase 1 / S1)

1. `web/src/server/auth/guards.ts` — remove the session-claims fallback path (lines 78–96). If `getUserByClerkId` and `syncClerkUser` both return null, `getAuthenticatedUser` returns null. Add `requireCompletedSubscriber(request)` that fails closed when `signup_completed_at` is not set.
2. `web/src/server/data/schema.ts` — `UserRecord` gains `signup_completed_at?: string` and `signup_intent_source?: SignupIntentSource`. The field defaults to undefined.
3. `web/src/server/auth/clerk-sync.ts` — `upsertUserFromClerk` never sets `signup_completed_at`. The completion endpoint is the only writer.
4. `web/src/proxy.ts` — middleware redirects authenticated-but-unfinished sessions to `/complete-account` for `/dashboard/**` and `/api/v1/me/*` (excluding the completion endpoint itself).
5. `web/src/app/api/v1/me/complete-signup/route.ts` — only path that sets `signup_completed_at`. Requires Clerk session, accepts terms + optional phone + marketing opt-in, idempotent reject on already-completed users (409).

## Required operator controls

- Clerk dashboard → User & Authentication → Email & Password → Email verification → "Require verification at sign-up" ON.
- Clerk dashboard → Social Connections → Google → Verified email required ON.
- Clerk dashboard → Webhooks → endpoint URL + copy signing secret into `CLERK_WEBHOOK_SIGNING_SECRET`.

## Audit log surface

| Action | Level | When |
|---|---|---|
| `auth.signup_completed` | info | `/api/v1/me/complete-signup` succeeds |
| `auth.signup_blocked_incomplete` | warning | `requireCompletedSubscriber` rejects a request from a session without `signup_completed_at` |
| `auth.webhook_signature_invalid` | error | `verifyWebhook(...)` throws (already wired; reuse) |

## Acceptance criteria

- A brand-new Google account that has never signed up here lands on `/complete-account`, NOT `/dashboard`.
- `/api/v1/me/*` returns 403 for Clerk-backed sessions without `signup_completed_at`.
- Replaying a webhook with a tampered signature returns 401 (already wired; add audit-log entry for visibility).
- Existing local users with no `clerk_user_id` (legacy seed/admin, integration-test fixtures) continue to authenticate via legacy cookie path AND bypass the completion gate. They authenticated via password, which is itself a deliberate registration.
- Existing Clerk users already in the database get backfilled with `signup_completed_at` set to their `created_at` on first sign-in after deploy (one-time migration in `complete-signup` endpoint or a small backfill script — TBD during implementation).

## Rollback

- Re-enabling the session-claims fallback is a single-file revert in `guards.ts`. Documented in commit message as "REVERT to restore pre-S1 behavior."
- Field addition is additive; no destructive migration.
