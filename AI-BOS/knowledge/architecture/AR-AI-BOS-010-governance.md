---
id: AR-AI-BOS-010
title: AI-BOS Governance
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
  - AR-AI-BOS-002
  - AR-AI-BOS-004
  - AR-AI-BOS-007
  - AR-AI-BOS-009
related:
  - governance
  - roles
  - decision-process
  - authority
  - amendment-process
  - audit
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - governance
  - authority
  - decision-process
  - foundational
---

# AI-BOS Governance

## Purpose

Define **how AI-BOS governs itself** — who owns what, how decisions are made, how authority is delegated, how the Constitution and Standards change over time, and how the system stays auditable. Where Phase 7 defined authority levels for agents and Phase 9 defined gate semantics for executions, Phase 10 ratifies those into a coherent governance model: the rules that govern the rules.

This is the phase that makes AI-BOS self-governing rather than ad-hoc. It is the operational counterpart to the Constitution (Phase 2 TOC, Section 7) — where the Constitution states *why* we govern, this phase states *how*.

## Scope

Defines:
- Roles and ownership (who owns what kind of artifact)
- Decision process (how changes are proposed, reviewed, approved, rejected)
- Authority matrix (which decisions a human must make, which an agent may make, which require both)
- Amendment process (how the Constitution and Standards change)
- Conflict resolution (what happens when roles disagree)
- Audit and compliance posture
- Vendor independence for governance

Does **not** define:
- The Constitution body itself (Phase 2 TOC ratification, future)
- Concrete Standards content (Phase 12)
- Specific agent definitions (Phase 12 or per-project)
- Repository folder layout (Phase 11)

## Principles

1. **Governance is separate from content** — governance rules are not knowledge content; they are the rules that govern how knowledge content is created and changed.
2. **Authority is delegated, not seized** — an agent may not escalate its own authority; only a human or a declared governance process may change authority.
3. **Decisions are recorded, not silent** — every material decision has a decision-record (per Phase 6 doc type) with context, decision, status, consequences, alternatives.
4. **The human is the final authority** — for material changes, a human must approve; agents may propose and execute, but ratification is human.
5. **Governance is itself governed** — changes to governance rules follow the same amendment process as the Constitution.
6. **Vendor independence applies to governance** — governance rules must not assume a specific tool, provider, or runtime.

## Standards

### Roles and ownership

| Role | Owns | Authority | Examples |
|------|------|-----------|----------|
| **AI-BOS Owner** (human) | Constitution, Governance, layer model | Final authority on all material changes | Approves phases, ratifies Constitution, decides repo promotion |
| **Knowledge Owner** (human or agent) | Specific Knowledge Objects | Authors and maintains KOs within their domain | `@ai-bos-architect` owns `AR-AI-BOS-*` architecture KOs |
| **Agent Owner** (human) | Agent definitions in agent registry | Authors and maintains agent definitions | `@system-builder` owns `AG-OPS-GOV-001` (itself) |
| **MCP Owner** (human or agent) | MCP server definitions in MCP registry | Authors and maintains MCP server definitions | Future `AG-PLT-MCP-001` |
| **Workflow Owner** (human or agent) | Workflow KOs | Authors and maintains workflows | `@ai-bos-architect` owns phased planning workflows |
| **Project Owner** (human) | Project instantiations | Decides which capabilities a project instantiates | Per-project human owner |
| **Auditor** (human or autonomous agent) | Provenance logs, registry integrity | Verifies compliance; does not author content | Future `AG-KNW-VALID-001` |

**Rules:**
- Every artifact has exactly one owner role.
- An owner may delegate execution but not ownership.
- The AI-BOS Owner role is always held by a human; it cannot be delegated to an agent.

### Decision process

Every material change follows this process:

```text
1. Propose   ── any role may propose; recorded as a decision-record (DOC-GOV-*)
2. Review    ── Auditor + domain owner review for compliance and impact
3. Decide    ── AI-BOS Owner (human) approves, rejects, or defers
4. Record    ── decision-record updated with status, consequences, alternatives
5. Execute   ── assigned owner implements; provenance logged
6. Verify    ── Auditor verifies execution matches decision
```

