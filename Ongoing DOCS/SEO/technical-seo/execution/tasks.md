# Technical SEO Execution Tasks

Document status: canonical execution tracker
Last updated: 2026-07-12

## Purpose

Convert the Technical SEO handbook into phased, agent-readable execution work.

## Scope

This tracker covers planning, audits, new implementation, migrations, release gates, monitoring, and recurring maintenance.

## Business Value

Execution tasks make SEO quality repeatable instead of depending on one-time manual review.

## Dependencies

- `README.md`
- `00-documentation-map.md`
- `rules/01-technical-seo-rules.md`
- `checklists/01-prelaunch-checklist.md`
- `testing-auditing/02-audit-playbook.md`

## Concepts

- Execution follows source documents, not guesses.
- Every phase has acceptance criteria and validation gates.
- Implementation code is out of scope until a separate task explicitly requests it.

## Architecture

| Phase | Name | Status | Primary docs | Deliverables |
| --- | --- | --- | --- | --- |
| 1 | Intake and baseline | Planned | `README.md`, `00-documentation-map.md` | Site type, goals, URL inventory, analytics access list. |
| 2 | Architecture and URLs | Planned | `architecture/` | Route map, URL rules, rendering decisions, migration risks. |
| 3 | On-page technical signals | Planned | `on-page/` | Metadata, schema, canonical, robots, sitemap, internal link plan. |
| 4 | Media and JavaScript visibility | Planned | `media/` | Image, video, font, CSS, JS SEO checks. |
| 5 | Performance engineering | Planned | `performance/` | CWV targets, cache/CDN/edge plan, API/database performance risks. |
| 6 | Security and HTTP | Planned | `security-http/` | HTTPS, headers, redirects, error strategy. |
| 7 | Accessibility, international, local | Planned | `accessibility-international-local/` | A11y, hreflang, local signals when applicable. |
| 8 | CI/CD and observability | Planned | `devops-observability/` | Release gates, monitoring, logging, alerts. |
| 9 | Testing and audit | Planned | `testing-auditing/` | Audit report, validation evidence, prioritized fixes. |
| 10 | Launch and maintenance | Planned | `checklists/` | Prelaunch pass, recurring maintenance cadence. |

## Best Practices

- Start every task by naming the route type, source docs, and acceptance criteria.
- Validate a small representative route set before broad rollout.
- Keep audit findings tied to severity, business impact, and reproducible evidence.

## Common Mistakes

- Running tools before defining the URL sample.
- Fixing symptoms without checking root architecture.
- Closing tasks without monitoring or recurring maintenance notes.

## Validation Rules

- Every task must name source docs, deliverables, validation, and rollback or mitigation when applicable.
- Public-route work must include metadata, canonical, indexability, sitemap, internal-link, performance, accessibility, and monitoring checks.

## Testing Strategy

Use crawler checks, route smoke tests, static validation, rendered HTML inspection, structured data tests, Lighthouse/WebPageTest, log checks, and Search Console review.

## Monitoring

Track open audit findings, failing release gates, recurring production regressions, and stale documentation sections.

## Maintenance

Update task statuses when work moves from planned to in progress, blocked, or done.

## Future Enhancements

- Add project-specific command snippets after the first implementation pass.
- Add severity scoring and estimated effort fields to task blocks.

## Related Documents

- `templates/03-implementation-brief-template.md`
- `checklists/01-prelaunch-checklist.md`
- `checklists/02-recurring-maintenance-checklist.md`
- `testing-auditing/02-audit-playbook.md`

## Active / Recent Tasks

### Task: Grok findings revalidation P0/P1

Status: Done
Phase: 9 Testing and audit + on-page/performance remediation
Route type: homepage | service detail | marketing shell
Source docs:
- `on-page/04-crawlability-robots-sitemaps.md`
- `on-page/01-metadata.md`
- `on-page/02-structured-data-schema.md`
- `on-page/05-internal-linking-navigation.md`
- `media/01-image-seo.md`
- `performance/01-core-web-vitals.md`
- `audit-reports/2026-09-10-grok-findings-revalidation.md`

Deliverables:
- Clerk provider scoped off marketing HTML
- robots.txt without Host
- Hero WebP LCP preload
- Service explore links + title/canonical hygiene
- Release-gate updates

