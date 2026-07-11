# Repo Registry Contract Spec

## Purpose
Define the minimum contract for repo tracking files in the Git Workspace Manager.

## Required Registry Files
- `registry/repo-registry.seed.json`
- `registry/repo-aliases.seed.json`
- `registry/repo-policies.seed.json`

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

## Update Triggers
Refresh the registry when:
- a repo is created or cloned
- a repo path changes
- a remote is added or removed
- a branch policy changes
- an alias or junction is introduced or removed

## Validation Expectations
- every canonical repo path exists
- every alias resolves to an existing canonical repo id
- root backup repo is present exactly once
- no two repo entries share the same canonical path
- push-disabled repos are not marked as pushable
