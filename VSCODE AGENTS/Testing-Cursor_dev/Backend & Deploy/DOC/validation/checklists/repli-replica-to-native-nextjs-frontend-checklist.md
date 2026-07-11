# REPLI Replica To Native Next.js Frontend Checklist

## System Surface
- [ ] Public wrapper exists under `.github/agents/phase1.3-replica-to-native-nextjs-frontend.agent.md`.
- [ ] Canonical public agent exists under `Backend & Deploy/.github/agents/phase1.3-replica-to-native-nextjs-frontend.agent.md`.
- [ ] Canonical DOC agent exists under `Backend & Deploy/DOC/agents/phase1.3-replica-to-native-nextjs-frontend.agent.md`.
- [ ] Execution spec exists under `Backend & Deploy/DOC/execution/spec-rules/repli-replica-to-native-nextjs-frontend-spec.md`.
- [ ] Checklist exists under `Backend & Deploy/DOC/validation/checklists/repli-replica-to-native-nextjs-frontend-checklist.md`.
- [ ] Root and canonical registries describe Phase 1.3 as the folder-in / native Next.js frontend-out lane.
- [ ] Root and canonical registries distinguish Phase 1.2 bridge parity from Phase 1.3 native frontend readiness.

## Intake And Source Safety
- [ ] `source_root` is the only required input.
- [ ] `output_root` is derived when omitted.
- [ ] Source root exists.
- [ ] Source root is not mutated.
- [ ] Output root is separate from source root.
- [ ] Unsafe overwrite risks are blocked before editing.

## Baseline And Inventory
- [ ] Source routes/pages are inventoried.
- [ ] Source HTML files are inventoried when present.
- [ ] Source screenshots or renderable routes are identified.
- [ ] Desktop baseline screenshots exist.
- [ ] Mobile baseline screenshots exist.
- [ ] CSS order is inventoried.
- [ ] JS/script order is inventoried.
- [ ] Fonts/images/media roots are inventoried.
- [ ] Navigation and internal links are inventoried.
- [ ] Visible forms/actions are inventoried.
- [ ] Plugin/widget hooks are inventoried.
- [ ] Repeated sections are inventoried.

## Required Matrices
- [ ] `source_inventory_matrix` exists.
- [ ] `route_ownership_matrix` exists and classifies every source route.
- [ ] `native_conversion_matrix` exists and maps routes/sections to components, data, and state owners.
- [ ] `flow_contract_matrix` exists and covers every visible form/action/control.
- [ ] `legacy_retirement_matrix` exists and names every retained script, loader, public HTML owner, compatibility renderer, and DOM mutation layer.
- [ ] `parity_gate_matrix` exists for desktop and mobile required routes.

## Output Generation
- [ ] Output Next.js App Router project exists.
- [ ] TypeScript configuration exists.
- [ ] Zero-warning lint script exists.
- [ ] Typecheck script or equivalent validation exists.
- [ ] Assets, CSS, fonts, and media required for parity are localized.
- [ ] Every source page maps to a canonical route.
- [ ] `.html` compatibility redirects or aliases exist where applicable.
- [ ] Internal links are canonicalized to non-HTML routes.
- [ ] Source-domain primary navigation/canonical residue is removed unless intentionally external.

## Native Ownership Gates
- [ ] Completed primary routes are owned by `src/app/**`.
- [ ] Shared shell is extracted into reusable components.
- [ ] Repeated sections are centralized into reusable components and typed data.
- [ ] Runtime/build does not read `public/*.html` as the source of truth.
- [ ] Completed primary routes do not use `dangerouslySetInnerHTML` for page ownership.
- [ ] Generated JSX page dumps are not the final architecture for completed primary routes.
- [ ] Legacy `.html` routes, if retained, are redirects or compatibility aliases only.
- [ ] Native React/Next state owns menus, tabs, accordions, filters, drawers, modals, before/after widgets, sliders/carousels, and other required visible controls.
- [ ] Legacy script loaders, jQuery/global plugin ownership, and broad DOM mutation are removed or classified as blocked-retained.

