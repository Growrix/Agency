# REPLI Replica To Native Next.js Frontend Spec

## Purpose
Define the governed folder-in / folder-out lane for converting a Phase 1.1 pixel-perfect replica into a separate frontend-only, pure native Next.js App Router output project that preserves pixel parity and is ready for backend/devops handoff.

This spec exists because a runnable Next.js wrapper is not the same as a native Next.js frontend. Phase 1.3 combines the repeatable folder-in workflow of Phase 1.2 with the hard native ownership gates needed before backend and devops work can safely start.

## Required Inputs
- `source_root`: a Phase 1.1 replicated folder path
- optional `output_root`: when omitted, derive a sibling `<source-folder-name>-nextjs-native-frontend`
- local filesystem access to the source assets and project files
- local ability to run or statically serve the source for baseline capture

No backend, CMS, payment, email, database, auth, DNS, Vercel, API key, webhook, or deployment input is required for this lane. Unknown production integrations must be represented as explicit frontend not-configured boundaries or blockers, not invented implementations.

## Required Outputs
- a separate TypeScript Next.js App Router output root
- source root preserved read-only
- source inventory matrix
- route ownership matrix
- native conversion matrix
- flow contract matrix
- legacy retirement matrix
- parity gate matrix for desktop and mobile routes
- canonical Next routes for every source page
- `.html` compatibility redirects or aliases when source pages use HTML filenames
- localized assets, fonts, CSS, media, and required runtime replacements
- reusable shell, sections, typed data modules, and native state ownership
- native frontend handling for visible forms/actions with validation, disabled/submitting, success, error, and not-configured states
- SEO basics: metadata, canonical route strategy, robots, sitemap, favicon/app icons when available, Open Graph/Twitter metadata when content exists, and not-found behavior
- validation evidence: lint, typecheck, build, dev startup, route smoke, redirects, tests, media, console-error scan, accessibility, desktop visual, mobile visual, Problems
- final delivery class: `production_candidate`, `baseline_prototype`, or `blocked`, plus `frontend_readiness=native_frontend_ready` only when the native contract passes

## Execution Rules
- Work from the supplied `source_root`; do not ask the user for route lists when they can be derived.
- Keep the source root read-only.
- Derive output root deterministically when not supplied.
- Do not mutate existing production or canonical framework roots.
- Do not stop at planning if native output can be generated.
- Ask the user only when the source path is missing/ambiguous, output path would overwrite unsafe data, baseline capture requires a human choice, visible behavior cannot be natively represented without approval, or a hard blocker requires a human choice.
- Preserve visual parity and native ownership together; neither may be traded away silently.
- Preserve DOM shape, class names, IDs, data attributes, inline styles, data-bgimage, animation classes, plugin selectors, and media paths as needed for parity, but move final ownership into React components and typed data.
- Temporary HTML rendering, generated JSX dumps, broad script injection, and legacy runtime wrappers may be used only as intermediate migration aids.
- Do not declare completion while completed primary routes depend on public HTML files, `.html` filename routing, catch-all HTML resolvers, `dangerouslySetInnerHTML`, generated page dumps, jQuery/global plugin ownership, or legacy DOM mutation.
- Do not invent providers, packages, endpoints, env vars, dashboards, or deployment assumptions.
- Keep forms and visible actions honest as frontend-only when no backend exists: validation, disabled/submitting, error, success only when locally true, and explicit not-configured states are required.
- Internal source `.html` links must become canonical Next route links in output; compatibility aliases/redirects may remain.
- Route-aware native initialization or replacement is required for sliders, carousels, parallax, before/after widgets, accordions, tabs, filters, menus, modals, and animations.
- Lint, typecheck, build, smoke, console-error, and Problems failures block `production_candidate`.
- Screenshot parity failures block `production_candidate` unless the user explicitly accepts a threshold change, in which case delivery class must not hide the tradeoff.

## Required Matrices

### source_inventory_matrix
- source route or URL
- source file path
- title/metadata source
- CSS files
- JS files
- image/font/media roots
- visible forms/actions
- visible widgets/plugins
- repeated sections
- notes/blockers

