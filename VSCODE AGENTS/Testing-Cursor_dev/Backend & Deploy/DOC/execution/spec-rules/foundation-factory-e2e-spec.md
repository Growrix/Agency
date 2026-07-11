# Foundation Factory E2E Spec

## Purpose
Define the end-to-end governed path for turning Foundation Core into a production-ready factory backend that imported or screenshot-built frontend templates can attach to without scanning internals.

## Source Of Truth
- `foundation_planner` owns the runtime plan and release-readiness gates.
- `foundation_developer` owns the runtime implementation and proof of executable readiness.
- `frontend-attach-contract.json` remains the only allowed integration boundary between Foundation Core and template runtimes.
- `template_import_attacher` and `Claude_Frontend_Agent` own public UI output.
- The backend-planner bar is the parity target for devops, security, testing, performance, and support-stack expectations.

## End-to-End Stages
1. Plan the Foundation runtime.
2. Build and verify the Foundation runtime.
3. Classify Foundation readiness before any frontend attach work.
4. Import or build a frontend template root.
5. Attach the template through the normalized contract only.
6. Run combined smoke and release-decision gates.

## Required Planning Artifacts
Planning output lives under `DOC/output/runs/<timestamp>/planning/foundation-core/` and MUST include:
- `README.md`
- `foundation.json`
- `mission-scope.md`
- `ownership-matrix.md`
- `backend-modules.json`
- `integrations-baseline.json`
- `devops-standards.json`
- `portability-standards.json`
- `frontend-attach-contract.json`
- `implementation-phases.md`
- `foundation-factory-plan.md`
- `backend-parity-matrix.md`
- `release-readiness-gates.md`

## Required Runtime Outputs
Runtime execution MUST leave these artifacts available:
- `Foundation-Core/`
- `Foundation-Core/RUN.md`
- `Foundation-Core/ENV.example`
- `Foundation-Core/dev-server-checklist.md`
- `Foundation-Core/export-manifest.md`
- `Foundation-Core/.audit/foundation-self-audit.md`
- `.github/workflows/foundation-core-verify.yml`

## Stage Rules

### Stage 1 - Plan Foundation Core
- Define the Foundation mission, ownership boundaries, attach contract, and portability contract.
- Map Foundation scope to backend-planner domains: backend modules, integrations, devops, security, testing, performance, and support stack.
- Record what is implemented now, what is required before clone, and what remains later.

### Stage 2 - Build Foundation Core
- Materialize the runtime under `Foundation-Core/`.
- Keep the public shell neutral and runtime-focused.
- Implement contract-backed APIs, env validation, health reporting, preview/admin surfaces, and attach-ready DTO boundaries.

### Stage 3 - Verify Foundation Readiness
- Run `npm run verify` from `Foundation-Core/`.
- Ensure the runtime can boot from its own root.
- Ensure CI exists and runs the same verification command on Foundation-relevant changes.
- Ensure release gates classify the runtime as `blocked` or `foundation_ready` based on executable evidence.

### Stage 4 - Build or Import Template Runtime
- Build from screenshots or import an existing runtime into `Templates/<category>/<template-slug>/`.
- Keep the visible frontend implementation outside Foundation Core.
- Preserve standalone fallback for template roots.

### Stage 5 - Attach Through Contract
- Templates may read only the normalized contract and exposed endpoints.
- Templates must not import Foundation internals.
- Attached mode and mock fallback mode must both remain documented and runnable.

### Stage 6 - Release Decision
- A pair may be classified `factory_ready` only when Foundation readiness gates pass, template verification passes, and attached smoke checks pass.
- If Foundation passes but the template is incomplete, classify as `foundation_ready_template_pending`.
- Any missing blocker gate yields `blocked`.

## Minimum Backend-Planner Parity
The Foundation factory plan MUST explicitly cover these domains even when implementation is staged:
- environments and secrets scoping
- CI/CD and rollback
- monitoring and alerts
- backups and DR
- security controls and compliance posture
- test pyramid and smoke strategy
- performance targets and cache discipline
- support-stack expectations

## Validation
- The planning bundle must satisfy `foundation-core-planning-spec.md` and include the E2E factory artifacts above.
- `frontend-attach-contract.json` must satisfy `frontend-attach-contract-spec.md`.
- The readiness checklist at `DOC/validation/checklists/foundation-factory-readiness-checklist.md` must be executable from repo evidence.
- Foundation runtime CI must execute from the Foundation runtime root, not from inferred parent state.

## Failure Modes
- `FOUNDATION_FACTORY_PLAN_MISSING`
- `FOUNDATION_BACKEND_PARITY_UNMAPPED`
- `FOUNDATION_RELEASE_GATES_MISSING`
- `FOUNDATION_CI_GATE_MISSING`
- `FOUNDATION_ATTACH_SMOKE_MISSING`
- `FOUNDATION_FACTORY_NOT_READY`
