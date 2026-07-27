# Session Audit Log Schema

Every material run of `@senior-saas-developer` must append one block to the active ledger session log.

## Ledger targets

| Lane | Append to |
|------|-----------|
| `web/` SaaS | `DOC/PROJECT PLAN/Tasks/tasks.md` → `## Session Log` or `## Log` |
| Templates/migrations | `.cursor/execution/template-tasks.md` → `## Log` |
| Other projects | `<project_root>/tasks.md` → `## Log` |

## Log entry format

```markdown
- <ISO-8601 timestamp> | senior-saas-developer | <mode> | <one-line summary>
  - brain: <paths read>
  - files_touched: <comma-separated paths or count>
  - gates: QG1=pass|fail|N/A, QG2=..., (full matrix)
  - commit: <hash or none>
  - handoff: <@skill-name or none>
```

## Required fields

| Field | Required | Notes |
|-------|----------|-------|
| timestamp | yes | ISO-8601 UTC or local with offset |
| mode | yes | One of six working modes |
| summary | yes | What was accomplished or blocked |
| gates | yes | Pass/fail/N/A per applicable QG |
| commit | yes when files changed | `none` if no commit |
| handoff | when applicable | `@senior-frontend-specialist`, `@frontend-system-architect`, etc. |

## Brain read evidence

Record which brain files were read at session start:

```text
brain: lane-router.yaml → site-brain.md → ai-context.yaml → tasks.md
```

For Growrixos `web/` work, minimum read chain:

1. `.cursor/brain/lane-router.yaml`
2. `memories/repo/site-brain.md`
3. `DOC/PROJECT PLAN/ai-context.yaml`
4. `DOC/PROJECT PLAN/Tasks/tasks.md`

## debug_failure runs

Additional required log fields for `debug_failure` mode:

```markdown
  - reproduce: <steps or command>
  - root_cause: <one sentence>
  - regression: <test or check run>
```

See [debug-protocol.md](debug-protocol.md).
