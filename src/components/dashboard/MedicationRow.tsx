// MedicationRow — a single dose row with status-driven styling.
//   completed → green filled check + green bar + struck, muted name
//   current   → amber outline + amber bar + amber pill
//   upcoming  → grey outline + grey bar + grey pill
//   overdue   → pink outline + pink bar + pink time/pill + "1h em atraso"

import React from 'react';
import { Glyph } from './icons';
import { FOCUS, PetPortrait } from './primitives';
import { petById, type DashMed, type MedStatus } from './data';

const STATUS: Record<
  MedStatus,
  { box: string; bar: string; name: string; time: string; pill: string }
> = {
  completed: {
    box: 'border-done bg-done text-white',
    bar: 'bg-done',
    name: 'font-semibold text-slate line-through decoration-slate/60',
    time: 'text-slate',
    pill: 'bg-done-bg text-done-ink',
  },
  current: {
    box: 'border-due bg-surface',
    bar: 'bg-due',
    name: 'font-bold text-charcoal',
    time: 'font-bold text-charcoal',
    pill: 'bg-due-bg text-due-ink',
  },
  upcoming: {
    box: 'border-upcoming bg-surface',
    bar: 'bg-upcoming',
    name: 'font-bold text-charcoal',
    time: 'text-slate',
    pill: 'bg-upcoming-bg text-upcoming-ink',
  },
  overdue: {
    box: 'border-overdue bg-surface',
    bar: 'bg-overdue',
    name: 'font-bold text-charcoal',
    time: 'font-semibold text-overdue-ink',
    pill: 'bg-overdue-bg text-overdue-ink',
  },
};

export function MedicationRow({
  med,
  status,
  first = false,
  onToggle,
}: {
  med: DashMed;
  status: MedStatus;
  first?: boolean;
  onToggle?: () => void;
}) {
  const c = STATUS[status];
  const pet = petById(med.petId);
  const done = status === 'completed';

  return (
    <li className="flex items-stretch">
      {/* 44px hit area around the 22px box */}
      <div className="flex w-10 shrink-0 items-center sm:w-12">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          aria-label={`Marcar ${med.name} como tomada`}
          className={`-ml-[11px] grid h-11 w-11 shrink-0 place-items-center rounded-xl ${FOCUS}`}
        >
          <span
            className={`grid h-[22px] w-[22px] place-items-center rounded-[6px] border-2 transition-colors duration-150 ${c.box}`}
          >
            {done && <Glyph name="check" size={14} stroke={3} />}
          </span>
        </button>
      </div>

      <div
        className={`flex min-w-0 flex-1 items-center gap-2.5 py-3 sm:gap-3.5 ${first ? '' : 'border-t border-hairline'}`}
      >
        <span className={`w-[3px] self-stretch rounded-full ${c.bar}`} aria-hidden="true" />

        <div className="min-w-0 flex-1">
          <p className={`truncate text-[15.5px] leading-tight ${c.name}`}>{med.name}</p>
          {status === 'overdue' && med.lateBy && (
            <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-overdue-ink">
              <Glyph name="alert" size={15} stroke={2.2} className="text-overdue" />
              {med.lateBy}
            </p>
          )}
        </div>

        {pet && (
          <span className="flex shrink-0 items-center gap-2">
            <PetPortrait pet={pet} size={30} decorative />
            <span className="w-14 truncate text-[14.5px] font-semibold text-charcoal @max-[25rem]:sr-only">
              {pet.name}
            </span>
          </span>
        )}

        <span className={`w-11 shrink-0 text-right text-[14.5px] tabular-nums ${c.time}`}>
          {med.time}
        </span>

        <span
          className={`shrink-0 whitespace-nowrap rounded-lg px-2 py-1 text-[12.5px] font-semibold ${c.pill}`}
        >
          {med.frequency}
        </span>
      </div>
    </li>
  );
}
