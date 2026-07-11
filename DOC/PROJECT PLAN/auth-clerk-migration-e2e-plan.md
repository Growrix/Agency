# Auth Clerk Migration — End-to-End Plan

**Status:** LOCKED for implementation  
**Scope:** Full replacement of custom JWT + Supabase Auth with Clerk identity in `web/`  
**Persistence:** Supabase database / JSON store unchanged (auth provider swap only)

## Purpose

Migrate Growrix OS `web/` from custom `agency_session` JWT cookies and optional Supabase Auth to Clerk-managed sessions, while preserving commerce ownership (orders, downloads, licenses) via a stable internal user mirror.

## Current state (reuse audit)

| Component | Path | Action |
|-----------|------|--------|
| JWT session | `web/src/server/auth/token.ts` | Remove from production; retain test-only path when Clerk unset in `NODE_ENV=test` |
| User lifecycle | `web/src/server/auth/users.ts` | Remove Supabase Auth + bcrypt register/login; add Clerk mirror sync |
| Guards | `web/src/server/auth/guards.ts` | Resolve via Clerk `auth()` when configured |
| Route proxy | `web/src/proxy.ts` | Replace JWT check with `clerkMiddleware` |
| Login UI | `/admin/login`, `/dashboard/login` | Embed Clerk `<SignIn />` |
| Auth API | `/api/v1/auth/*` | Deprecate; return 410 or redirect guidance |
| Webhook | — | Add `POST /api/webhooks/clerk` |

## Identity boundary

- **Clerk** owns sessions, credentials, OAuth, MFA.
- **Local `users` collection** mirrors Clerk users for role and internal ID linkage.
- **Never** store passwords locally after cutover.

## User ID strategy

```
Clerk userId  ──webhook/sync──►  UserRecord.clerk_user_id
                                      │
                                      ▼
                               UserRecord.id (internal UUID)
                                      │
                    orders / downloads / licenses reference email + internal flows
```

1. Add `clerk_user_id?: string` to `UserRecord`.
2. On `user.created` webhook: create mirror with new internal `id` + `clerk_user_id`.
3. On sign-in before webhook: lazy upsert via `syncClerkUser()` in guards.
4. Existing users matched by email on first Clerk login; internal `id` preserved when email matches.

## Route matrix

| Route pattern | Protection |
|---------------|------------|
| `/admin/**` except `/admin/login` | Clerk session + `role === admin` |
| `/dashboard/**` except `/dashboard/login` | Clerk session |
| `/api/v1/admin/**` | Clerk session + admin role |
| `/api/v1/me/**` | Clerk session |
| Public marketing, shop browse, checkout | Public |

## UI matrix

| Surface | Implementation |
|---------|----------------|
| Admin login | `/admin/login` — `<SignIn />` with `forceRedirectUrl=/admin` |
| Customer login | `/dashboard/login` — `<SignIn />` with `forceRedirectUrl` from `next` param |
| Sign up | Clerk sign-up mode on dashboard login; optional `/sign-up` route |
| App chrome | `<UserButton />` in admin/dashboard shells when authenticated |

## Webhook contract

- **Endpoint:** `POST /api/webhooks/clerk`
- **Verification:** `CLERK_WEBHOOK_SIGNING_SECRET` via `@clerk/nextjs/webhooks`
- **Events:** `user.created`, `user.updated`, `user.deleted`
- **Behavior:** Idempotent upsert/soft-delete on local mirror

## RBAC

| Role | Source |
|------|--------|
| `admin` | Clerk `publicMetadata.role = "admin"` |
| `subscriber` | Default for new users |
| `customer` | Domain promotion on paid order (unchanged) |

Server: `requireAdminUser` checks mirror role after Clerk auth.

## Environment contract

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/dashboard/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/dashboard/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Supabase env vars remain for database only.

## Implementation slices

1. Schema + runtime config + packages
2. ClerkProvider + proxy middleware
3. Guards + user mirror sync
4. Webhook handler
5. Login UI swap
6. Deprecate legacy auth API
7. Tests + release gates

## Exit criteria

- [ ] All `npm run health:check` gates pass
- [ ] Admin unauthenticated → 401 API / login redirect (release gates)
- [ ] Customer download ownership tests pass
- [ ] Webhook signature rejection on invalid secret
- [ ] No Supabase Auth calls in `users.ts`
- [ ] Docs and tracker updated

## Downstream role docs

- [Security/auth-clerk-migration-security.md](Security/auth-clerk-migration-security.md)
- [Frontend/auth-clerk-migration-frontend.md](Frontend/auth-clerk-migration-frontend.md)
- [API and Data/auth-clerk-migration-api-data.md](API%20and%20Data/auth-clerk-migration-api-data.md)
