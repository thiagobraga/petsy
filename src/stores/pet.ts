/* eslint-disable no-unused-vars */
import { create } from 'zustand';

export const DEFAULT_PET_NOTES: Record<string, string> = {
  luna: 'Luna tem alergia leve a poeira e ácaros. Apoquel funciona bem. Não come ração com frango. Adora água — leva muito bem ao mar e à banheira.',
  biscoito:
    'Biscoito precisa de pausas curtas durante passeios longos. Monitorar a pele após banho e evitar petiscos com corantes.',
  mel: 'Mel ainda está se adaptando à rotina. Prefere comida úmida à noite e fica mais calma com passeios curtos pela manhã.',
};

interface PetState {
  selectedPetId: string | null;
  petNotes: Record<string, string>;
  selectPet: (petId: string) => void;
  clearSelection: () => void;
  setPetNote: (petId: string, note: string) => void;
}

export const usePetStore = create<PetState>((set) => ({
  selectedPetId: null,
  petNotes: DEFAULT_PET_NOTES,
  selectPet: (petId: string) => {
    set({ selectedPetId: petId });
  },
  clearSelection: () => {
    set({ selectedPetId: null });
  },
  setPetNote: (petId: string, note: string) => {
    set((state) => ({
      petNotes: {
        ...state.petNotes,
        [petId]: note,
      },
    }));
  },
}));