### route_ownership_matrix
- source route
- source file
- canonical Next route
- compatibility route/redirect
- current owner
- target owner file
- status: `native_next`, `temporary_bridge`, `generated_dump`, `blocked`

### native_conversion_matrix
- route or section
- source pattern
- target component
- target typed data owner
- native state owner
- conversion status: `converted`, `pending`, `blocked`
- parity risk

### flow_contract_matrix
- visible form/action/control
- source behavior
- native validation
- state graph
- backend/integration boundary
- status: `native_frontend_contract`, `not_configured`, `missing_knowledge`, `blocked`

### legacy_retirement_matrix
- public HTML file, script, plugin, loader, or compatibility renderer
- routes using it
- behavior it owns
- native replacement
- retention decision: `removed`, `temporary_retained`, `blocked_retained`

### parity_gate_matrix
- canonical route
- desktop baseline screenshot
- desktop output screenshot
- desktop diff status
- mobile baseline screenshot
- mobile output screenshot
- mobile diff status
- smoke status
- console-error status
- media status
- accessibility status
- final status

## Validation
- source root exists and remains unmodified
- output root exists and is separate from source root
- every source page has a canonical output route
- every source HTML filename has compatibility behavior when applicable
- completed primary routes are owned by `src/app/**`, reusable components, typed data, and native state
- runtime/build path does not depend on `public/*.html` as source of truth
- no primary route uses `dangerouslySetInnerHTML` for page ownership
- no required primary behavior depends on jQuery/global script ownership or broad legacy script injection
- generated dumps are not the final architecture for completed primary routes
- forms/actions expose native frontend contracts and not-configured boundaries rather than fake backend success
- SEO basics exist
- critical assets resolve or have defined fallbacks
- browser console has no uncaught runtime errors on required routes
- `npm run lint -- --max-warnings 0` passes from output root
- typecheck passes from output root
- `npm run build` passes from output root
- dev server starts from output root
- route smoke and redirect checks pass for every canonical and compatibility route
- tests cover critical routes, forms/actions, not-found, redirects, and key interactive states
- desktop and mobile visual parity checks pass
- accessibility checks pass for key routes and forms
- VS Code Problems count is zero for output root

## Delivery Classification
- `production_candidate` with `frontend_readiness=native_frontend_ready`: all applicable validation gates pass, no hidden primary bridge ownership remains, and backend/devops can start without rewriting frontend architecture.
- `baseline_prototype`: the output is useful and may build or look right, but native ownership, flows, tests, SEO, console, accessibility, parity, or Problems gates are incomplete.
- `blocked`: required source access, baseline evidence, tooling, human decision, external asset, or unsupported behavior prevents safe completion.

`production_candidate` with `frontend_readiness=native_frontend_ready` is forbidden for bridge outputs, generated dumps, or legacy-runtime prototypes.

## Failure Modes
- `REPLI_P13_SOURCE_ROOT_MISSING`
- `REPLI_P13_SOURCE_UNREADABLE`
- `REPLI_P13_BASELINE_LOCK_FAILED`
- `REPLI_P13_OUTPUT_ROOT_UNSAFE`
- `REPLI_P13_ROUTE_INVENTORY_FAILED`
- `REPLI_P13_ASSET_LOCALIZATION_FAILED`
- `REPLI_P13_NATIVE_CONVERSION_FAILED`
- `REPLI_P13_FLOW_CONTRACT_FAILED`
- `REPLI_P13_LEGACY_RETAINED`
- `REPLI_P13_RUNTIME_CONSOLE_ERRORS`
- `REPLI_P13_VISUAL_PARITY_FAILED`
- `REPLI_P13_VALIDATION_FAILED`
- `REPLI_P13_MISSING_KNOWLEDGE`

## Invariants
- Source is read-only.
- Output is a separate frontend-only Next.js project.
- Pixel parity is required.
- Native App Router/component/data/state ownership is required.
- Backend/provider implementation is out of scope.
- Frontend contracts and integration boundaries are in scope.
- Bridge rendering can be intermediate only.
- Completion is decided by validation gates, not by appearance alone.