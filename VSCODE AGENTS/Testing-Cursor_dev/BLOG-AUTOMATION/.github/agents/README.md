# BLOG-AUTOMATION Agent Surface

This folder is the public local agent surface for the isolated blog automation project.

All blog-automation-specific agent prompts must stay inside this root rather than the workspace-level `.github/agents/` folder.

## Public local lanes

- `blog-automation-core.agent.md`
- `blog-automation-system-builder.agent.md`
- `blog-automation-backend-planner.agent.md`
- `blog-automation-workflow-architect.agent.md`
- `blog-automation-content-ops-planner.agent.md`
- `blog-automation-validator.agent.md`

Use `blog-automation-core.agent.md` first when you need one local operator to understand the whole system, compare Claude-generated reference builds, classify readiness, run or interpret validation, and route work to the specialist local agents.

## Canonical local sources

Canonical local agent sources live under:

`DOC/agents/`

## Rules

- Do not place blog-automation-specific agents in the workspace root unless the project is intentionally promoted to a shared system.
- Keep public wrappers and canonical local sources aligned.
- Keep supporting execution specs and validation checklists aligned with any non-trivial local agent change.