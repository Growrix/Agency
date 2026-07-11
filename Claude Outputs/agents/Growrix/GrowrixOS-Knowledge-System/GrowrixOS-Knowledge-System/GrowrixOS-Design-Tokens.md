# GrowrixOS — Design Tokens

**Version 1.0 · Token logic by vertical, grounded in verified palettes + masterplan categories**

---

## Purpose

This file defines *logic*, not fixed hex codes — a reusable reasoning system for choosing color, type, motion, and surface treatment per industry vertical, so that every new build in a given category starts from sound first principles rather than from whatever the last build happened to use. The five verified builds (Construction, E-commerce, HVAC, Real Estate, Electrical) already demonstrate this logic working for color; this file generalizes it and extends it to the 17 unverified categories from the masterplan.

**Hard rule carried over from `Portfolio-Differentiation.md`:** the typography logic below must actually produce different font pairings per system. Reusing Archivo/Space Grotesk/IBM Plex Mono for a sixth consecutive build is the single most important thing this file exists to prevent.

---

## Token System Format

Each system below defines:
- **Color logic** — what the palette should communicate, in HSL/relationship terms, not fixed hex
- **Typography logic** — display/body/detail font *character*, with 2-3 concrete Google Fonts options so the next build still has to choose, not just copy
- **Motion logic** — what kind of movement fits the brand's emotional register
- **Surface logic** — flat vs. layered vs. textured; light-first vs. dark-first default

---

## 1. Industrial Trust (Verified — Construction, Home Services, Automotive, Commodity/Industrial)

- **Color logic:** near-black or deep charcoal base; one hot, saturated accent (orange/amber family) signaling energy and heat/machinery; mono-detail elements in a cooler neutral for specs and certifications. *(Verified in Build 01: `#0B0C0E` + `#FF5A1F`/`#FFC400`.)*
- **Typography logic:** a confident, slightly condensed grotesque for display (Archivo is valid here — this is the one archetype where it was already a good fit); body should remain highly legible at small sizes for spec sheets. **For variation:** try Archivo paired with Inter or IBM Plex Sans for body instead of Space Grotesk, to break the three-font monoculture while staying in the same character family.
- **Motion logic:** mechanical, snappy easing; counters that count up like a meter; minimal float/drift — this archetype should feel solid, not airy.
- **Surface logic:** dark-first is correct here (job-site, heavy-equipment association). Layered depth via shadow stacks reads as "structural," which fits.

## 2. Frictionless Commerce (Verified — E-commerce, Fitness Products, Consumer Tech)

- **Color logic:** Verified Build 02 used dark `#0A0A0F` + electric blue. Logic: high contrast, one electric/cool accent that reads as "fast," generous use of pure white or near-white for product imagery contrast even within a dark shell.
- **Typography logic:** Build 02 reused the Archivo/Space Grotesk pair — **flag this as the weakest-differentiated entry in the verified set**, since commerce typography should feel distinct from construction typography. **For variation:** consider a true geometric sans (e.g., Sora, Plus Jakarta Sans, or Manrope) for display, paired with a neutral workhorse body font (Inter) — avoids both prior pairings entirely.
- **Motion logic:** fast, snap-to-grid transitions; product cards should feel responsive to touch/hover with minimal lag; cart/checkout flows should use motion to reduce perceived friction, not to delight for its own sake.
- **Surface logic:** can go either dark or light-first depending on positioning (dark = premium/tech-forward; light = mass-market/approachable) — Build 02's dark choice fits a premium positioning; a future commerce build should test light-first for contrast within the portfolio.

## 3. Technical Precision (Verified — HVAC, Green Energy, Technology B2B, Automotive)

