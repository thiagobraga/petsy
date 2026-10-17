// EventsCard — "Próximos Eventos". Items under 3 days get pink urgency emphasis.

import React from 'react';
import { Glyph } from './icons';
import { SectionCard, CardHeader } from './primitives';
import type { DashEvent } from './data';

function EventRow({ ev }: { ev: DashEvent }) {
  const urgent = ev.days < 3;
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-2xl px-1.5 py-2 text-left transition hover:bg-blush-soft/40"
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
            urgent ? 'bg-overdue-bg text-overdue' : 'bg-blush-soft text-coral'
          }`}
        >
          <Glyph name={ev.icon} size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold leading-tight text-charcoal">{ev.title}</p>
          {ev.date && <p className="mt-0.5 text-[11px] font-semibold text-slate">{ev.date}</p>}
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold ${
            urgent ? 'bg-overdue-bg text-overdue' : 'bg-upcoming-bg text-slate'
          }`}
        >
          {ev.when}
        </span>
        <span className="shrink-0 text-mist">
          <Glyph name="chevronR" size={15} />
        </span>
      </button>
    </li>
  );
}

export function EventsCard({ events }: { events: DashEvent[] }) {
  return (
    <SectionCard>
      <CardHeader icon="calendar" title="Próximos Eventos" action="Ver todos" />
      <ul className="mt-2 flex flex-col gap-0.5">
        {events.map((ev) => (
          <EventRow key={ev.id} ev={ev} />
        ))}
      </ul>
    </SectionCard>
  );
}
