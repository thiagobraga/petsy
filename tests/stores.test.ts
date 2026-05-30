import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../src/stores/auth';
import { usePetStore } from '../src/stores/pet';
import { usePreferencesStore } from '../src/stores/preferences';

describe('Zustand Stores', () => {
  beforeEach(() => {
    // Reset stores before each test
    useAuthStore.setState({ currentUser: null, isLoggedIn: false });
    usePetStore.setState({ selectedPetId: null });
    usePreferencesStore.setState({ hideCompleted: false, groupByStatus: true });
  });

  describe('Auth Store', () => {
    it('initializes with null user and isLoggedIn false', () => {
      const state = useAuthStore.getState();
      expect(state.currentUser).toBeNull();
      expect(state.isLoggedIn).toBe(false);
    });

    it('logs in user with email and password', () => {
      const { login } = useAuthStore.getState();
      login('test@example.com', 'password');

      const state = useAuthStore.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.currentUser?.email).toBe('test@example.com');
      expect(state.currentUser?.name).toBe('test');
    });

    it('logs out user', () => {
      const { login, logout } = useAuthStore.getState();
      login('test@example.com', 'password');
      logout();

      const state = useAuthStore.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.currentUser).toBeNull();
    });
  });

  describe('Pet Store', () => {
    it('initializes with null selectedPetId', () => {
      const state = usePetStore.getState();
      expect(state.selectedPetId).toBeNull();
    });

    it('selects pet by ID', () => {
      const { selectPet } = usePetStore.getState();
      selectPet('pet_123');

      const state = usePetStore.getState();
      expect(state.selectedPetId).toBe('pet_123');
    });

    it('clears pet selection', () => {
      const { selectPet, clearSelection } = usePetStore.getState();
      selectPet('pet_123');
      clearSelection();

      const state = usePetStore.getState();
      expect(state.selectedPetId).toBeNull();
    });
  });

  describe('Preferences Store', () => {
    it('initializes with hideCompleted false and groupByStatus true', () => {
      const state = usePreferencesStore.getState();
      expect(state.hideCompleted).toBe(false);
      expect(state.groupByStatus).toBe(true);
    });

    it('toggles hideCompleted', () => {
      const { toggleHideCompleted } = usePreferencesStore.getState();
      toggleHideCompleted();

      let state = usePreferencesStore.getState();
      expect(state.hideCompleted).toBe(true);

      toggleHideCompleted();
      state = usePreferencesStore.getState();
      expect(state.hideCompleted).toBe(false);
    });

    it('toggles groupByStatus', () => {
      const { toggleGroupByStatus } = usePreferencesStore.getState();
      toggleGroupByStatus();

      let state = usePreferencesStore.getState();
      expect(state.groupByStatus).toBe(false);

      toggleGroupByStatus();
      state = usePreferencesStore.getState();
      expect(state.groupByStatus).toBe(true);
    });

    it('sets preferences directly', () => {
      const { setHideCompleted, setGroupByStatus } = usePreferencesStore.getState();
      setHideCompleted(true);
      setGroupByStatus(false);

      const state = usePreferencesStore.getState();
      expect(state.hideCompleted).toBe(true);
      expect(state.groupByStatus).toBe(false);
    });
  });
});
