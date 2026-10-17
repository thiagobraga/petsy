// Shared dashboard primitives — keeps card/header/thumbnail styling in one place
// so the feature cards stay DRY.

import React from 'react';
import { Glyph } from './icons';
import type { DashPet } from './data';

// ─── SectionCard — white rounded card. `highlight` lifts it with a pink glow. ──
export function SectionCard({
  highlight = false,
  className = '',
  children,
}: {
  highlight?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const shadow = highlight
    ? 'shadow-[0_16px_36px_-12px_rgba(255,90,126,0.45)] ring-1 ring-coral/20'
    : 'shadow-[0_10px_26px_-12px_rgba(45,52,54,0.18)] ring-1 ring-black/[0.04]';
  return (
    <section className={`rounded-3xl bg-surface p-4 ${shadow} ${className}`}>{children}</section>
  );
}

// ─── CardHeader — icon chip + title + optional "Ver todas" link. ──────────────
export function CardHeader({
  icon,
  title,
  action,
  onAction,
}: {
  icon: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-blush-soft text-coral">
          <Glyph name={icon} size={17} />
        </span>
        <h2 className="text-[15.5px] font-extrabold tracking-tight text-charcoal">{title}</h2>
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-0.5 text-[12px] font-bold text-coral transition hover:text-coral-deep"
        >
          {action}
          <Glyph name="chevronR" size={14} />
        </button>
      )}
    </div>
  );
}

// ─── PetThumb — round emoji avatar with a soft colored ring. ──────────────────
export function PetThumb({
  pet,
  size = 48,
  ring = true,
}: {
  pet: DashPet;
  size?: number;
  ring?: boolean;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        background: pet.bg,
        boxShadow: ring ? `0 0 0 2px ${pet.ring}` : undefined,
      }}
      aria-hidden="true"
    >
      <span style={{ fontSize: size * 0.52, lineHeight: 1 }}>{pet.emoji}</span>
    </span>
  );
}
