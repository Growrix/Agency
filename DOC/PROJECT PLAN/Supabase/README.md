# Supabase Integration Documentation

## Overview

Supabase is the managed authentication and database provider for the Growrix OS project. This folder contains all integration specifications, environment configuration guides, and verification procedures.

## Quick Reference

| Item | Value |
|---|---|
| Provider | Supabase (PostgreSQL + Auth) |
| Project ID | okzrczymtlkaaxlvjnyh |
| Project Name | Growrix OS |
| Endpoint | https://okzrczymtlkaaxlvjnyh.supabase.co |
| Auth Method | Email/Password with JWT |
| Bootstrap Status | ✅ SQL executed, app_state table created |
| Verification | ⏳ End-to-end tests pending |

## Documentation Structure

- **ai-context.yaml**: Machine-readable configuration for AI systems (version, credentials, invariants)
- **integration-status.md**: Current status, recent changes, and known blockers
- **environment-configuration.md**: How NEXT_PUBLIC_SITE_URL works across environments
- **verification-procedures.md**: Post-bootstrap testing steps and validation checklist

## Key Concepts

### Shared Database Across Environments

Both local development and production use the **same Supabase project** and **same database**. Only the site URL differs:

```
Local Dev: NEXT_PUBLIC_SITE_URL=http://localhost:5000
Production: NEXT_PUBLIC_SITE_URL=https://growrixos.com
```

See `environment-configuration.md` for detailed explanation.

### Bootstrap Requirement

The `app_state` table must be created in Supabase before auth/persistence endpoints work. This is done via `web/supabase/schema.sql` and executed in the Supabase SQL Editor.

**Status:** ✅ Executed successfully (2026-04-23)

### Server-Only Table

The `public.app_state` table is accessed only by the backend via `SUPABASE_SECRET_KEY`. Row-level security is intentionally disabled because it's internal application infrastructure.

## Quick Start

1. **Local Development:**
   ```bash
   cd web
   npm run dev
   ```
   Uses credentials from `.env.local` (already configured)

2. **Production Deployment:**
   Set these environment variables in your deployment platform:
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY` (same as local)
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   - `AUTH_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (same as local)

3. **Verify Integration:**
   See `verification-procedures.md` for step-by-step testing.

## Integration Points

| Component | Location | Purpose |
|---|---|---|
| Supabase Client | `web/src/server/supabase/client.ts` | Admin and Auth client initialization |
| Runtime Config | `web/src/server/config/runtime.ts` | Load Supabase URL and keys |
| Auth Handlers | `web/src/server/auth/users.ts` | User registration/login against Supabase Auth |
| Persistence | `web/src/server/data/store.ts` | Route to Supabase or local file storage |
| Schema | `web/supabase/schema.sql` | app_state table definition |
| Local Env | `web/.env.local` | Live Supabase credentials + app secrets |
| Prod Template | `web/.env.production` | Production environment variables template |

## References

- [DOC/PROJECT PLAN/ai-context.yaml](../ai-context.yaml) — Project-level Supabase invariant
- [web/README.md](../../../web/README.md) — Setup and configuration instructions
- [Ongoing DOCS/audits/2026-04-23-remaining-tasks.md](../../../../Ongoing%20DOCS/audits/2026-04-23-remaining-tasks.md) — Task tracking

## Support

For detailed explanation of any topic, see the corresponding markdown file in this folder.
