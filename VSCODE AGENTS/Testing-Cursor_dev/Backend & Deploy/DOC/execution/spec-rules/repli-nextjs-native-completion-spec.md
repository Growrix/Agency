# REPLI Next.js Native Completion Spec

## Purpose
Define the governed completion pass for converting a screenshot-derived REPLI frontend from a visually correct replica into a pure, reusable, production-ready Next.js App Router client template without changing the approved visual result.

This spec exists because a pixel-perfect replica is not automatically a production Next.js product. Phase 2.6 must replace page ownership, route ownership, state ownership, flow ownership, SEO ownership, and validation ownership behind the locked visual baseline.

## Required Inputs
- target project root under `FRONTEND DEV/<slug>/`
- approved visual baseline from Phase 1.1 screenshots, Phase 1.1 report, or current pre-phase-2.6 localhost runtime
- full public route inventory and navigation inventory
- current route ownership audit covering `src/app/**`, `src/components/**`, `src/data/**`, `src/legacy/**`, `public/*.html`, route registries, script loaders, and compatibility renderers
- visible and implied user-flow inventory covering contact, booking, quote, newsletter, career/apply, listing inquiry, search/filter/sort, cart, wishlist, checkout, order/confirmation, comments, account surfaces when present
- required reusable template modules: `shell`, `lead_gen`, `commerce`, `inventory_listing`, `content_blog`, `seo`, `legal`, `media`
- verified allowed integrations, or an explicit statement that required integrations are unknown

## Required Outputs
- `route_ownership_matrix` with canonical routes, legacy routes, current owners, target owners, classification, and blockers
- `template_capability_matrix` with module-level status: `supported`, `requires_extension`, `missing_knowledge`, or `blocked`
- `legacy_retirement_matrix` listing removed, temporary-retained, and blocked-retained dependencies
- `parity_risk_matrix` with desktop, mobile, motion, and behavior parity risks
- explicit human interaction guidance when clarifying questions, approval gates, or missing human inputs are required for safe continuation
- primary routes owned by `src/app/**`, reusable components, typed data modules, and native state flows
- shared shell ownership extracted into Next.js components
- canonical non-HTML route model with `.html` routes retained only as redirects or explicit compatibility aliases
- production flow contracts for lead-gen and commerce surfaces, or blocked/missing-knowledge classification when integrations are unavailable
- SEO basics: metadata, canonical URLs, robots, sitemap, favicon/app icons, Open Graph/Twitter metadata, and not-found behavior
- test and smoke coverage for critical lead-gen, commerce, listing, content, and route behavior
- final delivery classification: `production_candidate`, `baseline_prototype`, or `blocked`

## Execution Rules
- Work in the same project root; do not create a second frontend runtime.
- Preserve the approved visual output exactly unless the user explicitly authorizes redesign.
- Start with baseline lock and ownership/capability/legacy/parity matrices before editing.
- Ask clarifying questions when the approved baseline source, route inventory, required template modules, allowed integrations, or production-readiness boundary is unclear.
- Ask for explicit user approval before changing the approved visible baseline, removing user-facing legacy URL compatibility the user still needs, widening the declared route or module contract, or accepting a parity-risk tradeoff.
- Report the exact missing human inputs when progress depends on provider choice, credentials, CMS or data ownership, payment or lead-gen policy, or release-readiness decisions.
- Call out required human review points explicitly, especially baseline lock confirmation, visual parity acceptance, legacy-retirement exceptions, integration approval, and final production classification.
- Migrate in this order: canonical route plan, shared shell, typed data, homepage, repeated sections, high-traffic routes, native flows, secondary routes, SEO, legacy retirement, validation.
- Do not declare completion while primary routes still depend on legacy HTML-backed ownership, `.html` filename route conventions, generated page dumps, `src/legacy/**`, public HTML files, catch-all legacy resolvers, or `dangerouslySetInnerHTML`.
- Generated JSX dumps may be used as a transitional substrate only. They are not completion when shared shell, repeated sections, and typed data remain duplicated.
- Legacy scripts, jQuery plugins, compatibility runtimes, and DOM mutation layers may be temporarily retained only with a route-scoped retention decision and replacement plan.
- Fake form success, missing PHP endpoints, localStorage-only commerce, and query-parameter DOM mutation are forbidden as production-ready final behavior.
- Every visible form/action must submit through a real Next.js server action or route handler, or the flow must be classified as blocked because a required integration is missing.
- Commerce payment, tax, shipping, account, inventory, order persistence, CMS, email, analytics, and database behavior must use verified project-supported integrations. Unknown providers must be classified as `missing_knowledge` rather than guessed.
- Broad lint, accessibility, image, or Next.js rule suppression is not an acceptable completion strategy.
- Keep the frontend buildable after each migration slice.

## Validation
- route ownership matrix is present and every primary route is classified
- template capability matrix is present and covers shell, lead-gen, commerce, inventory/listing, content/blog, SEO, legal, and media
- the agent explicitly asks for human clarification or approval when safe continuation depends on it
- shared shell and repeated sections are centralized into reusable components and typed data
- completed primary routes are App Router owned with canonical non-HTML routes
- legacy `.html` routes are redirects/aliases only, not primary owners
- no completed primary behavior depends on legacy runtime scripts or DOM mutation
- all production flows either work through native Next.js contracts or explicitly block production classification
- lint runs with `--max-warnings 0`
- typecheck passes
- build passes
- unit/integration tests cover critical routes and flows
- smoke checks cover `/`, key lead-gen routes, key commerce routes, and not-found behavior
- desktop and mobile visual parity evidence exists
- accessibility and media reliability checks pass
- VS Code Problems count is zero
- delivery classification follows QG11 exactly

## Failure Modes
- `REPLI_NATIVE_BASELINE_MISSING`
- `REPLI_NATIVE_ROUTE_AUDIT_FAILED`
- `REPLI_NATIVE_TEMPLATE_CONTRACT_MISSING`
- `REPLI_NATIVE_SHARED_SHELL_NOT_EXTRACTED`
- `REPLI_NATIVE_GENERATED_DUMP_RETAINED`
- `REPLI_NATIVE_LEGACY_RUNTIME_RETAINED`
- `REPLI_NATIVE_FAKE_FLOW_RETAINED`
- `REPLI_NATIVE_COMMERCE_CONTRACT_MISSING`
- `REPLI_NATIVE_LEADGEN_CONTRACT_MISSING`
- `REPLI_NATIVE_SEO_CONTRACT_MISSING`
- `REPLI_NATIVE_TEST_COVERAGE_MISSING`
- `REPLI_NATIVE_VISUAL_PARITY_FAILED`
- `REPLI_NATIVE_VALIDATION_FAILED`
- `REPLI_NATIVE_MISSING_KNOWLEDGE`