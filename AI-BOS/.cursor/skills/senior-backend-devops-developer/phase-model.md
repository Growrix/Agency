# Backend Phase Model (P0–P6)

## Overview

| Phase | Work | Phase-end requirement |
|-------|------|----------------------|
| P0 Discovery | Brain, reuse audit, scope | Scope doc on disk |
| P1 Contracts / env | Schemas, env checklist, integration plan | `@api-contract-architect` artifacts or `/integration-plan` output |
| P2 Domain / services | Business logic in `domain/` | Unit tests for touched modules |
| P3 Integrations / webhooks | Provider clients, webhook routes | Signature + idempotency smoke |
| P4 Data / migrations | Supabase schema, repositories | Migration review if schema touched |
| P5 DevOps / release | Env matrix, CI, deploy smoke | `@devops-release-engineer` checklist + gate step 11 |
| P6 Verify | Full backend delivery | `@backend-quality-enforcer` full matrix |

## Mid-phase (allowed during P1–P5)

- `ReadLints` on touched files
- `npm run lint` / `npm run typecheck` scoped to `web/` when server files changed
- Webhook unit smoke with provider test vectors
- Narrow `npm run test` filtering server paths

## Phase-end (mandatory before sign-off)

Delegate `@backend-quality-enforcer` or run `/phase-gate-backend`.

Do **not** run full `health:check` or E2E release gates after every file edit.

## Growrixos verify bundle

From `web/` at P6 or when touching release-critical paths:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run health:check
```

## Materialization gate

Before updating `DOC/PROJECT PLAN/Tasks/tasks.md`:

- Scope doc or integration-plan artifact exists on disk
- Env checklist matches `runtime.ts` when integrations involved
