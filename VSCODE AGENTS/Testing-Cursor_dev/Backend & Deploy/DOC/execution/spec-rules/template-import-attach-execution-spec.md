# Template Import Attach Execution Spec

## Purpose
Define the governed lane for importing an already-built frontend runtime, normalizing it into the `Templates/` library, and finalizing a single-root independent fullstack deliverable by materializing required backend surfaces from Foundation-Core blueprint assets without rebuilding the visible UI from scratch.

## Source Of Truth
- The imported frontend runtime is the source of truth for the visible implementation baseline.
- `frontend-attach-contract.json` remains the required integration contract for surface coverage.
- Foundation-Core remains the reusable blueprint source for backend modules/routes in Phase 5 default mode.
- The import lane must preserve the imported runtime's public UI unless the user explicitly requests post-import enhancement work.

## Required Inputs
- `source_runtime_root`: extracted local path for the imported frontend runtime.
- `import_manifest`: source name, category, template slug, and any known nested app root.
- Optional `foundation_attach_contract_path`.
- Optional `delivery_mode` with default `single_root_independent`.
- Optional `reference_pack` when the imported runtime also needs screenshot-driven parity validation.

## Required Output Root
- `Templates/<category>/<template-slug>/`

## Required Output Artifacts
- `README.md`
- `RUN.md`
- `ENV.example`
- `dev-server-checklist.md`
- `export-manifest.md`
- `template.manifest.json`
- `reference-inventory.md`
- `copyright-compliance.md`
- `.audit/frontend-self-audit.md`
- `.import/import-report.md`

## Execution Rules
- Import the frontend into a fresh runtime root under `Templates/`; do not mutate the source import in place.
- Preserve git continuity artifacts from the source runtime by default: `.git/`, `.gitignore`, `.gitattributes`, and `.github/` so exported templates can continue git workflows without re-init.
- Strip source VCS metadata only when explicitly requested by the user.
- Strip non-portable baggage from the imported runtime: `.next/`, `node_modules/`, local virtual environments, editor caches, and machine-local logs.
- Preserve the imported visible UI by default. Cosmetic refactors are forbidden during import normalization.
- Normalize scripts, env docs, and runtime metadata so the imported copy boots independently from its own root.
- Default delivery mode is `single_root_independent`.
- In `single_root_independent` mode, materialize mandatory backend surfaces inside the template root (auth/session, content pages/collections/site-config/revalidate, forms submit, media upload, preview enable, health).
- In `single_root_independent` mode, Foundation-Core is blueprint input only and not a required external runtime dependency.
- Do not leave hard runtime dependency on external `FOUNDATION_BASE_URL` in default mode.
- `foundation_attached_legacy` mode is allowed only when explicitly requested.
- Wire existing imported frontend surfaces to local template APIs when corresponding UI exists, especially navigation/site-config, forms, uploads, and session-aware routes.
- Keep fallback behavior defined for every wired surface as resilience coverage.
- When a repo-default footer attribution is required and no brief override exists, use `Built and Maintained by Growrix OS` linking to `https://www.growrixos.com`.
- Do not couple the imported runtime to `Frontend-Master_DS/` or `DS-Planning-Engine/`.
- Do not silently replace imported routes with generic starter routes.
- Record every file/folder class intentionally excluded during import in `.import/import-report.md`.
- Record materialized backend surface coverage, delivery mode, `independent_root` status, and `external_runtime_dependency` state in `.import/import-report.md`.

## Post-Import Continuation
- Phase 5 default completion should already produce an independently runnable single-root template.
- Post-import continuation is optional and reserved for explicit enhancement/polish requests, not mandatory dependency closure.

## Validation
- The normalized template must pass lint, typecheck, and build from its own runtime root.
- After import/finalization work, `npm run dev` must be started from the normalized runtime root using the documented checklist, and live smoke probes must pass before the lane can be declared complete.
- Validation must include local API smoke coverage for mandatory backend surfaces in the template root.
- In default mode, validation must prove independent runtime success with no required external Foundation-Core process.
- If legacy attached mode is explicitly enabled, attached mode must be proven live and fallback must remain runnable.
- The import report must record source root, target root, stripped artifacts, whether git continuity artifacts were preserved or stripped, delivery mode, `independent_root`, `external_runtime_dependency`, and any unresolved gaps.

## Failure Modes
- `IMPORT_SOURCE_ROOT_MISSING`
- `IMPORT_SOURCE_NOT_NEXT_RUNTIME`
- `IMPORT_TARGET_ALREADY_EXISTS`
- `IMPORT_PORTABILITY_NORMALIZATION_FAILED`
- `IMPORT_ATTACH_CONTRACT_INVALID`
- `IMPORT_BACKEND_MATERIALIZATION_FAILED`
- `IMPORT_INDEPENDENT_ROOT_VALIDATION_FAILED`
- `IMPORT_RUNTIME_BOOT_FAILED`
- `IMPORT_REPORT_MISSING`