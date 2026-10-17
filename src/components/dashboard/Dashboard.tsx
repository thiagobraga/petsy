// Dashboard — Petsy home. Recreates uploads/petsy-dashboard.png and the
// right-drawer overlay from uploads/petsy-dashboard-sidebar.png.
// Phone: one column in the reference order. Desktop: meds | pets, events | reminders.

import React from 'react';
import { useLocation } from 'wouter';
import { Glyph } from './icons';
import { QuickAction } from './QuickAction';
import { MedicationCard } from './MedicationCard';
import { PetsCard } from './PetsCard';
import { EventsCard } from './EventsCard';
import { ReminderCard, type DashReminder } from './ReminderCard';
import { SidebarOverlay } from './SidebarOverlay';
import { FOCUS } from './primitives';
import {
  EVENTS,
  EVENTS_PREVIEW,
  MEDS,
  PETS,
  QUICK_ACTIONS,
  doseStatus,
  overdueLabel,
  type MenuItem,
} from './data';
import { usePetStore } from '../../stores/pet';
import { useAuthStore } from '../../stores/auth';
import iconImage from '../../assets/petsy-icon-transparent.png';

// Faint hearts + paws scattered behind the content, as in the reference.
const MARKS = [
  { icon: 'heart', size: 26, top: '4.6%', left: '39%', o: 0.55 },
  { icon: 'paw', size: 30, top: '6.4%', left: '61%', o: 0.4 },
  { icon: 'heart', size: 14, top: '39%', left: '2.5%', o: 0.45 },
  { icon: 'paw', size: 20, top: '43.5%', left: '2%', o: 0.35 },
  { icon: 'heart', size: 13, top: '55%', right: '3%', o: 0.4 },
  { icon: 'paw', size: 22, top: '58.6%', right: '1.5%', o: 0.35 },
  { icon: 'paw', size: 22, top: '95%', left: '2.5%', o: 0.35 },
];

function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {MARKS.map((m, i) => (
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

// Demo reminders (see data.ts); the overdue count is live.
const STATIC_REMINDERS: DashReminder[] = [
  {
    id: 'consulta',
    text: 'Snoopy tem consulta esta semana',
    icon: 'stetho',
    to: '/appointments',
  },
  {
    id: 'carteirinha',
    text: 'Todos os pets estão com carteirinha em dia, exceto Kali',
    icon: 'idCard',
    to: '/pets/kali',
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function Dashboard() {
  const [, navigate] = useLocation();
  const selectPet = usePetStore((s) => s.selectPet);
  const logout = useAuthStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [doneIds, setDoneIds] = React.useState<Set<string>>(
    () => new Set(MEDS.filter((m) => m.status === 'completed').map((m) => m.id))
  );

  const toggleMed = (id: string) =>
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const overdue = MEDS.filter((m) => doseStatus(m, doneIds.has(m.id)) === 'overdue').length;
  const reminders: DashReminder[] = [
    { id: 'atraso', text: overdueLabel(overdue), icon: 'capsule', to: '/medicines' },
    ...STATIC_REMINDERS,
  ];

  const openPet = (id: string) => {
    selectPet(id);
    navigate(`/pets/${id}`);
  };

  // The page scrolls on the document, so overscroll shows the body: match it.
  React.useLayoutEffect(() => {
    const { body, documentElement: html } = document;
    const prev = [body.style.background, html.style.background];
    body.style.background = html.style.background = 'var(--color-canvas)';
    return () => {
      [body.style.background, html.style.background] = prev;
    };
  }, []);

  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  const onMenu = (item: MenuItem) => {
    setMenuOpen(false);
    if (!item.to || item.to === '/dashboard') return;
    if (item.to.startsWith('#')) {
      const target = document.getElementById(item.to.slice(1));
      target?.scrollIntoView?.({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
      return;
    }
    if (item.id === 'sair') logout();
    navigate(item.to);
  };

  return (
    <div
      className="relative min-h-dvh overflow-x-clip bg-canvas font-body text-charcoal"
      data-screen-label="02 · Dashboard"
    >
      <DecorativeBackground />

      <div className="relative mx-auto w-full max-w-[34rem] px-[clamp(1rem,6.4vw,2rem)] pb-12 pt-[clamp(2.5rem,11vw,3.5rem)] md:max-w-[46rem] lg:max-w-[76rem] lg:px-10 lg:pt-14">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0 pt-1">
            <h1 className="text-[clamp(2.125rem,8.8vw,2.625rem)] font-extrabold leading-none tracking-[-0.025em] text-charcoal">
              Olá!
            </h1>
            <p className="mt-1.5 text-[clamp(0.9375rem,3.7vw,1.0625rem)] text-slate">
              Vamos cuidar dos seus pets hoje
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className={`-mt-3 grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-hairline bg-surface shadow-tile transition duration-150 hover:border-blush active:scale-95 motion-reduce:transform-none ${FOCUS}`}
          >
            <img src={iconImage} alt="" className="w-8 object-contain" />
          </button>
        </header>

        <nav
          aria-label="Ações rápidas"
          className="mt-5 grid grid-cols-4 gap-[clamp(0.5rem,2.3vw,0.75rem)] lg:mt-8 lg:max-w-[38rem]"
        >
          {QUICK_ACTIONS.map((q) => (
            <QuickAction
              key={q.id}
              icon={q.icon}
              label={q.label}
              onClick={q.to ? () => navigate(q.to!) : undefined}
            />
          ))}
        </nav>

        <main className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 lg:mt-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-6">
          <MedicationCard
            meds={MEDS}
            doneIds={doneIds}
            onToggle={toggleMed}
            onSeeAll={() => navigate('/medicines')}
          />
          <PetsCard pets={PETS} onSelect={openPet} />
          <EventsCard
            events={EVENTS.slice(0, EVENTS_PREVIEW)}
            onOpen={() => navigate('/appointments')}
            onSeeAll={() => navigate('/appointments')}
          />
          <ReminderCard reminders={reminders} onOpen={navigate} />
        </main>
      </div>

      <SidebarOverlay open={menuOpen} onClose={closeMenu} active="dashboard" onNavigate={onMenu} />
    </div>
  );
}
