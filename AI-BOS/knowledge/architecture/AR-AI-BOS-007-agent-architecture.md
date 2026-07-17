---
id: AR-AI-BOS-007
title: AI-BOS Agent Architecture
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
  - AR-AI-BOS-004
  - AR-AI-BOS-005
  - AR-AI-BOS-006
related:
  - agent-architecture
  - agent-registry
  - consumer-model
  - handoffs
  - vendor-independence
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - agent-architecture
  - agents
  - foundational
---

# AI-BOS Agent Architecture

## Purpose

Define the **agent layer** of AI-BOS — what an agent is, how agents are registered, how they consume Knowledge Objects and documentation, how they declare which capabilities they serve, how they hand off to each other, and how they relate to humans and MCP servers.

Where Phase 5 defined the substrate (Knowledge Objects) and Phase 6 defined the presentation (documentation), Phase 7 defines the **performer** layer: agents are the active consumers that turn knowledge into action. The Phase 3 insight — *"agents consume knowledge; agents are not knowledge"* — is the foundational rule of this layer.

## Scope

Defines:
- What an agent is (and is not) in AI-BOS
- Agent registry (separate from knowledge registry)
- Agent identity, lifecycle, and versioning
- How agents consume Knowledge Objects (by ID) and documentation (by path)
- How agents declare which capabilities they serve
- Agent-to-agent handoff contracts
- Agent vs human role separation and co-execution
- Agent-generated knowledge (per Phase 3 decision D2)
- Vendor independence for agents

Does **not** define:
- Concrete agent definitions (Phase 12, or per-project instantiation)
- MCP servers or capability contracts (Phase 8)
- Project instantiation of agents (Phase 11)
- Repository folder layout (Phase 11)

## Principles

1. **Agents are performers, not knowledge** — an agent consumes Knowledge Objects but is not itself a Knowledge Object. Agents live in their own registry.
2. **Agents are capability-bound** — every agent declares which capabilities it serves; an agent with no capability binding is a draft, not ratified.
3. **Agents consume by ID, never by path** — knowledge references use KO IDs; documentation references use paths (per Phase 6).
4. **Agents are vendor-independent concepts** — an AI-BOS agent is a role + capability binding + knowledge consumption contract, not a Cursor/Claude/Copilot wrapper. Runtime wrappers are project-specific projections of an AI-BOS agent.
5. **Agents can generate knowledge** — per Phase 3 decision D2, agent-generated knowledge is allowed as Knowledge Objects with `owner: <agent-id>`.
6. **Handoffs are contracts, not commands** — an agent-to-agent handoff is a declared contract (what is passed, what is expected), not a hidden autonomous call.
7. **Humans and agents are co-performers** — the architecture treats humans and AI agents symmetrically at the role level; authority differs, but capability binding is the same.

## Standards

### What an agent is

An AI-BOS agent is a **named, versioned performer** that:

1. Declares one or more capabilities it serves (from `AR-AI-BOS-004`)
2. Declares which Knowledge Objects it consumes (by ID)
3. Declares its authority level (autonomous / supervised / advisory)
4. Has a defined handoff contract for routing work to other agents or humans
5. May generate Knowledge Objects (with `owner: <agent-id>`)

An agent is **not**:
- A Knowledge Object (agents live in `agent-index.json`, not `handbook-index.json`)
- A tool or MCP server (those provide capabilities; agents use capabilities)
- A project-specific runtime wrapper (Cursor `.cursor/agents/*.md` files are projections, not the agent itself)
- A human role (humans are co-performers; agents are AI performers)

### Agent identity

| Property | Rule |
|----------|------|
| ID format | `AG-<GROUP>-<ROLE>-<NNN>` (e.g. `AG-KNW-ARCH-001`) |
| ID permanence | Permanent once registered; never reused |
| Name | Human-readable, stable across versions |
| Version | Semver; major bump on capability or authority change |
| Type | Always `agent` in the agent registry |

### Agent registry

A dedicated registry, separate from the knowledge registry. Lives at `AI-BOS/agent-registry/`.

```text
agent-registry/
├── registry.json              # root manifest (SSOT)
└── agent-index.json           # all agents
```

**Why separate from the knowledge registry:** agents consume knowledge; if agents lived in the knowledge registry, the one-way consumer model (Phase 5) would be violated. The agent registry references knowledge IDs; the knowledge registry never references agent IDs.

### Agent object shape

