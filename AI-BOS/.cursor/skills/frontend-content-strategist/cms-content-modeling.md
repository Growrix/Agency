# CMS Content Modeling

For Growrixos `web/` (Sanity) and `Frontend_Nextjs/` (JSON repository pattern).

## Repository pattern fields

Propose schemas in `content/content-model.json`:

```json
{
  "collections": {
    "pages": {
      "fields": ["slug", "title", "description", "sections"]
    },
    "blogPosts": {
      "fields": ["slug", "title", "excerpt", "body", "publishedAt", "seo"]
    }
  }
}
```

## Rules

- Copy lives in content layer — components consume typed loaders
- Repeatable section models: hero, features, testimonials, faq, cta
- SEO object nested: `{ title, description, ogImage }`
- Locale-ready field names when multi-language possible

## Sanity alignment (web/)

When planning for Growrix OS:

- Document schema names matching studio types
- Note portable text vs plain string fields
- Flag admin-only vs public fields

## Handoff to implementer

CONTENT-BRIEF references exact JSON paths:

```text
content/homepage.json → sections[0].headline
```

Senior frontend specialist wires loaders — content strategist does not write TSX.
