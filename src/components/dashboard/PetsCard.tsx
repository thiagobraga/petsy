// PetsCard — "Meus Pets" grid of pet tiles. Every pet is listed, so there is no
// "Ver todos" link.

import React from 'react';
import { SectionCard, CardHeader } from './primitives';
import { PetTile } from './PetTile';
import type { DashPet } from './data';

export function PetsCard({
  pets,
  onSelect,
  className,
}: {
  pets: DashPet[];
  onSelect?: (id: string) => void;
  className?: string;
}) {
  return (
    <SectionCard
      id="meus-pets"
      titleId="dash-pets-title"
      className={`@container pb-4! ${className ?? ''}`}
    >
      <CardHeader icon="paw" title="Meus Pets" titleId="dash-pets-title" />
      <ul className="mt-2 grid grid-cols-1 gap-2.5 @[18rem]:grid-cols-2 @[40rem]:grid-cols-3">
        {pets.map((pet) => (
          <li key={pet.id} className="@container flex min-w-0">
            <PetTile pet={pet} onClick={() => onSelect?.(pet.id)} />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
