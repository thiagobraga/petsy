// PetsCard — "Meus Pets" 2-column grid of pet tiles.

import React from 'react';
import { SectionCard, CardHeader } from './primitives';
import { PetTile } from './PetTile';
import type { DashPet } from './data';

export function PetsCard({
  pets,
  onSelect,
}: {
  pets: DashPet[];
  onSelect?: (id: string) => void;
}) {
  return (
    <SectionCard>
      <CardHeader icon="paw" title="Meus Pets" action="Ver todos" />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {pets.map((pet) => (
          <PetTile key={pet.id} pet={pet} onClick={() => onSelect?.(pet.id)} />
        ))}
      </div>
    </SectionCard>
  );
}
