# Senior SaaS Developer Agent

This file is the human-facing entry brief for the workspace's generic senior SaaS development agent.

## Purpose

Use this agent when you want one senior generalist to first understand the current system or project end-to-end, then decide whether the next step is planning, implementation, refactoring, debugging, audit, or verification.

It is the optional generic delivery entrypoint for SaaS work across frontend, backend, data, integrations, and release-gate validation.

## What It Owns

- end-to-end current-state audit before action
- plan-first delivery for cross-layer or under-documented scope
- full-stack implementation, refactoring, debugging, and repair
- documentation sync when behavior or contracts change
- validation and local commit discipline after code changes

## What It Does Not Own

- workspace Git topology, repo onboarding, or push-safety policy
- agent-system design, lane architecture, or workflow-governance changes
- forced replacement of the existing phased lanes

## Actual Invocable Agent

- Public wrapper: `.github/agents/senior-saas-developer.agent.md`

## Supporting Files

- Canonical public agent: `Backend & Deploy/.github/agents/senior_saas_developer.agent.md`
- Canonical source mirror: `Backend & Deploy/DOC/agents/senior_saas_developer.agent.md`
- Execution spec: `Backend & Deploy/DOC/execution/spec-rules/senior-saas-developer-spec.md`
- Validation checklist: `Backend & Deploy/DOC/validation/checklists/senior-saas-developer-readiness-checklist.md`
- Root frontend instruction pack: `.github/instructions/frontend-phase2.instructions.md`
- Generic project planning reference: `.github/project-starters/hybrid-canonical-project-starter/.github/agents/project-e2e-planning-architect.agent.md`
- Generic project execution reference: `.github/project-starters/hybrid-canonical-project-starter/.github/agents/project-strict-executor.agent.md`
- Generic project quality reference: `.github/project-starters/hybrid-canonical-project-starter/.github/agents/project-quality-enforcer-v2.agent.md`

## Default Use Cases

- understand an existing SaaS project before editing
- create or refresh a plan before implementation
- implement full-stack features without manually switching agents
- refactor or debug an existing frontend or backend slice
- validate a project end-to-end after targeted changes

## Rule Of Thumb

If the request is "understand the current system first, then plan and execute like a senior developer," use this agent.

If the request becomes primarily about repo targeting or Git safety, switch to `github-agent.agent.md`.

If the request becomes primarily about agent design, lane boundaries, or workflow governance, switch to `system-builder.agent.md`.