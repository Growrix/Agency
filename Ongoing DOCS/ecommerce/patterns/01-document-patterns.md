# Document Patterns

Document status: pattern source
Owner: Documentation governance

## Purpose

Provide reusable patterns for creating future ecommerce docs without drifting from the suite structure.

## Feature Blueprint Pattern

Use this structure for a new feature domain:

```md
# <Feature Name>

Document status: draft | active | deprecated
Owner: <team or role>

## Purpose
<why this feature exists>

## Scope
- <included behavior>
- <excluded behavior>

## Business Rules
- <rule>

## Frontend Behavior
- <route, state, UX, accessibility>

## Backend Behavior
- <service responsibility and invariants>

## Data Contract
- <entities and lifecycle>

## API Contract
- <endpoints or operations>

## Security And Permissions
- <auth, ownership, audit>

## Tests
- <unit, integration, API, E2E, non-functional>

## Acceptance Criteria
- <observable completion condition>
```

## API Spec Pattern

- Purpose and owner.
- Endpoint table.
- Request schema summary.
- Response schema summary.
- Auth and permission requirements.
- Validation and error codes.
- Idempotency and rate-limit rules.
- Observability and audit events.
- Acceptance criteria.

## Database Table Pattern

- Table purpose.
- Owner domain.
- Columns and types.
- Relationships.
- Unique constraints and indexes.
- Lifecycle status values.
- Privacy and retention notes.
- Migration and seed requirements.
- Acceptance criteria.

## Backend Service Pattern

- Responsibilities.
- Non-responsibilities.
- Inputs and outputs.
- Transaction boundaries.
- Events emitted.
- Failure modes.
- Retry/idempotency rules.
- Security and audit requirements.
- Tests.

## ADR Pattern

```md
# ADR: <decision title>

Status: Proposed | Accepted | Superseded
Date: YYYY-MM-DD

## Context
<problem and constraints>

## Decision
<chosen path>

## Consequences
- Positive: <effect>
- Negative: <tradeoff>
- Follow-up: <needed action>
```

## Task Pattern

- Task title.
- Phase.
- Source docs.
- Deliverables.
- Acceptance criteria.
- Validation.
- Risks and rollback.

## Acceptance Criteria

- Future docs can be added without changing suite conventions.
- Feature, API, database, backend, ADR, and task docs remain comparable.
- Implementation agents receive predictable sections and source links.
