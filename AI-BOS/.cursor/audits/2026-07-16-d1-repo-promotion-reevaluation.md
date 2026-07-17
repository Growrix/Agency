# System Builder Audit — D1 Repo Promotion Re-Evaluation

**Date:** 2026-07-16
**Mode:** AUDIT
**Skill:** `@system-builder`
**Subject:** Should AI-BOS be promoted from isolated root inside Growrixos to its own repository?
**Trigger:** Phase 3 decision D1 Option B — "re-evaluate at Phase 11 gate." Phase 11 approved 2026-07-16.
**Prior evaluation:** `2026-07-16-d1-repo-promotion-evaluation.md` (Phase 5 gate → deferred to Phase 11)

## System Audit

### What changed since the Phase 5 evaluation

| Property | Phase 5 (prior eval) | Phase 11 (this eval) |
|----------|----------------------|----------------------|
| Knowledge artifacts | 5 (AR-001..005) | 11 (AR-001..011) |
| Phases complete | 0–5 | 0–11 |
| Registry model | 1 registry (knowledge) | 4 registries (knowledge / agent / mcp / project) — model complete |
| Registries physically scaffolded | `knowledge-registry/` only | `knowledge-registry/` only (agent/mcp/project registries defined but not yet scaffolded — deferred to first registration) |
| Repository structure designed? | No (deferred to Phase 11) | **No — explicitly re-deferred to Phase 12** by `AR-AI-BOS-011` |
| AI-BOS self-identity | Implicit | **Explicit: `PRJ-GOV-AI-BOS-001`** (AI-BOS is itself a project) |
| Consumers | 1 (Growrixos) | 1 (Growrixos) — unchanged |

### Key new facts from Phase 11

1. **Four-registry model is locked.** Knowledge → Agent → MCP → Project, one-way. The structural shape of AI-BOS is now fully defined at the model level.
2. **AI-BOS is itself a project** (`PRJ-GOV-AI-BOS-001`). This means AI-BOS could in principle live as its own project in its own repo, with Growrixos as a separate consuming project.
3. **Phase 11 explicitly re-locks the rule:** "Repository structure is the final output, designed in Phase 12." Phase 11 did not design the physical repo layout — it designed the *project model* that the repo layout will instantiate.
4. **Three of four registries are still conceptual.** `agent-registry/`, `mcp-registry/`, `project-registry/` directories do not yet exist on disk. Only `knowledge-registry/` is populated.

### What is still NOT designed

