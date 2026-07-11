---
description: "Run a post-replication frontend audit using Frontend Audit Planner Agent and produce a ranked phase-2 backlog covering rebrand, missing flows, and route/state coverage gaps without implementing fixes yet."
---
Use Frontend Audit Planner Agent.

## Inputs
- Project folder: ${input:project_folder}
- Reference source: ${input:reference_source}
- Priority routes: ${input:priority_routes}

## Output Needed
1. Current replica surface
2. Ownership & rebrand matrix
3. Interactive surface matrix
4. Required route & state graph
5. Findings grouped by severity (Critical, High, Medium, Low)
6. Each finding with:
- User-visible symptom
- Route(s)
- Suspected file(s)
- Recommended fix
 - Phase label (`Phase 2` or `Phase 3`)
7. Ordered implementation plan for a follow-up phase-2 fix run
8. Deferred phase-3 polish candidates

## Audit Focus
- Treat the current app as a screenshot-replicated theme shell that still needs owned branding and missing frontend completion.
- Derive the full downstream route graph implied by the visible UI, not just the first click target.
- Detect ownership and rebrand gaps such as placeholder site identity, legal copy, contact details, favicon/icon assets, social links, and vendor/demo/template residue.
- Detect missing depth routes such as shop/listing pages, category/product detail pages, cart, checkout, order confirmation, account/login/register flows, search, blog slug/detail pages, footer support/information destinations, and utility/auth branches.
- Detect missing state graphs for language/currency selectors, badges/counters, modal/drawer/dropdown triggers, popup timing/placement/dismissal behavior, and other utility chrome interactions.
- Detect default/hover/focus/selected/disabled visibility issues in text, icons, selectors, overlays, and controls.
- Flag any static UI that looks complete visually but is not wired functionally.
- Separate phase-2 blockers from phase-3 polish candidates so unfinished core frontend work stays ahead of animation or cosmetic refinement.
- Do not recommend removing or minimizing visible UI to avoid missing implementation unless the user explicitly asks for that outcome.
