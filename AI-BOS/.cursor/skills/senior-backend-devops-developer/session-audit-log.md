# Session Audit Log — Backend & DevOps

Append after every material run to `DOC/PROJECT PLAN/Tasks/tasks.md` log section (via `@task-ledger`).

## Entry template

```markdown
### [YYYY-MM-DD HH:MM] Backend session — [P0–P6] [mode]
- **Lane:** backend_platform | devops_release
- **Scope:** one-line summary
- **Files:** comma-separated paths
- **Integrations:** providers touched or none
- **Mid-phase checks:** lint/typecheck pass/fail
- **Phase-end:** pending | passed via backend-quality-enforcer
- **Blockers:** none | list
- **Handoff:** none | @skill-name reason
```

## Rules

- Do not update ledger without disk artifact when scope doc required
- Reference task IDs (T###) when assigned
- Link integration-plan output path when P1 integration work
