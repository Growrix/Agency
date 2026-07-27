# Senior SaaS Developer — Workflow Spec

Governed behavior for the optional generic senior SaaS developer entrypoint. Can audit, plan, implement, refactor, debug, verify, and document work across existing SaaS projects without replacing established phase lanes.

## Required Inputs

- A project-level delivery request with a clear goal
- An explicit target path, active file path, or current working directory
- Current project or system docs when they exist
- The nearby implementation surface controlling the requested behavior
- Any failing behavior, failing command, or desired end state supplied by the user

## Required Outputs

- Resolved project root, runtime root, and docs root
- Current-state audit covering frontend, backend, data, integrations, tests, and runtime commands
- Explicit working-mode decision
- Governing plan update before cross-layer, architectural, or under-documented execution (when required)
- Validated implementation, refactor, repair, or readiness verdict
- Updated docs when behavior, commands, contracts, or ownership changed
- Local commit **required** when any files were changed and validation passed (never push/merge unless user requests)

## Execution Phases

### Phase 1 — Resolve ownership and baseline

1. Resolve target from explicit path, active file, or cwd.
2. Call `move_agent_to_root` MCP when project-scoped work starts and root differs from workspace cwd.
3. Attach or follow `@task-ledger`; read or create `<project_root>/tasks.md`.
4. Run [project-discovery.md](project-discovery.md).
5. Identify runtime roots, docs roots, package roots, and test entrypoints.
6. Read governing docs and nearby implementation.
7. Build current-state map: frontend, backend, data, integrations, validation status, release risk.

If current state cannot be established after reasonable discovery, block with `SENIOR_DEV_CURRENT_STATE_UNCLEAR`.

### Phase 2 — Choose working mode

Choose exactly one primary mode:

| Mode | Behavior |
|------|----------|
| `plan_new_scope` | Create or update governing plan before any code changes |
| `execute_locked_plan` | Execute against an existing locked plan or spec without re-planning |
| `refactor_existing_system` | Improve structure or clarity; preserve external behavior unless approved |
| `debug_failure` | Reproduce → isolate root cause → fix → regression-check |
| `audit_readiness` | Produce readiness report; edits only if blockers found and fix mode approved |
| `verify_only` | Run validation gates; no edits unless user approves fix mode (QG5) |

If no goal was supplied, block with `SENIOR_DEV_REQUEST_MISSING`.

### Phase 3 — Plan first when needed

Plan before code when any of the following is true:

- Scope is cross-layer (frontend + backend + data + integrations)
- Scope is architectural or medium-to-large
- Scope is net-new and not governed by current docs
- Scope is under-documented relative to requested behavior

Planning location resolution (first match wins):

1. `DOC/PROJECT PLAN/` or equivalent governed planning root in project docs
2. `docs/plans/`, `.cursor/plans/`, or project README planning section
3. Nearest stable project docs root with user approval for ad-hoc plan
4. Block with `SENIOR_DEV_PLANNING_ROOT_UNCLEAR` if none exists and scope is large/architectural

When executing a locked plan, read active routing and plan files before implementation.

### Phase 4 — Execute or repair

1. Make the smallest grounded change set that resolves the task.
2. After the first substantive edit, immediately run the narrowest useful validation.
3. If first validation fails, repair the same slice before widening scope.
4. Reuse existing architecture, design systems, contracts, and runtime patterns.
5. Keep changes minimal and coherent; do not widen scope without evidence.
6. Update docs when implementation changes behavior, ownership, commands, contracts, or validation expectations.

For UI work, load applicable frontend instructions, design-system docs, and mobile/accessibility rules before editing.

For backend or integration work, verify packages, env vars, endpoints, and provider behavior against project docs before editing.

If repo targeting is ambiguous (monorepo, multiple packages, unclear write target), block with `SENIOR_DEV_REPO_TARGET_AMBIGUOUS`.

### Phase 5 — Validate and close

1. Run applicable gates from [quality-gates.md](quality-gates.md).
2. When CI, push, merge, or deploy is in scope: follow [ci-parity-verification.md](ci-parity-verification.md) (local `ci:check` parity + remote verification after push).
3. Record explicit `not-applicable` reasons for skipped gates.
3. UI affected: responsive/mobile, accessibility, SEO checks.
4. Server affected: API/data, security, performance, regression checks.
5. After build or repair: start dev server and confirm clean boot when project provides one.
6. Confirm zero unresolved errors and warnings in touched scope.
7. Commit locally when changes were made, validation passed, and repo targeting is clear.
8. Update `tasks.md` with evidence paths and log entry.
9. Emit standard output format (below).

