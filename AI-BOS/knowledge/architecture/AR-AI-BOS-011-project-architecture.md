---
id: AR-AI-BOS-011
title: AI-BOS Project Architecture
type: architecture
category: governance
domain: ai-bos
version: 1.0.0
status: draft
owner: "AI-BOS"
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
  - AR-AI-BOS-008
  - AR-AI-BOS-009
  - AR-AI-BOS-010
related:
  - project-architecture
  - projects
  - instantiation
  - repository-structure
  - d1-re-evaluation
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - project-architecture
  - projects
  - foundational
---

# AI-BOS Project Architecture

## Purpose

Define the **project layer** of AI-BOS — what a project is, how projects instantiate the layers beneath them, and how repository structure emerges from project needs. Where Phase 5 defined the substrate (Knowledge), Phase 7 the performers (Agents), Phase 8 the capability providers (MCP), Phase 9 the execution model, and Phase 10 the governance, Phase 11 defines the **consumer of all layers**: the project.

This is the phase where the planning prompt's design order reaches its penultimate step: `Project Model → Repository Structure`. Projects are the leaves that consume everything; repository structure is the final output that emerges from how projects are organized.

This phase also triggers the **D1 repo-promotion re-evaluation** per Phase 3 Option B (defer to Phase 11). That re-evaluation is a structural decision routed to `@system-builder` after this artifact is approved.

## Scope

Defines:
- What a project is (and is not) in AI-BOS
- Project identity, lifecycle, versioning
- How projects declare which capabilities they instantiate (from Phase 4)
- How projects consume Knowledge Objects (by ID, per Phase 5)
- How projects bind to agents (per Phase 7)
- How projects call MCP servers (via agents, per Phase 8)
- How projects run workflows (per Phase 9)
- How projects assign governance roles (per Phase 10)
- Project registry (separate from knowledge/agent/mcp registries)
- How repository structure emerges from project needs
- Vendor independence for projects

Does **not** define:
- Concrete project instances (per-project instantiation)
- The final repository folder layout (designed in Phase 12 Evolution Strategy, after this phase approves the project model)
- Specific agent or MCP server definitions (Phase 12 or per-project)

## Principles

1. **Projects are consumers, not knowledge** — a project instantiates capabilities, agents, MCP servers, and workflows; it is not itself a Knowledge Object. Projects live in their own registry.
2. **Projects are capability-bound** — every project declares which capabilities it instantiates from `AR-AI-BOS-004`; a project with no capability binding is a draft, not ratified.
3. **Projects consume by ID** — knowledge references use KO IDs; agent references use agent IDs; MCP references use MCP IDs. Projects never hardcode paths.
4. **Repository structure emerges from projects** — the repo layout is the final output, designed after the project model is stable. Folders follow capability groups, not tools or teams.
5. **Projects are vendor-independent concepts** — an AI-BOS project is a capability instantiation + layer bindings; the runtime projection (a Cursor workspace, a Claude Code project, a standalone repo) is implementation.
6. **One project, one owner** — per Phase 10, every project has a single Project Owner (human) who decides which capabilities it instantiates.
7. **Projects may share layers** — two projects may consume the same Knowledge Object, agent, or MCP server. Sharing is the point of the layer model.

## Standards

### What a project is

An AI-BOS project is a **named, versioned instantiation** of:

1. A set of capabilities (from `AR-AI-BOS-004`)
2. A set of Knowledge Object IDs it consumes (from the knowledge registry)
3. A set of agent IDs it binds to (from the agent registry)
4. A set of MCP server IDs it calls (via its bound agents)
5. A set of workflow IDs it may run (from the knowledge registry, type `WF`)
6. A governance role assignment (per Phase 10)
7. A project owner (human)

A project is **not**:
- A Knowledge Object (projects live in `project-registry/`, not `knowledge-registry/`)
- An agent (projects consume agents; they are not performers)
- An MCP server (projects call MCP servers via agents; they are not capability providers)
- A specific runtime workspace (Cursor workspace, Claude Code project — those are projections)
- A folder (folders are the final repository structure, designed in Phase 12)

### Project identity

| Property | Rule |
|----------|------|
| ID format | `PRJ-<DOMAIN>-<NAME>-<NNN>` (e.g. `PRJ-SAAS-GROWRIXOS-001`) |
| ID permanence | Permanent once registered; never reused |
| Name | Human-readable, stable across versions |
| Version | Semver; major bump on capability set change |
| Type | Always `project` in the project registry |

### Project registry

A dedicated registry, separate from the knowledge, agent, and MCP registries. Lives at `AI-BOS/project-registry/`.

```text
project-registry/
├── registry.json              # root manifest (SSOT)
└── project-index.json         # all projects
```

