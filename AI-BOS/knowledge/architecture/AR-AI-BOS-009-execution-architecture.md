---
id: AR-AI-BOS-009
title: AI-BOS Execution Architecture
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
  - AR-AI-BOS-008
related:
  - execution-architecture
  - workflows
  - orchestration
  - execution-lifecycle
  - human-in-the-loop
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - execution-architecture
  - workflows
  - orchestration
  - foundational
---

# AI-BOS Execution Architecture

## Purpose

Define the **execution layer** of AI-BOS — how work actually gets done. Where Phase 5 defined the substrate (Knowledge Objects, including Workflows as a KO type), Phase 7 the performers (agents), and Phase 8 the capability providers (MCP servers), Phase 9 defines the **execution model** that orchestrates all three: how a Workflow Knowledge Object is executed by coordinating agents that call MCP servers, with human-in-the-loop gates and a defined lifecycle.

This phase is about runtime semantics, not a new storage layer. Workflows are already Knowledge Objects (type `WF`, registered in `workflow-index.json` per Phase 5). Execution Architecture defines what it means to *run* one.

## Scope

Defines:
- What execution means in AI-BOS (running a Workflow KO)
- Execution context (state needed to run)
- Execution lifecycle (states a run goes through)
- Orchestration patterns (sequential, parallel, conditional, human-gated)
- Handoff execution (how declared handoffs from Phase 7 fire)
- Human-in-the-loop gates
- Failure, recovery, idempotency, retries
- Execution provenance (audit trail)
- Vendor independence for execution

Does **not** define:
- Concrete workflow definitions (Phase 12, or per-project)
- A new registry (workflows are KOs; execution state is transient, not registered)
- Specific runtime engines (Cursor Task tool, Claude Code, etc. — those are projections)
- Repository folder layout (Phase 11)

## Principles

1. **Workflows are knowledge; executions are runtime** — a Workflow is a permanent Knowledge Object; an execution is a transient run with a finite lifecycle. Executions are not registered; they are logged.
2. **Execution orchestrates agents, not MCP servers directly** — per Phase 8, MCP servers do not call each other; the agent is the orchestrator. Execution defines how the agent orchestrates.
3. **Human-in-the-loop is a first-class state, not an exception** — `blocked_on_human` is a defined execution state, not an error.
4. **Idempotency is declared per step** — each workflow step declares whether it is idempotent; the execution engine retries only idempotent steps.
5. **Provenance is mandatory** — every execution records which agents ran, which MCP tools were called, which KOs were read, and where human approvals were given.
6. **Failure is explicit** — every step declares failure modes; the execution engine does not silently swallow errors.
7. **Vendor independence applies to execution** — the execution model is a concept; runtime projections (Cursor Task tool, Claude Code, a standalone orchestrator) implement it without changing it.

## Standards

### What execution is

An **execution** is a single run of a Workflow Knowledge Object. It has:

1. A unique execution ID (ephemeral, not registered)
2. A reference to the Workflow KO by ID
3. An execution context (inputs, state, history)
4. A lifecycle (states below)
5. A provenance log (audit trail)

An execution is **not**:
- A Knowledge Object (executions are transient; KOs are permanent)
- An agent (executions orchestrate agents; they are not performers)
- An MCP server (executions call MCP servers via agents; they are not capability providers)
- Registered in any registry (executions are logged, not indexed)

### Execution context

The state needed to run a workflow. Passed at start and mutated during execution.

```json
{
  "execution_id": "EXEC-2026-07-16-0001",
  "workflow_id": "WF-KNW-001",
  "workflow_version": "1.0.0",
  "inputs": { "phase": 9, "deliverable": "Execution Architecture" },
  "state": "in_progress",
  "current_step": 3,
  "history": [
    { "step": 1, "agent": "AG-KNW-ARCH-001", "action": "read", "ko": "AR-AI-BOS-008", "status": "completed" },
    { "step": 2, "agent": "AG-KNW-ARCH-001", "action": "author", "produced": "AR-AI-BOS-009", "status": "completed" },
    { "step": 3, "agent": "human", "action": "approve", "status": "blocked_on_human" }
  ],
  "provenance": {
    "started": "2026-07-16T16:00:00Z",
    "started_by": "AG-KNW-ARCH-001"
  }
}
```

### Execution lifecycle

