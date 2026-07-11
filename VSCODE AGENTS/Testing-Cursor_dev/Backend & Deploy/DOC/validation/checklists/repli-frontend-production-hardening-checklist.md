# REPLI Frontend Production Hardening Readiness Checklist (Phase 1.5)

This checklist is the human-verifiable readiness gate for Phase 1.5. The agent must pass every applicable item before classifying delivery as `production_handoff_ready`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/phase1.5-frontend-production-hardening.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/phase1.5-frontend-production-hardening.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/phase1.5-frontend-production-hardening.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/repli-frontend-production-hardening-spec.md`.
- [ ] Both READMEs (`.github/agents/README.md` and `Backend & Deploy/.github/agents/README.md`) reference Phase 1.5.

## Intake
- [ ] `frontend_root` resolves to a real folder.
- [ ] `frontend_root` matches the Phase 1.4 contract (or equivalent native App Router project) with 1.4 evidence present and at or above `production_candidate`.
- [ ] Optional `source_reference_root` resolves when provided.
- [ ] Optional `template_packaging` flag is recorded.

## Visual Parity Tightening
- [ ] Playwright + pixelmatch (or equivalent) QA harness present and runnable.
- [ ] Parity threshold set to `0.01` (1%) or stricter.
- [ ] Parity run completed at desktop (1440x900) and mobile (iPhone-12 class) for every canonical route.
- [ ] Each failing route either fixed at component level or has an accepted entry in `exception-register.md`.
- [ ] `DOC/migration/phase1.5/parity-report.md` saved with per-route status.

## Performance Hardening
- [ ] Image strategy audited (`next/image` vs retained `<img>` with reason).
- [ ] Font strategy audited (`next/font` or preconnect + `font-display: swap`).
- [ ] Third-party scripts use correct `next/script` strategy.
- [ ] Heavy non-critical widgets dynamic-imported.
- [ ] Lighthouse run for mobile + desktop on `/` plus three representative routes.
- [ ] Lighthouse reports stored under `DOC/migration/phase1.5/lighthouse/`.
- [ ] Lighthouse mobile thresholds met (defaults: perf 90, a11y 100, best-practices 95, SEO 100) or exceptions registered.

## SEO + Structured Data Lock
- [ ] Every canonical `src/app/**/page.tsx` declares `metadata` or `generateMetadata` with `title`, `description`, `canonical`, `openGraph`, `twitter`.
- [ ] JSON-LD structured data added per page type where applicable.
- [ ] `robots.ts`/`robots.txt` present and correct.
- [ ] `sitemap.ts`/`sitemap.xml` present and lists every canonical route.
- [ ] `not-found.tsx` returns proper 404.
- [ ] `.html` legacy redirects return 307/308 to canonical routes.
- [ ] `<html lang>` set; only one `<h1>` per route.
- [ ] `DOC/migration/phase1.5/seo-report.md` saved.

## Accessibility
- [ ] axe-core scan runs per canonical route via Playwright.
- [ ] Zero `critical` and zero `serious` violations across canonical routes (or exceptions registered with cause).
- [ ] Skip-to-content link present.
- [ ] Focus-visible styles preserved.
- [ ] Keyboard navigation works for navigation menus, drawers, and forms.
- [ ] Color contrast meets WCAG AA.
- [ ] All `<img>` have meaningful `alt` text or `alt=""` for decorative.
- [ ] `DOC/migration/phase1.5/a11y-report.md` saved.

## Maintainability + Theming
- [ ] Page-level marketing content lives in typed modules under `src/data/` (or equivalent).
- [ ] Repeated arrays (cards, testimonials, features, footer columns) live in typed data, not inline.
- [ ] Design tokens centralized in one source of truth (Tailwind config / `design-tokens.css` / `globals.css`).
- [ ] No arbitrary hex/rgb literals scattered in components without an exception entry.
- [ ] `.env.example` enumerates every env key referenced in code, with safe placeholder values only.
- [ ] `DOC/migration/phase1.5/maintainability-report.md` saved.

## Scalability Boundaries
- [ ] Per route: rendering strategy declared (`static`, `dynamic`, `isr`) with reason.
- [ ] Dynamic data reads behind a data-source layer (`src/data/sources/*` or equivalent) returning typed shapes.
- [ ] Component layer never imports raw data sources directly; only typed accessors.
- [ ] i18n folder/route readiness documented (no forced implementation).
- [ ] `DOC/migration/phase1.5/scalability-report.md` saved.

## Backend Handoff Contract
- [ ] Every interactive surface enumerated (forms, listings, search, auth slot, commerce, booking, contact, newsletter).
- [ ] Each surface declares: hosting route, typed request payload, typed response payload, validation rules, frontend status (`stub`/`mock`/`frontend_not_configured`), expected backend owner.
- [ ] `DOC/handoff/backend-contract.md` saved and complete.

## Template Packaging (when `template_packaging=true`)
- [ ] `README.md` includes feature list, prerequisites, install, dev, build, deploy notes, environment variable list, theming guide, content guide, brand swap guide, license note.
- [ ] `DOC/handoff/customization-guide.md` saved.
- [ ] Demo data separated from real client content (under `src/data/demo/` or equivalent) and marked replaceable.
- [ ] `LICENSE` file appropriate for the sale channel present.
- [ ] Marketing screenshots saved under `DOC/marketing/` (desktop + mobile, one per top route).

## Full Validation Loop
- [ ] `npm run lint -- --max-warnings=0` passes.
- [ ] `npm run typecheck` (or `tsc --noEmit`) passes.
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts and responds on `/`.
- [ ] Route smoke passes for every canonical route.
- [ ] Redirect smoke passes for every `.html` alias.
- [ ] Playwright visual parity passes at <=1% per route per viewport.
- [ ] axe-core a11y scan passes per canonical route.
- [ ] Lighthouse thresholds met for mobile + desktop on representative routes.
- [ ] No console errors on any canonical route.
- [ ] No broken images, no broken links on any canonical route.
- [ ] VS Code Problems = 0.
- [ ] `DOC/migration/phase1.5/validation-report.md` saved with command logs and outcomes.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `production_handoff_ready` only set when every applicable gate above is checked and every required evidence file is present.
- [ ] Otherwise `hardening_in_progress` with explicit remaining gaps documented.

## Handoff
- [ ] On `production_handoff_ready`, the next lane is named: Phase 4 (foundation planning), Phase 5 (template import attach), or Phase 7 (template deployment).
- [ ] On `hardening_in_progress`, the next failing gate is named and a rerun plan is recorded.
- [ ] On `REPLI_P15_P14_DEFECT_DETECTED`, the affected route is returned to Phase 1.4 with the failing evidence path.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] All gates run as single CLI commands in the VS Code terminal.
- [ ] No MCP-only assumptions, no sub-agent fan-out, no LangChain/Cursor-only orchestration.
- [ ] Missing dev dependencies installed locally, not papered over.
