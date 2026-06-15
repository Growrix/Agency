# Tailwind Token Mapping

Preserve HTML token **names** when porting to Next.js. Map CSS custom properties to both runtime theme vars and Tailwind theme extensions.

## Process

1. Extract all `--*` declarations from `:root` and `[data-theme="dark"]` in the source HTML `<style>` block.
2. Paste light values into `:root` in `app/globals.css`.
3. Paste dark overrides into `[data-theme="dark"]` in `globals.css`.
4. Mirror color/spacing/radius/shadow tokens in `@theme` for Tailwind utility access:

```css
@import "tailwindcss";

@theme {
  --color-primary: var(--color-primary);
  --spacing-4: var(--space-4);
  --radius-md: var(--radius-md);
}
```

5. Use semantic utilities: `bg-primary`, `text-text-muted`, `p-4`, `rounded-md`.

## Rules

- Never hardcode hex in TSX when a token exists in HTML source.
- Gradients (`--color-hero-bg`) stay as CSS vars referenced via `style` or utility wrappers.
- Typography clamps (`--text-h1`) map to custom utilities or `@theme` font-size entries.
- Motion tokens (`--duration-base`, `--ease-out`) used in `@media (prefers-reduced-motion: no-preference)` blocks only.

## Dark mode

Use `next-themes` with `attribute="data-theme"`. Default follows `prefers-color-scheme`. Match HTML `[data-theme="dark"]` overrides exactly.

## Contrast verification

Re-run contrast table from HTML design system for both themes before declaring Phase 3 complete.
