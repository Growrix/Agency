# REPLI Frontend Production Hardening Spec (Phase 1.5)

## Purpose
Define the execution contract for Phase 1.5: the production hardening and backend handoff lane that runs on top of any Phase 1.4-compliant pure native Next.js App Router frontend. This is the lane that closes the remaining production gap left by Phase 1.4 so the output is safe to:
- hand off to backend / Foundation Core work (Phase 4) without limiting scaling,
- deliver to a paying client,
- and (optionally) publish as a marketplace template.

This spec is generic. It applies to any 1.4 output, not a single project.

## Scope
In scope:
- Visual parity tightening to a strict numeric threshold (<=1% pixel diff).
- Performance and Core Web Vitals hardening.
- SEO surface and structured data lock.
- Accessibility (axe-core) hardening.
- Maintainability and theming centralization.
- Scalability boundaries (per-route rendering strategy, data-source layer).
- Typed backend handoff contract.
- Optional marketplace template packaging.
- Full validation loop.

Out of scope:
- Backend implementation, providers, payment, CMS integration, real API routes.
- Phase 1.4 ownership decisions (native components, HTML purge, route handlers).
- DNS, hosting, deployment automation.
- Reopening Phase 1.1 visual decisions; parity is measured against the 1.4 input baseline.

## Required Input
- `frontend_root`: a Phase 1.4 output (or equivalent native Next.js App Router project).

Optional input:
- `source_reference_root`: HTML/static reference folder for parity tightening passes.
- `template_packaging`: `true` to enable marketplace template packaging.

## Required Matrices
Each matrix is saved as a markdown or JSON file under `DOC/migration/phase1.5/` inside `frontend_root`.

1. `parity-report.md` — per route, per viewport: pixel diff %, pass/fail, screenshot path, fix notes.
2. `lighthouse/` — Lighthouse reports per viewport for representative routes (`/`, plus 3 representative routes).
3. `seo-report.md` — per route: title, description, canonical, OG, Twitter, structured data type(s).
4. `a11y-report.md` — per route: axe-core summary, critical/serious counts, remediation notes.
5. `maintainability-report.md` — data layer inventory, design token inventory, env inventory.
6. `scalability-report.md` — per route: rendering strategy + data source + future swap path.
7. `validation-report.md` — full gate run log with command, exit code, summary.
8. `exception-register.md` — any accepted deviation, with cause, scope, and reviewer.

Handoff artifacts saved under `DOC/handoff/` inside `frontend_root`:
9. `backend-contract.md` — typed payload contracts for every interactive surface.
10. `customization-guide.md` — only when `template_packaging=true`.

Marketing artifacts (when `template_packaging=true`) under `DOC/marketing/`.

## Non-Negotiable Gates
Phase 1.5 must not return `delivery_class=production_handoff_ready` while any of the following are true:
- Visual parity threshold is looser than `0.01` (1%) per route at desktop or mobile.
- Any canonical route fails the parity threshold without a registered exception in `exception-register.md`.
- Lighthouse mobile scores are below declared thresholds. Defaults: performance 90, accessibility 100, best-practices 95, SEO 100. Threshold overrides require an exception entry.
- axe-core reports `critical` or `serious` violations on any canonical route.
- Per-route metadata (`title`, `description`, `canonical`, `openGraph`, `twitter`) is missing or wrong for any canonical route.
- JSON-LD structured data appropriate for the page type is missing on any canonical route where applicable (`Organization`, `LocalBusiness`, `BreadcrumbList`, `Service`, `Product`, `Article`, `FAQPage`, `ContactPage`).
- `robots.txt`/`robots.ts`, `sitemap.xml`/`sitemap.ts`, `not-found.tsx`, and `.html` legacy redirects are missing or incorrect.
- Inline marketing content (paragraphs, lists, repeated card arrays) dominates components instead of typed `src/data/` modules.
- Design tokens are not centralized; arbitrary hex/rgb literals are scattered across components without an exception entry.
- `.env.example` is missing keys actually referenced in code, contains real secret values, or is out of sync with `process.env` usage.
- The backend handoff contract (`DOC/handoff/backend-contract.md`) is missing or has untyped slots.
- Console errors, broken images, broken links, or failing redirect aliases exist on any canonical route.
- Any of these gates were skipped without a proven blocker: lint, typecheck, build, dev startup, route smoke, redirect smoke, parity, axe, Lighthouse, console-error, broken-link, VS Code Problems = 0.
- When `template_packaging=true`: README customization guide, brand-swap doc, demo data file, license, or marketing screenshots are missing.

