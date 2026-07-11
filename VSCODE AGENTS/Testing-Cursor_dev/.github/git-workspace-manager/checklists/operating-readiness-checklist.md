# Operating Readiness Checklist

- The root `Testing` repo is identified as `factory-backup` exactly once.
- Child project repos are represented separately from the root backup repo.
- Alias and junction paths resolve to canonical repo ids.
- Folder-to-repo index entries resolve to canonical repo ids.
- The human-readable project-root map exists and reflects the same topology as the seed registry files.
- Project repos without remotes are marked as no-push until configured.
- Folder-scoped projects with non-root remotes are blocked from direct root push and have a defined subtree strategy.
- Subtree strategy includes tracked vs untracked prefix preflight and blocks push when untracked files exist.
- The policy file blocks workspace-root fallback when a child repo match exists.
- The public Github Agent wrapper reads the folder-to-repo index and the human-readable project-root map before push preparation.
- Factory backup flow and project flow are documented separately.
- Unknown or newly created repos are treated as blocked until registered.
- Observed governed roots that are not yet in the seed registry are listed explicitly as unresolved in the human-readable project-root map.
- Remaining remote or branch uncertainties are documented explicitly.
