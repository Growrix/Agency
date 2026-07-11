# Page Archetype Rules

Defines the required **user-experience outcomes** per page kind, and the section composition requirements every per-page spec must satisfy. The `page_planner` uses this as a minimum outcome checklist — not a template.

## HOW TO READ THIS FILE

**Section names are UX outcomes, not component names.**
- `"Hero"` means: the user immediately understands what the business does and has a clear first action. It does NOT mean use a component called `HeroSection`.
- `"Proof"` means: the user sees believable social or data evidence. It does NOT mean use a component called `TestimonialSection`.
- The developer owns component naming and composition. The planner owns outcomes and visual contracts.

**Composition must be differentiated.**
Every public route MUST produce a visually distinct hero composition. The planner MUST explicitly describe the layout split, media framing, and typographic hierarchy in each page spec's visual contract — these must differ across routes.

**Templates are starting floors, not ceilings.**
These section lists are the minimum required experiences. The planner MUST enrich, reorder, or combine sections based on the brief and visual archetype. Reducing a brief to fit these lists is a planning failure.

## Page composition contract (every page)

Every page spec MUST declare:

1. Page identity: `route`, `name`, `archetype`, `auth: public|protected`, `data_source` per section.
2. Sections in **visual order**, each with:
   - section name (expressive, outcome-describing — not a generic component class)
   - purpose (1 line — what the user understands or does after this section)
   - content keys consumed (from `<output_root>/content-library.md`)
   - visual composition (layout split, asymmetry, full-bleed, staggered grid — must be unique per hero)
   - interactions (per `interaction-planner` output)
   - states (loading / empty / error / success / not-found as applicable)
   - responsive adaptation (desktop / tablet / mobile)
   - motion signature (trigger, target, effect, framer-motion variant name or CSS approach — no vague notes)
3. SEO block: title, description, og:title, og:description, og:image, canonical, schema.org JSON-LD where applicable.
4. Conversion path: primary path, secondary path, exit points.
5. Accessibility notes specific to this page.
6. Performance notes (LCP target, image weight budget).

If any of the above is missing, the spec is invalid and the reviewer rejects it (constraint **F7**).

## Required outcomes per page archetype

> Section labels below describe the user experience outcome. Page planner MUST translate each into a concrete visual composition with unique layout, content, and motion per the project brief and visual archetype.

### Home (any project archetype)
1. **Navigation** — user can reach any primary surface; trust signal visible in nav (phone/CTA)
2. **Hero** — user immediately grasps the core value proposition; clear primary CTA; hero composition must differ from all other routes (visual contract required)
3. **Value proposition** — user understands 3–5 distinct capabilities or differentiators; NOT a generic bullet list
4. **Social proof / trust** — user sees evidence (reviews, ratings, case studies, certifications, partner logos)
5. **Process or story** — user understands how the service works or why this company is credible
6. **Conversion nudge** — user has a low-friction next action (quote, booking, contact, demo)
7. **Footer** — user can find contact, legal, sitemap, social links
Recommended: urgency/offer ribbon, AI/chat surface, blog/insights teaser, FAQ, final CTA band.

### Service overview (marketing_site / professional_services)
1. **Navigation** — (shared, as above)
2. **Service hero** — intent-specific headline tied to the service category; distinct composition from Home hero
3. **Service grid** — scannable set of service offerings with clear value per item; visual treatment must feel like a catalog, not a bulleted list
4. **Differentiators** — what makes this company better; concrete, evidence-backed, not generic marketing copy
5. **Process or engagement model** — how to engage, onboard, or get started
6. **Social proof** — service-specific testimonials or case study teaser
7. **Conversion** — primary CTA for this service category
8. **Footer**

### Service detail (marketing_site)
1. **Navigation**
2. **Service-specific hero** — distinct layout from service overview; deeper dive into a single service
3. **What's included** — deliverables or scope; visual treatment should feel substantive (not minimal)
4. **How it works** — step-by-step or timeline; must feel like a journey, not a list
5. **Pricing or quote-driven CTA** — price anchor or calculator or "get a quote" flow
6. **Proof** — testimonial or case study specific to this service
7. **FAQ / objection handling** — addresses the top 5 purchase hesitations
8. **Final CTA**
9. **Footer**

### Product overview (ecommerce)
1. **Navigation** (with cart, search)
2. **Collection hero** — campaign or category; full-bleed or editorial treatment
3. **Filter + sort + browse** — interactive product grid with filter controls
4. **Featured collection or trust badges**
5. **Footer**

### Product detail (ecommerce)
1. **Navigation**
2. **Media gallery** — primary product imagery; multiple angles, zoom, or video
3. **Purchase block** — title, price, variants, add-to-cart CTA
4. **Description and details** — tabs or accordion: description, materials, shipping, returns
5. **Reviews** — authentic social proof with ratings
6. **Recommendations** — related products
7. **Footer**

### Cart / Checkout (ecommerce / marketplace)
1. **Minimal navigation** (logo only during checkout)
2. **Order summary**
3. **Shipping address form**
4. **Payment** (Stripe handoff)
5. **Trust strip** (secure checkout, returns policy)
6. **Minimal footer**

### Pricing (saas_app / marketing_site)
1. **Navigation**
2. **Pricing hero** — clear positioning statement; billing toggle if applicable
3. **Plan tiers** — visual comparison of plans; must feel like a decision surface, not a table dump
4. **Feature comparison** — detailed breakdown; scannable
5. **FAQ** — addresses billing, cancellation, limits
6. **Final CTA**
7. **Footer**

