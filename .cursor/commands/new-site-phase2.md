# New Site — Phase 2

Expand a Phase 1-approved single-file site with all remaining inner views.

## Prerequisites

- A Phase 1 file exists in `sites/` with a polished homepage + global shell
- User has explicitly approved Phase 1 visuals ("continue phase 2", "build inner pages", or invoked this command)

## Inputs

- Target file path (if omitted, infer the most recently modified `sites/*.html` that has only home + placeholder routes, or ask)
- Original brief / master prompt (from chat context or user paste)

## Steps

1. **Read the Phase 1 file** — extract the locked design system (`:root` tokens), component classes, and shell markup. Do not redesign the homepage or change token values.
2. **List remaining views** from the original brief that are not yet built (or still show placeholders).
3. **Build inner pages** using Phase 1 templates per the skill's Complex site mode tiers:
   - Tier A: `.page-hero` + `.content__prose`
   - Tier B: service landing pages
   - Tier C: lead-gen flows (quote, calculator, inspection, rebates, finance)
   - Tier D: trust/content (case studies, blog, reviews, certifications)
4. **Expand router** — all routes from the brief; unknown hash → custom 404.
5. **Port interactivity** — multi-step forms, calculator math, localStorage leads, etc. Reuse proven logic from reference files when rebuilding.
6. **Audits** — delegate `accessibility-auditor`, `performance-optimizer`, and `code-reviewer`; fix all blocking findings.
7. **Report** — file path, complete route list, lead-gen features, audit status.
