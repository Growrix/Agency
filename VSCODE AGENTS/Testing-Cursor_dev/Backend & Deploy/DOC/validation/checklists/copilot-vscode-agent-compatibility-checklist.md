# GitHub Copilot + VS Code Agent Compatibility Checklist

- The public `.agent.md` file starts with `---` and closes frontmatter correctly before body text.
- The wrapper metadata is valid and meaningful: `description`, `name`, `tools`, and `user-invocable` when public picker visibility is intended.
- The declared tools are verified for the target GitHub Copilot + VS Code environment.
- The wrapper has one primary mission rather than an overloaded multi-role contract.
- The public wrapper does not exceed the repository warning thresholds without justification.
- The read-first list stays within the repository guidance unless there is a clear reason not to.
- Decision-heavy agents include a dedicated human-interaction section.
- The human-interaction section explicitly covers clarifying questions, approval gates, external inputs, and stop conditions.
- Handoff references use exact invocable agent filenames rather than generic titles.
- The prompt does not assume direct sub-agent delegation, background orchestration, or unsupported autonomous runtime features.
- Output expectations are chat-friendly unless a machine-readable artifact is explicitly required.
- External dependencies, credentials, provider choices, and policy decisions are reported explicitly instead of guessed.
- Public wrapper detail is lean, with exhaustive schemas and matrices moved into canonical spec/checklist files.