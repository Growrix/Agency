# Design System Reference — Token Block Template

Define this complete block in `:root` before building sections. Adapt the VALUES to the brand; keep the NAMES exactly as below so all sites share one vocabulary.

```css
:root {
  /* ===== Colors — light ===== */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-primary-active: #3730a3;
  --color-primary-soft: #eef2ff;
  --color-secondary: #0f172a;
  --color-accent: #f59e0b;
  --color-success: #16a34a;
  --color-success-soft: #f0fdf4;
  --color-warning: #d97706;
  --color-warning-soft: #fffbeb;
  --color-error: #dc2626;
  --color-error-soft: #fef2f2;
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-2: #f1f5f9;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-border: #e2e8f0;

  /* ===== Typography ===== */
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font-sans);
  --text-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --text-h1: clamp(2rem, 3.5vw + 0.75rem, 3.25rem);
  --text-h2: clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem);
  --text-h3: clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem);
  --text-subheading: 1.125rem;
  --text-body: 1rem;
  --text-sm: 0.875rem;
  --text-caption: 0.8125rem;
  --leading-tight: 1.15;
  --leading-normal: 1.6;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* ===== Spacing (4 8 12 16 24 32 48 64 96) ===== */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* ===== Radius ===== */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* ===== Shadows ===== */
  --shadow-sm: 0 1px 2px rgb(15 23 42 / 0.06);
  --shadow-md: 0 4px 12px rgb(15 23 42 / 0.08), 0 1px 3px rgb(15 23 42 / 0.06);
  --shadow-lg: 0 12px 32px rgb(15 23 42 / 0.12), 0 2px 8px rgb(15 23 42 / 0.06);
  --shadow-xl: 0 24px 60px rgb(15 23 42 / 0.18);

  /* ===== Layout ===== */
  --container-max: 72rem;
  --container-wide: 80rem;

  /* ===== Motion ===== */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --reveal-distance: 24px;
}

/* ===== Dark theme — only token values change ===== */
[data-theme="dark"] {
  --color-primary: #818cf8;
  --color-primary-hover: #a5b4fc;
  --color-primary-active: #6366f1;
  --color-primary-soft: #1e1b4b;
  --color-secondary: #e2e8f0;
  --color-bg: #0b1120;
  --color-surface: #111a2e;
  --color-surface-2: #1a2440;
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-border: #243049;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 12px 32px rgb(0 0 0 / 0.55);
  --shadow-xl: 0 24px 60px rgb(0 0 0 / 0.6);
}
```

## Breakpoints (raw values — media queries cannot read custom properties)

| Name | Min-width | Typical use |
|------|-----------|-------------|
| sm | 640px | large phones landscape |
| md | 768px | tablets; 2-col grids |
| lg | 1024px | laptops; full nav, 3-col grids |
| xl | 1280px | desktops |
| 2xl | 1536px | ultra-wide; cap line lengths, widen containers |

Document them as a comment at the top of the `<style>` block.

## Palette guidance per industry

- SaaS/tech: indigo/violet or blue primary, neutral slate surfaces
- Healthcare: teal/blue primary, warm neutrals, generous whitespace
- Restaurant/food: warm reds/oranges/greens, cream surfaces, serif display
- Luxury/agency: near-black surfaces, single metallic accent, high contrast type
- E-commerce: brand color primary + strong success/error system colors

Always verify contrast (4.5:1 body, 3:1 large/UI) in BOTH themes before proceeding.
