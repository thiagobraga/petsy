/**
 * Pet management endpoints
 */

import { apiClient } from './client';

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'other';
  breed?: string;
  age?: number;
  weight?: number;
  tone?: string;
  image?: string;
}

export interface PetCreateInput {
  name: string;
  species: Pet['species'];
  breed?: string;
  age?: number;
  weight?: number;
  tone?: string;
}

export const petsApi = {
  /**
   * Get all pets for current user
   */
  getAll: () => apiClient.get<Pet[]>('/pets'),

  /**
   * Get pet by ID
   */
  getById: (petId: string) => apiClient.get<Pet>(`/pets/${petId}`),

  /**
   * Create new pet
   */
  create: (data: PetCreateInput) => apiClient.post<Pet>('/pets', data),

  /**
   * Update pet
   */
  update: (petId: string, data: Partial<PetCreateInput>) =>
    apiClient.put<Pet>(`/pets/${petId}`, data),

  /**
   * Delete pet
   */
  delete: (petId: string) => apiClient.delete<void>(`/pets/${petId}`),

  /**
   * Upload pet photo
   */
  uploadPhoto: (petId: string, photoData: string) =>
    apiClient.post<{ photoUrl: string }>(`/pets/${petId}/photo`, { photoData }),
};
