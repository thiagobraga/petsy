// MedicationRow — a single dose row with status-driven styling.
//   completed → green check + greyed/struck name
//   current   → amber ring + amber pill
//   upcoming  → grey empty circle
//   overdue   → coral fill + "1h em atraso" warning + pink-tinted row

import React from 'react';
import { Glyph } from './icons';
import { PetThumb } from './primitives';
import { petById, type DashMed, type MedStatus } from './data';

const STATUS: Record<
  MedStatus,
  { row: string; indicator: string; pill: string; name: string }
> = {
  completed: {
    row: 'bg-surface',
    indicator: 'bg-done text-white',
    pill: 'bg-done-bg text-done',
    name: 'text-mist line-through',
  },
  current: {
    row: 'bg-due-bg/40 ring-1 ring-due/30',
    indicator: 'border-2 border-due text-due',
    pill: 'bg-due-bg text-due',
    name: 'text-charcoal',
  },
  upcoming: {
    row: 'bg-surface',
    indicator: 'border-2 border-upcoming/60 text-transparent',
    pill: 'bg-upcoming-bg text-upcoming',
    name: 'text-charcoal',
  },
  overdue: {
    row: 'bg-overdue-bg ring-1 ring-overdue/25',
    indicator: 'bg-overdue text-white',
    pill: 'bg-white text-overdue ring-1 ring-overdue/30',
    name: 'text-charcoal',
  },
};

function Indicator({ status }: { status: MedStatus }) {
  if (status === 'completed') return <Glyph name="check" size={14} stroke={3} />;
  if (status === 'overdue') return <Glyph name="alert" size={13} stroke={2.2} />;
  if (status === 'current') return <span className="h-2 w-2 rounded-full bg-due" />;
  return null;
}

export function MedicationRow({
  med,
  status,
  onToggle,
}: {
  med: DashMed;
  status: MedStatus;
  onToggle?: () => void;
}) {
  const c = STATUS[status];
  const pet = petById(med.petId);

  return (
    <li className={`flex items-center gap-3 rounded-2xl px-2.5 py-2.5 ${c.row}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={status === 'completed'}
        aria-label={`Marcar ${med.name} como tomada`}
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${c.indicator}`}
      >
        <Indicator status={status} />
      </button>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-[14px] font-extrabold leading-tight ${c.name}`}>{med.name}</p>
        {med.lateBy && (
          <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-bold text-overdue">
            <Glyph name="alert" size={12} stroke={2.2} />
            {med.lateBy}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {pet && (
          <span className="flex items-center gap-1.5">
            <PetThumb pet={pet} size={24} ring={false} />
            <span className="text-[12px] font-bold text-slate max-[360px]:hidden">{pet.name}</span>
          </span>
        )}
        <span className="w-9 text-right text-[12px] font-bold tabular-nums text-charcoal">
          {med.time}
        </span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-extrabold ${c.pill}`}>
          {med.frequency}
        </span>
      </div>
    </li>
  );
}
