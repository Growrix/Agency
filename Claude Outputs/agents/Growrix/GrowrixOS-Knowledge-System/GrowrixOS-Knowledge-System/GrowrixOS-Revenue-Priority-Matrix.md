# GrowrixOS — Revenue Priority Matrix

**Version 1.0 · Reasoned prioritization, not invented market statistics**

---

## Purpose

A note on method before the matrix itself: this file does not claim to have performed external market research. It does not invent TAM figures, competitor pricing data, or search-volume statistics that weren't actually looked up. What it *can* do honestly is reason from the structure of GrowrixOS's own planning documents — which categories the studio already judged worth deeply detailing (15+ sub-templates vs. 5), which categories show up in multiple masterplans (signaling cross-validated demand within the studio's own thinking), and which categories remain completely unbuilt despite being well-documented. That's a legitimate prioritization signal even without external data, and it's the one this file uses throughout.

Where this file does reference real market dynamics (e.g., "home services is a perennial high-volume local-SEO category"), that reflects general, stable, non-time-sensitive knowledge rather than a claim about current 2026 market conditions — nothing here should be read as verified current data.

---

## The Core Fact That Should Drive Everything

**764 ideas are tracked. 5 are built (plus a Hero Lab and 10 DBC cards from memory).** Whatever this matrix recommends, the single highest-leverage move available to GrowrixOS right now is simply *increasing build velocity on already-validated categories* — not discovering new categories. The studio has already done the hard work of identifying 22 industries, 17 SaaS verticals, 8 micro-SaaS clusters, 6 macro-SaaS platforms, and 17 DBC style groups. The bottleneck is production, not ideation.

---

## Tier 1 — Build Next (highest leverage given current state)

### A. Close the Pricing-Table Gap (see Component Registry §7)
None of the 5 verified builds are SaaS products, so there is no proven pricing-table component yet — despite 31 SaaS-track ideas (17+8+6) sitting in the backlog. Every one of those 31 builds will eventually need this component. Building it once, well, unlocks all 31 downstream builds. **This is the single highest-leverage next build from a pure infrastructure standpoint.**

### B. Continue the Home-Services Cluster
`industry-templates-masterplan.html`'s first category (Home Services & Trades) contains the most sub-templates of any category in the file (16 distinct template types: plumber, electrician, HVAC, roofer, pest control, landscaping, handyman, painter, flooring, window/door, pool service, fencing, garage door, cleaning, tree service, gutter). Two of these (HVAC, electrical) are already built and verified as part of the Industrial Trust / Confident Utility archetypes. This category being the largest in the masterplan is itself the signal — the studio already invested more planning depth here than anywhere else, which is the clearest internal evidence of perceived value. Continuing it (plumber, roofer, or cleaning service next) reuses proven archetype logic with minimal new design risk.

### C. The First Light-First, Warm-Archetype Build
Every verified build is dark-mode. This is a genuine portfolio gap (see Design Intelligence), and it's also a credibility risk: a prospective buyer browsing the portfolio for a healthcare, education, or hospitality template would currently find nothing that demonstrates GrowrixOS can do light-first, warm, human-centered design — even though 3+ masterplan categories (healthcare, education, hospitality-travel) need exactly that. Building one strong light-first example closes both a design gap and a portfolio-credibility gap simultaneously.

---

## Tier 2 — Build Soon (strong backlog signal, less urgent than Tier 1)

### D. Digital Business Cards, Group 2+
DBC has 150 total card concepts across 17 style groups; only Group 1 (Minimal & Clean, 10 cards) is reported complete. DBC cards are lower production cost per unit than full sites (smaller surface area, no multi-section layout to design), meaning this category has the best "ideas remaining ÷ effort per idea" ratio in the entire backlog — a fast way to visibly grow the completed-output count while the larger single-file builds continue in parallel.

### E. Legal & Finance Verticals
Both appear in the masterplan as named categories, both are commonly understood as categories where buyers are willing to pay more for a premium, trust-signaling template (a plausible, conservative inference — not a researched claim), and neither is touched by any verified build. The "Quiet Luxury" and a future dedicated "Legal" token system (see Design Tokens §8) already have a documented starting point.

---

## Tier 3 — Strategic, Not Urgent

### F. Hero Lab Extraction
Not a new build, but recovering the Hero Lab file's 11 hero variations into the Component Registry (see that file's action item) would retroactively improve every future Tier 1/2 build's differentiation without costing a new build slot. This is closer to "infrastructure debt repayment" than "new revenue," but it compounds — every future hero benefits.

### G. Next.js Second Output Track
Memory notes this was discussed but not formalized (no locked architecture decision, no multi-file output contract, no Next.js skill file yet). This is a genuine strategic fork — a multi-file React/Next.js track could unlock buyers who want an editable codebase rather than a single static HTML file, which is a different (likely higher-value, higher-effort-to-deliver) product category entirely. **This should not be started opportunistically mid-build-series; it deserves its own dedicated planning session** because it changes the entire output contract (folder structure, component reuse via actual imports rather than copy-paste, build tooling) in ways the current single-file pipeline doesn't need to think about.

---

## What This Matrix Deliberately Does Not Recommend

- **Discovering a 23rd industry category, an 18th SaaS vertical, or an 18th DBC style group.** With 764 ideas already tracked and ~5-10 built, *more ideation* is the lowest-leverage activity available right now. Market Intelligence (separate file) tracks genuinely emerging opportunities worth watching, but they should be treated as future backlog additions, not reasons to slow down execution on the existing 764.
- **Optimizing the build pipeline's mechanics further** (heredoc strategy, validator scripts) — these are already mature and locked per the existing instructions; this matrix is about *what* to build, and the existing process documentation already covers *how*.

---

## Future Expansion Strategy

1. After each build ships, move its corresponding masterplan entry to a "built" state in the tracker (this should already be tracked via `growrixos-master-tracker`'s localStorage status system — verify it's actually being used, since this audit found 764 tracked items with no visible evidence of how many are marked built in that system specifically).
2. Re-evaluate this matrix every 5-10 builds — priorities should shift once Tier 1 items are closed (e.g., once a pricing-table component exists, "first SaaS build" stops being uniquely high-leverage and becomes just one more build among many).
3. If/when real demand data becomes available (actual customer requests, actual sales data from growrixos.com), replace the "internal planning depth as a proxy for demand" reasoning used throughout this file with that real signal — proxy reasoning is a reasonable starting point in the absence of data, not a permanent substitute for it.
