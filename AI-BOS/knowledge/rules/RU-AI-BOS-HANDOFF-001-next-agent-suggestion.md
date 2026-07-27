---
id: RU-AI-BOS-HANDOFF-001
title: Next-Agent Suggestion and Wrong-Agent STOP
type: rule
category: governance
domain: ai-bos
version: 1.1.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GOV-SYSBUILD-001
  - AG-DLV-SAAS-001
  - AG-DLV-FE-001
  - AG-DLV-BE-001
  - AG-KNW-ARCH-001
  - AG-KNW-VALID-001
dependencies:
  - AR-AI-BOS-007
  - AR-AI-BOS-009
  - ST-AGT-001
  - RU-AI-BOS-VAULT-001
related:
  - handoff
  - routing
  - orchestration
  - bangla-beginner-guidance
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - handoff
  - bangla
capabilities:
  - CAP-ORG-003
  - CAP-PLT-001
  - CAP-OPS-005
---

# Next-Agent Suggestion and Wrong-Agent STOP

## Purpose

Require every agent to guide the human to the correct next performer after material work, and to stop early when the wrong agent was selected. All human-facing suggestions must be explained in **simple Bangla** with a **concrete example**, written for a **beginner SaaS developer** learning while building a real project.

## Scope

Applies to **all** registered AI-BOS agents (`AG-*`) and their vault runtime projections. Additive — does not replace domain rules or quality gates.

## Principles

1. Handoffs are user-routing guidance, not hidden autonomous orchestration (AR-AI-BOS-009).
2. **Humans choose** the next agent; agents recommend only.
3. Suggestions are **optional** — the human is never obligated to follow them.
4. Wrong-agent detection protects scope boundaries and vault lanes.
5. Suggestions cite agent IDs and vault runtime `@names` for copy-paste.
6. **Bangla primary** for human-facing explanation; technical IDs stay in English for invocation.

## Standards

### Mandatory output block (after every material final outcome)

Every agent must end material work with this section (Bangla, 10th-grade style):

```text
## পরবর্তী ধাপ (সহজ বাংলা)

### এখন কী হয়ে গেছে
- ১–২ লাইন: এই সেশনে কী শেষ হলো (সহজ ভাষায়)

### পরবর্তীতে কাকে ডাকতে পারো (বাধ্যতামূলক না — তুমি বেছে নেবে)
1. @<runtime-name> (AG-…)
   - কেন: ...
   - উদাহরণ: “যদি তুমি বলো: …”
   - কখন ডাকবে না: ...
2. @<runtime-name> (AG-…) — (ঐচ্ছিক বিকল্প)
   - কেন: ...
   - উদাহরণ: ...
   - কখন ডাকবে না: ...

### এখনই কোনটা বেছে নেবে না
- @<name> — কারণ ...

### তোমার সিদ্ধান্ত
- কোনটা বেছে নেবে লেখো, অথবা “আরও ব্যাখ্যা দাও” বলো।
- সাজেশন মানতে বাধ্য নও — AI সাজেশন = মেনু, অর্ডার নয়।
```

### Content rules for Bangla block

| Rule | Detail |
|------|--------|
| Language | Simple Bangla; avoid jargon without one-line definition |
| Audience | Beginner SaaS developer building `web/` or learning agent system |
| Examples | One **concrete** example per suggested agent (login page, API error, deploy, vault rule — not abstract) |
| Count | Max **3** suggestions; mark **one recommended default** when possible |
| Choice | Explicitly state suggestions are optional; human decides before next session |
| IDs | Keep `@name` and `AG-*` in English for Cursor invocation |

### Wrong-agent STOP (also in Bangla)

If the request clearly belongs to another agent:

1. **STOP** — no further edits or scope expansion.
2. Emit Bangla block:

```text
## ভুল এজেন্ট — থামছি

### কেন থামছি
- সহজ বাংলায়: এই কাজটা অন্য এজেন্টের

### সঠিক এজেন্ট
- @<runtime-name> (AG-…)

### উদাহরণ
- “যদি তুমি বলো: …” → ওই এজেন্ট ডাকো

### পরের বার কী লিখবে (copy-paste)
- @<runtime-name> + তোমার কাজের এক লাইন
```

3. Do not continue the wrong agent's scope.

### Sources of truth for suggestions

1. `agent-registry/registry.json` handoffs
2. Vault `.cursor/brain/lane-router.yaml` intent_routing (when present)
3. Project binding rules (RU-AI-BOS-SAAS-001, HTML/NEXT/BP/SEO)

## Best Practices

- Prefer **one clear default** + at most two alternatives.
- Explain *why* in Bangla before naming the agent.
- Include quality-enforcer agents at phase end with example (“phase শেষ — full test চালাতে”).
- If user seems confused, add: “আমার লক্ষ্য X — কোনটা?” style prompt in **তোমার সিদ্ধান্ত**.

## Anti-patterns

- English-only one-line suggestions without Bangla explanation.
- Ending a material run with no next-step guidance.
- Auto-invoking another agent without human selection.
- Endless suggestion chains without pausing for human choice.
- Jargon-heavy Bangla that assumes senior dev knowledge.
- Suggesting agents whose files are not in the vault (violates RU-AI-BOS-VAULT-001).
- Continuing work after recognizing a wrong-agent selection.

## References

- AR-AI-BOS-007 — handoff contracts
- AR-AI-BOS-009 — handoff execution semantics
- RU-AI-BOS-VAULT-001

## Related Knowledge Objects

- HB-PLT-SYSBUILD-001
- RU-AI-BOS-SAAS-001
- HB-DLV-SAAS-ORCH-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial next-agent suggestion rule (I10). |
| 1.1.0 | 2026-07-18 | Bangla beginner template + optional-choice discipline (I11). |
