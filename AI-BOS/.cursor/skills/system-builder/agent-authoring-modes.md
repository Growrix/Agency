# Agent Authoring Modes

Embedded Mode 1 (blueprint) and Mode 2 (artifact generation) for System Builder. Replaces separate Copilot `agent-builder-modes2` for Cursor surfaces.

## When to Use Which Mode

| Situation | Action |
|-----------|--------|
| Shared registry/governance change needed | Full System Builder workflow (DESIGN/EXTEND/REPAIR) |
| Blueprint + one artifact, no registry change | Mode 1 → Mode 2 only |
| User unsure | Mode 1 first; confirm surface choice before Mode 2 |

Always identify active mode before proceeding.

## Mode 1 — Blueprint

### Required Clarifying Fields

Ask only unresolved questions:

1. **Primary job** — one sentence mission
2. **Target surface** — skill, rule, hook, automation, or combination
3. **Storage scope** — personal (`~/.cursor/skills/`) vs project (`.cursor/skills/` or `.cursor/rules/`)
4. **Invocation** — explicit `@mention` only vs auto-invoke when relevant
5. **Triggers** — when user/agent should apply this
6. **Inputs** — what the agent needs to start
7. **Outputs** — deliverables and report format
8. **Handoffs** — exact downstream `@skill` names
9. **Human decisions** — approvals, external inputs, stop conditions
10. **Unknowns** — list as `missing_knowledge`; do not invent

### Blueprint Template

```markdown
# Blueprint: <name>

## Summary
<one paragraph>

## Primary Surface
skill | rule | hook | automation

## Storage
- scope: personal | project
- path: <exact path>

## Invocation
- disable-model-invocation: true | false
- trigger terms: <list>

## Mission
<primary job>

## Strict Rules
- ...

## Human Interaction
- ask when: ...
- approve when: ...
- stop when: ...

## Workflow
1. ...
2. ...

## Handoffs
- @skill-name — when ...

## Supporting Files
- reference.md — ...
- checklist.md — ...

## missing_knowledge
- ...

## Registry Impact
none | update skills-index | update lanes-index
```

User must confirm blueprint before Mode 2 unless all fields were supplied upfront.

## Mode 2 — Generate

Generate **exactly one** primary artifact unless user explicitly expands scope.

### Generate Skill (`SKILL.md`)

Output complete skill directory plan:

```text
~/.cursor/skills/<name>/
├── SKILL.md
├── reference.md          # if needed
└── examples.md           # if needed
```

Follow [cursor-skill-design.md](cursor-skill-design.md). Cross-reference [task-ledger.md](task-ledger.md) when skill performs material work.

### Generate Rule (`.mdc`)

```markdown
---
description: ...
globs: "**/*.ts"
alwaysApply: false
---

# Rule Title
...
```

### Generate Hook Stub

`hooks.json` fragment + script stub with event, matcher, fail-open/closed documented.

### Generate Automation Draft

Markdown table only (no YAML in user chat):

| Field | Value |
|-------|-------|
| Name | ... |
| Trigger | ... |
| Tools | ... |
| Instructions | ... |
| To finish in editor | ... |

## Mode 2 Output Wrapper

```markdown
## Active Mode
Mode 2 — Generate

## Target Surface
skill | rule | hook | automation

## Artifact Path
<path>

## Generated Artifact
<full file contents>

## Remaining Unknowns
- ...

## Next Step
Attach @system-builder to register in skills-index, or execute handoff to @<downstream-skill>.
```

## Strict Rules

- Never skip Mode 1 clarifying pass when required fields are missing.
- Never invent tools, APIs, env vars, package names, or paths.
- Generate exactly one primary artifact in Mode 2 unless scope explicitly expanded.
- If target path unknown, deliver contents and ask where to write.
- Defer registry/governance/lane changes to full System Builder EXTEND mode.
- Keep outputs aligned to approved blueprint; no surprise capabilities in Mode 2.

## Example

See [examples/sample-new-skill.md](examples/sample-new-skill.md) for a complete Mode 2 skill output.
