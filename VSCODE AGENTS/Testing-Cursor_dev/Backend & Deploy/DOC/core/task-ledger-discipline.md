# Task Ledger Discipline

## Purpose
Make execution state durable across chat sessions by requiring every agent doing material work to maintain a project-root `tasks.md` ledger.

This rule prevents plans, task order, blockers, and evidence from living only in chat memory. It also prevents redundant optional next-step questions when the next executable task is already recorded.

## Scope
Applies to all agents that perform material work:
- project delivery
- migrations
- frontend and backend implementation
- validation and QA
- system governance
- agent/lane authoring
- deployment preparation
- repo-level automation

Pure conversational answers that do not touch a project and do not start executable work may skip ledger creation.

## Canonical Location
The mandatory ledger is:

```text
<project_root>/tasks.md
```

Existing legacy trackers such as `DOC/PROJECT PLAN/Tasks/tasks.md` remain valid historical context. Agents must read them if present, but the canonical forward ledger is the project-root `tasks.md`.

## Project Root Resolution
Resolve `project_root` in this order:
1. Explicit user-supplied project root or agent argument.
2. Current editor file's nearest project root.
3. Terminal current working directory if it clearly belongs to the active request.
4. Workspace root when the request is system-level or root-governance work.

If more than one root is plausible and the choice affects where files will be written, ask one concise root-selection question.

## Ledger Schema
Use deterministic Markdown:

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
- `[ ]` = `not_started`
- `[-]` = `in_progress`
- `[x]` = `completed`
- `[!]` = `blocked`
- `[~]` = `cancelled`

## Lifecycle
1. Intake: read `tasks.md`; create it if missing.
2. Planning: append the phase/task block before implementation begins.
3. Execution: set the active task to `in_progress` before starting the step.
4. Evidence: when the step completes, set it to `completed` and record evidence.
5. Blocker: when missing input blocks progress, set the task to `blocked` with exact missing items.
6. Resume: after any interruption or user message, re-read `tasks.md` before deciding the next task.
7. Handoff: append or update the next phase tasks before handing off to another agent.
8. Completion: no stale `in_progress` task may remain for the agent's completed scope.

## Anti-Redundant-Question Rule
Agents must not ask optional continuation questions when the ledger already defines the next executable task. Forbidden when the next task is recorded or supplied by the user:
- `if you want I can...`
- `should I next...`
- `do you want me to proceed...`
- `may I continue...`

Instead, execute the next ledger task and update `tasks.md`.

Allowed questions:
- ambiguous project root,
- missing external credentials or dashboard values,
- destructive or irreversible operations,
- user-owned product/legal/provider decisions not locked in the ledger,
- conflicts between the newest user instruction and the ledger.

## Evidence Rules
Evidence may be:
- path to a created/updated file,
- path to a validation report,
- command name and pass/fail summary,
- diagnostic result such as zero Problems,
- commit hash for completed system-level changes.

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
- Existing phase summaries and validation reports remain deep evidence; `tasks.md` is the ordered execution ledger.
- The ledger is generic and must not hardcode one frontend, backend, or deployment lane.