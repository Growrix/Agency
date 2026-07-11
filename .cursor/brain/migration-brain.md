# Migration Track Brain — Next.js (`Frontend_Nextjs/`)

Last updated: 2026-06-26
Scope: HTML → Next.js migrations and cross-framework conversion jobs.

## Purpose

Session recovery anchor for migration and conversion work. Update at migration start, parity pass, and sign-off.

## Active Migrations

_None in progress. Update when `/migrate-to-next` or `/convert-ui` starts._

Template when active:

```markdown
### Migration: Frontend_Nextjs/NN-site-name/
- Source: sites/NN. site-name-website.html | Vite/React prototype path
- Track: A (HTML→Next) | C (Vite→Next) | D (Vite→HTML) | E (web slice→HTML)
- Started: YYYY-MM-DD
- Phase: 0–9 (see nextjs-site-migrator) or conversion phase
- MIGRATION-MAP: path or pending
- CONVERSION-MAP: path or N/A
- Parity status: not_started | in_progress | P0/P1 gaps | signed off
- PARITY-SIGNOFF: path or pending
- Scope file: .cursor/brain/conversions/<job-id>.scope.json (if Track C/D/E)
```

## Known Source → Target Pairs

| Source | Target | Track | Status |
|--------|--------|-------|--------|
| `sites/02. sunterra-solar-website.html` | `Frontend_Nextjs/02-sunterra-solar/` | A | reference pair (verify on disk) |

## Conversion Job Registry

Jobs using Tracks C/D/E must create before code:

1. `CONVERSION-MAP.md` in target folder
2. Inventory JSON (see `scripts/conversion/`)
3. Scope copy from `.cursor/brain/conversion-scope.template.json`

## Parity Discipline

- P0/P1 gaps block delivery — delegate `nextjs-visual-parity-auditor`
- Do not modify source HTML during Track A migration
- Separate DS phase from app rebuild (Frontend-Master_DS rule)

## Context Recovery Read Order

1. `.cursor/brain/lane-router.yaml`
2. This file
3. `.cursor/execution/template-tasks.md`
4. Target app `MIGRATION-MAP.json` or `CONVERSION-MAP.md` if exists
5. `.cursor/skills/nextjs-site-migrator/SKILL.md` or `frontend-ui-converter/SKILL.md`

## Related Brains

- HTML templates: `.cursor/brain/template-brain.md`
- SaaS app: `memories/repo/site-brain.md`
