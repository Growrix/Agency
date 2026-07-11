# GrowrixOS — Portfolio Differentiation

**Version 1.0 · The living ledger + the hard rule that prevents the next repeat**

---

## Purpose

This is the single most operationally important file in the knowledge system, because it's the one meant to be consulted *before every single build* — and it's the file most likely to be skipped if it isn't kept brutally simple. Its job: stop a repeat before it ships, not document one after the fact.

---

## THE FINDING (read this before every build)

All 5 verified completed builds use the **identical three-font stack**:

```
Display:  Archivo
Body/UI:  Space Grotesk
Mono:     IBM Plex Mono
```

This happened across Construction (Build 01), E-commerce (Build 02), HVAC (Build 04), Luxury Real Estate (Build 05), and Electrical (Build 08) — five industries with genuinely different brand registers, all sharing the same typographic DNA. Meanwhile, color palettes across the same five builds are genuinely well-differentiated (orange/amber, electric blue, navy/cyan, gold/emerald, royal blue) — so this is not a general differentiation failure. It is a specific, narrow, fixable habit: **whatever font stack got used first became the path of least resistance for every build after it.**

The existing master instructions already warn against exactly this ("Don't use 2 sans-serif fonts together [boring]"), and the warning was followed in letter (a mono accent was added each time) but not in spirit (the same trio, every time).

---

## THE RULE (mandatory, effective immediately for all future builds)

**Before writing any CSS, check this file's ledger below. The font pairing for the new build must not match the immediately preceding build, and should not match more than 2 of the last 5 builds.**

Concretely: Archivo/Space Grotesk/IBM Plex Mono has now been used 5 times. **It is retired** until at least 3 other distinct pairings have shipped. See `Design-Tokens.md` for archetype-specific alternative pairings already proposed (e.g., a genuine serif for Quiet Luxury, a mono-leaning display for Technical Precision, Sora/Plus Jakarta Sans for Frictionless Commerce).

This rule applies the same logic the studio already uses for layout/color — it's just being made explicit and enforced for typography specifically, since that's where the actual gap is.

---

## Differentiation Ledger (update after every build)

| # | Build | Industry | Mode | Dominant Hue | Display Font | Body Font | Detail Font | Layout Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | Bedrock Construction | Construction | Dark | Orange/Gold | Archivo | Space Grotesk | IBM Plex Mono | hero(bg/overlay/grid) skeleton established |
| 02 | SuperShop Commerce | E-commerce | Dark | Electric Blue | Archivo | Space Grotesk | IBM Plex Mono | — |
| 04 | Prime Climate HVAC | HVAC | Dark | Navy/Cyan | Archivo | Space Grotesk | IBM Plex Mono | — |
| 05 | Elite Estates Realty | Luxury Real Estate | Dark | Gold/Emerald | Archivo | Space Grotesk | IBM Plex Mono | — |
| 08 | VoltCore Power | Electrical | Dark | Royal Blue | Archivo | Space Grotesk | IBM Plex Mono | — |
| 31-35 | *(unverified — memory only)* | — | — | — | — | — | — | source files not in project knowledge; cannot audit |
| Hero Lab | 11 hero variations | — | — | — | — | — | — | not yet extracted into Component Registry |
| ELYSIA | Build 35, private island resort | Hospitality | *unknown* | *unknown* | *unknown* | *unknown* | *unknown* | started, not confirmed complete per memory |

**Mode column finding:** 5 of 5 verified builds are dark-first. This is the second most important pattern in this ledger (after the font issue) — see the dedicated callout below.

---

## Secondary Finding: Dark-Mode Default

Every verified build defaults to a dark-mode-first aesthetic. This is a defensible premium-brand choice in isolation, but as a portfolio pattern across 5/5 builds it means:
1. No completed build demonstrates GrowrixOS can execute a strong **light-first** design, which several masterplan categories (healthcare, education, legal, nonprofit) suit far better by default.
2. A prospective buyer skimming the portfolio would reasonably wonder if "dark, moody, premium" is the *only* mode GrowrixOS does well.

**Rule:** at least 1 of the next 3 builds must default to light mode (the dark/light toggle remains mandatory regardless — this is about which mode is the *default* state on load).

---

## How To Apply This Ledger Mid-Build

When starting a new build:
1. Open this file. Look at the last 5 rows.
2. Your new build's font pairing must differ from at least 4 of the last 5 (i.e., match at most 1).
3. Your new build's dominant hue family should differ from at least the immediately preceding build (color has been good so far — don't break what's working, just don't go directly back-to-back on the same hue family).
4. Your new build's mode (dark/light default) should be tracked — if the last 2-3 builds were the same mode, lean toward the other.
5. After the build ships, add a new row to the ledger above with the actual extracted values (not planned values — verify against the real CSS variables and font imports the way this audit did, via `grep`).

---

## What "Differentiated Enough" Actually Means

This file is not asking for differentiation for its own sake — wild, arbitrary variation would undermine the "premium quality bar" requirement just as much as repetition does. The goal is that each build should feel like it could plausibly be the work of a different world-class agency, while still meeting every mandatory component and quality requirement in the locked build pipeline. Architecture (FAB cluster, mobile dock, modal system, validation discipline) stays constant — that's infrastructure, and infrastructure consistency is a feature, not a flaw. **Aesthetic identity (color, type, hero treatment, motion personality) is what must vary.**

---

## Future Expansion Strategy

1. This ledger must be updated after *every* build, with no exceptions — a knowledge file that goes stale after 2 entries is worse than no knowledge file, because it creates false confidence that differentiation is being tracked when it isn't.
2. Once Builds 31-35, Hero Lab, and ELYSIA source files are available in project knowledge, backfill their rows with real extracted data the same way Builds 01/02/04/05/08 were verified in this audit (CSS variable grep, font import grep) — do not estimate or guess at their values.
3. Once the font-pairing rule has been followed for 3+ builds, revisit whether the "retire Archivo/Space Grotesk/IBM Plex Mono" restriction should lift — the goal is variety, not a permanent ban on a pairing that may simply need to wait its turn again later.