- **Color logic:** Verified Build 04 used deep navy `#060F22` + cyan/blue duo. Logic: cool, instrument-panel feeling; cyan/blue communicates climate/air/data; avoid warm accents entirely in this archetype to keep the "precision instrument" read.
- **Typography logic:** Build 04 again reused Archivo/Space Grotesk. **For variation:** a monospace-leaning display choice (e.g., Space Mono or JetBrains Mono for select numerals/specs) paired with a humanist sans body (Work Sans, Source Sans) would reinforce the "precision instrument" feeling more than a generic grotesque does, and would break the font monoculture.
- **Motion logic:** gauge/dial-inspired — circular progress, needle-sweep reveals, data-readout count-ups fit naturally here.
- **Surface logic:** dark-first, layered like a dashboard or control panel; glass/blur surfaces read well in this archetype specifically.

## 4. Quiet Luxury (Verified — Real Estate, Hospitality/Travel, Beauty, high-end Legal)

- **Color logic:** Verified Build 05 used warm near-black `#0C0A07` + gold/bronze + emerald accent. Logic: warm neutral base (never cool/blue-black), one metallic-adjacent accent, one rare "jewel" accent used sparingly for emphasis only (the emerald appears restrained, not dominant).
- **Typography logic:** Build 05 again reused Archivo/Space Grotesk — **this is the most jarring repetition in the verified set**, since luxury real estate and HVAC sharing identical typography undermines the "quiet luxury" positioning entirely. **Strong recommendation for next luxury build:** pair a genuine serif display (Fraunces, Canela-style alternative like Newsreader, or Playfair Display used sparingly) with a refined sans body (Inter or General Sans) — serif display is the single highest-impact way to separate this archetype from the four grotesque-driven ones above.
- **Motion logic:** slow, deliberate easing; long fade/parallax reveals; avoid snappy or mechanical motion entirely — speed reads as cheap in this archetype.
- **Surface logic:** dark-first works (Build 05 confirms it), but should lean toward near-flat with very subtle gradient washes rather than heavy layered shadow stacks — luxury reads as restraint, not depth-for-depth's-sake.

## 5. Confident Utility (Verified — Electrical, Green Energy, Home Services, Automotive)

