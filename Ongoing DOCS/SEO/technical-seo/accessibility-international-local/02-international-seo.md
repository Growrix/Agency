# International SEO

Document status: active module

## Purpose

Define how multilingual, multiregional, and localized URL strategies should be planned and validated.

## Scope

Covers locale routing, hreflang, language alternates, canonical rules, translations, regional content, currency, country targeting, and localized sitemaps.

## Business Value

International SEO helps the right audience discover the right regional or language version while reducing duplicate-content confusion.

## Dependencies

- `architecture/02-information-architecture-url-strategy.md`
- `on-page/03-canonicals-indexability.md`
- `on-page/04-crawlability-robots-sitemaps.md`

## Concepts

- Hreflang connects equivalent pages across language or region versions.
- Canonicals should usually be self-referential within each localized equivalent page.
- Translation quality affects user trust and search performance.

## Architecture

Choose one locale URL strategy and apply it consistently: subdirectories, subdomains, or separate domains.

## Best Practices

- Use stable locale codes and documented fallback behavior.
- Keep hreflang reciprocal and complete.
- Localize metadata, headings, content, currency, units, and support details where needed.
- Use localized sitemaps for large sites.

## Common Mistakes

- Canonicalizing all language versions to one language.
- Missing reciprocal hreflang links.
- Mixing machine translation with no QA.
- Redirecting users by IP in a way that blocks crawlers.

## Validation Rules

- Localized equivalents must include correct self-canonical and hreflang alternates.
- Hreflang targets must return 200 and be indexable.
- Language routes must not expose incomplete translations as indexable pages.

## Testing Strategy

Crawl locale groups, validate hreflang reciprocity, inspect canonicals, test sitemap alternates, and review localized metadata/content.

## Monitoring

Monitor international targeting reports, indexed locale pages, hreflang errors, and traffic by region/language.

## Maintenance

Update locale sets when new languages, countries, currencies, or regional product/service availability changes.

## Future Enhancements

- Add locale readiness checklist.
- Add translation QA workflow.

## Related Documents

- `on-page/01-metadata.md`
- `on-page/03-canonicals-indexability.md`
- `checklists/01-prelaunch-checklist.md`

## References

- Google localized versions and hreflang documentation.
- BCP 47 language tag guidance.
