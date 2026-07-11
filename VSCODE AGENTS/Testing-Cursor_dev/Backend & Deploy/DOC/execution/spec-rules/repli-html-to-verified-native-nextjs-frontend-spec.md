# REPLI HTML To Verified Native Next.js Frontend Spec

## Purpose
Define the governed lane for converting a raw HTML/static template source folder, or repairing a failed HTML-backed Next.js attempt, into a separate frontend-only, verified pure native Next.js App Router output project.

This spec exists because a buildable Next.js app can still be an HTML bridge. Phase 1.4 adds an evidence-first migration contract: every completed route must prove native route, component, data, state, flow, parity, and validation ownership before backend/devops handoff readiness can be claimed.

## Request Classification
Phase 1.4 is an `extend_existing_lane` and `repair_drift` lane. It extends the Phase 1.2/1.3 folder-in workflow and repairs the drift where native migration accepted raw HTML readers, parser renderers, generated dumps, or legacy script ownership as complete.

## Required Inputs
- `source_root`: raw HTML/static template source folder, screenshot-derived replica folder, or static HTML site folder
- optional `existing_attempt_root`: failed or partial Next.js attempt to inspect as evidence
- optional `output_root`: when omitted, derive sibling `<source-folder-name>-nextjs-verified-native-frontend`
- local filesystem access to source assets and project files
- local ability to statically serve or render the source or approved attempt for baseline capture

No backend, CMS, payment, email, database, auth, DNS, Vercel, API key, webhook, analytics account, or deployment input is required. Unknown production integrations must be represented as frontend not-configured boundaries, `missing_knowledge`, or blockers.

## Supported Source Classes
- static HTML templates with CSS, JS, fonts, images, and media assets
- Phase 1.1 screenshot-derived replicas that produced HTML/static output
- copied public website folders where routes are `.html` files
- failed Next.js attempts that still read page HTML, parse fragments, or keep public HTML as source of truth

## Out Of Scope
- Vite React app migration as a primary source; use the Vite-to-Next system or a dedicated Vite lane for that source class
- backend/provider implementation
- redesigning the visual baseline without explicit user approval
- declaring production readiness for a bridge, scaffold, pending visual report, or build-only output

## Required Outputs
- separate TypeScript Next.js App Router output root
- source root preserved read-only
- optional existing attempt preserved read-only unless explicitly selected as output
- evidence folder such as `DOC/migration/phase1.4/`
- source HTML inventory
- attempt audit when provided
- route map and canonical route strategy
- componentization register
- typed data and hardcoding/content register
- flow contract register
- legacy retirement register
- purity scan report
- parity gate report for desktop, tablet, and mobile routes
- validation report for lint, typecheck, build, dev, smoke, redirects, tests, media, console, accessibility, visual, and Problems gates
- delivery class: `production_candidate`, `baseline_prototype`, or `blocked`
- `frontend_readiness=verified_native_frontend_ready` only when all applicable gates pass

## Vite-to-Next Lessons To Reuse
- inventory routes before generation
- emit route map, content register, risk register, exception register, and validation report artifacts
- classify hardcoding instead of silently burying copy, endpoints, and placeholders in components
- require measured visual parity evidence before claiming parity
- refuse unsupported source classes or missing evidence
- keep zero-warning and zero-Problems gates

## Vite-to-Next Patterns To Reject
- React Router compatibility shims as final ownership
- `src/legacy/**` copied source as final ownership
- copy-first React component migration as a substitute for static HTML componentization
- pending visual parity reports as passing evidence
- build success as proof of native purity

## Execution Rules
- Work from `source_root`; do not ask the user for route lists that can be derived.
- Keep source read-only.
- Derive output root deterministically when omitted.
- Block unsafe overwrites before editing.
- Treat existing attempt roots as evidence, not authority.
- Do not mutate existing attempts unless explicitly approved as output roots.
- Use structured parsing and inventories during migration, but do not leave page HTML parsing in output runtime/build ownership.
- Preserve DOM shape, classes, IDs, data attributes, inline styles, image paths, body/html class semantics, and animation hooks when needed for visual parity.
- Move final ownership into React components, typed data, native state, route metadata, and explicit frontend flow contracts.
- Preserve `.html` URL compatibility with redirects or aliases only.
- Do not invent providers, env vars, endpoints, packages, accounts, dashboards, or deployment assumptions.
- Stop only for hard blockers: missing source, unreadable assets, unsafe overwrite, impossible baseline capture, unsupported visual behavior, unavailable required local tooling, or validation failures that cannot be fixed in the run.

