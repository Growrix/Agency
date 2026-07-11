# Clerk Integration — Growrixos `web/` Addendum

## Split providers

| Concern | Provider |
|---------|----------|
| Identity / sessions | Clerk (`@clerk/nextjs`) |
| Operational persistence | Supabase `app_state` + JSON store (database only) |
| Removed | Supabase Auth (`signInWithPassword`, `admin.createUser`) |

## User mirror contract

`UserRecord` in `web/src/server/data/schema.ts`:

- `id` — internal stable ID used by orders, downloads, licenses
- `clerk_user_id` — Clerk `userId` (source of truth for identity)
- `email`, `role`, `first_name`, `last_name`
- `password_hash` — sentinel values only (`clerk-auth`, legacy migration); never real passwords

## Role mapping

| App role | Clerk source |
|----------|--------------|
| `admin` | `publicMetadata.role === "admin"` |
| `subscriber` | default on `user.created` webhook |
| `customer` | set by domain when commerce links user to paid order |

## Protected surfaces

- Pages: `/admin/**` (except login), `/dashboard/**` (except login)
- APIs: `/api/v1/admin/**`, `/api/v1/me/**`

## Webhook

- Route: `POST /api/webhooks/clerk`
- Verify with `CLERK_WEBHOOK_SIGNING_SECRET`
- Handle: `user.created`, `user.updated`, `user.deleted`
- Upsert local mirror idempotently by `clerk_user_id`

## Test harness

When `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are absent **and** `NODE_ENV=test`, guards may use the legacy JWT test session so unit/integration tests run without Clerk credentials. Production and local dev with Clerk keys must use Clerk only.