```text
not_started ──start──▶ in_progress ──complete──▶ completed
                            │
                            ├──block──▶ blocked_on_human ──approve──▶ in_progress
                            │
                            ├──fail──▶ failed ──retry──▶ in_progress
                            │
                            └──cancel──▶ cancelled
```

| State | Meaning | May transition to |
|-------|---------|------------------|
| `not_started` | Execution created, not yet started | `in_progress`, `cancelled` |
| `in_progress` | A step is running | `blocked_on_human`, `failed`, `completed`, `cancelled` |
| `blocked_on_human` | Waiting for human approval or input | `in_progress`, `cancelled` |
| `failed` | A step failed; non-idempotent or retries exhausted | `in_progress` (retry), `cancelled` |
| `completed` | All steps done; deliverable produced | (terminal) |
| `cancelled` | Aborted by human or supervisor | (terminal) |

**Rule:** `completed` and `cancelled` are terminal. A completed execution cannot be reopened; a new execution must be started to revise the deliverable.

### Orchestration patterns

A Workflow KO declares its orchestration pattern. The execution engine implements the pattern.

| Pattern | Semantics | Example |
|---------|-----------|---------|
| `sequential` | Steps run one after another; each waits for the prior to complete | The AI-BOS phase workflow itself (Phase 1 → 2 → ... → 12) |
| `parallel` | Steps run concurrently; all must complete before the next barrier | Authoring multiple independent KOs in one phase |
| `conditional` | A step runs only if a declared condition holds | "If structural change needed, hand off to @system-builder" |
| `human_gated` | A step requires explicit human approval before proceeding | Phase approval gates |
| `loop` | A step repeats until a condition holds | Iterative assumption review until no new assumptions |
| `handoff` | Work routes to another agent per a declared contract (Phase 7) | `@ai-bos-architect` → `@system-builder` for structural changes |

**Rule:** A single workflow may compose patterns, but every step declares exactly one primary pattern.

### Handoff execution

Phase 7 declared handoffs as contracts (`to`, `when`, `passes`, `expects`). Phase 9 defines how they execute:

