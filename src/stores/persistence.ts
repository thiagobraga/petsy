import { saveToStorage, loadFromStorage } from '../utils/storage';
import { useAuthStore } from './auth';
import { usePetStore } from './pet';
import { usePreferencesStore } from './preferences';

/**
 * Persist auth store changes to localStorage
 */
export function persistAuthStore() {
  useAuthStore.subscribe(
    (state) => state.currentUser,
    (currentUser) => {
      saveToStorage('auth', { currentUser });
    }
  );

  useAuthStore.subscribe(
    (state) => state.isLoggedIn,
    (isLoggedIn) => {
      const state = useAuthStore.getState();
      saveToStorage('auth', { currentUser: state.currentUser, isLoggedIn });
    }
  );
}

/**
 * Persist pet store changes to localStorage
 */
export function persistPetStore() {
  usePetStore.subscribe(
    (state) => state.selectedPetId,
    (selectedPetId) => {
      saveToStorage('pet', { selectedPetId });
    }
  );
}

/**
 * Persist preferences store changes to localStorage
 */
export function persistPreferencesStore() {
  usePreferencesStore.subscribe(
    (state) => ({ hideCompleted: state.hideCompleted, groupByStatus: state.groupByStatus }),
    (prefs) => {
      saveToStorage('preferences', prefs);
    }
  );
}

/**
 * Initialize all store persistence listeners
 */
export function initializePersistence() {
  persistAuthStore();
  persistPetStore();
  persistPreferencesStore();
}

/**
 * Hydrate stores from localStorage on app startup
 */
export function hydrateStoresFromStorage() {
  // Hydrate auth store
  const authData = loadFromStorage('auth', { currentUser: null, isLoggedIn: false });
  if (authData) {
    useAuthStore.setState(authData);
  }

  // Hydrate pet store
  const petData = loadFromStorage('pet', { selectedPetId: null });
  if (petData) {
    usePetStore.setState(petData);
  }

  // Hydrate preferences store
  const preferencesData = loadFromStorage('preferences', {
    hideCompleted: false,
    groupByStatus: true,
  });
  if (preferencesData) {
    usePreferencesStore.setState(preferencesData);
  }
}
