# Git Workspace Manager

Deprecated promoted copy.

The canonical root Git management surface now lives under `.github/`:
- `.github/agents/github-agent.agent.md`
- `.github/Github_Agent.md`
- `.github/git-workspace-manager/`

This folder should no longer be treated as the active system root.

## Classification
- Archetype: isolated local system
- Scope: workspace Git governance, repo registry, alias normalization, backup-vs-project routing
- Delivery status: planning surface created; runtime scripts are not implemented yet

## Approved Operating Model
- `Testing` root repo is the factory backup and disaster-recovery snapshot repo.
- Child project repos are the operational source of truth for day-to-day feature work.
- Project Git work must resolve to the project repo first, not to the workspace root.
- Factory backup commits are explicit and separate from project commits.
- Alias paths such as junctions must resolve to one canonical repo root.

## Canonical Documents
- Blueprint: `DOC/PLAN/GIT-WORKSPACE-MANAGER-BLUEPRINT.md`
- Git owner doc: `Github_Agent.md`
- Local agent registry: `DOC/agents/README.md`
- Local system spec: `DOC/execution/spec-rules/local-agent-system-spec.md`
- Operating model spec: `DOC/execution/spec-rules/operating-model-spec.md`
- Repo registry contract: `DOC/execution/spec-rules/repo-registry-contract-spec.md`
- Validation checklists: `DOC/validation/checklists/`
- Seed registry files: `registry/`

## Phase Lane
- Phase 1: `phase-1-git-workspace-system-builder.agent.md`
- Phase 2: `phase-2-repo-registry-architect.agent.md`
- Phase 3: `phase-3-git-workspace-operator.agent.md`
- Phase 4: `phase-4-git-workspace-validator.agent.md`

Default order:
`Phase 1 System Builder` -> `Phase 2 Repo Registry Architect` -> `Phase 3 Git Workspace Operator` -> `Phase 4 Validator`

## Isolation Rules
- Keep Git workspace manager assets inside `GIT-WORKSPACE-MANAGER/`.
- Do not mix this system into the shared frontend or backend/deploy lanes.
- Treat the registry seed files as the planning baseline until the operator workflow materializes live registry refresh commands.
- Do not claim runtime automation that has not been implemented yet.

## Current Outcome
This root now locks the approved Git management model and the required governance files. The next execution step is to implement the operator workflow that audits repos, refreshes the registry, and blocks wrong-repo commit or push attempts.
