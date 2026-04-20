---
document_type: documentation-index
human_index: true
ai_first_stop: ai-context.yaml
scope: task-tracking
build_stage: execution-control
read_first:
  - ai-context.yaml
  - tasks.md
---

# Tasks README

## Purpose
- This folder contains the canonical execution tracker for the Agency project.
- Use it to determine what is already built, what is partial, what is blocked, and what should be built next.
- AI should start with [ai-context.yaml](ai-context.yaml).
- Humans can start with [tasks.md](tasks.md).

## Files
- [ai-context.yaml](ai-context.yaml): machine-readable routing and tracker rules.
- [tasks.md](tasks.md): audited task list, phase status, blockers, and next steps.

## Workflow Rule
1. Read [ai-context.yaml](ai-context.yaml).
2. Read [tasks.md](tasks.md).
3. Read the root project docs and the phase-specific docs needed for the active task.
4. After meaningful work, update [tasks.md](tasks.md) before ending the session.

## Tracker Rule
- Do not treat a phase as complete just because the UI exists.
- If a page is mocked or placeholder-only, mark the task as partial or not started depending on the evidence.
- If deployment is failing, record it explicitly as a blocker in [tasks.md](tasks.md).
