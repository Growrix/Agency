---
description: "Phase-2 frontend completion rules for replicated Next.js sites: audit route and state coverage, detect missing flows, preserve visible UI, and expand the implementation until every implied flow is real."
applyTo: "**/*.{ts,tsx,js,jsx,css}"
---
When auditing or finishing a replicated frontend:
- Treat screenshot replication as phase-1 only. A visually accurate theme shell is not yet a frontend-complete site.
- Preserve existing visible UI and theme direction; complete it additively rather than removing, hiding, minimizing, or downgrading it unless the user explicitly asks.
- Prioritize owned branding and rebrand surfaces first: site name, logo/icon, metadata naming, legal footer copy, contact identity, social links, and template/demo/vendor residue.
- Treat any visible primary control, card, utility link, footer item, or promotional surface without a real destination or implemented state as incomplete.
- Treat header utility chrome as mandatory scope: login/register/account/logout, language/currency/country selectors, compare/wishlist/cart/search badges, promo bars, notification bars, and similar selectors, toggles, or counters shown in the chrome.
- Treat overlays and transient controls as required state graphs: newsletter popups, auth/search/cart modals or drawers, cookie banners, dropdown menus, tab states, delayed-open timing, dismissal persistence, placement, backdrop behavior, and open/closed branches.
- Specifically audit blog slugs, product/service/case detail pages, shop/listing pages, cart/search/account flows, checkout/order states, footer links, CTA buttons, forms, filters, tabs, modals, sliders, and pagination.
- Specifically audit locale/language/currency behavior, auth entry points, popup timing/positioning, and default/hover/focus/selected/disabled visibility states for text, icons, selectors, and controls.
- When commerce UI exists, build the downstream route graph needed to make it truthful: shop/listing, category/detail, product/detail, cart, checkout, success/order states, account/login/register, search, and related empty states as implied.
- When content UI exists, build listing and slug/detail routes plus related destinations implied by cards and buttons.
- When footer/help/service/info items are presented as navigation, wire them to real destinations.
- If backend scope is unavailable, still build front-end-complete pages, empty states, success states, and navigable destinations so the UI is not fake.
- Treat screenshots as incomplete evidence for downstream flows. Derive the missing frontend routes and states from the visible information architecture.
- Distinguish phase-2 blockers from phase-3 polish. Do not let motion or cosmetic refinement outrank missing ownership, missing routes, missing state graphs, or fake UI.
- Finish phase-2 only after lint/build/type checks pass and the dev server runs cleanly.