## Forbidden Patterns
- Loosening the parity threshold to make routes pass.
- Skipping a gate because a dev dependency is not installed.
- Re-implementing legacy vendor animations in React motion libraries when the explicit goal is exact parity. Vendor JS (Swiper, AOS, custom theme JS) is allowed to remain when it preserves identical animation.
- Reopening Phase 1.4 ownership decisions inside 1.5. Defects there must be returned to Phase 1.4 with `REPLI_P15_P14_DEFECT_DETECTED`.
- Adding backend code, real API routes, third-party provider credentials, or deployment automation.
- Declaring `production_handoff_ready` without each required evidence file present.

## Required Workflow
1. Intake and path safety.
2. Visual parity tightening to <=1%.
3. Performance hardening (images, fonts, scripts, bundles).
4. SEO + structured data lock.
5. Accessibility hardening.
6. Maintainability and theming centralization.
7. Scalability boundaries.
8. Backend handoff contract authoring.
9. Template packaging (when enabled).
10. Full validation loop.
11. Delivery classification.
12. Handoff.

Sections run sequentially. The gate at the end of each section must pass before moving on, except when an exception is registered.

## Validation Commands
The validation loop must run in this order. The agent must run each, capture output, and stop-and-fix on the first failure before resuming.
1. `npm run lint -- --max-warnings=0`
2. `npm run typecheck` (or `tsc --noEmit`)
3. `npm run build`
4. `npm run dev` smoke (start, request `/`, stop)
5. Route smoke for every canonical route
6. Redirect smoke for every `.html` alias
7. Playwright visual parity (<=1%) at desktop and mobile
8. axe-core scan per canonical route
9. Lighthouse mobile + desktop on representative routes
10. Console error scan
11. Broken-image + broken-link scan
12. VS Code Problems = 0 (manual check or extension API)

## Delivery Classification
- `production_handoff_ready` only when every gate passes and every required evidence file is present.
- `hardening_in_progress` otherwise, with `remaining_gaps` enumerated.
- `blocked_external_dependency` when a gate cannot pass without a user-supplied external item (rare for 1.5; usually only fonts behind license or licensed marketplace screenshots).

## Failure Codes
- `REPLI_P15_PARITY_GAP`
- `REPLI_P15_PERF_GAP`
- `REPLI_P15_SEO_GAP`
- `REPLI_P15_A11Y_GAP`
- `REPLI_P15_MAINTAINABILITY_GAP`
- `REPLI_P15_SCALABILITY_GAP`
- `REPLI_P15_HANDOFF_CONTRACT_MISSING`
- `REPLI_P15_TEMPLATE_PACKAGING_MISSING`
- `REPLI_P15_VALIDATION_FAILED`
- `REPLI_P15_P14_DEFECT_DETECTED`

## Invariants
- Tool surface is restricted to `read`, `search`, `edit`, `execute`, `todo`. The agent runs in VS Code with GitHub Copilot; no MCP-only or sub-agent fan-out assumptions are allowed.
- Each gate is a single CLI command runnable from the VS Code terminal.
- Missing dev dependencies (Playwright, axe-core, Lighthouse, pixelmatch, pngjs) are installed locally; gates are not skipped.
- Output evidence is deterministic, human-inspectable, and stored under `DOC/migration/phase1.5/` and `DOC/handoff/`.
- Phase 1.5 never edits Phase 1.4 evidence; it produces its own evidence bundle.
- On `REPLI_P15_P14_DEFECT_DETECTED`, the affected route is returned to Phase 1.4 with the failing evidence and is excluded from Phase 1.5 delivery classification until 1.4 reissues it.

## Handoff
- `production_handoff_ready` -> Phase 4 (`phase4-foundation-planning.agent.md`) for backend planning against `backend-contract.md`, OR Phase 5 (`phase5-template-import-attach.agent.md`) for foundation attach, OR Phase 7 (`phase7-template-deployment.agent.md`) for client/marketplace deployment.
- `hardening_in_progress` -> stay in 1.5, fix the next failing gate, rerun, reclassify.
- `REPLI_P15_P14_DEFECT_DETECTED` -> return the affected route to Phase 1.4.
