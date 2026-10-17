// PetTile — portrait + name + type + next event + chevron. Opens the profile.

import React from 'react';
import { Glyph } from './icons';
import { FOCUS, PetPortrait } from './primitives';
import type { DashPet } from './data';

export function PetTile({ pet, onClick }: { pet: DashPet; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-w-0 items-center gap-3 rounded-[18px] border border-hairline bg-surface p-2.5 text-left shadow-tile transition duration-150 hover:border-blush hover:bg-petal active:scale-[0.99] motion-reduce:transform-none ${FOCUS}`}
    >
      <PetPortrait pet={pet} size={60} shape="rounded" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-1">
          <p className="truncate text-[16.5px] font-extrabold leading-tight text-charcoal">
            {pet.name}
          </p>
          <Glyph
            name="chevronR"
            size={18}
            stroke={2.2}
            className="mt-px shrink-0 text-coral transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
          />
        </div>
        <p className="mt-0.5 text-[14px] text-slate">{pet.type}</p>
        <p className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-charcoal/80">
          <Glyph name={pet.eventIcon} size={16} className="mt-px shrink-0 text-coral" />
          <span className="line-clamp-2">{pet.event}</span>
        </p>
      </div>
    </button>
  );
}
