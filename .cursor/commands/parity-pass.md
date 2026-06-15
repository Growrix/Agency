# Parity Pass

Fix visual and interactive gaps between an approved HTML preview and its Next.js production app.

## Inputs

Parse arguments as: source HTML path (e.g. `sites/02. sunterra-solar-website.html`). If missing, list `sites/` and ask.

## Steps

1. **Validate** source exists; derive target `Frontend_Nextjs/NN-site-name/`.
2. **Inventory** — run in sequence:
   - `node scripts/migration/inventory-html.mjs "<source>" --out "Frontend_Nextjs/NN-site-name/MIGRATION-MAP.json"`
   - `node scripts/migration/classify-routes.mjs "<source>" --out "Frontend_Nextjs/NN-site-name/ROUTE-CLASSIFICATION.json"`
   - `node scripts/migration/extract-component-css.mjs "<source>" --out "Frontend_Nextjs/NN-site-name/.migration/component-css.css"`
3. **Audit** — delegate `nextjs-visual-parity-auditor` (readonly); write findings to `Frontend_Nextjs/NN-site-name/PARITY-GAP-REPORT.md`.
4. **Fix** — delegate `nextjs-migration-architect` with:
   - Source + target paths
   - PARITY-GAP-REPORT findings
   - Follow skill phases 5.5–5.7 and 9
   - Waves: CSS/icons → shell → interactive views → homepage polish → SEO/audit
5. **Re-audit** — run visual-parity-auditor until PASS (zero P0/P1).
6. **Final trio** — `nextjs-accessibility-auditor`, `nextjs-performance-optimizer`, `nextjs-code-reviewer`.
7. **Confirm** — update `PARITY-SIGNOFF.md`; `pnpm build` must pass.

## Do not

- Edit the source HTML file
- Use HTML agents for Next.js fixes
- Sign off with open P0/P1 parity findings
