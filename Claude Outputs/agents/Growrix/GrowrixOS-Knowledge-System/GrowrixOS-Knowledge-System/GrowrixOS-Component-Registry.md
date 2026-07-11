# GrowrixOS — Component Registry

**Version 1.0 · Reusable architecture, extracted from verified builds**

---

## Purpose

This registry catalogs the *structural* patterns (markup shape, class naming, behavior) that have proven out across builds — so the next build reuses proven architecture instead of reinventing it, while still inventing fresh visuals. Per the studio's own rule: **reuse architecture, never reuse aesthetics.**

Every pattern below was extracted from `BedrockConstruction.html` (Build 01) and cross-referenced where possible against the other four verified builds. Where only one build was checked in detail, that's noted — treat those entries as "proven once," not "proven across the portfolio," until cross-checked.

---

## 1. FAB Cluster (Floating Action Button)

**Status:** Verified, mandatory per `growrixos-master-instructions.html`.

**Structure:**
```
.fab-wrap (fixed-position container)
  .fab-opts (collapsible stack, toggled via aria-expanded)
    .fab-opt.top    → back-to-top
    .fab-opt.call   → tel: link
    .fab-opt.wa     → WhatsApp deep link
  .fab-main (the toggle button itself, aria-expanded tracked)
```

Each `.fab-opt` carries a `.fab-tip` span for a hover/focus label — this is the accessible-name pattern: icon-only buttons get a visible tooltip span, not just an `aria-label`, so sighted keyboard users get the same context as mouse users.

**Reuse rule:** keep the three-tier structure (top / call / WhatsApp) as the default contact cluster for local-service archetypes (Industrial Trust, Confident Utility, Technical Precision). For e-commerce or SaaS-flavored builds, the third slot can become "live chat" or "AI concierge" instead of WhatsApp — same architecture, different content.

---

## 2. Mobile Bottom Dock

**Status:** Verified (Build 01), mandatory (5 items, scroll-spy, hide-on-scroll per memory).

**Structure:**
```
nav.bottom-nav[aria-label="Mobile navigation"]
  a.bn-item.active  → Home (#top)
  a.bn-item[data-modal="..."]  → Services
  a.bn-item[data-modal="..."]  → secondary content (Projects/Portfolio/Shop)
  a.bn-item[data-modal="..."]  → tertiary content (Careers/About/Plans)
  a.bn-item[data-modal="..."]  → Contact
```

Each item pairs an inline SVG icon with a `<span>` label — never icon-only on the dock, which is correct for touch-target clarity and for screen readers that don't reliably announce SVG-only buttons.

**Reuse rule:** the 5-slot pattern (Home, Primary Offering, Secondary Offering, Trust/About, Contact) maps cleanly onto nearly every vertical in the 22-category masterplan. Swap icons and labels per industry; keep the slot count and scroll-spy/hide-on-scroll behavior fixed — this is exactly the kind of infrastructure that should NOT vary per build.

---

## 3. Navigation System

**Status:** Verified (Build 01).

**Structure:**
```
nav.navbar
  .nav-inner (max-width container)
    [logo/brand]
    .nav-links
      a.nav-link × N
    .nav-actions (CTA button + theme toggle live here)
```

**Reuse rule:** desktop nav stays in this shell across builds; what varies per archetype is (a) how many `.nav-link` items exist — Quiet Luxury archetypes tend toward fewer, more spaced links; Frictionless Commerce archetypes tend toward more, denser links — and (b) whether `.nav-actions` leads with a CTA button or a search/cart icon (commerce) vs. a phone number (local service).

---

## 4. Hero System

**Status:** Verified (Build 01) — one pattern confirmed; **Hero Lab (11 variations) referenced in memory but not yet available as a file to extract from.**

**Structure (Build 01 pattern):**
```
section.hero#top
  .hero-bg (background layer — gradient/canvas/WebGL target)
  .hero-ov (overlay, likely for contrast/readability over bg)
  .hero-grid (layout container)
    .hero-h1 (display headline)
    .hero-sub (supporting line)
    .hero-ctas.reveal (CTA group, IntersectionObserver-revealed)
```

