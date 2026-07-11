# Repli-to-Next.js Phase 1.1 Design Read Spec

## Purpose
Define the execution contract for Phase 1.1 of the Repli-to-Next.js lane: read a folder of source screenshots and emit a deterministic, machine-readable design read that the next three agents (Kit Builder, Section Builder, Page Composer + QA) consume as their only specification.

This spec is generic. It applies to any screenshot folder, not a single project.

## Scope
In scope:
- Screenshot inventory.
- Design token extraction (colors, typography, spacing, radii, shadows, gradients, breakpoints).
- Component inventory (atomic UI primitives).
- Section inventory (composite sections).
- Page inventory (route + section composition).
- Motion policy declaration (good defaults for the lane).
- Summary artifact.

Out of scope:
- Application code, npm dependencies, Next.js scaffolding.
- HTML emission (that is the older `phase1.1-pixel-replicator.agent.md` lane).
- Pixel-perfect crop measurement (Phase 1.4 owns parity).
- Backend or provider work.

## Required Input
- `screenshots_root`: folder of reference screenshots (read-only).
- `project_root`: new project folder. Must be empty except for optional `.git`, `.gitignore`, `DOC/`.

## Required Artifacts
All written under `project_root/DOC/design-read/`:
- `screenshot-inventory.json`
- `design-tokens.json`
- `component-inventory.json`
- `section-inventory.json`
- `page-inventory.json`
- `motion-policy.md`
- `summary.md`

## Non-Negotiable Gates
Phase 1.1 must not return `design_read_complete` while any of the following are true:
- Any required artifact is missing.
- Any token color is recorded without a hex code.
- Any typography role lacks both `family` and `size`.
- The component inventory contains a primitive that the section inventory references but does not define.
- The page inventory references a section not present in the section inventory.
- Application code, npm dependencies, or a Next.js scaffold has been written in this lane.

## Forbidden Patterns
- Scaffolding a Next.js app in this lane.
- Installing npm dependencies in this lane.
- Inventing tokens, primitives, or sections not supported by at least one screenshot.
- Reopening the HTML lane (`phase1.1-pixel-replicator.agent.md`) decisions.

## Required Workflow
1. Intake and path safety.
2. Screenshot inventory.
3. Design tokens extraction.
4. Component inventory.
5. Section inventory.
6. Page inventory.
7. Motion policy declaration.
8. Summary.

## Delivery Classification
- `design_read_complete` only when every artifact is present and consistent (component-inventory primitives cover section-inventory references; page-inventory sections cover section-inventory entries).
- `design_read_in_progress` otherwise, with `remaining_gaps` enumerated.
- `blocked_external_dependency` when the screenshots are illegible or the user has not provided enough viewport coverage to infer mobile rules.

## Failure Codes
- `R2N_P11_PROJECT_ROOT_NOT_EMPTY`
- `R2N_P11_SCREENSHOTS_MISSING`
- `R2N_P11_TOKENS_INCOMPLETE`
- `R2N_P11_INVENTORY_INCONSISTENT`
- `R2N_P11_ARTIFACT_MISSING`

## Invariants
- Tool surface restricted to `read`, `search`, `edit`, `execute`, `todo`.
- No code or dependency installs in this lane.
- Outputs are deterministic, human-inspectable JSON and markdown.
- This lane is parallel to, not a replacement for, `phase1.1-pixel-replicator.agent.md` (HTML emission lane).

## Handoff
- `design_read_complete` -> `repli-to-nextjs-phase1.2-kit-builder.agent.md` with `project_root` and the design-read folder path.
- `design_read_in_progress` -> stay in 1.1, fix the gap, rerun summary, reclassify.
- `blocked_external_dependency` -> request the missing screenshot coverage from the user with concrete acquisition instructions.
