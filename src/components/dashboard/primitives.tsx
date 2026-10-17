// Shared dashboard primitives — keeps card/header/portrait styling in one place
// so the feature cards stay DRY.

import React from 'react';
import { Glyph } from './icons';
import type { DashPet } from './data';

// Pet photos dropped into uploads/pets/<id>.{jpg,png,webp} are picked up at
// build time; the originals are never copied or modified.
const PHOTO_FILES = import.meta.glob<string>('../../../uploads/pets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const PHOTOS: Record<string, string> = Object.fromEntries(
  Object.entries(PHOTO_FILES).map(([path, url]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.\w+$/, '')
      .toLowerCase(),
    url,
  ])
);

export const photoFor = (petId: string): string | undefined => PHOTOS[petId];

// Shared focus ring — visible on every interactive dashboard element.
export const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-white';

// ─── SectionCard — white rounded card, labelled by its header title. ─────────
export function SectionCard({
  titleId,
  id,
  className = '',
  children,
}: {
  titleId: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`scroll-mt-6 rounded-[18px] border border-hairline bg-surface px-4 pb-1.5 pt-3 shadow-card sm:px-5 ${className}`}
    >
      {children}
    </section>
  );
}

// ─── CardHeader — line icon + title + optional "Ver todas" link. ─────────────
export function CardHeader({
  icon,
  title,
  titleId,
  action,
  onAction,
  divider = false,
}: {
  icon: string;
  title: string;
  titleId: string;
  action?: string;
  onAction?: () => void;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex min-h-11 items-center justify-between gap-3 ${divider ? 'border-b border-hairline pb-2' : ''}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Glyph name={icon} size={22} className="shrink-0 text-coral" />
        <h2
          id={titleId}
          className="truncate text-[16.5px] font-extrabold tracking-[-0.01em] text-charcoal"
        >
          {title}
        </h2>
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className={`-mr-2 flex min-h-11 shrink-0 items-center gap-0.5 rounded-full px-2 text-[14px] font-semibold text-coral-ink transition-colors duration-150 hover:bg-blush-soft ${FOCUS}`}
        >
          {action}
          <Glyph name="chevronR" size={16} />
        </button>
      )}
    </div>
  );
}

// ─── PetPortrait — the pet's photo, or an identified placeholder until the
// file arrives. `decorative` hides it when the name is already printed next
// to it, so screen readers don't hear it twice.
export function PetPortrait({
  pet,
  size,
  shape = 'circle',
  decorative = false,
  className = '',
}: {
  pet: Pick<DashPet, 'id' | 'name' | 'tone'>;
  /** Pixel size; omit it to size via a `[--pp:..]` class instead. */
  size?: number;
  shape?: 'circle' | 'rounded';
  decorative?: boolean;
  className?: string;
}) {
  const src = photoFor(pet.id);
  // Size travels as a CSS variable so containers can shrink it (e.g. `[--pp:40px]`).
  const vars = {
    ...(size ? { '--pp': `${size}px` } : null),
    background: pet.tone.bg,
  } as React.CSSProperties;
  const box = `size-(--pp) shrink-0 ${shape === 'circle' ? 'rounded-full' : 'rounded-[calc(var(--pp)*0.24)]'}`;

  if (src) {
    return (
      <img
        src={src}
        alt={decorative ? '' : pet.name}
        width={size ?? 64}
        height={size ?? 64}
        loading="lazy"
        decoding="async"
        className={`${box} object-cover ${className}`}
        style={vars}
      />
    );
  }

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `${pet.name} (foto pendente)`}
      aria-hidden={decorative || undefined}
      title={decorative ? undefined : 'Foto pendente'}
      className={`${box} relative grid place-items-center overflow-hidden select-none ${className}`}
      style={{ ...vars, color: pet.tone.fg }}
    >
      <Glyph
        name="paw"
        className="absolute -bottom-[12%] -right-[10%] size-[calc(var(--pp)*0.62)] opacity-[0.13] [&_svg]:size-full"
      />
      <span className="relative text-[calc(var(--pp)*0.42)] font-extrabold leading-none">
        {pet.name.charAt(0)}
      </span>
    </span>
  );
}
