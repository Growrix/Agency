# Supabase — Growrixos Playbook

**Role:** PostgreSQL persistence — **not** Supabase Auth (Clerk owns identity).

**Env source:** `web/src/server/config/runtime.ts` → `supabase.*`

## Required env vars

| Variable | Purpose | Required |
|----------|---------|----------|
| `SUPABASE_URL` | Project URL | Yes |
| `SUPABASE_ANON_KEY` | Client-safe key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server writes | Yes (or `SUPABASE_SECRET_KEY` fallback) |

## Data layer

- Access via `web/src/server/data/`
- Domain modules in `web/src/server/domain/` — no direct Supabase calls from routes

## Rules

- Service role key server-only — never expose to client
- Migrations: coordinate with `DOC/PROJECT PLAN/Supabase/`
- User identity links via Clerk user ID mirror — not Supabase Auth sessions

## Repo stub

`DOC/knowledge/integration-rules/database/supabase.yaml`
