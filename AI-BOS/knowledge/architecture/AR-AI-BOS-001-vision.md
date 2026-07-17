---
id: AR-AI-BOS-001
title: AI-BOS Overall Vision
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
dependencies: []
related:
  - constitution
  - capability-model
  - knowledge-registry
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - vision
  - v2
  - greenfield
---

# AI-BOS Overall Vision

## Purpose

Define the long-term vision for the AI Business Operating System (AI-BOS) Version 2 — a tool-independent foundation that becomes the permanent brain of the business, replacing ad-hoc accumulation of handbooks, prompts, agents, and workflows with a governed, discoverable architecture.

## Scope

This document covers strategic vision only. It does not specify folder structures, implementation technology, or tool-specific configuration. Constitution, capability model, and knowledge architecture follow in subsequent phases.

## Principles

1. **One architecture, many domains** — SaaS is the first domain, not the only domain.
2. **Capabilities before containers** — permanent business capabilities drive knowledge, agents, MCP, and projects — not folder names.
3. **Strict layer separation** — Knowledge, Agents, MCP, Projects, and Runtime are distinct; never conflate.
4. **Vendor independence** — the system must remain valid if Cursor, Claude, Copilot, or any single provider disappears.
5. **Greenfield over migration** — Version 2 is designed from principles; the legacy repository is reference only until selectively absorbed.
6. **Human and AI co-readable** — every artifact serves both audiences via metadata + structured content.
7. **Evolution by design** — versioning, registry tracking, and governance enable change without breaking references.

## Standards

### Problem being solved

| Problem | AI-BOS response |
|---------|-----------------|
| Duplicate knowledge | Registry with permanent IDs; one responsibility per document |
| Overlapping handbooks | Capability-driven taxonomy; explicit dependencies |
| Unclear boundaries | Layer model: Knowledge / Agent / MCP / Project / Runtime |
| Mixed responsibilities | Consumer model: agents consume knowledge; MCP provides capabilities |
| Inconsistent organization | Knowledge Object standard (metadata + 9-section body) |
| Poor cross-project reuse | Tool-independent knowledge referenced by ID, not path |
| Unclear Agent–MCP–Knowledge relationship | Documented flow: Registry → Object → Agent → Project |

### Long-term domain coverage

AI-BOS must eventually support:

- SaaS development (first domain)
- Web development agency and client delivery
- Research, business planning, product planning
- Lead generation, marketing, SEO, social content
- Documentation and proposal generation
- Architecture and coding workflows
- MCP servers and AI agents
- Knowledge management, learning, internal SOPs
- Future business domains without architectural rework

### Design qualities (non-negotiable)

Modular, reusable, tool-independent, AI-friendly, human-friendly, vendor-independent, scalable, versionable, enterprise-grade.

### Tool compatibility target

Must work with Cursor, Claude Code, GitHub Copilot, VS Code, OpenAI, Anthropic, MCP, and future AI tools. Runtime configuration (`.cursor/`, `.github/`, `.vscode/`) lives outside knowledge.

## Best Practices

- Author vision and strategy artifacts before repository structure.
- Register every artifact in `knowledge-registry/` immediately after creation.
- Use `@system-builder` for structural changes; `@ai-bos-architect` for content.
- Gate each planning phase with explicit user approval.
- Treat chat as ephemeral; disk artifacts are canonical.

## Anti-patterns

- Designing folder trees before the Capability Model exists.
- Embedding Cursor rules or MCP config inside handbook content.
- Migrating legacy repo wholesale without capability mapping.
- Letting agents "own" knowledge instead of consuming it.
- Skipping registry registration "until later."
- Assuming SaaS is the only future domain.

## References

- `AI-BOS/.cursor/skills/ai-bos-architect/references/ai-bos-planning-prompt.md`
- `AI-BOS/.cursor/skills/ai-bos-architect/references/knowledge-registry-standard.md`
- `Ongoing DOCS/AI-BOS_Constitution_Planning_Prompt.md` (source reference)

## Related Knowledge Objects

- AR-AI-BOS-002 — Constitution TOC (Phase 2, not yet authored)
- ST-KNOWLEDGE-001 — Knowledge Registry Standard (embedded in references; formal ST object in Phase 5)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 1 vision draft — awaiting user approval |
