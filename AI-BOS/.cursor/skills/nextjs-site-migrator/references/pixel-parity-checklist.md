# Pixel Parity Checklist (blocking gate)

## P0 — must pass

- [ ] Sticky CTA hidden at `lg+` (mobile only)
- [ ] Contact, rebates, inspection are React views — not prose JSON with `<form>`
- [ ] Quote wizard: Property → Energy → System → Contact + consent
- [ ] Calculator includes system cost input; payback uses user cost
- [ ] All interactive forms submit with validation + status region
- [ ] `pnpm build` passes

## P1 — must pass

- [ ] FAB with call, quote, calculator, inspection links
- [ ] Bottom nav: SVG icons + scroll-down hide
- [ ] Announce: crossfade + localStorage dismiss
- [ ] Toast + lead save (`saveLead` equivalent)
- [ ] Zero emoji icon placeholders in `components/`

## Shell

- [ ] Announce bar
- [ ] Header + scroll shadow
- [ ] Mega menu (full-width, promo, dismiss)
- [ ] Drawer/Sheet + focus trap
- [ ] Sticky CTA
- [ ] Bottom nav
- [ ] FAB
- [ ] Footer
- [ ] Theme toggle (SVG)

## Homepage (16 blocks)

Hero, trust bar, calc preview, services, why solar, rebates band, why us, stats, case studies, testimonials, partners, finance, service areas, blog preview, FAQ preview, CTA band.

## init* coverage

initRouter, initThemeToggle, initHeaderScroll, initDrawer, initMega, initAnnounce, initScrollReveal, initCounters, initBottomNav, initFab, initQuoteForm, initForms, initActions, initYear — each mapped.

## CSS blocks

.btn, .form__*, .hero, .scard, .pillar, .rebates-band, .stats, .mega, .drawer, .fab, .toast, .bottomnav, .sticky-cta, .announce, .cstudy, .bcard, .quote-card, .cta-band, .page-hero, .content__prose.

## Breakpoints

Spot-check 320, 768, 1024, 1280, 1536 — light + dark.
