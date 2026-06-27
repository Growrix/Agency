# DevOps Release Brain — deploy surfaces, env, CI

Last updated: 2026-06-27
Scope: `web/`, `studio/`, CI/CD, environments, release blockers.

## Purpose

Session recovery for release, env matrix, pipeline, and deploy-smoke work. Pair with `DOC/PROJECT PLAN/DevOps/`.

## Deploy Surfaces (isolated)

| App | Path | Runtime | Deploy |
|-----|------|---------|--------|
| Growrix OS web | `web/` | Node >=20 <25 | Vercel (primary SaaS) |
| Sanity Studio | `studio/` | Node 20.x | Vercel (isolated project) |

**Rule:** Web and Studio do **not** share install/deploy pipelines or root postinstall coupling.

## Verify Commands

| Surface | Command | Cwd |
|---------|---------|-----|
| Web release gates | `npm run health:check` | `web/` |
| Web subset (backend phase) | `npm run lint`, `typecheck`, `test`, `build` | `web/` |
| Studio | `npm run build` (studio package) | `studio/` |

## Env Groups (web — from `runtime.ts`)

| Group | Key vars | Required for prod |
|-------|----------|-------------------|
| Site | `NEXT_PUBLIC_SITE_URL` | Yes |
| Clerk | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SIGNING_SECRET` | Yes (Clerk migration) |
| Supabase | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Yes (persistence) |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Commerce |
| Resend | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email flows |
| OpenAI | `OPENAI_API_KEY`, `OPENAI_MODEL` | AI concierge |
| Lark | `LARK_WEBHOOK_URL`, `LARK_SIGNING_SECRET` | Ops alerts (optional) |
| Rate limits | `RATE_LIMIT_*_PER_MINUTE` | Defaults in runtime |
| Legacy auth | `AUTH_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Deprecating — Clerk target |

Full enumeration: `web/.env.example` + `@integration-platform` playbooks.

## CI / GitHub

- Web workflows: `.github/workflows/ci.yml` (lint + `ci:check` on `main`, `Complete_Execution`, `Desktop_version`)
- Prebuilt Vercel fallback: `.github/workflows/vercel-web-prebuilt.yml` (requires GitHub secrets below)
- Release gate E2E: `web/tests/e2e/release-gates.spec.ts`
- Never push to remote unless user explicitly requests (rule 71)

## Vercel growrix deploy (monorepo `web/`)

**Known issue:** Git Integration can fail after a successful build with `ENOENT ... /vercel/path0/.next/routes-manifest-deterministic.json` while output lives under `web/.next`. Platform bug with Next.js 16 + Root Directory.

**Tier 1 (Git Integration):** `npm run build:vercel` runs `next build` then [`web/scripts/vercel-monorepo-finalizer-bridge.mjs`](web/scripts/vercel-monorepo-finalizer-bridge.mjs) to symlink/copy `web/.next`, `web/public`, and `web/node_modules` to repo root on Vercel (finalizer path bug).

**Tier 2 (fallback):** GitHub Actions prebuilt deploy — add repo secrets, set repository variable `VERCEL_PREBUILT_ENABLED=true`, then push or `workflow_dispatch`:

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | Vercel account → Settings → Tokens |
| `VERCEL_ORG_ID` | growrix project → Settings → General |
| `VERCEL_PROJECT_ID` | growrix project → Settings → General |

Dashboard: Root Directory = `web`, Build Command = `npm run build:vercel`. Consider disabling Git Integration auto-deploy if prebuilt becomes source of truth.

## Smoke Routes (post-deploy)

1. `GET /api/health` — 200
2. `GET /api/ready` — 200 when deps configured
3. One commerce path: `GET /api/v1/shop/categories`
4. Auth entry loads (Clerk sign-in route)

## Release Blockers

Check `DOC/PROJECT PLAN/Tasks/tasks.md` for open blockers before P5 sign-off.

## Context Recovery Read Order

1. `.cursor/brain/lane-router.yaml` → `devops_release` lane
2. This file
3. `DOC/PROJECT PLAN/DevOps/ai-context.yaml`
4. `DOC/PROJECT PLAN/Tasks/tasks.md`
5. `@devops-release-engineer` skill bundle

## Handoffs

| To | When |
|----|------|
| `@senior-backend-devops-developer` | Code/env boot changes in server layer |
| `@backend-quality-enforcer` | P5 phase-end deploy readiness gate |
| `@integration-platform` | Missing provider env contract |
