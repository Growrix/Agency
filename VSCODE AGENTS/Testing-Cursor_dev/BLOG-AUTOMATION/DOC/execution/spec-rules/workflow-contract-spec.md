# Workflow Contract Spec

## Purpose
Define the contract between n8n workflows and the automation API.

## Core Rules
- n8n calls application endpoints only.
- Every workflow run has a `workflow_run_id`.
- Every mutating request has an `idempotency_key`.
- Cross-step traces share a `correlation_id`.
- Workflow state transitions are persisted.

## Required Route Groups
- `/api/keywords/*`
- `/api/briefs/*`
- `/api/outlines/*`
- `/api/posts/*`
- `/api/seo/*`
- `/api/quality/*`
- `/api/publish/*`
- `/api/analytics/*`

## Required Failure Behavior
- bounded retries with backoff
- safe handling for duplicate publish attempts
- dead-letter routing for exhausted jobs
- operator-visible failure reasons

## Required Audit Fields
- `workflow_run_id`
- `correlation_id`
- `idempotency_key`
- `actor_type`
- `source_step`
- `target_state`

## Non-Negotiable Boundary
n8n orchestrates jobs and schedules. The application owns business logic, persistence, and adapter execution.