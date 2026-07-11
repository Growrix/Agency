---
archetype: dashboard-ops
positioning: information-dense operational interface; data-first product UI
best_for: [internal_tools, admin_panels, ops_dashboards, analytics_products, b2b_apps_with_heavy_data]
---

# Dashboard Ops

## Voice
- Operational, terse, precise.
- Status-led copy; verbs over adjectives.
- Numbers, dates, IDs treated as first-class content.

## Density
- Dense by default.
- Medium on landing page if there is one; the app surface itself is dense.

## Color Direction
- Neutral-first with strong status colors.
- Status palette is non-negotiable: success, warning, destructive, info, pending.
- Brand color reserved for primary actions and active state, not decoration.

### Default token roles
- background:  near-white / near-black depending on theme
- surface:     white / graphite
- inset:       slightly darker for tables and side rails
- primary:     brand hue used sparingly
- accent:      muted secondary
- destructive: clear red
- success:     clear green
- warning:     amber
- info:        blue
- pending:     muted slate

## Typography
- Display family: small footprint (rare in this archetype).
- Body family: humanist sans optimized for long scanning.
- Mono family: technical mono for IDs, timestamps, code.
- Heading scale: 24 / 20 / 18 / 16 / 14.
- Body scale: 14 / 13.
- Tabular figures required for numeric columns.

## Spacing
- 8px base.
- Card padding: 16 standard / 12 dense.
- Row height: 40–48 default; 32 dense.

## Surface system
- Page base: flat neutral.
- Elevated: hairline border, no shadow.
- Inset: side rails, sub-tables, code wells.
- Overlay: blurred translucent for command palette and dialogs.

## Radius
- 6–8 across components; sharp-leaning to feel structured.

## Motion personality
- Functional only.
- Macro 140–180ms.
- Micro 80–140ms.
- No decorative motion. No scroll-driven storytelling.
- Reduced-motion fallback is identical except instantaneous.

## Imagery direction
- No marketing imagery in the app.
- Charts, tables, status pills, inline avatars.

## Hero composition
- App shell: top bar + side rail + main panel.
- Marketing hero (if any): standard modern-saas hero pattern.

## CTA hierarchy
- Primary action per surface; never compete with destructive.
- Destructive actions require confirmation pattern.

## Iconography
- Outline 1.5px stroke; sizes 16/20.
- Icon + label by default; icon-only only for repeated rows.

## Trust real estate
- Audit and history visible per record.
- Permissions visible inline ("you can edit / you can view").

## Forbidden in this archetype
- Decorative gradients in app surfaces.
- Long animations between states.
- Hidden bulk actions; everything must be discoverable.
- Hover-only data; mobile parity required.
