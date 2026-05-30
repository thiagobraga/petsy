import { useAuthStore } from './auth';
import { usePetStore } from './pet';
import { usePreferencesStore } from './preferences';

// Auth hooks
export const useAuth = () => {
  const { currentUser, isLoggedIn, login, logout, setUser } = useAuthStore();
  return { currentUser, isLoggedIn, login, logout, setUser };
};

// Pet store hook
export const useSelectedPet = () => {
  const { selectedPetId, selectPet, clearSelection } = usePetStore();
  return { selectedPetId, selectPet, clearSelection };
};

// Preferences hook
export const usePreferences = () => {
  const {
    hideCompleted,
    groupByStatus,
    toggleHideCompleted,
    toggleGroupByStatus,
    setHideCompleted,
    setGroupByStatus,
  } = usePreferencesStore();
  return {
    hideCompleted,
    groupByStatus,
    toggleHideCompleted,
    toggleGroupByStatus,
    setHideCompleted,
    setGroupByStatus,
  };
};
