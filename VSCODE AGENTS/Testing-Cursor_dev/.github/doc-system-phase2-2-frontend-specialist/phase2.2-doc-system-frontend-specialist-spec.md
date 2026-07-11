# Phase 2.2 DOC System Frontend Specialist Spec

## Purpose
Define the governed behavior for the optional independent DOC-system frontend specialist builder that creates a startup site theme, shared surfaces, reusable sections, blocks, components, and route foundations directly inside one target `FRONTEND DEV` project root.

## Required Inputs
- a target project path or project slug
- an authored brief, plan, or clear site-building request
- product or service context
- required pages, sections, or quality bar when the user provides them

## Required Outputs
- one resolved target `FRONTEND DEV` project root
- a real initial frontend foundation in that root
- a clear overall site theme and shared visual system
- reusable shared surfaces, sections, blocks, and components for continued development
- route or page foundations that are real and maintainable
- validation evidence showing the frontend builds cleanly and runs without blocking runtime errors

## Execution Rules
- Resolve exactly one target root under `FRONTEND DEV/` and work there.
- If the target root is missing or lacks the starter package, bootstrap it from `.github/project-starters/hybrid-canonical-project-starter/`.
- Read only the target root, the authored brief or plan, and directly governing docs.
- Do not inspect sibling frontend projects unless the user explicitly names one as an approved base.
- Do not inspect `Reference Style/`, screenshot folders, or unrelated visual references unless the user explicitly names them as approved inputs.
- Do not perform screenshot replication or screenshot-loyal transformation behavior.
- Build the initial site theme, shared surfaces, sections, blocks, components, and route foundations needed for strong initial delivery and continuation.
- Avoid generic repetitive SaaS output, cloned hero structures, and scaled-desktop mobile behavior.
- Keep implementation reusable, maintainable, responsive, accessible, performant, and production-oriented.

## Validation
- The public wrapper exists under `.github/agents/phase2.2-doc-system-frontend-specialist.agent.md`.
- The root human-facing brief exists under `.github/Phase2_2_DOC_System_Frontend_Specialist_Agent.md`.
- The support spec exists under `.github/doc-system-phase2-2-frontend-specialist/phase2.2-doc-system-frontend-specialist-spec.md`.
- The readiness checklist exists under `.github/doc-system-phase2-2-frontend-specialist/phase2.2-doc-system-frontend-specialist-readiness-checklist.md`.
- Root registry documentation lists the new Phase 2.2 specialist agent and explains how it differs from the standard Phase 2 and Phase 2.1 agents.
- The prompt explicitly forbids unrelated sibling-project scanning and unrelated reference-style scanning unless user-approved.
- The prompt explicitly focuses on startup theme building, reusable sections, blocks, components, and route foundations.

## Failure Modes
- `DOC_SYSTEM_PHASE2_2_PROJECT_ROOT_UNCLEAR`
- `DOC_SYSTEM_PHASE2_2_BRIEF_MISSING`
- `DOC_SYSTEM_PHASE2_2_RUNTIME_MISSING`
- `DOC_SYSTEM_PHASE2_2_VALIDATION_FAILED`