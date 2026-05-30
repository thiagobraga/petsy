# Contributing

## Setup

1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Open the app in the browser and keep an eye on the console for warnings.

## Development Workflow

1. Read `tasks.md` before starting work.
2. Mark the task as `[~]` while it is in progress.
3. Make the smallest change that satisfies the task.
4. Run the most relevant checks for the change.
5. Mark the task as `[x]` once it is done and verified.

## Validation

- Run `npm run lint` for code changes.
- Run `npm test` when behavior changes.
- Run `npm run build` when the change could affect production output.
- Run `npm run format:check` or Prettier when editing docs and config files.

## Commit Message Conventions

Use Conventional Commits:

- `feat:` for a new feature
- `fix:` for a bug fix
- `docs:` for documentation-only changes
- `refactor:` for code movement or cleanup without behavior change
- `test:` for test-only work
- `chore:` for tooling, repo maintenance, and dependency updates
- `ci:` for CI pipeline changes
- `build:` for build system or bundling changes

Examples:

- `feat: add pre-commit hooks`
- `docs: add contributing guide`
- `fix: ignore local design state files`

## Pull Requests

- Keep PRs focused on one task or a small set of related tasks.
- Include a short summary of what changed and what was verified.
- Call out any follow-up work or known limitations.
