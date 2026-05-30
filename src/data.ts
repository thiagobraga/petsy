// Petsy — mock data
export interface Pet {
  id: string;
  name: string;
  breed: string;
  tone: string;
  dob: string;
  age: string;
  sex: string;
  weight: string;
  castrated: { value: boolean; date: string | null };
  color: string;
  microchip: string;
  photo: string;
}

export interface Medicine {
  id: string;
  petId: string;
  name: string;
  purpose: string;
  dose: string;
  frequency: string;
  when: string[];
  start: string;
  end: string;
  color: string;
  days: boolean[];
  next: string;
}

export interface Appointment {
  id: string;
  kind: string;
  petId: string;
  title: string;
  vet: string;
  date: string;
  time: string;
  status: 'next' | 'past';
  notes: string;
}

export interface Exam {
  id: string;
  petId: string;
  title: string;
  date: string;
  status: 'next' | 'past';
  lab: string;
  time: string;
}

export interface DiaryEntry {
  id: string;
  petId: string;
  date: string;
  mood: string;
  title: string;
  body: string;
  photos: string[];
}

export interface MediaItem {
  id: string;
  petId: string;
  date: string;
  tag: string;
}

export const PETS: Pet[] = [
  {
    id: 'luna', name: 'Luna', breed: 'Golden Retriever', tone: 'pink',
    dob: '14/03/2022', age: '4 anos · 2 meses', sex: 'Fêmea', weight: '28,4 kg',
    castrated: { value: true, date: '08/11/2023' },
    color: 'Dourado', microchip: '900 215 444 887 213',
    photo: 'pet-luna',
  },
  {
    id: 'biscoito', name: 'Biscoito', breed: 'Shih Tzu', tone: 'cream',
    dob: '02/07/2020', age: '5 anos · 10 meses', sex: 'Macho', weight: '7,2 kg',
    castrated: { value: true, date: '15/01/2021' },
    color: 'Caramelo & Branco', microchip: '900 215 444 887 008',
    photo: 'pet-biscoito',
  },
  {
    id: 'mel', name: 'Mel', breed: 'SRD · Pequeno porte', tone: 'rose',
    dob: '20/09/2024', age: '1 ano · 8 meses', sex: 'Fêmea', weight: '4,1 kg',
    castrated: { value: false, date: null },
    color: 'Branco & Preto', microchip: '900 215 444 887 519',
    photo: 'pet-mel',
  },
];

export const MEDS: Medicine[] = [
  { id: 'm1', petId: 'luna', name: 'Apoquel', purpose: 'Alergia / coceira',
    dose: '16 mg', frequency: '1× ao dia', when: ['08:00'],
    start: '01/04/2026', end: '30/06/2026',
    color: 'pink',
    days: [true, true, true, false, true, true, false],
    next: 'Hoje, 08:00',
  },
  { id: 'm2', petId: 'luna', name: 'Bravecto', purpose: 'Antipulgas',
    dose: '1000 mg', frequency: 'a cada 12 sem.', when: ['Domingo'],
    start: '14/03/2026', end: '06/06/2026',
    color: 'rose',
    days: [false, false, false, true, false, false, false],
    next: 'Dom, 14/06',
  },
  { id: 'm3', petId: 'biscoito', name: 'Carprofeno', purpose: 'Anti-inflamatório',
    dose: '25 mg', frequency: '2× ao dia', when: ['08:00', '20:00'],
    start: '12/05/2026', end: '26/05/2026',
    color: 'amber',
    days: [true, true, true, true, true, true, true],
    next: 'Hoje, 20:00',
  },
  { id: 'm4', petId: 'mel', name: 'Vermífugo NexGard', purpose: 'Vermifugação',
    dose: '0,5 cp', frequency: 'mensal', when: ['Dia 1'],
    start: '01/01/2026', end: '01/12/2026',
    color: 'sage',
    days: [false, false, false, false, false, false, true],
    next: '01/06, 09:00',
  },
];

