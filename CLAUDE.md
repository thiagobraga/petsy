# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Petsy** is a React app for pet care management, built with Vite, React, Zustand, and TypeScript. It features seven main screens (Login, Dashboard, PetDetail, Medicines, Appointments, Diary, Media) with a design system, mock data, and full test/lint infrastructure.

**Technology stack:** React 18 + Vite + TypeScript + Zustand (state) + Wouter (routing) + Vitest (testing) + ESLint + Prettier.

## Architecture

### Core Pattern: Window Exports

Every component, screen, and utility is exported to `window` so they can be accessed from the design canvas and composed into artboards. Example:
```javascript
// In src/components.jsx
function Button({ children, variant = 'primary', ... }) { ... }
Object.assign(window, { Button, Input, Checkbox, ... });

// In index.html
<Button>Click me</Button>
```

This is **fundamental** — if you add a new component or screen, you MUST export it to `window` at the end of the file, or it won't be usable.

### Design System (Single Source of Truth)

**src/tokens.jsx** exports one object: `TOKENS`. Every color, font size, shadow, and radius lives here. All components reference `window.TOKENS` (aliased as `T`).

```javascript
const T = window.TOKENS;
// Then in styles: background: T.pink, fontSize: T.fontSize.lg, etc.
```

**If you're changing colors, shadows, or spacing globally, edit tokens.jsx first.** The design system is documented in the UIKit screen (screens/UIKit.jsx).

### Data Layer

**src/data.jsx** contains all mock data: `PETS`, `MEDS`, `APPOINTMENTS`, `EXAMS`, `DIARY`, `MEDIA`. It also exports `petById(id)` utility.

**When adding features:**
- Add data structure to data.jsx
- Export it to `window`
- Screens reference it directly: `PETS.map(p => ...)` or `petById(petId)`

No API, no state management library — data flows downward into screens and components.

### Screens & Routing

**Seven main screens:**
1. Login — email/password, social buttons
2. Dashboard — pet carousel, med schedule, quick actions
3. PetDetail — hero, stats, tabs (about/health/notes)
4. Medicines — pet filter, dosage schedule, checkoff
5. Appointments — calendar, next/past lists
6. Diary — timeline, mood tracking, photo uploads
7. Media — photo grid, albums

Each screen is in `src/screens/` and is a React function that:
- Manages local state (active tab, filter, form inputs)
- Is wrapped in a `Phone` artboard in index.html
- Is exported to `window` (so design canvas can reference it)

**Pattern for adding a new screen:**
1. Create `src/screens/NewFeature.jsx`
2. Export the screen function to `window`
3. Add `<script>` tag in index.html after other screens
4. Wrap it in a `DCSection` and `DCArtboard` in the `App()` function

### Design Canvas & Artboards

**index.html** uses the design-canvas wrapper (`DesignCanvas`, `DCSection`, `DCArtboard`) to organize screens into a Figma-like layout. You can:
- Drag artboards to reorder (saved to `.design-canvas.state.json`)
- Rename artboards inline
- Focus on one artboard with ← / → keys
- Export individual artboards as PNG or HTML

The design canvas is **read-only in most environments** — it mainly helps visualize all screens at once.

## Development Commands

**Setup:**
```bash
npm install
```

**Core commands:**
- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Build production bundle to `dist/`
- `npm run preview` — Preview production build locally
- `npm test` — Run Vitest suite in watch mode
- `npm run test:ui` — Run tests with browser UI
- `npm run test:coverage` — Generate coverage report
- `npm run lint` — Run ESLint on all `.ts` and `.tsx` files
- `npm run lint:fix` — Auto-fix ESLint issues
- `npm run format` — Format code with Prettier
- `npm run format:check` — Check formatting without changes

## Development Workflow

### Setup
1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the Vite dev server.
3. Open http://localhost:5173 in a browser.
4. Hot module reload (HMR) updates the app automatically as you edit.

### Making Changes
1. Edit `.ts` or `.tsx` files in `src/`.
2. Vite HMR instantly reloads the browser.
3. Changes appear within 100–300ms.

### Adding a New Component
1. Create `src/components/NewComponent.tsx` (or add to `src/components.tsx`).
2. Export it as a named export: `export function NewComponent() { ... }`.
3. Import and use in screens: `import { NewComponent } from '../components'`.
4. Write unit tests in `tests/NewComponent.test.tsx`.

### Adding a New Screen
1. Create `src/screens/NewScreen.tsx`.
2. Define screen function and export: `export function NewScreen() { ... }`.
3. Add route in `src/App.tsx` (when routing is set up in Phase 5).
4. Import in `src/App.tsx` and add to router configuration.

