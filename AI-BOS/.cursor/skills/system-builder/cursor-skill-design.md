# Cursor Skill Design Guidelines

Repository policy for building skills, rules, hooks, and automations that behave well in Cursor.

## Environment Reality

1. Cursor agents are chat-first, editor-grounded agents with rich tool access.
2. Skills are hot-path prompt context when attached. Oversized SKILL.md reduces reliability.
3. Tool access must match the actual Cursor environment. Do not design around imaginary tools.
4. Human interaction is normal. Agents must ask clarifying questions, request approval, and stop when continuation depends on a human decision.
5. Skill handoffs are usually routing guidance for the user, not autonomous sub-agent execution.
6. File reads, search, shell commands, diagnostics, and concrete validation beat abstract planning language.

## Mandatory Rules

### 1. Frontmatter Validity Is Non-Negotiable

- Every `SKILL.md` must start with `---` and close frontmatter before body text.
- Required: `name` (lowercase hyphens, max 64 chars), `description` (non-empty, max 1024 chars).
- Broken frontmatter is a blocking compatibility defect.

### 2. Descriptions Must Be Discoverable

- Write in **third person**: "Processes Excel files..." not "I can help you..."
- Include **WHAT** and **WHEN** (trigger terms).
- Example: "Maintains project-root tasks.md ledgers across sessions. Use when starting material agent work, resuming interrupted tasks, or enforcing execution continuity."

### 3. One Skill, One Primary Job

- One primary mission predictable from name and description.
- Split when an artifact tries to plan, build, validate, deploy, govern, and route unrelated domains at once.
- Keep routing explicit: tell the user which skill to attach next.

### 4. Keep SKILL.md Lean

- Soft target: under **300 lines** for hot-path skills.
- Hard cap: **500 lines** (split into reference files beyond this).
- Move exhaustive matrices, schemas, and failure catalogs into sibling reference files.

### 5. Limit Read-First Surface

- Soft cap: **8** read-first entries in SKILL.md.
- Hard warning: more than **12**.
- Load additional context from reference files on demand.

### 6. Human Interaction Instructions Required For Decision-Heavy Skills

Planning, execution, migration, deployment, validation, or system-governance skills must include:

- when to ask clarifying questions
- when to request approval
- which external inputs must be collected explicitly
- when to stop

### 7. Handoff Semantics Must Match Cursor Reality

- Use exact skill names: `@task-ledger`, `@system-builder`.
- Do not use vague titles unless that exact skill exists.
- Avoid `spawn`, `delegate to sub-agent`, `launch child agent`, `parallel agents` unless Task tool or hooks truly support it.
- Task tool subagents (`explore`, `shell`, etc.) may be invoked explicitly when appropriate.

### 8. Output Contracts Must Be Chat-Friendly

- Prefer structured markdown sections over giant JSON in chat.
- Use strict JSON only when machine-readable output is the actual deliverable (define schema in reference file).

### 9. Workflow Must Match Cursor Strengths

- Start from concrete anchor: file, route, failing command, known plan artifact.
- Require focused validation after substantive edits.
- Prefer editor-native evidence: linter diagnostics, tests, builds, smoke checks.

### 10. External Inputs Must Be Explicit

- State exact missing item, why needed, whether secret, and what action the human must take.
- For System Builder family: use Bangla acquisition protocol from SKILL.md.
- Do not imply a provider or policy choice exists unless verified in workspace.

## Surface-Specific Rules

### Skills

- Default `disable-model-invocation: true` for meta/governance skills.
- Omit `disable-model-invocation` only when ambient auto-invocation is intentional (e.g. task-ledger during material work).
- Personal vs project location must match reuse intent.

### Rules (`.mdc`)

- Use `globs` for file-scoped rules; `alwaysApply: true` sparingly.
- Keep rules focused; do not duplicate entire skill workflows in rules.

### Hooks

- Choose narrowest event for the goal (see [cursor-platform.md](cursor-platform.md)).
- Document fail-open vs fail-closed behavior.
- Use forward slashes in paths even on Windows.

### Automations

- Confirm user wants Cursor Automations, not generic CI/scripts.
- Complete trigger/action/outcome before editor handoff.
- Do not prefill ineligible MCP servers.

## Recommended SKILL.md Skeleton

```markdown
---
name: my-skill
description: Third-person WHAT + WHEN triggers.
disable-model-invocation: true
---

# My Skill

## Quick Start
[Essential steps]

## Strict Rules
[Non-negotiable constraints]

## Human Interaction
[When to ask, approve, stop]

## Workflow
[Numbered steps]

## Output Format
[Report structure]

## Handoff
[Exact @skill references]

## Additional Resources
- [reference.md](reference.md)
```

## Compatibility Defects (blocking)

- Invalid or missing frontmatter
- Description missing trigger terms
- SKILL.md over 500 lines without reference split
- Ambiguous handoff names
- Fake autonomous orchestration language
- Missing human-interaction section on decision-heavy skills
- Skill placed in `~/.cursor/skills-cursor/`
- Unverified MCP/tool assumptions stated as guaranteed

## Anti-Patterns

- Windows-style paths in skill docs (`scripts\helper.py`)
- Too many library/tool options without a default
- Time-sensitive "before date X use old API" without deprecated section
- Mixing terminology (skill vs rule vs hook interchangeably)
- Vague names: `helper`, `utils`, `tools`
