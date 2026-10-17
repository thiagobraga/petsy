// ReminderCard — "Lembretes / Avisos". Each reminder opens the screen that
// resolves it; all reminders are listed, so there is no "Ver todos" link.

import React from 'react';
import { Glyph } from './icons';
import { FOCUS, SectionCard, CardHeader } from './primitives';

export interface DashReminder {
  id: string;
  text: string;
  icon: string;
  to: string;
}

export function ReminderCard({
  reminders,
  onOpen,
  className,
}: {
  reminders: DashReminder[];
  onOpen?: (to: string) => void;
  className?: string;
}) {
  return (
    <SectionCard titleId="dash-reminders-title" className={className}>
      <CardHeader icon="bell" title="Lembretes / Avisos" titleId="dash-reminders-title" />
      <ul className="mt-1 pb-1.5">
        {reminders.map((r, i) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onOpen?.(r.to)}
              className={`group flex w-full items-stretch gap-3 rounded-2xl text-left transition-colors duration-150 hover:bg-petal ${FOCUS}`}
            >
              <span className="grid w-9 shrink-0 place-items-center">
                <Glyph name={r.icon} size={26} stroke={1.7} className="text-coral" />
              </span>
              <span
                className={`flex min-h-[52px] min-w-0 flex-1 items-center gap-3 py-2.5 ${i === 0 ? '' : 'border-t border-hairline'}`}
              >
                <span className="min-w-0 flex-1 text-[15px] leading-snug text-charcoal">
                  {r.text}
                </span>
                <Glyph
                  name="chevronR"
                  size={18}
                  stroke={2.2}
                  className="shrink-0 text-coral transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
