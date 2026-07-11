# Registry Files

This folder holds the planning baseline for the workspace repo registry.

## Files
- `repo-registry.seed.json`: canonical repo inventory
- `repo-aliases.seed.json`: alias and junction normalization map
- `repo-policies.seed.json`: global and per-role safety rules

## Usage
- Treat these files as the source of truth for the current approved plan.
- Update them whenever a repo is added, removed, renamed, or its remote policy changes.
- Future Phase 3 commands may materialize live generated registry files under `registry/generated/`.

## Rule
No Git action should rely on guesswork when a registry entry can resolve the target deterministically.