**Why separate:** projects consume all layers. If projects lived in any lower registry, the one-way dependency model would be violated. The project registry references IDs in all three lower registries; none of them reference project IDs.

### Four-registry model (complete)

With Phase 11, the registry model is complete:

```text
knowledge-registry/   ← Knowledge Objects (Phase 5)
agent-registry/        ← Agents (Phase 7)
mcp-registry/          ← MCP servers (Phase 8)
project-registry/      ← Projects (Phase 11) ← NEW
```

**One-way dependency:** Project → Agent → MCP → Knowledge. No registry references IDs in the layer above.

### Project object shape

```json
{
  "id": "PRJ-SAAS-GROWRIXOS-001",
  "name": "Growrixos SaaS",
  "version": "1.0.0",
  "status": "active",
  "owner": "human: <name>",
  "capabilities": ["CAP-DLV-001", "CAP-DLV-004", "CAP-DLV-005", "CAP-GRO-003"],
  "consumes": ["HB-ENG-FE-001", "ST-SEC-001", "AR-AI-BOS-004"],
  "agents": ["AG-DLV-SAAS-001", "AG-DLV-ARCH-001"],
  "mcp_servers": ["MC-DLV-CODE-001"],
  "workflows": ["WF-DLV-SAAS-BUILD-001"],
  "governance": {
    "knowledge_owners": ["AG-DLV-ARCH-001"],
    "auditor": "AG-KNW-VALID-001"
  },
  "runtime_projection": "cursor",
  "root_path": "F:/PROJECTS/Growrixos/web/",
  "updated": "2026-07-16"
}
```

| Field | Meaning |
|-------|---------|
| `capabilities` | Which `CAP-*` IDs this project instantiates |
| `consumes` | Which Knowledge Object IDs this project reads (by ID) |
| `agents` | Which `AG-*` IDs this project binds to |
| `mcp_servers` | Which `MC-*` IDs this project's agents may call |
| `workflows` | Which `WF-*` IDs this project may run |
| `governance` | Per-project role assignments (per Phase 10) |
| `runtime_projection` | Implementation: `cursor` / `claude-code` / `standalone` / `openai` / `anthropic` |
| `root_path` | The project's physical root (may change; the ID never does) |

### Project lifecycle

```text
draft ──ratify──▶ active ──complete──▶ completed
                    │
                    ├──pause──▶ paused ──resume──▶ active
                    │
                    ├──deprecate──▶ deprecated ──archive──▶ archived
                    │
                    └──cancel──▶ cancelled
```

| State | Meaning |
|-------|---------|
| `draft` | Proposed, not yet ratified |
| `active` | Ratified and in progress |
| `paused` | Temporarily halted (may resume) |
| `completed` | Delivered; no longer active but referenced |
| `deprecated` | Superseded or retired |
| `archived` | Historical only |
| `cancelled` | Aborted before completion |

**Rule:** `completed` is a real terminal state (unlike executions, which are transient). A completed project's artifacts remain in the knowledge registry; the project itself is no longer active.

### How projects instantiate each layer

| Layer | How a project instantiates it |
|-------|-------------------------------|
| **Capabilities** (Phase 4) | Declares a subset of `CAP-*` IDs from the capability model |
| **Knowledge** (Phase 5) | Declares `consumes` KO IDs; reads them via `knowledge.read` MCP service |
| **Documentation** (Phase 6) | Reads documentation pages by path (per Phase 6); pages present the KOs it consumes |
| **Agents** (Phase 7) | Declares `agents` AG IDs; agents perform work per their declared authority |
| **MCP** (Phase 8) | Declares `mcp_servers` MC IDs; agents call these per their contracts |
| **Workflows** (Phase 9) | Declares `workflows` WF IDs; runs them per the execution model |
| **Governance** (Phase 10) | Assigns per-project role bindings (knowledge owners, auditors) |

### Repository structure emergence

Repository structure is the **final output**, designed in Phase 12 (Evolution Strategy) after this phase approves the project model. The emergence rule:

```text
1. Projects declare capabilities, agents, MCP, workflows, knowledge
2. Capability groups (Phase 4) suggest top-level organization
3. Projects with shared capabilities cluster into domains
4. Repository structure mirrors capability groups + project domains
5. Folders are named after capabilities or domains, never tools or teams
```

**Rule:** No repository folder layout is committed in this phase. Phase 12 will design the final layout once the project model is ratified.

### Vendor independence and runtime projection

An AI-BOS project is a vendor-independent concept. To execute, it projects to a runtime:

