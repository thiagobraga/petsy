---
name: Petsy
description: Calm, warm companion for pet care tracking and memory-keeping
colors:
  primary-pink: '#ED8FAA'
  primary-pink-hover: '#D97694'
  primary-pink-soft: '#FBD7E0'
  primary-pink-pale: '#FDEDF1'
  secondary-rose: '#F4A8B8'
  neutral-cream: '#FBF1DE'
  neutral-cream-deep: '#F4E3C6'
  neutral-surface: '#FFFFFF'
  neutral-surface-warm: '#FFF9EE'
  ink-primary: '#3A2620'
  ink-secondary: '#6B4E45'
  ink-tertiary: '#A4877A'
  ink-disabled: '#CCB5A6'
  semantic-ok: '#7CA972'
  semantic-warn: '#E29A56'
  semantic-danger: '#D1556E'
  utility-border: 'rgba(61,38,32,0.10)'
  utility-border-soft: 'rgba(61,38,32,0.06)'
typography:
  display:
    fontFamily: '"Fredoka", "Quicksand", system-ui, sans-serif'
    fontSize: '28px'
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: '"Fredoka", "Quicksand", system-ui, sans-serif'
    fontSize: '18px'
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: '"Nunito", "DM Sans", system-ui, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Nunito", "DM Sans", system-ui, sans-serif'
    fontSize: '13px'
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.4
rounded:
  xs: '4px'
  sm: '8px'
  md: '12px'
  lg: '20px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '20px'
  '2xl': '24px'
components:
  button-primary:
    backgroundColor: '{colors.primary-pink}'
    textColor: '#ffffff'
    rounded: '{rounded.md}'
    padding: '12px 24px'
  button-primary-hover:
    backgroundColor: '{colors.primary-pink-hover}'
  button-secondary:
    backgroundColor: '{colors.primary-pink-soft}'
    textColor: '{colors.ink-primary}'
    rounded: '{rounded.md}'
    padding: '12px 24px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-primary}'
    rounded: '{rounded.md}'
    padding: '12px 24px'
  input:
    backgroundColor: '{colors.neutral-surface}'
    textColor: '{colors.ink-primary}'
    rounded: '{rounded.md}'
    padding: '12px 18px'
  card:
    backgroundColor: '{colors.neutral-surface}'
    rounded: '{rounded.lg}'
    padding: '16px'
  tag:
    backgroundColor: '{colors.primary-pink-pale}'
    textColor: '{colors.primary-pink}'
    rounded: '{rounded.sm}'
    padding: '4px 10px'
---

# Design System: Petsy

## 1. Overview

**Creative North Star: "The Nest"**

Petsy is a calm refuge for pet owners who want to care thoughtfully. The visual system wraps users in warmth without overwhelming them—like a nest, it's safe, enveloping, and home. Every interaction reassures rather than alarms. The design removes friction from health tracking and celebrates pet memories with gentle, delicate beauty.

Petsy rejects clinical coldness (no sterile medical aesthetics), cartoonish casualness (which undermines trust), corporate flatness (which feels impersonal), and visual noise (which exhausts pet owners). Instead, it breathes calm through soft curves, warm muted tones, and subtle personality.

**Key Characteristics:**

- Warm, supportive, trustworthy without being corporate
- Subtly curved, never rigid or angular
- Soft visual weight; generous whitespace
- Playful only at moments, not by default
- Typography that feels approachable, not display-heavy

## 2. Colors

The palette anchors on warm cream and muted rose-pink, with cocoa-brown text. Saturation is deliberately restrained—richness comes from depth and context, not brightness.

### Primary

