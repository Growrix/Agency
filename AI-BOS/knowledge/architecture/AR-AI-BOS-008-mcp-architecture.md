---
id: AR-AI-BOS-008
title: AI-BOS MCP Architecture
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
  - AR-AI-BOS-007
related:
  - mcp-architecture
  - capability-providers
  - mcp-registry
  - capability-contracts
  - vendor-independence
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - mcp-architecture
  - mcp
  - capabilities
  - foundational
---

# AI-BOS MCP Architecture

## Purpose

Define the **MCP (Model Context Protocol) layer** of AI-BOS — the capability provider layer that agents call to perform actions beyond reading knowledge. Where Phase 5 defined the substrate (Knowledge Objects), Phase 6 the presentation (documentation), and Phase 7 the performers (agents), Phase 8 defines the **capability providers** that give agents their hands and eyes.

The Phase 3 insight — *"MCP provides capabilities only. MCP is NOT Documentation. MCP is NOT Agents."* — is the foundational rule. MCP servers are tool providers; they do not own knowledge, do not make decisions, and do not consume other MCP servers.

## Scope

Defines:
- What an MCP server is (and is not) in AI-BOS
- MCP registry (separate from knowledge and agent registries)
- MCP server identity, lifecycle, versioning
- Capability contracts (the interface between agents and MCP servers)
- The canonical knowledge-query services (from the Knowledge Registry Standard)
- How agents call MCP servers (via capability contracts, not direct coupling)
- Vendor independence for MCP
- Relationship to agents (Phase 7) and knowledge (Phase 5)

Does **not** define:
- Concrete MCP server implementations (Phase 12, or per-project)
- Specific provider SDKs or transports (stdio, HTTP, SSE — implementation detail)
- Repository folder layout (Phase 11)
- Project instantiation of MCP servers (Phase 11)

## Principles

1. **MCP servers provide capabilities, nothing else** — they expose tools that agents call; they do not own knowledge, do not make decisions, do not consume other MCP servers.
2. **MCP is a separate layer from agents and knowledge** — putting MCP in the knowledge registry or agent registry violates the layer model (Phase 5, Phase 7).
3. **Capability contracts are the interface** — agents call MCP servers via declared contracts, never via direct coupling. A contract names the capability, inputs, outputs, and failure modes.
4. **MCP servers are vendor-independent concepts** — an AI-BOS MCP server is a capability contract; the runtime projection (stdio, HTTP, a specific MCP SDK) is implementation.
5. **Knowledge-query MCP services are first-class** — the Knowledge Registry Standard names five canonical services (`knowledge.search`, `knowledge.read`, `knowledge.related`, `knowledge.dependencies`, `knowledge.validate`); these are the bridge between the MCP layer and the knowledge layer.
6. **MCP servers do not reference agents** — the dependency direction is one-way: agents → MCP → knowledge. MCP servers never declare which agents use them.
7. **Failure is explicit** — every capability contract declares failure modes; agents must handle them.

## Standards

### What an MCP server is

An AI-BOS MCP server is a **named, versioned capability provider** that:

1. Declares one or more capability contracts (tools it exposes)
2. Each contract names the capability served (from `AR-AI-BOS-004`), inputs, outputs, and failure modes
3. Has a defined transport (implementation detail, declared in runtime projection, not in the contract)
4. Has a lifecycle (draft → active → deprecated → archived)
5. May read knowledge (by ID, via the knowledge-query services) but never owns knowledge

An MCP server is **not**:
- A Knowledge Object (MCP servers live in `mcp-index.json`, not `handbook-index.json`)
- An agent (agents call MCP servers; MCP servers do not call agents)
- A documentation page
- A specific SDK or transport (those are runtime projections)
- A decision maker (MCP provides tools; agents decide)

### MCP identity

| Property | Rule |
|----------|------|
| ID format | `MC-<GROUP>-<NAME>-<NNN>` (e.g. `MC-KNW-REGISTRY-001`) |
| ID permanence | Permanent once registered; never reused |
| Name | Human-readable, stable across versions |
| Version | Semver; major bump on contract change |
| Type | Always `mcp` in the MCP registry |

### MCP registry

A dedicated registry, separate from the knowledge and agent registries. Lives at `AI-BOS/mcp-registry/`.

