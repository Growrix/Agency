# Studio Agent Rules

- Treat `studio/` as an isolated application inside the repository.
- Use Node.js `20.x` unless project docs explicitly approve another version.
- Do not proxy Studio install, build, dev, or deploy from the repository root.
- Keep a dedicated `studio/package-lock.json` and do not reuse `web/` install flow.
- Do not modify `web/` build or deploy automation to fix Studio issues.
- Prefer changes that keep the public site stable even if Studio needs separate troubleshooting.
- Deploy Studio to a separate project and domain such as `cms.growrixos.com`.