# Motion Rules

Motion serves three masters: clarity, feedback, and hierarchy. Anything that does not serve one of those is decoration and is forbidden.

## Layers

1. **Macro motion** — section reveal, page transition, modal/drawer/sheet, route change.
2. **Micro motion** — hover, focus, active, selection, inline feedback, count-up, toast, accordion reveal, chip selection.
3. **Streaming motion** — token streaming (AI), live updates (real-time), progress (uploads, jobs).

## Duration policy

All durations come from motion tokens in `design-tokens-rules.md`. Raw `ms` literals are forbidden in component code.

| Layer / use            | Token                          | Default range |
|------------------------|--------------------------------|---------------|
| Hover / micro feedback | `--motion-duration-fast`       | 120–180ms     |
| Default UI transition  | `--motion-duration-base`       | 180–220ms     |
| Section reveal / lift  | `--motion-duration-slow`       | 220–280ms     |
| Cinematic hero / page  | `--motion-duration-cinematic`  | 280–320ms     |
| Reduced motion         | `--motion-duration-instant`    | 0ms           |

Archetype-specific bands override the defaults — see each visual-archetype file's "Motion personality" section.

## Easing policy

| Easing token                | Use                                                    |
|-----------------------------|--------------------------------------------------------|
| `--motion-easing-standard`  | Default for most interactions; archetype-defined curve |
| `--motion-easing-decel`     | Element entering, modal opening                        |
| `--motion-easing-accel`     | Element leaving, modal closing                         |
| `--motion-easing-spring`    | Chip selection, mobile sheet, AI suggestion lift only  |

## Reduced-motion contract

- Every animated component MUST respect `prefers-reduced-motion: reduce`.
- The reduced-motion fallback MUST preserve the final visual state (no layout shift, no missing element).
- Replace duration with `--motion-duration-instant` and disable easing.
- Cross-fades become instant swaps. Slide-ups become instant appears. Parallax disables.

## Macro motion catalog (allowed effects)

### Section reveal on scroll
- Effect: opacity 0→1 + translateY 8–16px → 0.
- Duration: `--motion-duration-slow`.
- Trigger: IntersectionObserver, threshold 0.15.
- Stagger: 60–120ms between sibling cards (cap at 5 children stagger).
- Reduced-motion fallback: instant fade-in via `<noscript>`/CSS only.

### Page transition
- Effect: route content cross-fade with optional translateY 4px.
- Duration: `--motion-duration-base`.
- Reduced-motion fallback: instant.

### Modal / drawer / sheet open
- Effect: backdrop fade + content scale 0.98→1 (modal) or translate (drawer/sheet).
- Duration: `--motion-duration-base`, decel easing on enter, accel easing on exit.
- Focus trap engages on open; ESC closes.
- Reduced-motion fallback: instant open/close.

## Micro motion catalog (allowed effects)

### Hover lift
- Effect: subtle scale 1.01–1.03 + shadow shift to `--shadow-2`.
- Duration: `--motion-duration-fast`.
- Disabled in reduced-motion (keep shadow change instant).

### Press feedback
- Effect: scale 0.97–0.98.
- Duration: `--motion-duration-fast`, decel easing.

### Focus ring
- Effect: outline appears via `--color-focus-ring` + `--shadow-focus`.
- Duration: `--motion-duration-fast`.
- Visible on keyboard focus; muted on mouse focus per `:focus-visible`.

### Tab / segmented control switch
- Effect: indicator slides under active tab.
- Duration: `--motion-duration-fast`.

### Chip selection
- Effect: scale 1.0 → 1.04 → 1.0 with spring easing.
- Duration: `--motion-duration-fast` to `--motion-duration-base`.

### Accordion reveal
- Effect: height auto-resolved + content fade.
- Duration: `--motion-duration-base`.

### Toast entry/exit
- Effect: translateY 16px + fade.
- Duration: `--motion-duration-base`.
- Auto-dismiss respects WCAG 2.2.1 (default 5–8s; pause on hover/focus).

### Count-up
- Effect: number animates from 0 to target.
- Duration: `--motion-duration-cinematic`.
- Only on first reveal; not repeated; disabled in reduced-motion.

### Inline validation appear
- Effect: helper/error message fades + translateY 4px.
- Duration: `--motion-duration-fast`.

## Streaming motion catalog

### AI token streaming
- Effect: each token chunk appears with opacity 0→1 + 2–4px translateY → 0.
- Duration: `--motion-duration-fast` per chunk.
- Reduced-motion: chunks appear instantly per chunk.
- Streaming cursor: 1Hz blink.

### Realtime status badge change
- Effect: pill background cross-fade.
- Duration: `--motion-duration-base`.

### Upload progress
- Effect: linear progress bar fill.
- No bouncing or indeterminate spinners when progress is known.

## Forbidden patterns

- Decorative parallax beyond hero (no parallax in mid-page sections).
- Continuous looping animations (e.g., bouncing icons, pulsing CTAs) outside specific status indicators.
- Cursor-follow effects in non-portfolio archetypes.
- Hijacked scroll (locking the user to scroll-driven scenes).
- Page-loading splash screens.
- Auto-playing video with sound on.
- Scroll-jacking carousels.
- Animations that delay first-meaningful-paint.

## Performance budgets

- Macro motion frames must run at 60fps on a mid-range mobile.
- No layout-thrashing properties: animate `transform` and `opacity` only.
- Use `will-change` only on elements that animate at least once per session, and remove after.
- IntersectionObserver thresholds set to fire well before the element enters viewport.

## Micro-animation purpose check

Every micro-animation declared in a component spec MUST cite one of:
- `purpose: clarity` — clarifies state change (focus, selection, expand).
- `purpose: feedback` — confirms user input (press, validation, toast).
- `purpose: hierarchy` — directs attention to the next step (CTA emphasis on hover).

If none of those applies → the motion is decorative and forbidden by constraint **F9**.

## Output

The motion_planner emits `<output_root>/motion-system.md` listing:

`<output_root>` MUST resolve to `DOC/output/runs/<timestamp>/planning/frontend`.
- Adopted duration band per archetype.
- Adopted easing curves.
- Per-component motion declarations citing layer + token + purpose + reduced-motion fallback.
