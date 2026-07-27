# Vite/React/Tailwind → Single HTML Mapping (Track D)

## Output contract

One file: `sites/NN. site-name-website.html` — vanilla HTML5, CSS tokens, vanilla JS only.

## Token extraction

1. Read `tailwind.config.*` theme extend → map to `:root` custom properties
2. Read compiled or source CSS for colors, spacing, fonts
3. Document mapping in CONVERSION-MAP.md token table

| Tailwind | CSS token |
|----------|-----------|
| `bg-primary` | `--color-primary` |
| `p-4` | `--space-4` |
| `text-lg` | `--text-lg` |

## Component flattening

| React | HTML |
|-------|------|
| `<Button className="...">` | `<button class="btn btn--primary">` |
| `{items.map(...)}` | JS `renderList()` + template or DOM build |
| `useState` forms | vanilla JS state in `initForm()` |
| React Router | hash router `#/route` |
| `import Icon` | inline SVG |

## Strip list

Remove from output:

- `import` / `export`
- Tailwind class strings
- `@apply`
- React, Vite, any CDN script tags
- `className` → `class`

## Phases

Follow Track D in main SKILL.md. Reuse Track B audit trio for final QA.

## Reference

Track B reverse mapping: [next-to-html-mapping.md](next-to-html-mapping.md)
