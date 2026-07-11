# Hybrid Canonical Project Starter

This starter package is the canonical local continuation scaffold for new website projects created from the shared workspace agents.

## Purpose

- attach a reusable project-local DOC system to a new or existing project root
- attach reusable project-local agents for planning, execution, and quality enforcement
- preserve future continuation inside the project instead of leaving the plan only in chat

## Copy Contract

- source path: `.github/project-starters/hybrid-canonical-project-starter/`
- bootstrap script: `.github/project-starters/bootstrap-hybrid-canonical-project-starter.ps1`
- copy mode: copy missing files only; do not overwrite existing project files by default
- target root: the resolved project folder, usually `FRONTEND DEV/<project-slug>/`

## Included Surfaces

- `.github/agents/` project-local continuation agents
- `DOC/` starter documentation system
- `memories/repo/site-brain.md` starter project memory anchor
- `starter-manifest.json` machine-readable starter contract

## Runtime Rule

This starter package does not force a single runtime layout. The actual frontend runtime may live at the project root or under a nested runtime folder such as `web/`. Planning artifacts must record the real runtime root before implementation expands.