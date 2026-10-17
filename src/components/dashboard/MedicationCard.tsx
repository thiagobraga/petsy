// MedicationCard — the highlighted "Medicações de Hoje" card.

import React from 'react';
import { SectionCard, CardHeader } from './primitives';
import { MedicationRow } from './MedicationRow';
import type { DashMed } from './data';

export function MedicationCard({
  meds,
  doneIds,
  onToggle,
}: {
  meds: DashMed[];
  doneIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <SectionCard highlight>
      <CardHeader icon="pill" title="Medicações de Hoje" action="Ver todas" />
      <ul className="mt-3 flex flex-col gap-1.5">
        {meds.map((med) => (
          <MedicationRow
            key={med.id}
            med={med}
            status={doneIds.has(med.id) ? 'completed' : med.status}
            onToggle={() => onToggle(med.id)}
          />
        ))}
      </ul>
    </SectionCard>
  );
}
