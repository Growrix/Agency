# Local Agent System Spec

## Purpose
Define the governed local agent workflow for the isolated `BLOG-AUTOMATION/` root.

## Public Surface
- `.github/agents/blog-automation-core.agent.md`
- `.github/agents/blog-automation-system-builder.agent.md`
- `.github/agents/blog-automation-backend-planner.agent.md`
- `.github/agents/blog-automation-workflow-architect.agent.md`
- `.github/agents/blog-automation-content-ops-planner.agent.md`
- `.github/agents/blog-automation-validator.agent.md`

## Canonical Surface
- `DOC/agents/blog_automation_core.agent.md`
- `DOC/agents/blog_automation_system_builder.agent.md`
- `DOC/agents/blog_automation_backend_planner.agent.md`
- `DOC/agents/blog_automation_workflow_architect.agent.md`
- `DOC/agents/blog_automation_content_ops_planner.agent.md`
- `DOC/agents/blog_automation_validator.agent.md`

## Required Supporting Files
- `DOC/PLAN/BLOG-AUTOMATION-BLUEPRINT.md`
- `DOC/execution/spec-rules/core-agent-spec.md`
- `DOC/execution/spec-rules/milestone-1-execution-spec.md`
- `DOC/execution/spec-rules/workflow-contract-spec.md`
- `DOC/validation/checklists/core-agent-readiness-checklist.md`
- `DOC/validation/checklists/local-agent-readiness-checklist.md`
- `DOC/validation/checklists/milestone-1-readiness-checklist.md`
- `DOC/validation/checklists/content-governance-checklist.md`

## Execution Rules
- Keep all blog-automation-specific assets inside the isolated root.
- Update public wrappers, canonical sources, and supporting files together for non-trivial agent changes.
- Use milestone-1 completeness as the default build target.
- Do not mix implementation assets into the workspace root.

## Validation
- Public wrappers exist and are user-invocable when intended.
- Canonical sources exist and align with wrapper intent.
- Registry documentation exists for the local surface.
- Supporting execution and validation files exist.

## Failure Modes
- `LOCAL_AGENT_WRAPPER_MISSING`
- `LOCAL_AGENT_CANONICAL_MISSING`
- `LOCAL_AGENT_SUPPORT_MISSING`
- `LOCAL_AGENT_ROOT_MIXING`