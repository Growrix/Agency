---
name: website-blueprint-factory
description: Produce agency-grade, strategy-first website blueprints (12 markdown deliverables per project) that rival Pentagram, Fantasy, Active Theory, Ueno, and Locomotive. Use whenever the user asks to plan, architect, strategize, or blueprint a website, landing page, or digital product BEFORE any code or HTML is written. This is a planning/strategy factory — it produces no code.
---

# Website Blueprint Factory

Authoritative playbook for turning a business request into a complete, build-ready **website architecture blueprint** — a set of 12 markdown deliverables that a senior designer, a frontend engineer, and a creative director could all act on without further decisions.

This factory produces **strategy and architecture only — never code, never HTML, never a built site.** It is independent of the `sites/` (HTML) and `Frontend_Nextjs/` build tracks.

## The one rule that makes this system work

**Never start with design.** Most AI website generators fail because they immediately begin designing. This system forces every project through strategic planning agents first. Design decisions (style, hero, grid, motion, components) are only allowed AFTER industry, competitor, positioning, and visual-strategy work is locked.

Pipeline order is non-negotiable:

```
Industry → Research → Positioning → Visual Strategy → Homepage Architecture
→ Hero System → Conversion → Interactive Experience → Motion → Components
→ Uniqueness Check → Frontend Blueprint → Final Masterplan
```

## Output contract

- **Output directory:** `blueprints/NN-project-name/`
  - `NN` = zero-padded serial, incrementing from the highest existing serial in `blueprints/` (first project is `01`)
  - `project-name` = kebab-case business/brand name
  - Example: `blueprints/01-northwind-pest-control/`
- **Exactly 12 markdown files per project**, named exactly:
  - `01-industry-report.md`
  - `02-competitor-analysis.md`
  - `03-brand-positioning.md`
  - `04-visual-architecture.md`
  - `05-homepage-composition.md`
  - `06-hero-system.md`
  - `07-conversion-system.md`
  - `08-interactive-experience.md`
  - `09-motion-system.md`
  - `10-component-system.md`
  - `11-frontend-blueprint.md`
  - `12-final-website-masterplan.md`
- **Shared ledger:** `blueprints/_uniqueness-ledger.md` (one row per project) tracks each project's locked visual choices so new projects can be checked for repetition.
- Use the skeletons in `references/deliverable-templates.md` so every project file is consistently structured.

## The agent pipeline (who does what)

| Stage | Agent | Produces |
| --- | --- | --- |
| Orchestrate | `bp-director` | runs all stages, assembles `12-final-website-masterplan.md` |
| 01 | `bp-01-industry-intelligence` | `01-industry-report.md` |
| 02 | `bp-02-competitor-intelligence` | `02-competitor-analysis.md` |
| 03 | `bp-03-positioning-strategist` | `03-brand-positioning.md` |
| 04 | `bp-04-visual-architecture-director` | `04-visual-architecture.md` |
| 05 | `bp-05-homepage-composition-architect` | `05-homepage-composition.md` |
| 06 | `bp-06-hero-system-designer` | `06-hero-system.md` |
| 07 | `bp-07-conversion-architect` | `07-conversion-system.md` |
| 08 | `bp-08-interactive-experience-designer` | `08-interactive-experience.md` |
| 09 | `bp-09-motion-director` | `09-motion-system.md` |
| 10 | `bp-10-component-system-architect` | `10-component-system.md` |
| 11 | `bp-11-uniqueness-enforcer` (readonly) | verdict + `_uniqueness-ledger.md` update |
| 12 | `bp-12-frontend-execution-architect` | `11-frontend-blueprint.md` + `12-final-website-masterplan.md` |

Each agent must **challenge the previous agent's output** rather than blindly accept it. If a downstream agent finds an upstream decision weak, generic, or contradictory, it flags it and the orchestrator sends it back.

## Knowledge databases (references/)

Agents must consult these instead of inventing from scratch:

- `references/visual-style-library.md` — the 17 visual styles (pick exactly ONE primary per project).
- `references/composition-library.md` — the 10 homepage narrative compositions.
- `references/hero-database.md` — seed library of hero systems (schema-driven, expandable to 50+).
- `references/grid-database.md` — the 7 grid systems.
- `references/motion-database.md` — the 10 motion philosophies.
- `references/component-database.md` — card / nav / CTA / form families + the four scales (radius, type, elevation, spacing).
- `references/deliverable-templates.md` — markdown skeletons for all 12 outputs.

## Stage gates (must pass to advance)

1. **After Stage 03** — positioning must name a differentiation angle that is NOT "what everyone does" (from Stage 02). If positioning is generic, regenerate.
2. **After Stage 04** — a single primary visual style is chosen AND justified against industry + positioning. "Modern SaaS / generic" is never a default; it must be argued for if chosen.
3. **After Stage 10** — all seven uniqueness dimensions are explicitly named (see below).
4. **Stage 11 gate (hard)** — if the project overlaps any prior project by **>30%** across the seven dimensions, the enforcer REJECTS and the pipeline returns to Stage 04 to regenerate the visual decisions.
5. **Before Stage 12** — every prior deliverable exists and the uniqueness verdict is PASS.

## The seven uniqueness dimensions

Every project is fingerprinted on these. Two projects in the same industry must differ across most of them:

1. Visual style (from the style library)
2. Hero type (from the hero database)
3. Grid system (from the grid database)
4. Motion philosophy (from the motion database)
5. Homepage section order / composition (from the composition library)
6. Component style family (from the component database)
7. Signature interactive tool (industry-specific)

**Similarity rule:** count how many of the 7 dimensions match a prior project. 2 of 7 ≈ 28% (allowed). 3 of 7 ≈ 43% (REJECT). The enforcer regenerates until under 30%.

**Industry distinctiveness rule:** four businesses in the same category (e.g. Pest Control, Landscaping, HVAC, Handyman) must feel like four completely different products — not one template with swapped text.

## Quality bar (the blueprint must be good enough that…)

- A senior designer can design from it without asking questions.
- A frontend engineer can build from it without guessing layout/behavior.
- A creative director would approve it as agency-grade.
- It feels custom-made, not template-filled.
- It is visually distinct from every prior project in `blueprints/`.

## How to run

- Full pipeline: `/new-blueprint <business or brief>` (see `.cursor/commands/new-blueprint.md`).
- Single stage: invoke the specific `bp-NN-*` agent with the project folder path and the prior deliverables as context.
- The plain-English guide to every agent and how to use them lives at `WEBSITE-BLUEPRINT-AGENTS.md` in the repo root.

## Final QA checklist (all must pass before delivery)

- [ ] Folder `blueprints/NN-project-name/` exists with all 12 files, correctly named.
- [ ] No code, no HTML, no framework output anywhere in the deliverables.
- [ ] Stage 01–03 strategy is specific to the business (no generic filler).
- [ ] Exactly one primary visual style chosen and justified.
- [ ] Homepage composition is justified (never default Hero→Features→Testimonials→CTA without reason).
- [ ] At least one industry-specific interactive tool defined.
- [ ] Motion philosophy specifies hover, scroll reveal, page transition, and loading behavior.
- [ ] Component system defines buttons, forms, cards, modals, tables, alerts, navigation + the four scales.
- [ ] Frontend blueprint covers breakpoints, mobile + desktop layouts, grid, theme system, component hierarchy.
- [ ] Uniqueness verdict = PASS and `_uniqueness-ledger.md` updated with this project's row.
- [ ] Final masterplan synthesizes all 11 prior docs into one build-ready brief.
