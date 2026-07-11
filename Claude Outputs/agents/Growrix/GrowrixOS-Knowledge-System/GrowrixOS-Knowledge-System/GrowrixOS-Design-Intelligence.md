# GrowrixOS — Design Intelligence

**Version 1.0 · What GrowrixOS has actually designed, extracted build-by-build**

---

## Purpose

This file records, per completed build, the actual design decisions made: color system, typography, layout skeleton, hero pattern, motion approach. It exists so that before starting build N+1, a builder can scan this table and consciously choose to diverge — rather than unconsciously reaching for the same defaults again.

Every entry below was extracted directly from the build's source HTML (CSS custom properties, `<title>`, font imports), not inferred or invented. Two builds referenced in memory (the Builds 31–35 series, Hero Lab, ELYSIA) are noted separately because their source files were not present in this project's knowledge to verify against.

---

## Verified Build Ledger (extracted from actual source files)

| Build | Industry | Mode | Dominant Hue | Accent | Display Font | Body Font | Mono/Detail Font |
|---|---|---|---|---|---|---|---|
| 01 — Bedrock Construction | Construction | Dark | Near-black `#0B0C0E` | Orange `#FF5A1F` + Gold `#FFC400` | Archivo | Space Grotesk | IBM Plex Mono |
| 02 — SuperShop Commerce | E-commerce | Dark | Near-black `#0A0A0F` | Electric blue `#2563EB`/`#3B82F6` | Archivo | Space Grotesk | IBM Plex Mono |
| 04 — Prime Climate HVAC | HVAC | Dark | Deep navy `#060F22` | Cyan `#06B6D4` + Blue `#0B69D4` | Archivo | Space Grotesk | IBM Plex Mono |
| 05 — Elite Estates Realty | Luxury real estate | Dark | Near-black warm `#0C0A07` | Gold/bronze tones + Emerald `#10B981` | Archivo | Space Grotesk | IBM Plex Mono |
| 08 — VoltCore Power | Electrical/smart home | Dark | Near-black blue `#020616` | Royal blue `#1E5BFF`/`#4D7EFF` | Archivo | Space Grotesk | IBM Plex Mono |

### The honest finding

**Color is genuinely differentiated.** Five industries, five distinct hue identities — orange/amber construction grit, cold electric-blue commerce, navy/cyan technical HVAC, warm gold/emerald real-estate luxury, and royal-blue electrical trust. This part of the differentiation mandate is working.

**Typography is not differentiated at all.** All five verified builds use the identical three-font stack: **Archivo** (display), **Space Grotesk** (body/UI), **IBM Plex Mono** (detail/mono). This directly contradicts the existing rule in `growrixos-master-instructions.html` ("Pair a characterful display font... Don't use 2 sans-serif fonts together [boring]") — the studio's own rule was followed in spirit (a serif/mono accent exists) but the *exact same pairing* has now shipped five times in a row across construction, e-commerce, HVAC, real estate, and electrical. A luxury real-estate brand and a HVAC contractor currently share typography DNA.

**Mode is undifferentiated.** All five verified builds default to dark mode as the primary aesthetic (even though each presumably ships with a light/dark toggle per the mandatory component list). This is a legitimate stylistic choice for a premium portfolio, but it means light-first builds — which read very differently and suit categories like healthcare, education, and hospitality far better — have not yet been demonstrated.

This is exactly the kind of pattern this knowledge system exists to surface. See `Portfolio-Differentiation.md` for the hard rule going forward.

---

## Memory-Referenced Builds (not independently verifiable from project files)

These are documented in Claude's memory of past sessions but their source HTML was not present in this project's knowledge base at audit time, so their design specifics below are recorded as reported, not verified:

- **Builds 31–35**: numbered single-file builds, with Build 35 ("ELYSIA," a private island resort brand) started but not confirmed complete.
- **Hero Lab**: a showcase file containing 11 distinct hero section variations — valuable specifically *because* it was built to maximize internal variation, making it the best existing source of hero-pattern diversity once its file is available for extraction.
- **Digital Business Cards, Group 1 (Minimal & Clean, 10 cards)**: delivered as a zip, covering 1 of the 17 style groups defined in `dbc-masterplan.html`.

**Action item:** the next time these files are available in project knowledge, this section should be replaced with verified extraction, the same way the table above was built from the 5 confirmed files.

---

## Brand Archetype Taxonomy (derived from verified builds + masterplan categories)

Rather than inventing archetypes from nothing, these are named from the actual pattern visible across the verified builds and the structure of `industry-templates-masterplan.html`'s 22 categories:

| Archetype | Verified example | Visual logic | Categories it naturally fits |
|---|---|---|---|
| **Industrial Trust** | Bedrock Construction | Dark, high-contrast, warm hot-metal accent, mono-detail for specs/certs | Construction, home-services, automotive, commodity-industrial |
| **Frictionless Commerce** | SuperShop | Dark, cool electric accent, dense grid, fast visual rhythm | E-commerce, fitness products, consumer tech |
| **Technical Precision** | Prime Climate HVAC | Dark navy, cyan/blue duo, gauge/dial motifs implied by accent pairing | HVAC, green-energy, automotive, technology B2B |
| **Quiet Luxury** | Elite Estates Realty | Dark warm-neutral, gold + emerald restraint, generous whitespace-equivalent (dark "breathing room") | Real estate, hospitality-travel, beauty, legal (high-end) |
| **Confident Utility** | VoltCore Power | Dark royal blue, safety-adjacent trust signaling | Electrical, green-energy, home-services, automotive |

**Gap:** every verified archetype above is a *dark-mode, B2B-or-premium-local-service* pattern. The masterplan's 22 categories include several that this archetype set does not naturally cover well: **agriculture, education, nonprofit, pet-services, food, events-entertainment, creative**. These categories tend to read better in warm, light-first, human-centered visual language — a genuine gap, not a stylistic preference. See `Build-Archetypes.md` for proposed new archetypes to close this.

---

## Motion & Interaction Patterns (per `growrixos-master-instructions.html` + verified builds)

The locked mandatory component list (FAB cluster, mobile dock, AI concierge modal, toast system, theme toggle, rotating announce bar, scroll-reveal, count-up counters) is itself a strong, consistent interaction architecture — and that consistency is *correct* to keep, because it's infrastructure, not aesthetic. The differentiation mandate should apply to color/type/layout, not to whether a build has a working FAB cluster.

What should vary build-to-build within that fixed interaction shell:
- Easing personality (the locked `cubic-bezier(0.16, 1, 0.3, 1)` is a good default "premium ease" — but a luxury brand vs. a fast-commerce brand could justify two different curves)
- Reveal choreography (stagger timing, direction of entrance) per archetype
- Whether 3D/WebGL ambient effects lean geometric (Industrial Trust, Technical Precision) vs. organic (Quiet Luxury, future warm archetypes)

---

## Future Expansion Strategy

1. As each new build ships, add one row to the Verified Build Ledger above — extracted from the actual file (`grep` the CSS variables and font imports), not from memory.
2. Once Hero Lab, Builds 31–35, and ELYSIA are available as files, replace the "Memory-Referenced" section with verified data and fold their hero/layout patterns into the Component Registry.
3. Treat the "Gap" callout (light-first, warm, human-centered archetypes) as a standing backlog item — the next 2–3 builds should deliberately target it rather than extending the dark-mode pattern further, simply because the verified ledger is currently 5-for-5 dark.