```json
{
  "id": "AG-KNW-ARCH-001",
  "name": "AI-BOS Architect",
  "version": "1.0.0",
  "status": "active",
  "capabilities": ["CAP-KNW-001", "CAP-KNW-002", "CAP-OPS-005"],
  "consumes": ["AR-AI-BOS-005", "AR-AI-BOS-006", "AR-AI-BOS-002"],
  "authority": "supervised",
  "handoffs": [
    { "to": "@system-builder", "when": "structural change needed" },
    { "to": "@task-ledger", "when": "ledger update needed" }
  ],
  "generates": ["AR-AI-BOS-*"],
  "owner": "AI-BOS",
  "updated": "2026-07-16"
}
```

| Field | Meaning |
|-------|---------|
| `capabilities` | Which `CAP-*` IDs this agent serves |
| `consumes` | Which Knowledge Object IDs this agent reads (by ID, never path) |
| `authority` | `autonomous` (no human approval needed) / `supervised` (human approval at gates) / `advisory` (output is input to a human decision) |
| `handoffs` | Declared contracts for routing work elsewhere |
| `generates` | Pattern of KO IDs this agent may produce (e.g. `AR-AI-BOS-*`) |

### Authority levels

| Level | Meaning | Example use |
|-------|---------|--------------|
| `autonomous` | Acts without human approval per action; governed by rules | A validator agent that checks front matter |
| `supervised` | Acts but stops at defined gates for human approval | `@ai-bos-architect` (stops at phase gates) |
| `advisory` | Produces recommendations; a human decides | A code-review agent that reports findings |

**Rule:** Authority level is declared per agent, not per action. An agent may not escalate its own authority; escalation requires a human to update the agent registry.

### Agent lifecycle

```text
draft ──ratify──▶ active ──deprecate──▶ deprecated ──archive──▶ archived
   ▲                                                            │
   └────────────── supersede (new version or new ID) ───────────┘
```

Mirrors the Knowledge Object lifecycle (Phase 5) with one addition:

- `draft → active` requires **capability binding validation** (declared capabilities must exist in `AR-AI-BOS-004`) AND **consumer validation** (declared `consumes` KOs must exist or be co-authored).

### Agent-generated knowledge (per D2)

Per Phase 3 decision D2 (default accepted): agent-generated knowledge is allowed.

| Rule | Detail |
|------|--------|
| `owner` field | Set to the agent's ID (e.g. `owner: AG-KNW-ARCH-001`) |
| `status` | Starts as `draft`; ratification follows normal KO lifecycle |
| `consumers` | Must include at least one capability ID (same as human-authored KOs) |
| Validation | Same 10 validation rules as human-authored KOs (Phase 5) |
| Audit trail | The KO's Change History must record the generating agent |

**Rule:** An agent may not ratify its own output to `active` — ratification requires a human or a separate `autonomous`-authority validator agent. This prevents self-certification.

### Agent-to-agent handoffs

Handoffs are declared contracts, not hidden calls. Each handoff specifies:

| Field | Meaning |
|-------|---------|
| `to` | The receiving agent's ID (or `@skill-name` in runtime projection) |
| `when` | The condition that triggers the handoff |
| `passes` | What is passed (KO IDs, task state, context) |
| `expects` | What is expected back (artifact, decision, status) |

**Rule:** Handoffs are user-routing guidance, not autonomous orchestration. An agent declares a handoff; the human (or supervising system) executes it. This matches the `@system-builder` SKILL.md rule: *"Handoffs are user-routing guidance, not hidden autonomous orchestration."*

### Agent vs human roles

