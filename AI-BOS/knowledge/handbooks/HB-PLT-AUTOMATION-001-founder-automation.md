---
id: HB-PLT-AUTOMATION-001
title: Founder Automation Handbook — n8n and AI Workflow Planning
type: handbook
category: platform
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-PLT-AUTOMATION-001
  - AG-STR-FOUNDER-001
dependencies:
  - AR-AI-BOS-004
  - HB-STR-FOUNDER-001
  - AG-DLV-INT-001
related:
  - automation
  - n8n
  - workflow
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - handbook
  - automation
  - n8n
capabilities:
  - CAP-PLT-004
---

# Founder Automation Handbook — n8n and AI Workflow Planning

## Purpose

Define how `AG-PLT-AUTOMATION-001` plans n8n, Zapier-style, and AI automation workflows — human builds and hosts them.

## Scope

Workflow diagrams, trigger/action lists, integration requirements, human setup checklists. Production wiring delegates to `@integration-platform` or human in n8n UI.

## Principles

1. **Plan only** — AI does not run n8n or purchase automation subscriptions.
2. **Human builds** — step-by-step n8n UI instructions in Bangla when needed.
3. **Security** — never store webhook secrets in memory; reference env var names.

## Standards

### Workflow plan template

- Trigger (webhook, schedule, form, email)
- Steps (transform, API call, notify)
- Systems (Stripe, Supabase, Resend, Lark, OpenAI)
- Human actions (create n8n account, add credentials, activate workflow)
- Failure handling (retries, alerts)

### Handoffs

| Need | Route |
|------|-------|
| API design | `@api-contract-architect` |
| Provider wiring in app | `@integration-platform` |
| Full SaaS feature | `@senior-saas-developer` |

## Anti-patterns

- Claiming automation is live without human confirmation
- Auto-buying n8n cloud subscription

## References

- HB-STR-FOUNDER-001
- integration-platform skill

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial (I13). |