### Modifying Design System
1. Edit `src/tokens.ts` (colors, fonts, shadows, radii).
2. All components that reference tokens auto-update on HMR.
3. No manual refresh needed (Vite handles it).

### Adding Data
1. Add array/object to `src/data.ts`.
2. Export as named export (not to `window`).
3. Screens import and use directly: `import { PETS } from '../data'`.

## Key Files

- **src/index.tsx** — React root entry point; mounts App to `<div id="root">`
- **src/App.tsx** — Root component with router and layout (created in Phase 5)
- **src/tokens.ts** — Design system (colors, typography, shadows, radii, fonts)
- **src/icons.ts** — 24px line icons (used throughout)
- **src/components.tsx** — 12+ reusable UI components (Button, Input, Card, PetAvatar, TabBar, etc.)
- **src/data.ts** — Mock data fixtures (PETS, MEDS, APPOINTMENTS, EXAMS, DIARY, MEDIA)
- **src/screens/** — Seven screen implementations (Login, Dashboard, PetDetail, etc.)
- **src/stores/** — Zustand stores (auth, pet, preferences) — created in Phase 6
- **src/api/** — API client and endpoints — created in Phase 11
- **tests/** — Unit and integration tests (Vitest)
- **index.html** — HTML template with `<div id="root">` mount point
- **vite.config.ts** — Vite build configuration
- **vitest.config.ts** — Vitest testing configuration
- **package.json** — Dependencies and npm scripts

## Style & Language

- **Language:** Portuguese (PT-BR) — all UI text in screens is in Portuguese
- **Styling:** Inline React styles only (no CSS files, no styled-components)
- **Design:** Warm palette (cream + rose pink + cocoa brown). Defined in tokens.jsx
- **Patterns:** Glass UI effects (`backdropFilter: blur(12px) saturate(180%)`), color-coded accents (tone system), responsive flex/grid

## Photo Uploads

The `<image-slot>` custom element:
- Accepts dragged or clicked images
- Stores image as base64 WebP in `.image-slots.state.json` sidecar
- Persists across reloads
- Used in screens for pet avatars, diary photos, etc.

Example:
```jsx
<image-slot id="pet-luna-photo" shape="circle" placeholder="Drop pet photo"/>
```

The `id` is the persistence key. Multiple slots with the same `id` share the same image.

## Troubleshooting

**Component/screen not showing?**
- Verify it's exported to `window` at end of file
- Check script load order in index.html
- Hard refresh browser (Ctrl+Shift+R)

**Styles not updating?**
- Edit `src/tokens.jsx` to change globals
- Component inline styles won't auto-update until refresh

**Image slot not persisting?**
- Requires `.image-slots.state.json` sidecar support
- Works in Claude Design/Framer, may be read-only in plain browser

## Constraints & Gotchas

1. **Zustand for state only** — No Redux, no Context. Use Zustand stores (auth, pet, preferences) for global state.
2. **TypeScript strict mode** — All new code must be TypeScript. Run `npm run lint` to check.
3. **Portuguese language** — All UI text in screens is in Portuguese (PT-BR). Maintain for consistency.
4. **Inline styles or CSS Modules** — No styled-components. Use inline React styles or import `.module.css` files.
5. **Mock data in src/data.ts** — No API calls until Phase 11. Replace PETS, MEDS, etc. with real API calls later.
6. **Test new features** — Write unit/integration tests in `tests/` using Vitest and @testing-library/react.
7. **Lint before commit** — Pre-commit hooks run ESLint and Prettier. Fix issues with `npm run lint:fix && npm run format`.

## Extending the App

### Add a Pet
Edit `src/data.jsx`, add to `PETS` array. The `tone` property (pink, cream, rose, etc.) controls avatar color throughout.

### Add a Medicine
Edit `src/data.jsx`, add to `MEDS` array. Include `petId` to link it to a pet, `days` array for weekly schedule, `when` for times.

### Add an Appointment
Edit `src/data.jsx`, add to `APPOINTMENTS`. Include `status: 'next'` or `'past'` to control list placement.

### Change a Color Globally
Edit `src/tokens.jsx`. All components read from `window.TOKENS`, so the change propagates everywhere.

### Change Font Sizes or Spacing
Edit `src/tokens.jsx`. Optionally add new token values (e.g., `fontSize: { sm: 11, md: 13, lg: 15 }`) and use them in component styles.

---

**Last updated:** 2026-05-30 (Phase 1 Foundation setup: Vite, Vitest, ESLint, Prettier)
