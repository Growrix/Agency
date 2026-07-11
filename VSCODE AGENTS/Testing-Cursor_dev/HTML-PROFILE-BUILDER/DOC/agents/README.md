# HTML Profile Builder Canonical Agent Sources

This folder contains the canonical local sources for the isolated HTML Profile Builder system.

Public local wrappers live under:

`.github/agents/`

Canonical local sources:
- Phase 1: `phase-1-html-profile-system-builder.agent.md`
- Phase 2: `phase-2-html-profile-workflow-architect.agent.md`
- Phase 3: `phase-3-html-profile-builder-developer.agent.md`
- Phase 4: `phase-4-html-profile-validator.agent.md`

Execution order:
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

Maintenance rules:
- keep public wrappers and canonical local sources aligned
- update specs and checklists with non-trivial local-agent changes
- keep all HTML Profile Builder assets inside the isolated root