# Next.js Rendering Strategy

Document status: active module

## Purpose

Define rendering choices for SEO-critical routes in modern Next.js App Router projects.

## Scope

Covers static generation, server rendering, incremental regeneration, dynamic rendering, streaming, client components, metadata generation, and crawler-visible HTML.

## Business Value

Correct rendering ensures important content is visible to crawlers and users while preserving performance and freshness.

## Dependencies

- `on-page/01-metadata.md`
- `media/02-video-font-css-javascript-seo.md`
- `performance/01-core-web-vitals.md`

## Concepts

- SEO-critical content should be present in initial or reliably rendered HTML.
- Client components are useful for interactivity but should not hide primary indexable content.
- Rendering strategy is a route-level decision.

## Architecture

| Route type | Preferred rendering |
| --- | --- |
| Home and evergreen marketing pages | Static or ISR |
| Product/service/detail pages | Static/ISR when content source allows |
| Search result pages | Usually noindex or controlled SSR |
| Personalized dashboards | Authenticated dynamic rendering, not SEO indexable |
| Admin routes | Noindex/private |

## Best Practices

- Use server components for primary content where possible.
- Generate metadata from the same content source as the page.
- Use caching and revalidation intentionally.
- Keep client-only rendering for enhancements, not required SEO content.

## Common Mistakes

- Shipping blank HTML shells for public pages.
- Using dynamic rendering for all pages without cache strategy.
- Forgetting metadata on dynamic routes.
- Indexing app or dashboard pages that require authentication.

## Validation Rules

- Representative public routes must expose meaningful rendered HTML.
- Metadata must resolve correctly for dynamic routes.
- Private routes must not be indexable.

## Testing Strategy

Inspect rendered HTML, run crawler rendering checks, compare no-JavaScript output, validate metadata, and test route cache/revalidation behavior.

## Monitoring

Monitor render errors, cache misses, stale content, server latency, and route-level organic performance.

## Maintenance

Review rendering strategy when data freshness, CMS behavior, route count, or personalization changes.

## Future Enhancements

- Add route-level rendering decision records.
- Add automated rendered HTML snapshots for SEO-critical routes.

## Related Documents

- `performance/02-caching-cdn-edge.md`
- `devops-observability/01-ci-cd-deployment-gates.md`
- `testing-auditing/01-testing-strategy.md`

## References

- Next.js App Router rendering documentation.
- Google JavaScript SEO guidance.
