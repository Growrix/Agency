# Senior SaaS Developer — Validation Checklist

Run before declaring a material work session complete. Also used to validate the skill bundle itself during authoring.

## Pre-Completion (per run)

### Project resolution

- [ ] Absolute `project_root` recorded in output
- [ ] Runtime root identified (app package, server entry, or N/A with rationale)
- [ ] Docs root identified or noted as absent
- [ ] `move_agent_to_root` called when root differed from workspace cwd

### Task ledger

- [ ] `@task-ledger` discipline followed; `project_root/tasks.md` read at start
- [ ] Active task marked `in_progress` before material edits
- [ ] Completed tasks have evidence paths or command results
- [ ] Log entry appended after session

### Audit and mode

- [ ] Current-state audit precedes plan or code changes
- [ ] Exactly one primary working mode declared
- [ ] Plan exists or was updated before cross-layer/architectural execution
- [ ] `missing_knowledge` listed for unverified integrations, env vars, APIs

### Execution discipline

- [ ] Smallest grounded change set applied
- [ ] Narrowest validation run immediately after first substantive edit
- [ ] Docs updated when behavior, commands, contracts, or ownership changed
- [ ] Local commit **created** after validation passed when any files were changed (never push/merge unless user requested)

### Quality gates

- [ ] All applicable QG1–QG9 gates run (see [quality-gates.md](quality-gates.md))
- [ ] When CI/push/deploy in scope: [ci-parity-verification.md](ci-parity-verification.md) followed — local command matches `.github/workflows/`, remote conclusion verified or explicitly unverified
- [ ] Skipped gates marked `not-applicable` with rationale
- [ ] Zero unresolved errors and warnings in touched scope (QG1)
- [ ] Dev server boot confirmed when project has dev script (QG2)
- [ ] UI checks run when UI affected (responsive, a11y, SEO)
- [ ] Backend checks run when server affected (API, security, perf, regression)

### Scope boundaries

- [ ] No agent-system, skill, rule, or registry edits (deferred to `@system-builder` if needed)
- [ ] Phased lane ownership respected when locked plan exists
- [ ] No invented integrations, packages, env vars, or endpoints

### Output contract

- [ ] Report includes all six sections from [workflow-spec.md](workflow-spec.md)
- [ ] Remaining gaps and handoffs explicitly stated

## Skill Bundle Readiness (authoring / registry)

- [ ] `SKILL.md` exists at `~/.cursor/skills/senior-saas-developer/`
- [ ] Frontmatter: `name`, `description`, `disable-model-invocation: true`
- [ ] `description` is third-person with WHAT + WHEN trigger terms
- [ ] `SKILL.md` under 500 lines; read-first ≤ 8 entries
- [ ] Supporting files exist: `workflow-spec.md`, `quality-gates.md`, `validation-checklist.md`, `project-discovery.md`, `ci-parity-verification.md`, `knowledge/principles.md`, `knowledge/domain-index.md`
- [ ] Handoffs use exact `@task-ledger` and `@system-builder` references
- [ ] Human Interaction section present in SKILL.md
- [ ] No hardcoded project-specific factory paths
- [ ] Failure modes preserved in `workflow-spec.md`
- [ ] Registry row in `system-builder/registry/skills-index.md`
- [ ] Lane entry in `system-builder/registry/lanes-index.md`
- [ ] Cross-reference to `~/.cursor/skills/system-builder/task-ledger.md` for ledger schema

## Verdict Template

```text
Status: passed | failed
Blocking items: ...
Evidence: ...
```
