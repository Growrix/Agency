# Migrate to Next.js

Convert an approved HTML preview site into a production Next.js app in `Frontend_Nextjs/`.

## Inputs

Parse command arguments as the source HTML path (e.g. `sites/02. sunterra-solar-website.html`). If missing, list `sites/` and ask the user to pick one.

## Steps

1. **Validate source**: confirm the file exists in `sites/` and matches `NN. site-name-website.html`.
2. **Derive target folder**: extract serial + kebab name → `Frontend_Nextjs/NN-site-name/` (e.g. `02-sunterra-solar`).
3. **Gate**: recommend HTML audit trio (`accessibility-auditor`, `performance-optimizer`, `code-reviewer`) on source HTML unless user waives.
4. **Inventory**: run `node scripts/migration/inventory-html.mjs "<source>" --out "Frontend_Nextjs/NN-site-name/MIGRATION-MAP.json"`.
5. **Migrate**: delegate to `nextjs-migration-architect` with:
   - Source HTML path
   - Target folder path
   - Instruction to follow `nextjs-site-migrator` skill phases 2–8
   - Phase 3: delegate `tailwind-design-system-architect` for token port
   - Phase 7: full Next.js audit trio before delivery
6. **Confirm**: report source path, target path, MIGRATION-MAP summary, routes migrated, and audit status.

## Do not

- Modify the source HTML file
- Use `frontend-architect` for this workflow
- Mix HTML tech contract into Next.js output
