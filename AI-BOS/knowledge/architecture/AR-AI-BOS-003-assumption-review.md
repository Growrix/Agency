---
id: AR-AI-BOS-003
title: AI-BOS Assumption Review and Challenge
type: architecture
category: governance
domain: ai-bos
version: 1.0.0
status: draft
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - ai-bos-architect
dependencies:
  - AR-AI-BOS-001
  - AR-AI-BOS-002
related:
  - assumptions
  - risk
  - challenge
  - validation
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - assumptions
  - risk
  - review
---

# AI-BOS Assumption Review and Challenge

## Purpose

Pressure-test every assumption embedded in Phase 1 (Vision) and Phase 2 (Constitution TOC) before any further architecture is built. The goal is to surface hidden risks, expose unstated commitments, and decide for each assumption whether to keep, revise, or flag it for later validation — not to defend the existing design.

## Scope

Covers assumptions made in:
- `AR-AI-BOS-001` — Overall Vision
- `AR-AI-BOS-002` — Constitution TOC
- The build decisions taken during Phase 0 (isolated root, skill split, registry design)

Does **not** introduce new architecture. Output is a verdict table plus a list of items requiring user decision or future validation.

## Principles

1. **Challenge before build** — assumptions are cheapest to fix now; every phase downstream compounds their cost.
2. **Name the assumption, name the challenger** — each row has a stated assumption and an explicit counter-position.
3. **Verdict must be actionable** — keep / revise / flag-for-validation, never "watch".
4. **Distinguish constitutional assumptions from operational ones** — the former must be ratified into the Constitution; the latter belong in Standards or the registry.

## Standards

### Assumption register

| # | Assumption (made in) | Challenger position | Risk if wrong | Verdict |
|---|----------------------|---------------------|---------------|---------|
| A1 | AI-BOS should be tool-independent and vendor-independent (Vision, TOC §3.2) | True independence is impossible — every artifact is *authored* in some tool; only *storage* and *references* can be independent | Knowledge content becomes subtly Cursor-flavored; migration to another IDE breaks references | **Keep**, but tighten: independence applies to *content and references*, not authoring environment. Flag for ratification in Constitution §3.2 |
| A2 | One Constitution governs the whole business (TOC §0, §6) | A single constitution may force-fit unrelated future domains (e.g. a research lab vs a client-delivery agency) into one governance shape | Constitution amendments pile up; sections become "lowest common denominator" | **Keep** with explicit clause: domain-specific *Standards* may extend, never override, the Constitution. Document in §6 Layer Model |
| A3 | Knowledge is separate from Agents, MCP, Projects, Runtime (Vision, TOC §6) | In practice agents *generate* knowledge (e.g. audit reports) — strict separation may block legitimate flows | Useful agent output is orphaned outside the registry | **Keep** the layer separation, but add rule: agent-*generated* knowledge is still a Knowledge Object with the agent listed as `owner`, not `consumer`. Flag for §3.1 Knowledge Philosophy |
| A4 | IDs are permanent and never change (Vision, TOC §5) | Reorganizations sometimes demand ID re-prefixing (e.g. domain rename) | Either brittle IDs or a painful one-time migration | **Keep** permanence; add §10 Amendment Process clause for *exception-only* ID re-issue with a redirect entry in the registry |
| A5 | Agents reference IDs, not paths (Vision, TOC §5) | Some runtime contexts (Cursor rules, MCP prompts) require concrete paths to function | Agents break when paths change despite correct IDs | **Keep** the rule for *knowledge references*; allow path references only in *runtime config* (`.cursor/`, MCP), never in knowledge bodies. Flag for §6 Layer Model |
| A6 | Repository structure is the final output, never the first (Vision, Planning Prompt) | Some teams need a skeleton repo to begin collaborating; deferring structure may stall momentum | Phase 4+ work blocked waiting for structure that doesn't exist yet | **Keep** the principle; allow a *temporary* scratch structure under `AI-BOS/_scratch/` (gitignored) for working drafts, never ratified. Document in §8 Evolution Process |
| A7 | AI-BOS lives as an isolated root inside Growrixos (Phase 0 decision) | Co-locating with a SaaS repo risks scope creep and accidental coupling to Growrixos delivery lanes | AI-BOS content drifts into Growrixos-specific assumptions; vendor independence violated | **Keep** isolated root, but add a *promotion trigger*: when AI-BOS Phase 5 (Knowledge Architecture) is approved, evaluate spinning it into its own repo. Flag for §8 Evolution Process |
| A8 | `@ai-bos-architect` authors content; `@system-builder` governs structure (Phase 0 split) | The split assumes a clean boundary; in practice content decisions (e.g. new Knowledge Object type) imply schema decisions | Boundary disputes slow the build; one skill ends up doing both | **Keep** the split; add a *tie-breaker rule*: any decision affecting the registry JSON schema or skill list is structural → `@system-builder`; everything else is content → `@ai-bos-architect`. Flag for §7.2 Decision Process |
| A9 | The Knowledge Registry is JSON indexes (Phase 0 scaffold) | JSON indexes work for Phase 1–5 scale; at Phase 4 (Evolution) they may need a graph or database | Migration cost from flat JSON to a real store | **Keep** JSON for now; flag for re-evaluation at Evolution Strategy phase (Phase 12). Do not over-build early |
| A10 | Phases are sequential and user-gated (Planning Prompt, TOC §8) | Sequential gating maximizes safety but minimizes throughput; some phases (e.g. Standards + Templates) are independent | Build feels slow; user approval becomes a bottleneck | **Keep** sequential gating for Phases 1–5 (foundational, high coupling); allow *parallel* authoring of independent later phases (10–12) with a single combined approval gate. Flag for §8 Evolution Process |
| A11 | The legacy repository is "reference only" (Vision) | Some legacy assets (handbooks, prompts) are still in active use; labeling them reference-only may orphan live work | Useful knowledge is lost or duplicated during migration | **Keep** the greenfield stance; add an explicit *absorption protocol* in §8: legacy assets are ingested one-by-one as new Knowledge Objects with `source: legacy` tag, never bulk-imported |
| A12 | The Constitution must never contain implementation details (TOC §0, Planning Prompt) | "Implementation detail" is fuzzy — is "JSON registry" an implementation detail? | Either the Constitution becomes too abstract to be useful, or it secretly encodes mechanism | **Keep** the rule; add a *test* in §10: a section is constitutional iff it remains true if every tool, language, and storage engine were swapped. Flag for §3 Philosophy |

