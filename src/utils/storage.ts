/**
 * localStorage utility for persisting and loading app state.
 * Handles serialization/deserialization with error handling.
 */

export interface StorageKey {
  auth: 'auth_state';
  pet: 'pet_state';
  preferences: 'preferences_state';
}

const STORAGE_KEYS: Record<keyof StorageKey, string> = {
  auth: 'auth_state',
  pet: 'pet_state',
  preferences: 'preferences_state',
};

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: keyof StorageKey, data: T): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS[key], serialized);
    return true;
  } catch (error) {
    console.error(`Failed to save ${String(key)} to localStorage:`, error);
    return false;
  }
}

/**
 * Load data from localStorage
 */
export function loadFromStorage<T>(key: keyof StorageKey, defaultValue?: T): T | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[key]);
    if (!stored) {
      return defaultValue || null;
    }
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Failed to load ${String(key)} from localStorage:`, error);
    return defaultValue || null;
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: keyof StorageKey): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS[key]);
    return true;
  } catch (error) {
    console.error(`Failed to remove ${String(key)} from localStorage:`, error);
    return false;
  }
}

/**
 * Clear all app data from localStorage
 */
export function clearAllStorage(): boolean {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
}
