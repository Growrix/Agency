# Phase Gate Backend

Invoke readonly backend phase-end quality gates.

## Steps

1. Read `.cursor/brain/lane-router.yaml` — resolve `backend_platform` or `devops_release` lane.
2. Identify current backend phase (P0–P6) from scope doc or user message.
3. Delegate `@backend-quality-enforcer` (readonly).
4. Run applicable steps from `~/.cursor/skills/backend-quality-enforcer/quality-matrix.md`:

| Phase | Minimum steps |
|-------|---------------|
| P1 | 1, 2, 5, 7 |
| P2 | 1, 2, 3, 4, 5 |
| P3 | 1–9 |
| P4 | 1–10 |
| P5 | 1–12 (include deploy readiness) |
| P6 | Full matrix + `npm run health:check` from `web/` |

5. Emit PASS/BLOCK matrix.
6. On BLOCK: hand fixes to `@senior-backend-devops-developer` or specialist owner — do not declare phase complete.

## Rules

- Readonly enforcer does not edit source
- Re-run this command after fixes until PASS
- Mid-phase edits use narrow lint/typecheck only (rule 72)
