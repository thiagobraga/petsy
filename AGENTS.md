# AGENTS.md

## Mandatory Workflow

- Read `tasks.md`, `README.md`, and `CLAUDE.md` before making changes.
- When you start a task, mark it as `[~]` in `tasks.md`.
- When the task is finished and verified, mark it as `[x]` in `tasks.md`.
- Keep task titles, IDs, dependencies, and assignees stable unless the task itself is being corrected.
- Prefer the smallest change that satisfies the task.
- Do not revert or overwrite unrelated user changes.

## Repo Rules

- `tasks.md` is the source of truth for task progress.
- Use the existing React, TypeScript, and Vite stack already present in the repo.
- Keep UI text in Portuguese when editing app screens.
- Preserve the window-export pattern for components and screens so the design canvas keeps working.
- Keep stateful design artifacts such as `.design-canvas.state.json` and `.image-slots.state.json` out of version control.

## Validation

- Run the most targeted check available first.
- Prefer `npm run lint`, `npm test`, and `npm run build` when the change touches code.
- Use `npm run format:check` or Prettier directly for doc and config changes.
- If a task requires an actual sample commit or another history-changing action, ask before doing it.
