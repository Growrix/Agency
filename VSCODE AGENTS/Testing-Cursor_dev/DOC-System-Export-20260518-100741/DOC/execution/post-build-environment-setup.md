# POST-BUILD ENVIRONMENT SETUP FLOW

## PURPOSE
Define the deterministic environment bootstrap that must run after code generation so local development starts with `npm run dev`.

## INPUTS
- `DOC/output/runs/<timestamp>/planning/plan.json`
- `DOC/output/runs/<timestamp>/codegen/` project root

## OUTPUT
- `DOC/output/runs/<timestamp>/reports/environment_setup_report.json`

## STEPS
1. Discover project root and package manager from generated manifests.
2. Ensure `package.json` exposes scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`.
3. Generate `ENV.example` from `plan.env_vars` if missing.
4. Create `.env.local` from `ENV.example` if missing (local placeholders only).
5. Validate env shape with runtime schema before server boot.
6. Install dependencies non-interactively.
7. Run database client generation and local migrations when configured.
8. Execute quality checks in order:
   - lint (zero warnings)
   - typecheck
   - test (unit/integration)
9. Start local dev server using `npm run dev`.
10. Run smoke probes for `/`, auth entry route, and `/api/health`.
11. Emit `environment_setup_report.json` with pass/fail per step and blocker details.

## FAILURE HANDLING
- Missing required env vars: `ENV_SETUP_BLOCKED_MISSING_REQUIRED_ENV`
- Dependency or install failure: `ENV_SETUP_BLOCKED_INSTALL_FAILURE`
- Migration failure: `ENV_SETUP_BLOCKED_MIGRATION_FAILURE`
- Dev server boot failure: `ENV_SETUP_BLOCKED_DEV_SERVER_FAILURE`
- Smoke test failure: `ENV_SETUP_BLOCKED_SMOKE_FAILURE`

## RULES
- Do not commit `.env.local`.
- Do not invent env var names.
- Prefer deterministic non-interactive commands.
- If external credentials are unavailable, record exact placeholders and remaining manual steps.
