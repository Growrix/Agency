# Git Workspace Manager Blueprint

## Classification
- Request class: `design_new_capability`
- Archetype fit: `isolated_local_system_required`
- Root path: `GIT-WORKSPACE-MANAGER/`

## Problem Statement
The Testing workspace intentionally keeps one root Git repo for full factory backup while also containing many independent project repos. Without a governed routing model, Git operations can fall back to the root repo and create wrong-repo commits or pushes.

## Approved Model
- Root `Testing` repo = factory backup and rollback safety net.
- Child repos = operational source of truth for project work.
- Project Git actions must resolve to child repos first.
- Root backup actions must be explicit.
- Registry files define canonical paths, aliases, and push policy.

## System Objectives
1. Track which project folder belongs to which repo.
2. Track which repos are local-only and which have remotes.
3. Normalize junction and alias paths.
4. Separate project flow from factory backup flow.
5. Make onboarding of new repos update the tracking files.
6. Block ambiguous commit or push targets.

## Current Repo Topology Seed
- `Testing` root repo with remote `Growrix/Testing.git`
- `Foundation-Core` repo with remote `Growrix/Foundation_core.git`
- `BLOG-AUTOMATION` repo with remote `Growrix/Blog_Automation.git`
- `GrowrixAuto` repo with remote `Growrix/Growrix_Auto.git`
- `Rayiss` repo with remote `Growrix/Rayiss.git`
- local-only repos including `nexform-website`, `optilux`, `reference-style-4`, `reference-style-5`, `wostin-waste`, and `nexform-consulting`
- alias path `Foundation-Core-Junction` pointing at the canonical Foundation-Core repo

## Capability Readiness Map
### currently_supported
- approved operating model
- isolated local system root
- local agent registry
- seed registry files
- backup-vs-project policy definition
- alias normalization policy

### requires_extension
- scripts for repo audit and refresh
- scripts for commit preflight and push preflight
- onboarding command for new repos
- drift report generation
- optional VS Code task integration

### missing_knowledge
- whether GitHub CLI integration is desired later
- preferred cadence for root factory backup snapshots
- whether automated scheduled snapshots should exist outside normal manual workflow

## Phase Plan
- Phase 1: keep the system surface aligned and repair governance drift.
- Phase 2: lock the registry contract, onboarding rules, and safety gates.
- Phase 3: implement the operator commands and reporting flow.
- Phase 4: validate the safety cases and readiness checklist.

## Non-Goals
- replacing project-level Git histories
- merging the workspace into one monorepo
- auto-pushing to remotes
- turning frontend or backend delivery lanes into Git-management lanes
