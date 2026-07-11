# Operating Model Spec

## Purpose
Define the approved Git operating model for the Testing workspace.

## Core Separation
- Root `Testing` repo is the factory backup repo.
- Child repos are the operational source of truth.
- Factory backup flow and project flow must remain separate.

## Flow Types
### Project Flow
Use when the task belongs to one project repo.

Requirements:
- resolve one canonical child repo
- run Git only against that repo root
- show commit or push preflight before action
- do not touch the root backup repo unless explicitly requested in addition

### Factory Backup Flow
Use only when the user explicitly asks for a factory backup, workspace snapshot, or root backup sync.

Requirements:
- resolve to `Testing` root repo
- confirm that the action is intentionally factory-wide
- keep the backup commit separate from project commits

## Resolution Order
1. explicit project path
2. active file path
3. current working directory
4. registry fallback only when the first three remain unambiguous

## Hard Blocks
- child project task resolving to workspace root
- push requested for a repo with no remote
- alias path not normalized to canonical path
- multiple candidate repos for one action
- missing registry entry for a new repo

## Required Preflight Output
- repo id
- canonical path
- role
- current branch
- remote summary
- requested action
- decision: allow or block
- blocking reason when blocked
