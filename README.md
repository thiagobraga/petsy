# Petsy — Pet Care Management App

A mobile-first iOS-style pet care management application built with React. Manage pets, medicines, appointments, exams, diary entries, and media gallery.

## Features

- **Pet Management** — Add and manage multiple pets with detailed profiles
- **Medicine Tracking** — Schedule medications with dosage times and daily checkoff
- **Appointments & Exams** — Calendar-based scheduling with vet visits and lab tests
- **Diary** — Timeline journal with mood tracking and photo uploads
- **Media Gallery** — Organize pet photos by date and album
- **iOS UI** — Native-feeling glass effects, smooth interactions, warm design

## Tech Stack

- React
- JavaScript (JSX)
- Inline CSS-in-JS
- Custom Web Components (image-slot)
- Google Fonts

## Project Structure

```
.
├── index.html              # Main HTML entry point
├── design-canvas.jsx       # Figma-like design editor wrapper
├── image-slot.js           # Custom element for photo uploads
├── ios-frame.jsx           # iOS device frame & UI components
├── src/
│   ├── tokens.jsx          # Design system (colors, typography, shadows)
│   ├── components.jsx      # 12 reusable UI components
│   ├── icons.jsx           # 24 line icons (24px, 1.8 stroke)
│   ├── data.jsx            # Mock data (pets, medicines, appointments, etc.)
│   └── screens/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── PetDetail.jsx
│       ├── Medicines.jsx
│       ├── Appointments.jsx
│       ├── Diary.jsx
│       ├── Media.jsx
│       └── UIKit.jsx       # Design system documentation
└── uploads/                # User-uploaded images
```

## Design System

**Colors:** Warm cream (#FBF1DE) + rose pink (#ED8FAA) + cocoa brown (#3A2620)

**Typography:** Fredoka (display), Nunito (body), JetBrains Mono (code)

**Components:** Button, Input, Checkbox, Tag, Card, PetAvatar, TabBar, MiniCalendar, etc.

## Getting Started

1. Open `index.html` in a browser (requires React + ReactDOM loaded globally)
2. All components are exported to `window` object for access in Framer prototypes
3. Data is hardcoded in `src/data.jsx` — no backend required

## Data Model

- **PETS** — Pet profiles with breed, age, weight, microchip, photo slot
- **MEDS** — Medicines with dosage schedules, start/end dates, frequency
- **APPOINTMENTS** — Vet consultations with date, time, vet name
- **EXAMS** — Lab tests with date, lab name, status
- **DIARY** — Journal entries with mood, photos, notes
- **MEDIA** — Photo gallery with timestamps and tags

## Notes for Development

- All UI is React components exported to `window`
- Image persistence uses `.image-slots.state.json` sidecar (requires omelette bridge)
- Inline styles throughout — no CSS files
- Portuguese (PT-BR) language
- State managed locally in components (no Redux)
- Responsive flex/grid layouts

---

_This is a handoff from Claude Design. See design-canvas.jsx for Figma-like editor capabilities._
