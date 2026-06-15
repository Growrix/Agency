# Performance Checklist (Core Web Vitals)

Targets: Lighthouse Performance 95+ · LCP < 2.5s · CLS < 0.1 · INP < 200ms.

## Network / dependencies

- [ ] Zero external requests required (no CDN scripts, no external fonts/images by default)
- [ ] If a webfont was explicitly required: WOFF2 only, subset, `@font-face` with `font-display: swap`
- [ ] Total file size reasonable for a single-file site (target < 250KB uncompressed without embedded media; justify anything larger)

## LCP

- [ ] Hero (LCP element) renders immediately — not hidden by a reveal animation, not lazy-loaded
- [ ] Any hero `<img>` uses `fetchpriority="high"`; below-the-fold images use `loading="lazy" decoding="async"`
- [ ] Single `<style>` in `<head>`, single `<script>` at end of `<body>` (no render-blocking resources)

## CLS

- [ ] Every `<img>` has explicit `width`/`height` or a CSS `aspect-ratio` box
- [ ] Dynamic regions (form status, accordions, tabs) reserve or animate space without shifting unrelated content
- [ ] No content injected above existing content after load
- [ ] Theme applied pre-paint (no light→dark flash)

## INP / runtime

- [ ] Animations use only `transform` and `opacity`
- [ ] Reveals use `IntersectionObserver`, not scroll listeners; any scroll/touch listeners are `{ passive: true }`
- [ ] Resize handlers debounced; visual updates via `requestAnimationFrame`
- [ ] No layout thrash (batched reads/writes); no long tasks in `init()`
- [ ] Event delegation used for repeated elements (FAQ lists, card grids)

## Code hygiene

- [ ] No unused CSS rules or dead JS branches
- [ ] No duplicated component CSS (variants via modifiers, not copy-paste)
- [ ] CSS selectors max 2 levels deep; no `!important`
- [ ] JS: strict mode, no globals beyond the single IIFE/module, no console noise
- [ ] Zero console errors/warnings on load and during interaction
