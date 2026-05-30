# tasks.md

- [Tasks](#tasks)
- [Details](#details)
- [Plan](#plan)
- [Assignees](#assignees)
- [Settings](#settings)

## Tasks

### Phase 1: Foundation (T1-T15) — @claude ✅ COMPLETE

- [x] [#1. Initialize git repository](#1-initialize-git-repository) @2026-05-29 assignee:@claude
- [x] [#2. Create initial commit with current structure](#2-create-initial-commit-with-current-structure) @2026-05-29 deps:1 assignee:@claude
- [x] [#3. Set git user configuration for team consistency](#3-set-git-user-configuration-for-team-consistency) @2026-05-29 deps:1 assignee:@claude
- [x] [#4. Create package.json with project metadata](#4-create-packagejson-with-project-metadata) @2026-05-29 deps:1 assignee:@claude
- [x] [#5. Add React and core dependencies](#5-add-react-and-core-dependencies) @2026-05-29 deps:4 assignee:@claude
- [x] [#6. Add dev dependencies (Vite, Vitest, ESLint, Prettier)](#6-add-dev-dependencies-vite-vitest-eslint-prettier) @2026-05-29 deps:4 assignee:@claude
- [x] [#7. Create npm scripts (dev, build, preview, test, lint, format)](#7-create-npm-scripts-dev-build-preview-test-lint-format) @2026-05-29 deps:6 assignee:@claude
- [x] [#8. Update CLAUDE.md with npm script documentation](#8-update-claudemd-with-npm-script-documentation) @2026-05-30 deps:7 assignee:@claude
- [x] [#9. Create .eslintrc.json with React/JSX rules](#9-create-eslintrcjson-with-reactjsx-rules) @2026-05-30 deps:6 assignee:@claude
- [x] [#10. Create .prettierrc with formatting rules](#10-create-prettierrc-with-formatting-rules) @2026-05-30 deps:6 assignee:@claude
- [x] [#11. Configure ESLint to ignore build and test directories](#11-configure-eslint-to-ignore-build-and-test-directories) @2026-05-30 deps:9 assignee:@claude
- [x] [#12. Install and configure Vitest](#12-install-and-configure-vitest) @2026-05-30 deps:6 assignee:@claude
- [x] [#13. Install testing library (@testing-library/react)](#13-install-testing-library-testinglibrary-react) @2026-05-30 deps:12 assignee:@claude
- [x] [#14. Create vitest.config.ts with React preset](#14-create-vitestconfigts-with-react-preset) @2026-05-30 deps:12 assignee:@claude
- [x] [#15. Create example test file for component testing](#15-create-example-test-file-for-component-testing) @2026-05-30 deps:14 assignee:@claude

### Phase 2: Git & Linting (T16-T25) — @codex

- [x] [#16. Review and enhance .gitignore](#16-review-and-enhance-gitignore) @2026-05-30 deps:1 assignee:@codex
- [x] [#17. Add Node-specific ignores (node_modules, dist, build)](#17-add-node-specific-ignores-node_modules-dist-build) @2026-05-30 deps:16 assignee:@codex
- [x] [#18. Add environment file ignores (.env, .env.local)](#18-add-environment-file-ignores-env-envlocal) @2026-05-30 deps:16 assignee:@codex
- [x] [#19. Add IDE ignores (.vscode, .idea)](#19-add-ide-ignores-vscode-idea) @2026-05-30 deps:16 assignee:@codex
- [x] [#20. Add design tool state file ignores](#20-add-design-tool-state-file-ignores) @2026-05-30 deps:16 assignee:@codex
- [x] [#21. Install husky and lint-staged](#21-install-husky-and-lint-staged) @2026-05-31 deps:6 assignee:@codex
- [x] [#22. Create .husky/pre-commit hook](#22-create-husky-pre-commit-hook) @2026-05-31 deps:21 assignee:@codex
- [x] [#23. Configure lint-staged to run ESLint on staged files](#23-configure-lint-staged-to-run-eslint-on-staged-files) @2026-05-31 deps:22,11 assignee:@codex
- [x] [#24. Configure lint-staged to run Prettier on staged files](#24-configure-lint-staged-to-run-prettier-on-staged-files) @2026-05-31 deps:22,10 assignee:@codex
- [x] [#25. Test pre-commit hooks with a sample commit](#25-test-pre-commit-hooks-with-a-sample-commit) @2026-05-31 deps:24 assignee:@codex

### Phase 3: Documentation (T26-T30) — @codex

- [x] [#26. Create AGENTS.md with mandatory task workflow](#26-create-agentsmd-with-mandatory-task-workflow) @2026-05-31 deps:2 assignee:@codex
- [x] [#27. Create GEMINI.md with agent guidance](#27-create-geminmd-with-agent-guidance) @2026-05-31 deps:2 assignee:@codex
- [x] [#28. Document commit message conventions](#28-document-commit-message-conventions) @2026-05-31 deps:26 assignee:@codex
- [x] [#29. Add test coverage reporting to Vitest config](#29-add-test-coverage-reporting-to-vitest-config) @2026-05-31 deps:14 assignee:@codex
- [x] [#30. Create CONTRIBUTING.md with development workflow](#30-create-contributingmd-with-development-workflow) @2026-06-01 deps:25,28 assignee:@codex

### Phase 4: Vite Setup (T31-T40) — @codex

- [x] [#31. Create vite.config.ts with React plugin](#31-create-viteconfigts-with-react-plugin) @2026-06-01 deps:6 assignee:@codex
- [x] [#32. Set up entry point (src/index.tsx)](#32-set-up-entry-point-srcindextsx) @2026-06-01 deps:31 assignee:@codex
- [x] [#33. Configure public assets directory](#33-configure-public-assets-directory) @2026-06-01 deps:31 assignee:@codex
- [x] [#34. Create index.html with root div and Vite script](#34-create-indexhtml-with-root-div-and-vite-script) @2026-06-01 deps:32 assignee:@codex
- [x] [#35. Move tokens.jsx to src/tokens.ts](#35-move-tokensjs-to-srctokensts) @2026-06-01 deps:31 assignee:@codex
- [x] [#36. Move icons.jsx to src/icons.ts](#36-move-iconsjsx-to-srciconsjs) @2026-06-01 deps:31 assignee:@codex
- [x] [#37. Move data.jsx to src/data.ts](#37-move-datajsx-to-srcdatats) @2026-06-01 deps:31 assignee:@codex
- [x] [#38. Move components.jsx to src/components.tsx](#38-move-componentsjsx-to-srccomponentstsx) @2026-06-01 deps:31 assignee:@codex
- [x] [#39. Move screens to src/screens/\*.tsx](#39-move-screens-to-srcscreentstsx) @2026-06-01 deps:31 assignee:@codex
- [x] [#40. Create src/App.tsx (root component with routing)](#40-create-srcapptsx-root-component-with-routing) @2026-06-02 deps:39 assignee:@codex

### Phase 5: Router Setup (T41-T45) — @codex

- [x] [#41. Install react-router-dom or wouter](#41-install-react-router-dom-or-wouter) @2026-06-02 deps:6 assignee:@codex
- [x] [#42. Create router configuration with all routes](#42-create-router-configuration-with-all-routes) @2026-06-02 deps:41,40 assignee:@codex
- [x] [#43. Implement LoginScreen route (/login)](#43-implement-loginscreen-route-login) @2026-06-02 deps:42 assignee:@codex
- [x] [#44. Implement DashboardScreen route (/dashboard)](#44-implement-dashboardscreen-route-dashboard) @2026-06-02 deps:42 assignee:@codex
- [x] [#45. Implement remaining screen routes](#45-implement-remaining-screen-routes) @2026-06-02 deps:42 assignee:@codex

### Phase 6: State Management (T46-T50) — @claude ✅ COMPLETE

- [x] [#46. Install Zustand state management library](#46-install-zustand-state-management-library) @2026-06-03 deps:6 assignee:@claude
- [x] [#47. Create auth store (currentUser, isLoggedIn)](#47-create-auth-store-currentuser-isloggedin) @2026-06-03 deps:46 assignee:@claude
- [x] [#48. Create pet store (selectedPetId)](#48-create-pet-store-selectedpetid) @2026-06-03 deps:46 assignee:@claude
- [x] [#49. Create preferences store (hideCompleted, groupByStatus)](#49-create-preferences-store-hidecompleted-groupbystatus) @2026-06-03 deps:46 assignee:@claude
- [x] [#50. Create custom hooks for consuming stores](#50-create-custom-hooks-for-consuming-stores) @2026-06-03 deps:47,48,49 assignee:@claude

### Phase 7: Docker (T51-T52) — @claude

- [x] [#51. Update .docker/app.Dockerfile for Vite build](#51-update-dockerapp-dockerfile-for-vite-build) @2026-06-03 deps:40 assignee:@claude
- [x] [#52. Update compose.yml for production build output](#52-update-composeyml-for-production-build-output) @2026-06-03 deps:51 assignee:@claude

### Phase 8: Screen Implementation (T53-T72) — @codex

- [x] [#53. Implement LoginScreen form validation](#53-implement-loginscreen-form-validation) @2026-06-04 deps:50 assignee:@codex
- [x] [#54. Implement LoginScreen mock authentication](#54-implement-loginscreen-mock-authentication) @2026-06-04 deps:47,53 assignee:@codex
- [x] [#55. Implement LoginScreen error messages](#55-implement-loginscreen-error-messages) @2026-06-04 deps:53 assignee:@codex
- [x] [#56. Implement DashboardScreen pet selection](#56-implement-dashboardscreen-pet-selection) @2026-06-04 deps:48,50 assignee:@codex
- [x] [#57. Bind DashboardScreen to PETS and MEDS data](#57-bind-dashboardscreen-to-pets-and-meds-data) @2026-06-04 deps:56 assignee:@codex
- [x] [#58. Bind DashboardScreen greeting card to user/pet](#58-bind-dashboardscreen-greeting-card-to-userpet) @2026-06-04 deps:57 assignee:@codex
- [x] [#59. Implement PetDetailScreen dynamic pet data loading](#59-implement-petdetailscreen-dynamic-pet-data-loading) @2026-06-05 deps:50 assignee:@codex
- [x] [#60. Implement PetDetailScreen tab switching (About/Health/Notes)](#60-implement-petdetailscreen-tab-switching-abouthealthnotes) @2026-06-05 deps:59 assignee:@codex
- [x] [#61. Implement editable notes in PetDetailScreen](#61-implement-editable-notes-in-petdetailscreen) @2026-06-05 deps:60 assignee:@codex
- [x] [#62. Implement MedicinesScreen pet filter](#62-implement-medicinesscreen-pet-filter) @2026-06-05 deps:48 assignee:@codex
- [x] [#63. Bind MedicinesScreen to MEDS data](#63-bind-medicinesscreen-to-meds-data) @2026-06-05 deps:62 assignee:@codex
- [x] [#64. Implement medicine status toggle (Aplicada)](#64-implement-medicine-status-toggle-aplicada) @2026-06-05 deps:63 assignee:@codex
- [x] [#65. Implement AppointmentsScreen calendar date marking](#65-implement-appointmentsscreen-calendar-date-marking) @2026-06-06 deps:50 assignee:@codex
- [x] [#66. Implement AppointmentsScreen appointment filtering by date](#66-implement-appointmentsscreen-appointment-filtering-by-date) @2026-06-06 deps:65 assignee:@codex
- [x] [#67. Implement DiaryScreen timeline rendering](#67-implement-diaryscreen-timeline-rendering) @2026-06-06 deps:50 assignee:@codex
- [x] [#68. Bind DiaryScreen mood indicators to data](#68-bind-diaryscreen-mood-indicators-to-data) @2026-06-06 deps:67 assignee:@codex
- [x] [#69. Implement editable diary entry text](#69-implement-editable-diary-entry-text) @2026-06-06 deps:68 assignee:@codex
- [x] [#70. Implement MediaScreen photo grid layout](#70-implement-mediascreen-photo-grid-layout) @2026-06-07 deps:50 assignee:@codex
- [x] [#71. Implement MediaScreen album view toggle](#71-implement-mediascreen-album-view-toggle) @2026-06-07 deps:70 assignee:@codex
- [x] [#72. Implement MediaScreen pet filter](#72-implement-mediascreen-pet-filter) @2026-06-07 deps:70 assignee:@codex

### Phase 9: Persistence (T73-T76) — @claude ✅ COMPLETE

- [x] [#73. Create localStorage utility (save/load functions)](#73-create-localstorage-utility-saveload-functions) @2026-06-08 deps:50 assignee:@claude
- [x] [#74. Implement app state persistence to localStorage](#74-implement-app-state-persistence-to-localstorage) @2026-06-08 deps:73 assignee:@claude
- [x] [#75. Implement localStorage-based image persistence](#75-implement-localstorage-based-image-persistence) @2026-06-08 deps:73 assignee:@claude
- [x] [#76. Load persisted state on app startup](#76-load-persisted-state-on-app-startup) @2026-06-08 deps:74 assignee:@claude

### Phase 10: Testing (T77-T82) — @claude

- [x] [#77. Write unit tests for Button component](#77-write-unit-tests-for-button-component) @2026-06-10 deps:13 assignee:@claude
- [x] [#78. Write unit tests for Input component](#78-write-unit-tests-for-input-component) @2026-06-10 deps:13 assignee:@claude
- [x] [#79. Write unit tests for PetAvatar component](#79-write-unit-tests-for-petavatar-component) @2026-06-10 deps:13 assignee:@claude
- [~] [#80. Write integration tests for LoginScreen](#80-write-integration-tests-for-loginscreen) @2026-06-11 deps:13,54 assignee:@claude
- [~] [#81. Write integration tests for DashboardScreen](#81-write-integration-tests-for-dashboardscreen) @2026-06-11 deps:13,57 assignee:@claude
- [x] [#82. Test Docker build produces working container](#82-test-docker-build-produces-working-container) @2026-06-12 deps:51 assignee:@claude

### Phase 11: API Layer (T83-T88) — @claude ✅ COMPLETE

- [x] [#83. Create src/api/client.ts HTTP client setup](#83-create-srcapiclientts-http-client-setup) @2026-06-13 deps:50 assignee:@claude
- [x] [#84. Create src/api/pets.ts pet endpoints](#84-create-srcapipetsjs-pet-endpoints) @2026-06-13 deps:83 assignee:@claude
- [x] [#85. Create src/api/medicines.ts medicine endpoints](#85-create-srcapimedicinesjs-medicine-endpoints) @2026-06-13 deps:83 assignee:@claude
- [x] [#86. Create src/api/appointments.ts appointment endpoints](#86-create-srcapiappointmentsjs-appointment-endpoints) @2026-06-13 deps:83 assignee:@claude
- [x] [#87. Create src/api/diary.ts diary endpoints](#87-create-srcapidia.ts-diary-endpoints) @2026-06-13 deps:83 assignee:@claude
- [x] [#88. Create src/api/media.ts media endpoints](#88-create-srcapimediajs-media-endpoints) @2026-06-13 deps:83 assignee:@claude

### Phase 12: API Documentation (T89-T91) — @claude

- [~] [#89. Document API endpoints and schemas](#89-document-api-endpoints-and-schemas) @2026-06-14 deps:88 assignee:@claude
- [~] [#90. Document authentication method in API](#90-document-authentication-method-in-api) @2026-06-14 deps:89 assignee:@claude
- [~] [#91. Create OpenAPI/Swagger spec](#91-create-openapiswagger-spec) @2026-06-14 deps:89 assignee:@claude

### Phase 13: CI/CD (T92-T95) — @claude

- [x] [#92. Create .github/workflows/ci.yml](#92-create-githubworkflowsciyml) @2026-06-15 deps:25,30 assignee:@claude
- [x] [#93. Add test running to CI pipeline](#93-add-test-running-to-ci-pipeline) @2026-06-15 deps:92,82 assignee:@claude
- [x] [#94. Add linting to CI pipeline](#94-add-linting-to-ci-pipeline) @2026-06-15 deps:92,11 assignee:@claude
- [x] [#95. Add Docker build to CI pipeline](#95-add-docker-build-to-ci-pipeline) @2026-06-15 deps:92,82 assignee:@claude

### Phase 14: Deployment (T96-T98) — @claude

- [x] [#96. Create Vercel/Railway deployment configuration](#96-create-vercelrailway-deployment-configuration) @2026-06-16 deps:95 assignee:@claude
- [x] [#97. Create DEPLOYMENT.md with deployment instructions](#97-create-deploymentmd-with-deployment-instructions) @2026-06-16 deps:96 assignee:@claude
- [x] [#98. Update README with deployment and status badges](#98-update-readme-with-deployment-and-status-badges) @2026-06-16 deps:97 assignee:@claude

## Details

### 1. Initialize git repository

**Plan**: [P1. Foundation](#p1-foundation)

Initialize git repository for version control.

### 2. Create initial commit with current structure

**Plan**: [P1. Foundation](#p1-foundation)

Commit current project files as initial state.

### 3. Set git user configuration for team consistency

**Plan**: [P1. Foundation](#p1-foundation)

Configure user.name and user.email for commits.

### 4. Create package.json with project metadata

**Plan**: [P1. Foundation](#p1-foundation)

Set up package.json with name, version, description, author, license.

### 5. Add React and core dependencies

**Plan**: [P1. Foundation](#p1-foundation)

Install: react, react-dom, zustand (state management), react-router-dom (or wouter).

### 6. Add dev dependencies (Vite, Vitest, ESLint, Prettier)

**Plan**: [P1. Foundation](#p1-foundation)

Install: vite, vitest, @testing-library/react, eslint, prettier, husky, lint-staged.

### 7. Create npm scripts (dev, build, preview, test, lint, format)

**Plan**: [P1. Foundation](#p1-foundation)

Create npm scripts in package.json for all development workflows.

### 8. Update CLAUDE.md with npm script documentation

**Plan**: [P1. Foundation](#p1-foundation)

Document each npm script in CLAUDE.md Development Commands section.

### 9. Create .eslintrc.json with React/JSX rules

**Plan**: [P2. Git & Linting](#p2-git--linting)

Configure ESLint for React/JSX with recommended presets.

### 10. Create .prettierrc with formatting rules

**Plan**: [P2. Git & Linting](#p2-git--linting)

Configure Prettier: 2-space indent, single quotes, trailing commas.

### 11. Configure ESLint to ignore build and test directories

**Plan**: [P2. Git & Linting](#p2-git--linting)

Add eslintIgnore to exclude dist, build, coverage directories.

### 12. Install and configure Vitest

**Plan**: [P1. Foundation](#p1-foundation)

Install and configure Vitest as test runner.

### 13. Install testing library (@testing-library/react)

**Plan**: [P1. Foundation](#p1-foundation)

Install @testing-library/react for component testing.

### 14. Create vitest.config.ts with React preset

**Plan**: [P1. Foundation](#p1-foundation)

Configure Vitest with React environment and jsdom.

### 15. Create example test file for component testing

**Plan**: [P1. Foundation](#p1-foundation)

Create example: tests/Button.test.tsx demonstrating testing patterns.

### 16. Review and enhance .gitignore

**Plan**: [P2. Git & Linting](#p2-git--linting)

Review existing .gitignore and add missing entries.

### 17. Add Node-specific ignores (node_modules, dist, build)

**Plan**: [P2. Git & Linting](#p2-git--linting)

Ensure Node standard directories are ignored.

### 18. Add environment file ignores (.env, .env.local)

**Plan**: [P2. Git & Linting](#p2-git--linting)

Prevent committing environment files with secrets.

### 19. Add IDE ignores (.vscode, .idea)

**Plan**: [P2. Git & Linting](#p2-git--linting)

Ignore IDE configuration directories.

### 20. Add design tool state file ignores

**Plan**: [P2. Git & Linting](#p2-git--linting)

Ignore .design-canvas.state.json, .image-slots.state.json.

### 21. Install husky and lint-staged

**Plan**: [P2. Git & Linting](#p2-git--linting)

Install husky for git hooks and lint-staged for pre-commit checks.

### 22. Create .husky/pre-commit hook

**Plan**: [P2. Git & Linting](#p2-git--linting)

Create pre-commit hook file that runs lint-staged.

### 23. Configure lint-staged to run ESLint on staged files

**Plan**: [P2. Git & Linting](#p2-git--linting)

Add .lintstagedrc.json with ESLint on _.ts,_.tsx files.

### 24. Configure lint-staged to run Prettier on staged files

**Plan**: [P2. Git & Linting](#p2-git--linting)

Add Prettier formatting check to lint-staged.

### 25. Test pre-commit hooks with a sample commit

**Plan**: [P2. Git & Linting](#p2-git--linting)

Make a test commit to verify hooks work correctly.

### 26. Create AGENTS.md with mandatory task workflow

**Plan**: [P3. Documentation](#p3-documentation)

Document task workflow: mark [~] before work, [x] after completion.

### 27. Create GEMINI.md with agent guidance

**Plan**: [P3. Documentation](#p3-documentation)

Create Gemini-specific agent instructions.

### 28. Document commit message conventions

**Plan**: [P3. Documentation](#p3-documentation)

Document Conventional Commits format (feat:, fix:, docs:, etc.).

### 29. Add test coverage reporting to Vitest config

**Plan**: [P3. Documentation](#p3-documentation)

Configure Vitest to generate coverage reports (HTML, lcov).

### 30. Create CONTRIBUTING.md with development workflow

**Plan**: [P3. Documentation](#p3-documentation)

Document how to set up dev environment, run tests, submit PRs.

### 31. Create vite.config.ts with React plugin

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Configure Vite with @vitejs/plugin-react for JSX/TS support.

### 32. Set up entry point (src/index.tsx)

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Create src/index.tsx that mounts React App to DOM.

### 33. Configure public assets directory

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Configure Vite to serve static assets from public/ directory.

### 34. Create index.html with root div and Vite script

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Create root index.html with `<div id="root">` and Vite script tag.

### 35. Move tokens.jsx to src/tokens.ts

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Move and refactor tokens.jsx as TypeScript module.

### 36. Move icons.jsx to src/icons.ts

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Move and refactor icons.jsx as TypeScript module.

### 37. Move data.jsx to src/data.ts

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Move and refactor data.jsx as TypeScript module (export PETS, MEDS, etc.).

### 38. Move components.jsx to src/components.tsx

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Move components.jsx and refactor as TypeScript React components.

### 39. Move screens to src/screens/\*.tsx

**Plan**: [P4. Vite Setup](#p4-vite-setup)

Move all screen files (Login, Dashboard, PetDetail, etc.) to src/screens/.

### 40. Create src/App.tsx (root component with routing)

**Plan**: [P5. Router Setup](#p5-router-setup)

Create root App component that wraps router and layout.

### 41. Install react-router-dom or wouter

**Plan**: [P5. Router Setup](#p5-router-setup)

Install routing library (recommend wouter for lightweight alternative).

### 42. Create router configuration with all routes

**Plan**: [P5. Router Setup](#p5-router-setup)

Define routes: /login, /dashboard, /pet/:id, /medicines, /appointments, /diary, /media, /uikit.

### 43. Implement LoginScreen route (/login)

**Plan**: [P5. Router Setup](#p5-router-setup)

Wire LoginScreen to /login route.

### 44. Implement DashboardScreen route (/dashboard)

**Plan**: [P5. Router Setup](#p5-router-setup)

Wire DashboardScreen to /dashboard route.

### 45. Implement remaining screen routes

**Plan**: [P5. Router Setup](#p5-router-setup)

Wire PetDetail, Medicines, Appointments, Diary, Media screens to routes.

### 46. Install Zustand state management library

**Plan**: [P6. State Management](#p6-state-management)

Install zustand for simple, scalable state management.

### 47. Create auth store (currentUser, isLoggedIn)

**Plan**: [P6. State Management](#p6-state-management)

Create Zustand store for user authentication state.

### 48. Create pet store (selectedPetId)

**Plan**: [P6. State Management](#p6-state-management)

Create Zustand store for selected pet context across app.

### 49. Create preferences store (hideCompleted, groupByStatus)

**Plan**: [P6. State Management](#p6-state-management)

Create Zustand store for user preferences.

### 50. Create custom hooks for consuming stores

**Plan**: [P6. State Management](#p6-state-management)

Create useAuth, usePetStore, usePreferences hooks.

### 51. Update .docker/app.Dockerfile for Vite build

**Plan**: [P7. Docker](#p7-docker)

Update Dockerfile to: `npm install && npm run build`, serve `dist/`.

### 52. Update compose.yml for production build output

**Plan**: [P7. Docker](#p7-docker)

Ensure compose.yml mounts/builds Vite dist output.

### 53. Implement LoginScreen form validation

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Add email format and password length validation.

### 54. Implement LoginScreen mock authentication

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Implement mock auth (accept any email/password, set auth state).

### 55. Implement LoginScreen error messages

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Show validation errors and auth failures to user.

### 56. Implement DashboardScreen pet selection

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Make pet carousel clickable to set selectedPetId in store.

### 57. Bind DashboardScreen to PETS and MEDS data

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Wire components to real data arrays.

### 58. Bind DashboardScreen greeting card to user/pet

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Show current user name and selected pet info in greeting.

### 59. Implement PetDetailScreen dynamic pet data loading

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Load pet by ID from route params or global store.

### 60. Implement PetDetailScreen tab switching (About/Health/Notes)

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Wire tabs to state, show/hide content based on active tab.

### 61. Implement editable notes in PetDetailScreen

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Add contentEditable for notes, save on blur.

### 62. Implement MedicinesScreen pet filter

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Make pet pills clickable to filter medicines.

### 63. Bind MedicinesScreen to MEDS data

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Wire medicine rows, summaries, active treatments to real data.

### 64. Implement medicine status toggle (Aplicada)

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Make status buttons toggle checked state and save to state.

### 65. Implement AppointmentsScreen calendar date marking

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Mark calendar dates that have appointments.

### 66. Implement AppointmentsScreen appointment filtering by date

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Filter appointment lists by selected calendar date.

### 67. Implement DiaryScreen timeline rendering

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Render DIARY entries as timeline with vertical line.

### 68. Bind DiaryScreen mood indicators to data

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Show mood chips with correct colors from data.

### 69. Implement editable diary entry text

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Add contentEditable for entry body, save on blur.

### 70. Implement MediaScreen photo grid layout

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Create masonry grid with first item 2x2.

### 71. Implement MediaScreen album view toggle

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Wire view toggle between grid and album layouts.

### 72. Implement MediaScreen pet filter

**Plan**: [P8. Screen Implementation](#p8-screen-implementation)

Filter photos by selected pet.

### 73. Create localStorage utility (save/load functions)

**Plan**: [P9. Persistence](#p9-persistence)

Create utils/storage.ts with serialization helpers.

### 74. Implement app state persistence to localStorage

**Plan**: [P9. Persistence](#p9-persistence)

Persist auth, pet, preferences state on mutation and load on startup.

### 75. Implement localStorage-based image persistence

**Plan**: [P9. Persistence](#p9-persistence)

Store base64 images in localStorage with cleanup.

### 76. Load persisted state on app startup

**Plan**: [P9. Persistence](#p9-persistence)

Hydrate stores from localStorage on App mount.

### 77. Write unit tests for Button component

**Plan**: [P10. Testing](#p10-testing)

Test Button variants, sizes, click handlers, icons.

### 78. Write unit tests for Input component

**Plan**: [P10. Testing](#p10-testing)

Test Input value, onChange, focus states, placeholder.

### 79. Write unit tests for PetAvatar component

**Plan**: [P10. Testing](#p10-testing)

Test PetAvatar name, tone, size, image rendering.

### 80. Write integration tests for LoginScreen

**Plan**: [P10. Testing](#p10-testing)

Test form submission, validation, error display, navigation.

### 81. Write integration tests for DashboardScreen

**Plan**: [P10. Testing](#p10-testing)

Test pet selection, data binding, quick actions.

### 82. Test Docker build produces working container

**Plan**: [P10. Testing](#p10-testing)

Run Docker build and verify app accessible at localhost:8080.

### 83. Create src/api/client.ts HTTP client setup

**Plan**: [P11. API Layer](#p11-api-layer)

Set up axios or fetch wrapper with auth headers.

### 84. Create src/api/pets.ts pet endpoints

**Plan**: [P11. API Layer](#p11-api-layer)

Create GET /pets, POST /pets, PUT /pets/:id, DELETE /pets/:id.

### 85. Create src/api/medicines.ts medicine endpoints

**Plan**: [P11. API Layer](#p11-api-layer)

Create medicine CRUD endpoints.

### 86. Create src/api/appointments.ts appointment endpoints

**Plan**: [P11. API Layer](#p11-api-layer)

Create appointment CRUD endpoints.

### 87. Create src/api/diary.ts diary endpoints

**Plan**: [P11. API Layer](#p11-api-layer)

Create diary entry CRUD endpoints.

### 88. Create src/api/media.ts media endpoints

**Plan**: [P11. API Layer](#p11-api-layer)

Create media/photo CRUD endpoints.

### 89. Document API endpoints and schemas

**Plan**: [P12. API Documentation](#p12-api-documentation)

Document all endpoints with request/response examples.

### 90. Document authentication method in API

**Plan**: [P12. API Documentation](#p12-api-documentation)

Document auth headers, token format, refresh mechanism.

### 91. Create OpenAPI/Swagger spec

**Plan**: [P12. API Documentation](#p12-api-documentation)

Generate or write OpenAPI 3.0 spec for API.

### 92. Create .github/workflows/ci.yml

**Plan**: [P13. CI/CD](#p13-cicd)

Set up GitHub Actions workflow for CI.

### 93. Add test running to CI pipeline

**Plan**: [P13. CI/CD](#p13-cicd)

Add `npm test` to CI workflow.

### 94. Add linting to CI pipeline

**Plan**: [P13. CI/CD](#p13-cicd)

Add `npm run lint` to CI workflow.

### 95. Add Docker build to CI pipeline

**Plan**: [P13. CI/CD](#p13-cicd)

Add `docker compose build` to CI workflow.

### 96. Create Vercel/Railway deployment configuration

**Plan**: [P14. Deployment](#p14-deployment)

Create vercel.json or railway.yaml for one-click deploy.

### 97. Create DEPLOYMENT.md with deployment instructions

**Plan**: [P14. Deployment](#p14-deployment)

Document deployment steps, environment setup, troubleshooting.

### 98. Update README with deployment and status badges

**Plan**: [P14. Deployment](#p14-deployment)

Add deployment button links and build/coverage badges to README.

## Plan

### P1. Foundation

Setup project infrastructure: git, npm, linting, testing.

### P2. Git & Linting

Configure version control and code quality enforcement.

### P3. Documentation

Create developer and agent guidance documents.

### P4. Vite Setup

Replace prototype transpilation with modern bundler.

### P5. Router Setup

Implement client-side routing between screens.

### P6. State Management

Set up global state for auth, pets, preferences.

### P7. Docker

Update Docker to build and serve Vite output.

### P8. Screen Implementation

Make all screens functional with real data binding.

### P9. Persistence

Implement localStorage for state and image persistence.

### P10. Testing

Add unit and integration tests, verify Docker.

### P11. API Layer

Create API client abstraction and endpoints.

### P12. API Documentation

Document API contract and schemas.

### P13. CI/CD

Automate testing and building on every commit.

### P14. Deployment

Prepare for cloud deployment and document process.

## Assignees

- @claude

## Settings

[ ] Hide completed tasks
[ ] Group by status
