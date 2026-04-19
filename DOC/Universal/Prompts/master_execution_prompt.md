# Master Execution Prompt (Implementation Phase)

**Purpose:**
Use this prompt to start the actual implementation/build phase for your project, after all project-specific documentation is complete. This prompt ensures the AI (or team) follows the generated documentation strictly, in sequence, and never loses context or invents requirements.

---

## Canonical Usage

Use this prompt together with the project root entrypoint:
- `DOC/PROJECT PLAN/ai-context.yaml`

The AI must read the project-specific documentation system, follow the contract and build order, and implement the site/app in strict, context-aware sequence.

---

## Canonical Prompt Body

```text
Start with DOC/PROJECT PLAN/ai-context.yaml.

Before building or implementing anything, read these files in order:
1. DOC/PROJECT PLAN/ai-context.yaml
2. DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml
3. DOC/PROJECT PLAN/Shared Contracts/README.md
4. DOC/PROJECT PLAN/README.md

Your job is to implement the project (site/app) strictly according to the project-specific documentation, following the build order and constraints defined in ai-context.yaml and all referenced docs.

Execution model:
1. Never invent features, requirements, or flows not present in the documentation.
2. Always follow the build order and read_paths defined in DOC/PROJECT PLAN/ai-context.yaml.
3. For each phase (frontend, backend, API, security, DevOps, QA), read the corresponding ai-context.yaml and README.md before starting work.
4. Never skip, reorder, or merge phases.
5. If context is lost, re-read the project root ai-context.yaml and referenced docs before continuing.
6. If a contract or requirement is unclear, pause and request clarification—do not assume.
7. All implementation must pass the QA and Security gates defined in the documentation before release.

Strict rules:
- Do not return to the universal orchestration prompt for implementation work.
- Do not overwrite or ignore any project-specific documentation unless explicitly instructed.
- Do not start a new feature or phase until the previous one is complete and validated.
- All code, configuration, and assets must match the documentation (structure, naming, stack, conventions).

Final outcome:
Produce a production-ready implementation that is fully aligned with the project-specific documentation, with no context drift, phase skipping, or undocumented features.
```

---

## Canonical Inputs

- `DOC/PROJECT PLAN/ai-context.yaml`
- `DOC/PROJECT PLAN/Shared Contracts/ai-context.yaml`
- `DOC/PROJECT PLAN/Shared Contracts/README.md`
- `DOC/PROJECT PLAN/README.md`
- All referenced role folders and docs as defined in ai-context.yaml

## Canonical Outputs

- Production-ready codebase, assets, and configuration matching the documentation
- All implementation work validated against QA and Security gates

## Important Decision

This file is the only prompt you should hand to AI for the implementation/build phase. Do not use the documentation-generation prompts for execution. All implementation must start from `DOC/PROJECT PLAN/ai-context.yaml` and follow the project-specific documentation chain.