```text
mcp-registry/
├── registry.json              # root manifest (SSOT)
└── mcp-index.json             # all MCP servers
```

**Why separate:** MCP servers are called by agents and read knowledge. If MCP lived in the agent registry, the one-way dependency (agents → MCP) would be violated. If MCP lived in the knowledge registry, MCP servers would appear to be knowledge, violating the Phase 3 insight.

### MCP object shape

```json
{
  "id": "MC-KNW-REGISTRY-001",
  "name": "Knowledge Registry Server",
  "version": "1.0.0",
  "status": "active",
  "capabilities": ["CAP-PLT-003", "CAP-KNW-003"],
  "contracts": [
    {
      "name": "knowledge.search",
      "inputs": { "query": "string", "type": "string?" },
      "outputs": { "results": "KnowledgeObject[]" },
      "failures": ["no_match", "invalid_query"]
    },
    {
      "name": "knowledge.read",
      "inputs": { "id": "KnowledgeObjectID" },
      "outputs": { "object": "KnowledgeObject" },
      "failures": ["not_found", "deprecated"]
    }
  ],
  "reads": ["AR-AI-BOS-005"],
  "transport": "stdio",
  "owner": "AI-BOS",
  "updated": "2026-07-16"
}
```

| Field | Meaning |
|-------|---------|
| `capabilities` | Which `CAP-*` IDs this server provides tools for |
| `contracts` | The tool contracts this server exposes |
| `reads` | Which Knowledge Object IDs this server may read (by ID) |
| `transport` | Implementation detail (stdio / HTTP / SSE); declared for runtime projection, not part of the contract |

### Capability contract schema

Each contract is the formal interface between an agent and an MCP server.

| Field | Meaning |
|-------|---------|
| `name` | The tool name (e.g. `knowledge.search`) |
| `inputs` | Typed input schema |
| `outputs` | Typed output schema |
| `failures` | Explicit failure modes the agent must handle |
| `idempotent` | Whether repeated calls with same inputs yield same result (default `false`) |
| `authority_required` | Minimum agent authority to call this tool (default `supervised`) |

**Rule:** Contracts are versioned with the MCP server. A contract change is a major version bump for the server.

### The canonical knowledge-query services

The Knowledge Registry Standard names five services that bridge MCP and the knowledge layer. These are the only MCP services that read the knowledge registry directly.

| Service | Inputs | Outputs | Failures |
|---------|--------|---------|----------|
| `knowledge.search` | query, optional type filter | KnowledgeObject[] | no_match, invalid_query |
| `knowledge.read` | KnowledgeObjectID | KnowledgeObject | not_found, deprecated |
| `knowledge.related` | KnowledgeObjectID | KnowledgeObject[] | not_found |
| `knowledge.dependencies` | KnowledgeObjectID | KnowledgeObject[] | not_found, cycle_detected |
| `knowledge.validate` | KnowledgeObject | ValidationResult | invalid_frontmatter, duplicate_id, broken_dependency |

**Rule:** These five services are the **only** MCP servers permitted to read the knowledge registry. Other MCP servers must call `knowledge.read` via these services, not access the registry directly. This keeps the knowledge layer's integrity guarantees intact.

### MCP lifecycle

```text
draft ──ratify──▶ active ──deprecate──▶ deprecated ──archive──▶ archived
   ▲                                                            │
   └────────────── supersede (new version or new ID) ───────────┘
```

- `draft → active` requires **contract validation** (declared capabilities exist, contracts are well-formed) AND **knowledge-read validation** (declared `reads` KOs exist or are co-authored).
- `active → deprecated` requires a successor server OR a documented reason.
- Deprecation must update all agents that declare this server in their `consumes` list.

### Agent-to-MCP binding

Agents declare which MCP servers they call in their `consumes` list (Phase 7). The binding is one-way:

```text
Agent ──calls──▶ MCP server ──reads──▶ Knowledge Object
```

| Layer | May reference | May NOT reference |
|-------|---------------|--------------------|
| MCP server | Knowledge Object IDs (via knowledge-query services), capability IDs | Agent IDs, other MCP server IDs (no server-to-server calls) |
| Agent | Knowledge Object IDs, MCP server IDs, capability IDs | (leaf for MCP calls) |

**Rule:** MCP servers do not call other MCP servers. If a workflow needs multiple tools, the agent orchestrates the calls; the MCP servers remain independent.

