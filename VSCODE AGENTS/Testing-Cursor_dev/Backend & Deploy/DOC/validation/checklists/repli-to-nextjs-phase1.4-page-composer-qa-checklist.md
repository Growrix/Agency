# Repli-to-Next.js Phase 1.4 Page Composer And QA Readiness Checklist

This checklist is the human-verifiable readiness gate for Phase 1.4 of the Repli-to-Next.js lane. The agent must pass every applicable item before classifying delivery as `pages_ready_for_hardening`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/repli-to-nextjs-phase1.4-page-composer-qa.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/repli-to-nextjs-phase1.4-page-composer-qa.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/repli-to-nextjs-phase1.4-page-composer-qa.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/repli-to-nextjs-phase1.4-page-composer-qa-spec.md`.
- [ ] Both READMEs reference Phase 1.4.

## Intake / Preconditions
- [ ] `project_root` resolves and contains `DOC/design-read/` with all 7 artifacts.
- [ ] `DOC/migration/phase1.2/summary.md` declares `kit_complete`.
- [ ] `DOC/migration/phase1.3/summary.md` declares `sections_complete`.
- [ ] `screenshots_root` resolved (override or default).

## Page Plan
- [ ] `DOC/migration/phase1.4/page-plan.md` saved with batches of <=8 pages.

## Typed Data
- [ ] Every page has a typed data module under `src/data/pages/<slug>.ts`.
- [ ] Global data (nav, footer, brand, social, contact) lives under `src/data/global/`.
- [ ] No page or section embeds marketing copy inline.

## Root Layout
- [ ] `app/layout.tsx` renders global Header, Footer, MobileNav from typed data.
- [ ] Header and Footer use Phase 1.3 section components (not duplicated logic).
- [ ] `<html lang>` set; single `<h1>` per route.

## Pages
- [ ] Every canonical route in `page-inventory.json` has a corresponding `src/app/<route>/page.tsx`.
- [ ] Dynamic routes use `generateStaticParams` with known slugs.
- [ ] Each page composes only sections from `src/components/sections/`.
- [ ] Each page sets minimal `metadata` (`title`, `description`). Rich SEO deferred to Phase 1.5.
- [ ] `app/not-found.tsx` exists and returns 404.

## Assets
- [ ] Every image area has a real file under `public/images/<slug>/<asset>.<ext>`.
- [ ] No synthetic mock-preview UI used to fill image areas.

## QA Harness
- [ ] `playwright`, `pixelmatch`, `pngjs` installed as devDependencies.
- [ ] `scripts/qa-r2n-parity.mjs` exists.
- [ ] Script captures full-page PNG per route at desktop (1440x900) and mobile (iPhone-12 class).
- [ ] Script reads `PARITY_THRESHOLD` (default `0.05`); refuses to run looser.
- [ ] `npm run qa:r2n-parity` script registered.

## Parity Run
- [ ] Parity captured for every canonical route at desktop and mobile.
- [ ] Diff ratio recorded per route per viewport.
- [ ] Every failing route either fixed structurally or registered in `exception-register.md` with cause + evidence path.
- [ ] No route is at or above `0.05` without an exception.

## Validation Loop
- [ ] `npm run lint -- --max-warnings=0` passes.
- [ ] `npm run typecheck` (or `tsc --noEmit`) passes.
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts and every canonical route responds with status 200.
- [ ] `npm run qa:r2n-parity` passes at `<=0.05` per route per viewport (or all failures have exceptions).
- [ ] No console errors on any canonical route.
- [ ] No broken images, no broken links.
- [ ] `app/_dev/` routes are not linked from public navigation or sitemap.
- [ ] VS Code Problems = 0 on touched files.
- [ ] `DOC/migration/phase1.4/validation-report.md` saved.

## Summary
- [ ] `DOC/migration/phase1.4/summary.md` saved listing pages, data modules, parity matrix, exceptions, validation outcomes, delivery class, next agent, and the 1.5 source-dependency note.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `pages_ready_for_hardening` only when every gate passes, every artifact is present, and parity passes for every canonical route (or every failure has a registered exception).
- [ ] Otherwise `composition_in_progress` with remaining gaps and next batch documented.

## Handoff
- [ ] On `pages_ready_for_hardening`, next lane named: `phase1.5-frontend-production-hardening.agent.md`. Handoff note records whether live source URL/HTML will be provided for the Phase 1.5 `<=0.01` parity gate.
- [ ] On `composition_in_progress`, next batch named with rerun plan.
- [ ] On `R2N_P14_PRECONDITION_MISSING`, the failing precondition lane is named and returned to.
- [ ] On `R2N_P14_PARITY_GAP`, failing routes are listed with structural fix plan (threshold remains pinned).

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] All gates run as single CLI commands.
- [ ] Pages composed in batches of <=8 with parity validation between batches.
- [ ] Missing dev dependencies installed locally; gates not skipped.
