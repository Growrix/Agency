# Rebrand Phase 2.1 Planner Spec

## Purpose
Define the execution contract for Phase 2.1 of the Rebrand & Industry-Switch lane: read a built Next.js site (post Phase 1.4 or Phase 1.5) and emit a complete, deterministic rebrand plan under `DOC/rebrand/` covering brand bible, industry translation map, content inventory with per-slot char budgets, downloadable image swap plan, SEO plan, and surface-leakage scan. Plan-only.

This spec is generic. It applies to any Next.js site whose copy lives in typed data modules under `src/data/`.

## Scope
In scope:
- Plan authoring under `DOC/rebrand/` only.
- Source brand and source industry detection from data modules + JSON-LD + meta.
- Per-slot char budgets derived from current content length.
- Downloadable image plan with industry-keyword search queries and source-priority ladder.
- SEO and JSON-LD rewrite plan.
- Surface-leakage scan across components, metadata, legal pages, image filenames, alt text, comments.

Out of scope:
- Any write to `src/`, `public/`, `package.json`, `README.md`, brand-asset files, JSON-LD blocks (Phase 2.2 owns these).
- Image downloads (Phase 2.2 owns these).
- Validation gates (build/lint/typecheck/parity — Phase 2.2 owns these).
- Component / layout / token / motion changes (forbidden in this lane and in Phase 2.2).
- Legal-text rewrites (brand-name substitution only — Phase 2.2 enforces).

## Required Input
- `project_root`: Next.js site with typed data modules and a Phase 1.4 or Phase 1.5 summary.
- `target_brand`: new brand name (required).
- `target_industry`: target industry description (required).

Optional input:
- `tone_keywords`, `locale`, `geo_anchor`, `source_images_root`.

## Required Artifacts
Under `project_root/DOC/rebrand/`:
- `brand-bible.md`
- `industry-translation-map.json`
- `content-inventory.json`
- `image-swap-plan.json`
- `seo-plan.json`
- `surface-scan.md`
- `summary.md`

## Non-Negotiable Gates
Phase 2.1 must not return `rebrand_plan_complete` while:
- pre-run gate fails (no Phase 1.4 / 1.5 summary, no typed data),
- any required artifact is missing,
- per-slot char budgets are missing from `content-inventory.json`,
- `image-swap-plan.json` rows do not all resolve to a local file path target with download source priority,
- `seo-plan.json` does not cover every public route + every JSON-LD block,
- `surface-scan.md` does not cover components, metadata, legal pages, image filenames, alt text.

## Forbidden Patterns
- Editing outside `DOC/rebrand/`.
- Downloading any image in this lane.
- Embedding rewritten copy into data modules in this lane.
- Proposing brand color/font swaps when user did not explicitly request them.
- Proposing legal-text rewrites beyond brand-name substitution.
- Proposing CDN/hotlink image URLs — every image plan row must resolve to a local public path.

## Required Workflow
1. Intake + precondition + source-brand/industry detection.
2. Brand bible authoring.
3. Industry translation map.
4. Content inventory + per-slot char budgets.
5. Image swap plan with downloadable industry-keyword queries.
6. SEO + JSON-LD plan.
7. Surface leakage scan.
8. Plan summary.

## Delivery Classification
- `rebrand_plan_complete` only when every gate passes and every artifact is present.
- `rebrand_plan_in_progress` otherwise.
- `blocked_external_dependency` when user-supplied images, API keys, or geo_anchor are required and not yet provided.

## Failure Codes
- `REB_P21_PRECONDITION_MISSING`
- `REB_P21_BRAND_BIBLE_INCOMPLETE`
- `REB_P21_TRANSLATION_MAP_INCOMPLETE`
- `REB_P21_CONTENT_INVENTORY_INCOMPLETE`
- `REB_P21_BUDGETS_MISSING`
- `REB_P21_IMAGE_PLAN_INCOMPLETE`
- `REB_P21_SEO_PLAN_INCOMPLETE`
- `REB_P21_SURFACE_SCAN_INCOMPLETE`
- `REB_P21_API_CREDENTIALS_REQUIRED`

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- Writes occur only under `DOC/rebrand/`.
- Plan is the contract; Executor cannot improvise outside what is recorded here.
- Char budgets enforce layout safety; rewrites cannot lengthen content past them.
- Image plan is download-only; CDN/hotlink references are forbidden in the final site.

## Handoff
- `rebrand_plan_complete` -> `rebrand-phase2.2-executor.agent.md`.
- `rebrand_plan_in_progress` -> stay, finish artifacts, reclassify.
- `REB_P21_PRECONDITION_MISSING` -> return to Phase 1.4 or 1.5.
- `REB_P21_API_CREDENTIALS_REQUIRED` -> Bangla acquisition request to user, then resume.