- The physical repository folder layout (explicitly Phase 12's job per `AR-AI-BOS-011`)
- Standards, templates, and evolution strategy (Phase 12)
- The actual on-disk `agent-registry/`, `mcp-registry/`, `project-registry/` directories

## Change Plan

### Option A — Promote to own repo now (before Phase 12)

**Action:** Move `AI-BOS/` to a new repo; promote `@ai-bos-architect` to personal skill; update 11 registry path entries + anatomy docs.

**Pros:**
- Aligns physical structure with AI-BOS's self-identity as `PRJ-GOV-AI-BOS-001` (its own project)
- Four-registry model is now stable enough to commit a repo layout
- Clean git history before Phase 12 produces templates/standards
- `@ai-bos-architect` reusable across workspaces

**Cons:**
- **Still violates the planning prompt's "Repository structure is the final output" rule** — Phase 12 is one phase away and is explicitly the phase that designs the repo layout
- Forces a repo layout decision before Phase 12 ratifies it (e.g. where do `agent-registry/`, `mcp-registry/`, `project-registry/` live relative to `knowledge-registry/`?)
- 3 of 4 registries not yet scaffolded — moving now means moving a partial structure and re-planning the missing three in the new repo
- Single consumer (Growrixos) still does not justify the split
- Premature: Phase 12 may decide AI-BOS *should* remain an isolated root (e.g. for single-consumer simplicity)

### Option B — Defer final decision to after Phase 12 (recommended)

**Action:** Keep AI-BOS as isolated root inside Growrixos through Phase 12. Phase 12 will design the repository structure as its final deliverable. Make the D1 promotion decision **at or after the Phase 12 gate**, when the designed repo layout is on the table.

**Pros:**
- **Honors the planning prompt's most explicit rule** — repo structure is the *final* output, designed in Phase 12, decided after
- Phase 12 will produce the actual folder layout for all four registries, templates, standards, and evolution strategy — the decision will be informed instead of speculative
- No premature commitment; no path churn across 11 artifacts
- AI-BOS remains portable (paths are AI-BOS-relative; a future move is mechanical)
- Lowest risk: the decision is made exactly once, with full information

**Cons:**
- AI-BOS physically remains inside a SaaS repo for one more phase (mild A7 coupling risk persists)
- `@ai-bos-architect` stays project-local until Phase 12 gate
- One more deferral (but this is the *last* deferral — Phase 12 is the terminal structural phase)

### Option C — Hybrid: promote skill now, defer repo move to after Phase 12

**Action:** Promote `@ai-bos-architect` to personal skill (`~/.cursor/skills/ai-bos-architect/`) now so it is invocable from any workspace; keep the AI-BOS content root inside Growrixos until the Phase 12 gate.

**Pros:**
- Skill becomes reusable across workspaces immediately (the real operational benefit)
- No premature repo structure decision
- Content root stays put; no path churn
- Future repo move is still mechanical

**Cons:**
- Skill and content live in different scopes until Phase 12
- Skill must reference the AI-BOS root by absolute path or env var until the repo move
- Two structural changes instead of one (skill promotion now, repo move later)
- Only justified if a second AI-BOS-consuming project will start before Phase 12

## Files Created or Updated

This audit is the only artifact. No structural changes applied — pending user decision.

## Remaining Gaps

- `missing_knowledge`: the physical repository layout (designed in Phase 12)
- `missing_knowledge`: whether any second consumer project will need AI-BOS before Phase 12

## Validation Results

| Checklist item | Status | Evidence |
|----------------|--------|----------|
| Archetype fit explicit | pass | `isolated_local_system_required` still holds |
| Anti-duplication checked | pass | `ai-bos-architect` sole AI-BOS planning skill |
| No fake orchestration | pass | Decision routed to user, not auto-executed |
| `tasks.md` reflects current state | pass | Phase 11 marked approved, D1 re-eval in_progress |
| Isolated root safety | pass | No leak of project-specific runtime into shared skill bundle |
| Prior decision referenced | pass | Phase 5 Option B decision and rationale cited |

## Recommendation

**Option B (defer to after Phase 12)** is the cleanest and is now the *final* deferral. Phase 11 just re-locked that the repository structure is designed in Phase 12 — so the D1 decision belongs at the Phase 12 gate, not before. Making it now would preempt the very next phase and force a repo layout before Phase 12 ratifies one. The four-registry model is stable at the *model* level, but 3 of 4 registries are not yet on disk; moving now means moving a partial structure.

**Option C (hybrid)** is the right choice only if you will start a second AI-BOS-consuming project before Phase 12 completes. Otherwise the skill promotion is premature.

**Option A (promote now)** is not recommended — it preempts Phase 12 by one phase and forces a layout decision Phase 12 is designed to make.

## Decision (recorded 2026-07-16)

**Selected: Option B — defer final D1 decision to after Phase 12.**

- No structural change applied.
- AI-BOS remains isolated root inside Growrixos through Phase 12.
- `@ai-bos-architect` remains project-local under `AI-BOS/.cursor/skills/`.
- Final D1 promotion decision will be made at the **Phase 12 gate**, when the repository folder layout is designed and on the table.
- This is the **last** D1 deferral — Phase 12 is the terminal structural phase.
- `agents_cursor.md`, `skills-index.md`, `lanes-index.md` unchanged (no scope change).
- Evidence: this file + `AI-BOS/tasks.md` log entry.
