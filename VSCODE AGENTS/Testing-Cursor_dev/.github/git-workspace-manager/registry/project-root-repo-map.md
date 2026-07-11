# Project Root Repo Map

This file is the human-readable companion to the seed registry files under `.github/git-workspace-manager/registry/`.

Update this file in the same change set whenever repo topology changes, a new governed project root appears, a remote is added or removed, or a folder-scoped project is re-mapped.

The Github Agent must read this file together with:
- `.github/git-workspace-manager/registry/repo-registry.seed.json`
- `.github/git-workspace-manager/registry/folder-repo-index.seed.json`
- `.github/git-workspace-manager/registry/repo-aliases.seed.json`
- `.github/git-workspace-manager/registry/repo-policies.seed.json`

If a governed root exists in the workspace but is missing from both the seed registry and this file, push preparation is blocked until the registry is refreshed.

## Factory Backup Root

| Root | Repo ID | Remote | Push Strategy | Status | Notes |
|---|---|---|---|---|---|
| `F:/PROJECTS/testing` | `testing-factory-backup` | `https://github.com/Growrix/Testing.git` | `direct` | `mapped-remote` | Factory backup repo only. Never default here for project work. |

## Direct Project Roots

| Root | Repo ID | Remote | Push Strategy | Status | Notes |
|---|---|---|---|---|---|
| `F:/PROJECTS/testing/Backend & Deploy/Foundation-Core` | `foundation-core` | `https://github.com/Growrix/Foundation_core.git` | `direct` | `mapped-remote` | Operational source of truth for Foundation Core. |
| `F:/PROJECTS/testing/Backend & Deploy/Templates/local-business/nexform-consulting` | `nexform-consulting-template` | `none` | `direct` | `local-only` | Template root with no remote configured yet. |
| `F:/PROJECTS/testing/BLOG-AUTOMATION` | `blog-automation` | `https://github.com/Growrix/Blog_Automation.git` | `direct` | `mapped-remote` | Top-level operational project repo. |
| `F:/PROJECTS/testing/HTML-PROFILE-BUILDER` | `html-profile-builder` | `none` | `direct` | `local-only` | Top-level local project root. Register a remote before any push. |

## Frontend Project Roots

| Root | Repo ID | Remote | Push Strategy | Status | Notes |
|---|---|---|---|---|---|
| `F:/PROJECTS/testing/FRONTEND DEV/aircon-installer` | `aircon-installer` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/car` | `car` | `https://github.com/Growrix/Car.git` | `subtree` | `mapped-remote` | Use subtree or full mirror rules from the folder index. |
| `F:/PROJECTS/testing/FRONTEND DEV/Car-subdomain-nextjs-verified-native-frontend` | `car-subdomain-nextjs-verified-native-frontend` | `https://github.com/Growrix/Car.git` | `subtree` | `mapped-remote` | Use subtree or full mirror rules from the folder index. |
| `F:/PROJECTS/testing/FRONTEND DEV/GrowrixAuto` | `growrix-auto` | `https://github.com/Growrix/Growrix_Auto.git` | `direct` | `mapped-remote` | Operational source of truth for GrowrixAuto. |
| `F:/PROJECTS/testing/FRONTEND DEV/Lumoria` | `lumoria` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/nexform-website` | `nexform-website` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/optilux` | `optilux` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/plumbing-pro` | `plumbing-pro` | `none` | `direct` | `local-only` | Nested local git repo without an origin remote. Register remote before push. |
| `F:/PROJECTS/testing/FRONTEND DEV/rayiss` | `rayiss` | `https://github.com/Growrix/Rayiss.git` | `direct` | `mapped-remote` | Operational source of truth for Rayiss. |
| `F:/PROJECTS/testing/FRONTEND DEV/reference-style-4` | `reference-style-4` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/reference-style-5` | `reference-style-5` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |
| `F:/PROJECTS/testing/FRONTEND DEV/wostin-waste` | `wostin-waste` | `none` | `direct` | `local-only` | Local frontend root. Push blocked until a remote is configured. |

## On Going DOCS Project Roots

| Root | Repo ID | Remote | Push Strategy | Status | Notes |
|---|---|---|---|---|---|
| `F:/PROJECTS/testing/On Going DOCS/Growrixos` | `agency-growrixos` | `https://github.com/Growrix/Agency.git` | `subtree` | `mapped-remote` | Folder-scoped project. Use subtree or full mirror rules from the folder index. |

## Observed Unresolved Roots

| Root | Status | Why Blocked | Required Next Step |
|---|---|---|---|
| `F:/PROJECTS/testing/FRONTEND DEV/lumoria-temp` | `unresolved-blocked` | Observed under `FRONTEND DEV`, but not registered as a governed project root and no remote/source-of-truth is declared. | Either register it in the seed registry files with the correct remote policy, or explicitly confirm it is a disposable temp root and keep it blocked from push preparation. |
