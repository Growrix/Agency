# Phase Gate

Run readonly phase-end quality gates for the active lane.

## Inputs

Optional: lane hint (`web`, `sites`, `Frontend_Nextjs`) and phase label (P0–P5).

## Steps

1. Read `.cursor/brain/lane-router.yaml` — resolve lane from path or hint.
2. Delegate to `frontend-quality-enforcer` subagent (readonly).
3. Load `@frontend-quality-enforcer` skill + `quality-matrix.md`.
4. Run applicable 11-step matrix for lane; mark N/A with rationale.
5. Emit PASS or BLOCK report.
6. On BLOCK: hand fix to owning agent (`senior-frontend-specialist`, `frontend-system-architect`, or `senior-saas-developer`) — do not skip failed steps.

## Rules

- Phase-end only — not for mid-phase micro-edits
- **Before push** — run `/pre-push-check` (full `ci:check`); do not push on lint/typecheck-only pass
- Readonly enforcer does not edit code unless user approves fix mode
- Record gate matrix in ledger log when phase completes
