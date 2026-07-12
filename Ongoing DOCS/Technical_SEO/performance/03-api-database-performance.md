# API And Database Performance

Document status: active module

## Purpose

Define backend performance requirements that affect SEO-critical rendering and user experience.

## Scope

Covers API latency, database queries, N+1 issues, indexing, connection pooling, SSR data fetching, caching, pagination, search endpoints, and error budgets.

## Business Value

Fast APIs and database queries improve render speed, Core Web Vitals, crawl reliability, conversion, and operational stability.

## Dependencies

- `performance/01-core-web-vitals.md`
- `performance/02-caching-cdn-edge.md`
- `architecture/03-nextjs-rendering-strategy.md`

## Concepts

- SEO pages often depend on backend data before HTML can render.
- Slow APIs can become slow LCP and crawl failures.
- Database indexing is part of Technical SEO when it affects public route performance.

## Architecture

SEO-critical reads should use optimized queries, bounded payloads, stable cache policy, and graceful fallback where possible.

## Best Practices

- Define latency budgets for SEO-critical APIs.
- Use pagination and field selection for large lists.
- Add indexes for route lookup fields such as slug, status, locale, and updated time.
- Cache expensive public reads safely.

## Common Mistakes

- Fetching excessive fields for page render.
- Running N+1 queries for listing pages.
- Using unbounded search or filters.
- Failing entire pages for optional data like recommendations.

## Validation Rules

- Public route APIs must meet latency and error-rate budgets.
- Database queries for route rendering must be indexed and bounded.
- Optional data failure must not break primary indexable content.

## Testing Strategy

Run API integration tests, query analysis, load tests for critical routes, and SSR timing checks.

## Monitoring

Monitor API latency, database slow queries, timeouts, 5xx rates, cache misses, and route render duration.

## Maintenance

Review performance after schema changes, new filters, CMS growth, data imports, or traffic increases.

## Future Enhancements

- Add query budgets per route template.
- Add automated slow-query regression alerts.

## Related Documents

- `performance/01-core-web-vitals.md`
- `devops-observability/02-monitoring-logging-observability.md`
- `testing-auditing/01-testing-strategy.md`

## References

- Database indexing documentation for the selected database.
- web.dev server response time guidance.
