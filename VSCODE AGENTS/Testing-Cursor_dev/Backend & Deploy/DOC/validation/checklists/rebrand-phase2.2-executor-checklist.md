# Rebrand Phase 2.2 Executor Readiness Checklist

Human-verifiable readiness gate for Phase 2.2. The agent must pass every applicable item before classifying delivery as `rebrand_complete`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/rebrand-phase2.2-executor.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/rebrand-phase2.2-executor.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/rebrand-phase2.2-executor.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/rebrand-phase2.2-executor-spec.md`.
- [ ] Both READMEs reference Phase 2.2.

## Intake / Preconditions
- [ ] Phase 2.1 declares `rebrand_plan_complete`.
- [ ] All 7 `DOC/rebrand/` plan artifacts present.
- [ ] `PEXELS_API_KEY` present if any `pexels_api` row planned.
- [ ] `PIXABAY_API_KEY` present if any `pixabay_api` row planned.
- [ ] If keys missing, Bangla acquisition request surfaced.

## Image Download
- [ ] Every row in `image-swap-plan.json` resolved through the source-priority ladder.
- [ ] Every resolved image downloaded into `public/images/...` at the planned local path.
- [ ] No external CDN URL retained in any data module, component reference, metadata, manifest, or JSON-LD.
- [ ] Every downloaded/sourced image recorded in `DOC/rebrand/image-attribution.md` with `target_file | source | source_url | photographer | license | search_query_used | dimensions`.
- [ ] No image whose license requires attribution overlaid on the image is used.
- [ ] Every image file is a valid PNG/JPG/WEBP/SVG; non-SVG files > 5KB.
- [ ] Solid-color SVG placeholder rows registered in `exception-register.md` with manual follow-up note.

## Brand Marks
- [ ] `public/logo*` swapped (or user explicitly opted out, recorded).
- [ ] `public/favicon*` swapped at every size variant present.
- [ ] `public/og*` and `public/twitter*` share images swapped.
- [ ] `manifest.json` `name`, `short_name`, `description` updated. `theme_color` preserved unless overridden.
- [ ] `package.json` `name` (kebab-case of brand) + `description` updated. `version` NOT bumped.
- [ ] `README.md` first heading + first description line updated.

## Text Rewrite
- [ ] Every text field in `content-inventory.json` rewritten (or explicitly marked `preserve`).
- [ ] Every strict-slot field <= its `char_budget`.
- [ ] Every relaxed-slot field <= 1.2 * current_length.
- [ ] Every data file keeps original keys, types, shape, key order — only string values changed.

## SEO + JSON-LD
- [ ] Every `metadata` export updated per `seo-plan.json` per route. Title <=60 chars. Description <=160 chars.
- [ ] Global JSON-LD blocks (organization / LocalBusiness / Service) updated with new brand + industry fields.
- [ ] `app/robots.ts`, `app/sitemap.ts` site-name references updated.

## Legal Substitution
- [ ] Every occurrence of source brand name in `src/app/legal/**` replaced with target brand name.
- [ ] No legal-text rewrites beyond brand-name substitution.

## Surface Leakage
- [ ] Surface-scan re-run across rebranded repo.
- [ ] All data/metadata residual hits fixed in place.
- [ ] Any component-resident leaks registered in `exception-register.md` with cause + upstream repair route (Phase 1.2 / 1.3). Component code NOT edited here.

## Validation Loop
- [ ] `npm run lint -- --max-warnings=0` passes.
- [ ] `npm run typecheck` (or `tsc --noEmit`) passes.
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts and every canonical route responds 200.
- [ ] No console errors on any canonical route.
- [ ] No broken images, no broken links.
- [ ] Source brand name + top-5 source-industry keyword grep across `src/` + `public/` + `package.json` + `manifest.json` + `README.md` returns zero hits (outside `DOC/rebrand/`).
- [ ] Image-source scan: zero external CDN URLs anywhere in `src/`, components, metadata.
- [ ] VS Code Problems = 0 on touched files.
- [ ] `DOC/rebrand/validation-report.md` saved with per-step pass/fail.

## Forbidden-Surface Audit
- [ ] No write to `src/components/**`.
- [ ] No structural change to `app/layout.tsx` (only brand-mark + JSON-LD field updates allowed).
- [ ] No write to `tailwind.config*`, design tokens, font config, motion config.
- [ ] No write to `src/data/global/<theme|tokens>.ts` (if present).
- [ ] `page.tsx` files: only `metadata` export updated; composition byte-identical.

## Summary
- [ ] `DOC/rebrand/execution-summary.md` saved with counts, attribution sources distribution, exception entries, validation outcomes, delivery class, next step.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `rebrand_complete` only when every gate above passes and zero residual leakage outside `DOC/`.

## Handoff
- [ ] On `rebrand_complete`, the site is ready for Phase 4 / 5 backend or Phase 7 deployment via existing lanes.
- [ ] On `REB_P22_FORBIDDEN_EDIT`, defect registered and routed back to Phase 1.2 / 1.3 / 1.5.
- [ ] On `REB_P22_API_CREDENTIALS_REQUIRED`, Bangla acquisition request surfaced and execution paused.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] Writes batched <=8 files per work unit with validation between batches.
- [ ] All validation gates run as single CLI commands.
- [ ] Image paths preserved (overwrite at same `public/images/...` path) so component references stay stable.
