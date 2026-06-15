# Component Patterns Reference

Accessible, migration-ready vanilla patterns. Markup is contiguous per component, classes are BEM-scoped, behavior lives in one `initX()` function.

## Header / Navbar

```html
<header class="header" id="header">
  <div class="container header__inner">
    <a class="header__brand" href="#hero" aria-label="Acme — home">
      <svg class="header__logo" aria-hidden="true" focusable="false" ...></svg>
      <span>Acme</span>
    </a>
    <nav class="nav" aria-label="Main">
      <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu">
        <span class="visually-hidden">Menu</span>
        <svg aria-hidden="true" ...></svg>
      </button>
      <ul class="nav__menu" id="nav-menu">
        <li><a class="nav__link" href="#features">Features</a></li>
        ...
        <li><a class="btn btn--primary btn--sm" href="#cta">Get started</a></li>
      </ul>
    </nav>
    <button class="theme-toggle" aria-label="Switch to dark theme" aria-pressed="false">...</button>
  </div>
</header>
```

- Sticky with backdrop blur + border that appears on scroll (toggle a `.header--scrolled` class via `IntersectionObserver` on a sentinel)
- `initNav()`: toggle `aria-expanded`, trap focus while open on mobile, close on Escape and on link click, return focus to toggle

## Buttons

Variant architecture (the vanilla analog of cva):

```css
.btn { /* base: inline-flex, gap, radius, transition, focus-visible ring */ }
.btn--primary { background: var(--color-primary); color: #fff; }
.btn--primary:hover { background: var(--color-primary-hover); }
.btn--secondary { background: transparent; border: 1px solid var(--color-border); }
.btn--ghost { background: transparent; }
.btn--sm | .btn--lg { /* size modifiers */ }
```

Use `<a class="btn">` for navigation, `<button class="btn">` for actions. Always define hover, focus-visible, active, and disabled states.

## Hero

- `<section id="hero">` with display heading (`--text-display`), subheading (muted, max-width ~60ch), primary + secondary CTA, and a visual (inline SVG illustration / gradient mesh / product mock)
- Hero is the LCP element: no reveal animation that delays its paint; animate-in is fine if initial opacity ≥ visible quickly (prefer transform-only entrance starting visible-ish, or skip hero reveal entirely)
- Background flourishes: CSS gradients, `radial-gradient` glows, inline SVG patterns — `aria-hidden="true"`

## Section heading pattern (reusable)

```html
<div class="section-head">
  <p class="section-head__eyebrow">Features</p>
  <h2 class="section-head__title">Everything you need to ship</h2>
  <p class="section-head__lede">Supporting one-liner, max-width 60ch, centered.</p>
</div>
```

## Card grids (features, services, pricing, blog)

```css
.cards { display: grid; gap: var(--space-6); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
.card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
```

- Whole-card click: wrap title in `<a>` and use the pseudo-element trick (`.card__link::after { position:absolute; inset:0 }`), keeping a single tab stop
- Pricing: mark the featured tier with `.card--featured`, real price copy, per-tier feature `<ul>`, CTA per card

## Testimonials

`<figure class="testimonial">` with `<blockquote>` + `<figcaption>` (name, role, avatar as inline SVG initials circle). Grid or CSS scroll-snap carousel — if carousel, add prev/next buttons with `aria-label`s and keyboard support; never autoplay without pause control.

## FAQ / Accordion

Prefer native disclosure:

```html
<details class="faq__item">
  <summary class="faq__question">How does the free trial work?</summary>
  <div class="faq__answer"><p>...</p></div>
</details>
```

Style the marker, animate with `grid-template-rows: 0fr → 1fr` technique or `interpolate-size` where supported. Add `FAQPage` JSON-LD when an FAQ exists.

## Tabs (when needed)

WAI-ARIA pattern: `role="tablist"` + `role="tab"` buttons (`aria-selected`, roving `tabindex`) + `role="tabpanel"` (`aria-labelledby`). Arrow keys move selection; `initTabs()` owns it.

## Forms (contact / signup)

```html
<form class="form" novalidate>
  <div class="form__field">
    <label class="form__label" for="email">Email</label>
    <input class="form__input" id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-error">
    <p class="form__error" id="email-error" hidden>Enter a valid email address.</p>
  </div>
  <button class="btn btn--primary" type="submit">Send message</button>
  <p class="form__status" role="status" aria-live="polite"></p>
</form>
```

`initForms()`: validate on submit (then on blur for touched fields), show inline errors + `aria-invalid`, focus first invalid field, simulate async submit with loading state on the button (disabled + spinner + "Sending…"), then success state in `.form__status`. Loading / error / empty states are mandatory.

## Stats / counters

`initCounters()`: animate numbers with `IntersectionObserver` + `requestAnimationFrame`; render the final value immediately under reduced motion. Keep the real value in markup for no-JS/SEO.

## Footer

`<footer>` with brand recap, link columns (`<nav aria-label="Footer">`), social icon links (`aria-label` each), legal line with dynamic year (set via JS, with the real year hardcoded as fallback text).

## Scroll reveal (global utility)

```js
function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  els.forEach((el) => io.observe(el));
}
```

```css
[data-reveal] { opacity: 0; transform: translateY(var(--reveal-distance)); transition: opacity var(--duration-slow) var(--ease-out), transform var(--duration-slow) var(--ease-out); }
[data-reveal].is-revealed { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { [data-reveal] { opacity: 1; transform: none; transition: none; } }
```

Stagger siblings with `transition-delay` via `[data-reveal-delay="1|2|3"]` modifiers (cap at ~300ms total).

## Theme toggle

`initThemeToggle()`: read `localStorage.theme` → fall back to `prefers-color-scheme`; set `data-theme` on `<html>`; update `aria-pressed` and the icon; persist on click. Inline a tiny pre-paint snippet at the top of `<body>`'s script — or better, a 3-line `<script>` right after `<head>`'s style — to avoid theme flash.
