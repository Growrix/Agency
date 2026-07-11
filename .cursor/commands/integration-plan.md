# Integration Plan

Materialize provider scope doc + env checklist before integration code.

## Steps

1. Read `.cursor/brain/integration-catalog.yaml` and user-stated providers.
2. Read `web/src/server/config/runtime.ts` — enumerate env vars (never invent names).
3. Load one playbook per provider from `@integration-platform/references/`.
4. Produce integration plan artifact on disk:

**Path:** `DOC/PROJECT PLAN/integrations/<provider-or-feature>-integration-plan.md`

**Minimum sections:**

```markdown
# Integration Plan — [feature/providers]

## Providers
- list

## Env checklist
| Var | Required | Present in runtime.ts | Notes |

## Routes / webhooks
- list

## Idempotency
- strategy

## Owner handoff
- @senior-backend-devops-developer implementation steps
```

5. Update `DOC/PROJECT PLAN/Tasks/tasks.md` only after artifact exists.
6. Hand off to `@senior-backend-devops-developer` or `@integration-platform-engineer` for implementation.

## Rules

- Clerk auth → `@clerk-nextjs-auth` — not this command
- Missing playbook → report `missing_knowledge`
- Do not write integration code in plan-only mode unless user requests implementation
