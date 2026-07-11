# Repli-to-Next.js Phase 1.4 Page Composer And QA Spec

## Purpose
Define the execution contract for Phase 1.4 of the Repli-to-Next.js lane: compose every public-facing Next.js App Router page from the Phase 1.3 section library and the Phase 1.1 page inventory, wire the global header/footer/mobile-nav, capture parity screenshots, and verify pixel parity at `<=0.05` (5%) per route per viewport against the original source screenshots.

This spec is generic. It applies to any Phase 1.1 + 1.2 + 1.3 output.

## Scope
In scope:
- Public-facing page composition from typed data modules + section components.
- Root layout wiring (Header, Footer, MobileNav) from global typed data.
- `not-found.tsx`.
- Real image asset placement under `public/images/`.
- Playwright + pixelmatch QA harness with `PARITY_THRESHOLD=0.05`.
- Per-route parity capture at desktop (1440x900) and mobile (iPhone-12 class).
- Full validation loop (lint, typecheck, build, dev smoke, route smoke, parity, console-error, broken-image/link, VS Code Problems = 0).

Out of scope:
- UI primitives (Phase 1.2) and section components (Phase 1.3).
- Lighthouse, axe-core, structured data, rich SEO, canonical URLs, OG/Twitter, JSON-LD (Phase 1.5).
- Backend handoff contract (Phase 1.5).
- Backend code, providers, analytics, payment (Phase 4 / Phase 5).
- Deployment (Phase 7).

## Parity Threshold
- Phase 1.4 parity floor: `<=0.05` (5%) per route per viewport. **This threshold is non-negotiable**; loosening it to make routes pass is forbidden. Route fixes are the lever.
- Phase 1.5 parity floor: `<=0.01` (1%). Phase 1.5's 1% gate requires a live source URL or HTML reference. Without source, Phase 1.4's 5% is the final visual gate.

## Required Input
- `project_root`: Phase 1.3 output with `DOC/design-read/`, `DOC/migration/phase1.2/summary.md` declaring `kit_complete`, `DOC/migration/phase1.3/summary.md` declaring `sections_complete`.

Optional input:
- `screenshots_root`: parity baseline override. Defaults to the value recorded in `DOC/design-read/summary.md`.

## Required Artifacts
Under `project_root/DOC/migration/phase1.4/`:
- `page-plan.md`
- `screenshots/` (per-route per-viewport PNGs)
- `validation-report.md`
- `exception-register.md` (may be empty)
- `summary.md`

Under `project_root/`:
- `src/app/**/page.tsx` for every canonical route.
- `src/data/pages/*.ts` typed page data modules.
- `src/data/global/*.ts` typed global data modules.
- `public/images/**` real asset files.
- `scripts/qa-r2n-parity.mjs` QA harness.
- `app/layout.tsx` wired to global Header/Footer/MobileNav.
- `app/not-found.tsx`.

## Non-Negotiable Gates
Phase 1.4 must not return `pages_ready_for_hardening` while any of the following are true:
- Phase 1.3 has not declared `sections_complete`.
- Any page in `page-inventory.json` is missing.
- Page-level copy is inline instead of typed data modules.
- Sections used on a page are not from `src/components/sections/`.
- Root layout does not wire Header/Footer/MobileNav from global typed data.
- `not-found.tsx` is missing.
- `app/_dev/` routes are linked from public navigation or sitemap.
- Parity has not been captured for every canonical route at desktop and mobile.
- Any canonical route exceeds `0.05` pixel diff without an exception entry.
- `PARITY_THRESHOLD` is set looser than `0.05`.
- Lint, typecheck, build, dev smoke, route smoke fails.
- VS Code Problems > 0 on touched files.

## Forbidden Patterns
- Loosening `PARITY_THRESHOLD` above `0.05`.
- Tightening to `<=0.01` in this lane (Phase 1.5 contract).
- Synthetic mock previews to fill image areas.
- Inline marketing copy in page files.
- Lighthouse / axe-core / structured-data audits here.
- Real form submit handlers, providers, analytics, payment.
- Modifying primitives or sections in this lane.
- Skipping parity for any canonical route.

## Required Workflow
1. Intake and precondition checks.
2. Page composition plan (batches of <=8).
3. Typed page + global data.
4. Root layout wiring.
5. Page composition, batched.
6. Asset acquisition.
7. QA harness setup.
8. Parity run, batched.
9. Full validation loop.
10. Pages summary.

## Validation Commands
1. `npm run lint -- --max-warnings=0`
2. `npm run typecheck` (or `tsc --noEmit`)
3. `npm run build`
4. `npm run dev` smoke (start, hit every canonical route, stop)
5. `npm run qa:r2n-parity` at desktop + mobile for every canonical route
6. Console error scan on every canonical route
7. Broken-image + broken-link scan on every canonical route
8. VS Code Problems = 0

## Delivery Classification
- `pages_ready_for_hardening` only when every gate passes, every artifact is present, and every canonical route passes parity at `<=0.05` (or has a registered exception with cause + evidence).
- `composition_in_progress` otherwise, with `remaining_gaps` and next batch enumerated.
- `blocked_external_dependency` when a font, image license, or vendor JS the user must approve blocks a route.

## Failure Codes
- `R2N_P14_PRECONDITION_MISSING`
- `R2N_P14_PAGE_MISSING`
- `R2N_P14_INLINE_COPY_DETECTED`
- `R2N_P14_LAYOUT_NOT_WIRED`
- `R2N_P14_DEV_ROUTE_LEAK`
- `R2N_P14_PARITY_GAP`
- `R2N_P14_THRESHOLD_TAMPERED`
- `R2N_P14_VALIDATION_FAILED`

## Parity Gate Matrix
| Route | Viewport | Required Diff | Captured | Pass/Fail | Exception |
|-------|----------|---------------|----------|-----------|-----------|
| (one row per canonical route x viewport) | | `<=0.05` | yes/no | pass/fail | yes/no (with cause + evidence path if yes) |

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- Pages and parity validated in batches of <=8.
- `PARITY_THRESHOLD=0.05` is the hard-pinned environment variable for `qa-r2n-parity.mjs`. The script must default to `0.05` and refuse to run with a looser threshold.
- This lane never edits primitives or sections; defects there go back to Phase 1.2 / Phase 1.3.

## Handoff
- `pages_ready_for_hardening` -> `phase1.5-frontend-production-hardening.agent.md`. Note whether live source URL/HTML will be provided for the 1.5 `<=0.01` gate.
- `composition_in_progress` -> stay in 1.4, finish next batch, rerun, reclassify.
- `R2N_P14_PRECONDITION_MISSING` -> return to failing precondition lane.
- `R2N_P14_PARITY_GAP` -> fix page composition structurally; thresholds remain pinned.
