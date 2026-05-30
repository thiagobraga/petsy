import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearAllStorage,
} from '../src/utils/storage';
import {
  saveImage,
  loadImage,
  deleteImage,
  getAllImageIds,
  clearAllImages,
  getTotalImageSize,
} from '../src/utils/imageStorage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('saveToStorage / loadFromStorage', () => {
    it('saves and loads data from localStorage', () => {
      const data = { userId: '123', name: 'John' };
      saveToStorage('auth', data);

      const loaded = loadFromStorage('auth');
      expect(loaded).toEqual(data);
    });

    it('returns default value when key does not exist', () => {
      const defaultValue = { userId: null };
      const loaded = loadFromStorage('auth', defaultValue);

      expect(loaded).toEqual(defaultValue);
    });

    it('returns null when key does not exist and no default provided', () => {
      const loaded = loadFromStorage('auth');
      expect(loaded).toBeNull();
    });
  });

  describe('removeFromStorage', () => {
    it('removes data from localStorage', () => {
      saveToStorage('auth', { userId: '123' });
      removeFromStorage('auth');

      const loaded = loadFromStorage('auth');
      expect(loaded).toBeNull();
    });
  });

  describe('clearAllStorage', () => {
    it('clears all app data from localStorage', () => {
      saveToStorage('auth', { userId: '123' });
      saveToStorage('pet', { selectedPetId: '456' });
      saveToStorage('preferences', { hideCompleted: true });

      clearAllStorage();

      expect(loadFromStorage('auth')).toBeNull();
      expect(loadFromStorage('pet')).toBeNull();
      expect(loadFromStorage('preferences')).toBeNull();
    });
  });
});

describe('Image Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveImage / loadImage', () => {
    it('saves and loads image data', async () => {
      const imageData = 'data:image/webp;base64,UklGRiYAAABXEBP...' as const;
      await saveImage('pet_1', imageData);

      const loaded = loadImage('pet_1');
      expect(loaded).toBe(imageData);
    });

    it('returns null when image does not exist', () => {
      const loaded = loadImage('nonexistent');
      expect(loaded).toBeNull();
    });
  });

  describe('deleteImage', () => {
    it('deletes image from localStorage', async () => {
      const imageData = 'data:image/webp;base64,UklGRiYAAABXEBP...' as const;
      await saveImage('pet_1', imageData);
      deleteImage('pet_1');

      const loaded = loadImage('pet_1');
      expect(loaded).toBeNull();
    });
  });

  describe('getAllImageIds', () => {
    it('returns all stored image IDs', async () => {
      await saveImage('pet_1', 'data1');
      await saveImage('pet_2', 'data2');
      await saveImage('pet_3', 'data3');

      const ids = getAllImageIds();
      expect(ids).toEqual(['pet_1', 'pet_2', 'pet_3']);
    });

    it('returns empty array when no images stored', () => {
      const ids = getAllImageIds();
      expect(ids).toEqual([]);
    });
  });

  describe('clearAllImages', () => {
    it('removes all images from localStorage', async () => {
      await saveImage('pet_1', 'data1');
      await saveImage('pet_2', 'data2');

      clearAllImages();

      const ids = getAllImageIds();
      expect(ids).toEqual([]);
    });
  });

  describe('getTotalImageSize', () => {
    it('calculates total size of stored images', async () => {
      const data1 = 'a'.repeat(100);
      const data2 = 'b'.repeat(200);

      await saveImage('pet_1', data1);
      await saveImage('pet_2', data2);

      const totalSize = getTotalImageSize();
      expect(totalSize).toBe(300);
    });

    it('returns 0 when no images stored', () => {
      const totalSize = getTotalImageSize();
      expect(totalSize).toBe(0);
    });
  });
});
