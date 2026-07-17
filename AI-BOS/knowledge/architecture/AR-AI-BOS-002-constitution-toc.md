---
id: AR-AI-BOS-002
title: AI-BOS Constitution — Table of Contents
type: architecture
category: governance
domain: ai-bos
version: 1.0.0
status: draft
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - ai-bos-architect
dependencies:
  - AR-AI-BOS-001
related:
  - constitution
  - governance
  - principles
  - philosophy
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - constitution
  - toc
  - governance
---

# AI-BOS Constitution — Table of Contents

## Purpose

Define the structural outline (table of contents) of the AI-BOS Constitution — the highest-order governance document of the AI Business Operating System. This TOC establishes what the Constitution will contain and in what order, before any section is written. The Constitution itself is authored only after this TOC is approved.

## Scope

This document specifies the **sections and their intent** only. It does not write the Constitution's content. It must remain valid even if every underlying technology changes — the Constitution is the most durable artifact in the system and must never contain implementation details.

## Principles

1. **Durability over specificity** — the Constitution outlives every tool, provider, and language. Anything that would not be true in 10 years belongs in a Standard or Handbook, not the Constitution.
2. **Philosophy before mechanics** — the Constitution states *why* and *how we decide*, not *how we execute*. Execution belongs to downstream layers (Capability Model, Knowledge Architecture, Execution Architecture).
3. **One constitution, one business** — there is exactly one Constitution for the entire AI-BOS, regardless of how many domains (SaaS, agency, research, marketing) it eventually supports.
4. **Stability through versioning, not editing** — changes are additive and versioned; permanent rules are not silently rewritten.
5. **Human and AI co-readable** — every section is meaningful to a human architect and an AI agent consuming it as a Knowledge Object.

## Standards

### Constitution TOC

```text
AI-BOS Constitution
├── 0.  Preamble
├── 1.  Vision
├── 2.  Mission
├── 3.  Philosophy
│   ├── 3.1  Knowledge Philosophy
│   ├── 3.2  AI Philosophy
│   ├── 3.3  Quality Philosophy
│   └── 3.4  Security Philosophy
├── 4.  Core Principles
├── 5.  Permanent Rules
├── 6.  Layer Model
├── 7.  Governance
│   ├── 7.1  Roles and Ownership
│   ├── 7.2  Decision Process
│   └── 7.3  Authority and Delegation
├── 8.  Evolution Process
├── 9.  Versioning Strategy
├── 10. Amendment Process
└── 11. Ratification and Change History
```

### Section intent (one line each)

| # | Section | Intent |
|---|---------|--------|
| 0 | Preamble | Why this Constitution exists; what problem AI-BOS solves; relationship to the legacy repository |
| 1 | Vision | The long-term destination of the AI Business Operating System (drawn from AR-AI-BOS-001) |
| 2 | Mission | What AI-BOS commits to do, for whom, and what it explicitly does not do |
| 3 | Philosophy | The four philosophical stances subsections — Knowledge, AI, Quality, Security — that govern all downstream decisions |
| 3.1 | Knowledge Philosophy | What knowledge is, how it differs from agents/MCP/projects/runtime, and how it must be treated |
| 3.2 | AI Philosophy | How AI is treated as a first-class operator: co-readable artifacts, vendor independence, auditability |
| 3.3 | Quality Philosophy | The quality bar (enterprise-grade, modular, reusable) and how quality is enforced without blocking velocity |
| 3.4 | Security Philosophy | Trust boundaries, least-privilege, secret handling, audit posture — stated as philosophy, not mechanism |
| 4 | Core Principles | The named principles (modular, reusable, tool-independent, vendor-independent, versionable, etc.) with one-line definitions |
| 5 | Permanent Rules | Non-negotiable invariants the system must always satisfy (e.g. "IDs never change", "agents reference IDs not paths", "no tool-specific content in knowledge") |
| 6 | Layer Model | The canonical separation: Knowledge / Agents / MCP / Projects / Runtime — and the rule that they never merge |
| 7 | Governance | Who owns what, how decisions are made, how authority is delegated |
| 7.1 | Roles and Ownership | Named roles (e.g. AI-BOS owner, knowledge owner, agent owner, project owner) and their responsibilities |
| 7.2 | Decision Process | How changes are proposed, reviewed, approved, or rejected; the role of `@system-builder` vs `@ai-bos-architect` vs human |
| 7.3 | Authority and Delegation | Which decisions a human must make, which an AI agent may make, which require both |
| 8 | Evolution Process | How the system grows over time: phase-gated planning, registry-driven change, deprecation discipline |
| 9 | Versioning Strategy | How the Constitution, Standards, and Knowledge Objects are versioned; what a major vs minor change means |
| 10 | Amendment Process | The explicit procedure for changing the Constitution itself (the Constitution is durable, not immutable) |
| 11 | Ratification and Change History | Sign-off record and dated log of amendments |

### What the Constitution explicitly excludes

- Folder or repository structure (final layer, designed last)
- Specific tools, providers, IDEs, or frameworks
- Code, schemas, or configuration
- Phase-by-phase build plans (those live in `tasks.md` and per-phase artifacts)
- Specific knowledge objects, handbooks, or standards (those are downstream)

## Best Practices

- Author the Preamble and Vision first; they anchor everything else.
- Keep each section under one screen of content — depth belongs in referenced Standards, not the Constitution.
- Phrase Permanent Rules as invariants the system must satisfy, not as commands to a specific tool.
- Reference AR-AI-BOS-001 (Vision) as the source of Vision content, but do not duplicate it — the Constitution's Vision section is the ratified form.
- Treat the Constitution as the only document that may declare *permanent* rules; everything else is versioned and changeable.

## Anti-patterns

- Embedding implementation details (paths, package names, provider names) in the Constitution.
- Writing the Constitution as a folder-tree document — repository structure is the last layer, not the first.
- Allowing the Constitution to be edited silently — amendments must go through Section 10.
- Duplicating the Vision artifact (AR-AI-BOS-001) verbatim instead of ratifying it.
- Mixing governance mechanics (decision process) with philosophy (why we decide that way) — keep Sections 3 and 7 distinct.
- Creating multiple constitutions per domain — there is exactly one.

## References

- `AI-BOS/.cursor/skills/ai-bos-architect/references/ai-bos-planning-prompt.md` — Phase 2 spec
- `knowledge/architecture/AR-AI-BOS-001-vision.md` — Phase 1 approved Vision (input to Section 1)
- `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc` — local governance rule (must align with Constitution Section 5 and 7)

## Related Knowledge Objects

- AR-AI-BOS-001 — Overall Vision (dependency; source for Section 1)
- AR-AI-BOS-003 — Challenge Assumptions (Phase 3, not yet authored; will pressure-test this TOC)
- ST-GOV-001 — Constitution Standard (Phase 12, not yet authored; will formalize amendment mechanics)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 2 Constitution TOC — awaiting user approval |