| Runtime | Projection of `PRJ-SAAS-GROWRIXOS-001` |
|---------|----------------------------------------|
| Cursor | A Cursor workspace at `root_path` with skills, rules, agents configured |
| Claude Code | A Claude Code project with `CLAUDE.md` and skills configured |
| Standalone | A directory with config files referencing the AI-BOS registries |
| OpenAI / Anthropic | A function-calling setup with system prompts referencing KO IDs |

**Rule:** The project definition lives in the project registry; the runtime projection only adds connection details. Knowledge, agent, and MCP content never duplicates into runtime projections.

### D1 re-evaluation trigger (per Phase 3 Option B)

Phase 3 decision D1 (default: evaluate own-repo after Phase 5) was deferred to Phase 11 per Option B. With the project model now defined, the re-evaluation is due.

**This re-evaluation is a structural decision routed to `@system-builder` after this artifact is approved.** The question: now that AI-BOS has a four-registry model and a project model that treats AI-BOS itself as a project (`PRJ-GOV-AI-BOS-001`), should AI-BOS be promoted to its own repository?

The re-evaluation will consider:
- Whether the four-registry model is now stable enough to commit to a repo layout
- Whether any other project will consume AI-BOS before Phase 12
- Whether the operational benefit of `@ai-bos-architect` as a personal skill justifies the split

### Relationship to existing projects

| Existing project | AI-BOS project ID (proposed) | Notes |
|------------------|-------------------------------|-------|
| Growrixos SaaS (`web/`) | `PRJ-SAAS-GROWRIXOS-001` | First SaaS project; consumes CAP-DLV-* |
| Growrixos HTML templates (`sites/`) | `PRJ-DLV-TEMPLATES-001` | Future; consumes CAP-DLV-002 |
| Growrixos Next.js migrations (`Frontend_Nextjs/`) | `PRJ-DLV-NEXTJS-001` | Future; consumes CAP-DLV-002, CAP-DLV-004 |
| AI-BOS itself | `PRJ-GOV-AI-BOS-001` | The AI-BOS build is itself a project; consumes CAP-KNW-*, CAP-OPS-005 |

**Rule:** AI-BOS is itself a project (`PRJ-GOV-AI-BOS-001`) — the architecture is self-describing. This is the project that builds AI-BOS.

## Best Practices

- Declare a project's `capabilities` minimally; over-declaration creates brittle projects.
- Use `runtime_projection` to declare the implementation, but never embed runtime assumptions in the project definition.
- When two projects share capabilities, share the underlying KOs and agents — do not duplicate.
- Treat `root_path` as mutable; the project ID is permanent, the path may change (e.g. on repo promotion).
- Assign governance roles per-project; do not assume a global auditor for all projects.
- When a project completes, mark it `completed` (not `archived`); its artifacts remain in the knowledge registry for reuse.
- Design repository structure only after the project model is stable — never before.

## Anti-patterns

- Storing projects in the knowledge, agent, or MCP registry (violates the one-way dependency).
- Hardcoding file paths in a project's `consumes` list (use KO IDs).
- Designing repository folder layout before the project model is ratified (violates the planning prompt).
- Naming folders after tools or teams instead of capabilities or domains.
- Allowing a project to consume an agent that exceeds the project's governance authority.
- Duplicating knowledge content into a project's runtime projection (knowledge leak).
- Treating AI-BOS itself as not-a-project (it is `PRJ-GOV-AI-BOS-001`).
- Skipping the D1 re-evaluation at this phase gate (per Phase 3 Option B).

## References

- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability IDs)
- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; projects consume KOs by ID)
- `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — Agent Architecture (dependency; projects bind to agents)
- `knowledge/architecture/AR-AI-BOS-008-mcp-architecture.md` — MCP Architecture (dependency; projects call MCP via agents)
- `knowledge/architecture/AR-AI-BOS-009-execution-architecture.md` — Execution Architecture (dependency; projects run workflows)
- `knowledge/architecture/AR-AI-BOS-010-governance.md` — Governance (dependency; projects assign governance roles)
- `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-evaluation.md` — D1 first evaluation (deferred to Phase 11)

## Related Knowledge Objects

- AR-AI-BOS-012 — Standards, Templates, Evolution Strategy (Phase 12; will design the final repository structure)
- ST-PRJ-001 — Project Standard (Phase 12; will formalize project definition schema as a Standard)
- AR-AI-BOS-003 — Assumption Review (D1 trigger source)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 11 Project Architecture — project identity, fourth registry (project-registry), four-registry model complete, project lifecycle, layer instantiation table, repository structure emergence rule, vendor-independent runtime projection, D1 re-evaluation trigger flagged. AI-BOS itself is `PRJ-GOV-AI-BOS-001`. Awaiting user approval. |
