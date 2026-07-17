# AI-BOS — How to Run

## Prerequisites

- Cursor workspace opened at `F:/PROJECTS/Growrixos` (or repo root containing `AI-BOS/`)
- No env vars required for foundation knowledge work (docs-first)

## Session start

1. Read `AI-BOS/tasks.md` — continue from last `in_progress` or next `not_started` task.
2. Read `.cursor/skills/ai-bos-architect/SKILL.md` for authoring workflow.
3. Follow `ST-KNW-001` + instantiate from `TP-KNW-001` for new Knowledge Objects.
4. Do **not** re-plan from chat memory — disk artifacts are canonical.

## Invoke skills

| Intent | Attach |
|--------|--------|
| Author Knowledge Objects, standards, templates, handbooks | `@ai-bos-architect` |
| Add skill, rule, registry schema, or structural change | `@system-builder` |
| Update execution ledger | `@task-ledger` |

## Phase approval flow

Each planning phase requires **explicit user approval** before the next phase begins.

```text
Phase N deliverable written to disk
    → Update knowledge-registry indexes
    → Run phase validation (front matter, ID uniqueness, registry integrity)
    → Update tasks.md with evidence
    → STOP — wait for user approval
    → Phase N+1
```

See `.cursor/skills/ai-bos-architect/checklists/phase-approval-checklist.md`.

## Validation (AI-BOS gates)

Before declaring a phase complete:

1. **Front matter** — every new Knowledge Object has valid YAML per `references/front-matter-schema.md`
2. **ID uniqueness** — no duplicate IDs across registry indexes
3. **Registry integrity** — object registered in correct index with path, version, status
4. **Vendor independence** — no Cursor/Claude/Copilot-specific assumptions in knowledge content
5. **ReadLints** — zero diagnostics on touched markdown files

## Recovery

On resume:

1. Read `AI-BOS/tasks.md`
2. Read controlling skill: `@ai-bos-architect`
3. Read last completed phase artifact on disk
4. Continue next phase only if prior phase has user approval recorded in ledger

## Structural changes

Route through `@system-builder` when:

- Adding or renaming skills, rules, hooks
- Changing registry JSON schema
- Promoting AI-BOS to its own repository
- Adding MCP servers or validation tooling

## What NOT to do

- Do not design folder structures before Capability Model is approved
- Do not generate application code unless explicitly requested
- Do not skip phases without user approval
- Do not embed tool-specific config inside knowledge documents
