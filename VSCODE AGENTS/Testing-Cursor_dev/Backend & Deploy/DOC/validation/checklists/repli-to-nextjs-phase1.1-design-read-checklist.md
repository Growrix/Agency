# Repli-to-Next.js Phase 1.1 Design Read Readiness Checklist

This checklist is the human-verifiable readiness gate for Phase 1.1 of the Repli-to-Next.js lane. The agent must pass every applicable item before classifying delivery as `design_read_complete`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/repli-to-nextjs-phase1.1-design-read.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/repli-to-nextjs-phase1.1-design-read.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/repli-to-nextjs-phase1.1-design-read.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/repli-to-nextjs-phase1.1-design-read-spec.md`.
- [ ] Both READMEs reference the Repli-to-Next.js lane and Phase 1.1.

## Intake
- [ ] `screenshots_root` resolves to a real folder with at least one image file.
- [ ] `project_root` resolves; if it exists it is empty except for optional `.git`, `.gitignore`, `DOC/`.
- [ ] `project_root/DOC/design-read/` was created (or already existed) and is the only write target.

## Screenshot Inventory
- [ ] Every image file under `screenshots_root` is listed in `screenshot-inventory.json`.
- [ ] Each entry includes relative path and inferred page/section.

## Design Tokens
- [ ] `design-tokens.json` exists.
- [ ] Colors include brand primary, brand secondary, accent, neutral scale, background, surface, foreground, muted, border, semantic colors. Each has a hex code and a source screenshot.
- [ ] Typography includes heading and body font families, weights observed, role-to-size map, line-height per role.
- [ ] Spacing base unit and section vertical rhythm recorded.
- [ ] Radii, shadows, gradients, breakpoints recorded.

## Component Inventory
- [ ] `component-inventory.json` exists.
- [ ] Every primitive used in section inventory is defined here.
- [ ] Each primitive has name, variants, typed props, evidence screenshots, hover/focus notes when visible.

## Section Inventory
- [ ] `section-inventory.json` exists.
- [ ] Every composite section observed in the screenshots is defined.
- [ ] Each section has name, evidence screenshots, typed data shape, primitives used, layout notes per viewport, motion hints.

## Page Inventory
- [ ] `page-inventory.json` exists.
- [ ] Each page has canonical route, evidence screenshots, ordered section list, typed data shape per section, viewport coverage.
- [ ] Every referenced section exists in `section-inventory.json`.

## Motion Policy
- [ ] `motion-policy.md` exists with explicit defaults for hover, scroll reveal, carousel, mobile menu, page transitions.

## Summary
- [ ] `summary.md` exists and lists artifacts, counts, parity floor (<=5% at Phase 1.4), next agent (Phase 1.2 Kit Builder), and any open ambiguities.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `design_read_complete` set only when every artifact is present and inventories are consistent.
- [ ] Otherwise `design_read_in_progress` with explicit remaining gaps documented.

## Handoff
- [ ] On `design_read_complete`, next lane named: `repli-to-nextjs-phase1.2-kit-builder.agent.md`.
- [ ] On `design_read_in_progress`, the next failing artifact is named and a rerun plan is recorded.
- [ ] On `blocked_external_dependency`, the missing screenshot coverage is requested with concrete acquisition instructions.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] No MCP-only assumptions, no sub-agent fan-out.
- [ ] No application code, npm install, or Next.js scaffolding performed in this lane.