### About (any)
1. **Navigation**
2. **Mission or origin hero** — emotionally resonant; distinct composition from Home
3. **Story / approach** — narrative content; not bullet points
4. **Team** — human faces + names; trust-building
5. **Values** — concrete, not generic ("Integrity", "Excellence" without examples is forbidden)
6. **Social proof** — press mentions, awards, certifications
7. **CTA**
8. **Footer**

### Contact (any)
1. **Navigation**
2. **Contact hero** — clear "how to reach us" statement; must present multiple channels visually
3. **Multi-channel contact block** — form + phone + email + WhatsApp/messaging as declared by brief; each channel must be visually distinct and actionable
4. **Map or address block** (if local business)
5. **Footer**

### FAQ (any)
1. **Navigation**
2. **FAQ hero**
3. **Categorized accordion** — questions grouped by theme; smooth open/close motion
4. **Still-have-questions CTA**
5. **Footer**

### Blog index (content_site / saas_app / marketing_site)
1. **Navigation**
2. **Featured or latest hero** — editorial treatment; not a plain h1
3. **Category filter strip** — interactive
4. **Article grid** — card layout with preview image, title, excerpt, date, author
5. **Newsletter CTA**
6. **Footer**

### Blog detail
1. **Navigation**
2. **Article hero** — title, date, author, cover image; typographically rich
3. **Article body** — long-form rich text with proper heading hierarchy, pullquotes, code blocks if applicable
4. **Author bio**
5. **Related articles**
6. **Newsletter or final CTA**
7. **Footer**

### Sign-in / Sign-up (saas_app / dashboard_tool / ecommerce-with-account)
1. **Minimal header** (logo only)
2. **Auth surface** — form with social auth options; clean, centered; trust copy visible
3. **Alternate path** (sign-up ↔ sign-in toggle)
4. **Trust strip** (compliance, security)
5. **Minimal footer**

### Onboarding (saas_app / dashboard_tool)
Multi-step. Each step:
- Step progress indicator (visual, not just text)
- One-task-per-step content
- Skip / next / back controls

### Dashboard (saas_app / dashboard_tool / marketplace)
1. **App shell** — TopBar + SidebarNavigation
2. **Summary header** — greeting + key metric tiles; animated count-up on load
3. **Primary panel** — per surface: queue, list, detail, chart
4. **Secondary panel** — recent activity / shortcuts
5. **Empty / loading / error states** for every panel

### Listing (marketplace / ecommerce)
1. **Navigation** (with search)
2. **Category hero or filter strip**
3. **Filter panel + listing grid** — interactive, responsive
4. **Trust strip** (verification, reviews)
5. **Footer**

### Listing detail (marketplace)
1. **Navigation**
2. **Media gallery** — images, 360, or video
3. **Purchase / contact block** — title, price, seller with verified badge, primary CTA
4. **Description / specs** — detailed information
5. **Reviews** — social proof
6. **Related listings**
7. **Footer**

### Case study (portfolio_site / professional_services)
1. **Navigation**
2. **Project hero** — image + title + role + year; editorial composition
3. **Context** — client, scope, team; sets up the narrative
4. **Problem** — clear problem statement; not marketing copy
5. **Approach** — methodology, process, decisions made
6. **Solution media** — gallery + annotation; show, don't just tell
7. **Outcome** — measurable results or testimonial
8. **Next-project navigator** — keeps the user in the portfolio
9. **Footer**

### Landing page (landing_page)
1. **Hero** — single CTA; maximum clarity, minimum noise
2. **Logo bar / social proof** — above the fold or immediately below hero
3. **Value** — 3 concrete benefits max; not generic features
4. **Demo or mid-page proof** — screenshot, video, or testimonial
5. **Mid-page CTA** — same primary action repeated
6. **FAQ** — max 6 items; addresses top hesitations only
7. **Final CTA** — same primary action, emotionally reinforced
8. **Minimal footer**

### 404
1. **Minimal header**
2. **"Page not found"** — clear headline + human sub-copy; no jargon
3. **Quick links** — top 3–5 destinations
4. **Search** (if applicable)
5. **Footer**

### Privacy / Terms / Legal
1. Minimal header
2. Title + last-updated date
3. Long-form content (CMS-backed if available)
4. Contact line
5. Footer

## Mandatory utility surfaces

Independent of archetype, every site MUST plan:

- Utility ribbon (optional but reserved slot for trust / promo)
- Sticky mobile CTA (where archetype calls for it; e.g., `local-business-trust` mandates it)
- Cookie consent banner (where compliance requires)
- Accessibility skip link (every page)

## Section minimum count rule (constraint F2)

Every public page MUST declare ≥7 sections (header, hero, value, proof, conversion, supporting, footer). Pages where this does not apply (404, legal, narrow utility pages) are exempt and explicitly marked `min_sections_exempt: true` with reason.

## Conversion path declaration

Every page spec MUST declare:
- `primary_path`: ordered surfaces from this page to the primary CTA conversion.
- `secondary_path`: ordered alternative.
- `exit_points`: legitimate next destinations even if not converting.

## Output

The page_planner emits one Markdown file per route under `<output_root>/pages/<route-slug>.md` using the per-page spec template at `execution/spec-rules/per-page-spec.md`.

`<output_root>` MUST resolve to `DOC/output/runs/<timestamp>/planning/frontend`.
