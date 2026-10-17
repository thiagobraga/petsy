// PetTile — thumbnail + name + type + next event + chevron.

import React from 'react';
import { Glyph } from './icons';
import { PetThumb } from './primitives';
import type { DashPet } from './data';

export function PetTile({ pet, onClick }: { pet: DashPet; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${pet.name}, ${pet.type}. ${pet.event}`}
      className="flex items-center gap-2.5 rounded-2xl bg-canvas/70 p-2.5 text-left ring-1 ring-black/[0.04] transition hover:bg-blush-soft/50 active:scale-[0.98]"
    >
      <PetThumb pet={pet} size={44} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-extrabold leading-tight text-charcoal">
          {pet.name}
        </p>
        <p className="text-[11px] font-semibold text-slate">{pet.type}</p>
        <p className="mt-1 flex items-center gap-1 truncate text-[10px] font-bold text-coral">
          <Glyph name={pet.eventIcon} size={12} />
          <span className="truncate">{pet.event}</span>
        </p>
      </div>
      <span className="shrink-0 text-mist">
        <Glyph name="chevronR" size={16} />
      </span>
    </button>
  );
}
