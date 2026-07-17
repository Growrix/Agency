# System Builder Audit — D1 Repo Promotion Evaluation

**Date:** 2026-07-16  
**Mode:** AUDIT  
**Skill:** `@system-builder`  
**Subject:** Should AI-BOS be promoted from isolated root inside Growrixos to its own repository?  
**Trigger:** Phase 3 decision D1 default — "evaluate own-repo after Phase 5 approval." Phase 5 approved 2026-07-16.

## System Audit

### Current state

| Property | Value |
|----------|-------|
| Archetype | `isolated_local_system_required` (locked at Phase 0) |
| Physical location | `F:/PROJECTS/Growrixos/AI-BOS/` (inside Growrixos monorepo) |
| Skill scope | project-local (`.cursor/skills/ai-bos-architect/`) |
| Rule scope | project-local (`.cursor/rules/75-ai-bos-governance.mdc`) |
| Ledger | `AI-BOS/tasks.md` |
| Registry | `AI-BOS/knowledge-registry/` (5 objects, all paths AI-BOS-relative) |
| Knowledge artifacts | 5 (AR-AI-BOS-001 through 005) |
| Phases complete | 0–5 (foundational architecture locked) |
| Phases pending | 6–12 (Documentation, Agent, MCP, Execution, Governance, Project, Standards/Templates/Evolution) |
| Consumers | 1 (Growrixos itself; no external project consumes AI-BOS yet) |

### What Phase 5 locked

- Knowledge Object type taxonomy (12 types, permanent)
- Registry structure (JSON indexes + root manifest)
- Consumer model (one-way: Knowledge → Agent → Project)
- Lifecycle states and transitions
- Capability binding rule (`capabilities` field mandatory)
- 10 validation rules

### What is NOT yet designed

- Repository folder structure (explicitly deferred to Phase 11 per planning prompt: "Repository structure must be the final output — not the first")
- Agent architecture (Phase 7)
- MCP architecture (Phase 8)
- Project architecture (Phase 11)

## Change Plan

### Option A — Promote to own repo now

**Action:** Move `AI-BOS/` to a new repo (e.g. `F:/PROJECTS/ai-bos/`); promote `@ai-bos-architect` from project-local to personal skill (`~/.cursor/skills/ai-bos-architect/`); update `agents_cursor.md`, `skills-index.md`, `lanes-index.md`; update 5 registry path entries.

**Pros:**
- Aligns physical structure with AI-BOS's stated vendor-independence and business-OS scope (not a Growrixos sub-component)
- `@ai-bos-architect` becomes available in all workspaces, not just Growrixos
- Clean git history for AI-BOS from this point forward
- Easier to share AI-BOS with future projects (agency, research, marketing domains)
- Eliminates risk of accidental coupling to Growrixos delivery lanes (A7 risk)

**Cons:**
- **Violates the planning prompt's "Repository structure is the final output" principle** — promoting means choosing a repo layout now, before Phase 11 designs it
- Only 5 artifacts exist; premature structural commitment
- Phases 6–12 may add structure that informs the ideal repo layout
- Operational overhead: separate CI, git history, sync discipline
- Single consumer (Growrixos) does not yet justify the split
- Promotion is reversible but disruptive (path updates across 5 registry entries + anatomy docs)

### Option B — Defer promotion to Phase 11/12 (recommended)

**Action:** Keep AI-BOS as isolated root inside Growrixos until Phase 11 (Project Architecture) and Phase 12 (Evolution Strategy) design the repository structure. Record this decision in the ledger; re-evaluate at Phase 11 gate.

**Pros:**
- Honors the planning prompt: repository structure is designed last, not chosen now
- Phases 6–10 will reveal what the repo actually needs to hold (agents, MCP, workflows, templates)
- No premature commitment; no path churn
- AI-BOS remains portable — paths are already AI-BOS-relative, so a future move is mechanical
- `@ai-bos-architect` can still be promoted to personal skill later without moving the repo

**Cons:**
- AI-BOS physically remains inside a SaaS repo (mild A7 coupling risk persists)
- `@ai-bos-architect` stays project-local until promotion (cannot be invoked from other workspaces)
- Slight cognitive overhead: "AI-BOS is its own system but lives in Growrixos"

### Option C — Hybrid: promote skill now, defer repo move

**Action:** Promote `@ai-bos-architect` to personal skill (`~/.cursor/skills/ai-bos-architect/`) so it is invocable from any workspace; keep the AI-BOS content root inside Growrixos until Phase 11.

**Pros:**
- Skill becomes reusable across workspaces immediately (the real operational benefit)
- No premature repo structure decision
- Content root stays put; no path churn
- Future repo move is still mechanical (paths are AI-BOS-relative)

**Cons:**
- Skill and content live in different scopes (skill personal, content project-local) — slightly unusual
- Requires the skill to reference the AI-BOS root by absolute path or environment variable until promotion
- Two structural changes instead of one (skill promotion now, repo move later)

## Files Created or Updated

This audit is the only artifact. No structural changes applied yet — pending user decision.

## Remaining Gaps

- `missing_knowledge`: future repo layout (designed in Phase 11)
- `missing_knowledge`: whether any future domain (agency, research) will need AI-BOS before Phase 11

## Validation Results

| Checklist item | Status | Evidence |
|----------------|--------|----------|
| Archetype fit explicit | pass | `isolated_local_system_required` |
| Anti-duplication checked | pass | `ai-bos-architect` is the sole AI-BOS planning skill |
| No fake orchestration | pass | Decision routed to user, not auto-executed |
| `tasks.md` reflects current state | pass | Phase 5 marked approved, D1 evaluation in_progress |
| Isolated root safety | pass | No leak of project-specific runtime into shared skill bundle |

## Recommendation

**Option B (defer to Phase 11)** is the cleanest. It honors the planning prompt's most explicit rule — "Repository structure must be the final output, not the first" — and avoids premature structural commitment. The current isolated-root setup is already portable (paths are AI-BOS-relative), so a future move is mechanical.

**Option C (hybrid)** is the right choice if the operational benefit of invoking `@ai-bos-architect` from other workspaces outweighs the slight scope split. This is a real benefit if you plan to start a second project (agency, research) before Phase 11.

**Option A (promote now)** is not recommended — it forces a repository layout decision before Phase 11 designs it.

## Decision (recorded 2026-07-16)

**Selected: Option B — defer to Phase 11.**

- No structural change applied.
- AI-BOS remains isolated root inside Growrixos.
- `@ai-bos-architect` remains project-local under `AI-BOS/.cursor/skills/`.
- Re-evaluate at Phase 11 gate when repository structure is designed.
- `agents_cursor.md`, `skills-index.md`, `lanes-index.md` unchanged (no scope change).
