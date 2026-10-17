// MedicationCard — "Medicações de Hoje". The dashboard owns which doses are
// taken; each row's status is derived from that, never from the loaded data.

import React from 'react';
import { SectionCard, CardHeader } from './primitives';
import { MedicationRow } from './MedicationRow';
import { doseStatus, type DashMed } from './data';

export function MedicationCard({
  meds,
  doneIds,
  onToggle,
  onSeeAll,
  className,
}: {
  meds: DashMed[];
  doneIds: Set<string>;
  onToggle: (id: string) => void;
  onSeeAll?: () => void;
  className?: string;
}) {
  return (
    <SectionCard titleId="dash-meds-title" className={`@container ${className ?? ''}`}>
      <CardHeader
        icon="capsule"
        title="Medicações de Hoje"
        titleId="dash-meds-title"
        action="Ver todas"
        onAction={onSeeAll}
        divider
      />
      <ul className="pb-1">
        {meds.map((med, i) => (
          <MedicationRow
            key={med.id}
            med={med}
            first={i === 0}
            status={doseStatus(med, doneIds.has(med.id))}
            onToggle={() => onToggle(med.id)}
          />
        ))}
      </ul>
    </SectionCard>
  );
}
