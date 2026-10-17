// EventsCard — "Próximos Eventos". Events under 3 days get pink urgency emphasis.

import React from 'react';
import { Glyph } from './icons';
import { FOCUS, PetPortrait, SectionCard, CardHeader } from './primitives';
import { petById, type DashEvent } from './data';

function EventRow({ ev, first, onOpen }: { ev: DashEvent; first: boolean; onOpen?: () => void }) {
  const urgent = ev.days < 3;
  const pet = petById(ev.petId);
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className={`group flex w-full items-stretch gap-3 rounded-2xl text-left transition-colors duration-150 hover:bg-petal ${FOCUS}`}
      >
        <span className="grid w-9 shrink-0 place-items-center">
          <Glyph name={ev.icon} size={26} stroke={1.7} className="text-coral" />
        </span>
        <span
          className={`flex min-w-0 flex-1 items-center gap-3 py-2.5 ${first ? '' : 'border-t border-hairline'}`}
        >
          {pet && <PetPortrait pet={pet} size={38} decorative />}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15.5px] font-bold leading-tight text-charcoal">
              {ev.title}
            </span>
            {ev.date && <span className="mt-0.5 block text-[13px] text-slate">{ev.date}</span>}
          </span>
          <span
            className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13.5px] font-semibold ${
              urgent ? 'bg-overdue-bg text-overdue-ink' : 'bg-upcoming-bg text-upcoming-ink'
            }`}
          >
            {ev.when}
          </span>
        </span>
      </button>
    </li>
  );
}

export function EventsCard({
  events,
  onOpen,
  onSeeAll,
  className,
}: {
  events: DashEvent[];
  onOpen?: (id: string) => void;
  onSeeAll?: () => void;
  className?: string;
}) {
  return (
    <SectionCard titleId="dash-events-title" className={className}>
      <CardHeader
        icon="calendar"
        title="Próximos Eventos"
        titleId="dash-events-title"
        action="Ver todos"
        onAction={onSeeAll}
      />
      <ul className="mt-1 pb-1.5">
        {events.map((ev, i) => (
          <EventRow key={ev.id} ev={ev} first={i === 0} onOpen={() => onOpen?.(ev.id)} />
        ))}
      </ul>
    </SectionCard>
  );
}
