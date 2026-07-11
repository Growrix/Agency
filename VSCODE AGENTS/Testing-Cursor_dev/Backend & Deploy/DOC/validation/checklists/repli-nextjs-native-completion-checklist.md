# REPLI Next.js Native Completion Checklist

## System Surface
- [ ] The public wrapper exists under `.github/agents/phase2.6-nextjs-native-completion.agent.md`.
- [ ] Canonical copies exist under `Backend & Deploy/.github/agents/` and `Backend & Deploy/DOC/agents/`.
- [ ] The public and canonical copies describe Phase 2.6 as production Next.js template completion, not shallow HTML-to-JSX conversion.
- [ ] Candidate track README entries describe the new handoff and production-template intent.
- [ ] The spec defines inputs, outputs, matrices, module contracts, validation, delivery classes, and failure modes.

## Baseline And Audits
- [ ] The approved visual baseline is recorded before editing.
- [ ] The agent explicitly asks for human clarification or approval when baseline, route, module, integration, or production-boundary decisions are unclear.
- [ ] Full public route inventory exists.
- [ ] Full navigation inventory exists.
- [ ] `route_ownership_matrix` exists and classifies every primary route.
- [ ] `template_capability_matrix` exists and covers `shell`, `lead_gen`, `commerce`, `inventory_listing`, `content_blog`, `seo`, `legal`, and `media`.
- [ ] `legacy_retirement_matrix` exists and names every retained script, loader, compatibility renderer, and DOM mutation layer.
- [ ] `parity_risk_matrix` exists for desktop, mobile, motion, and behavior risks.

## Ownership Gates
- [ ] Shared shell is extracted into reusable Next.js components.
- [ ] Repeated sections are centralized into reusable components and typed data.
- [ ] Completed primary routes are App Router owned.
- [ ] Completed primary routes do not depend on public HTML files, `.html` filename routing, `src/legacy/**`, catch-all legacy renderers, or `dangerouslySetInnerHTML`.
- [ ] Generated JSX page dumps are not the final architecture for completed primary routes.
- [ ] Legacy `.html` routes, if retained, are redirects or compatibility aliases only.

## Flow Gates
- [ ] Contact, booking, quote, newsletter, career/apply, listing inquiry, and comments are implemented as native Next.js flows when visible or implied.
- [ ] Product catalog, product detail, search/filter/sort, cart, wishlist, checkout entry, and confirmation states are native Next.js flows when commerce is visible or required.
- [ ] Inventory/listing catalog, detail, filters, inquiry/test-drive CTA, and related listing behavior are native Next.js flows when visible.
- [ ] Every visible form/action has validation, disabled/submitting, success, error, not-configured, and accessibility states.
- [ ] Fake local success, missing PHP endpoints, localStorage-only commerce, and query-parameter DOM mutation are not described as production-ready.
- [ ] Unknown email, payment, CMS, database, analytics, auth, webhook, or account dependencies are classified as `missing_knowledge` or `blocked` instead of guessed.

## SEO And Template Gates
- [ ] Metadata exists for primary routes.
- [ ] Canonical URLs are defined.
- [ ] Robots and sitemap are implemented.
- [ ] Favicon/app icons exist.
- [ ] Open Graph/Twitter metadata exists.
- [ ] Not-found behavior exists.
- [ ] Template data is reusable and not hardcoded as one client-only demo when a reusable template is required.

## Validation Gates
- [ ] ESLint runs with `--max-warnings 0`.
- [ ] Typecheck passes.
- [ ] Build passes.
- [ ] Unit/integration tests cover critical lead-gen, commerce, listing, content, and route behavior.
- [ ] Smoke checks cover `/`, key lead-gen routes, key commerce routes, and 404 behavior.
- [ ] Desktop and mobile visual parity evidence exists.
- [ ] Accessibility checks pass for key flows.
- [ ] Media reliability checks pass.
- [ ] VS Code Problems count is zero.

## Delivery Classification
- [ ] `delivery_class=production_candidate` is used only when all applicable gates pass.
- [ ] `delivery_class=baseline_prototype` is used when the site builds and looks right but ownership, flows, tests, SEO, or integration contracts remain incomplete.
- [ ] `delivery_class=blocked` is used when required knowledge, integrations, credentials, external assets, or parity evidence are missing.
- [ ] Remaining `legacy_html_backed`, `generated_dump`, `mixed`, `missing_knowledge`, or `blocked` items are documented explicitly.