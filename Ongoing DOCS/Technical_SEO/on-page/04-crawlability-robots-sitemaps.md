# Crawlability Robots And XML Sitemaps

Document status: active module

## Purpose

Define how crawlers discover allowed content and avoid blocked or low-value areas.

## Scope

Covers crawlability, robots.txt, robots meta, XML sitemaps, sitemap indexes, lastmod, staging protection, private paths, and crawl diagnostics.

## Business Value

Good crawl controls help search engines find valuable pages faster and avoid wasting crawl resources on private, duplicate, or low-quality URLs.

## Dependencies

- `on-page/03-canonicals-indexability.md`
- `architecture/01-site-architecture.md`
- `devops-observability/02-monitoring-logging-observability.md`

## Concepts

- Robots.txt controls crawl access, not guaranteed indexing removal.
- XML sitemaps should include canonical, indexable, valuable URLs.
- Internal links and sitemaps should reinforce the same important URLs.

## Architecture

```text
robots.txt -> crawler access rules
xml sitemap -> canonical URL discovery
robots meta -> page-level index controls
internal links -> crawl priority and context
```

## Best Practices

- Keep robots.txt simple and environment-aware.
- Exclude admin, account, checkout, internal search, preview, and staging paths.
- Generate sitemaps from canonical content sources.
- Split large sitemaps by route type when useful.

## Common Mistakes

- Blocking CSS/JS needed for rendering.
- Including redirected, noindex, 404, or duplicate URLs in sitemaps.
- Forgetting to block staging from indexing.
- Using robots.txt to hide sensitive data instead of access control.

## Validation Rules

- Sitemap URLs must return 200, be indexable, and self-canonical or canonical-consistent.
- Robots.txt must not block required render assets.
- Staging must be protected from indexing.

## Testing Strategy

Fetch robots.txt, validate sitemap XML, crawl sitemap URLs, compare with canonical tags, and inspect Search Console sitemap reports.

## Monitoring

Monitor sitemap errors, submitted vs indexed ratios, blocked resource warnings, and crawl stats.

## Maintenance

Regenerate sitemaps after content changes and review robots rules after route or environment changes.

## Future Enhancements

- Add automated sitemap health checks.
- Add environment-specific robots validation.

## Related Documents

- `on-page/05-internal-linking-navigation.md`
- `architecture/04-migration-maintenance.md`
- `checklists/01-prelaunch-checklist.md`

## References

- Google robots.txt documentation.
- Sitemaps.org protocol.
