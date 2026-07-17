# AI-BOS Knowledge Registry & Machine-Readable Documentation Standard

## Purpose

This document defines the machine-readable knowledge layer for the AI
Business Operating System (AI-BOS).

The goal is **not** to replace Markdown documentation.

The goal is to make every document:

-   Human readable
-   AI friendly
-   Machine readable
-   Tool independent
-   Searchable
-   Versionable
-   Reusable

------------------------------------------------------------------------

# Core Principle

Every knowledge document is a **Knowledge Object**.

A Knowledge Object consists of two parts:

1.  Metadata (machine-readable)
2.  Content (human-readable Markdown)

```{=html}
<!-- -->
```
    Knowledge Object
    ├── Metadata
    └── Markdown Content

------------------------------------------------------------------------

# Knowledge Registry

The Knowledge Registry is the index of the entire AI-BOS.

It never stores the handbook content itself.

Instead it stores metadata that allows AI systems to discover and
understand documents.

Responsibilities:

-   Unique IDs
-   Ownership
-   Version tracking
-   Dependencies
-   Consumers
-   Status
-   Search metadata
-   Lifecycle

------------------------------------------------------------------------

# Suggested Registry Structure

    knowledge-registry/

        registry.json

        handbook-index.json

        agent-index.json

        prompt-index.json

        mcp-index.json

        template-index.json

        workflow-index.json

        standard-index.json

------------------------------------------------------------------------

# Document Metadata Standard

Every handbook begins with YAML front matter.

``` yaml
---
id: HB-ENG-SEC-001

title: Security Engineering Handbook

type: handbook

category: engineering

domain: security

version: 1.0.0

status: active

owner: AI-BOS

visibility: public

audience:
  - human
  - ai

consumers:
  - backend-agent
  - security-agent
  - saas-architect

dependencies:
  - HB-ARCH-001
  - HB-BACKEND-001

related:
  - auth
  - jwt
  - sessions

review_cycle: quarterly

last_review:

priority: high

tags:
  - security
  - owasp
  - authentication
---
```

------------------------------------------------------------------------

# Document Body Standard

Every document follows the same high-level layout.

1.  Purpose
2.  Scope
3.  Principles
4.  Standards
5.  Best Practices
6.  Anti-patterns
7.  References
8.  Related Knowledge Objects
9.  Change History

------------------------------------------------------------------------

# Knowledge ID Convention

    HB = Handbook
    AR = Architecture
    BP = Blueprint
    ST = Standard
    RU = Rule
    PT = Pattern
    TP = Template
    WF = Workflow
    AG = Agent
    MC = MCP
    PR = Prompt
    EX = Example

Example:

    HB-ENG-FE-001
    HB-DOM-SAAS-002
    AR-AI-001
    MC-GITHUB-001
    AG-SAAS-ARCH-001

------------------------------------------------------------------------

# Consumer Model

Knowledge is never owned by an agent.

Agents consume knowledge.

    Knowledge Registry
            ↓
    Knowledge Object
            ↓
    Agent
            ↓
    Project

------------------------------------------------------------------------

# MCP Interaction Model

MCP servers provide capabilities only.

Recommended services:

-   knowledge.search
-   knowledge.read
-   knowledge.related
-   knowledge.dependencies
-   knowledge.validate

They query the registry instead of scanning folders.

------------------------------------------------------------------------

# Design Rules

-   One document = one responsibility.
-   Every document has a permanent ID.
-   IDs never change.
-   File paths may change.
-   Registry tracks path changes.
-   Agents reference IDs, not paths.
-   Tool-specific configuration must never be embedded in knowledge.

------------------------------------------------------------------------

# Evolution Strategy

Phase 1 - Human-readable Markdown - Consistent metadata

Phase 2 - Registry indexes - Dependency mapping

Phase 3 - Agent consumption by ID - MCP lookup APIs

Phase 4 - Automated validation - Impact analysis - Semantic search -
Knowledge graph

------------------------------------------------------------------------

# Success Criteria

The AI-BOS should be able to:

-   Find any knowledge object by ID.
-   Understand dependencies.
-   Identify consumers.
-   Detect duplicates.
-   Support multiple AI tools.
-   Survive repository restructuring without breaking references.
