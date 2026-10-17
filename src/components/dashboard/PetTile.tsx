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
      className={`group flex w-full min-w-0 items-center gap-2.5 rounded-[14px] border border-hairline bg-surface p-2.5 text-left @max-[10.5rem]:gap-2 @max-[10.5rem]:p-2 shadow-tile transition duration-150 hover:border-blush hover:bg-petal active:scale-[0.99] motion-reduce:transform-none ${FOCUS}`}
    >
      <PetPortrait pet={pet} shape="rounded" className="[--pp:52px] @max-[10.5rem]:[--pp:40px]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-1">
          <p className="truncate text-[15px] font-extrabold leading-tight text-charcoal">
            {pet.name}
          </p>
          <Glyph
            name="chevronR"
            size={16}
            stroke={2.2}
            className="mt-px shrink-0 text-coral transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
          />
        </div>
        <p className="text-[13px] text-slate">{pet.type}</p>
        <p className="mt-1 flex items-start gap-1 text-[12px] leading-snug text-charcoal/80">
          <Glyph name={pet.eventIcon} size={14} className="mt-px shrink-0 text-coral" />
          <span className="line-clamp-2">{pet.event}</span>
        </p>
      </div>
    </button>
  );
}