**Reuse rule:** the `bg / overlay / grid(h1, sub, ctas)` skeleton is sound and should be the default hero shell. What must vary build-to-build: which procedural visual occupies `.hero-bg` (Three.js scene, Canvas2D pattern, CSS gradient mesh, SVG line art) — this is the single highest-leverage differentiation point in a build, since it's the first thing a visitor sees. **Action item:** once the Hero Lab file is available, extract its 11 variations into this section as named sub-patterns (e.g., "split-diagonal," "centered-mono," "video-style-canvas") so future builds can pick deliberately instead of defaulting to whatever was used last.

---

## 5. AI Concierge Modal

**Status:** Documented in memory as mandatory (~11-intent keyword-routed KB, typing delay); not independently extracted from source in this audit pass.

**Reuse rule (from memory + instruction doc cross-reference):** the modal shell, ESC/backdrop dismissal, slide-up animation, and typing-delay simulation are infrastructure — fixed across builds. The 11-intent knowledge base content is the only part that should be rewritten per brand (intents like "pricing," "service area," "booking," "warranty" map differently per archetype — a SaaS build's concierge needs intents like "pricing tiers," "free trial," "integrations" instead of "service area").

---

## 6. CTA System

**Status:** Partially verified — `.hero-ctas` confirmed; broader CTA button variant system not fully extracted this pass.

**Reuse rule:** maintain a primary/secondary button pair pattern in every hero and every major section break (consistent with the "CTA interactions" requirement in the frontend persona's animation standards). Primary CTA always uses the build's single accent color at full saturation; secondary CTA uses an outline/ghost treatment. This pairing should be defined once as a true component (not copy-pasted inline styles) in any future React/Next.js track.

---

## 7. Pricing System

**Status:** Not yet verified from a source file — Builds 01/02/04/05/08 are local-service/commerce/luxury-real-estate verticals where a "pricing table" is less central than for SaaS. **This is a real gap**: none of the 5 verified builds were SaaS products, so no pricing-table component has been extracted and documented yet, even though the SaaS masterplan tracks 17+8+6=31 SaaS-track ideas that will need one.

**Action item:** the first SaaS-track build should establish the canonical pricing-table architecture (tier cards, feature comparison, monthly/annual toggle, "most popular" emphasis) and that pattern should be added here immediately afterward.

---

## 8. Testimonial System

**Status:** Not yet verified from a source file in this audit pass — flagged as unverified rather than invented.

---

## 9. FAQ System

**Status:** Not yet verified from a source file in this audit pass — flagged as unverified rather than invented. Given that shadcn/ui's Accordion is the canonical building block for this pattern in any future React/Next.js track (per the frontend persona's explicit instruction not to reinvent Accordion), the HTML-track equivalent should use a native `<details>/<summary>` pair or a manually accessible disclosure pattern with matching ARIA (`aria-expanded`, `aria-controls`) — this should be confirmed against whichever build actually implements it first, then documented here.

---

## 10. Footer System

**Status:** Verified via memory cross-reference (GrowrixOS footer credit is a mandatory component linking to growrixos.com); structural markup not independently extracted this pass.

**Reuse rule:** footer must always carry the GrowrixOS credit link and the auto-year `.yr` class span (`new Date().getFullYear()`-style, but implemented as a static class hook per the locked component list). Beyond that fixed element, footer column structure (sitemap links, social, newsletter signup) should vary by archetype — Quiet Luxury archetypes tend toward fewer, larger footer columns; Frictionless Commerce toward dense multi-column footers.

---

## Architecture-vs-Aesthetic Discipline

The pattern across every verified component above is the same: **the skeleton (DOM structure, ARIA wiring, behavior) is the reusable IP. The skin (colors, exact copy, which SVG fills the hero background) is the part that must be reinvented every time.** Any future builder — human or Claude — copying a component from this registry should copy the class structure and behavior, then write entirely new CSS values and content, never copy-paste the visual styling itself.

---

## Future Expansion Strategy

1. Extract Hero Lab's 11 hero variations into Section 4 the moment that file is available in project knowledge — this single addition would do more for portfolio diversity than any other knowledge-system update, since hero design is the highest-visibility differentiation surface.
2. Build the first SaaS-track product specifically to fill the Pricing System gap (Section 7), since 31 of 764 tracked ideas (17+8+6 SaaS tracks) currently have no documented pricing-table architecture to build from.
3. As each new component type proves out in a real build, add it here with the same "Status: Verified (Build NN)" discipline used throughout this file — never document a pattern as proven until it's been seen in an actual shipped file.
