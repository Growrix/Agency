# Git Workspace Manager Support Root

This folder contains the root-scoped supporting files behind the workspace's single public Github Agent.

This is a core root system for the Testing factory, not an isolated project subsystem.

## Public Entry
- `.github/agents/github-agent.agent.md`

## Support Coverage
- operating model and flow separation
- repo registry contract
- human-readable project-root-to-repo map for operators and agents
- folder-to-repo index for folder-scoped projects
- subtree completeness preflight for folder-scoped push safety
- readiness checklists
- seed registry files
- future internal support docs for repo audit and safety logic

## Core Policy
- `Testing` root repo is the explicit factory backup repo.
- Child repos are the operational source of truth.
- Repo targeting must resolve to a canonical repo root before any Git action runs.
- Root backup flow and project flow must stay separate.
