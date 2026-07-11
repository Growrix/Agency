# GrowrixOS — Quality Scorecard

**Version 1.0 · A manual rubric — there is no automated scoring engine**

---

## Purpose

This is a checklist a human or Claude reads and answers honestly after a build is complete, before it ships. It is **not** a score computed by software — nothing in the GrowrixOS pipeline currently calculates these numbers automatically. Treat any "95/100" language elsewhere as a target for the rubric below, applied by judgment, not a metric a script outputs.

This scorecard sits *alongside*, not in place of, the existing structural validation already locked into the build pipeline (tag balance, duplicate ID audit, `getElementById` resolution, anchor resolution, `node --check` on JS). Those checks are mechanical and already enforced. This scorecard covers what mechanical validation cannot check: whether the build is actually good.

---

## How To Use This

For each category, assign a score 0-10 based on the criteria listed, then total out of 90 (9 categories × 10). There is no pass/fail gate hardcoded here — use judgment about whether a lower score in one category (e.g., a deliberately minimal build scoring lower on "Interaction Depth") is a legitimate design choice versus an actual gap. Write one sentence of justification per score; a number with no reasoning is not useful to a future reader of this file.

---

## 1. Visual Originality (0-10)

- 9-10: Color, typography, and layout skeleton are all distinct from every build in `Portfolio-Differentiation.md`'s ledger.
- 6-8: Color is distinct but typography or layout repeats a prior build (this was the actual outcome for all 5 verified builds in this audit — they'd score 6-7 here specifically because of font repetition).
- 0-5: Two or more of color/type/layout repeat a prior build closely enough that the two could be mistaken for the same studio's "house template" rather than distinct brands.

## 2. Premium Feel (0-10)

- Check for: 4-layer box-shadow depth stacks (not flat color blocks), `cubic-bezier(0.16, 1, 0.3, 1)`-class easing (not linear/default), texture or gradient overlays (not solid fills), genuine color theory in the palette (not arbitrary hex picks).
- A build using flat colors with no depth and no micro-interactions should score 0-3 regardless of how clean the layout is — per the existing locked instruction, "flat colors, no depth, no micro-interactions = rejection."

## 3. Conversion Quality (0-10)

- Is there a clear primary CTA visible without scrolling? Is the FAB cluster's contact path obvious? Does the AI concierge actually answer the 11 intents it's supposed to, or is it decorative? Is pricing/next-step information honest and easy to find (not buried behind unnecessary friction)?

## 4. Accessibility (0-10)

- Skip link present and functional? Focus-visible states on every interactive element? Color contrast verified (not just assumed) for both light and dark mode? ARIA labels on icon-only buttons (FAB, dock items)? Keyboard-only navigation tested through the modal system (ESC closes, focus trap works, focus returns to trigger on close)? `prefers-reduced-motion` fallback actually present for scroll-reveal and count-up, not just claimed?
- This category should rarely score below 8 given how locked-in the accessibility requirements already are in the build pipeline — a low score here indicates a process failure, not a stylistic tradeoff.

## 5. Performance (0-10)

- No external image dependencies (per the locked "zero external dependencies" standard)? Three.js/WebGL scenes degrade gracefully on low-end devices? JS validated with `node --check` and free of obvious re-render/animation-loop waste? Font loading doesn't block paint (pre-paint anti-FOUC script working as intended)?

## 6. Responsiveness (0-10)

- Mobile-first verified, not just desktop-shrunk? Bottom dock and FAB cluster don't collide or overlap on small viewports? Announce bar height sync (`--announce-h`) actually recalculates on resize/orientation change? Tested at minimum at three breakpoints (mobile, tablet, desktop) — not just two.

## 7. Interaction Depth (0-10)

- Beyond the mandatory component list, does the build have at least one genuinely bespoke interactive element (a real calculator, a working configurator, an actual data-driven tool) rather than only decorative placeholders? Per the locked standard: "Interactive tools must use real computed logic — not decorative placeholders."

## 8. Brand Clarity (0-10)

- Could a visitor describe what this business does and why it's different within 5 seconds of landing on the hero? Does the AI-invented brand have a documented rationale (per the locked pipeline's "invent brand with documented rationale" step), and does the finished build actually deliver on that rationale, or does it drift into generic territory by the time you reach the footer?

## 9. Commercial Viability (0-10)

- Would a real business in this vertical plausibly pay for this as a template? Is the feature set aligned with what the relevant masterplan entry (industry-templates-masterplan.html / saas-masterplan.html / dbc-masterplan.html) actually specified, or did the build drift from the documented brief?

---

## Worked Example: Applying This Rubric Retroactively

Using only what's verifiable from source inspection (not full manual QA, which wasn't performed in this audit):

**Build 01 — Bedrock Construction**
- Visual Originality: 7/10 — color and layout appear distinct; typography is the baseline (first build, so nothing to repeat yet) but established the pairing that all four subsequent builds would copy.
- Premium Feel: cannot verify without rendering — not scored.
- *(Remaining categories require either rendering the file or running it through the actual structural validator — this worked example exists to demonstrate the rubric's use, not to claim a full audit was performed on every build.)*

**Builds 02, 04, 05, 08**
- Visual Originality: 6/10 each — color genuinely distinct (verified), typography identical to Build 01 and each other (verified), layout skeleton not independently checked in this pass.

This worked example illustrates the core finding from `Design-Intelligence.md`: the portfolio's actual weak point is narrow and specific (typography repetition), not broad — which is good news, since it means one rule change (mandatory font-pairing check before `</html>` is written) fixes most of the gap.

---

## Minimum Bar Before Shipping

Per the existing locked instructions, these are non-negotiable regardless of score:
- All 20 items on the existing pre-ship checklist in `growrixos-master-instructions.html` must pass.
- Structural validation (tag balance, duplicate IDs, JS syntax) must show zero errors.
- Accessibility category above should not score below 7 — this is the one category where "good enough" should mean genuinely good, not merely passable, because it's the category most directly tied to real harm (a build that's inaccessible isn't usable by a portion of any real business's customers).

## Future Expansion Strategy

1. After each build, actually fill in this scorecard (all 9 categories, with reasoning) and store the result as a new row in a running log — this audit found no evidence such a log currently exists, which means there is no historical quality data to learn from yet. Starting one is higher-value than refining the rubric further.
2. Once 5+ builds have real scorecards, look for correlation between low scores and specific recurring causes (e.g., "Interaction Depth consistently scores low when the build skips a bespoke calculator") and turn that into a standing checklist item in the build pipeline itself.
3. Consider whether a lightweight automated pass (e.g., axe-core for accessibility, Lighthouse CI for performance) could eventually replace the manual portions of categories 4 and 5 — this would be a genuine automation upgrade, distinct from pretending current scores are automated when they aren't.
