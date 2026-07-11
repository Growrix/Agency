# Repli-to-Next.js Phase 1.3 Section Builder Spec

## Purpose
Define the execution contract for Phase 1.3 of the Repli-to-Next.js lane: implement every composite section listed in the Phase 1.1 `section-inventory.json` as a typed, data-driven React component on top of the Phase 1.2 UI primitive library, with a dev-only preview route per section.

This spec is generic. It applies to any Phase 1.1 + 1.2 output.

## Scope
In scope:
- Composite section components under `src/components/sections/`.
- Typed demo data fixtures under `src/components/sections/_demo/`.
- Dev-only preview routes under `app/_dev/sections/`.
- Batched validation loop (lint, typecheck, build, dev smoke, console-error scan, VS Code Problems = 0).

Out of scope:
- UI primitive library (owned by Phase 1.2).
- Public-facing pages, per-page metadata, structured data, SEO (owned by Phase 1.4 / Phase 1.5).
- Pixel parity capture or screenshot diffing (Phase 1.4).
- Real form submit logic, backend wiring, providers (Phase 1.5 contract + Phase 4 backend).

## Required Input
- `project_root`: Phase 1.2 output folder. Must contain `DOC/design-read/` (all 7 artifacts) and `DOC/migration/phase1.2/summary.md` indicating `kit_complete`.

## Required Artifacts
Under `project_root/DOC/migration/phase1.3/`:
- `section-plan.md`
- `validation-report.md`
- `summary.md`

Under `project_root/`:
- `src/components/sections/<Section>.tsx` for every section in `section-inventory.json`.
- `src/components/sections/_demo/*` typed demo data fixtures.
- `app/_dev/sections/*` preview route(s).

## Non-Negotiable Gates
Phase 1.3 must not return `sections_complete` while any of the following are true:
- Phase 1.2 has not declared `kit_complete`.
- Any section in `section-inventory.json` is missing.
- Any section uses a primitive not defined in `src/components/ui/`.
- Any section embeds page-level copy inline instead of typed props.
- Any section has untyped props, arbitrary hex/rgb literals, or non-token spacing.
- Motion behavior deviates from `motion-policy.md` without an exception entry.
- `app/_dev/sections/[slug]/page.tsx` (or equivalent) does not render every section with demo data.
- Lint, typecheck, build, or dev smoke fails.
- VS Code Problems count is greater than 0 on touched files.

## Forbidden Patterns
- Modifying UI primitives in this lane; if a primitive is missing, refuse and return to Phase 1.2.
- Building public-facing pages or per-page metadata.
- Embedding page-level copy inline instead of typed props.
- Arbitrary literals.
- Adding component-library dependencies.
- Skipping validation between batches.

## Required Workflow
1. Intake and path safety.
2. Section scaffolding plan (batches of <=8).
3. Demo data authoring.
4. Section implementation, batched.
5. Section preview route(s).
6. Validation loop.
7. Section library summary.

## Validation Commands
Per batch and at completion:
1. `npm run lint -- --max-warnings=0`
2. `npm run typecheck` (or `tsc --noEmit`)
3. `npm run build`
4. `npm run dev` smoke (start, hit preview routes, stop)
5. Console error scan on visited routes
6. VS Code Problems = 0

## Delivery Classification
- `sections_complete` only when every gate passes and every required artifact is present.
- `sections_in_progress` otherwise, with `remaining_gaps` and next batch enumerated.
- `blocked_external_dependency` is rare for this lane (only for licensed vendor JS that the user must approve).

## Failure Codes
- `R2N_P13_KIT_INCOMPLETE`
- `R2N_P13_SECTION_MISSING`
- `R2N_P13_MISSING_PRIMITIVE`
- `R2N_P13_INLINE_COPY_DETECTED`
- `R2N_P13_LITERAL_DETECTED`
- `R2N_P13_MOTION_POLICY_VIOLATION`
- `R2N_P13_PREVIEW_ROUTE_MISSING`
- `R2N_P13_VALIDATION_FAILED`

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- Sections built in batches of <=8 with validation between batches.
- `DOC/design-read/` and `DOC/migration/phase1.2/` are read-only.
- No new dependencies added in this lane.

## Handoff
- `sections_complete` -> `repli-to-nextjs-phase1.4-page-composer-qa.agent.md`.
- `sections_in_progress` -> stay in 1.3, finish next batch, rerun, reclassify.
- `R2N_P13_KIT_INCOMPLETE` or `R2N_P13_MISSING_PRIMITIVE` -> return to Phase 1.2.
