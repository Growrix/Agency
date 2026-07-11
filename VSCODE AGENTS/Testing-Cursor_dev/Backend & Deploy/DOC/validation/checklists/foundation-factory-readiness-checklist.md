# FOUNDATION FACTORY READINESS CHECKLIST

## PURPOSE
Hard readiness gate for the Foundation factory path before templates are declared safe to attach and clone.

## PLANNING BUNDLE
- [ ] `DOC/output/runs/<timestamp>/planning/foundation-core/README.md` exists.
- [ ] `foundation.json` exists and declares `runtime_root` and `template_output_root`.
- [ ] `mission-scope.md` exists and separates Foundation from template responsibilities.
- [ ] `ownership-matrix.md` exists and assigns auth, content, forms, media, preview, and public visual ownership.
- [ ] `backend-modules.json` exists.
- [ ] `integrations-baseline.json` exists.
- [ ] `devops-standards.json` exists.
- [ ] `portability-standards.json` exists.
- [ ] `frontend-attach-contract.json` exists.
- [ ] `implementation-phases.md` exists.
- [ ] `foundation-factory-plan.md` exists.
- [ ] `backend-parity-matrix.md` exists.
- [ ] `release-readiness-gates.md` exists.

## FOUNDATION RUNTIME
- [ ] `Foundation-Core/package.json` exposes real `lint`, `typecheck`, `test`, `build`, and `verify` scripts.
- [ ] `npm run verify` passes from `Foundation-Core/`.
- [ ] The runtime exposes `/api/health`.
- [ ] The runtime exposes the content, forms, media, preview, and auth/session contract routes.
- [ ] Runtime env validation exists and blocks invalid config.
- [ ] The exported runtime boots from its own root without monorepo-relative imports.

## CI/CD + OPS
- [ ] `.github/workflows/foundation-core-verify.yml` exists.
- [ ] The workflow runs from the `Foundation-Core/` root.
- [ ] The workflow runs `npm ci` and `npm run verify`.
- [ ] Trigger paths are scoped to Foundation runtime, Foundation contracts, and Foundation agent/spec inputs.
- [ ] Rollback expectations are documented.
- [ ] Backup and DR expectations are documented.
- [ ] Monitoring and alert expectations are documented.

## SECURITY + TESTING + PERFORMANCE
- [ ] The Foundation plan maps security ownership and required controls.
- [ ] The Foundation plan maps testing ownership and required test tiers.
- [ ] Unit tests exist for core runtime services.
- [ ] Integration-test expectations are documented even if implementation is staged.
- [ ] E2E smoke expectations are documented even if implementation is staged.
- [ ] Performance expectations are documented for the Foundation runtime and attach surfaces.

## TEMPLATE ATTACH READINESS
- [ ] Templates attach only through `frontend-attach-contract.json`.
- [ ] Standalone fallback mode remains runnable.
- [ ] Attached mode expectations are documented.
- [ ] Template smoke includes `/` and `/api/template-attach-status`.
- [ ] Combined attached-mode smoke is documented for future runs.

## RELEASE CLASSIFICATION
- [ ] Release decision uses `blocked`, `foundation_ready_template_pending`, or `factory_ready`.
- [ ] `factory_ready` is used only when Foundation verification, template verification, and attached smoke all pass.
- [ ] Any blocker in planning, CI, runtime verify, or attach smoke forces `blocked`.

## FAILURE CODES
- FOUNDATION_FACTORY_READINESS_FAILED
- FOUNDATION_PLAN_BUNDLE_INCOMPLETE
- FOUNDATION_VERIFY_FAILED
- FOUNDATION_CI_GATE_MISSING
- FOUNDATION_ATTACH_CONTRACT_UNSAFE
- FOUNDATION_RELEASE_CLASSIFICATION_MISSING