| Decision type | Required approver | Recorded as |
|---------------|-------------------|-------------|
| Constitutional amendment | AI-BOS Owner (human) | Amendment record in Constitution §11 |
| New Standard (ST) | AI-BOS Owner (human) | Decision-record + ST KO |
| New agent (AG) | AI-BOS Owner (human) + Agent Owner | Decision-record + agent registry entry |
| New MCP server (MC) | AI-BOS Owner (human) + MCP Owner | Decision-record + MCP registry entry |
| New Knowledge Object (HB, AR, BP, etc.) | Domain owner (per role table) | KO with `status: draft` → `active` |
| Phase advancement | AI-BOS Owner (human) | tasks.md log entry |
| Routine KO update (patch) | KO owner | KO Change History entry |
| Minor doc update (typo) | Doc owner | Doc Change History entry |

**Rule:** Decisions that affect the layer model, registry schemas, or authority levels are always constitutional and require the AI-BOS Owner. Decisions within an existing Standard's scope may be made by the domain owner.

### Authority matrix

Ratifies Phase 7's three authority levels and binds them to decision types.

| Decision class | `autonomous` agent | `supervised` agent | `advisory` agent | Human |
|----------------|--------------------|--------------------|------------------|-------|
| Routine KO patch (no schema change) | May execute | May execute | May propose | May execute |
| New KO within existing Standard | May not | May execute, human ratifies | May propose | May execute |
| New Standard | May not | May not | May propose | Required |
| New agent | May not | May not | May propose | Required |
| Constitutional amendment | May not | May not | May propose | Required |
| Authority escalation | May not | May not | May not | Required |
| Phase advancement | May not | May not (stops at gate) | May propose | Required |
| Repo promotion (e.g. D1) | May not | May not | May propose | Required |

**Rules:**
- An `autonomous` agent may execute only within its declared capability and only for routine, low-risk, idempotent work.
- A `supervised` agent may execute and propose, but stops at defined gates for human ratification.
- An `advisory` agent may only propose; a human decides.
- No agent may escalate its own authority. No agent may ratify its own output to `active` (per Phase 7 anti-self-certification rule).
- The human is always the final authority for material changes.

### Amendment process

How the Constitution and Standards change over time.

```text
1. Proposal     ── any role may propose an amendment; recorded as decision-record
2. Impact audit  ── Auditor identifies affected KOs, agents, MCP servers, workflows
3. Review        ── domain owners review; AI-BOS Owner decides whether to proceed
4. Draft         ── amendment text authored as a new version of the Constitution or Standard
5. Ratification  ── AI-BOS Owner (human) approves; new version becomes active; old version deprecated
6. Migration     ── affected artifacts updated within one ledger cycle
7. Archive       ── superseded version archived after 90-day waiting period (per Phase 5 lifecycle)
```

**Rules:**
- Amendments are additive by default; deletions require explicit deprecation with a successor.
- An amendment that changes the layer model (Phase 5/7/8 separation) is a *major* constitutional change and requires a fresh Phase-3-style assumption review before ratification.
- An amendment that changes authority levels requires all current agents to be re-validated against the new authority matrix.
- Amendments are versioned (per Phase 5 versioning); the Constitution's version bumps per its own Section 9.

### Conflict resolution

When roles disagree:

| Conflict type | Resolution |
|----------------|------------|
| Two owners claim the same artifact | AI-BOS Owner decides; ownership is single |
| Agent proposes, human rejects | Human decision is final; agent may not re-propose the same change without new context |
| Agent exceeds authority | Execution aborts (per Phase 9); escalation to AI-BOS Owner; agent may be deprecated |
| Two Standards contradict | The more restrictive Standard governs until the contradiction is resolved by amendment |
| Two agents declare the same capability | AI-BOS Owner arbitrates; one agent is deprecated or reassigned |
| Provenance and artifact disagree | Provenance is truth; the artifact is suspect and re-validated |

**Rule:** In all conflicts, the human (AI-BOS Owner) is the final authority. Agents do not arbitrate between themselves.

### Audit and compliance posture

