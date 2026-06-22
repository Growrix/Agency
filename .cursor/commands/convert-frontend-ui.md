# Convert Frontend UI

Bidirectional conversion between single-file HTML templates and production Next.js apps.

## Inputs

Parse arguments as:

1. **Direction** (optional): `to-next` or `to-html`. Infer from path if omitted.
2. **Source path**: HTML file in `sites/` or Next app folder in `Frontend_Nextjs/`.

Examples:

- `/convert-frontend-ui sites/02. sunterra-solar-website.html` → HTML → Next.js
- `/convert-frontend-ui to-html Frontend_Nextjs/02-sunterra-solar/` → Next.js → HTML

If missing, list `sites/` and `Frontend_Nextjs/` and ask the user to pick source + direction.

## Steps

1. **Load skill**: read and follow `.cursor/skills/frontend-ui-converter/SKILL.md`.
2. **Route by direction**:
   - **HTML → Next.js**: follow Track A — delegate to `nextjs-migration-architect` + `nextjs-site-migrator` phases.
   - **Next.js → HTML**: follow Track B — inventory, flatten, port CSS/JS, audit trio.
3. **Confirm**: report source path, target path, map summary, audit gate status, and sign-off artifacts.

## Do not

- Mix HTML tech contract into Next.js output or vice versa
- Modify source HTML during HTML → Next migration (unless user explicitly requests HTML sync on Track B)
- Skip audit trio or parity gates for production delivery
