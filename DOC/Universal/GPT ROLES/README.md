---
document_type: role-index
human_index: true
ai_first_stop: ai-context.yaml
scope: universal-role-system
---

# GPT ROLES README

## Purpose

- This folder contains universal GPT roles for planning enterprise-grade site and SaaS documentation.
- These roles are not project-specific.
- They exist to help an AI generate end-to-end documentation before and during implementation.

## AI First-Stop File

- Start with [ai-context.yaml](ai-context.yaml).
- It defines role order, task-to-role routing, and the shared contract artifacts all roles must respect.
- Then read [Documentation_Workflow_Playbook.md](Documentation_Workflow_Playbook.md) for the execution sequence and prompt templates.

## Core Rule

- Do not let frontend, backend, data, security, QA, and DevOps planning drift into separate invented systems.
- The shared system contract must be established first.

## Recommended Role Order

1. [Fullstack_Contract_Orchestrator.md](Fullstack_Contract_Orchestrator.md)
2. [Frontend_UIUX_Generator.md](Frontend_UIUX_Generator.md)
3. [Backend_System_Planner.md](Backend_System_Planner.md)
4. [API_Data_Contract_Architect.md](API_Data_Contract_Architect.md)
5. [Security_Compliance_Trust_Architect.md](Security_Compliance_Trust_Architect.md)
6. [DevOps_Reliability_Release_Planner.md](DevOps_Reliability_Release_Planner.md)
7. [QA_Test_Release_Governor.md](QA_Test_Release_Governor.md)

## Why This Order Exists

- The contract orchestrator creates the shared blueprint.
- Frontend and backend planners should consume the same blueprint instead of creating separate realities.
- API and data architecture lock interface details.
- Security, DevOps, and QA roles then harden and validate the system.

## Shared Required Outputs

Every role that generates a documentation folder should require:

- a compact `ai-context.yaml` as the canonical AI entrypoint
- a `README.md` as the human-readable index
- task-based read paths so an AI can read the minimum required files
- explicit invariants, state models, and ownership boundaries

## Role Selection Shortcuts

- Use [Fullstack_Contract_Orchestrator.md](Fullstack_Contract_Orchestrator.md) when the project has not locked its cross-system blueprint yet.
- Use [Frontend_UIUX_Generator.md](Frontend_UIUX_Generator.md) for page systems, design systems, component systems, and route-level UX planning.
- Use [Backend_System_Planner.md](Backend_System_Planner.md) for services, integrations, auth, storage, jobs, and operational backend rules.
- Use [API_Data_Contract_Architect.md](API_Data_Contract_Architect.md) when API shapes, schemas, events, and status models need to be canonical.
- Use [Security_Compliance_Trust_Architect.md](Security_Compliance_Trust_Architect.md) for authz, tenant isolation, audit, privacy, abuse protection, and compliance planning.
- Use [DevOps_Reliability_Release_Planner.md](DevOps_Reliability_Release_Planner.md) for environments, CI/CD, release strategy, observability, scaling, and recovery planning.
- Use [QA_Test_Release_Governor.md](QA_Test_Release_Governor.md) for test strategy, release gates, contract verification, and end-to-end validation.

## Workflow Guide

- Use [Documentation_Workflow_Playbook.md](Documentation_Workflow_Playbook.md) to decide whether to run roles one by one or through a managed sequential orchestration prompt.
- Default workflow: orchestrator first, specialized roles second, hardening roles after, QA last.

## Exit Condition

- The role system is considered complete when an AI can choose one role, follow the shared routing rules, and generate compatible enterprise documentation without inventing undocumented contracts.