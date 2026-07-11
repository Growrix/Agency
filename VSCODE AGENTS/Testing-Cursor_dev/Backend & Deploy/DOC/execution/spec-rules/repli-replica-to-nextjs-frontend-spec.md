# REPLI Replica To Next.js Frontend Spec

## Purpose
Define the governed folder-in / folder-out lane for converting a Phase 1.1 pixel-perfect replica into a separate frontend-only Next.js App Router output project without turning the run into backend, provider, or deep production-template work.

This spec exists because the previous workflow mixed two goals:
- preserve the exact Phase 1.1 visual output
- redesign the project into a production-native reusable template with real backend-ready flow contracts

Those goals must be separated. Phase 1.2 owns the first migration-safe frontend goal. Phase 2.6 owns the later production-template goal.

## Required Inputs
- `source_root`: a Phase 1.1 replicated folder path
- optional `output_root`: when omitted, derive a sibling `<source-folder-name>-nextjs-frontend`
- local filesystem access to the source assets and project files
- local ability to run or statically serve the source for baseline capture

No backend, CMS, payment, email, database, auth, DNS, Vercel, API key, webhook, or deployment input is required for this lane.

## Required Outputs
- a separate Next.js App Router output root
- source root preserved read-only
- source inventory matrix
- output route matrix
- runtime manifest covering CSS order, script order, route-specific scripts, plugin hooks, body classes, shell markers, and media roots
- parity gate matrix for desktop and mobile routes
- canonical Next routes for every source page
- `.html` compatibility redirects or aliases when source pages use HTML filenames
- localized assets, fonts, CSS, media, and scripts required for visual parity
- frontend-only handling for visible forms and controls without invented providers
- validation evidence: lint, build, dev startup, smoke, media, desktop visual, mobile visual, Problems
- final delivery class: `frontend_pixel_locked_nextjs` or `blocked`

## Execution Rules
- Work from the supplied `source_root`; do not ask the user for route lists when they can be derived.
- Keep the source root read-only.
- Derive output root deterministically when not supplied.
- Do not mutate existing production or canonical framework roots.
- Do not stop at planning if the output can be generated.
- Do not end with optional continuation prompts for executable migration work.
- Ask the user only when the source path is missing/ambiguous, output path would overwrite unsafe data, or a hard blocker requires a human choice.
- Preserve visual parity before refactoring.
- Preserve DOM shape, class names, IDs, data attributes, inline styles, data-bgimage, animation classes, plugin selectors, and route-specific script requirements.
- Use structured parsers or deterministic conversion utilities for HTML/asset manifests whenever available; avoid hand-coded approximate rewrites.
- Prefer generated TSX/React route ownership over runtime HTML injection.
- If temporary HTML rendering is required to preserve parity during migration, classify it as `temporary_retained` and keep the delivery class below completed until converted or explicitly accepted as frontend-parity-only output.
- Do not invent providers, packages, endpoints, env vars, dashboards, or deployment assumptions.
- Keep forms and commerce honest as frontend-only when no backend exists: validation, disabled/submitting, success/error/not-configured states are enough for this lane.
- Internal source `.html` links must become canonical Next route links in output; compatibility aliases/redirects may remain.
- Route-aware runtime initialization is required for sliders, carousels, parallax, before/after widgets, accordions, tabs, filters, menus, modals, and animations.
- Lint and build failures block completion.
- Screenshot parity failures block completion unless the user explicitly accepts a threshold change.

## Required Matrices

### source_inventory_matrix
- source route or URL
- source file path
- title/metadata source
- CSS files
- JS files
- image/font/media roots
- visible forms
- visible widgets/plugins
- notes/blockers

### output_route_matrix
- source route
- source file
- canonical Next route
- compatibility route/redirect
- output owner file
- status: `generated`, `validated`, `blocked`

### runtime_manifest
- global CSS order
- route CSS order overrides
- global script order
- route script order overrides
- body/html classes
- shell markers
- plugin hooks/selectors
- initialization strategy

### parity_gate_matrix
- canonical route
- desktop baseline screenshot
- desktop output screenshot
- desktop diff status
- mobile baseline screenshot
- mobile output screenshot
- mobile diff status
- smoke status
- media status
- final status

## Validation
- source root exists and remains unmodified
- output root exists and is separate from source root
- every source page has a canonical output route
- every source HTML filename has compatibility behavior when applicable
- CSS/script/runtime manifest is recorded
- no source-domain primary nav/canonical residue remains unless intentionally external
- media reliability check passes for critical assets
- `npm run lint -- --max-warnings 0` passes from output root
- `npm run build` passes from output root
- dev server starts from output root
- route smoke checks pass for every canonical route
- desktop and mobile visual parity checks pass
- VS Code Problems count is zero for output root

## Failure Modes
- `REPLI_P12_SOURCE_ROOT_MISSING`
- `REPLI_P12_SOURCE_UNREADABLE`
- `REPLI_P12_BASELINE_LOCK_FAILED`
- `REPLI_P12_OUTPUT_ROOT_UNSAFE`
- `REPLI_P12_ROUTE_INVENTORY_FAILED`
- `REPLI_P12_ASSET_LOCALIZATION_FAILED`
- `REPLI_P12_PAGE_CONVERSION_FAILED`
- `REPLI_P12_RUNTIME_PARITY_FAILED`
- `REPLI_P12_VISUAL_PARITY_FAILED`
- `REPLI_P12_VALIDATION_FAILED`
