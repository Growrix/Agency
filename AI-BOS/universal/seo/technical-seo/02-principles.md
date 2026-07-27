# Technical SEO Principles

Document status: principle source
Last updated: 2026-07-12

## Purpose

Define the principles that guide every Technical SEO decision in this handbook.

## Scope

These principles apply to new builds, migrations, audits, optimizations, CI/CD gates, monitoring, and AI-assisted implementation.

## Business Value

Principles keep SEO work consistent across teams and prevent short-term fixes that damage crawlability, indexability, performance, accessibility, or trust.

## Dependencies

- `README.md`
- `00-documentation-map.md`
- `rules/01-technical-seo-rules.md`

## Concepts

- Search engines need accessible URLs, renderable content, clear metadata, stable canonicals, reliable internal links, and fast pages.
- Users and crawlers both benefit from predictable architecture, resilient performance, and clean error handling.
- SEO quality must be tested and monitored like any other production quality gate.

## Architecture

The principles sit above all domain documents and resolve conflicts when guidance is unclear:

1. Make important content discoverable.
2. Make important content renderable.
3. Make the preferred URL unambiguous.
4. Make performance measurable.
5. Make quality enforceable in CI/CD.
6. Make production drift observable.

## Best Practices

- Prefer simple, stable URL structures.
- Prefer server-rendered or statically generated critical content for public SEO pages.
- Keep metadata unique, accurate, and generated from a reliable content source.
- Use structured data only when visible content supports it.
- Treat redirects, canonicals, robots, and sitemaps as one connected system.

## Common Mistakes

- Hiding primary content behind client-only rendering.
- Publishing many thin or duplicated indexed URLs.
- Shipping route changes without redirect and sitemap updates.
- Optimizing Lighthouse scores while ignoring crawl and index signals.

## Validation Rules

- Public indexable routes must return crawlable HTML, valid metadata, and correct canonical signals.
- SEO-impacting changes require a route sample, validation method, and monitoring plan.
- Mandatory rules in this suite are release gates unless a documented exception exists.

## Testing Strategy

Combine automated checks with manual review: crawler output, rendered HTML, Search Console, structured data validation, Lighthouse, logs, and route-level smoke tests.

## Monitoring

Monitor organic landing pages, impressions, clicks, indexed pages, crawl errors, Core Web Vitals, redirects, and server error rates.

## Maintenance

Review principles before introducing new route patterns, rendering modes, CMS models, CDN changes, or migration plans.

## Future Enhancements

- Add project-specific SEO maturity scoring.
- Add route-type-specific principle overlays for ecommerce, SaaS, blogs, portfolios, and documentation sites.

## Related Documents

- `architecture/01-site-architecture.md`
- `on-page/03-canonicals-indexability.md`
- `performance/01-core-web-vitals.md`
- `execution/tasks.md`

## References

- Google Search Essentials.
- Next.js rendering documentation.
- web.dev Core Web Vitals documentation.
