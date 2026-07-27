# Git and Ledger Discipline

## Commit timing

- **One commit per completed phase** (P0–P5), not per file
- Include all phase-relevant files in one coherent message
- Record commit hash in ledger log entry

## Never without user request

- push, merge, force push, PR creation

## Ledger

| Lane | Path |
|------|------|
| `web/` | `DOC/PROJECT PLAN/Tasks/tasks.md` |
| Templates/migrations | `.cursor/execution/template-tasks.md` |

Use `@task-ledger` schema for new project roots.

## Materialization

Before marking phase complete in ledger:

- Phase deliverable exists on disk (scope doc, DS table, sign-off, etc.)
- Chat summary alone is insufficient

## Monorepo

Confirm write target (`web/` vs `Frontend_Nextjs/` vs `sites/`) before commit.
