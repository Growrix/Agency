# Next.js Performance Checklist

Targets: Lighthouse Performance 95+, LCP < 2.5s, CLS < 0.1, INP < 200ms.

## RSC boundaries

- [ ] Server Components by default
- [ ] `'use client'` only for interactivity (nav, forms, theme, calculators)
- [ ] No unnecessary client wrappers around static content

## Assets

- [ ] `next/image` with explicit width/height or fill + sizes
- [ ] Hero/LCP image: priority, not lazy
- [ ] Below-fold: lazy loading
- [ ] Prefer inline SVG for icons (match HTML approach)

## Fonts

- [ ] System font stack default (zero network cost)
- [ ] If webfont: `next/font` with `display: swap`

## CSS

- [ ] Tailwind purges unused utilities in production
- [ ] No duplicate styles between globals and components
- [ ] Animate only `transform` and `opacity`

## JS

- [ ] Dynamic import heavy client modules (calculators, charts)
- [ ] Debounce resize handlers
- [ ] `IntersectionObserver` for scroll reveals (not scroll listeners)

## SEO

- [ ] `generateMetadata` on all routes
- [ ] `sitemap.ts` and `robots.ts` present
- [ ] JSON-LD via server components

## Build

- [ ] `pnpm build` succeeds
- [ ] No console errors in production build output