- **Rose Pink** (#ED8FAA): Primary accent for buttons, selection, emphasis. Used sparingly (≤10% of screen) to guide attention to high-intent actions.
- **Rose Pink Hover** (#D97694): Hover state for primary buttons. Slightly darker, maintains warmth.
- **Rose Pink Soft** (#FBD7E0): Soft background for secondary buttons and selected states. Approachable, never aggressive.
- **Rose Pink Pale** (#FDEDF1): Ultra-light background for tags, badges, and gentle highlights. Whisper-soft.

### Secondary

- **Rose** (#F4A8B8): Optional mid-tone accent for variety in long interfaces (carousel badges, accent strokes on avatars). Use judiciously.

### Neutral

- **Cream** (#FBF1DE): Primary app background. Warm, slightly tinted, never harsh white.
- **Cream Deep** (#F4E3C6): Secondary surface for sections, chips, muted backgrounds. Visual breathing room.
- **White** (#FFFFFF): Card and form surfaces. Pure white for contrast against cream.
- **Warm White** (#FFF9EE): Subtle tint for hover/focus states on surfaces.
- **Primary Ink** (#3A2620): Headings, body text. Warm dark brown, high contrast.
- **Secondary Ink** (#6B4E45): Secondary text, labels. Slightly lighter, still legible.
- **Tertiary Ink** (#A4877A): Muted text, icons on neutral backgrounds. Never used for body content.
- **Disabled Ink** (#CCB5A6): Disabled buttons, inactive states. Desaturated, clearly non-interactive.

### Semantic

- **Success** (#7CA972): Medicine checked, appointment completed. Soft sage green, calm and reassuring.
- **Warning** (#E29A56): Medication reminders, upcoming appointments. Warm amber, not alarm-red.
- **Danger** (#D1556E): Destructive actions, critical alerts. Soft rose-red, not neon.

### Named Rules

**The Palette Depth Rule.** Colors are never at full saturation. Warmth is carried through saturation reduction (muted rose, not hot pink) and hue shift toward earth tones. If a color looks "bright" or "candy-like," it's the wrong value.

**The Accent Scarcity Rule.** Rose Pink is used on ≤10% of any screen. Its rarity makes it land. Secondary and tertiary colors fill the gaps, not the primary.

## 3. Typography

**Display Font:** Fredoka, a soft geometric sans-serif with warmth and personality. Fallback: Quicksand, system-ui.
**Body Font:** Nunito, a humanist sans with approachability. Fallback: DM Sans, system-ui.
**Mono Font:** JetBrains Mono for data, timestamps, technical content.

**Character:** Warm, approachable, refined without being cold. Fredoka brings personality; Nunito brings trust. Together, they feel like a friend who knows medicine.

### Hierarchy

- **Display** (Fredoka, 28px, 600 weight, 1.2 line): Hero headlines, screen titles. Rare—only the top of a flow.
- **Headline** (Fredoka, 18px, 700 weight, 1.3 line): Section headers, card titles. Used frequently for visual breaks.
- **Body** (Nunito, 15px, 400 weight, 1.5 line): Main content, descriptions, form labels. Keep to 65–75ch line length.
- **Label** (Nunito, 13px, 600 weight, 1.4 line): Button text, input labels, metadata. Slightly heavier to differentiate from body.
- **Mono** (JetBrains Mono, 12px, 400 weight, 1.4 line): Timestamps, dosages, coded data. Preserve scan-ability.

### Named Rules

**The No-Display Rule.** Display sizing is reserved for hero moments. Section headers use Headline; body headings stay in Title or Label. Overusing Display creates noise.

**The Weight Contrast Rule.** Hierarchy is built on weight and size together, not size alone. A 18px / 700 weight Headline is distinct from 15px / 400 weight Body because both properties shift.

## 4. Elevation

Petsy uses shadows as subtle depth cues, never as structural affordance. Shadows are soft (large blur, low opacity) and warm-tinted, matching the palette. Elevation is minimal; the interface is nearly flat by default.

### Shadow Vocabulary

- **Soft Ambient** (0 1px 2px rgba(58,38,32,0.05), 0 2px 6px rgba(58,38,32,0.04)): Very subtle. Cards at rest, inactive tabs.
- **Medium Lift** (0 4px 14px rgba(58,38,32,0.07), 0 8px 28px rgba(58,38,32,0.05)): Hover states, modal backdrops, floating elements.
- **Deep Lift** (0 16px 40px rgba(58,38,32,0.12)): Toasts, critical modals. Used sparingly.

### Named Rules

**The Subtle Depth Rule.** Shadows are barely visible at arm's length. If you notice the shadow before the content, it's too dark or too sharp. Warmth (brown tint) keeps shadows feeling friendly, not ominous.

**The No-Stacked-Shadows Rule.** One shadow per element. Nested cards are forbidden (per PRODUCT design bans). If you need two layers, use tonal background shifts instead.

## 5. Components

Every interactive component has clear default, hover, and focus states. Motion is handled separately (see PRODUCT.md Design Principles for motion doctrine).

### Buttons

**Shape:** Gently curved (8px radius for primary/secondary, no pill shapes in new design). Feel refined, not rounded.

**Primary Button** (Rose Pink background, white text, 12px v-padding, 24px h-padding):

- Default: solid Rose Pink (#ED8FAA)
- Hover: darker Rose Pink (#D97694) + 6px drop shadow (medium lift)
- Focus: focus ring (2px solid Rose Pink, inset, around border)
- Disabled: Disabled Ink background, white text at 50% opacity
- Transition: all 150ms ease-out

**Secondary Button** (Rose Pink Soft background, Primary Ink text):

- Default: Rose Pink Soft (#FBD7E0)
- Hover: lighter, with medium lift shadow
- Disabled: Cream Deep background, Tertiary Ink text

**Ghost Button** (Transparent, Primary Ink text):

- Default: transparent
- Hover: 6% opacity background (Cream Deep), medium lift shadow
- Focus: focus ring

### Inputs / Form Fields

**Style:** 12px radius, white background, 12px v-padding, 18px h-padding. Thin borders (1.5px) in Border Soft by default.

- **Default:** white background, Border Soft outline
- **Focus:** Border shifts to Rose Pink (1.5px), Cream Deep background tint
- **Error:** Border becomes Danger color; error text below in Danger
- **Disabled:** Cream Deep background, Disabled Ink placeholder

### Cards

**Corner Style:** Gently rounded (20px). No hard edges.
**Background:** White or Cream Deep, depending on hierarchy.
**Shadow:** Soft Ambient by default; Medium Lift on hover.
**Border:** None (shadows do the depth). Background color creates hierarchy.
**Internal Padding:** 16px (md spacing).

### Chips / Tags

**Style:** Rose Pink Pale background, Rose Pink text, 8px radius, 4px v-padding, 10px h-padding.
**Selected State:** Rose Pink background, white text.
**Dismissible:** Include small × icon, gray on default, ink on hover.

### Navigation / Tab Bar

**Style:** White surface (Neutral Surface), soft shadows, 12px radius items, 6px padding. Active item has Rose Pink Soft background; inactive items use Primary Ink at 70% opacity.
**Mobile:** Bottom tab bar (iOS-style). Fixed position, icon + optional label.

### Pet Avatar

**Shape:** Circle with 2px border (Ring in avatar's tone color). No radius needed (natural circle).
**Background:** Tone-specific soft color (e.g., Rose Pink Soft for pink tone).
**Interaction:** None (display-only in most flows). Selectable via parent container.

### Icon Circle (for activity, dosage, etc.)

**Shape:** Circle, 44px default (2xl spacing + 4px padding). Gentle background tint matching the icon tone.
**Style:** Icon + tone-matched background (e.g., sage green for "ok" icons, warm amber for warnings).

### Named Rules

**The Gentle Affordance Rule.** Every button, input, and interactive component uses 8–12px radius. Pill shapes (radius: 999) are forbidden in the new design; they read as decorative, not functional. Squared corners (radius: 0) are also forbidden unless explicitly part of a data table; they feel clinical.

**The Consistent State Vocabulary Rule.** Every interactive component has default → hover → focus → active → disabled states. No component ships half-built.

**The Border Lightness Rule.** Borders are soft (Border Soft: rgba with 6–10% opacity) unless they're focus indicators. Hard-stroke borders (1.5–2px in dark colors) are only used for focus outlines, never at rest.

## 6. Do's and Don'ts

### Do:

- **Do** use Rose Pink sparingly (≤10% of screen). Its rarity makes it effective.
- **Do** use Cream Deep as a visual separator and visual-rest surface. It's your "secondary background."
- **Do** pair 8–12px radius on buttons and inputs. Gentle curves feel warm and approachable.
- **Do** use soft shadows (medium lift on hover). Interaction should feel light, not heavy.
- **Do** maintain 65–75ch line length for body text. Long text is harder to read on mobile.
- **Do** use Fredoka for headlines only. Body must be Nunito for legibility.
- **Do** respect reduced motion (all transitions should have `@media (prefers-reduced-motion: reduce)` fallback to instant state change).
- **Do** build empty states and error states upfront. These are part of the complete component.

### Don't:

- **Don't** use pill-shaped buttons, inputs, or containers. PETSY IS ABANDONING PILLS. Radius ≥ 20px is now forbidden.
- **Don't** use hard-stroke borders (1.5px+ dark strokes) on cards or sections at rest. Borders are for focus rings only. Use background tint instead.
- **Don't** use clinical or sterile aesthetics (white-only, high-contrast, hospital-grade). This is a pet care companion, not a medical device.
- **Don't** use cartoonish or bubbly styles that undermine trust in health tracking. No gradients, no neon, no emoji-heavy layouts.
- **Don't** overuse color. Grays and blacks are fine for secondary text; keep the palette muted.
- **Don't** use Display typography for labels or buttons. Display is for hero moments only.
- **Don't** ship components without all states (default, hover, focus, disabled). Half-built components feel incomplete.
- **Don't** add decorative motion. Motion conveys state only: hover, focus, loading, transitions. No choreographed page-load sequences.
- **Don't** use margin-only spacing. Mix margin and padding for rhythm and breathing room.
- **Don't** nest cards. Nested cards are visual clutter. Use tonal layering instead.