1. The executing agent evaluates `when` against the current execution context.
2. If `when` holds, the agent pauses its own execution (state `blocked_on_handoff`).
3. The execution engine surfaces the handoff to the human supervisor (or the named target agent's runtime projection).
4. The human or target agent executes the handoff; the result is recorded in `expects`.
5. The originating agent resumes; the handoff result is part of its execution context.

**Rule:** Handoffs are user-routing guidance, not autonomous sub-agent calls (per `@system-builder` SKILL.md). The execution engine surfaces the handoff; it does not auto-invoke a sub-agent.

### Human-in-the-loop gates

| Gate type | Trigger | Required action |
|-----------|---------|------------------|
| `approval` | A step declares `requires_approval: true` | Human approves or rejects; rejection sets state `failed` |
| `input` | A step declares `requires_input: <schema>` | Human provides input; execution resumes |
| `review` | A step produces a deliverable marked `review_required: true` | Human reviews; may request changes (state stays `in_progress`) |
| `escalation` | An agent encounters a decision beyond its authority | Human decides; execution resumes |

**Rule:** Gates are not errors. The `blocked_on_human` state is normal and expected; the execution engine must not treat it as a failure or auto-retry past it.

### Failure and recovery

| Failure mode | Recovery |
|--------------|----------|
| Step failed, declared `idempotent: true` | Retry up to N times (default 3); then `failed` |
| Step failed, declared `idempotent: false` | No retry; state `failed`; human decides |
| MCP tool returned a declared failure | Match against contract `failures`; route per workflow definition |
| Agent exceeded authority | Abort step; state `failed`; escalate to human |
| Workflow KO deprecated mid-execution | Pause; human decides whether to continue on deprecated version or restart on successor |

**Rule:** Every failure is logged in provenance with the failing step, the failure mode, and the recovery action. Silent failures are forbidden.

### Idempotency and retries

| Property | Rule |
|----------|------|
| Declaration | Each workflow step declares `idempotent: true \| false` |
| Retry budget | Default 3 retries for idempotent steps; configurable per workflow |
| Backoff | Default exponential; configurable |
| Non-idempotent steps | Never retried automatically; human decides |
| MCP contract alignment | Step idempotency must match the idempotency of the MCP contract it calls (Phase 8) |

### Execution provenance

Every execution produces a provenance log. The log is the audit trail.

| Field | Meaning |
|-------|---------|
| `started` | ISO timestamp |
| `started_by` | Agent or human ID |
| `steps` | Ordered list of step executions |
| `agents_involved` | All agents that performed work |
| `mcp_calls` | All MCP tool invocations with contract name, inputs, outputs |
| `kos_read` | All Knowledge Object IDs read during execution |
| `kos_produced` | All Knowledge Object IDs produced during execution |
| `human_actions` | All approvals, inputs, reviews, escalations |
| `outcome` | `completed` / `failed` / `cancelled` |
| `ended` | ISO timestamp |

**Rule:** Provenance logs are stored alongside the workflow's project (e.g. in `AI-BOS/.cursor/executions/` or a project-specific executions directory), NOT in any registry. They are append-only and immutable once written.

### Vendor independence and runtime projection

The execution model is a vendor-independent concept. To run, it projects to a runtime:

| Runtime | Projection of an AI-BOS execution |
|---------|-----------------------------------|
| Cursor | A chat session with the Task tool for sub-agents; gates surface as user prompts |
| Claude Code | A session with sub-agent invocations; gates surface as user prompts |
| Standalone orchestrator | A process that reads Workflow KOs and dispatches to agent runtimes |
| OpenAI / Anthropic function calling | A function-calling loop with human prompts at gates |

**Rule:** The execution model defines states, patterns, gates, and provenance. The runtime projection implements them. A workflow KO must not embed runtime-specific assumptions (e.g. "use Cursor Task tool").

### Relationship to existing workflows

| Existing workflow | AI-BOS workflow ID (proposed) | Pattern |
|-------------------|-------------------------------|---------|
| AI-BOS phased planning (this build) | `WF-KNW-PHASED-PLAN-001` | sequential + human_gated |
| Phase 3 assumption review | `WF-STR-ASSUMPTION-REVIEW-001` | loop + human_gated |
| D1 repo-promotion evaluation | `WF-OPS-STRUCTURAL-DECISION-001` | sequential + handoff |

These mappings are illustrative; concrete workflow definitions are authored in Phase 12 or per-project.

## Best Practices

- Declare every step's orchestration pattern explicitly; implicit patterns are forbidden.
- Use `human_gated` generously for high-stakes decisions; reserve `autonomous` execution for low-risk, high-frequency work.
- Match step idempotency to the MCP contract's idempotency — mismatched idempotency causes unsafe retries.
- Log every gate, every failure, every handoff in provenance — an execution without provenance is not auditable.
- Treat `blocked_on_human` as a normal state; do not auto-retry past it.
- When a workflow KO is deprecated mid-execution, pause and escalate; never silently continue on a deprecated version.
- Keep workflows composable: a step may itself invoke another workflow (sub-workflow), with its own execution ID and provenance.

## Anti-patterns

- Storing executions in a registry (executions are transient; registries are for permanent objects).
- Letting an execution engine auto-invoke sub-agents for handoffs (violates the "handoffs are user-routing guidance" rule).
- Treating `blocked_on_human` as a failure or auto-retrying past it.
- Retrying non-idempotent steps automatically.
- Silent failures (every failure must be logged in provenance).
- Embedding runtime-specific assumptions (e.g. "use Cursor Task tool") in a Workflow KO.
- Running a workflow without declaring its orchestration pattern.
- Letting an agent exceed its declared authority without escalating.
- Discarding provenance logs to save space (they are the audit trail).

## References

- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; workflows serve capabilities)
- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; workflows are KOs of type `WF`)
- `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — Agent Architecture (dependency; execution orchestrates agents)
- `knowledge/architecture/AR-AI-BOS-008-mcp-architecture.md` — MCP Architecture (dependency; agents call MCP servers during execution)
- `AI-BOS/.cursor/skills/ai-bos-architect/SKILL.md` — this skill's phase workflow is itself a `sequential + human_gated` execution

## Related Knowledge Objects

- AR-AI-BOS-010 — Governance (Phase 10; will ratify authority levels, gate semantics, and provenance requirements)
- AR-AI-BOS-011 — Project Architecture (Phase 11; projects instantiate workflows)
- ST-WF-001 — Workflow Standard (Phase 12; will formalize workflow definition schema as a Standard)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 9 Execution Architecture — execution context, 6-state lifecycle, 6 orchestration patterns, handoff execution semantics, 4 human-in-the-loop gate types, failure/recovery/idempotency, mandatory provenance, vendor-independent runtime projection. Awaiting user approval. |
