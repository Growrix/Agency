# Task Ledger Discipline

## Purpose

Make execution state durable across chat sessions by requiring every agent doing material work to maintain a project-root `tasks.md` ledger.

Prevents plans, task order, blockers, and evidence from living only in chat memory. Prevents redundant optional next-step questions when the next executable task is already recorded.

## Scope

Applies to all agents that perform material work:

- project delivery
- migrations
- frontend and backend implementation
- validation and QA
- system governance
- skill/lane authoring
- deployment preparation
- repo-level automation

Pure conversational answers that do not touch a project and do not start executable work may skip ledger creation.

## Canonical Location

```text
<project_root>/tasks.md
```

Legacy trackers (e.g. `DOC/PROJECT PLAN/Tasks/tasks.md`) remain valid historical context. Read them if present; the canonical forward ledger is project-root `tasks.md`.

## Project Root Resolution

Resolve `project_root` in this order:

1. Explicit user-supplied project root or agent argument.
2. Current editor file's nearest project root.
3. Terminal current working directory if it clearly belongs to the active request.
4. Workspace root when the request is system-level or root-governance work.

If more than one root is plausible and the choice affects where files will be written, ask one concise root-selection question.

## Ledger Schema

```markdown
# Project Tasks Ledger
<!-- managed by agents - do not hand-edit without coordination -->

## Metadata
- project_root: <absolute project root>
- created_by: <skill name>
- created_at: <ISO timestamp>
- last_updated_by: <skill name>
- last_updated_at: <ISO timestamp>
- legacy_tasks_source: <path or none>

## Plan

### Phase <PHASE_ID> - <Phase Name>
- [ ] [<TASK_ID>] <Task title>
  - status: not_started
  - owner: <skill name>
  - depends_on: <TASK_ID or none>
  - evidence: <path or pending>

## Log
- <ISO timestamp> | <skill name> | <event> | <short note>
```

Status markers:

- `[ ]` = `not_started`
- `[-]` = `in_progress`
- `[x]` = `completed`
- `[!]` = `blocked`
- `[~]` = `cancelled`

## Lifecycle

1. **Intake:** read `tasks.md`; create if missing.
2. **Planning:** append phase/task block before implementation.
3. **Execution:** set active task to `in_progress` before starting.
4. **Evidence:** on completion, set `completed` and record evidence path.
5. **Blocker:** set `blocked` with exact missing items.
6. **Resume:** re-read `tasks.md` before deciding next task after any interruption.
7. **Handoff:** append or update next phase tasks before handing off.
8. **Completion:** no stale `in_progress` for the agent's completed scope.

## Anti-Redundant-Question Rule

Do not ask optional continuation questions when the ledger defines the next executable task. Forbidden when next task is recorded:

- `if you want I can...`
- `should I next...`
- `do you want me to proceed...`
- `may I continue...`

Instead, execute the next ledger task and update `tasks.md`.

Allowed questions: ambiguous project root, missing external credentials, destructive operations, user-owned product/legal decisions, conflicts between newest user instruction and ledger.

## Evidence Rules

Evidence may be: file path, validation report path, command pass/fail summary, zero Problems diagnostic, commit hash for system changes.

Do not claim completion without evidence.

## Failure Modes

- `TASK_LEDGER_MISSING`
- `TASK_LEDGER_PROJECT_ROOT_AMBIGUOUS`
- `TASK_LEDGER_STALE_IN_PROGRESS`
- `TASK_LEDGER_EVIDENCE_MISSING`
- `TASK_LEDGER_REDUNDANT_QUESTION`
- `TASK_LEDGER_CONFLICT`

## Invariants

- `tasks.md` is append-friendly and human-readable.
- Tasks are never deleted or renumbered.
- Cancelled work is retained with reason.
- The ledger is generic; must not hardcode one frontend, backend, or deployment lane.
