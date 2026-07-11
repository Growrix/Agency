# Git Workspace Manager Agent Entry Points

Deprecated promoted copy.

The canonical selectable Git agent now lives at `.github/agents/github-agent.agent.md`.
This folder should no longer be treated as the active public surface.

## Phase Order
- Phase 1: `phase-1-git-workspace-system-builder.agent.md`
- Phase 2: `phase-2-repo-registry-architect.agent.md`
- Phase 3: `phase-3-git-workspace-operator.agent.md`
- Phase 4: `phase-4-git-workspace-validator.agent.md`

## When To Use Which
- Phase 1: use first for system design, governance, registry/spec drift repair, and capability readiness mapping.
- Phase 2: use second to lock or revise the repo registry schema, onboarding rules, alias handling, and safety gates.
- Phase 3: use third to operate the workspace Git flow, refresh registry data, and prepare safe commit or push actions.
- Phase 4: use last to validate readiness, registry correctness, and safety-case coverage.

## Default Execution Sequence
`Phase 1 System Builder` -> `Phase 2 Repo Registry Architect` -> `Phase 3 Git Workspace Operator` -> `Phase 4 Validator`

## Rules
- Keep this local agent surface inside `GIT-WORKSPACE-MANAGER/` only.
- Update public wrappers and canonical local sources together.
- Keep the root factory backup policy and child project repo policy separate.
