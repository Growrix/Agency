# Phase 2.1 DOC System Frontend Dev Spec

## Purpose
Define the governed behavior for the optional specialist DOC-system frontend development pass that executes the authored plan inside the same phase-1 project root while adding creative frontend-direction capabilities beyond the standard DOC-system Phase 2 frontend dev agent.

## Required Inputs
- a resolved project root or project slug
- a valid DOC-system planning bundle
- a Keep/Adapt/Replace/Retire matrix
- target routes, journeys, and shared surfaces from the authored plan
- brand tone, visual direction, or quality bar when the plan provides them

## Required Outputs
- a transformed frontend in the existing phase-1 project root
- shared surfaces and public routes implemented according to the authored plan
- specialist frontend execution across layout, design system, interaction, motion, responsive behavior, and engineering discipline
- validation evidence showing the transformed site is buildable, lint-clean, and route-truthful
- runtime confirmation that the site starts without active blocking errors

## Execution Rules
- Use the same project root and starter-bootstrap rules as the standard DOC-system Phase 2 frontend dev agent.
- Respect the authored DOC-system plan and preservation matrix exactly.
- Apply specialist frontend capability only inside the allowed transformation space; do not override `keep` decisions or invent unrelated architecture.
- Use internal reasoning for product intent, visual language, layout composition, design-system direction, component architecture, interaction design, motion direction, responsive intelligence, and frontend engineering.
- Avoid repetitive AI SaaS layouts, identical hero patterns, cloned grids, and scaled-desktop mobile behavior.
- Preserve Next.js portability and shared phase5-7 continuation compatibility.
- Keep implementation production-oriented: reusable, maintainable, responsive, accessible, performant, and componentized.
- Stop only when phase-1 or the runtime root is missing, or when a blocker makes specialist execution impossible without planning repair.

## Validation
- The public wrapper exists under `.github/agents/phase2.1-doc-system-frontend-dev.agent.md`.
- The root human-facing brief exists under `.github/Phase2_1_DOC_System_Frontend_Dev_Agent.md`.
- The registry documents the new Phase 2.1 agent and explains how it differs from the standard DOC-system Phase 2 frontend dev agent.
- The agent preserves the same project-root, starter-bootstrap, preservation-matrix, and phase5-7 continuation contract as the standard DOC-system frontend dev agent.
- The agent explicitly adds specialist capability for visual direction, layout composition, design-system direction, interaction, motion, responsive intelligence, and frontend engineering.
- The agent explicitly forbids generic repetitive SaaS output and scaled-desktop mobile behavior.

## Failure Modes
- `DOC_SYSTEM_PHASE2_1_PROJECT_ROOT_UNCLEAR`
- `DOC_SYSTEM_PHASE2_1_PLAN_MISSING`
- `DOC_SYSTEM_PHASE2_1_MATRIX_MISSING`
- `DOC_SYSTEM_PHASE2_1_RUNTIME_MISSING`
- `DOC_SYSTEM_PHASE2_1_VALIDATION_FAILED`