---
description: "Run a phase-3 frontend polish pass after phase-2 completion using Frontend Polish Agent for motion, recovery states, accessibility/focus, metadata/icons, and final responsive UI/UX refinement."
---
Use Frontend Polish Agent.

## Inputs
- Project folder: ${input:project_folder}
- Reference source (screenshots folder or URL): ${input:reference_source}
- Priority pages/routes: ${input:priority_routes}
- Known polish issues already noticed: ${input:known_issues}

## Required Execution
1. Verify that owned branding and core route/state completion are already in place.
2. Audit motion, microinteractions, loading/empty/error/success/not-found states, modal usability, focus visibility, responsive alignment, metadata, and icon surfaces.
3. Implement polish without reopening replication or major route work.
4. If phase-2 blockers are found, report them explicitly instead of hiding them under polish.
5. Run lint/build/type checks and resolve failures.
6. Ensure zero Problems for the target project.
7. Run the dev server and report the final URL.

## Constraints
- Next.js only unless explicitly changed by user.
- Preserve the existing theme, layout direction, and phase-2 route structure.
- Motion must honor reduced-motion preferences.
- No cosmetic polish in place of missing core flows.
- No removal or downgrade of visible UI to simplify the pass unless the user explicitly requests it.