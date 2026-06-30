---
document_type: role-plan
role: Backend
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Sign-up Gate — Backend Plan

## Module diff summary

| File | Change |
|---|---|
| `web/src/server/data/schema.ts` | `UserRecord.signup_completed_at?: string`, `UserRecord.signup_intent_source?: SignupIntentSource` |
| `web/src/server/auth/clerk-sync.ts` | `upsertUserFromClerk` preserves existing `signup_completed_at`; never sets it from webhook events |
| `web/src/server/auth/guards.ts` | Drop the session-claims auto-upsert at lines 78–96. Add `requireCompletedSubscriber(request)` |
| `web/src/proxy.ts` | When Clerk session exists, fetch user via `getUserByClerkId` (server-only), redirect `/dashboard/**` (excluding `/dashboard/login`) to `/complete-account` if `signup_completed_at` is null |
| `web/src/app/api/v1/me/complete-signup/route.ts` | NEW. POST endpoint that sets `signup_completed_at` once |
| `web/src/app/complete-account/page.tsx` | NEW. Server wrapper that loads viewer + renders the form |
| `web/src/app/complete-account/CompleteAccountForm.tsx` | NEW. Client form |

## Type additions

```ts
// schema.ts
export type SignupIntentSource =
  | "self_signup"
  | "purchase_intent"
  | "invited"
  | "admin_seed";

export type UserRecord = {
  // ...existing fields
  signup_completed_at?: string;
  signup_intent_source?: SignupIntentSource;
};
```

## Endpoint contract: `POST /api/v1/me/complete-signup`

Request body:

```json
{
  "accepted_terms": true,
  "marketing_opt_in": false,
  "phone": "+15551234567"
}
```

Validation:

- `accepted_terms` MUST be `true`. 400 otherwise.
- `phone` optional, trimmed. No format validation (legacy modal does not validate either; consistency wins).
- Marketing opt-in optional, defaults to false.

Auth:

- Requires Clerk session. Falls through to 401 if no session.
- If the user already has `signup_completed_at` set, returns 409 `ALREADY_COMPLETED` (idempotent reject; UI redirects to `/dashboard`).

Response:

```json
{
  "data": { "user": <updated UserRecord without password_hash> },
  "timestamp": "...",
  "request_id": "..."
}
```

Side effects:

- `writeDatabase` update sets `signup_completed_at = now`, `signup_intent_source = "self_signup"`, `marketing_opt_in`, optional `phone`, `updated_at = now`.
- `recordAuditLog({ level: "info", action: "auth.signup_completed", actor_email, metadata: { source: "self_signup" } })`.

## Guard helper: `requireCompletedSubscriber`

```ts
export async function requireCompletedSubscriber(request: Request | NextRequest) {
  const user = await requireAuthenticatedUser(request);
  // Look up the raw record so we can check signup_completed_at, which is not on AuthenticatedUser.
  const record = await getUserById(user.id);
  if (!record?.signup_completed_at) {
    await recordAuditLog({
      level: "warning",
      action: "auth.signup_blocked_incomplete",
      actor_email: user.email,
      metadata: { path: new URL(request.url).pathname },
    });
    throw new ApiError("FORBIDDEN", 403, "Complete your account to continue.");
  }
  return user;
}
```

Replace usage of `requireAuthenticatedUser` with `requireCompletedSubscriber` in all `/api/v1/me/*` route handlers EXCEPT `/api/v1/me/complete-signup` and `/api/v1/me/update` (so users can read their own record before completion).

## Middleware change (`web/src/proxy.ts`)

In the `clerkProxy` handler, when `auth.userId` exists and `request.nextUrl.pathname.startsWith("/dashboard")` and the path is NOT `/dashboard/login` or `/complete-account`:

- Fetch the user record via the SAME server-only path that guards.ts uses, OR call an internal lookup helper that does the cookie-based check.
- Edge runtime caveat: Next.js middleware runs on the Edge runtime by default. `readDatabase()` uses `node:fs` for the JSON fallback and `@supabase/supabase-js` for the live path — both are Node-only. Mitigation: switch the proxy lookup to a fetch against an internal `/api/v1/me/completion-status` endpoint, OR move the proxy to the Node runtime via `export const runtime = "nodejs"`. Decision during implementation: **add `export const runtime = "nodejs"` to `web/src/proxy.ts`**. This avoids round-trip cost on every dashboard request.

Logic:

```ts
const sessionUserId = auth.userId;
const path = request.nextUrl.pathname;
const isDashboard = path === "/dashboard" || path.startsWith("/dashboard/");
const isCompleteAccount = path === "/complete-account" || path.startsWith("/complete-account/");
const isDashboardLogin = path.startsWith("/dashboard/login");

if (sessionUserId && isDashboard && !isDashboardLogin && !isCompleteAccount) {
  const user = await getUserByClerkId(sessionUserId);
  if (!user?.signup_completed_at) {
    const url = request.nextUrl.clone();
    url.pathname = "/complete-account";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }
}
```

## Tests to add (in order of priority)

1. **Unit / `web/tests/unit/auth-guards.test.ts`** — verify `requireCompletedSubscriber` rejects sessions without `signup_completed_at` (mock `getUserById`).
2. **Integration / `web/tests/integration/auth-signup-gate.test.ts`** — POST `/api/v1/me/complete-signup` happy path + double-submit (409) + missing terms (400).
3. **E2E (deferred to Phase 5 mobile pass)** — Playwright: brand-new sign-up → `/complete-account` → `/dashboard`.

## Backfill plan for existing Clerk users

On deploy of this phase, the production database will have N existing Clerk users without `signup_completed_at`. Two options:

1. **Backfill all existing users** to `signup_completed_at = users.created_at`. Single migration script run by operator after deploy. Safe because anyone who got in pre-gate is already in.
2. **Force them through `/complete-account` on next visit.** Higher friction; not chosen.

Chosen: option 1. Implementation lands in `web/scripts/backfill-signup-completed-at.mjs` (operator-run, idempotent). Documented in commit message.
