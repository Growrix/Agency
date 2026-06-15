# Component Database

The `bp-10-component-system-architect` defines the project's component system. Pick a **style family** for each component group below, then lock the **four scales**. The component style family is a uniqueness dimension — same-industry projects should differ.

---

## Card styles
- **Elevated** — soft shadow, white surface, lifts on hover. (Clean, friendly; SaaS, services.)
- **Outlined** — border-only, no shadow, flat. (Minimal, editorial, technical.)
- **Glass** — translucent blurred surface. (Futuristic, fintech, modern.)
- **Filled / Tonal** — soft colored background blocks. (Bento, playful, categorized.)
- **Bordered-Accent** — strong colored top/left border. (Industrial, data, status.)
- **Image-Forward** — media-dominant with overlay text. (Lifestyle, portfolio, hospitality.)
- **Bento Tile** — rounded varied-size modular tile. (Product, showcase.)

## Navigation styles
- **Minimal Top Bar** — logo + few links + one CTA. (Most premium/minimal brands.)
- **Mega Menu** — multi-column dropdown panels. (Large catalogs, enterprise.)
- **Sidebar Nav** — vertical, app-like. (Dashboards, docs, platforms.)
- **Centered Logo Split** — links balanced around centered logo. (Editorial, luxury, fashion.)
- **Floating Pill Nav** — detached rounded floating bar. (Modern, playful, mobile-first.)
- **Sticky Transforming** — shrinks/changes on scroll. (Long marketing pages.)
- **Full-Screen Overlay** — hamburger → immersive menu. (Creative, agency, bold.)

## CTA styles
- **Solid Primary** — high-contrast filled button. (Default conversion driver.)
- **Outline / Ghost** — bordered or text-only secondary. (Hierarchy support.)
- **Gradient** — vivid gradient fill. (Futuristic, fintech, consumer.)
- **Magnetic** — cursor-attracting interactive button. (Agency, premium.)
- **Pill vs Sharp** — fully rounded vs squared corners (match radius scale).
- **Icon-Led** — arrow/icon animates on hover. (Modern, directional emphasis.)
- **Block / Bar CTA** — full-width banded call-to-action. (Mid/end-page conversion.)

## Form styles
- **Floating Label** — label animates into the border. (Clean, modern, app-like.)
- **Top Label** — label above field. (Accessible default, B2B, long forms.)
- **Underline Only** — minimal bottom-border inputs. (Editorial, minimal.)
- **Filled Field** — soft background fill, no hard border. (Material, friendly.)
- **Stepped / Multi-Step** — progress-indicated wizard. (Quotes, onboarding, calculators.)
- **Inline Single-Field** — one prominent field (email/search). (Lead capture, search.)

Every form spec must define: default, focus, filled, error, success, disabled, and loading states, plus inline validation and `aria-live` status messaging.

---

## Required component coverage in `10-component-system.md`
Define style, states, and behavior for each: **Buttons, Forms, Cards, Modals, Tables, Alerts/Toasts, Navigation** (plus Badges, Tabs, Accordions where relevant). For each interactive element define hover, focus-visible, active, disabled, loading, error, and empty states.

## The four scales (mandatory, lock exact values)

### Radius scale
Define a token ladder, e.g. `none 0 / sm 4px / md 8px / lg 16px / xl 24px / full 9999px`. Choose a ladder that matches the style (sharp for Swiss/Brutalism, soft for Neumorphism/Bento).

### Typography scale
Define display → caption with `clamp()` fluid sizing, the font pairing (display + body), weights, line-heights, and letter-spacing. State the type personality.

### Elevation (shadow) scale
Define `e0` (flat) → `e4` (modal) shadow tokens for light AND dark themes. Glass/Neumorphism need special treatment; Brutalism may use hard offset shadows or none.

### Spacing scale
Define the spacing ladder (e.g. `4 8 12 16 24 32 48 64 96 128`) and the base rhythm unit; state container max-widths and section padding rules.

---

## Selection guidance for `bp-10`
1. Component families must express the chosen visual style (Stage 04) consistently.
2. The four scales must be internally consistent (radius, type, elevation, spacing tell one story).
3. Check `_uniqueness-ledger.md` — vary card/nav/CTA/form families from adjacent-industry projects.
4. Provide enough detail that an engineer could build the component library without further questions.
