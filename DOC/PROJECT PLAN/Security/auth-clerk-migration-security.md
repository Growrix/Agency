# Auth Clerk Migration — Security

## Threat model

- Session hijacking mitigated by Clerk-managed httpOnly session cookies.
- Webhook spoofing blocked by mandatory signature verification.
- Privilege escalation blocked by server-side role checks on mirror record, not client metadata alone.

## Required controls

1. Verify every Clerk webhook with signing secret.
2. `requireAdminUser` must check local mirror `role === "admin"` after Clerk `userId` resolution.
3. Never expose `CLERK_SECRET_KEY` or webhook secret to client bundles.
4. Rate-limit deprecated auth API routes until removal.
5. CSP updated for Clerk script/connect/frame sources in `next.config.ts`.

## Admin bootstrap

First admin: set `publicMetadata.role = "admin"` in Clerk Dashboard for operator account; webhook syncs mirror.

## Test harness exception

Legacy JWT allowed only when `NODE_ENV=test` and Clerk keys absent — never in production.

## Exit criteria

- Unauthorized admin API returns 401.
- Invalid webhook signature returns 400/401.
- No passwords in database mirror.
