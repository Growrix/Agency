# Next.js → HTML Mapping

Reverse conversion flattens a production Next.js app into one self-contained file in `sites/`.

## Path convention

```
Frontend_Nextjs/02-sunterra-solar/  →  sites/02. sunterra-solar-website.html
```

Use `MIGRATION-MAP.json` routes table to reverse-map `nextPath` → `htmlRoute` / `data-route`.

## Structure mapping

| Next.js | HTML |
|---|---|
| `app/page.tsx` + `components/sections/*` | `<main>` homepage sections with comment boundaries |
| `app/<slug>/page.tsx` | `<div data-route="<slug>" hidden>` view |
| `app/(marketing)/[slug]/page.tsx` | one `data-route` per entry in `content/pages/` |
| `app/blog/page.tsx` | `data-route="blog"` |
| `app/blog/[slug]/page.tsx` | `data-route="blog-article"` + JS template |
| `app/not-found.tsx` | `data-route="404"` |
| `/about` URL | `#/about` hash link |
| `components/layout/Header.tsx` | `<header>` + `<nav aria-label="Main">` |
| `components/layout/Footer.tsx` | `<footer>` |
| `components/layout/MobileNav.tsx` | mobile drawer markup + `initMobileNav()` |
| `components/layout/BottomNav.tsx` | bottom nav bar + scroll-hide JS |
| `components/layout/Fab.tsx` | FAB button + `initFab()` |
| `components/layout/ThemeProvider.tsx` | `initThemeToggle()` + `[data-theme]` on `<html>` |
| `components/ui/Button.tsx` | `.btn`, `.btn--primary`, etc. (BEM) |
| `components/ui/Reveal.tsx` | `.reveal` + `initScrollReveal()` |
| `hooks/useQuoteWizard.ts` | `initQuoteWizard()` |
| `hooks/useToast.ts` | `initToast()` |
| `lib/solar/calculator.ts` | plain `function calculateSolar(...) { }` |
| `components/icons/Icon*.tsx` | inline `<svg>` in markup |
| `generateMetadata()` | `<title>`, meta, OG, Twitter in `<head>` |
| `components/seo/JsonLd*.tsx` | `<script type="application/ld+json">` |
| `content/blog.json` | `var BLOG = [ ... ];` |
| `content/navigation.json` | nav markup + optional `var NAV_LINKS = [...]` |
| `config/site.config.ts` | brand strings in head, footer, JSON-LD |

## CSS porting (Tailwind → vanilla)

1. **Tokens first:** copy `:root` and `[data-theme="dark"]` blocks from `globals.css` unchanged.
2. **Component layer:** copy `@layer components { ... }` rules; remove every `@apply`.
3. **Utilities:** if TSX uses Tailwind utilities without BEM equivalents, recreate as BEM rules — never leave Tailwind class names in HTML output.
4. **Layout:** replace flex/grid utility combos with named BEM blocks (`.hero`, `.hero__inner`, `.hero__content`).
5. **Responsive:** mobile-first base styles + `min-width` media queries co-located per component.

## React → vanilla JS patterns

### State → DOM

```javascript
// React: const [open, setOpen] = useState(false)
// HTML: toggle aria-expanded + hidden class on target panel
function initAccordion(root) {
  root.querySelectorAll('[data-accordion-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = expanded;
    });
  });
}
```

### Client hooks → init functions

| Hook file | HTML function |
|---|---|
| `useScrollReveal.ts` | `initScrollReveal()` |
| `useHeaderScroll.ts` | `initHeaderScroll()` |
| `useCounters.ts` | `initCounters()` |
| `useQuoteWizard.ts` | `initQuoteWizard()` |
| `useToast.ts` | `initToast()` |
| `useFab.ts` | `initFab()` |

### Hash router skeleton

```javascript
function initRouter() {
  const views = document.querySelectorAll('[data-route]');
  function show(route) {
    views.forEach((v) => { v.hidden = v.dataset.route !== route; });
    document.documentElement.dataset.route = route;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  function parse() {
    const hash = location.hash.replace(/^#\/?/, '') || 'home';
    show(hash === '' ? 'home' : hash);
  }
  window.addEventListener('hashchange', parse);
  parse();
}
```

## Content inlining strategy

| Content type | Strategy |
|---|---|
| Static prose pages | Inline HTML in `data-route` view |
| Repeatable lists (blog, FAQ, products) | JS array + render function |
| Forms / wizards | Full markup in view; validation in JS |
| Config values (brand, phone) | Literal strings in head/footer |

## What to strip

- `'use client'` directives, React imports, JSX
- `next/image` → `<img width height loading="lazy">` or inline SVG
- `next/link` → `<a href="#/slug">`
- Repository/fetch layers → static JSON inlined at build/export time
- Environment variables → placeholder domain comments
- TypeScript types → plain JS

## Tier classification (views)

Match `classify-routes.mjs` tiers when flattening:

| Tier | Next source | HTML output |
|---|---|---|
| A | prose `content/pages/*.json` | `.page-hero` + `.content__prose` |
| B | service pages | page-hero + feature grid + CTA |
| C | `components/views/*View.tsx` interactive | full interactive markup + `initX()` |
| D | blog, case studies, reviews | list/grid + detail template views |
