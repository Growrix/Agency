# Design System Discipline

## Authority split (Frontend-Master_DS pattern)

| Authority | Owns |
|-----------|------|
| Implementation | Tokens, primitives, components, section patterns |
| Operating | Skills, rules, gates, folder anatomy |
| Creative | Blueprint factory, content strategist — not same phase as DS rebuild |

## No hardcoding rules

Forbidden in components:

- Inline hex/rgb colors (use tokens / Tailwind theme)
- Inline copy for production surfaces (use `content/*.json` or CMS)
- Hardcoded routes in multiple places (use `config/site.config.ts`)
- Magic numbers for spacing/type (use token scale)

## Growrixos tracks

| Track | DS location | Rule |
|-------|-------------|------|
| `sites/` | `:root` CSS custom properties | `20-design-system.mdc` |
| `Frontend_Nextjs/` | Tailwind v4 `@theme` + `globals.css` | `50-nextjs-production-standards.mdc` |
| `web/` | Project DS / shadcn + tokens per `web/` conventions | Read `web/` layout and existing components first |

## Before sections

1. Complete token block or Tailwind theme map
2. Document contrast table (AA+ minimum)
3. Dark mode strategy locked
4. Then build primitives → sections

## DS vs app phase

**Never** in one task:

- Add new DS variants AND rebuild all pages
- Port tokens AND migrate 10 sections

Split into separate ledger tasks.
