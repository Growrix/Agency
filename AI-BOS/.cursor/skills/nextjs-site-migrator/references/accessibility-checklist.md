# Next.js Accessibility Checklist

Target: WCAG 2.2 AA+, Lighthouse Accessibility 100.

## Structure

- [ ] `lang` on `<html>` from site config locale
- [ ] Skip link first focusable element
- [ ] Landmarks: header, nav (labeled), main, footer
- [ ] One h1 per page; no skipped heading levels

## Client components

- [ ] Mobile nav: focus trap, Escape closes, focus returns to toggle
- [ ] Theme toggle: `aria-pressed` synced
- [ ] Forms: labels, `aria-invalid`, `aria-describedby`, live status regions
- [ ] Icon buttons: `aria-label`
- [ ] Decorative SVGs: `aria-hidden="true"`

## Keyboard

- [ ] All interactive elements operable by keyboard
- [ ] `:focus-visible` styles on all controls (use token-based outline)
- [ ] Tabs/accordion/carousel follow WAI-ARIA APG if present

## Visual

- [ ] Contrast 4.5:1 text, 3:1 large/UI — both themes
- [ ] Touch targets ≥ 44px
- [ ] `prefers-reduced-motion` disables non-essential animation

## Next.js specifics

- [ ] Client-only widgets don't break SSR (no hydration mismatch on theme)
- [ ] `next/image` alt text meaningful
- [ ] Route changes announce page title (focus h1 on navigate)
