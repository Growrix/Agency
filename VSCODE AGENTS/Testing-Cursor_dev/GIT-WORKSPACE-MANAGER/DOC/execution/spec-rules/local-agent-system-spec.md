# Local Agent System Spec

## Purpose
Define the governed local agent workflow for the isolated `GIT-WORKSPACE-MANAGER/` root.

## Public Surface
- Phase 1: `.github/agents/phase-1-git-workspace-system-builder.agent.md`
- Phase 2: `.github/agents/phase-2-repo-registry-architect.agent.md`
- Phase 3: `.github/agents/phase-3-git-workspace-operator.agent.md`
- Phase 4: `.github/agents/phase-4-git-workspace-validator.agent.md`

## Canonical Surface
- Phase 1: `DOC/agents/phase-1-git-workspace-system-builder.agent.md`
- Phase 2: `DOC/agents/phase-2-repo-registry-architect.agent.md`
- Phase 3: `DOC/agents/phase-3-git-workspace-operator.agent.md`
- Phase 4: `DOC/agents/phase-4-git-workspace-validator.agent.md`

## Default Execution Order
`Phase 1 System Builder` -> `Phase 2 Repo Registry Architect` -> `Phase 3 Git Workspace Operator` -> `Phase 4 Validator`

## Required Supporting Files
- `DOC/PLAN/GIT-WORKSPACE-MANAGER-BLUEPRINT.md`
- `DOC/execution/spec-rules/local-agent-system-spec.md`
- `DOC/execution/spec-rules/operating-model-spec.md`
- `DOC/execution/spec-rules/repo-registry-contract-spec.md`
- `DOC/validation/checklists/local-agent-readiness-checklist.md`
- `DOC/validation/checklists/operating-readiness-checklist.md`
- `Github_Agent.md`
- `registry/`

## Execution Rules
- Keep all Git workspace manager assets inside `GIT-WORKSPACE-MANAGER/`.
- Update public wrappers, canonical local sources, and supporting files together for non-trivial local-agent changes.
- Treat the root repo as factory backup only unless the request is explicitly factory-wide.
- Do not silently fall back to the workspace root for child project Git work.

## Validation
- Public local wrappers exist and are user-invocable when intended.
- Canonical local sources exist and align with wrapper intent.
- Registry documentation exists for the local surface.
- Supporting execution and validation files exist.
- The isolated root contains the authoritative operating model and registry contract documents.

## Failure Modes
- `LOCAL_AGENT_WRAPPER_MISSING`
- `LOCAL_AGENT_CANONICAL_MISSING`
- `LOCAL_AGENT_SUPPORT_MISSING`
- `LOCAL_AGENT_ROOT_MIXING`
- `LOCAL_AGENT_POLICY_DRIFT`
