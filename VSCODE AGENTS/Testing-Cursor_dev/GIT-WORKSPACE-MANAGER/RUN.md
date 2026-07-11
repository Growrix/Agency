# Runbook

This isolated root is currently in planning-and-governance mode.

## Current State
- The operating model is approved.
- The local agent surface is defined.
- The seed registry files are prepared.
- Runtime scripts and command wrappers are not implemented yet.

## Manual Operating Sequence Until Phase 3 Exists
1. Resolve the target project folder from the active task.
2. Check the canonical repo entry in `registry/repo-registry.seed.json`.
3. Normalize any alias path by checking `registry/repo-aliases.seed.json`.
4. Confirm whether the flow is `project` or `factory-backup` using `registry/repo-policies.seed.json`.
5. Run Git commands only against the resolved repo root.
6. Do not push unless the request is explicit and the repo policy allows it.

## Planned Phase 3 Capabilities
- workspace repo audit
- target repo verification
- commit preflight summary
- push preflight summary
- onboarding flow for new repos
- registry refresh and drift reporting

## Recovery Principle
- Use the project repo history for project-level rollback first.
- Use the `Testing` root repo only for factory-level recovery or broad snapshot rollback.
