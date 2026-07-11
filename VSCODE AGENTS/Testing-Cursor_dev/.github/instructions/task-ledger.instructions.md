---
description: "Use when: any agent performs project, repo, system, migration, validation, or delivery work that needs durable task tracking across chat sessions. Enforces project-root tasks.md ledger discipline and bans redundant next-step permission questions when the plan already exists."
applyTo: '**'
---

# Project Task Ledger Discipline

For any material project, repo, system, migration, validation, or delivery work, maintain a durable task ledger at the active project root.

## Mandatory Ledger
- Resolve `project_root` from the user request, active file, command cwd, or explicit agent argument.
- If multiple roots are plausible, ask one concise root-selection question before editing.
- Before starting material work, read `project_root/tasks.md`.
- If `project_root/tasks.md` does not exist, create it before implementation work begins.
- If a legacy tracker exists at `DOC/PROJECT PLAN/Tasks/tasks.md`, read it for context and record its path in `tasks.md` metadata as `legacy_tasks_source`. Do not delete or rewrite the legacy tracker unless that agent's own spec requires it.

## Required Schema
Use this deterministic Markdown structure:

```markdown
# Project Tasks Ledger
<!-- managed by agents - do not hand-edit without coordination -->

## Metadata
- project_root: <absolute project root>
- created_by: <agent filename>
- created_at: <ISO timestamp>
- last_updated_by: <agent filename>
- last_updated_at: <ISO timestamp>
- legacy_tasks_source: <path or none>

## Plan

### Phase <PHASE_ID> - <Phase Name>
- [ ] [<TASK_ID>] <Task title>
  - status: not_started
  - owner: <agent filename>
  - depends_on: <TASK_ID or none>
  - evidence: <path or pending>

## Log
- <ISO timestamp> | <agent filename> | <event> | <short note>
```

Status markers:
- `[ ]` = not_started
- `[-]` = in_progress
- `[x]` = completed
- `[!]` = blocked
- `[~]` = cancelled

## Update Rules
- Before starting a step, mark that task `[-] in_progress` and append a log entry.
- After completing a step, mark it `[x] completed`, add evidence paths, and append a log entry.
- When blocked, mark the task `[!] blocked`, record exact missing inputs, and append a log entry.
- Never delete tasks. Cancel with `[~] cancelled` and a reason.
- Never renumber task IDs after creation.
- Re-read `tasks.md` before writing if a long-running command, interruption, resume, or user message occurred.
- At final handoff, ensure `tasks.md` reflects the true state before sending the final answer.

## Anti-Redundant-Question Rule
Do not ask optional next-step questions like `if you want I can`, `should I next`, `do you want me to proceed`, or `may I continue` when:
- the next task is listed as `not_started` or `in_progress` and owned by this agent, or
- the user request or agent argument already supplies the next executable scope.

Instead, execute the next task and update `tasks.md`.

Allowed questions are limited to:
- genuinely missing external inputs,
- ambiguous project root,
- irreversible/destructive operations,
- user-only product/legal/provider decisions not already locked in the ledger.

## Completion Gate
An agent must not claim completion for material work unless:
- `tasks.md` exists at `project_root/tasks.md`,
- every completed step has an evidence path or short evidence note,
- the active task status is no longer stale `in_progress`, and
- any remaining tasks are explicitly `not_started`, `blocked`, or `cancelled` with a reason.