# Component CSS Porting

Port HTML `<style>` BEM blocks into `app/globals.css` under `@layer components`.

## Process

1. Run `extract-component-css.mjs` on source HTML.
2. Paste extracted blocks into `@layer components { ... }`.
3. Preserve class names exactly (`.scard`, `.hero__title`, etc.) so TSX can use same classes.
4. Keep token references (`var(--color-primary)`) — never hardcode hex in component rules.
5. Co-locate `@media (min-width: ...)` with each block as in HTML.

## Priority order

1. `.btn`, `.form__*`
2. Layout chrome: `.header`, `.mega`, `.drawer`, `.announce`, `.bottomnav`, `.sticky-cta`, `.fab`
3. Homepage: `.hero`, `.scard`, `.rebates-band`, `.stats`, `.cta-band`
4. Inner pages: `.page-hero`, `.content__prose`, `.info-box`, `.feature-list`

## Tailwind coexistence

Use BEM classes in TSX via `className="scard"` where pixel fidelity matters. Use Tailwind for layout utilities only when BEM block exists.
