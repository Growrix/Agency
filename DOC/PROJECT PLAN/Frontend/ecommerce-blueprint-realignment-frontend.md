# Ecommerce Blueprint Realignment Frontend Plan

## Purpose
Close frontend commerce gaps against Ongoing DOCS/ecommerce blueprint using reuse-first changes.

## Current Frontend State
- Strong baseline exists for catalog, product detail, cart, checkout, success, customer dashboard, and admin shells.
- Gaps remain in end-to-end consistency, fallback UX clarity, and phase-level parity with blueprint expectations.

## Gap Priorities
1. Discovery parity
- Align category/brand/collection filter UX with blueprint discovery contracts.
- Ensure URL-stable filtering and SEO-consistent index pages.

2. PDP and trust parity
- Keep variant/tier clarity, reviews linkage, and verified-purchase cues.
- Close edge states for unavailable variants and stale pricing changes.

3. Cart and checkout determinism
- Ensure guest/user cart merge behavior is deterministic and recoverable.
- Ensure checkout failure reasons are user-readable and mapped to backend reason codes.

4. Customer dashboard completion
- Eliminate placeholder/dead-end states for orders/downloads/appointments/support actions.

5. Admin UX readiness
- Replace JSON-heavy operator interactions with structured forms and workflow controls.

## Reuse Targets
- Existing route families: /digital-products, /shop, /cart, /checkout, /success, /dashboard/**, /admin/**.
- Existing component system and dashboard shells.
- Existing preview frame components and product cards.

## Deliverables
- Frontend parity checklist by blueprint phase (4,5,7,8,10,11,13,14).
- UX-state closure for loading/empty/error/recovery on critical commerce paths.
- Route-level regression list for release gates.

## Exit Criteria
- No critical commerce route depends on placeholder behavior.
- Cart-to-checkout-to-order flow is coherent across desktop/mobile.
- Customer and admin surfaces expose complete action pathways for commerce-critical tasks.
