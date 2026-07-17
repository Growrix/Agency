# System Builder Audit — D1 Repo Promotion Final Decision

**Date:** 2026-07-16
**Mode:** AUDIT
**Skill:** `@system-builder`
**Subject:** Should AI-BOS be promoted from isolated root inside Growrixos to its own repository? (FINAL decision)
**Trigger:** Phase 11 deferral — "final D1 decision at Phase 12 gate." Phase 12 approved 2026-07-16.
**Prior evaluations:**
- `2026-07-16-d1-repo-promotion-evaluation.md` (Phase 5 gate → Option B: defer to Phase 11)
- `2026-07-16-d1-repo-promotion-reevaluation.md` (Phase 11 gate → Option B: defer to Phase 12)

This is the **terminal** D1 decision. No further deferrals are available — Phase 12 is the last architecture phase.

## System Audit

### What changed since the Phase 11 deferral

| Property | Phase 11 (prior eval) | Phase 12 (this eval — FINAL) |
|----------|----------------------|------------------------------|
| Knowledge artifacts | 11 (AR-001..011) | 12 (AR-001..012) — architecture complete |
| Phases complete | 0–11 | 0–12 (ALL architecture phases done) |
| Repository structure designed? | No (deferred to Phase 12) | **YES — `AR-AI-BOS-012` commits the layout** |
| Four-registry model | Complete at model level | Complete at model level + physical layout committed |
| Registries physically scaffolded | `knowledge-registry/` only | `knowledge-registry/` only (agent/mcp/project still conceptual — implementation phase) |
| Standards/Templates authored | No | Catalogs defined (10 ST-*, 7 TP-*); **files not yet authored** (implementation phase) |
| Consumers | 1 (Growrixos) | 1 (Growrixos) — unchanged |
| Planning prompt "repo structure is final output" rule | Pending Phase 12 | **SATISFIED** — Phase 12 designed it |

### The decisive new fact

Phase 12 (`AR-AI-BOS-012`) **designed the repository structure**. The planning prompt's most explicit rule — "Repository structure must be the final output, not the first" — is now **satisfied**. The D1 decision is no longer premature on that axis.

However, three practical realities remain:
1. **Single consumer.** Only Growrixos consumes AI-BOS. No second project (agency, research, marketing) has materialized.
2. **Partial physical structure.** Three of four registries (`agent-registry/`, `mcp-registry/`, `project-registry/`) are still conceptual — not scaffolded on disk. Only `knowledge-registry/` is populated.
3. **No content yet.** The 10 `ST-*` standards and 7 `TP-*` templates are cataloged but not authored. AI-BOS currently holds 12 architecture decisions and zero reusable standards/templates/handbooks.

### What "promotion to own repo" would mean now

Moving `AI-BOS/` to e.g. `F:/PROJECTS/ai-bos/` would relocate:
- 12 architecture KOs + their registry entries
- 1 populated registry (`knowledge-registry/`)
- 3 un-scaffolded registries (defined but empty)
- The `@ai-bos-architect` skill (project-local → personal)
- The `tasks.md` ledger
- The `.cursor/rules/75-ai-bos-governance.mdc` rule

It would NOT relocate any content that does not yet exist (no ST/TP/HB/AG/MC/PRJ files). The moved repo would be architecture-complete but content-empty.

## Change Plan

### Option A — Promote to own repo now (architecture-complete, content-empty)

**Action:** Move `AI-BOS/` to a new dedicated repo; promote `@ai-bos-architect` to personal skill; update 12 registry path entries + anatomy docs + root rules 60/70.

**Pros:**
- The "repo structure is final output" rule is now satisfied — promotion is no longer premature on that axis
- AI-BOS self-identifies as `PRJ-GOV-AI-BOS-001` (its own project) — a separate repo aligns physical structure with that identity
- Clean git history before the implementation phase authors ST/TP/HB content
- Vendor independence is a core principle; living inside a SaaS repo (Growrixos) is a mild coupling (A7 risk)
- `@ai-bos-architect` becomes invocable from any workspace

**Cons:**
- Moves a content-empty repo (12 architecture KOs, 0 standards, 0 templates, 0 handbooks) — operational overhead with minimal payload
- 3 of 4 registries still conceptual — moving now means moving a partial physical structure
- Single consumer (Growrixos) does not justify the split
- Promotion is reversible but disruptive: 12 registry path entries + `agents_cursor.md` + `skills-index.md` + `lanes-index.md` + root rules 60/70 all need updates
- Separate CI, git history, sync discipline for a repo with no content yet
- The implementation phase (ST/TP authoring) will work the same whether AI-BOS is an isolated root or its own repo

### Option B — Keep as isolated root; close D1 with a re-evaluation trigger (recommended)

**Action:** Keep AI-BOS as isolated root inside Growrixos. **Close the D1 trigger** (no more deferrals — this is a decision, not a delay). Set a concrete re-evaluation trigger: promote when EITHER (a) a second consumer project materializes, OR (b) the implementation phase authors ≥10 `ST-*`/`TP-*`/`HB-*` KOs that make the isolated-root-inside-Growrixos awkward.

**Pros:**
- Honest decision (not a deferral): "promote when there is something to promote"
- Avoids moving a content-empty repo — the move will be mechanical and worthwhile once content exists
- Honors the single-consumer reality: no split without a second consumer
- The repository structure is designed and committed (Phase 12) — the layout is identical whether AI-BOS is an isolated root or its own repo; promotion later is mechanical (paths are AI-BOS-relative)
- Lowest risk: no path churn, no anatomy updates, no CI split until justified
- The implementation phase proceeds without disruption