| Audit target | Auditor | Frequency | Output |
|---------------|---------|-----------|--------|
| Registry integrity (ID uniqueness, dependency resolution) | `AG-KNW-VALID-001` (future, autonomous) | Per change | Validation report |
| Provenance completeness | Auditor role | Per execution | Provenance audit log |
| Authority compliance | Auditor role | Per agent action | Authority compliance report |
| Vendor independence | AI-BOS Owner (human) | Quarterly | Independence audit (per Phase 3 F1) |
| Constitutional drift | AI-BOS Owner (human) | Annual | Drift report; triggers amendment if needed |

**Rules:**
- Auditors do not author content; they verify.
- An autonomous auditor may flag issues but may not fix them; the owner fixes.
- Audit reports are themselves Knowledge Objects (type `EX` or `ST`) with `owner: <auditor-id>`.

### Vendor independence for governance

Governance rules must not assume:
- A specific IDE (Cursor, VS Code, JetBrains)
- A specific AI provider (OpenAI, Anthropic, Google)
- A specific runtime (Task tool, function calling, standalone orchestrator)
- A specific storage backend (filesystem, database, cloud)

**Rule:** If a governance rule would not survive a tool swap, it belongs in a Standard (which may reference tools), not in the Constitution or this Governance artifact.

### Relationship to existing governance

| Existing artifact | Governance role |
|-------------------|------------------|
| `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc` | Runtime projection of this Governance artifact into Cursor |
| `~/.cursor/docs/agents_cursor.md` | The anatomy doc maintained by `@system-builder`; reflects governance decisions |
| `~/.cursor/skills/system-builder/registry/skills-index.md` | Personal skills registry; governed by `@system-builder` per this model |
| `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-evaluation.md` | A decision-record (DOC-GOV-*) per this governance model |

This Governance artifact ratifies the existing practice: `@system-builder` governs structure, `@ai-bos-architect` authors content, the human approves material changes.

## Best Practices

- Record every material decision as a decision-record; chat is not the SSOT.
- Use the authority matrix to decide *before* acting, not after.
- When in doubt about authority, default to the more restrictive level (require human approval).
- Treat amendments as additive; deletions are expensive and require successor objects.
- Run an impact audit before ratifying any constitutional change.
- Keep the Auditor role separate from ownership; an auditor cannot own what it audits.
- Re-validate all agents when authority levels change.
- Treat the AI-BOS Owner role as always human; never delegate final authority to an agent.

## Anti-patterns

- Letting an agent ratify its own output to `active` (violates Phase 7 anti-self-certification).
- Letting an agent escalate its own authority.
- Making constitutional changes without an impact audit.
- Storing governance decisions only in chat (decision-records are the SSOT).
- Allowing two owners to claim the same artifact (ownership is single).
- Embedding tool-specific rules in the Constitution or Governance artifact.
- Letting an agent arbitrate between itself and a human.
- Skipping the 90-day archive waiting period for superseded Standards.
- Treating audit reports as content (they are verification artifacts with `owner: <auditor-id>`).
- Delegating the AI-BOS Owner role to an agent.

## References

- `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — Constitution TOC (dependency; Section 7 Governance and Section 10 Amendment Process)
- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; `CAP-OPS-005` Governance & Evolution)
- `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — Agent Architecture (dependency; authority levels to ratify)
- `knowledge/architecture/AR-AI-BOS-009-execution-architecture.md` — Execution Architecture (dependency; gate semantics and provenance to ratify)
- `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc` — runtime projection of this artifact

## Related Knowledge Objects

- AR-AI-BOS-011 — Project Architecture (Phase 11; projects instantiate governance roles per-project)
- ST-GOV-001 — Governance Standard (Phase 12; will formalize decision-record schema as a Standard)
- ST-GOV-002 — Amendment Standard (Phase 12; will formalize amendment mechanics)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 10 Governance — 7 roles, 6-step decision process, authority matrix ratifying Phase 7 levels, 7-step amendment process, 6 conflict-resolution rules, audit posture, vendor independence. Ratifies existing `@system-builder`/`@ai-bos-architect`/human practice. Awaiting user approval. |