## Required Evidence Folder
The output project must contain a migration evidence folder, normally `DOC/migration/phase1.4/`, with:
- `source-inventory.json` or `source-inventory.md`
- `attempt-audit.md` when `existing_attempt_root` is supplied
- `route-map.json`
- `componentization-register.md`
- `content-register.json` or `content-register.md`
- `hardcoding-register.json` or `hardcoding-register.md`
- `flow-contract-register.md`
- `legacy-retirement-register.md`
- `purity-scan-report.md`
- `visual-parity-report.md`
- `validation-report.md`
- `exception-register.md`

## Required Matrices

### source_html_inventory_matrix
- source route or URL
- source file path
- title, description, canonical, Open Graph, and favicon/icon sources
- html/body classes and global attributes
- CSS files and order
- JS files and order
- image, font, video, SVG, and media roots
- visible forms/actions
- visible widgets/plugins
- repeated sections and content collections
- notes/blockers

### attempt_audit_matrix
- existing attempt file or subsystem
- current role
- purity violation or reusable evidence
- validation status
- reuse decision: `reuse`, `mine_only`, `replace`, `ignore`, `blocked`

### route_ownership_matrix
- source route
- source file
- canonical Next route
- `.html` compatibility route or redirect
- current owner
- target owner file
- status: `native_next`, `temporary_bridge`, `generated_dump`, `html_backed`, `blocked`

### componentization_matrix
- source route or section
- source DOM pattern
- target component
- target typed data owner
- native state owner
- conversion status: `converted`, `pending`, `blocked`
- parity risk

### content_and_hardcoding_matrix
- source file and selector or line
- content/config kind
- current value or summary
- target module
- action: `extract`, `config`, `metadata`, `allowlist`, `exception`, `blocked`
- exception id when retained

### flow_contract_matrix
- visible form/action/control
- source behavior
- native validation
- state graph
- backend/integration boundary
- status: `native_frontend_contract`, `not_configured`, `missing_knowledge`, `blocked`

### legacy_retirement_matrix
- public HTML file, parser, script, plugin, loader, generated dump, or compatibility renderer
- routes using it
- behavior it owns
- native replacement
- retention decision: `removed`, `temporary_retained`, `blocked_retained`

### purity_scan_matrix
- forbidden pattern
- scanned scope
- matching files
- final result: `pass`, `fail`, `documented_exception`
- fix status

### parity_gate_matrix
- canonical route and state
- desktop baseline screenshot
- desktop output screenshot
- desktop diff ratio (must be <= 0.03)
- tablet baseline screenshot
- tablet output screenshot
- tablet diff ratio (must be <= 0.03 when tablet baseline applies)
- mobile baseline screenshot
- mobile output screenshot
- mobile diff ratio (must be <= 0.03)
- smoke status
- console-error status
- media status
- accessibility status
- final status

## Parity Threshold (Non-Negotiable)
The Phase 1.4 visual parity gate is numeric and pinned. It must not be loosened to make routes pass.
- Maximum per-route pixel diff ratio at desktop and mobile (and tablet when applicable): `0.03` (3%).
- The QA harness `PARITY_THRESHOLD` environment variable (or equivalent) must be set to `0.03` or stricter when validating Phase 1.4 delivery.
- Any route whose diff ratio exceeds `0.03` blocks `delivery_class=production_candidate` unless an explicit, reviewer-named exception is recorded in `exception-register.md` with cause, scope, and screenshot evidence.
- Threshold-raising as a fix is forbidden; fixes must be component, CSS, asset, or font ownership corrections.
- Phase 1.5 then tightens this threshold to `0.01` (1%) as its own gate. Phase 1.4 hands off only when the 3% ladder is satisfied.

