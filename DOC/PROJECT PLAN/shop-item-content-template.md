---
document_type: cms-content-template
content_type: shop-item
status: active
last_updated: 2026-04-30
---

# Shop Item Content Template

## Purpose
- Use this template to prepare a complete `shopItem` entry before filling Sanity CMS.
- Keep output human-readable and AI-friendly.
- Every field below maps to the current Studio schema and product slug page.

## Writing Rules
- Keep names specific and commercially clear.
- Keep slugs lowercase and hyphen-separated.
- Use real preview links when available.
- Main image should be a real screenshot of the product/template, not a random stock image.
- Highlights should be short key-value proof points.

## Copy Template

```yaml
name: "Three Circles - Interior Designer company website"
slug: "three-circles-interior-designer-company-website"
price: "$999"
livePreviewUrl: "https://three-circles-demo.vercel.app"
categoryLabel: "Interior Designer Company"
categorySlug: "interior-designer-company"
type: "SaaS"
typeSlug: "saas"
industry: "Service"
industrySlug: "service"
tag: "New"
published: true
featuredRank: 10
rating: 4.9
reviewCount: "128"
salesCount: "34"
teaser: "A premium website template for interior design businesses that want a modern, elegant, trust-building online presence."
summary: "Built for interior design studios, boutique agencies, and premium service businesses that need a polished website with strong visual storytelling, service sections, portfolio-ready blocks, and conversion-focused contact flows."
audience: "Interior design studios, boutique agencies, premium home styling brands"
previewVariant: "marketing"
includes:
  - "Homepage design"
  - "About page"
  - "Services page"
  - "Portfolio/gallery blocks"
  - "Contact and lead form"
  - "CMS setup guidance"
stack:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
  - "Sanity CMS"
  - "Vercel"
highlights:
  - label: "Pages"
    value: "12"
  - label: "Setup time"
    value: "2 hrs"
  - label: "Best for"
    value: "Luxury brands"
mainImage:
  instruction: "Upload a real homepage or full-screen template screenshot in Sanity"
mainImageAlt: "Homepage screenshot of the Three Circles interior designer website template"
```

## Field Intent Guide
- `name`: Full public product title.
- `slug`: Public URL key.
- `price`: Visible selling price.
- `livePreviewUrl`: Real external demo URL opened from the product page.
- `categoryLabel`: Human-readable category text.
- `categorySlug`: Filter-safe category key.
- `type`: Product type shown beside category.
- `typeSlug`: Filter-safe type key.
- `industry`: Human-readable industry label.
- `industrySlug`: Filter-safe industry key.
- `tag`: Optional badge like `New`, `Best Seller`, `Bundle`.
- `published`: Whether the product is visible publicly.
- `featuredRank`: Smaller number means higher prominence.
- `teaser`: First short explanation on slug page.
- `summary`: Broader product overview.
- `audience`: Used in the `Ideal for` panel.
- `previewVariant`: Fallback mock preview only when no real image exists.
- `includes`: Actual deliverables.
- `stack`: Tech/platform list.
- `highlights`: Small facts shown in the `At a glance` section.
- `mainImage`: Real visual preview.
- `mainImageAlt`: Accessibility fallback text.

## AI Prompt Hint
Use this instruction when asking an AI to generate a new shop item:

```text
Create a complete Growrix OS shop item entry using the project template in DOC/PROJECT PLAN/shop-item-content-template.md. Output all fields with realistic commercial copy, clean slugs, 3 highlights, 5-7 includes, 4-6 stack items, and a real-looking preview URL placeholder.
```
