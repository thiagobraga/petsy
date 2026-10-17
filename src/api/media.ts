/**
 * Media/photo management endpoints
 */

import { apiClient } from './client';

export interface MediaItem {
  id: string;
  petId: string;
  url: string;
  thumbnailUrl?: string;
  album?: string;
  uploadedAt: string;
  tags?: string[];
}

export interface MediaCreateInput {
  petId: string;
  photoData: string;
  album?: string;
  tags?: string[];
}

export const mediaApi = {
  /**
   * Get all media for a pet
   */
  getByPetId: (petId: string) => apiClient.get<MediaItem[]>(`/pets/${petId}/media`),

  /**
   * Get media item by ID
   */
  getById: (mediaId: string) => apiClient.get<MediaItem>(`/media/${mediaId}`),

  /**
   * Upload photo for pet
   */
  upload: (data: MediaCreateInput) =>
    apiClient.post<MediaItem>(`/pets/${data.petId}/media`, {
      photoData: data.photoData,
      album: data.album,
      tags: data.tags,
    }),

  /**
   * Delete media item
   */
  delete: (mediaId: string) => apiClient.delete<void>(`/media/${mediaId}`),

  /**
   * Get media by album
   */
  getByAlbum: (petId: string, album: string) =>
    apiClient.get<MediaItem[]>(`/pets/${petId}/media/albums/${album}`),

  /**
   * Get all albums for pet
   */
  getAlbums: (petId: string) => apiClient.get<string[]>(`/pets/${petId}/media/albums`),

  /**
   * Add tags to media item
   */
  addTags: (mediaId: string, tags: string[]) =>
    apiClient.post<MediaItem>(`/media/${mediaId}/tags`, { tags }),

  /**
   * Delete tags from media item
   */
  removeTags: (mediaId: string, tags: string[]) =>
    apiClient.delete<MediaItem>(`/media/${mediaId}/tags?tags=${tags.join(',')}`),
};
