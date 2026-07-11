# REPLI HTML To Verified Native Next.js Frontend Checklist

## System Surface
- [ ] Public wrapper exists under `.github/agents/phase1.4-html-to-verified-native-nextjs-frontend.agent.md`.
- [ ] Canonical public agent exists under `Backend & Deploy/.github/agents/phase1.4-html-to-verified-native-nextjs-frontend.agent.md`.
- [ ] Canonical DOC agent exists under `Backend & Deploy/DOC/agents/phase1.4-html-to-verified-native-nextjs-frontend.agent.md`.
- [ ] Execution spec exists under `Backend & Deploy/DOC/execution/spec-rules/repli-html-to-verified-native-nextjs-frontend-spec.md`.
- [ ] Checklist exists under `Backend & Deploy/DOC/validation/checklists/repli-html-to-verified-native-nextjs-frontend-checklist.md`.
- [ ] Root and canonical registries expose Phase 1.4 as the verified HTML/static-template to pure native Next.js lane.
- [ ] Registries distinguish Phase 1.2 bridge parity, Phase 1.3 native output, Phase 1.4 verified HTML/native repair, and Phase 2.6 in-place completion.

## Intake And Source Safety
- [ ] `source_root` is the only required input.
- [ ] `existing_attempt_root` is optional and treated as read-only evidence.
- [ ] `output_root` is derived when omitted.
- [ ] Source root exists.
- [ ] Source root is not mutated.
- [ ] Existing attempt root is not mutated unless explicitly approved as output.
- [ ] Output root is separate from source root unless explicit in-place approval exists.
- [ ] Unsafe overwrite risks are blocked before editing.

## Baseline And Inventory
- [ ] Source HTML/static routes are inventoried.
- [ ] Source screenshots or renderable routes are identified.
- [ ] Desktop baseline screenshots exist.
- [ ] Tablet baseline screenshots exist when required.
- [ ] Mobile baseline screenshots exist.
- [ ] HTML head metadata is inventoried.
- [ ] HTML/body classes and global attributes are inventoried.
- [ ] CSS order is inventoried.
- [ ] JS/script order is inventoried.
- [ ] Fonts/images/media roots are inventoried.
- [ ] Navigation and internal links are inventoried.
- [ ] Visible forms/actions are inventoried.
- [ ] Plugin/widget hooks are inventoried.
- [ ] Repeated sections and datasets are inventoried.
- [ ] Hardcoding/content/config candidates are inventoried.

## Existing Attempt Audit
- [ ] Existing attempt route ownership is audited when supplied.
- [ ] Raw HTML reads are detected and classified.
- [ ] HTML parser rendering is detected and classified.
- [ ] Public HTML ownership is detected and classified.
- [ ] Generated dumps and legacy folders are detected and classified.
- [ ] Existing forms/actions are audited for fake success and missing integration boundaries.
- [ ] Existing validation scripts and useful native components are identified for reuse.
- [ ] Reuse decisions are recorded as `reuse`, `mine_only`, `replace`, `ignore`, or `blocked`.

## Required Evidence Bundle
- [ ] `source-inventory` exists.
- [ ] `attempt-audit` exists when applicable.
- [ ] `route-map.json` exists.
- [ ] `componentization-register` exists.
- [ ] `content-register` exists.
- [ ] `hardcoding-register` exists.
- [ ] `flow-contract-register` exists.
- [ ] `legacy-retirement-register` exists.
- [ ] `purity-scan-report` exists.
- [ ] `visual-parity-report` exists.
- [ ] `validation-report` exists.
- [ ] `exception-register` exists.

## Output Generation
- [ ] Output Next.js App Router project exists.
- [ ] TypeScript configuration exists.
- [ ] Zero-warning lint script exists.
- [ ] Typecheck script or equivalent validation exists.
- [ ] Assets, CSS, fonts, and media required for parity are localized.
- [ ] Every source page maps to a canonical non-HTML route.
- [ ] `.html` compatibility redirects or aliases exist where applicable.
- [ ] Internal links are canonicalized to non-HTML routes.
- [ ] Source-domain primary navigation/canonical residue is removed unless intentionally external.