## Native Purity Gates
Completed primary routes must not depend on:
- `html-react-parser`
- `node-html-parser`
- `cheerio`
- `parse5`
- `dangerouslySetInnerHTML` for page ownership
- `src/content/pages` or equivalent runtime page HTML source
- `public/*.html` as source of truth
- filesystem HTML readers in runtime/build route ownership
- catch-all HTML resolvers
- generated JSX page dumps as final architecture
- `src/legacy/**` as final ownership
- React Router compatibility shims as final route ownership
- jQuery/global plugin ownership for required behavior
- broad script injection or DOM mutation as primary behavior

Migration scripts or temporary notes may mention these patterns, but final app runtime and build ownership must pass the purity scan.

## Validation
- source root exists and remains unmodified
- output root exists and is separate from source root unless explicit in-place approval exists
- every source HTML page maps to a canonical output route
- every source `.html` route has redirect or compatibility behavior when needed
- completed primary routes are owned by `src/app/**`, components, typed data, and native state
- output runtime/build does not read page HTML as source of truth
- shared shell and repeated sections are reusable
- visible forms/actions expose native frontend contracts and not-configured boundaries rather than fake backend success
- metadata, canonical routes, robots, sitemap, favicon/app icons when available, social metadata when available, and not-found behavior exist
- critical assets resolve or have defined fallbacks
- browser console has no uncaught runtime errors on required routes
- `npm run lint -- --max-warnings 0` passes from output root
- typecheck passes from output root
- `npm run build` passes from output root
- dev server starts from output root
- route smoke and redirect checks pass for every canonical and compatibility route
- tests cover critical routes, forms/actions, redirects, not-found, and key interactive states
- desktop, tablet, and mobile visual parity checks pass at <= 0.03 max diff ratio per route per viewport, or block production classification
- accessibility checks pass for key routes and forms
- VS Code Problems count is zero for output root

## Delivery Classification
- `production_candidate` with `frontend_readiness=verified_native_frontend_ready`: all applicable purity, ownership, flow, parity, SEO, accessibility, validation, and Problems gates pass.
- `baseline_prototype`: output is useful and may build or look close, but purity, ownership, flows, SEO, tests, parity, accessibility, console, or Problems gates remain incomplete.
- `blocked`: required source access, baseline evidence, local tooling, human decision, external asset, or unsupported behavior prevents safe completion.

`production_candidate` is forbidden for bridge outputs, parser-rendered outputs, generated dumps, legacy-runtime prototypes, or pending visual evidence.

## Failure Modes
- `REPLI_P14_SOURCE_ROOT_MISSING`
- `REPLI_P14_SOURCE_UNREADABLE`
- `REPLI_P14_BASELINE_LOCK_FAILED`
- `REPLI_P14_OUTPUT_ROOT_UNSAFE`
- `REPLI_P14_ROUTE_INVENTORY_FAILED`
- `REPLI_P14_ATTEMPT_AUDIT_FAILED`
- `REPLI_P14_ASSET_LOCALIZATION_FAILED`
- `REPLI_P14_COMPONENTIZATION_FAILED`
- `REPLI_P14_DATA_EXTRACTION_FAILED`
- `REPLI_P14_FLOW_CONTRACT_FAILED`
- `REPLI_P14_LEGACY_RETAINED`
- `REPLI_P14_PURITY_SCAN_FAILED`
- `REPLI_P14_RUNTIME_CONSOLE_ERRORS`
- `REPLI_P14_VISUAL_PARITY_FAILED`
- `REPLI_P14_VALIDATION_FAILED`
- `REPLI_P14_MISSING_KNOWLEDGE`

## Invariants
- Source is read-only.
- Existing attempts are evidence unless explicitly selected as output.
- Output is frontend-only Next.js App Router.
- Pixel parity and native ownership are both required.
- DOM parsing can be migration tooling only.
- Backend/provider implementation is out of scope.
- Frontend contracts and integration boundaries are in scope.
- Completion is decided by evidence and validation, not by naming, appearance, or build success alone.