---
description: "Kick off post-replication phase-2 work by planning rebrand and missing frontend completion first, then executing the completion pass, and handing off optional presentation polish to phase 3 only after core frontend work is done."
---
Use Frontend Audit Planner Agent first for this project.

After the audit backlog is complete, use Frontend Finishing Agent to execute the phase-2 fixes.

If the project is frontend-complete and only presentation polish remains, finish with Frontend Polish Agent.

## Inputs
- Project folder: ${input:project_folder}
- Reference source (screenshots folder or URL): ${input:reference_source}
- Priority pages/routes: ${input:priority_routes}
- Must-fix issues already known: ${input:known_issues}

## Required Execution
1. Treat the current app as a screenshot-derived theme shell, not a complete site.
2. Inventory all public routes, visible interactive surfaces, and ownership/rebrand surfaces.
3. Build a route/state coverage matrix and identify dead-end, placeholder, fake, or still-unowned UI.
4. Derive the full required route graph and downstream flow graph implied by the visible UI, even when screenshots stop at first-level pages.
5. Explicitly detect missing flows such as shop/listing pages, category/product detail pages, cart, checkout, order confirmation, account/login/register routes, search, blog slug/detail pages, footer support/information destinations, filters, CTA destinations, utility/auth controls, language/currency selectors, badges/counters, and modal/drawer/dropdown state branches.
6. Explicitly detect ownership gaps such as placeholder site names, legal copy, metadata naming, favicon/icon assets, contact identities, social links, and vendor/demo/template residue.
7. Produce a severity-ranked phase-2 plan focused on rebrand and missing frontend truthfulness.
8. Implement all critical/high phase-2 gaps first: owned branding, missing routes, missing state graphs, dead links, fake selectors, and required empty/success/basic recovery states.
9. Run lint/build/type checks and resolve failures.
10. Ensure zero Problems for the target project.
11. If only motion, microinteractions, metadata polish, accessibility refinement, or presentation tuning remain, hand off those items to Frontend Polish Agent.
12. Run dev server and report URL.

## Constraints
- Next.js only unless explicitly changed by user.
- Preserve all visible UI and build behind it; do not remove, minimize, or downgrade existing surfaces unless the user explicitly requests it.
- Do not restart or overcomplicate phase-1 replication while doing phase-2 work.
- Screenshots define look and layout, not full route/state completeness.
- No incomplete placeholders.
- No unresolved broken images/icons/routes.
- No visible static UI that implies a deeper flow without a real destination or state.
- No visible utility control, selector, modal, drawer, dropdown, popup, or status badge without a real route/state graph.
- If commerce UI exists, treat shop and the downstream commerce pages as required rather than optional.
- Keep content/data driven where possible.
- Do not spend phase-2 budget on animation or cosmetic polish before ownership and frontend truthfulness are complete.
