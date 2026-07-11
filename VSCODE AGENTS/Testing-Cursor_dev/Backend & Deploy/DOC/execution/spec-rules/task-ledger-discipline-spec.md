# Task Ledger Discipline Spec

## Purpose
Define the governed workflow for requiring project-root `tasks.md` tracking across agents so plans, task order, blockers, and evidence survive chat-session loss.

## Required Inputs
- Active user request.
- Resolved `project_root`.
- Existing `tasks.md` when present.
- Legacy tracker at `DOC/PROJECT PLAN/Tasks/tasks.md` when present.
- Active agent filename or lane owner.

## Required Outputs
- `project_root/tasks.md` exists for material work.
- The active phase/task block is present before implementation starts.
- Each task has stable ID, status, owner, dependency field, and evidence field.
- Append-only log entries record start, completion, blocker, cancellation, and handoff events.
- Final task state is accurate before completion is claimed.

## Execution Rules
1. Resolve `project_root` before file edits.
2. Read `project_root/tasks.md` before material work.
3. If missing, create it with metadata, empty Plan, and Log sections before implementation begins.
4. If a legacy tracker exists, read it and record the path as `legacy_tasks_source`.
5. Append the agent's phase tasks in execution order before implementing.
6. Mark the current task `[-] in_progress` before starting it.
7. Mark tasks `[x] completed` immediately after completion and record evidence.
8. Mark tasks `[!] blocked` with exact missing inputs when progress depends on the user or external systems.
9. Do not delete tasks; cancel with `[~] cancelled` and reason.
10. Re-read `tasks.md` after interruptions, resumes, long-running commands, or user messages before choosing the next task.
11. Do not ask optional next-step questions when the ledger already contains the next executable task.

## Validation
- `project_root/tasks.md` exists.
- Metadata contains `project_root`, `created_by`, `created_at`, `last_updated_by`, `last_updated_at`, `legacy_tasks_source`.
- Every task line has a stable ID and one status marker.
- Every completed task has evidence.
- No stale `in_progress` task remains for a completed agent scope.
- Blocked tasks list exact missing inputs.
- Log has at least one entry for each started, completed, blocked, cancelled, or handed-off task.
- Final answer does not contain optional continuation language for tasks already listed as next work.

## Failure Modes
- `TASK_LEDGER_MISSING`
- `TASK_LEDGER_PROJECT_ROOT_AMBIGUOUS`
- `TASK_LEDGER_SCHEMA_INVALID`
- `TASK_LEDGER_EVIDENCE_MISSING`
- `TASK_LEDGER_STALE_IN_PROGRESS`
- `TASK_LEDGER_REDUNDANT_QUESTION`
- `TASK_LEDGER_CONFLICT`

## Handoff
When handing work to another phase or agent, append the next phase block with `not_started` tasks and name the next owner exactly by filename when known. If the next owner is not known, use `owner: unassigned` and record the routing decision in the Log.