### Items requiring user decision

| # | Decision | Why now | Default if no answer |
|---|----------|---------|----------------------|
| D1 | Confirm AI-BOS should eventually become its own repository (per A7 promotion trigger) | Affects how `@system-builder` treats the isolated root and whether paths should be repo-relative from the start | Default: yes, after Phase 5 approval |
| D2 | Confirm that agent-generated knowledge is allowed in the registry (per A3) | Affects whether `@ai-bos-architect` may register audit/review outputs as Knowledge Objects | Default: yes, with `owner: <agent-id>` |
| D3 | Confirm parallel authoring of independent later phases is acceptable (per A10) | Affects whether Phases 10–12 are gated individually or as a batch | Default: batch approval for 10–12 only |

### Items flagged for later validation

| # | Flag | When to validate |
|---|------|-------------------|
| F1 | A1 — vendor independence test | Phase 5 (Knowledge Architecture) |
| F2 | A4 — ID migration mechanism | Phase 12 (Evolution Strategy) |
| F3 | A7 — repo promotion trigger | After Phase 5 approval |
| F4 | A9 — registry storage upgrade | Phase 12 (Evolution Strategy) |
| F5 | A12 — constitutional-vs-implementation test | Phase 2 ratification (when Constitution body is authored) |

## Best Practices

- Re-run this review at the end of every foundational phase (1–5), not only once.
- Treat any assumption marked "flag for validation" as a backlog item, not a closed decision.
- When a verdict is "revise", update the source artifact (Vision or TOC) in the same session — do not let drift accumulate.
- Distinguish *constitutional* assumptions (must be ratified into the Constitution body in Phase 2 ratification) from *operational* ones (live in Standards or registry rules).

## Anti-patterns

- Listing assumptions without a counter-position — that is a summary, not a challenge.
- Marking everything "keep" without engaging the challenger position.
- Deferring all hard decisions to "later" — each flag must have a concrete validation trigger.
- Treating this review as a one-time gate; it is a recurring discipline for foundational phases.
- Folding revised assumptions silently back into Vision/TOC without recording the change in their Change History.

## References

- `knowledge/architecture/AR-AI-BOS-001-vision.md` — Vision (challenged)
- `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — Constitution TOC (challenged)
- `AI-BOS/.cursor/skills/ai-bos-architect/references/ai-bos-planning-prompt.md` — Phase 3 spec

## Related Knowledge Objects

- AR-AI-BOS-001 — Overall Vision (dependency; source of A1–A6, A11, A12)
- AR-AI-BOS-002 — Constitution TOC (dependency; source of A2–A6, A12)
- AR-AI-BOS-004 — Business Capability Model (Phase 4, not yet authored; will inherit surviving assumptions)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 3 assumption review — 12 assumptions challenged, 3 user decisions, 5 flags. Awaiting user approval. |