- **Color logic:** Verified Build 08 used near-black blue `#020616` + royal blue. Logic: trust-signaling cool blue, slightly more saturated and "electric" than Technical Precision's navy, to communicate active power/energy rather than passive measurement.
- **Typography logic:** Build 08 again reused Archivo/Space Grotesk. **For variation:** this archetype could support a slightly more geometric, confident display font (DM Sans, Sora) paired with a technical-feeling mono accent (Space Mono, IBM Plex Mono — keeping Plex Mono here specifically is fine since it hasn't been the differentiating problem, the display/body pair has).
- **Motion logic:** pulse/charge-style animations (a "powering on" feel) fit this archetype uniquely well — current flow visualizations, pulsing accent glows.
- **Surface logic:** dark-first, similar layered depth to Industrial Trust but cooler in temperature.

---

## 6. Healthcare (Unbuilt — high priority gap per Design Intelligence audit)

- **Color logic:** light-first is strongly preferred here — dark-mode healthcare reads as ominous, not premium. Cool, clinical-but-warm accent (teal or soft blue), generous white/off-white surface, avoid red except for genuine alerts.
- **Typography logic:** highly legible humanist sans for body (accessibility is non-negotiable in this vertical — WCAG AA+ contrast and legibility matter more here than almost anywhere else in the portfolio); a calmer, rounder display font (e.g., Outfit, Manrope) rather than anything aggressive/industrial.
- **Motion logic:** gentle, slow, reassuring — no snap, no aggressive parallax; reduced-motion fallback should be treated as a near-default, not an edge case.
- **Surface logic:** light-first, soft shadows, generous whitespace, minimal texture.

## 7. Finance (Unbuilt)

- **Color logic:** can go either dark (fintech/modern) or light (traditional/institutional) depending on target — deep navy or forest green base with a single confident accent (gold for "established," electric green for "fintech-modern").
- **Typography logic:** a serif or slab-serif for "established institution" positioning, or a clean geometric sans for "modern fintech" positioning — this is a genuine fork the brand concept must resolve before tokens are chosen.
- **Motion logic:** precise, data-driven — number count-ups and chart-reveal animations are core to this vertical's credibility signaling.
- **Surface logic:** layered cards for dashboards/data display; restrained gradient use.

## 8. Legal (Unbuilt)

- **Color logic:** deep navy or burgundy base, gold or brass accent — communicates gravity and establishment.
- **Typography logic:** serif display (a genuine opportunity to use a different serif than whatever Quiet Luxury settles on, to keep the two archetypes visually distinct even though both are "premium").
- **Motion logic:** minimal and dignified — this is the one archetype where heavy motion most actively undermines the brand.
- **Surface logic:** light-first more often suits legal than dark; flat, confident, low-ornamentation.

## 9. Hospitality & Travel (Unbuilt)

- **Color logic:** warm, sun-influenced palette — terracotta, sand, deep teal for "destination" feeling; avoid the cool-blue family entirely to stay distinct from Technical Precision and Confident Utility.
- **Typography logic:** an editorial serif or characterful display paired with a relaxed sans — this category can justify the most "human" typography in the whole system.
- **Motion logic:** slow parallax, image-led reveals, travel-brochure pacing.
- **Surface logic:** light-first with rich photography-style procedural visuals (since the build standard forbids external images, this means investing in higher-quality procedural/gradient "scenery" than other archetypes need).

## 10. Education (Unbuilt — flagged gap)

- **Color logic:** light-first, optimistic and energetic but not childish — a confident primary color (blue, purple, or teal) with a warm secondary accent.
- **Typography logic:** rounder, friendlier sans for display; highly legible body text (this audience skews toward reading-heavy pages).
- **Motion logic:** encouraging micro-interactions (progress indicators, completion celebrations) fit this vertical specifically.
- **Surface logic:** light-first, card-based, approachable.

## 11. Nonprofit (Unbuilt — flagged gap)

- **Color logic:** warm, human, mission-driven — avoid corporate-cold palettes; a single warm accent (coral, warm green) against light or warm-neutral surfaces.
- **Typography logic:** approachable sans, never aggressive/industrial.
- **Motion logic:** gentle, story-led reveals — this vertical's hero pattern should prioritize narrative/impact-stat reveals over product-style snap interactions.
- **Surface logic:** light-first, generous use of impact-stat counters (ties into the count-up component, repurposed for donation/impact metrics instead of business metrics).

## 12. Creative / Agency (Unbuilt — flagged gap)

- **Color logic:** the one archetype where breaking the "4-6 named colors" rule's spirit toward bold, even clashing color is itself the differentiator — high-energy, possibly neon or unexpected pairing.
- **Typography logic:** the one archetype that can justify an expressive/display-heavy font choice the rest of the portfolio shouldn't touch.
- **Motion logic:** the most experimental archetype — cursor-following effects, unconventional scroll-jacking (used sparingly and always with reduced-motion fallback), asymmetric reveals.
- **Surface logic:** can break grid conventions more than any other archetype, while still respecting the underlying accessibility/responsive requirements.

---

## Future Expansion Strategy

1. Categories still entirely unaddressed even at the "logic" level: Agriculture, Pet Services, Food, Events/Entertainment, Beauty (separate from its Quiet Luxury overlap), Automotive (separate from its overlap with Industrial Trust/Technical Precision/Confident Utility). These should get dedicated token logic the first time a build in that category is actually planned — not invented speculatively now, since untested token logic is lower value than logic grounded in an actual build attempt.
2. Every time a new build ships, check its font choice against every prior system's "For variation" recommendation — if a recommended pairing was actually used, mark it used here so the *next* build in that archetype doesn't reach for the same one.
3. Revisit this file once 3+ builds exist in any single archetype (currently none have more than 1) — at that point there will be enough verified data to tell whether the "logic" is producing real variation or whether the same trap (sound rule, identical execution) is recurring.
