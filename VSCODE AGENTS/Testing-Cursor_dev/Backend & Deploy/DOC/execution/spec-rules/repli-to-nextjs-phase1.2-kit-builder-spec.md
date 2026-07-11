# Repli-to-Next.js Phase 1.2 Kit Builder Spec

## Purpose
Define the execution contract for Phase 1.2 of the Repli-to-Next.js lane: scaffold a Next.js 15 App Router project from the Phase 1.1 design read, wire Tailwind v4 + fonts + design tokens, and implement the full UI primitive library plus a dev-only kit preview route.

This spec is generic. It applies to any Phase 1.1 output.

## Scope
In scope:
- Next.js 15 App Router scaffold with TypeScript strict.
- Tailwind v4 configuration sourced from `design-tokens.json`.
- `next/font` wiring for every typography family declared.
- Design-token CSS emission.
- UI primitive library, one primitive per file, fully typed, token-based styling.
- Dev-only kit preview route (`app/_dev/kit/page.tsx`).
- Full validation loop (lint, typecheck, build, dev smoke, VS Code Problems = 0).

Out of scope:
- Composite sections (Header, Hero, FeatureGrid, Footer, etc.) — Phase 1.3.
- Public-facing pages beyond a placeholder home — Phase 1.4.
- Per-page metadata, SEO, structured data — Phase 1.4 / Phase 1.5.
- Pixel parity capture or screenshot diffing — Phase 1.4.
- Backend, providers, deployment.

## Required Input
- `project_root`: Phase 1.1 output folder. Must contain `DOC/design-read/` with all 7 artifacts.

## Required Artifacts
Under `project_root/DOC/migration/phase1.2/`:
- `validation-report.md`
- `summary.md`
- `unresolved-fonts.md` (only when a declared font cannot be loaded)

Under `project_root/`:
- `package.json`, lockfile, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, Tailwind config.
- `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (placeholder), `app/_dev/kit/page.tsx`.
- `src/components/ui/<Primitive>.tsx` for every primitive in `component-inventory.json`.

## Non-Negotiable Gates
Phase 1.2 must not return `kit_complete` while any of the following are true:
- Phase 1.1 design-read artifacts are missing or incomplete.
- Project scaffold files (`package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, Tailwind config) are missing.
- Design tokens declared in `design-tokens.json` are not represented in Tailwind config and/or `globals.css`.
- Any typography family is not loaded via `next/font` (or recorded in `unresolved-fonts.md` with a free substitute).
- Any primitive in `component-inventory.json` is missing from `src/components/ui/`.
- Any primitive has untyped props, uses arbitrary hex/rgb literals, or violates the typed variant rule.
- `app/_dev/kit/page.tsx` does not render every primitive in every variant.
- `npm run lint -- --max-warnings=0`, `npm run typecheck`, `npm run build`, or `npm run dev` smoke against `/_dev/kit` fail.
- VS Code Problems count is greater than 0 on touched files.

## Forbidden Patterns
- Building composite sections in this lane.
- Building public-facing pages beyond the placeholder home.
- Adding shadcn, Radix, Headless UI, or any component-library dependency.
- Adding CSS-in-JS libraries.
- Editing `DOC/design-read/` artifacts.
- Skipping a gate because a dev dependency is not installed.

## Required Workflow
1. Intake and path safety.
2. Project scaffolding.
3. Tailwind v4 configuration.
4. Typography loading.
5. Base layout and globals.
6. UI primitive library.
7. Kit preview route.
8. Validation loop.
9. Kit summary.

## Validation Commands
1. `npm install`
2. `npm run lint -- --max-warnings=0`
3. `npm run typecheck` (or `tsc --noEmit`)
4. `npm run build`
5. `npm run dev` smoke (start, hit `/_dev/kit`, stop)
6. VS Code Problems = 0 check

## Delivery Classification
- `kit_complete` only when every gate passes and every required artifact is present.
- `kit_in_progress` otherwise, with `remaining_gaps` enumerated.
- `blocked_external_dependency` only for licensed-only fonts or local font files the user has not yet provided.

## Failure Codes
- `R2N_P12_DESIGN_READ_INCOMPLETE`
- `R2N_P12_SCAFFOLD_MISSING`
- `R2N_P12_TOKENS_NOT_WIRED`
- `R2N_P12_FONTS_NOT_WIRED`
- `R2N_P12_PRIMITIVES_MISSING`
- `R2N_P12_PRIMITIVES_UNTYPED_OR_LITERAL`
- `R2N_P12_KIT_PREVIEW_MISSING`
- `R2N_P12_VALIDATION_FAILED`

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- All gates are single CLI commands.
- Missing dev dependencies are installed locally; gates are not skipped.
- `DOC/design-read/` is read-only.
- This lane does not commit to git; commits are the user's responsibility per repo policy.

## Handoff
- `kit_complete` -> `repli-to-nextjs-phase1.3-section-builder.agent.md`.
- `kit_in_progress` -> stay in 1.2, fix the next failing gate, rerun, reclassify.
- `R2N_P12_DESIGN_READ_INCOMPLETE` -> return to Phase 1.1 with the missing artifact list.
