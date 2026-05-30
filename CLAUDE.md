# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Petsy** is a React prototype for a pet care management app, designed as a handoff from Claude Design. It runs in the browser with **no build system** — React and Babel are loaded from CDN, JSX is transpiled live, and all components are exported to the `window` object for easy access in design/prototype environments.

**Key constraint:** This is a prototype, not production code. No tests, no linting, no CI/CD.

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

**There are no build, lint, or test commands.** This is a prototype with no build system.

To develop:
1. Open `index.html` in a browser (or use in Claude Design/Framer environment)
2. Edit `.jsx` files
3. Refresh the browser
4. Changes appear immediately

No npm, no build step, no commands to run.

## Development Workflow

### Setup
1. Files are already in place. No `npm install`, no build step.
2. Open `index.html` in a browser (or design canvas editor).
3. Babel transpiles JSX on load; React runs from CDN.

### Making Changes
1. Edit `.jsx` files directly.
2. Refresh the browser page.
3. Changes appear immediately (no build step, no cache).

### Adding a New Component
1. Add function to `src/components.jsx`
2. At the bottom, add to `Object.assign(window, { ..., NewComponent })`
3. Use in any screen: `<NewComponent prop="value"/>`

### Adding a New Screen
1. Create `src/screens/Feature.jsx`
2. Define screen function, export to window: `window.FeatureScreen = FeatureScreen`
3. Add `<script>` import in index.html
4. Add `<DCSection>` and `<DCArtboard>` in the `App()` function in index.html (so it appears in design canvas)

### Modifying Design System
1. Edit `src/tokens.jsx` (colors, fonts, shadows, radii)
2. Refresh. All components automatically pick up new values via `window.TOKENS`

### Adding Data
1. Add array/object to `src/data.jsx`
2. Export to `window` (e.g., `window.MY_DATA = MY_DATA`)
3. Screens access it directly: `MY_DATA.map(...)`

## Key Files

- **index.html** — Entry point. Loads all scripts in order, defines `App()` with design canvas layout
- **src/tokens.jsx** — Design system (colors, typography, shadows, radii, fonts)
- **src/icons.jsx** — 24px line icons (used throughout)
- **src/components.jsx** — 12 reusable UI components (Button, Input, Card, PetAvatar, TabBar, etc.)
- **src/data.jsx** — Mock data fixtures (PETS, MEDS, APPOINTMENTS, EXAMS, DIARY, MEDIA)
- **src/screens/** — Seven screen implementations
- **design-canvas.jsx** — Figma-like editor (50KB, self-contained)
- **ios-frame.jsx** — iOS 26 UI kit (status bar, nav bar, glass pill, keyboard)
- **image-slot.js** — Custom `<image-slot>` element for photo uploads (persistence via `.image-slots.state.json`)

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

1. **No build system** — If you need a bundler, package.json, or tree-shaking, this isn't it.
2. **Window exports are mandatory** — If you add a component/screen and don't export it, it won't work.
3. **State is local** — No Redux, no Context (by design). Props and local state only.
4. **Portuguese language** — UI text is in Portuguese. Maintain this for consistency.
5. **Inline styles only** — No CSS files or CSS modules. All styling via `style={}` props.
6. **Script load order matters** — In index.html, tokens loads first, then icons, then data, then components. If you add new dependencies, ensure they load in the right order.
7. **Mock data only** — No API calls, no backend. For real features, you'd need to integrate a backend and replace the data fixtures.

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

**Last updated:** 2026-05-29
