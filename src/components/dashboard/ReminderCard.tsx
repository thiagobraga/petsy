// ReminderCard — "Lembretes / Avisos" list with tone-coded icon chips.

import React from 'react';
import { Glyph } from './icons';
import { SectionCard, CardHeader } from './primitives';
import type { DashReminder, ReminderTone } from './data';

const TONE: Record<ReminderTone, string> = {
  overdue: 'bg-overdue-bg text-overdue',
  current: 'bg-due-bg text-due',
  done: 'bg-done-bg text-done',
};

function ReminderRow({ r }: { r: DashReminder }) {
  return (
    <li className="flex items-start gap-3 py-2">
      <span
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${TONE[r.tone]}`}
      >
        <Glyph name={r.icon} size={15} stroke={2.2} />
      </span>
      <p className="text-[12.5px] font-semibold leading-snug text-charcoal">{r.text}</p>
    </li>
  );
}

export function ReminderCard({ reminders }: { reminders: DashReminder[] }) {
  return (
    <SectionCard>
      <CardHeader icon="bell" title="Lembretes / Avisos" />
      <ul className="mt-1.5 flex flex-col divide-y divide-black/[0.05]">
        {reminders.map((r) => (
          <ReminderRow key={r.id} r={r} />
        ))}
      </ul>
    </SectionCard>
  );
}
