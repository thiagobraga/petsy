// Dashboard mock data — mirrors uploads/petsy-dashboard.png exactly.
// Kept local to the dashboard so the global fixtures (src/data.ts) and the
// other screens/tests stay untouched.

export type MedStatus = 'completed' | 'current' | 'upcoming' | 'overdue';

export interface DashPet {
  id: string;
  name: string;
  type: 'Cachorro' | 'Gato';
  emoji: string;
  event: string;
  eventIcon: string;
  ring: string; // thumbnail ring color
  bg: string; // thumbnail background
}

export interface DashMed {
  id: string;
  name: string;
  petId: string;
  time: string;
  frequency: string;
  status: MedStatus;
  lateBy?: string;
}

export interface DashEvent {
  id: string;
  title: string;
  date?: string;
  when: string;
  days: number; // days-until, drives urgency (<3 = pink emphasis)
  icon: string;
}

export type ReminderTone = 'overdue' | 'current' | 'done';
export interface DashReminder {
  id: string;
  text: string;
  icon: string;
  tone: ReminderTone;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

export const PETS: DashPet[] = [
  {
    id: 'mel',
    name: 'Mel',
    type: 'Cachorro',
    emoji: '🐶',
    event: 'Vacinação em 5 dias',
    eventIcon: 'syringe',
    ring: '#FFC9A3',
    bg: '#FFF1E8',
  },
  {
    id: 'thor',
    name: 'Thor',
    type: 'Cachorro',
    emoji: '🐕',
    event: 'Banho amanhã',
    eventIcon: 'droplet',
    ring: '#A9C9FF',
    bg: '#EEF4FF',
  },
  {
    id: 'nina',
    name: 'Nina',
    type: 'Gato',
    emoji: '🐱',
    event: 'Consulta em 2 dias',
    eventIcon: 'stetho',
    ring: '#A8E6CF',
    bg: '#EAF8F1',
  },
  {
    id: 'luna',
    name: 'Luna',
    type: 'Gato',
    emoji: '🐈',
    event: 'Vermífugo em 7 dias',
    eventIcon: 'pill',
    ring: '#D6C3FF',
    bg: '#F3EEFF',
  },
];

export const MEDS: DashMed[] = [
  { id: 'carprofeno', name: 'Carprofeno', petId: 'mel', time: '08:00', frequency: '1x ao dia', status: 'completed' },
  { id: 'antibiotico', name: 'Antibiótico', petId: 'thor', time: '12:00', frequency: '2x ao dia', status: 'current' },
  { id: 'omega', name: 'Ômega 3', petId: 'nina', time: '18:00', frequency: '1x ao dia', status: 'upcoming' },
  {
    id: 'colirio',
    name: 'Colírio',
    petId: 'luna',
    time: '09:00',
    frequency: '3x ao dia',
    status: 'overdue',
    lateBy: '1h em atraso',
  },
];

export const EVENTS: DashEvent[] = [
  { id: 'aniversario', title: 'Aniversário da Nina', date: '12 Jun', when: 'em 6 dias', days: 6, icon: 'gift' },
  { id: 'consulta', title: 'Consulta do Thor', when: 'em 2 dias', days: 2, icon: 'stetho' },
  { id: 'vacinacao', title: 'Vacinação da Mel', when: 'em 5 dias', days: 5, icon: 'syringe' },
  { id: 'castracao', title: 'Alerta de castração da Luna', when: 'em 1 dia', days: 1, icon: 'scissors' },
];

export const REMINDERS: DashReminder[] = [
  { id: 'late', text: '1 medicação em atraso', icon: 'alert', tone: 'overdue' },
  { id: 'consulta', text: 'Thor tem consulta esta semana', icon: 'stetho', tone: 'current' },
  {
    id: 'carteirinha',
    text: 'Todos os pets estão com carteirinha em dia, exceto Luna',
    icon: 'check',
    tone: 'done',
  },
];

export const QUICK_ACTIONS: MenuItem[] = [
  { id: 'novo-pet', label: 'Novo Pet', icon: 'plus' },
  { id: 'medicacao', label: 'Medicação', icon: 'pill' },
  { id: 'calendario', label: 'Calendário', icon: 'calendar' },
  { id: 'historico', label: 'Histórico', icon: 'clock' },
];

export const MENU: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'pets', label: 'Meus Pets', icon: 'paw' },
  { id: 'medicacoes', label: 'Medicações', icon: 'pill' },
  { id: 'calendario', label: 'Calendário / Eventos', icon: 'calendar' },
  { id: 'configuracoes', label: 'Configurações', icon: 'gear' },
  { id: 'ajuda', label: 'Ajuda', icon: 'help' },
  { id: 'sair', label: 'Sair', icon: 'logout' },
];

export const petById = (id: string) => PETS.find((p) => p.id === id);
