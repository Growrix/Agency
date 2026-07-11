# Task Ledger Discipline Readiness Checklist

Use this checklist before any agent declares material work complete.

## Ledger Presence
- [ ] `project_root` is resolved.
- [ ] `project_root/tasks.md` exists.
- [ ] Any legacy `DOC/PROJECT PLAN/Tasks/tasks.md` was read when present.
- [ ] `legacy_tasks_source` metadata records the legacy path or `none`.

## Metadata
- [ ] `project_root` recorded.
- [ ] `created_by` recorded.
- [ ] `created_at` recorded.
- [ ] `last_updated_by` recorded.
- [ ] `last_updated_at` recorded.
- [ ] `legacy_tasks_source` recorded.

## Plan Structure
- [ ] Each phase has a stable phase ID and name.
- [ ] Each task has a stable task ID.
- [ ] Each task has exactly one status marker: `[ ]`, `[-]`, `[x]`, `[!]`, or `[~]`.
- [ ] Each task records `status`, `owner`, and `evidence` or `depends_on` where applicable.
- [ ] Tasks are ordered by intended execution order.
- [ ] No tasks were deleted or renumbered.

## Update Discipline
- [ ] Current task was marked `in_progress` before work began.
- [ ] Completed tasks were marked `completed` immediately after finishing.
- [ ] Completed tasks include evidence paths or evidence notes.
- [ ] Blocked tasks list exact missing inputs.
- [ ] Cancelled tasks include reason.
- [ ] `last_updated_by` and `last_updated_at` were refreshed after changes.

## Log
- [ ] Log entry exists for each started task.
- [ ] Log entry exists for each completed task.
- [ ] Log entry exists for each blocker.
- [ ] Log entry exists for each cancellation or handoff.

## Resume Safety
- [ ] Agent re-read `tasks.md` after interruptions, resumes, long-running commands, or user messages.
- [ ] No stale `in_progress` task remains for the completed scope.

## Anti-Redundant-Question Gate
- [ ] Agent did not ask `if you want`, `should I next`, `do you want me to proceed`, or equivalent when the next task was already listed in `tasks.md`.
- [ ] Any question asked was limited to ambiguous root, missing external input, destructive operation, user-owned decision, or conflict resolution.

## Completion Gate
- [ ] `tasks.md` accurately reflects all completed, remaining, blocked, cancelled, and handed-off work.
- [ ] Final answer references remaining tasks only when they are blocked, out of scope, or intentionally handed off.