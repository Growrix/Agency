# Resume Backend Brain

Recover backend and DevOps session context after interruption.

## Steps

1. Read `.cursor/brain/lane-router.yaml` — `backend_platform` and `devops_release` lanes.
2. Read `.cursor/brain/backend-brain.md` — active work section.
3. Read `.cursor/brain/devops-brain.md` — release blockers.
4. Read `.cursor/brain/integration-catalog.yaml` — provider env map.
5. Read `DOC/PROJECT PLAN/ai-context.yaml` → route to Backend / API / DevOps ai-context as needed.
6. Read `DOC/PROJECT PLAN/Tasks/tasks.md` — last log entries and open task IDs.
7. Summarize for user:
   - Current lane and suggested phase (P0–P6)
   - Active integrations in scope
   - Open blockers from ledger
   - Recommended next agent (`/backend-factory` routing)

## Max files at start

7 total — do not load full skill bundles until agent chosen.

## Commands after recovery

| Next action | Command |
|-------------|---------|
| Continue implementation | `/backend-factory` |
| Integration scope doc | `/integration-plan` |
| Phase complete | `/phase-gate-backend` |
