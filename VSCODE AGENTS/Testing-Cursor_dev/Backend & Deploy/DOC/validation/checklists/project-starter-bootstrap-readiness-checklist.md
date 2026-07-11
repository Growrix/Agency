# Project Starter Bootstrap Readiness Checklist

- The canonical starter package exists at `.github/project-starters/hybrid-canonical-project-starter/`.
- The bootstrap script exists at `.github/project-starters/bootstrap-hybrid-canonical-project-starter.ps1`.
- The starter package includes generic project-local continuation agents.
- The starter package includes a project-local DOC skeleton under `DOC/`.
- The starter package includes a starter manifest describing required paths.
- The bootstrap script copies missing files without overwriting existing project files by default.
- The bootstrap script behaves idempotently on a second run.
- Shared phase1 and DOC-system phase2 agent docs reference the canonical starter source and bootstrap contract.
- Registry docs name the starter package as the canonical source for new website project roots.