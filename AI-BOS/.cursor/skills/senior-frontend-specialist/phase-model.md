# Phase Model — Senior Frontend Specialist

## Principle

Work in discrete phases. Run **narrow checks** during a phase; run **full gates** only at phase boundary via `@frontend-quality-enforcer`.

## P0 — Discovery

**Work:** Read brain, lane skill, existing DS/tokens, user brief.

**Mid-phase:** ReadLints on files read.

**Phase-end deliverable:** Scope doc on disk (`SCOPE.md` or section in conversion map).

**Gate:** Scope reviewed; ledger task marked `in_progress`.

---

## P1 — Tokens / Design System

**Work:** Token block (`:root`) or Tailwind `@theme` port; contrast table; dark mode.

**Delegate:** `design-system-architect` or `tailwind-design-system-architect`.

**Mid-phase:** typecheck on DS-related files if TS; validate token syntax.

**Phase-end:** DS audit — contrast AA+, required token groups present.

**Never:** Build sections before tokens lock.

---

## P2 — Primitives

**Work:** Buttons, inputs, cards, form shells, layout shells.

**Mid-phase:** lint + typecheck on touched components.

**Phase-end:** Component smoke — render states (hover, focus, disabled, loading, error).

---

## P3 — Sections

**Work:** Homepage sections, page templates, section migration batches.

**Mid-phase:** ReadLints per batch (not full site E2E).

**Phase-end:** Delegate `accessibility-auditor` + `performance-optimizer` (or Next.js equivalents); fix blockers.

---

## P4 — Integration

**Work:** shadcn/Radix, Clerk, Sanity presentation, Stripe checkout UI, third-party embeds.

**Mid-phase:** env contract check — enumerate from `.env.example`; never invent vars.

**Phase-end:** Integration smoke on wired flows.

**Reference:** [integration-patterns.md](integration-patterns.md)

---

## P5 — Verify

**Work:** Final refactor, docs sync, delivery report.

**Mid-phase:** none — go straight to enforcer.

**Phase-end:** `@frontend-quality-enforcer` full matrix for lane.

**Then:** Local commit; update ledger; never push unless user asks.

## Phase transitions

- Do not start P(n+1) while P(n) phase-end gate is failing
- User may approve skipping phases for trivial fixes — document rationale in ledger
- Complex HTML sites: align with html-website-builder Phase 1/2 split for 10+ views
