# Image and Media Optimization (Content Layer)

Document status: domain guide
Last updated: 2026-07-14

## On-Page Responsibilities

| Element | On-page recommendation | Technical delivery |
| --- | --- | --- |
| Alt text | Descriptive, intent-relevant for informative images | `alt` in markup, Next.js Image |
| File names | kebab-case descriptors | Asset pipeline |
| Captions | Context for diagrams, charts | HTML/CMS |
| Video transcripts | Summary + key points for indexable pages | Embed + optional transcript page |

## Alt Text Rules

- Decorative images: empty alt (`alt=""`) — confirm with a11y agent
- Informative: describe content and function, not "image of"
- Functional (icons with meaning): describe action

## Content SEO for Media

- Surrounding copy should reference the media topic
- Use descriptive H2 near media blocks
- Avoid placing sole keyword target only in alt text

## Handoff

Compression, formats (WebP/AVIF), lazy load, LCP → `Technical_SEO_expert` + `performance-optimizer`.

See also: `technical-seo/media/` for delivery standards.
