# Suggested Text Changes — Approval Queue

Document status: **IMPLEMENTED — all approved items applied 2026-07-16**
Last updated: 2026-07-16
Project / lane: `web/`
Agent: On_Page_SEO_expert

---

**Instructions:** Review each row. Reply with approved item IDs (e.g. `TXT-001, TXT-003`) or "approve all". MCP-related items have been implemented per user instruction; TXT-011, TXT-013, and TXT-022 are kept as-is. No other copy will be changed until explicitly approved.

## Summary

| Category | Items | Priority |
| --- | --- | --- |
| Title tags | 8 | P1 |
| Meta descriptions | 5 | P1 |
| H1 / hero copy | 3 | P1 |
| Body / section copy | 4 | P2 |
| Nav / IA labels | 1 | P2 |

---

## Title Tags

### [TXT-001] Homepage `/`

| Field | Value |
| --- | --- |
| Current | `Agency for Websites, SaaS Applications, Mobile Apps, Automations` (+ template → `\| Growrix OS`) |
| Suggested | `Custom Website & SaaS Development Agency` |
| Chars | ~42 (+ brand template) |
| Rationale | Lead-gen focus; remove keyword stuffing and secondary "Automations" |
| File | `web/src/lib/seo-metadata.ts` → `HOME_SHARE_TITLE` |

### [TXT-002] Homepage meta description

| Field | Value |
| --- | --- |
| Current | Growrix OS is an agency specializing in websites, SaaS applications, mobile apps, and automation systems for ambitious teams. |
| Suggested | Founder-led studio for custom websites, SaaS products, and mobile apps. Production-ready delivery with transparent pricing and post-launch support. |
| Chars | ~154 |
| File | `web/src/lib/seo-metadata.ts` → `HOME_SHARE_DESCRIPTION` |

### [TXT-003] Services index `/services`

| Field | Value |
| --- | --- |
| Current title | (via `services/page.tsx`) — includes GrowrixOS in description |
| Suggested title | `Web Development Services — Websites, SaaS & Apps` |
| Suggested meta | Compare custom website, SaaS, and mobile app development paths. Book a strategy call to choose the right engagement model. |
| File | `web/src/app/services/page.tsx` |

### [TXT-004] Pricing `/pricing`

| Field | Value |
| --- | --- |
| Suggested title | `Pricing — Websites, SaaS & Custom Builds` |
| Suggested meta | Transparent ranges for website templates, ready-to-launch sites, and custom website, SaaS, and mobile app development. |
| File | `web/src/app/pricing/page.tsx` |

### [TXT-005] Digital products `/digital-products` (implemented)

| Field | Value |
| --- | --- |
| Current meta | Mentions "MCP kits" |
| Action | MCP references removed from product/shop metadata and descriptions |
| Suggested meta | Browse production-ready website templates, HTML business profiles, and starter kits. Standard, Premium, and Done-For-You tiers. |
| Rationale | MCP is no longer in the service offering |
| File | `web/src/app/shop/page.tsx`, `web/src/lib/product-led-content.ts` |

### [TXT-006] Service detail title pattern

| Field | Value |
| --- | --- |
| Current | `${service.title} Service` |
| Suggested | `{Service} Development — Growrix OS` e.g. `Custom Website Development`, `SaaS Application Development` |
| File | `web/src/app/services/[slug]/page.tsx` → `generateMetadata` |

### [TXT-007] About `/about`

| Field | Value |
| --- | --- |
| Current title | `About \| Founder-Led Product Studio` |
| Suggested title | `About — Founder-Led Web & SaaS Studio` |
| File | `web/src/app/about/page.tsx` |

### [TXT-008] Additional services `/additional-services`

| Field | Value |
| --- | --- |
| Current title | `SEO Service \| SEO Setup, Analytics & Technical Optimization` |
| Suggested title | `SEO & Analytics Setup — One-Time Technical Package` |
| Rationale | Differentiate from `/services/technical-seo` ongoing service positioning |
| File | `web/src/app/additional-services/page.tsx` |

---

## Hero & H1 Copy

### [TXT-010] Homepage hero badge

| Field | Value |
| --- | --- |
| Current | Productized SaaS studio + digital marketplace |
| Suggested | Founder-led web, SaaS & mobile app studio |
| File | `web/src/lib/home-conversion-content.ts` → `HOME_HERO_COPY.badge` |

### [TXT-011] Homepage hero headline — KEEP AS-IS

| Field | Value |
| --- | --- |
| Current | Launch faster. / Scale smarter. / Grow with confidence. |
| Decision | **Keep as-is** — user rejected change |
| Rationale | User prefers current headline |
| File | `web/src/lib/home-conversion-content.ts` → `HOME_HERO_COPY.titleLines` + `titleAccent` |

### [TXT-012] Homepage hero description

