// Dashboard — Petsy mobile home. Recreates uploads/petsy-dashboard.png and the
// right-drawer overlay from uploads/petsy-dashboard-sidebar.png.

import React from 'react';
import { Glyph } from './icons';
import { QuickAction } from './QuickAction';
import { MedicationCard } from './MedicationCard';
import { PetsCard } from './PetsCard';
import { EventsCard } from './EventsCard';
import { ReminderCard } from './ReminderCard';
import { SidebarOverlay } from './SidebarOverlay';
import { MEDS, PETS, EVENTS, REMINDERS, QUICK_ACTIONS } from './data';
import iconImage from '../../assets/petsy-icon-transparent.png';

// Faint hearts + paws scattered behind the content.
function DecorativeBackground() {
  const marks = [
    { icon: 'heart', size: 22, top: '6%', left: '6%', o: 0.5 },
    { icon: 'paw', size: 30, top: '14%', right: '8%', o: 0.35 },
    { icon: 'heart', size: 14, top: '30%', right: '14%', o: 0.45 },
    { icon: 'paw', size: 20, top: '46%', left: '5%', o: 0.3 },
    { icon: 'heart', size: 26, top: '64%', right: '6%', o: 0.4 },
    { icon: 'paw', size: 18, top: '80%', left: '10%', o: 0.3 },
    { icon: 'heart', size: 16, top: '90%', right: '16%', o: 0.4 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {marks.map((m, i) => (
        <span
          key={i}
          className="absolute text-blush"
          style={{ top: m.top, left: m.left, right: m.right, opacity: m.o }}
        >
          <Glyph name={m.icon} size={m.size} />
        </span>
      ))}
    </div>
  );
}

export function Dashboard() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [doneIds, setDoneIds] = React.useState<Set<string>>(
    () => new Set(MEDS.filter((m) => m.status === 'completed').map((m) => m.id))
  );

  const toggleMed = (id: string) =>
    setDoneIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div
      className="flex h-dvh w-full justify-center overflow-hidden bg-canvas font-body text-charcoal"
      data-screen-label="02 · Dashboard"
    >
      <div className="relative flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-canvas">
        <div className="relative flex-1 overflow-y-auto overscroll-contain">
          <DecorativeBackground />

          {/* header */}
          <header className="relative z-10 flex items-start justify-between px-5 pb-1 pt-7">
            <div>
              <h1 className="text-[30px] font-extrabold leading-none tracking-tight text-charcoal">
                Olá!
              </h1>
              <p className="mt-2 text-[13px] font-semibold text-slate">
                Vamos cuidar dos seus pets hoje
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface shadow-[0_8px_18px_-6px_rgba(255,90,126,0.5)] ring-2 ring-coral/40 transition hover:ring-coral active:scale-95"
            >
              <img src={iconImage} alt="" className="h-7 w-7 object-contain" />
            </button>
          </header>

          {/* content */}
          <main className="relative z-10 flex flex-col gap-5 px-5 pb-10 pt-4">
            {/* quick actions */}
            <div className="flex gap-2.5">
              {QUICK_ACTIONS.map((q) => (
                <QuickAction key={q.id} icon={q.icon} label={q.label} />
              ))}
            </div>

            <MedicationCard meds={MEDS} doneIds={doneIds} onToggle={toggleMed} />
            <PetsCard pets={PETS} />
            <EventsCard events={EVENTS} />
            <ReminderCard reminders={REMINDERS} />
          </main>
        </div>

        <SidebarOverlay
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          active="dashboard"
          onNavigate={() => setMenuOpen(false)}
        />
      </div>
    </div>
  );
}
