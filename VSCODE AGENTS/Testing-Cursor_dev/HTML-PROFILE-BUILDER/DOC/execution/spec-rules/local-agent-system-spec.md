# Local Agent System Spec

## Purpose
Define the governed local agent workflow for the isolated `HTML-PROFILE-BUILDER/` root.

## Public Surface
- Phase 1: `.github/agents/phase-1-html-profile-system-builder.agent.md`
- Phase 2: `.github/agents/phase-2-html-profile-workflow-architect.agent.md`
- Phase 3: `.github/agents/phase-3-html-profile-builder-developer.agent.md`
- Phase 4: `.github/agents/phase-4-html-profile-validator.agent.md`

## Canonical Surface
- Phase 1: `DOC/agents/phase-1-html-profile-system-builder.agent.md`
- Phase 2: `DOC/agents/phase-2-html-profile-workflow-architect.agent.md`
- Phase 3: `DOC/agents/phase-3-html-profile-builder-developer.agent.md`
- Phase 4: `DOC/agents/phase-4-html-profile-validator.agent.md`

## Default Execution Order
`Phase 1 System Builder` -> `Phase 2 Workflow Architect` -> `Phase 3 Builder Developer` -> `Phase 4 Validator`

## Required Supporting Files
- `DOC/PLAN/HTML-PROFILE-BUILDER-BLUEPRINT.md`
- `DOC/execution/spec-rules/local-agent-system-spec.md`
- `DOC/execution/spec-rules/milestone-1-execution-spec.md`
- `DOC/execution/spec-rules/brief-output-contract-spec.md`
- `DOC/validation/checklists/local-agent-readiness-checklist.md`
- `DOC/validation/checklists/milestone-1-readiness-checklist.md`

## Execution Rules
- Keep all project-specific implementation assets inside `HTML-PROFILE-BUILDER/`.
- Update public wrappers, canonical local sources, and supporting files together for non-trivial local-agent changes.
- Use the locked blueprint and brief/output contract as the source of truth for milestone 1.
- Do not mix implementation assets into the workspace root or shared lane folders.

## Validation
- Public local wrappers exist and are user-invocable when intended.
- Canonical local sources exist and align with wrapper intent.
- Registry documentation exists for the local surface.
- Supporting execution and validation files exist.
- The isolated root contains the authoritative plan and contract documents.

## Failure Modes
- `LOCAL_AGENT_WRAPPER_MISSING`
- `LOCAL_AGENT_CANONICAL_MISSING`
- `LOCAL_AGENT_SUPPORT_MISSING`
- `LOCAL_AGENT_ROOT_MIXING`