## Flow Gates
- [ ] Every visible form/action has validation states.
- [ ] Every visible form/action has disabled/submitting states.
- [ ] Every visible form/action has success/error/not-configured states.
- [ ] Fake form success, missing PHP endpoints, and `action="#"` are not retained as completed behavior.
- [ ] Lead-gen, booking, quote, newsletter, listing inquiry, and contact surfaces expose native frontend contracts when visible or implied.
- [ ] Commerce/cart/wishlist/search/filter/sort/checkout-entry states are native frontend flows when visible or implied.
- [ ] Unknown email, payment, CMS, database, analytics, auth, webhook, or account dependencies are classified as `missing_knowledge` or `blocked` instead of guessed.

## SEO And Template Gates
- [ ] Metadata exists for primary routes.
- [ ] Canonical URLs are defined.
- [ ] Robots and sitemap are implemented.
- [ ] Favicon/app icons exist when available from the source.
- [ ] Open Graph/Twitter metadata exists when source content supports it.
- [ ] Not-found behavior exists.
- [ ] Template data is reusable and not only hardcoded as one page dump.

## Pixel, Runtime, And Accessibility Gates
- [ ] Desktop output screenshots exist.
- [ ] Desktop visual diff passes within threshold.
- [ ] Mobile output screenshots exist.
- [ ] Mobile visual diff passes within threshold.
- [ ] Required sliders/carousels work.
- [ ] Required animation/parallax/before-after/accordion/tab/filter/menu/modal widgets work.
- [ ] Browser console has no uncaught runtime errors on required routes.
- [ ] Critical media assets resolve or render defined fallbacks.
- [ ] Key routes and forms pass accessibility checks.

## Validation Gates
- [ ] `npm run lint -- --max-warnings 0` passes from output root.
- [ ] Typecheck passes from output root.
- [ ] `npm run build` passes from output root.
- [ ] Dev server starts from output root.
- [ ] Smoke checks pass for every canonical route.
- [ ] Redirect checks pass for every compatibility route.
- [ ] Tests cover critical routes, forms/actions, not-found, redirects, and key interactive states.
- [ ] VS Code Problems count is zero for output root.
- [ ] Final report uses `delivery_class=production_candidate` and `frontend_readiness=native_frontend_ready` only when all applicable native gates pass.

## Delivery Classification
- [ ] `delivery_class=production_candidate` with `frontend_readiness=native_frontend_ready` is used only when all native ownership, parity, flow, SEO, validation, and Problems gates pass.
- [ ] `delivery_class=baseline_prototype` is used when the site builds or looks right but ownership, flows, tests, SEO, console, accessibility, parity, or Problems gates remain incomplete.
- [ ] `delivery_class=blocked` is used when required source access, baseline evidence, tooling, human decisions, external assets, or unsupported behavior prevent completion.
- [ ] Remaining `temporary_bridge`, `generated_dump`, `blocked_retained`, `missing_knowledge`, or `blocked` items are documented explicitly.

## Blocker Discipline
- [ ] Missing source folder is reported as `REPLI_P13_SOURCE_ROOT_MISSING`.
- [ ] Unreadable source/assets are reported as `REPLI_P13_SOURCE_UNREADABLE`.
- [ ] Baseline capture failures are reported with exact command/path evidence.
- [ ] Native conversion failures are reported as `REPLI_P13_NATIVE_CONVERSION_FAILED`.
- [ ] Retained legacy primary ownership is reported as `REPLI_P13_LEGACY_RETAINED`.
- [ ] Runtime console errors are reported as `REPLI_P13_RUNTIME_CONSOLE_ERRORS`.
- [ ] Validation failures are fixed and rerun before completion.
- [ ] Backend/provider/deployment unknowns are not invented to force a pass.