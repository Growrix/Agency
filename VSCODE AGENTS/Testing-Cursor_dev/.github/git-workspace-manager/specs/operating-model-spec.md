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
- resolve active folder against folder-to-repo index before push
- when folder mapping remote differs from current git root remote, block direct root push
- use mapped push strategy (direct repo root or subtree) for folder-scoped projects
- for subtree strategy, run prefix completeness preflight and block when untracked files exist under prefix
- run Git only against that repo root
- show commit or pull or push preflight before action
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
4. folder-to-repo index mapping
5. registry fallback only when the first four remain unambiguous

## Hard Blocks
- child project task resolving to workspace root
- folder-mapped project resolving to workspace root
- folder-mapped remote mismatch on push
- subtree prefix contains untracked files
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
- folder mapping match (yes or no)
- push strategy (direct or subtree)
- subtree completeness summary (tracked vs untracked under prefix)
- requested action
- decision: allow or block
- blocking reason when blocked
