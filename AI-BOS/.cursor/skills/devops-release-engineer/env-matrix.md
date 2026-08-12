# Env Matrix — Growrixos web/

Source of truth: `web/src/server/config/runtime.ts` + `web/.env.example`

## Site

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `NEXT_PUBLIC_SITE_URL` | public | Yes |

## Clerk (auth)

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | public | Yes |
| `CLERK_SECRET_KEY` | server | Yes |
| `CLERK_WEBHOOK_SIGNING_SECRET` | server | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | public | Optional |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | public | Optional |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | public | Optional |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | public | Optional |

## Supabase (database)

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `SUPABASE_URL` | server | Yes |
| `SUPABASE_ANON_KEY` | server | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Yes |

## Stripe

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `STRIPE_SECRET_KEY` | server | Commerce |
| `STRIPE_WEBHOOK_SECRET` | server | Commerce |

## Resend

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `RESEND_API_KEY` | server | Email flows |
| `CONTACT_TO_EMAIL` | server | Yes |
| `CONTACT_FROM_EMAIL` | server | Recommended |

## OpenAI

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `OPENROUTER_API_KEY` | server | Concierge |
| `OPENROUTER_MODEL` | server | Optional (default `mistralai/mistral-nemo`) |

## Lark (optional)

| Variable | Scope | Prod required |
|----------|-------|---------------|
| `LARK_WEBHOOK_URL` | server | Optional |
| `LARK_SIGNING_SECRET` | server | Optional |
| `LEAD_HOT_THRESHOLD` | server | Optional |

## Rate limits

`RATE_LIMIT_*_PER_MINUTE` — defaults in runtime.ts

## Legacy (deprecating)

`AUTH_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — migrate to Clerk
