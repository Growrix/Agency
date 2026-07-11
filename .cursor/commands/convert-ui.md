# Convert UI

Cross-framework UI conversion — Tracks A through E.

## Inputs

Parse: source path, target intent, optional track hint.

If missing, ask once: *Source path and target — HTML, Next.js, or both directions?*

## Steps

1. Read `.cursor/skills/frontend-ui-converter/SKILL.md` — determine track A/B/C/D/E.
2. Delegate orchestration to `frontend-system-architect` for tracks C/D/E; `nextjs-migration-architect` for track A; skill Track B for Next→HTML.
3. **Before code:**
   - Copy `.cursor/brain/conversion-scope.template.json` → `.cursor/brain/conversions/<job-id>.scope.json`
   - Create `CONVERSION-MAP.md` in target folder
   - Run `node scripts/conversion/inventory-source.mjs "<source>" --track <C|D|E> --out "<target>/conversion-inventory.json"` when applicable
4. Update `.cursor/brain/migration-brain.md` and `.cursor/execution/template-tasks.md`.
5. Execute track phases; separate DS phase from app rebuild for Track C.
6. Phase-end: `/phase-gate` before declaring complete.

## Track quick reference

| Track | Source → Target |
|-------|-----------------|
| A | `sites/` HTML → `Frontend_Nextjs/` |
| B | `Frontend_Nextjs/` → `sites/` HTML |
| C | Vite/React SPA → `Frontend_Nextjs/` |
| D | Vite/React → `sites/` HTML |
| E | `web/` slice → HTML preview |

See also `/convert-frontend-ui` for legacy HTML↔Next routing.