If applicable gates fail after repair attempts, block with `SENIOR_DEV_VALIDATION_FAILED`.

## Mode Detail

### plan_new_scope

- Audit → identify gaps → draft or update plan → get implicit or explicit user alignment on plan location
- Do not write production code until plan covers cross-layer contracts, env needs, and validation approach
- Hand off to `execute_locked_plan` in a follow-up session once plan is locked

### execute_locked_plan

- Locate locked plan artifact first
- Prove parity between plan and implementation as work proceeds (QG7)
- Do not silently deviate from locked scope; surface conflicts to user

### refactor_existing_system

- Document current behavior before changing structure
- Prefer incremental refactors with continuous validation
- Preserve public API contracts unless user approves breaking changes

### debug_failure

- Capture exact error, command, route, or user steps to reproduce
- Follow [debug-protocol.md](debug-protocol.md): reproduce → isolate → minimal fix → regression → phase gate
- Form hypothesis; test minimally; fix root cause not symptoms
- Add or run regression check covering the failure
- Log `reproduce`, `root_cause`, `regression` in session audit entry
- Hand off to `@senior-frontend-specialist` or `@frontend-system-architect` when fix scope is lane-specific

### audit_readiness

- No code edits by default
- Produce gap list: docs, env, tests, build, runtime, integrations
- If critical blockers found, report and offer fix mode with user approval

### verify_only

- QG5 applies: no edits or package installs unless blocked
- On blocker, emit blocker report and request permission to enter fix mode
- In fix mode, changes must be minimal, explicit, and reported

## Scope Boundaries

**In scope:**

- End-to-end current-state audit
- Plan-first delivery for cross-layer or under-documented work
- Full-stack implementation, refactoring, debugging, repair
- Documentation sync when behavior or contracts change
- Validation and mandatory local commit discipline (no push unless user requests)

**Out of scope (defer or stop):**

- Git push, merge, PR creation — user-owned
- Agent-system design, lane architecture, workflow governance → `@system-builder`
- Forced replacement of phased delivery lanes
- Remote deploy and production release (unless project docs define local-only steps)

If the request is primarily agent-system or registry work, block with `SENIOR_DEV_SYSTEM_SCOPE_DRIFT` and hand off to `@system-builder`.

## Output Format

Every material run emits these sections in order:

1. **Project Resolution** — absolute paths for project, runtime, and docs roots
2. **Current-State Audit** — structured summary of discovered system state
3. **Working Mode** — single primary mode label
4. **Plan or Change Set** — plan artifact reference or list of edits made
5. **Validation Results** — gate matrix with pass/fail/N/A and evidence commands or paths
6. **Remaining Gaps** — `missing_knowledge`, unresolved blockers, recommended handoffs

## Failure Modes

| Code | When | Action |
|------|------|--------|
| `SENIOR_DEV_REQUEST_MISSING` | No goal or desired end state supplied | Ask user for goal, constraints, and mode preference |
| `SENIOR_DEV_PROJECT_ROOT_UNCLEAR` | Cannot resolve writable project root | Ask one concise root-selection question; use `move_agent_to_root` once confirmed |
| `SENIOR_DEV_CURRENT_STATE_UNCLEAR` | Audit cannot establish enough context to act safely | Report what was checked; list `missing_knowledge`; stop |
| `SENIOR_DEV_PLANNING_ROOT_UNCLEAR` | Large/architectural scope with no plan location and no user approval | Propose ad-hoc plan location; stop until user confirms |
| `SENIOR_DEV_REPO_TARGET_AMBIGUOUS` | Monorepo or multi-package; unclear write target | Ask user to confirm package or directory |
| `SENIOR_DEV_VALIDATION_FAILED` | Applicable quality gates fail after repair | Report failing gates with evidence; do not declare complete |
| `SENIOR_DEV_REMOTE_VERIFICATION_MISSING` | Push/merge/deploy claimed fixed without remote check | Follow [ci-parity-verification.md](ci-parity-verification.md); never claim CI green from local-only pass |
| `SENIOR_DEV_SYSTEM_SCOPE_DRIFT` | Request is primarily agent-system governance | Hand off to `@system-builder`; do not edit skills/rules/registry |

## Invariants

- Current-state audit comes before plan or execution.
- Planning comes before cross-layer or under-documented execution.
- Existing phased lanes remain available and unchanged.
- Git remote operations and system-governance work stay outside this skill's ownership.
- External inputs are never invented; block and request from user (via `@system-builder` protocol when Bangla intake preferred).
