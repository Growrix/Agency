# Foundation Core Planning Spec

## Purpose
Define the deterministic planning bundle for the backend-first Foundation Core lane. This lane exists to provide a reusable production runtime that screenshot-driven frontend templates can attach to without inheriting a public design system.

## Source Of Truth
- Foundation Core is a reusable runtime system, not a public marketing design system.
- Frontend appearance remains outside this spec. Public visual output belongs to screenshot-driven template execution.
- Planning output lives under `DOC/output/runs/<timestamp>/planning/foundation-core/`.
- End-to-end factory governance is defined by `foundation-factory-e2e-spec.md`.

## Required Artifacts
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

## Required Contract Coverage
- Runtime root and export root.
- Module ownership boundaries.
- Auth/session contract.
- Content delivery contract.
- Forms, media, preview, and revalidation contracts.
- Feature-flag and optional-module policy.
- Environment model, CI gates, health probes, backups, rollback, and recovery.
- Backend-planner parity mapping across devops, security, testing, performance, and support-stack expectations.
- Release-readiness decision rules for `blocked`, `foundation_ready_template_pending`, and `factory_ready`.

## Planning Rules
- Do not encode project-specific pages, sections, tokens, or template layouts.
- Do not require `Frontend-Master_DS/` or `DS-Planning-Engine/` for runtime behavior.
- Do not leak raw vendor payloads to downstream frontends; all public data must be normalized through DTOs.
- Define a standalone export contract so a copied runtime can boot with `npm run dev` after env setup.
- Separate `must_have`, `optional`, and `later` integration tiers.
- Keep the public frontend shell minimal: auth, admin, preview, health, and neutral utility surfaces only.
- Map every backend-planner domain to one of `implemented_now`, `required_before_clone`, or `later` in the planning bundle.

## Validation
- Planning bundle must be complete and structurally coherent.
- Planning bundle must satisfy `foundation-factory-e2e-spec.md`.
- `frontend-attach-contract.json` must satisfy `frontend-attach-contract-spec.md`.
- Portability rules must specify runtime-root commands, env bootstrap, and local recovery steps.
- Module list must align with the declared integration baseline and devops standards.
- Release-readiness gates must be explicit and executable from repo evidence.

## Failure Modes
- `FOUNDATION_SCOPE_DRIFT` - planning introduces template-specific UI architecture.
- `FOUNDATION_ATTACH_CONTRACT_MISSING` - attach contract absent or incomplete.
- `FOUNDATION_PORTABILITY_INCOMPLETE` - export/bootstrap contract is missing or non-deterministic.
- `FOUNDATION_MODULE_MAP_INCOMPLETE` - required runtime modules are not planned.
- `FOUNDATION_FACTORY_PLAN_MISSING` - E2E factory planning artifacts are absent.