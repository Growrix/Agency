# Accessibility Checklist (WCAG AA+)

Run line by line before delivery. Every item must pass.

## Document

- [ ] `<html lang>` set correctly
- [ ] `<title>` unique and descriptive
- [ ] Skip link is the first focusable element and works (`href="#main"`, `<main id="main" tabindex="-1">` optional for robust focus)
- [ ] Landmarks present: header, nav (labeled), main, footer; no content outside landmarks
- [ ] Exactly one `<h1>`; heading levels do not skip

## Keyboard

- [ ] Tab order follows visual order; all interactive elements reachable
- [ ] `:focus-visible` styled with ≥2px high-contrast outline everywhere (links, buttons, inputs, summary, custom widgets)
- [ ] No keyboard traps; mobile menu traps focus only while open and releases on close
- [ ] Escape closes mobile menu / any overlay; focus returns to the trigger
- [ ] Custom widgets follow ARIA Authoring Practices keys (tabs: arrows; accordion: enter/space)

## ARIA / semantics

- [ ] Native elements used where possible (`button`, `a`, `details`, `label`)
- [ ] `aria-expanded` + `aria-controls` on all toggles, kept in sync by JS
- [ ] Icon-only controls have `aria-label`; decorative SVGs have `aria-hidden="true" focusable="false"`
- [ ] Status/feedback regions use `role="status"` / `aria-live="polite"`
- [ ] No redundant/invalid ARIA (no `role="button"` on `<button>`, etc.)

## Forms

- [ ] Every control has an associated `<label>`
- [ ] Errors: inline text linked with `aria-describedby`, `aria-invalid` set, focus moved to first invalid control
- [ ] Required indicated in text, not color alone; `autocomplete` attributes present
- [ ] Submit feedback announced via live region

## Visual

- [ ] Contrast: 4.5:1 normal text, 3:1 large text and UI components — verified in BOTH themes
- [ ] Meaning never conveyed by color alone
- [ ] Touch targets ≥ 44×44px (or adequately spaced)
- [ ] Layout intact at 320px width and 200% zoom
- [ ] `prefers-reduced-motion: reduce` removes/reduces all non-essential motion (reveals, counters, smooth-scroll)

## Media

- [ ] All `<img>` have meaningful `alt` or `alt=""` if decorative
- [ ] Inline SVGs that convey meaning have `<title>`/`aria-label`; decorative ones hidden
- [ ] No autoplaying motion without a pause mechanism