### Runtime projection (vendor independence)

An AI-BOS MCP server is a vendor-independent concept. To execute, it is projected to a runtime:

| Runtime | Projection of `MC-KNW-REGISTRY-001` |
|---------|-------------------------------------|
| Cursor | A `.cursor/mcp.json` entry or MCP server config |
| Claude Code | An MCP server config in `claude_desktop_config.json` |
| Standalone | A stdio/HTTP server process |
| OpenAI / Anthropic function calling | A function/tool definition |

**Rule:** The runtime projection declares the transport and SDK-specific config. The capability contract lives in the MCP registry; the runtime wrapper only adds connection details. Knowledge content is never embedded in MCP server configs.

### Capability-to-MCP binding

Every capability that requires tooling should have at least one MCP server bound. Gaps are real gaps.

| Capability | Example MCP server (illustrative) |
|------------|-----------------------------------|
| `CAP-KNW-003` Knowledge Discovery | `MC-KNW-REGISTRY-001` (knowledge.search, .read, .related) |
| `CAP-KNW-006` Knowledge Validation | `MC-KNW-REGISTRY-001` (knowledge.validate) |
| `CAP-PLT-003` Registry & Storage | `MC-KNW-REGISTRY-001` (all five services) |
| `CAP-DLV-005` Coding Workflows | `MC-DLV-CODE-001` (future: code tools) |
| `CAP-GRO-003` SEO | `MC-GRO-SEO-001` (future: SEO audit tools) |
| `CAP-OPS-002` Quality Assurance | `MC-OPS-QUAL-001` (future: validation tools) |

This table is illustrative; concrete MCP server definitions are authored in Phase 12 or per-project.

### Relationship to existing MCP usage

The Growrixos workspace already uses MCP servers (e.g. `plugin-shadcn-shadcn`, `user-eamodio.gitlens-extension-GitKraken` in the catalog). These are **runtime projections** of capability providers, not AI-BOS MCP server definitions. The AI-BOS MCP registry will define vendor-independent concepts that may be projected to those or other runtimes.

## Best Practices

- Keep capability contracts small and composable — a server with one tool is preferable to a server with ten if the tools serve different capabilities.
- Declare `idempotent: true` on every contract where it applies; agents can retry idempotent calls safely.
- Use `authority_required` to prevent `advisory` agents from calling destructive tools.
- When an MCP server reads knowledge, always go through the five canonical knowledge-query services, never direct registry access.
- Version contracts explicitly — a silent contract change is a major version bump, not a patch.
- Treat transport as implementation — declare it in the runtime projection, not in the contract.
- When deprecating an MCP server, update all consuming agents in the same change.

## Anti-patterns

- Storing MCP server definitions in the knowledge or agent registry (violates layer separation).
- Letting an MCP server call another MCP server (creates hidden coupling; agents should orchestrate).
- Embedding knowledge content inside an MCP server config (knowledge leak).
- Allowing an MCP server to make decisions (MCP provides tools; agents decide).
- Accessing the knowledge registry directly instead of via `knowledge.read` (bypasses validation).
- Naming MCP servers after tools ("the GitHub MCP") instead of capabilities.
- Creating an MCP server with no capability binding (orphan server).
- Silent contract changes (must be a major version bump).
- Letting `advisory` agents call non-idempotent tools without escalation.

## References

- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability IDs)
- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; defines KO substrate and registry)
- `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — Agent Architecture (dependency; agents call MCP servers)
- `AI-BOS/.cursor/skills/ai-bos-architect/references/knowledge-registry-standard.md` — Knowledge Registry Standard (source of the five canonical services)

## Related Knowledge Objects

- AR-AI-BOS-009 — Execution Architecture (Phase 9; workflows coordinate agents calling MCP servers)
- AR-AI-BOS-010 — Governance (Phase 10; will ratify authority_required and contract versioning)
- AR-AI-BOS-011 — Project Architecture (Phase 11; projects instantiate MCP servers)
- ST-MCP-001 — MCP Server Standard (Phase 12; will formalize contract schema as a Standard)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 8 MCP Architecture — MCP identity, separate MCP registry, capability contracts, five canonical knowledge-query services, agent-to-MCP binding (one-way), vendor-independent runtime projection, capability binding. Awaiting user approval. |
