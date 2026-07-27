# Cursor System Builder Compatibility Checklist

Run before declaring a system change complete. Mark each item pass/fail with evidence path.

## Skill Bundle

- [ ] `SKILL.md` exists at declared path
- [ ] Frontmatter opens and closes with `---`
- [ ] `name` is lowercase hyphens, max 64 chars, unique in registry
- [ ] `description` is third-person with WHAT + WHEN trigger terms
- [ ] `disable-model-invocation` set intentionally (true for meta skills)
- [ ] `SKILL.md` body under 500 lines
- [ ] Heavy content moved to sibling reference files (one level deep links)
- [ ] Read-first list in SKILL.md ≤ 8 entries
- [ ] Skill not placed in `~/.cursor/skills-cursor/`

## Behavior & Handoffs

- [ ] One primary job stated clearly
- [ ] Human Interaction section present for decision-heavy skills
- [ ] Handoffs use exact `@skill-name` references
- [ ] No fake autonomous orchestration language
- [ ] External input blockers reference Bangla protocol (System Builder family) or explicit acquisition steps
- [ ] `missing_knowledge` reported for unverified tools/APIs/env vars

## Registry & Anatomy

- [ ] `~/.cursor/docs/agents_cursor.md` read before new agent/skill/lane work
- [ ] Anti-duplication registry checked — no conflicting owner for same scope
- [ ] `~/.cursor/docs/agents_cursor.md` updated after structural agent/skill/lane/command change
- [ ] Version log row appended in anatomy file
- [ ] [registry/skills-index.md](registry/skills-index.md) updated for new/changed personal skills
- [ ] [registry/lanes-index.md](registry/lanes-index.md) updated if delivery lane added/changed
- [ ] Isolated local systems reference [isolated-local-system.md](isolated-local-system.md) when applicable

## Governance Artifacts

- [ ] Non-trivial changes include supporting spec/checklist/reference files

## Task Ledger

- [ ] `project_root/tasks.md` read or created before material work
- [ ] Active tasks reflect current state (no stale `in_progress`)
- [ ] Completed tasks have evidence paths
- [ ] New material-work skills reference [task-ledger.md](task-ledger.md) or `@task-ledger`

## Rules (if `.mdc` in scope)

- [ ] Valid frontmatter: `description`, `globs` or `alwaysApply`
- [ ] Rule scope matches intent (not duplicating full skill workflow)

## Hooks (if hooks in scope)

- [ ] `hooks.json` version 1 format
- [ ] Script paths correct for project vs user scope
- [ ] Event choice matches goal
- [ ] Fail-open/closed behavior documented

## Automations (if automation draft in scope)

- [ ] Trigger, action, outcome defined
- [ ] MCP servers dashboard-eligible if used
- [ ] "To finish in editor" items listed explicitly

## Archetype & Blueprint (when applicable)

- [ ] Archetype fit explicit: `shared_lane_fit` | `isolated_local_system_required` | `unsupported_without_new_knowledge`
- [ ] Blueprint modules classified: `currently_supported` | `requires_extension` | `missing_knowledge`
- [ ] Downstream lane owners named

## Verdict

```text
Status: passed | failed
Blocking items: ...
Evidence: ...
```
