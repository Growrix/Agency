---
document_type: workflow-playbook
scope: universal-role-orchestration
recommended_start: Fullstack_Contract_Orchestrator
---

# Documentation Workflow Playbook

## Purpose

- This file defines the practical workflow for using the GPT role system without losing architectural alignment.
- It exists so documentation is built in a controlled sequence instead of ad hoc role switching.

## Short Answer

- Do not ask all roles to generate everything at once in one uncontrolled prompt.
- Do not start with frontend or backend in isolation.
- Start with one orchestrated contract phase, then move through specialized roles in sequence.

## What To Do With An Existing Frontend Plan

- Do not delete an existing plan immediately only because it was created before orchestration.
- Treat it as a draft or legacy artifact.
- First, run the contract orchestration pass and compare the old plan against the new shared contract.
- Keep, revise, or replace sections only after that comparison.

Delete only if the old plan is structurally incompatible and would create confusion.

## Recommended Workflow

### Phase 0: Source Of Truth Setup

Goal:
- define one canonical planning root
- define one AI-first entrypoint
- define one human index

Required outputs:
- `ai-context.yaml`
- `README.md`

### Phase 1: Shared Contract Blueprint

Role:
- Fullstack Contract Orchestrator

Goal:
- define the system before specialization starts

This phase should lock:
- product scope
- surfaces
- role boundaries
- route map
- domain entities
- lifecycle states
- integration inventory
- non-functional requirements
- implementation sequence

Output rule:
- no specialized role should override this layer silently

### Phase 2: Frontend Planning

Role:
- Frontend UIUX Generator

Goal:
- build UI planning from the shared contract

Input rule:
- frontend must consume the shared contract before page planning

Output rule:
- frontend may define presentation and interaction
- frontend may not invent server-backed states, payloads, permissions, or integration behavior

### Phase 3: Backend Planning

Role:
- Backend System Planner

Goal:
- build backend architecture from the same shared contract

Output rule:
- backend must stay compatible with the route, role, and workflow definitions already locked in Phase 1

### Phase 4: API And Data Freeze

Role:
- API Data Contract Architect

Goal:
- convert the shared product model into canonical APIs, schemas, events, and status contracts

Why this phase is after frontend and backend planning:
- by this point both sides have context
- now the interface layer can be normalized and conflict-checked

### Phase 5: Security And Trust Hardening

Role:
- Security Compliance Trust Architect

Goal:
- harden auth, authorization, privacy, auditability, abuse protection, and trust boundaries

### Phase 6: DevOps And Release Planning

Role:
- DevOps Reliability Release Planner

Goal:
- define environments, release strategy, observability, recovery, rollout controls, and operational safety

### Phase 7: QA And Release Governance

Role:
- QA Test Release Governor

Goal:
- define test coverage, contract verification, end-to-end scenarios, release gates, and post-deploy checks

## Best Execution Model

Use a controlled one-by-one workflow with artifacts carried forward.

That means:
- one role runs
- it writes files
- next role reads those files
- next role extends or validates, not reinvents

This is the safest model.

## When To Use All-In-One Prompts

You may use one large prompt only for a managed orchestration request, not for simultaneous freeform generation.

In that case the prompt must explicitly say:
- first create the shared contract blueprint
- then generate frontend from it
- then generate backend from it
- then freeze API and data contracts
- then harden security, DevOps, and QA
- every later phase must read earlier artifacts before writing new ones

So even in an all-in-one request, the internal execution must still be sequential.

## Recommended Folder Strategy

Use one root planning folder per project with this pattern:

- `ai-context.yaml`
- `README.md`
- shared contract docs
- frontend docs
- backend docs
- api and data docs
- security docs
- ops docs
- quality docs

Do not scatter each role into unrelated folders without one root entrypoint.

## Prompt Pattern

Every prompt should include these fields:

- role to use
- target folder
- first file to read
- files that are already source of truth
- exact output scope
- instruction not to invent conflicting contracts

## Prompt Templates

### 1. Contract Blueprint Prompt

```text
Start with DOC/Universal/GPT ROLES/ai-context.yaml and use the Fullstack Contract Orchestrator role.
Create the shared contract blueprint for this project in [target folder].
Generate ai-context.yaml, README.md, product requirements, system architecture, module boundaries, route and surface map, domain states, integration inventory, and implementation sequence.
This is the source-of-truth phase. Do not write frontend-only or backend-only assumptions as facts unless they are explicitly marked as assumptions.
```

### 2. Frontend Planning Prompt

```text
Start with [project ai-context.yaml] and use the Frontend UIUX Generator role.
Read the shared contract docs first.
Generate the frontend plan in [target folder or frontend subfolder].
Do not invent payloads, permissions, server states, or integration side effects.
If any backend contract is missing, record it in an assumptions ledger instead of inventing behavior.
```

### 3. Backend Planning Prompt

```text
Start with [project ai-context.yaml] and use the Backend System Planner role.
Read the shared contract docs first.
Generate backend architecture, service rules, auth, storage, integrations, observability, and operational patterns.
Support common provider categories such as S3, SendGrid, Stripe, Pusher, Redis, OAuth, and queues where relevant.
Do not invent workflows that conflict with the shared blueprint.
```

### 4. API And Data Contract Prompt

```text
Start with [project ai-context.yaml] and use the API Data Contract Architect role.
Read the shared contract docs plus the current frontend and backend docs.
Freeze canonical entities, status models, APIs, event contracts, and migration expectations.
Resolve naming or lifecycle conflicts explicitly instead of silently choosing one side.
```

### 5. Security Prompt

```text
Start with [project ai-context.yaml] and use the Security Compliance Trust Architect role.
Read the shared contract, backend, and API/data docs first.
Generate auth, authorization, tenant isolation, privacy, abuse protection, auditability, and incident guidance.
```

### 6. DevOps Prompt

```text
Start with [project ai-context.yaml] and use the DevOps Reliability Release Planner role.
Read the shared contract, backend, security, and integration docs first.
Generate environment strategy, CI/CD, observability, rollout, rollback, capacity, and recovery docs.
```

### 7. QA Prompt

```text
Start with [project ai-context.yaml] and use the QA Test Release Governor role.
Read the shared contract, frontend, backend, API/data, security, and DevOps docs first.
Generate test strategy, contract matrix, e2e scenarios, release gates, and post-deploy validation.
```

## If You Want One Master Prompt

Use this shape:

```text
Start with DOC/Universal/GPT ROLES/ai-context.yaml.
Follow the role orchestration sequence strictly.

Phase 1: use Fullstack Contract Orchestrator to create the shared blueprint.
Phase 2: use Frontend UIUX Generator to create frontend docs from the shared blueprint.
Phase 3: use Backend System Planner to create backend docs from the same shared blueprint.
Phase 4: use API Data Contract Architect to freeze schemas, APIs, events, and states.
Phase 5: use Security Compliance Trust Architect to harden permissions, privacy, and trust boundaries.
Phase 6: use DevOps Reliability Release Planner to create release and operations docs.
Phase 7: use QA Test Release Governor to create testing and release gate docs.

Every phase must read the artifacts created by earlier phases.
No phase may silently invent a conflicting contract.
If conflict appears, write a conflict-resolution section before continuing.
```

## Practical Recommendation

- For high-quality output, use one-by-one role execution.
- For speed, use a master orchestration prompt, but force sequential phases inside the prompt.
- The orchestrator phase is mandatory either way.

## Final Rule

- The workflow is not role-by-role improvisation.
- The workflow is contract first, specialization second, hardening third, release validation last.