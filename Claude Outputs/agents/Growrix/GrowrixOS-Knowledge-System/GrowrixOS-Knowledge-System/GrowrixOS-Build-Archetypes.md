# GrowrixOS — Build Archetypes

**Version 1.0 · The recognizable "shapes" of business GrowrixOS knows how to build — and the ones it doesn't yet**

---

## Purpose

`Design-Intelligence.md` extracts what's been *done*. `Design-Tokens.md` defines *logic* per vertical. This file sits between them: it names the recurring "shape" of a brand problem — the combination of emotional register, audience, and conversion goal — so a builder can quickly identify "this new build is a Quiet Luxury problem" or "this is something genuinely new" before reaching for tokens or components.

An archetype is not an industry. Multiple industries can share an archetype (Construction and Automotive can both be Industrial Trust); a single industry can split across archetypes depending on positioning (Real Estate could be Quiet Luxury for high-end listings or Confident Utility for a fast-turnover brokerage).

---

## Proven Archetypes (built and verified)

### 1. Industrial Trust
**Verified example:** Bedrock Construction (Build 01)
**Emotional register:** solid, capable, built-to-last, no-nonsense
**Audience:** B2B and high-consideration B2C buyers who need to trust physical competence before price
**Fits:** Construction, home services (general contracting, roofing, fencing), automotive repair, commodity/industrial
**Token system:** see Design-Tokens §1

### 2. Frictionless Commerce
**Verified example:** SuperShop Commerce (Build 02)
**Emotional register:** fast, modern, low-friction, confident
**Audience:** consumers making a quick purchase decision, often on mobile
**Fits:** E-commerce, consumer tech, fitness products, subscription boxes
**Token system:** see Design-Tokens §2

### 3. Technical Precision
**Verified example:** Prime Climate HVAC (Build 04)
**Emotional register:** expert, data-driven, instrument-panel credibility
**Audience:** buyers who want to feel the provider is technically rigorous, not just friendly
**Fits:** HVAC, green energy, technology B2B, specialized automotive
**Token system:** see Design-Tokens §3

### 4. Quiet Luxury
**Verified example:** Elite Estates Realty (Build 05)
**Emotional register:** restrained, exclusive, unhurried, expensive without saying so
**Audience:** high-net-worth or aspirational buyers who are put off by anything that feels like "selling"
**Fits:** Luxury real estate, high-end hospitality, premium beauty, boutique legal
**Token system:** see Design-Tokens §4

### 5. Confident Utility
**Verified example:** VoltCore Power (Build 08)
**Emotional register:** dependable, safety-forward, modern-but-grounded
**Audience:** homeowners/businesses making a trust-based infrastructure decision
**Fits:** Electrical, green energy, home security, smart-home installers
**Token system:** see Design-Tokens §5

---

## Proposed Archetypes (not yet built — closing the verified gap)

These are proposed specifically because `Design-Intelligence.md` found that all 5 verified builds cluster into dark-mode, premium-or-industrial registers, leaving several masterplan categories with no natural archetype home. These proposals are reasoned extensions of the existing pattern-naming logic, not yet validated by an actual build.

### 6. Calm Authority (proposed)
**Emotional register:** reassuring, competent, unhurried — the opposite energy of Frictionless Commerce, applied to a service rather than a product
**Audience:** people making a decision under stress or vulnerability (a medical decision, a legal problem)
**Fits:** Healthcare, legal (the more approachable end — family law, estate planning, vs. Quiet Luxury's corporate-litigation end), nonprofit (donor-facing)
**Token system:** see Design-Tokens §6 (Healthcare) and §8 (Legal) for starting logic
**Why it's distinct from Quiet Luxury:** Quiet Luxury withholds warmth to signal exclusivity; Calm Authority offers warmth to signal safety. Both are restrained, but for opposite reasons — this distinction matters and should not collapse into "they're both light/minimal so they're the same archetype."

### 7. Optimistic Growth (proposed)
**Emotional register:** energetic but trustworthy, forward-looking, achievement-oriented
**Audience:** people investing in self-improvement or a child's/employee's development
**Fits:** Education, coaching/training SaaS, corporate L&D platforms
**Token system:** see Design-Tokens §10

### 8. Mission-Driven Warmth (proposed)
**Emotional register:** human, story-led, urgency without manipulation
**Audience:** donors, volunteers, community members
**Fits:** Nonprofit, community organizations, causes-adjacent SaaS
**Token system:** see Design-Tokens §11

### 9. Editorial Expression (proposed)
**Emotional register:** bold, opinionated, unmistakably crafted — the only archetype that should deliberately break grid conventions
**Audience:** clients hiring for taste itself (a creative agency's own site is the ultimate test of its design judgment)
**Fits:** Creative agencies, design studios, portfolio sites, certain DBC style groups (the "art-magazine," "editorial," "retro" DBC groups already documented in `dbc-masterplan.html` are this archetype's natural home)
**Token system:** see Design-Tokens §12

### 10. Destination Escape (proposed)
**Emotional register:** sensory, aspirational, slow-paced — invites lingering rather than converting fast
**Audience:** travelers and guests making a discretionary, emotionally-driven booking decision
**Fits:** Hospitality/travel, events/entertainment, high-end food/restaurant
**Token system:** see Design-Tokens §9
**Note:** this is the most likely home for ELYSIA (Build 35, private island resort) once that file is available to verify — worth checking whether the in-progress build already aligns with this proposed archetype or whether it suggests a different one entirely.

---

## Archetype Selection Checklist (use before inventing a new brand)

1. What is the masterplan category for this build? (industry-templates-masterplan.html / saas-masterplan.html / dbc-masterplan.html)
2. Which proven or proposed archetype best matches the emotional register this specific business needs — not just the industry label, but the actual positioning (a budget HVAC repair shop and a luxury HVAC concierge service are the same industry but different archetypes)?
3. Check `Portfolio-Differentiation.md`'s ledger — has this exact archetype been built recently? If so, does the new build's font/color/mode choice genuinely diverge per the differentiation rule, even while sharing an archetype?
4. If none of the 10 archetypes above fit, that's a legitimate signal a genuinely new archetype is needed — document it here after the build, following this same format (emotional register, audience, fits, token system reference), rather than silently forcing the build into a poor-fit archetype.

---

## Future Expansion Strategy

1. The first build in each "proposed" archetype should be flagged explicitly as validating that archetype — once built, move it from "Proposed" to "Proven" in this file and link the verified example, the same way the first 5 archetypes are documented.
2. Watch for archetypes that *industries* suggest but that don't yet have a clean emotional-register name — if Agriculture, Pet Services, or Food builds happen before a clear archetype exists for them, name the archetype from the actual build rather than retrofitting one of the 10 above onto a poor fit.
3. Revisit whether any of the 5 proven archetypes are actually two archetypes wearing one name once 2-3 builds exist within them — right now each proven archetype has exactly 1 verified example, which isn't enough data to know if the category is well-defined or just hasn't been tested for internal variation yet.
