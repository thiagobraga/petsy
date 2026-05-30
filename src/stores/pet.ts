import { create } from 'zustand';

interface PetState {
  selectedPetId: string | null;
  selectPet: (petId: string) => void;
  clearSelection: () => void;
}

export const usePetStore = create<PetState>((set) => ({
  selectedPetId: null,
  selectPet: (petId: string) => {
    set({ selectedPetId: petId });
  },
  clearSelection: () => {
    set({ selectedPetId: null });
  },
}));
