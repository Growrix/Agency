# AI MCP Single Source Context

Document status: MCP context source
Owner: AI systems and architecture

## Purpose

Define how AI agents and MCP workflows should consume this ecommerce documentation suite without drifting from the approved source of truth.

## Context Strategy

Agents should read only the smallest document set needed for the task:

1. Start with `00-suite-map.md`.
2. Read the relevant handbook or blueprint owner file.
3. Read the matching API, database, frontend, backend, auth, security, or testing contract.
4. Read `execution/tasks.md` only when planning or executing phase work.

## Retrieval Rules

- One feature should map to one primary business source and one technical source chain.
- Do not infer missing policy from code or UI copy; update the source doc first.
- Prefer links to existing suite files over duplicating long context.
- If documents disagree, stop and reconcile before implementation.

## Agent Roles

| Agent type | Reads first | Writes/updates |
| --- | --- | --- |
| Product planner | `handbook/`, `blueprint/` | Business scope and feature definitions. |
| Architect | `blueprint/`, `architecture/` | Module boundaries and contract decisions. |
| Backend implementer | `backend/`, `api/`, `database/` | Service and data implementation plans. |
| Frontend implementer | `frontend/`, `api/`, `auth/` | UI flows and state behavior. |
| QA/security | `testing/`, `security/`, `deployment/` | Gates, risks, and release readiness. |

## Prompt Contract

Every implementation prompt should include:

- Target feature and phase.
- Source docs to read.
- Files or app scope allowed for implementation.
- Acceptance criteria.
- Validation commands or review gates.
- Explicit statement of what not to change.

## Acceptance Criteria

- Agents can locate the source chain for any major ecommerce feature.
- MCP retrieval can load compact domain docs instead of a single giant blueprint.
- Execution tasks remain traceable to approved docs.
