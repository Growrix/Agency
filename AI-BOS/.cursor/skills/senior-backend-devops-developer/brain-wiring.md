# Brain Wiring — Backend & DevOps

## Growrixos read chain

```text
.cursor/brain/lane-router.yaml
  → backend_platform | devops_release lane
  → .cursor/brain/backend-brain.md | devops-brain.md
  → .cursor/brain/integration-catalog.yaml
  → DOC/PROJECT PLAN/ai-context.yaml
  → DOC/PROJECT PLAN/Backend/ai-context.yaml
     or DOC/PROJECT PLAN/API and Data/ai-context.yaml
     or DOC/PROJECT PLAN/DevOps/ai-context.yaml
  → DOC/PROJECT PLAN/Tasks/tasks.md
```

## Path → lane resolution

| Path prefix | Lane | Brain |
|-------------|------|-------|
| `web/src/server/` | backend_platform | backend-brain.md |
| `web/src/app/api/` | backend_platform | backend-brain.md |
| `web/.github/` | devops_release | devops-brain.md |
| `studio/` | devops_release | devops-brain.md |
| `DOC/PROJECT PLAN/DevOps/` | devops_release | devops-brain.md |

## Session recovery command

Use Growrixos `/resume-backend-brain` to reload backend + devops brain and ledger.

## Other repos

When `.cursor/brain/lane-router.yaml` lacks `backend_platform`:

1. Use `@senior-saas-developer` project discovery
2. Locate server root (`src/server/`, `app/api/`, etc.)
3. Report `missing_knowledge` for env contract — do not invent vars

## Ledger

Growrixos SaaS work: `DOC/PROJECT PLAN/Tasks/tasks.md` via `@task-ledger`.
