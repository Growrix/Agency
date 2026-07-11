# Rebrand Phase 2.2 Executor Spec

## Purpose
Define the execution contract for Phase 2.2 of the Rebrand & Industry-Switch lane: apply the Phase 2.1 plan to a built Next.js site by rewriting typed text under per-slot char budgets, downloading industry-matched images into `public/images/` (never hotlinking), swapping brand marks, updating SEO/JSON-LD, brand-substituting legal pages, and proving the result with the full validation loop. The lane never edits components, routing, layout structure, tokens, fonts, or motion.

This spec is generic. It applies to any Phase 2.1 plan emitted under `DOC/rebrand/`.

## Scope
In scope:
- Text rewrites under per-slot char budgets in `src/data/pages/**` and `src/data/global/**`.
- Image downloads via Pexels API + Pixabay API + user-supplied folder + workspace stock + SVG placeholder fallback.
- Brand-mark swap (logo, favicon, OG, Twitter share).
- `manifest.json`, `package.json` (`name`, `description`), `README.md` brand-line updates.
- `app/robots.ts`, `app/sitemap.ts` site-name updates.
- `app/layout.tsx` JSON-LD organization / LocalBusiness / Service field updates.
- `src/app/**/page.tsx` `metadata` export updates (data only, never restructuring composition).
- `src/app/legal/**` brand-name substitution only.
- Full validation loop including source-brand + source-industry residual grep and zero-CDN image-source scan.

Out of scope:
- Component edits, routing, layout structure, tokens, fonts, motion (all forbidden).
- Legal-text rewrites beyond brand-name substitution.
- `package.json` `version` bumps.
- Component-resident leaks (registered for upstream repair, never patched here).
- Hotlinking images from any external host in the final site.

## Required Input
- `project_root`: site folder with Phase 2.1 declaring `rebrand_plan_complete`.

Environment input:
- `PEXELS_API_KEY` (required if any `pexels_api` row).
- `PIXABAY_API_KEY` (required if any `pixabay_api` row).

## Required Artifacts
Under `project_root/DOC/rebrand/`:
- `execution-log.md`
- `image-attribution.md`
- `exception-register.md` (may be empty)
- `validation-report.md`
- `execution-summary.md`

## Non-Negotiable Gates
Phase 2.2 must not return `rebrand_complete` while:
- Phase 2.1 has not declared `rebrand_plan_complete`,
- any inventoried text field is unchanged from the source brand/industry,
- any strict-slot rewrite exceeds its `char_budget`,
- any relaxed-slot rewrite exceeds +20% over current length,
- any planned image is unswapped or still reflects the source industry,
- any image in the final site resolves to an external CDN/hotlink,
- any downloaded image lacks attribution in `image-attribution.md`,
- any downloaded image's license requires attribution overlaid on the image,
- brand marks (logo / favicon / OG / Twitter share) not swapped (unless user explicitly opted out),
- `package.json` / `manifest.json` / `README.md` still reference source brand,
- JSON-LD organization/LocalBusiness/Service still reference source brand or industry,
- source brand name or top-5 source-industry keywords still appear outside `DOC/rebrand/` and `node_modules/` and `.next/`,
- lint / typecheck / build / dev smoke / route smoke / console error / broken image fails,
- VS Code Problems > 0,
- any forbidden surface was edited.

## Forbidden Patterns
- Editing components, page composition, route definitions, layout structure, tokens, fonts, motion.
- Editing `tailwind.config*`.
- Hotlinking images from Unsplash / Pexels CDN / Pixabay CDN / any external host in the final site.
- Downloading images whose license requires attribution overlaid on the image.
- Rewriting legal-page text beyond brand-name substitution.
- Bumping `package.json` `version`.
- Lengthening strict-slot fields beyond `char_budget`.
- Loosening the brand-bible voice mid-pass.

## Required Workflow
1. Intake + plan load + API-key check.
2. Image download pass (batched, source-priority ladder).
3. Brand-mark pass (logo / favicon / OG / Twitter / manifest / package / README).
4. Text rewrite pass (batched, per-slot budget enforcement).
5. SEO + JSON-LD pass (metadata exports + JSON-LD blocks).
6. Legal brand substitution pass.
7. Surface leakage sweep + component-leak return tickets.
8. Full validation loop.
9. Execution summary.

## Validation Commands
1. `npm run lint -- --max-warnings=0`
2. `npm run typecheck` (or `tsc --noEmit`)
3. `npm run build`
4. `npm run dev` smoke
5. Console error scan on every canonical route
6. Broken-image + broken-link scan
7. Source-brand + source-industry grep across `src/` + `public/` + repo metadata returns zero hits
8. Image-source scan: zero external CDN URLs in data + components + metadata
9. VS Code Problems = 0

## Delivery Classification
- `rebrand_complete` only when every gate passes, every artifact is present, image attribution is full, and surface leakage is zero (outside `DOC/`).
- `rebrand_in_progress` otherwise.
- `blocked_external_dependency` when API keys or user-supplied images required and not provided.

## Failure Codes
- `REB_P22_PRECONDITION_MISSING`
- `REB_P22_API_CREDENTIALS_REQUIRED`
- `REB_P22_IMAGE_DOWNLOAD_FAILED`
- `REB_P22_IMAGE_LICENSE_INCOMPATIBLE`
- `REB_P22_BUDGET_EXCEEDED`
- `REB_P22_FORBIDDEN_EDIT`
- `REB_P22_LEAKAGE_RESIDUAL`
- `REB_P22_EXTERNAL_CDN_DETECTED`
- `REB_P22_JSONLD_UNUPDATED`
- `REB_P22_VALIDATION_FAILED`

## Image Download Ladder
1. `user_supplied` (from `source_images_root`)
2. `pexels_api` (download original via Pexels-provided URL)
3. `pixabay_api` (download original via Pixabay-provided URL)
4. `workspace_stock` (existing free-stock in workspace)
5. `solid_color_svg_placeholder` (brand-color-derived, registered in exception-register.md)

License rule: every image must be royalty-free downloadable with no attribution overlaid on the image. Attribution recorded in `DOC/rebrand/image-attribution.md` regardless of whether the license requires it (good practice).

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- Batched writes (<=8 files per batch) with validation between batches.
- Image paths preserved (overwrite at the same `public/images/...` path) so component references stay stable.
- Components and tokens remain byte-identical to pre-rebrand state.
- Final site contains zero external CDN image URLs.

## Handoff
- `rebrand_complete` -> site is ready for the existing backend (Phase 4/5) or deployment (Phase 7) lanes.
- `rebrand_in_progress` -> stay, next batch, rerun, reclassify.
- `REB_P22_FORBIDDEN_EDIT` -> register defect, route back to Phase 1.2 / 1.3 / 1.5.
- `REB_P22_API_CREDENTIALS_REQUIRED` -> Bangla acquisition request, resume.
- `REB_P22_LEAKAGE_RESIDUAL` -> fix data/metadata in place, register component-resident leaks for upstream repair.