**Cons:**
- AI-BOS physically remains inside a SaaS repo (mild A7 coupling risk persists)
- `@ai-bos-architect` stays project-local (cannot invoke from other workspaces)
- Slight cognitive overhead: "AI-BOS is its own system but lives in Growrixos" — but this is now well-documented in `README.md`, `RUN.md`, root rules 60/70, and `agents_cursor.md`

### Option C — Hybrid: promote `@ai-bos-architect` skill now, keep content root in Growrixos

**Action:** Promote `@ai-bos-architect` from project-local to personal skill (`~/.cursor/skills/ai-bos-architect/`) so it is invocable from any workspace; keep the AI-BOS content root inside Growrixos until a second consumer or content milestone triggers the repo move.

**Pros:**
- Skill becomes reusable across workspaces immediately (the real operational benefit)
- No premature repo move — content root stays put
- Future repo move is still mechanical
- Justified if you plan to start a second AI-BOS-consuming project before the content milestone

**Cons:**
- Skill and content live in different scopes (skill personal, content project-local) — slightly unusual
- Skill must reference the AI-BOS root by absolute path or env var until the repo move
- Two structural changes instead of one (skill promotion now, repo move later)
- Only justified if a second workspace need is real — you have not indicated one

## Files Created or Updated

This audit is the only artifact. No structural changes applied — pending user decision.

## Remaining Gaps

- `missing_knowledge`: whether a second AI-BOS-consuming project will materialize (operational, not architectural)
- `missing_knowledge`: the implementation phase timeline for ST/TP/HB authoring

## Validation Results

| Checklist item | Status | Evidence |
|----------------|--------|----------|
| Archetype fit explicit | pass | `isolated_local_system_required` still holds |
| Anti-duplication checked | pass | `ai-bos-architect` sole AI-BOS planning skill |
| No fake orchestration | pass | Decision routed to user, not auto-executed |
| `tasks.md` reflects current state | pass | Phase 12 marked approved, final D1 in_progress |
| Isolated root safety | pass | No leak of project-specific runtime into shared skill bundle |
| Prior decisions referenced | pass | Phase 5 + Phase 11 D1 evaluations cited |
| Terminal decision rule honored | pass | This is the final D1 — no further deferral offered as the primary path |

## Recommendation

**Option B (keep as isolated root; close D1 with a re-evaluation trigger)** is the cleanest terminal decision.

**Why not Option A:** The "repo structure is final output" rule is now satisfied, but the *content* that would fill the repo is not yet authored. Moving a content-empty repo (12 architecture KOs, 0 standards, 0 templates, 0 handbooks, 3 of 4 registries not scaffolded) adds operational overhead — separate CI, git history, sync discipline — with minimal payload. The move will be mechanical and worthwhile once either content exists or a second consumer appears. Promotion is reversible but disruptive (12 registry entries + anatomy docs + root rules all need updates); doing it now buys little.

**Why not Option C:** Only justified if you will start a second AI-BOS-consuming project before the content milestone. You have not indicated one. The skill promotion is a real benefit only if there is a second workspace to invoke it from.

**The re-evaluation trigger (concrete, not open-ended):**
- **Trigger 1:** A second project (agency, research, marketing, etc.) begins consuming AI-BOS knowledge → promote immediately.
- **Trigger 2:** The implementation phase authors ≥10 `ST-*`/`TP-*`/`HB-*` Knowledge Objects → re-evaluate; the isolated-root-inside-Growrixos may become awkward.
- **Trigger 3:** User explicitly requests promotion → execute without further evaluation.

Until any trigger fires, AI-BOS remains an isolated root inside Growrixos. The D1 trigger is **closed** (this is a decision, not a deferral).

## Decision (recorded 2026-07-16 — TERMINAL)

**Selected: Option B — keep AI-BOS as isolated root inside Growrixos; close the D1 trigger with concrete re-evaluation triggers.**

This is the **terminal** D1 decision. No further deferrals.

### What is applied now
- No structural change applied.
- AI-BOS remains an isolated root inside Growrixos.
- `@ai-bos-architect` remains project-local under `AI-BOS/.cursor/skills/`.
- `agents_cursor.md`, `skills-index.md`, `lanes-index.md`, root rules 60/70 unchanged (no scope change).
- The D1 trigger is **CLOSED** (this is a decision, not a deferral).

### Re-evaluation triggers (concrete, not open-ended)
The D1 decision re-opens automatically when ANY of the following fires:

1. **Trigger 1 — Second consumer:** A second project (agency, research, marketing, etc.) begins consuming AI-BOS knowledge → promote immediately, no further evaluation.
2. **Trigger 2 — Content milestone:** The implementation phase authors ≥10 `ST-*`/`TP-*`/`HB-*` Knowledge Objects → re-evaluate; the isolated-root-inside-Growrixos may become awkward.
3. **Trigger 3 — Explicit user request:** User explicitly requests promotion → execute without further evaluation.

Until any trigger fires, AI-BOS remains an isolated root inside Growrixos.

### Rationale recorded
- The "repo structure is final output" rule is now satisfied (Phase 12 designed the layout), so promotion is no longer premature on that axis.
- However, the content that would fill the repo is not yet authored (0 ST/TP/HB files; 3 of 4 registries not scaffolded). Moving a content-empty repo adds operational overhead (separate CI, git history, sync discipline) with minimal payload.
- Single consumer (Growrixos) does not justify the split.
- The move will be mechanical when justified (paths are AI-BOS-relative).
- Evidence: this file + `AI-BOS/tasks.md` log entry.

### Architecture phase status
With this decision, **all 12 AI-BOS architecture phases are complete and approved**. AI-BOS transitions from the architecture lifecycle to the **implementation and evolution lifecycle** governed by the Evolution Strategy defined in `AR-AI-BOS-012`.
