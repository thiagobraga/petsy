# GEMINI.md

## Repo Summary

Petsy is a React app for pet care management with Vite, TypeScript, Zustand, and Wouter. The repo uses a design-canvas style surface and exports major components to `window` for reuse in the canvas.

## Working Rules

- Read `tasks.md`, `README.md`, and `CLAUDE.md` first.
- Track progress in `tasks.md` with `[~]` while working and `[x]` when complete.
- Keep edits narrow and avoid changing unrelated files.
- Preserve the existing app structure and the window-export convention.
- Keep UI copy in Portuguese when touching screens or user-facing text.

## Useful Commands

- `npm install` - install dependencies.
- `npm run dev` - start the Vite dev server.
- `npm run build` - build the production bundle.
- `npm run preview` - preview the production build.
- `npm run lint` - run ESLint.
- `npm run lint:fix` - fix ESLint issues.
- `npm test` - run Vitest in watch mode.
- `npm run test:coverage` - generate coverage output.
- `npm run format` - format source files.
- `npm run format:check` - check formatting without writing files.

## Commit Hygiene

- Use Conventional Commits for new commits when possible.
- Keep commit messages short and specific.
- Mention the area changed, for example `feat: add pet filter to dashboard`.