## Native Ownership Gates
- [ ] Completed primary routes are owned by `src/app/**`.
- [ ] Shared shell is extracted into reusable components.
- [ ] Repeated sections are centralized into reusable components and typed data.
- [ ] Route metadata is owned by route/layout metadata or typed metadata modules.
- [ ] Native React/Next state owns menus, tabs, accordions, filters, drawers, modals, galleries, sliders/carousels, and other required controls.
- [ ] Generated JSX page dumps are not final architecture for completed primary routes.
- [ ] Legacy `.html` routes, if retained, are redirects or compatibility aliases only.

## Flow Gates
- [ ] Every visible form/action has validation states.
- [ ] Every visible form/action has disabled/submitting states.
- [ ] Every visible form/action has success/error/not-configured states.
- [ ] Fake form success, missing PHP endpoints, and `action="#"` are not retained as completed behavior.
- [ ] Lead-gen, booking, quote, newsletter, listing inquiry, and contact surfaces expose native frontend contracts when visible or implied.
- [ ] Commerce/cart/wishlist/search/filter/sort/checkout-entry states are native frontend flows when visible or implied.
- [ ] Unknown email, payment, CMS, database, analytics, auth, webhook, or account dependencies are classified as `missing_knowledge` or `blocked` instead of guessed.

## Purity Gates
- [ ] Output app runtime/build does not use `html-react-parser`.
- [ ] Output app runtime/build does not use `node-html-parser`.
- [ ] Output app runtime/build does not use `cheerio` or `parse5` for route ownership.
- [ ] Completed primary routes do not use `dangerouslySetInnerHTML` for page ownership.
- [ ] Runtime/build does not read `src/content/pages` or equivalent page HTML source.
- [ ] Runtime/build does not read `public/*.html` as source of truth.
- [ ] No catch-all HTML resolver owns completed primary routes.
- [ ] No `src/legacy/**` or copied legacy tree owns completed primary routes.
- [ ] No React Router shim owns final route behavior.
- [ ] Legacy script loaders, jQuery/global plugin ownership, and broad DOM mutation are removed or classified as blocked-retained.
- [ ] Purity scan results are recorded and rerun after fixes.

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
- [ ] Desktop visual diff <= 0.03 (3%) max ratio per canonical route.
- [ ] Tablet output screenshots exist when required.
- [ ] Tablet visual diff <= 0.03 (3%) max ratio per canonical route when required.
- [ ] Mobile output screenshots exist.
- [ ] Mobile visual diff <= 0.03 (3%) max ratio per canonical route.
- [ ] QA harness `PARITY_THRESHOLD` (or equivalent) is set to `0.03` or stricter for the final validation run.
- [ ] Any route exceeding `0.03` has a reviewer-named exception entry in `exception-register.md` with cause, scope, and screenshot evidence.
- [ ] Required sliders/carousels work.
- [ ] Required animation/parallax/accordion/tab/filter/menu/modal widgets work.
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
- [ ] Final report uses `delivery_class=production_candidate` and `frontend_readiness=verified_native_frontend_ready` only when all applicable gates pass.

## Delivery Classification
- [ ] `delivery_class=production_candidate` with `frontend_readiness=verified_native_frontend_ready` is used only when all purity, native ownership, parity, flow, SEO, validation, accessibility, and Problems gates pass.
- [ ] `delivery_class=baseline_prototype` is used when the site builds or looks right but ownership, flows, tests, SEO, console, accessibility, parity, or Problems gates remain incomplete.
- [ ] `delivery_class=blocked` is used when required source access, baseline evidence, tooling, human decisions, external assets, or unsupported behavior prevent completion.
- [ ] Remaining `temporary_bridge`, `generated_dump`, `html_backed`, `blocked_retained`, `missing_knowledge`, or `blocked` items are documented explicitly.

## Blocker Discipline
- [ ] Missing source folder is reported as `REPLI_P14_SOURCE_ROOT_MISSING`.
- [ ] Unreadable source/assets are reported as `REPLI_P14_SOURCE_UNREADABLE`.
- [ ] Baseline capture failures are reported with exact command/path evidence.
- [ ] Native componentization failures are reported as `REPLI_P14_COMPONENTIZATION_FAILED`.
- [ ] Retained legacy primary ownership is reported as `REPLI_P14_LEGACY_RETAINED`.
- [ ] Failed purity scans are reported as `REPLI_P14_PURITY_SCAN_FAILED`.
- [ ] Runtime console errors are reported as `REPLI_P14_RUNTIME_CONSOLE_ERRORS`.
- [ ] Validation failures are fixed and rerun before completion.
- [ ] Backend/provider/deployment unknowns are not invented to force a pass.