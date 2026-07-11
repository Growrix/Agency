# Vite/React → Next.js Mapping (Track C)

## Source detection

| Signal | Likely source |
|--------|---------------|
| `vite.config.ts` + `src/main.tsx` | Vite React SPA |
| `index.html` + module script | Vite |
| AI Studio export folder | Vite + React + often Tailwind |
| `create-react-app` structure | CRA (treat as React SPA) |

## Inventory fields (`conversion-inventory.json`)

```json
{
  "track": "C",
  "sourcePath": "",
  "routes": [{ "path": "/", "component": "Home" }],
  "components": [{ "path": "src/components/Hero.tsx", "kind": "section" }],
  "tokens": { "cssFiles": [], "tailwindConfig": null },
  "assets": [{ "path": "public/logo.svg", "type": "image" }],
  "dependencies": []
}
```

Run: `node scripts/conversion/inventory-source.mjs "<source>" --track C --out "<target>/conversion-inventory.json"`

## Mapping table

| Prototype | Next.js target |
|-----------|----------------|
| `src/pages/*.tsx` or react-router routes | `app/**/page.tsx` |
| `src/components/*` | `components/sections/` or `components/views/` |
| `src/index.css` / Tailwind | `app/globals.css` + `@theme` |
| `public/*` | `public/*` |
| env `VITE_*` | `.env.example` + server/client split |
| client hooks | `"use client"` components + hooks |
| static copy | `content/*.json` + `lib/content/` |

## Phase separation (mandatory)

1. **DS/token phase** — port tokens, primitives, shells
2. **App rebuild phase** — pages and sections consuming tokens only

Never edit both in one ledger task.

## Parity

- Structural parity minimum for Track C
- Pixel parity when user requests — delegate `nextjs-visual-parity-auditor`
- Compare side-by-side with prototype dev server screenshot checklist in CONVERSION-MAP.md

## Delegates

- Scaffold: `nextjs-site-migrator` phases 0–2
- Tokens: `tailwind-design-system-architect`
- Build: `senior-frontend-specialist`
- Gates: `frontend-quality-enforcer`