export const APPOINTMENTS: Appointment[] = [
  { id: 'a1', kind: 'consulta', petId: 'luna', title: 'Checkup anual',
    vet: 'Dra. Helena Souza · Clínica VetCare', date: '14/05/2026', time: '15:30',
    status: 'next', notes: 'Levar carteirinha de vacinação' },
  { id: 'a2', kind: 'consulta', petId: 'biscoito', title: 'Consulta dermatológica',
    vet: 'Dr. Marco Rezende · PetSaúde', date: '22/05/2026', time: '10:00',
    status: 'next', notes: '' },
  { id: 'a3', kind: 'consulta', petId: 'mel', title: 'Castração',
    vet: 'Dra. Helena Souza · Clínica VetCare', date: '03/06/2026', time: '09:00',
    status: 'next', notes: 'Jejum de 12h antes' },
  { id: 'a4', kind: 'consulta', petId: 'luna', title: 'Vacinação V10',
    vet: 'Clínica VetCare', date: '28/02/2026', time: '14:00',
    status: 'past', notes: 'Reforço anual aplicado' },
];

export const EXAMS: Exam[] = [
  { id: 'e1', petId: 'luna', title: 'Hemograma completo', date: '14/05/2026', status: 'next', lab: 'Lab. VetLab', time: '07:30' },
  { id: 'e2', petId: 'luna', title: 'Ultrassom abdominal', date: '21/05/2026', status: 'next', lab: 'Clínica VetCare', time: '11:00' },
  { id: 'e3', petId: 'biscoito', title: 'Raspado de pele', date: '22/05/2026', status: 'next', lab: 'PetSaúde', time: '10:30' },
  { id: 'e4', petId: 'biscoito', title: 'Painel alérgico', date: '12/04/2026', status: 'past', lab: 'Lab. VetLab', time: '09:00' },
];

export const DIARY: DiaryEntry[] = [
  { id: 'd1', petId: 'luna', date: '26 mai', mood: 'feliz',
    title: 'Primeiro banho de mar', body: 'Luna adorou — entrou correndo na água e ficou meia hora tentando pegar as ondinhas. Em casa, dormiu profundamente.',
    photos: ['ph-luna-1', 'ph-luna-2'] },
  { id: 'd2', petId: 'biscoito', date: '24 mai', mood: 'calmo',
    title: 'Dia tranquilo no escritório', body: 'Ficou no colchãozinho a tarde toda. Comeu bem, urinou normal, sem coceira.',
    photos: [] },
  { id: 'd3', petId: 'mel', date: '22 mai', mood: 'agitado',
    title: 'Reagiu mal ao novo vermífugo', body: 'Ficou sem apetite por 4h após a dose. Vou conversar com a Dra. Helena na próxima consulta.',
    photos: ['ph-mel-1'] },
  { id: 'd4', petId: 'luna', date: '19 mai', mood: 'feliz',
    title: 'Tosa de verão', body: 'Pelos bem mais curtos. Está se coçando menos com o calor.',
    photos: ['ph-luna-3'] },
];

export const MEDIA: MediaItem[] = [
  { id: 'p1', petId: 'luna', date: '26 mai', tag: 'praia' },
  { id: 'p2', petId: 'luna', date: '26 mai', tag: 'praia' },
  { id: 'p3', petId: 'biscoito', date: '24 mai', tag: 'casa' },
  { id: 'p4', petId: 'mel', date: '22 mai', tag: 'parque' },
  { id: 'p5', petId: 'luna', date: '19 mai', tag: 'tosa' },
  { id: 'p6', petId: 'luna', date: '12 mai', tag: 'passeio' },
  { id: 'p7', petId: 'biscoito', date: '10 mai', tag: 'soneca' },
  { id: 'p8', petId: 'mel', date: '08 mai', tag: 'parque' },
  { id: 'p9', petId: 'luna', date: '02 mai', tag: 'casa' },
];

export const petById = (id: string) => PETS.find(p => p.id === id);

declare global {
  interface Window {
    PETS: typeof PETS;
    MEDS: typeof MEDS;
    APPOINTMENTS: typeof APPOINTMENTS;
    EXAMS: typeof EXAMS;
    DIARY: typeof DIARY;
    MEDIA: typeof MEDIA;
    petById: typeof petById;
  }
}

window.PETS = PETS;
window.MEDS = MEDS;
window.APPOINTMENTS = APPOINTMENTS;
window.EXAMS = EXAMS;
window.DIARY = DIARY;
window.MEDIA = MEDIA;
window.petById = petById;
