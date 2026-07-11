# Git Workspace Manager Canonical Agent Sources

This folder contains the canonical local sources for the isolated Git Workspace Manager system.

Public local wrappers live under:

`.github/agents/`

Canonical local sources:
- Phase 1: `phase-1-git-workspace-system-builder.agent.md`
- Phase 2: `phase-2-repo-registry-architect.agent.md`
- Phase 3: `phase-3-git-workspace-operator.agent.md`
- Phase 4: `phase-4-git-workspace-validator.agent.md`

Execution order:
`Phase 1 System Builder` -> `Phase 2 Repo Registry Architect` -> `Phase 3 Git Workspace Operator` -> `Phase 4 Validator`

Maintenance rules:
- keep public wrappers and canonical local sources aligned
- update specs and checklists with non-trivial local-agent changes
- keep all Git workspace manager assets inside the isolated root
