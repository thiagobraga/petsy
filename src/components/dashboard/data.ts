// Dashboard data — layout mirrors uploads/petsy-dashboard.png, cast is the six
// dogs from the redesign spec. Pet identity (id + name) comes from the shared
// catalog in src/data.ts so cards open the same profile as /pets/:petId.
//
// Medications, events and reminders are DEMONSTRATION content: nobody has
// supplied real health records for these dogs yet. Every such entry carries
// `demo: true` so it can be swapped for real data without guessing.

import { petById as catalogPet } from '../../data';

export type MedStatus = 'completed' | 'current' | 'upcoming' | 'overdue';

export type DogId = (typeof DOG_IDS)[number];
export const DOG_IDS = ['meg', 'snoopy', 'lucy', 'kali', 'lila', 'luke'] as const;

// Placeholder palette for portraits until the real photos arrive.
export interface PetTone {
  bg: string;
  fg: string;
}

export interface DashPet {
  id: DogId;
  name: string;
  type: 'Cachorro';
  tone: PetTone;
  /** Short teaser under the name, derived from the pet's next event. */
  event: string;
  eventIcon: string;
}

export interface DashMed {
  id: string;
  name: string;
  petId: DogId;
  time: string;
  frequency: string;
  /** Status as loaded; the dashboard overrides it while the user toggles doses. */
  status: MedStatus;
  lateBy?: string;
  demo: true;
}

export interface DashEvent {
  id: string;
  petId: DogId;
  title: string;
  /** Noun used in the pet card teaser ("Vacinação em 5 dias"). */
  short: string;
  date?: string;
  when: string;
  days: number; // days until; < 3 gets pink emphasis
  icon: string;
  demo: true;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  /** Route to open. Items without one have no screen yet and render as "Em breve". */
  to?: string;
}

const TONES: Record<DogId, PetTone> = {
  meg: { bg: '#ffe9dc', fg: '#a8461b' },
  snoopy: { bg: '#e6eff8', fg: '#2f5f8a' },
  lucy: { bg: '#fff1cf', fg: '#80590a' },
  kali: { bg: '#e7f2e3', fg: '#3b6e31' },
  lila: { bg: '#efe8fb', fg: '#634a9c' },
  luke: { bg: '#ffe6ec', fg: '#a8304f' },
};

export const EVENTS: DashEvent[] = [
  {
    id: 'aniversario-lila',
    petId: 'lila',
    title: 'Aniversário da Lila',
    short: 'Aniversário',
    date: '12 Jun',
    when: 'em 6 dias',
    days: 6,
    icon: 'cake',
    demo: true,
  },
  {
    id: 'consulta-snoopy',
    petId: 'snoopy',
    title: 'Consulta do Snoopy',
    short: 'Consulta',
    when: 'em 2 dias',
    days: 2,
    icon: 'stetho',
    demo: true,
  },
  {
    id: 'vacinacao-meg',
    petId: 'meg',
    title: 'Vacinação da Meg',
    short: 'Vacinação',
    when: 'em 5 dias',
    days: 5,
    icon: 'shield',
    demo: true,
  },
  {
    id: 'castracao-luke',
    petId: 'luke',
    title: 'Alerta de castração do Luke',
    short: 'Castração',
    when: 'em 1 dia',
    days: 1,
    icon: 'alert',
    demo: true,
  },
  {
    id: 'banho-lucy',
    petId: 'lucy',
    title: 'Banho da Lucy',
    short: 'Banho',
    when: 'amanhã',
    days: 1,
    icon: 'bath',
    demo: true,
  },
  {
    id: 'vermifugo-kali',
    petId: 'kali',
    title: 'Vermífugo da Kali',
    short: 'Vermífugo',
    when: 'em 7 dias',
    days: 7,
    icon: 'worm',
    demo: true,
  },
];

/** How many events the dashboard card previews; the rest live in /appointments. */
export const EVENTS_PREVIEW = 4;

export const PETS: DashPet[] = DOG_IDS.map((id) => {
  const next = EVENTS.filter((e) => e.petId === id).sort((a, b) => a.days - b.days)[0];
  return {
    id,
    name: catalogPet(id)?.name ?? id,
    type: 'Cachorro',
    tone: TONES[id],
    event: next ? `${next.short} ${next.when}` : 'Sem eventos próximos',
    eventIcon: next?.icon ?? 'calendar',
  };
});

export const MEDS: DashMed[] = [
  {
    id: 'carprofeno',
    name: 'Carprofeno',
    petId: 'meg',
    time: '08:00',
    frequency: '1x ao dia',
    status: 'completed',
    demo: true,
  },
  {
    id: 'antibiotico',
    name: 'Antibiótico',
    petId: 'snoopy',
    time: '12:00',
    frequency: '2x ao dia',
    status: 'current',
    demo: true,
  },
  {
    id: 'omega',
    name: 'Ômega 3',
    petId: 'lucy',
    time: '18:00',
    frequency: '1x ao dia',
    status: 'upcoming',
    demo: true,
  },
  {
    id: 'colirio',
    name: 'Colírio',
    petId: 'kali',
    time: '09:00',
    frequency: '3x ao dia',
    status: 'overdue',
    lateBy: '1h em atraso',
    demo: true,
  },
];

export const QUICK_ACTIONS: MenuItem[] = [
  { id: 'novo-pet', label: 'Novo Pet', icon: 'plus' },
  { id: 'medicacao', label: 'Medicação', icon: 'capsule', to: '/medicines' },
  { id: 'calendario', label: 'Calendário', icon: 'calendar', to: '/appointments' },
  { id: 'historico', label: 'Histórico', icon: 'history' },
];

export const MENU: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', to: '/dashboard' },
  { id: 'pets', label: 'Meus Pets', icon: 'paw', to: '#meus-pets' },
  { id: 'medicacoes', label: 'Medicações', icon: 'capsule', to: '/medicines' },
  { id: 'calendario', label: 'Calendário / Eventos', icon: 'calendar', to: '/appointments' },
  { id: 'configuracoes', label: 'Configurações', icon: 'gear' },
  { id: 'ajuda', label: 'Ajuda', icon: 'help' },
  { id: 'sair', label: 'Sair', icon: 'logout', to: '/login' },
];

export const petById = (id: string) => PETS.find((p) => p.id === id);

/** Status shown for a dose: local toggle wins over the loaded status. */
export function doseStatus(med: DashMed, done: boolean): MedStatus {
  if (done) return 'completed';
  // A dose that loaded as taken and was unmarked is due again.
  return med.status === 'completed' ? 'current' : med.status;
}

export function overdueLabel(count: number) {
  if (count === 0) return 'Nenhuma medicação em atraso';
  return count === 1 ? '1 medicação em atraso' : `${count} medicações em atraso`;
}
