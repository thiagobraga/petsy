/**
 * localStorage-based image persistence using base64 WebP encoding.
 * Handles storage and retrieval of image data with automatic cleanup.
 */

const IMAGE_STORAGE_PREFIX = 'image_';
const MAX_IMAGE_SIZE = 500 * 1024; // 500KB per image

export interface ImageStorageOptions {
  maxSize?: number;
  format?: 'webp' | 'png' | 'jpeg';
}

/**
 * Save image to localStorage
 * @param imageId Unique identifier for the image
 * @param dataUrl Base64 or blob URL of the image
 * @param options Storage options
 */
export async function saveImage(
  imageId: string,
  dataUrl: string,
  options: ImageStorageOptions = {}
): Promise<boolean> {
  try {
    const maxSize = options.maxSize || MAX_IMAGE_SIZE;

    // Check size
    if (dataUrl.length > maxSize) {
      console.warn(`Image ${imageId} exceeds size limit (${dataUrl.length} > ${maxSize})`);
      return false;
    }

    const key = `${IMAGE_STORAGE_PREFIX}${imageId}`;
    localStorage.setItem(key, dataUrl);
    return true;
  } catch (error) {
    console.error(`Failed to save image ${imageId}:`, error);
    return false;
  }
}

/**
 * Load image from localStorage
 */
export function loadImage(imageId: string): string | null {
  try {
    const key = `${IMAGE_STORAGE_PREFIX}${imageId}`;
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to load image ${imageId}:`, error);
    return null;
  }
}

/**
 * Delete image from localStorage
 */
export function deleteImage(imageId: string): boolean {
  try {
    const key = `${IMAGE_STORAGE_PREFIX}${imageId}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to delete image ${imageId}:`, error);
    return false;
  }
}

/**
 * Get all stored image IDs
 */
export function getAllImageIds(): string[] {
  const ids: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_STORAGE_PREFIX)) {
        ids.push(key.replace(IMAGE_STORAGE_PREFIX, ''));
      }
    }
  } catch (error) {
    console.error('Failed to get image IDs:', error);
  }
  return ids;
}

/**
 * Clear all stored images
 */
export function clearAllImages(): boolean {
  try {
    const ids = getAllImageIds();
    ids.forEach((id) => deleteImage(id));
    return true;
  } catch (error) {
    console.error('Failed to clear images:', error);
    return false;
  }
}

/**
 * Get total size of all stored images (in bytes)
 */
export function getTotalImageSize(): number {
  let total = 0;
  try {
    const ids = getAllImageIds();
    ids.forEach((id) => {
      const image = loadImage(id);
      if (image) {
        total += image.length;
      }
    });
  } catch (error) {
    console.error('Failed to calculate image size:', error);
  }
  return total;
}
