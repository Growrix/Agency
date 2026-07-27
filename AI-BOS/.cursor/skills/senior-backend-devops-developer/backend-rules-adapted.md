# Backend Rules Adapted — Growrixos `web/`

Mapped from B1–B14 to this monolith layout.

## B1 Layering

| Layer | Path |
|-------|------|
| Routes | `web/src/app/api/**/route.ts` |
| Domain | `web/src/server/domain/*.ts` |
| Data | `web/src/server/data/` |

## B2 Validation

- Zod schemas at route boundary (shared under `web/src/server/` or co-located)
- Webhooks: verify signature on raw body first

## B3 Auth

- **Clerk** is identity provider — `@clerk-nextjs-auth`
- Supabase = PostgreSQL only — not Supabase Auth
- Legacy JWT routes (`/api/v1/auth/*`) migrating to Clerk — do not extend JWT patterns for new features

## B4 Integrations

- Env from `getRuntimeConfig()` in `web/src/server/config/runtime.ts`
- Load one playbook from `@integration-platform/references/` per provider

## B5 Database

- Supabase / file-backed store via `web/src/server/data/`
- Multi-row atomic writes use transactions where supported

## B6–B8 Webhooks & idempotency

- Clerk: `/api/webhooks/clerk`
- Stripe: `/api/v1/orders/webhook`
- Idempotent by provider event ID; persist audit log when applicable

## B9 Env

- `requireRuntimeValue()` for boot-critical vars
- Mirror in `web/.env.example` when adding vars

## B10 Rate limits

- Central config: `runtime.ts` → `abuseProtection.*`

## B11 Logging

- Use `web/src/server/logging/` — no `console.log` in production paths

## B12 Background work

- Cron: `/api/cron/warm-cache` — validate shared secret pattern

## B13 Data ownership

- Identity → Clerk (+ user mirror in DB)
- Billing → Stripe webhooks
- Editorial content → Sanity CMS

## B14 API contract

- Align with `DOC/PROJECT PLAN/API and Data/`
- Breaking changes require versioning or coordinated deprecation
