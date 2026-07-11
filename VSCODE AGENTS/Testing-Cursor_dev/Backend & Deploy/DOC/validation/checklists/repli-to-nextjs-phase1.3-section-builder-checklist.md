# Repli-to-Next.js Phase 1.3 Section Builder Readiness Checklist

This checklist is the human-verifiable readiness gate for Phase 1.3 of the Repli-to-Next.js lane. The agent must pass every applicable item before classifying delivery as `sections_complete`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/repli-to-nextjs-phase1.3-section-builder.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/repli-to-nextjs-phase1.3-section-builder.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/repli-to-nextjs-phase1.3-section-builder.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/repli-to-nextjs-phase1.3-section-builder-spec.md`.
- [ ] Both READMEs reference Phase 1.3.

## Intake
- [ ] `project_root` resolves and contains `DOC/design-read/` (all 7 artifacts).
- [ ] `DOC/migration/phase1.2/summary.md` declares `kit_complete`.
- [ ] `section-inventory.json` and `motion-policy.md` read.

## Section Plan
- [ ] `DOC/migration/phase1.3/section-plan.md` saved with batches of <=8.

## Demo Data
- [ ] Every section has a typed demo data fixture under `src/components/sections/_demo/`.
- [ ] Demo data is replaceable by page-level data without changing section code.

## Section Implementation
- [ ] Every section in `section-inventory.json` has a corresponding `src/components/sections/<Section>.tsx`.
- [ ] Each section has fully typed props with the props type exported.
- [ ] Sections compose only UI primitives from `src/components/ui/`; no new primitives created here.
- [ ] No arbitrary hex/rgb literals; tokens only.
- [ ] Layout matches section-inventory notes per viewport.
- [ ] Motion follows `motion-policy.md`.
- [ ] Forms are presentational only; submit handlers are typed callbacks.

## Preview Route
- [ ] `app/_dev/sections/[slug]/page.tsx` (or equivalent) exists.
- [ ] Every section renders with its demo data.
- [ ] Dev-only; not linked from public navigation.

## Validation Loop (Per Batch + Final)
- [ ] `npm run lint -- --max-warnings=0` passes.
- [ ] `npm run typecheck` (or `tsc --noEmit`) passes.
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts and preview routes respond with status 200.
- [ ] No console errors on visited preview routes.
- [ ] VS Code Problems = 0 on touched files.
- [ ] `DOC/migration/phase1.3/validation-report.md` saved.

## Summary
- [ ] `DOC/migration/phase1.3/summary.md` saved listing sections, primitives used, motion compliance, preview routes, validation outcomes, next agent.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `sections_complete` set only when every gate passes and every artifact is present.
- [ ] Otherwise `sections_in_progress` with remaining gaps and next batch documented.

## Handoff
- [ ] On `sections_complete`, next lane named: `repli-to-nextjs-phase1.4-page-composer-qa.agent.md`.
- [ ] On `sections_in_progress`, the next batch is named and a rerun plan is recorded.
- [ ] On `R2N_P13_MISSING_PRIMITIVE`, the missing primitive and the section requesting it are returned to Phase 1.2.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] All gates run as single CLI commands.
- [ ] Sections built in batches of <=8 with validation between batches.
- [ ] No new dependencies added in this lane.
