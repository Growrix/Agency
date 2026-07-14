# Site Architecture

Document status: active module

## Purpose

Define how a website is structured so users and crawlers can discover important pages efficiently.

## Scope

Covers route hierarchy, site depth, hub pages, templates, crawl paths, content ownership, and architectural constraints for new builds and audits.

## Business Value

Strong architecture improves crawl efficiency, index coverage, topical authority, conversion paths, and long-term maintainability.

## Dependencies

- `architecture/02-information-architecture-url-strategy.md`
- `architecture/03-nextjs-rendering-strategy.md`
- `on-page/05-internal-linking-navigation.md`

## Concepts

- Important pages should be reachable through stable navigation and contextual links.
- Architecture should reflect business priorities and search intent.
- Route depth should be intentional, not accidental.

## Architecture

```text
Home -> hubs -> category/collection pages -> detail pages -> support/content pages
```

## Best Practices

- Create hub pages for major topics, services, products, or locations.
- Keep critical pages within a few clicks from the home page or relevant hubs.
- Align templates with search intent and conversion goals.
- Avoid orphan pages unless intentionally private or excluded.

## Common Mistakes

- Creating pages without inbound internal links.
- Allowing CMS content types to generate uncontrolled public routes.
- Treating navigation as design only, not crawl architecture.

## Validation Rules

- Every indexable URL must have a documented route type and internal-link source.
- Important pages must not be orphaned.
- Private, duplicate, or low-value routes must be excluded or canonicalized.

## Testing Strategy

Run a crawl, inspect depth, review orphan URLs, compare sitemap URLs with internal links, and validate that route templates expose crawlable HTML.

## Monitoring

Monitor crawl depth, orphan URLs, indexed pages by template, and changes in organic landing page distribution.

## Maintenance

Review architecture when adding new content types, marketplaces, filters, language versions, or large route groups.

## Future Enhancements

- Add route scoring by revenue, intent, crawl priority, and content freshness.
- Add architecture diagrams for site-specific projects.

## Related Documents

- `architecture/02-information-architecture-url-strategy.md`
- `on-page/04-crawlability-robots-sitemaps.md`
- `testing-auditing/02-audit-playbook.md`

## References

- Google Search Central site structure guidance.
- Information architecture best practices.
