# SEO Checklist

Target: Lighthouse SEO 100.

## Head

- [ ] `<title>` 50–60 chars: primary keyword + brand (e.g. "Acme — Project Management for Remote Teams")
- [ ] `<meta name="description">` 140–160 chars, compelling, includes the value proposition
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<meta name="robots" content="index, follow">`
- [ ] `<link rel="canonical" href="https://example.com/">` with a `<!-- TODO(client): replace domain -->` comment — the ONLY allowed TODO in a delivered file
- [ ] Open Graph: `og:title`, `og:description`, `og:type` (website), `og:url`, `og:image`
- [ ] Twitter: `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`
- [ ] `theme-color` meta for light and dark (`media="(prefers-color-scheme: ...)"`)
- [ ] Favicon present (inline SVG data URI)

## Structured data (JSON-LD)

- [ ] Always: `Organization` (name, url, logo) and/or `WebSite`
- [ ] By site type:
  - Local business / restaurant → `LocalBusiness`/`Restaurant` (address, hours, phone, geo)
  - SaaS / product → `Product` or `SoftwareApplication` (offers with price)
  - Agency / services → `ProfessionalService` + `Service`
  - FAQ section exists → `FAQPage` with each Q/A
  - Portfolio/person → `Person`
- [ ] JSON-LD validates (no trailing commas, correct `@context`/`@type`)

## Content

- [ ] Single `<h1>` containing the primary value proposition
- [ ] Logical heading hierarchy mirrors the section structure
- [ ] Descriptive anchor text (no "click here" / "learn more" without context)
- [ ] `alt` text on meaningful images describes content, not "image of..."
- [ ] External links: `rel="noopener"` with `target="_blank"`
- [ ] Internal anchors (`#features`, `#pricing`) match nav links exactly
- [ ] Real, keyword-aware copy — never lorem ipsum