| Field | Value |
| --- | --- |
| Current | Access production-ready systems, powerful digital products, and expert growth support — all in one place. |
| Suggested | Custom websites, SaaS products, and mobile apps — from strategy through launch. Or start faster with our ready-made templates. |
| File | `web/src/lib/home-conversion-content.ts` → `HOME_HERO_COPY.description` |

### [TXT-013] Homepage primary CTA — KEEP AS-IS

| Field | Value |
| --- | --- |
| Current | Browse Digital Products → `/digital-products` |
| Decision | **Keep as-is** — user rejected change |
| Rationale | User prefers current primary CTA |
| File | `web/src/lib/home-conversion-content.ts` → `HOME_HERO_COPY.primaryCta*` |

---

## Body & Section Copy

### [TXT-020] Blog landing hero (implemented)

| Field | Value |
| --- | --- |
| Current | References MCP servers in description |
| Action | MCP references removed from blog landing descriptions |
| Suggested | Field notes on building websites, SaaS products, and mobile apps with Next.js, React, and modern stacks. |
| File | `web/src/lib/blog-landing-content.ts`, `web/src/app/blog/page.tsx` |

### [TXT-021] Product index merchandising copy (implemented)

| Field | Value |
| --- | --- |
| Current | References MCP kits |
| Action | MCP references removed from product-led copy |
| Suggested | Emphasize website templates, HTML business profiles, and ready websites |
| File | `web/src/lib/product-led-content.ts` |

### [TXT-022] Homepage AI concierge section — KEEP AS-IS

| Field | Value |
| --- | --- |
| Current | Prominent `HOME_AI_COPY` section on homepage |
| Decision | **Keep as-is** — user rejected change |
| Rationale | User prefers current AI concierge section placement |
| File | `web/src/lib/homepage-composition.ts`, `home-conversion-content.ts` |

### [TXT-023] Contact channel label

| Field | Value |
| --- | --- |
| Current | Instant Answers → Ask AI GrowrixOS |
| Suggested | Quick answers → AI assistant (link to `/ai-concierge`) |
| File | `web/src/lib/contact-landing-content.ts` |

### [TXT-024] Free / Bundles page H1 text (optional polish)

| Field | Value |
| --- | --- |
| Current H1 | Free products / Product bundles |
| Suggested H1 | Free Website Templates & Starters / Website Template Bundles |
| Note | Structural H1 already fixed (`as="h1"`); this is copy-only polish |
| Files | `digital-products/free/page.tsx`, `digital-products/bundles/page.tsx` |

---

## Nav & IA Labels

### [TXT-030] Footer Support — AI concierge

| Field | Value |
| --- | --- |
| Current | Removed from footer (non-text fix applied) |
| Suggested | Keep removed OR add under collapsed "Tools" with label "AI Assistant" |
| File | `web/src/lib/nav.ts` |

### [TXT-031] MCP service catalog entry — ELIMINATED

| Field | Value |
| --- | --- |
| Current | Full `mcp-servers` service in `content.ts` |
| Decision | **Eliminated** — MCP servers no longer in service offering |
| Action | MCP service entry, default products, portfolio project, and marketing copy references removed from codebase |
| File | `web/src/lib/content.ts`, `web/src/app/services/[slug]/page.tsx`, `web/src/server/domain/catalog.ts`, `web/src/lib/shop.ts`, `web/src/lib/site-images.ts`, `web/src/lib/faq-content.ts`, etc. |

---

## Approval Log

| Item ID | Status | Approved by | Date |
| --- | --- | --- | --- |
| TXT-001 | Implemented | User approved | 2026-07-16 |
| TXT-002 | Implemented | User approved | 2026-07-16 |
| TXT-003 | Implemented | User approved | 2026-07-16 |
| TXT-004 | Implemented | User approved | 2026-07-16 |
| TXT-005 | Implemented | User directive | 2026-07-16 |
| TXT-006 | Implemented | User approved | 2026-07-16 |
| TXT-007 | Implemented | User approved | 2026-07-16 |
| TXT-008 | Implemented | User approved | 2026-07-16 |
| TXT-010 | Implemented | User approved | 2026-07-16 |
| TXT-011 | Keep as-is | User rejected | 2026-07-16 |
| TXT-012 | Implemented | User approved | 2026-07-16 |
| TXT-013 | Keep as-is | User rejected | 2026-07-16 |
| TXT-020 | Implemented | User directive | 2026-07-16 |
| TXT-021 | Implemented | User directive | 2026-07-16 |
| TXT-022 | Keep as-is | User rejected | 2026-07-16 |
| TXT-023 | Implemented | User approved | 2026-07-16 |
| TXT-024 | Implemented | User approved | 2026-07-16 |
| TXT-030 | Keep removed | User approved | 2026-07-16 |
| TXT-031 | Eliminated | User directive | 2026-07-16 |

**After approval:** Hand off to `@frontend-content-strategist` for copy implementation, then `Technical_SEO_expert` for metadata validation.
