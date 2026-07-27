# SEO Content Structure

## Per-route requirements

| Field | Rule |
|-------|------|
| `<title>` | Unique; brand + page intent; ~50–60 chars |
| `meta description` | Unique; benefit-led; ~150–160 chars |
| `canonical` | Planned when multi-domain |
| Open Graph | title, description, type, image alt text |
| Twitter card | summary_large_image when hero image exists |
| JSON-LD | Organization, WebSite, or page-specific (FAQ, Product, Article) |

## Heading hierarchy

- One `h1` per view
- Logical `h2` → `h3` without skips
- Keywords in headings only when natural

## Content for crawlers

- Meaningful link text (no "click here")
- Alt text for informative images
- Visible contact/business info for local/service sites

## Deliverable format in CONTENT-BRIEF

```markdown
## Route: /services/solar

- title:
- description:
- ogTitle:
- jsonLd: LocalBusiness | Service
- h1:
- primaryKeyword (optional):
```

Implementation copies into `content/*.json` or CMS fields — not hardcoded in TSX long-term.
