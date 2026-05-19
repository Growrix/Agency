---
document_type: design-system
scope: site-wide
build_stage: 2-design-foundation
depends_on:
  - 00-master-ui-architecture.md
recommended_next_reads:
  - 02-component-system.md
---

# Design System

## Visual Direction
- Name: Growrix OS.
- Positioning: premium product studio aesthetic with operational clarity.
- Core contrast: warm editorial background plus precise technical surfaces.
- Default theme: light-first.
- Alternate theme: dark mode available through the same token system.

## Color Tokens
- Primary: `#0F766E` for high-trust actions and focused highlights.
- Primary hover: `#0B5E58`.
- Secondary: `#C56A3B` for warmth, emphasis, and crafted premium accents.
- Accent: `#1783FF` for technical highlights, charts, and system signals.
- Background: `#F5F1E8`.
- Surface: `#FFFDF8`.
- Inset surface: `#ECE5D8`.
- Overlay surface: `rgba(20, 22, 26, 0.72)`.
- Border: `#D5CCBB`.
- Text primary: `#171A1F`.
- Text muted: `#5C6470`.
- Success: `#138A52`.
- Warning: `#B98016`.
- Destructive: `#B73A3A`.
- Info: `#1769C2`.

## Theme Logic
- Light mode is the default public experience because it better supports editorial whitespace and premium contrast.
- Dark mode uses deep graphite surfaces, muted sand text, teal primary actions, and restrained glow accents.
- Accent usage stays below 12 percent of the screen at any moment to preserve perceived sophistication.

## Typography
- Display and headings: Cabinet Grotesk.
- Body and UI copy: Manrope.
- Technical, code, and metrics text: JetBrains Mono.
- Display scale: 72, 64, 56, 48.
- Heading scale: 40, 32, 28, 24, 20, 18.
- Body scale: 18, 16, 14.
- Label scale: 13 with semi-bold weight.
- Caption scale: 12.
- Line-height rule: 1.05 to 1.15 for display, 1.2 to 1.35 for headings, 1.55 to 1.7 for body text.

## Spacing System
- Base unit: 8px.
- Allowed scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Section rhythm on desktop: 96px top and bottom.
- Section rhythm on tablet: 64px top and bottom.
- Section rhythm on mobile: 48px top and bottom.
- Card padding defaults: 24px standard, 32px premium, 16px dense mobile.

## Layout Tokens
- Containers: 640px, 768px, 960px, 1200px, 1440px.
- Grid: 12 columns desktop, 8 tablet, 4 mobile logic for dense card spans.
- Gutter: 24px desktop, 20px tablet, 16px mobile.
- Content alignment: left-led for trust and scanning clarity, centered only for hero and CTA moments.

## Surface System
- Page base: warm paper texture with subtle grid noise.
- Elevated surface: soft white with hairline border and mild shadow.
- Inset surface: slightly darker neutral for filters, code wells, and specification panels.
- Overlay surface: blurred dark translucent sheet for modals, menus, and chat.
- Interactive surface: high-contrast fill or outline depending on priority.

## Radius and Borders
- Radius scale: 8, 12, 16, 24, 32.
- Hero panels and sheets: 24px.
- Cards: 16px.
- Inputs and buttons: 12px.
- Border weights: 1px default, 1.5px emphasis, 2px focus or active accent.

## Shadow and Depth
- Shadow 1: subtle card float for basic separation.
- Shadow 2: interaction lift for hover states.
- Shadow 3: overlay depth for drawers, sheets, and modals.
- No heavy blur shadows on large surfaces; depth should feel engineered, not decorative.

## Motion Tokens
- Fast: 140ms.
- Standard: 200ms.
- Slow: 260ms.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Spring usage: mobile sheets, drawers, chat launcher, and AI suggestion chips only.

## Breakpoints
- Mobile: 0 to 767px.
- Tablet: 768px to 1023px.
- Desktop: 1024px to 1439px.
- Wide: 1440px and above.

## Iconography
- Style: outline-first with consistent 1.75px stroke.
- Sizes: 16, 20, 24, 32.
- Filled icons reserved for notification badges, status indicators, and branded marks.

## Imagery and Media
- Use real project screens, workflow diagrams, annotated mobile mockups, and product preview composites.
- Avoid generic developer stock photography.
- Preferred aspect ratios: 16:10 for UI panels, 4:3 for editorial feature imagery, 9:16 for mobile stacks.

## Content Density Rules
- Spacious on home, about, and service hero sections.
- Balanced on services, portfolio, and pricing.
- Dense on shop filters, product specs, and checkout summaries.

## Mobile App-Like Rules
- Sticky bottom dock replaces broad top navigation.
- Filters, cart preview, appointment options, and AI prompts open in sheets.
- Sticky bottom CTA appears only when user intent is high to avoid noise.
- Tap targets remain 44px minimum.

## Accessibility Rules
- Visible focus rings use primary color with 2px outer ring and 1px inner offset.
- Minimum text contrast ratio follows WCAG 2.1 AA.
- Motion respects `prefers-reduced-motion` with opacity-only or instant transitions.
- Form labels stay persistent; placeholders never carry critical information.

## Theming and Customization
- Brand visuals, accent weights, and hero treatments should be theme-configurable without changing layout primitives.
- Category accents in the shop can vary slightly by product type while staying within the same contrast and saturation guardrails.

## Testability Guidance
- Token usage should be centralized in Tailwind config or CSS variables.
- All interactive primitives need Storybook coverage for default, hover, focus, loading, and disabled states.
- Visual regression should include light, dark, mobile, and reduced-motion snapshots.