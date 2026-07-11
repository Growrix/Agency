# Repo Registry Contract Spec

## Purpose
Define the minimum contract for repo tracking files behind the root Github Agent.

## Required Registry Files
- `.github/git-workspace-manager/registry/repo-registry.seed.json`
- `.github/git-workspace-manager/registry/repo-aliases.seed.json`
- `.github/git-workspace-manager/registry/repo-policies.seed.json`
- `.github/git-workspace-manager/registry/folder-repo-index.seed.json`
- `.github/git-workspace-manager/registry/project-root-repo-map.md`

## Repo Registry Fields
Each repo entry must include:
- `id`
- `name`
- `path`
- `role`
- `operational_source_of_truth`
- `remote`
- `current_branch`
- `push_policy`

## Alias Registry Fields
Each alias entry must include:
- `alias_path`
- `canonical_repo_id`
- `canonical_path`
- `reason`

## Policy Registry Fields
The policy file must include:
- `global_rules`
- `role_policies`
- `blocking_conditions`

## Folder Repo Index Fields
Each folder mapping entry must include:
- `project_id`
- `folder_path`
- `canonical_repo_id`
- `remote`
- `push_strategy`
- `subtree_prefix` when `push_strategy` is `subtree`

## Human-Readable Project Root Map Contract
The companion file `.github/git-workspace-manager/registry/project-root-repo-map.md` must include:
- a factory-backup section
- mapped project roots with remote and push strategy
- local-only roots with explicit no-push status when no remote is configured
- unresolved observed roots that are blocked until registered

Each listed root must show at minimum:
- root path
- repo id or unresolved status
- remote or explicit `none`
- push strategy or blocked state
- short notes when special handling applies

## Update Triggers
Refresh the registry when:
- a repo is created or cloned
- a repo path changes
- a remote is added or removed
- a branch policy changes
- an alias or junction is introduced or removed
- a folder-level project is added or re-mapped to a different remote
- a governed project root is observed in the workspace but is not yet represented in the seed registry files

## Validation Expectations
- every canonical repo path exists
- every alias resolves to an existing canonical repo id
- root backup repo is present exactly once
- no two repo entries share the same canonical path
- push-disabled repos are not marked as pushable
- each folder mapping resolves to an existing canonical repo id
- the human-readable project-root map exists and is updated in the same change set as seed-registry topology updates
- every governed project root appears either in the seed registry or in the unresolved section of the human-readable project-root map
