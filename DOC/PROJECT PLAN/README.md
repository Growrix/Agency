# Project Plan Root

This folder is the canonical project-specific documentation root for the Agency SaaS Website.

## What This Folder Does

This is the handoff point between:
- the universal orchestration system
- the GPT role system
- the real implementation phase

Use this folder to keep the project deterministic.

## Canonical AI Entry

Start here for any implementation or later project work:
- `DOC/PROJECT PLAN/ai-context.yaml`

Do not start implementation from the universal prompt.
The universal prompt is only for generating the project-specific documentation set.

## Documentation Chain

### 1. Universal Layer
Defines reusable prompts, roles, and workflow rules.

Primary files:
- `DOC/Universal/Prompts/master_orchestration_prompt.md`
- `DOC/Universal/GPT ROLES/ai-context.yaml`
- `DOC/Universal/GPT ROLES/Documentation_Workflow_Playbook.md`
- `DOC/Universal/Execution Constitution.md`

### 2. Project Input
Human source of truth for requirements.

Primary file:
- `DOC/MASTER PLAN/Plan.md`

### 3. Project-Specific Outputs
Generated sequentially by GPT roles.

Folders:
- `Tasks/`
- `Shared Contracts/`
- `Frontend/`
- `Backend/`
- `API and Data/`
- `Security/`
- `DevOps/`
- `QA/`

## What To Read First

### For project understanding
1. `DOC/PROJECT PLAN/ai-context.yaml`
2. `DOC/PROJECT PLAN/Tasks/tasks.md`
3. `DOC/PROJECT PLAN/Shared Contracts/README.md`

### For execution tracking
1. `DOC/PROJECT PLAN/Tasks/ai-context.yaml`
2. `DOC/PROJECT PLAN/Tasks/tasks.md`
3. `DOC/PROJECT PLAN/ai-context.yaml`

### For frontend build work
1. `DOC/PROJECT PLAN/ai-context.yaml`
2. `DOC/PROJECT PLAN/Shared Contracts/README.md`
3. `DOC/PROJECT PLAN/Frontend/README.md`

### For backend build work
1. `DOC/PROJECT PLAN/ai-context.yaml`
2. `DOC/PROJECT PLAN/Shared Contracts/README.md`
3. `DOC/PROJECT PLAN/Backend/README.md`
4. `DOC/PROJECT PLAN/API and Data/README.md`

### For release work
1. `DOC/PROJECT PLAN/ai-context.yaml`
2. `DOC/PROJECT PLAN/DevOps/README.md`
3. `DOC/PROJECT PLAN/QA/README.md`

## Concrete Rule

- Use `DOC/Universal/Prompts/master_orchestration_prompt.md` only to create project docs.
- Use `DOC/PROJECT PLAN/ai-context.yaml` for all later execution.
- Use `Shared Contracts/` as the cross-role source of truth.
- Use `Tasks/tasks.md` as the single execution tracker for current phase, blockers, and next steps.

## Why This Root File Was Needed

Without a root project entrypoint, AI can jump directly into random subfolders and lose the chain.
This root makes the workflow stable:
- first generate docs
- then execute from project docs
- keep the execution tracker updated
- never mix the two stages
