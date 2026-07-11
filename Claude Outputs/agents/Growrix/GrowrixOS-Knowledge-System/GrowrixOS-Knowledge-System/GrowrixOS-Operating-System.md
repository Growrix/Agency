# GrowrixOS — Operating System

**Version 1.0 · Generated from full project audit · growrixos.com**

---

## Purpose

This document is the entry point to the GrowrixOS knowledge system. It explains what GrowrixOS is, how its eight other knowledge files relate to each other, and how a future session (Claude or a human builder) should use them before starting work.

GrowrixOS is, today, a **single-file HTML production pipeline** with a locked build process, a validation discipline, and a very large backlog of planned products (764 tracked build ideas across two tracks). It is not yet a "design intelligence system" in any automated sense — there is no scoring engine, no auto-comparison against prior builds, no machine-extracted taxonomy. What exists is a set of static planning documents (masterplans, a tracker) and five completed flagship builds plus a Hero Lab showcase and ten digital business cards.

This knowledge system's job is to turn that raw material into something a builder can actually consult mid-build: "what have I already done, what's still open, what mistake do I keep making, what should I build next for the best return." It is documentation, not automation. Anything in these files describing a "score" or a "match" is a manual judgment call recorded for reuse — not a number computed by software.

---

## What Actually Exists (Ground Truth, as of this audit)

**Completed single-file HTML builds found in project knowledge (5):**
1. `BedrockConstruction.html` (Build 01) — Construction, dark mode, orange/amber
2. `02-SuperShopCommerce.html` — E-commerce, dark mode, electric blue
3. `04-PrimeClimateHVAC.html` — HVAC, dark mode, navy/cyan
4. `05-EliteEstatesRealty.html` — Luxury real estate, dark mode, gold/emerald/charcoal
5. `08-VoltCorePower.html` — Electrical/smart home, dark mode, deep blue

(Memory references Builds 31–35 and a Hero Lab and DBC Group 1 as having been produced in other sessions; those source files are not present in this project's knowledge base, so the **Design Intelligence**, **Component Registry**, and **Build Archetypes** files below are built primarily from the five files actually available plus documented memory, and are flagged accordingly wherever a claim rests on memory rather than a file Claude could open and verify.)

**Planning documents (4):**
- `industry-templates-masterplan.html` — 22 industry categories, ThemeForest-style template ideas
- `saas-masterplan.html` — 3 tracks: Templates by Industry (17), Micro SaaS (8 clusters), Macro SaaS (6 platforms)
- `dbc-masterplan.html` — Digital Business Cards, 17 style groups, 150 card concepts
- `growrixos-master-instructions.html` — the locked process and quality bar (5 phases, 20-point pre-ship checklist, 6 product-category families)

**Tracking infrastructure (1):**
- `growrixos-master-build-tracker.html` — 3-tier sidebar tracker covering 609 Digital Products items + 155 SaaS Universe items = **764 total tracked build ideas**, almost all currently unbuilt

**Conclusion:** GrowrixOS has built roughly 0.6% of what it has planned (5 flagship builds, plus a Hero Lab and 10 DBC cards from memory, against 764 tracked ideas). That ratio is the single most important fact in this audit — it should shape the Revenue Priority Matrix and Decision Engine more than any aesthetic consideration.

---

## File Map

| File | Answers |
|---|---|
| `GrowrixOS-Operating-System.md` | What is this system, what's actually been built, how do the files connect |
| `GrowrixOS-Design-Intelligence.md` | What design patterns has GrowrixOS actually used, and what does that mean for the next build |
| `GrowrixOS-Component-Registry.md` | What reusable component architectures exist (hero, nav, CTA, pricing, etc.) and how do they vary |
| `GrowrixOS-Design-Tokens.md` | What color/type/motion logic should govern each industry vertical (luxury, tech, healthcare, etc.) |
| `GrowrixOS-Quality-Scorecard.md` | How to manually evaluate a finished build before shipping it |
| `GrowrixOS-Revenue-Priority-Matrix.md` | Given 764 options, what should be built next and why |
| `GrowrixOS-Portfolio-Differentiation.md` | Concretely, what has been repeated too much, and what rule prevents the next repeat |
| `GrowrixOS-Build-Archetypes.md` | What recognizable "shapes" of business does GrowrixOS already know how to build |
| `GrowrixOS-Market-Intelligence.md` | What's worth watching in the broader market that isn't yet reflected in the 764-item backlog |

---

## How To Use This System In A Build Session

1. Before inventing a new brand for the next numbered build, open `Portfolio-Differentiation.md` and check the "last 5 builds" table — do not repeat the same font stack, dominant hue, or layout skeleton listed there.
2. Pull the relevant vertical's logic from `Design-Tokens.md` (e.g., if building a legal-services site, use the Legal/Finance token logic, not the Construction one).
3. Reuse architecture (not visuals) from `Component-Registry.md` for hero, nav, pricing, FAQ, footer.
4. After the build, run it against `Quality-Scorecard.md` manually — there is no scoring script, so this is a checklist a human or Claude reads and answers honestly.
5. When deciding *what* to build next (not how), consult `Revenue-Priority-Matrix.md` and the `GrowrixOS-Decision-Engine.md` tiebreaker rules (see Part 2 of this knowledge system, to be authored manually per the original request).

---

## What This System Deliberately Does Not Do

- It does not compute scores. Every "score" in `Quality-Scorecard.md` is a rubric for a human/Claude to apply, not a number derived from code analysis.
- It does not auto-detect duplication. `Portfolio-Differentiation.md` is a living table that must be updated by hand (or by Claude, at the end of each build) — it is not wired into the build pipeline.
- It does not replace the existing locked build process in `growrixos-master-instructions.html`. That document remains authoritative for *how* a file gets built (heredoc staging, validation, FAB cluster, etc.). This knowledge system only informs *what* to build and *how it should look/feel* relative to the rest of the portfolio.
- It does not invent market-size statistics. Where `Revenue-Priority-Matrix.md` and `Market-Intelligence.md` make demand claims, they are reasoned from category breadth/repetition in the existing masterplans (a category with 15+ sub-templates already documented signals the agency-side prioritization that went into building the masterplan) rather than from external market research that wasn't actually performed.

---

## Maintenance Protocol

After each new numbered build or DBC group ships:

1. Add one row to the differentiation table in `Portfolio-Differentiation.md` (font pairing, dominant color, layout skeleton, archetype used).
2. If a genuinely new component pattern was invented (not a copy of an existing one), add it to `Component-Registry.md`.
3. If a new vertical was touched, check whether `Design-Tokens.md` already has logic for it; if not, add a token system following the existing format.
4. Update the "built vs. tracked" ratio in this file's Ground Truth section.

This keeps the knowledge system accurate rather than aspirational.
