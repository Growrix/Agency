# Template Track Brain — HTML Templates (`sites/`)

Last updated: 2026-06-26
Scope: Single-file HTML template business under `sites/`.

## Purpose

Session recovery anchor for HTML template builds. Update when starting a new site, completing Phase 1, or finishing Phase 2 of a complex build.

## Active Serial Index

| Serial | File | Status | Phase | Notes |
|--------|------|--------|-------|-------|
| 01 | `sites/01-BedrockConstruction.html` | delivered | complete | Legacy naming (no space after serial) |
| 02 | `sites/02. sunterra-solar-website.html` | delivered | complete | Original sunterra build |
| 03 | `sites/03. sunterra-solar-v2-website.html` | delivered | complete | V2 refresh |
| 03 | `sites/03. primora-supershop-website.html` | delivered | complete | E-commerce template |
| — | Next serial | **04** | — | Use zero-padded `04. site-name-website.html` |

## Naming Contract

- Pattern: `NN. site-name-website.html` (space after period)
- Next serial: glob `sites/*.html`, parse highest `NN`, increment
- Tech: vanilla HTML5 + CSS tokens + vanilla JS only — no frameworks, CDNs, or build step

## Active Builds

_None in progress. Update this section when a build starts._

Template when active:

```markdown
### Build: NN. site-name-website.html
- Started: YYYY-MM-DD
- Phase: 1 | 2
- Blueprint refs: blueprints/NN-project/06-hero-system.md, 10-component-system.md (if applicable)
- Token palette: primary / accent / surface summary
- Homepage sections: list
- Inner views pending: list (Phase 2 only)
- Ledger task IDs: T###
```

## Design Tokens In Flight

_None. Record token decisions here during Phase 1 for Phase 2 continuity._

## Context Recovery Read Order

1. `.cursor/brain/lane-router.yaml`
2. This file
3. `.cursor/execution/template-tasks.md`
4. `AGENTS.md`
5. `.cursor/skills/html-website-builder/SKILL.md`
6. Target file in `sites/` if resuming

## Handoff Gates

- Phase 1 complete → user approval before Phase 2 (`/new-site-phase2`)
- HTML delivery → audit trio pass before `/migrate-to-next`
- Blueprint optional → require `06-hero-system.md` + `10-component-system.md` paths when blueprint exists

## Related Brains

- Migration: `.cursor/brain/migration-brain.md`
- SaaS app: `memories/repo/site-brain.md`
