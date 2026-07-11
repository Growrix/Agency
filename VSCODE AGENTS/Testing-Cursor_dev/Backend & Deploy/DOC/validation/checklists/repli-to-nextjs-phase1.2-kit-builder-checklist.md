# Repli-to-Next.js Phase 1.2 Kit Builder Readiness Checklist

This checklist is the human-verifiable readiness gate for Phase 1.2 of the Repli-to-Next.js lane. The agent must pass every applicable item before classifying delivery as `kit_complete`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/repli-to-nextjs-phase1.2-kit-builder.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/repli-to-nextjs-phase1.2-kit-builder.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/repli-to-nextjs-phase1.2-kit-builder.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/repli-to-nextjs-phase1.2-kit-builder-spec.md`.
- [ ] Both READMEs reference Phase 1.2.

## Intake
- [ ] `project_root` resolves and contains `DOC/design-read/` with all 7 artifacts.
- [ ] No prior Next.js scaffold exists in `project_root` (other than `.git`, `.gitignore`, `DOC/`).

## Scaffold
- [ ] `package.json` declares Next.js 15.x, React 19.x, TypeScript, ESLint flat config with `next/core-web-vitals` and `next/typescript`.
- [ ] Scripts include `dev`, `build`, `start`, `lint`, `typecheck`.
- [ ] `next.config.ts`, `tsconfig.json` (strict), `eslint.config.mjs`, Tailwind config present.

## Tokens + Tailwind
- [ ] Every color, spacing, radius, shadow, gradient token in `design-tokens.json` is represented in Tailwind config and/or `globals.css`.
- [ ] No arbitrary hex/rgb literals in any primitive.
- [ ] Breakpoints match `design-tokens.json` (default Tailwind unless overridden).

## Typography
- [ ] Every typography family in `design-tokens.json` is loaded via `next/font`.
- [ ] Font variables applied to `<body>` or `<html>` in `app/layout.tsx`.
- [ ] `unresolved-fonts.md` saved when any family was substituted with a free equivalent.

## UI Primitive Library
- [ ] Every primitive in `component-inventory.json` has a file under `src/components/ui/`.
- [ ] Each primitive has typed props exported.
- [ ] Variants implemented as a typed union (no boolean spaghetti).
- [ ] No `any`, no untyped children, no arbitrary literals.
- [ ] Forward refs applied where appropriate (Button, Input, Textarea, Select).

## Kit Preview Route
- [ ] `app/_dev/kit/page.tsx` exists.
- [ ] Renders every primitive in every variant including hover / focus / disabled states.
- [ ] Marked dev-only; not linked from public navigation.

## Validation Loop
- [ ] `npm install` succeeded.
- [ ] `npm run lint -- --max-warnings=0` passes.
- [ ] `npm run typecheck` (or `tsc --noEmit`) passes.
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts and `/_dev/kit` responds with status 200 and no console errors.
- [ ] VS Code Problems = 0 on touched files.
- [ ] `DOC/migration/phase1.2/validation-report.md` saved.

## Summary
- [ ] `DOC/migration/phase1.2/summary.md` saved with dependencies, tokens wired, fonts wired, primitives implemented, kit preview path, validation outcomes, next agent.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `kit_complete` set only when every gate passes and every required artifact is present.
- [ ] Otherwise `kit_in_progress` with explicit remaining gaps documented.

## Handoff
- [ ] On `kit_complete`, next lane named: `repli-to-nextjs-phase1.3-section-builder.agent.md`.
- [ ] On `kit_in_progress`, the next failing gate is named and a rerun plan is recorded.
- [ ] On `R2N_P12_DESIGN_READ_INCOMPLETE`, the missing Phase 1.1 artifacts are named and returned to Phase 1.1.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] All gates run as single CLI commands.
- [ ] Missing dev dependencies installed locally; gates not skipped.
