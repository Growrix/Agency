# On-Page SEO Implementation Brief (Non-Text)

Document status: active
Last updated: 2026-07-15
Project / lane: `web/`
Mode: Build Mode — **non-text implementation only**
Agent: On_Page_SEO_expert + Technical_SEO_expert

---

## Objective

Close technical on-page SEO gaps on Growrix OS without changing marketing copy. All title/meta/H1/body rewrites live in the separate **Suggested Text Changes** approval queue.

## Scope (URLs / sections)

### Implemented (2026-07-15)

| Area | File(s) | Change |
| --- | --- | --- |
| Metadata plumbing | `book-appointment/page.tsx`, `additional-services/page.tsx`, `refund-policy/page.tsx`, `ai-concierge/page.tsx`, `digital-products/free/page.tsx`, `digital-products/bundles/page.tsx` | Migrated to `buildPageMetadata()` |
| 404 noindex | `not-found.tsx` | `noIndex: true` via `buildPageMetadata` |
| Sitemap | `sitemap.ts` | Added `/additional-services`, `/privacy-policy`, `/terms-of-service` |
| H1 structure | `digital-products/free/page.tsx`, `digital-products/bundles/page.tsx` | `SectionHeading as="h1"` |
| Breadcrumb JSON-LD | `seo-structured-data.ts`, `blog/[slug]`, `services/[slug]`, `portfolio/[slug]`, `shop/[slug]` | `buildBreadcrumbListSchema()` |
| Catalog schema | `shop/page.tsx` | `CollectionPage` + `ItemList` |
| Category OG image | `digital-products/category/[category]/page.tsx` | `DEFAULT_OG_IMAGE` |
| Title duplication | `about`, `contact`, `faq`, `portfolio`, `blog`, `book-appointment` page metadata | Removed embedded brand suffix |
| Nav demotion | `nav.ts` | Removed `AI Growrix OS` from footer Support |

### Deferred (text — approval required)

See [`2026-07-15-growrixos-suggested-text-changes.md`](./2026-07-15-growrixos-suggested-text-changes.md).

## Keyword Map (reference)

| Page | Primary keyword | Intent |
| --- | --- | --- |
| `/` | web development agency | Commercial investigation |
| `/services/websites` | custom website development | Commercial investigation |
| `/services/saas-applications` | SaaS development agency | Commercial investigation |
| `/services/mobile-apps` | mobile app development agency | Commercial investigation |
| `/pricing` | web development pricing | Commercial investigation |
| `/book-appointment` | book web development consultation | Transactional |
| `/digital-products` | website templates | Transactional |

Full map: audit report § Keyword & Intent Map.

## Per-Page Specifications (non-text only)

### Homepage `/`

**Non-text actions (done / N/A):** Organization + WebSite JSON-LD already present.  
**Text actions:** Deferred — hero, title, meta, CTA copy in approval queue.

### Service detail `/services/[slug]`

**Non-text actions (done):** Service + FAQPage schema; BreadcrumbList JSON-LD added.  
**Text actions:** Deferred — title pattern `${service.title} Service` review in approval queue.

### Product detail `/digital-products/[slug]`

**Non-text actions (done):** Product + FAQPage schema; BreadcrumbList JSON-LD added.  
**Text actions:** Deferred — product names from CMS unchanged.

### Blog post `/blog/[slug]`

**Non-text actions (done):** BlogPosting + BreadcrumbList JSON-LD.  
**Text actions:** Deferred — CMS-controlled titles unchanged.

## Handoffs

| Task | Owner agent | Status |
| --- | --- | --- |
| Non-text metadata/schema/sitemap/nav | Technical_SEO_expert | Implemented |
| Suggested copy (titles, metas, H1, body) | frontend-content-strategist | Pending user approval |
| Post-approval metadata validation | Technical_SEO_expert | After approval |
| Off-page promotion | Off_Page_SEO_expert | Not in scope |

## Success Criteria

- [x] All indexable public routes use `buildPageMetadata()` or equivalent full OG/Twitter/canonical
- [x] 404 returns `noindex`
- [x] Sitemap includes legal + additional-services routes
- [x] Detail pages emit BreadcrumbList JSON-LD
- [x] `/digital-products/free` and `/bundles` have exactly one H1
- [ ] User approves suggested text changes document
- [ ] GSC URL inspection after deploy

## Validation

- [x] Titles/metas unique in codebase (structural dedup applied)
- [x] H1 present once per page (free/bundles fixed)
- [ ] `npm run health:check` exit 0
- [ ] GSC URL inspection after deploy
