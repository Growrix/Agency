# Implementation Templates

Document status: template source
Owner: Delivery governance

## Purpose

Provide fill-in templates for future ecommerce implementation planning.

## Feature Implementation Template

```md
# Feature: <name>

Status: Draft | Approved | In Progress | Done
Phase: <number and name>
Owner: <role/team>

## Source Docs
- `<path>`

## Scope
Included:
- <item>

Excluded:
- <item>

## User Stories
- As a <user>, I can <action>, so that <outcome>.

## Contracts
Database:
- <tables/entities>

API:
- <endpoints>

Frontend:
- <routes/components/states>

Backend:
- <services/events>

Auth/Security:
- <permissions/controls>

## Acceptance Criteria
- <observable outcome>

## Validation
- <test/check>
```

## API Spec Template

```md
## Endpoint

Method: <GET|POST|PATCH|DELETE>
Path: `/api/v1/<resource>`
Auth: Public | Customer | Staff | Admin | Super Admin
Permission: `<permission.key>`
Idempotency: Required | Optional | Not applicable

### Request
- Params: <fields>
- Query: <fields>
- Body: <fields>

### Response
- `200`: <shape>
- `400`: <validation>
- `401`: <unauthenticated>
- `403`: <forbidden>
- `404`: <not found>
- `409`: <conflict>

### Rules
- <business rule>

### Tests
- <API test>
```

## Database Table Template

```md
## Table: `<name>`

Owner: <domain>
Purpose: <why it exists>

Columns:
- `id`: <type and rule>
- `<field>`: <type and rule>

Relationships:
- <relationship>

Indexes:
- <index>

Lifecycle:
- <status values>

Privacy/Retention:
- <policy>

Tests:
- <migration/schema/data test>
```

## Task Block Template

```md
### Task: <short title>

Status: Planned | In Progress | Blocked | Done
Phase: <phase number and name>
Owner: Frontend | Backend | Full stack | QA | Security | DevOps | Product
Source docs:
- `<path>`

Deliverables:
- <specific output>

Acceptance criteria:
- <observable requirement>

Validation:
- <command or review gate>

Risks:
- <risk and mitigation>

Rollback:
- <rollback plan>
```

## Test Plan Template

```md
# Test Plan: <feature>

Scope: <feature/domain>
Risk level: Low | Medium | High | Critical

Unit tests:
- <case>

Integration tests:
- <case>

API tests:
- <case>

E2E tests:
- <case>

Accessibility/performance/security:
- <gate>

Manual QA:
- <case>

Release decision:
- Pass | Blocked | Conditional
```

## Acceptance Criteria

- Future implementation plans can be produced consistently.
- Each template links work back to source docs and validation.
- Tasks include rollback and risk handling before execution.
