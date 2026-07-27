# Handbook Loader

Resolve the Technical SEO handbook before Build Mode or Audit Mode work.

**Shared SEO root:** `Ongoing DOCS/SEO/README.md` — agent map and cross-discipline handoffs.

## Resolution Order

1. **Project handbook** (preferred when present):
   - `Ongoing DOCS/SEO/technical-seo/README.md`
   - `Ongoing DOCS/SEO/technical-seo/00-documentation-map.md`
   - `Ongoing DOCS/SEO/technical-seo/02-principles.md`
   - `Ongoing DOCS/SEO/technical-seo/rules/01-technical-seo-rules.md`
   - `Ongoing DOCS/SEO/technical-seo/agents/` (framework modules)

2. **Portable fallback** (when project handbook absent):
   - `~/.cursor/skills/technical-seo/reference/agent-charter.md`
   - `~/.cursor/skills/technical-seo/reference/operating-modes.md`
   - `~/.cursor/skills/technical-seo/reference/quality-gates.md`

## Domain Docs (load on demand)

| Domain | Project path |
|--------|--------------|
| Architecture | `Ongoing DOCS/SEO/technical-seo/architecture/` |
| On-page | `Ongoing DOCS/SEO/technical-seo/on-page/` |
| Media | `Ongoing DOCS/SEO/technical-seo/media/` |
| Performance | `Ongoing DOCS/SEO/technical-seo/performance/` |
| Security/HTTP | `Ongoing DOCS/SEO/technical-seo/security-http/` |
| Accessibility/i18n/local | `Ongoing DOCS/SEO/technical-seo/accessibility-international-local/` |
| DevOps/observability | `Ongoing DOCS/SEO/technical-seo/devops-observability/` |
| Testing/auditing | `Ongoing DOCS/SEO/technical-seo/testing-auditing/` |
| Templates | `Ongoing DOCS/SEO/technical-seo/templates/` |
| Checklists | `Ongoing DOCS/SEO/technical-seo/checklists/` |
| Execution | `Ongoing DOCS/SEO/technical-seo/execution/tasks.md` |

## Recommended Load Order

1. `agent.md` or `reference/agent-charter.md`
2. `rules.md` or skill Strict Rules
3. `operating-modes.md` or `reference/operating-modes.md`
4. `workflow.md` (project) or skill Workflow section
5. Relevant domain docs for the task
6. Templates/checklists for deliverable format

## Site-Type Routing

| Site type | Priority docs |
|-----------|---------------|
| Next.js SaaS | `architecture/03-nextjs-rendering-strategy.md`, `on-page/01-metadata.md`, `performance/01-core-web-vitals.md` |
| HTML template | `on-page/01-metadata.md`, `on-page/02-structured-data-schema.md`, `media/01-image-seo.md` |
| Migration | `architecture/04-migration-maintenance.md`, `security-http/02-redirects-error-handling.md` |
| E-commerce | `on-page/02-structured-data-schema.md`, `on-page/06-pagination-faceted-search.md` |
| Local business | `accessibility-international-local/03-local-seo.md` |
| International | `accessibility-international-local/02-international-seo.md` |

## Portability Note

To use in a new project, copy `Ongoing DOCS/SEO/technical-seo/` into the project root and install the `Technical_SEO_expert` agent adapter.