Acceptance criteria:
- Marketing pages do not mount ClerkProvider
- robots body has no Host line
- Public service slugs emit Service + FAQPage + BreadcrumbList
- health:check exits 0

Validation:
- `npm run health:check` (web/) — exit 0 on 2026-09-16

Risks:
- Cloudflare managed robots block still present at edge — cannot fix in Next alone

### Task: Homepage crawlable content, brand-first title, blog publish dates (audit P0)

Status: Done (pending production verification)
Phase: 3 On-page technical signals
Route type: homepage | blog
Source docs:
- `on-page/01-metadata.md`
- `on-page/02-structured-data-schema.md`
- `on-page/04-crawlability-robots-sitemaps.md`

Deliverables:
- `HomeCrawlableSummary` server-rendered as the `HomeBelowFoldGate` first-paint fallback (services, templates, blog, key links in initial HTML)
- Homepage `<title>` is brand-first (`HOME_SEO_TITLE`); OG/Twitter keep the short share title
- Blog `publishedAt` no longer relies on GROQ string slicing; `toIsoDateOnly` normalizes in TypeScript; `BlogPosting.datePublished` omitted rather than emitted empty
- Unit tests (`iso-date.test.ts`, `HomeCrawlableSummary.test.tsx`) and a raw-HTML release gate in `release-gates.spec.ts`

Acceptance criteria:
- Initial homepage HTML (no JS) contains service, category, and product links and exactly one `h1`
- Homepage `<title>` starts with `Growrix OS |`
- Blog posts show a real date and emit `datePublished`

Validation:
- `tsc --noEmit`, `eslint` on touched files, `npm run test:unit` (88 pass), `next build --webpack`, and the new request-only e2e gate against the built server
- Not run locally: full `npm run health:check` (Playwright browser projects)

Risks:
- The fallback is visible until the deferred sections mount; check for a visible swap/blank gap and CLS on the deployed preview
- Blog date fix assumes the GROQ `string(...)[0..9]` slice returned null; confirm on production after deploy

### Task: Keyword-led titles, filtered-catalog noindex, facet labels, honest sitemap dates (audit P1)

Status: Done (pending production verification)
Phase: 3 On-page technical signals
Route type: catalog | services | sitemap
Source docs:
- `on-page/01-metadata.md`
- `on-page/04-crawlability-robots-sitemaps.md`

Deliverables:
- `/digital-products` title/description/CollectionPage schema describe what is actually sold (HTML templates and business profiles)
- Filtered listing URLs (`?category=`, `?type=`, `?industry=`) return `noindex, follow`; canonical stays the unfiltered listing
- Product `<title>` is keyword-led via `buildProductSeoTitle` (H1 and Product schema keep the storefront name)
- Service `<title>` is keyword-led via `getServiceSeoTitle` (hero headline no longer used as the title)
- Shop facets no longer label a shared slug with whichever product came last ("Healthcare 18", "Dentistry 18" for all 18 templates is now "Website Templates 18")
- Sitemap emits `lastmod` only where a real date exists (blog posts)

Acceptance criteria:
- `/digital-products?category=html-business-profiles` has `robots: noindex, follow`
- `/services/technical-seo` title starts with `Technical SEO Setup Services`
- Sitemap has no blanket `lastmod`

Validation:
- `tsc --noEmit`, eslint on touched files, `npm run test:unit` (96 pass), `next build --webpack`, curl checks on the built server, request-only e2e gates
- Not run locally: full `npm run health:check` (Playwright browser projects)

Open decisions (not changed):
- Unverified stats on the shop hero (8,000+ customers, 4.9/5, 24/7 support) in `lib/product-led-content.ts`
- Long product slugs (`website-template-html-preview-...`); changing them needs 301s and a check of order/CMS references
- Per-product OG images (poster aspect ratio is not 1.91:1)

## References

- Master Technical SEO Documentation Blueprint.
- Google Search Console validation workflows.
- Lighthouse CI and web performance validation workflows.

## Task Block Template

```md
### Task: <short title>

Status: Planned | In Progress | Blocked | Done
Phase: <phase number and name>
Route type: <homepage | listing | detail | blog | docs | app | other>
Source docs:
- `<path>`

Deliverables:
- <specific output>

Acceptance criteria:
- <observable requirement>

Validation:
- <tool, command, or manual evidence>

Risks:
- <risk and mitigation>
```
