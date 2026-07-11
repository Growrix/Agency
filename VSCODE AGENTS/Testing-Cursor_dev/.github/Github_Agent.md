# Github Agent

This file is the human-facing entry brief for the workspace's root Git and GitHub management agent.

## Purpose

Use this agent when the work is about workspace Git operations, repo targeting, onboarding a new repo, commit or pull or push safety, factory backup sync, or registry updates.

It is responsible for protecting repo correctness across the Testing factory by separating the root backup repo from the operational project repos.

## What It Owns

- workspace repo targeting and repo-root resolution
- repo onboarding and registry updates
- alias and junction normalization
- commit, pull, fetch, and push preflight safety
- factory-backup versus project-flow routing
- drift reporting when repo topology changes

## What It Does Not Own

- normal frontend delivery work
- normal backend or deploy work
- application feature implementation inside project repos

## Actual Invocable Agent

- Public wrapper: `.github/agents/github-agent.agent.md`

## Supporting Files

- Root support registry: `.github/git-workspace-manager/README.md`
- Operating model spec: `.github/git-workspace-manager/specs/operating-model-spec.md`
- Repo registry contract: `.github/git-workspace-manager/specs/repo-registry-contract-spec.md`
- Validation checklist: `.github/git-workspace-manager/checklists/operating-readiness-checklist.md`
- Registry files: `.github/git-workspace-manager/registry/`
- Folder-to-repo index: `.github/git-workspace-manager/registry/folder-repo-index.seed.json`
- Human-readable project root map: `.github/git-workspace-manager/registry/project-root-repo-map.md`

## Rule Of Thumb

If the request is about which repo to target, whether a commit or push is safe, how to onboard a repo into the workspace registry, or whether a change belongs in the root backup repo versus a project repo, use the Github Agent.

Always resolve the active folder against the folder-to-repo index before push, and confirm the same root is represented in `.github/git-workspace-manager/registry/project-root-repo-map.md`. If a governed root exists in the workspace but is missing from either surface, block direct Git action and refresh the registry first. If a mapped folder targets a different remote than the current git root remote, block direct root push and use the mapped strategy (for example subtree push).

For subtree strategy, run a prefix completeness preflight:
- count tracked files under the prefix
- count untracked files under the prefix
- if untracked > 0, block subtree push and require a full folder mirror sync flow to the target remote branch