| Property | Human | Agent |
|----------|-------|-------|
| Authority | Default `supervised` for material work; `autonomous` for personal tasks | Declared per agent |
| Capability binding | Implicit (a human's role) | Explicit (in agent registry) |
| Knowledge consumption | Reads docs and KOs directly | Reads KOs by ID via declared `consumes` |
| Knowledge generation | Authors KOs with `owner: <human-id>` | Authors KOs with `owner: <agent-id>` |
| Handoffs | Routes work to agents or other humans | Declares handoff contracts; human executes |
| Lifecycle | N/A (humans are not versioned) | draft → active → deprecated → archived |

**Co-execution rule:** When a human and an agent share a capability, the human holds authority by default; the agent is `supervised` or `advisory`. An agent may not override a human decision within the same capability.

### Runtime projection (vendor independence)

An AI-BOS agent is a vendor-independent concept. To execute in a specific environment, it is **projected** to a runtime wrapper:

| Runtime | Projection of `AG-KNW-ARCH-001` |
|---------|--------------------------------|
| Cursor | `.cursor/skills/ai-bos-architect/SKILL.md` (project-local skill) |
| Claude Code | A `CLAUDE.md` section or skill file |
| GitHub Copilot | A `.github/copilot-instructions.md` section |
| OpenAI / Anthropic | A system prompt template |

**Rule:** The runtime projection is a thin wrapper that references the AI-BOS agent ID. The agent's capability binding, authority, and handoffs live in the agent registry; the runtime wrapper only adds tool-specific invocation details. Knowledge content is never duplicated into runtime wrappers.

### Capability-to-agent binding

Every capability from `AR-AI-BOS-004` should have at least one agent (or human role) bound to it. Gaps are real gaps, not documentation oversights.

| Capability | Example agent (illustrative) |
|------------|------------------------------|
| `CAP-STR-001` Vision & Direction | `AG-STR-VISION-001` (advisory) |
| `CAP-DLV-001` SaaS Development | `AG-DLV-SAAS-001` (supervised) |
| `CAP-DLV-004` Architecture & Design | `AG-DLV-ARCH-001` (supervised) |
| `CAP-KNW-001` Knowledge Capture | `AG-KNW-ARCH-001` (supervised) — this is `@ai-bos-architect` |
| `CAP-KNW-006` Knowledge Validation | `AG-KNW-VALID-001` (autonomous, future) |
| `CAP-OPS-005` Governance & Evolution | `AG-OPS-GOV-001` (supervised) — this is `@system-builder` |
| `CAP-PLT-001` Agent Platform | `AG-PLT-AGENT-001` (supervised) |
| `CAP-PLT-002` MCP Capability Layer | `AG-PLT-MCP-001` (supervised) |

This table is illustrative; concrete agent definitions are authored in Phase 12 or per-project instantiation.

### Relationship to existing agents

| Existing agent | AI-BOS agent ID (proposed) | Notes |
|----------------|----------------------------|-------|
| `@ai-bos-architect` (project-local skill) | `AG-KNW-ARCH-001` | Authors AI-BOS content; supervised; this skill |
| `@system-builder` (personal skill) | `AG-OPS-GOV-001` | Governs Cursor agent system; supervised; meta-agent |
| `@task-ledger` (personal skill) | `AG-OPS-LEDG-001` | Maintains task ledgers; autonomous for routine updates |

These mappings are not yet registered in the agent registry; that happens when Phase 12 (Standards/Templates) formalizes agent definitions or when a project instantiates them.

## Best Practices

- Declare an agent's `consumes` list minimally — over-consumption creates brittle agents.
- Use `advisory` authority generously for high-stakes decisions; reserve `autonomous` for low-risk, high-frequency work.
- When an agent generates knowledge, always set `owner` to the agent ID and record the generation in the KO's Change History.
- Treat runtime projections as thin wrappers — if knowledge content appears in a runtime wrapper, it has leaked out of the knowledge layer.
- When a capability has no agent bound, treat it as a real gap and either bind an agent or assign a human role explicitly.
- Version agents independently of their consuming KOs — a KO update does not force an agent version bump unless the agent's behavior must change.

## Anti-patterns

- Storing agent definitions in the knowledge registry (violates the one-way consumer model from Phase 5).
- Letting an agent ratify its own generated knowledge to `active` (self-certification).
- Embedding knowledge content inside a runtime wrapper (knowledge leak).
- Using file paths instead of KO IDs in an agent's `consumes` list.
- Allowing an `autonomous` agent to escalate to `supervised` or vice versa without a registry update.
- Treating handoffs as autonomous sub-agent calls (violates the "handoffs are user-routing guidance" rule).
- Naming agents after tools ("the Cursor agent") instead of capabilities.
- Creating an agent without capability binding (orphan agent).
- Allowing an agent to override a human decision within the same capability.

## References

- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability IDs)
- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; defines KO substrate and consumer model)
- `knowledge/architecture/AR-AI-BOS-006-documentation-architecture.md` — Documentation Architecture (dependency; agents consume docs by path)
- `knowledge/architecture/AR-AI-BOS-003-assumption-review.md` — Assumption Review (D2: agent-generated knowledge allowed)
- `AI-BOS/.cursor/skills/ai-bos-architect/SKILL.md` — this skill itself is a runtime projection of `AG-KNW-ARCH-001`

## Related Knowledge Objects

- AR-AI-BOS-008 — MCP Architecture (Phase 8; defines capability providers that agents call)
- AR-AI-BOS-009 — Execution Architecture (Phase 9; defines workflows that coordinate agents)
- AR-AI-BOS-010 — Governance (Phase 10; will ratify authority levels and handoff contracts)
- ST-AGT-001 — Agent Standard (Phase 12; will formalize agent definition rules as a Standard)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 7 Agent Architecture — agent identity, separate agent registry, authority levels, lifecycle, handoff contracts, agent-generated knowledge (D2), vendor-independent runtime projection, capability binding. Awaiting user approval. |
