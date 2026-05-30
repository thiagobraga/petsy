/**
 * Medicine management endpoints
 */

import { apiClient } from './client';

export interface Medicine {
  id: string;
  petId: string;
  name: string;
  dosage: string;
  frequency: string;
  when: string[];
  days: number[];
  status?: 'active' | 'inactive';
  notes?: string;
}

export interface MedicineCreateInput {
  petId: string;
  name: string;
  dosage: string;
  frequency: string;
  when: string[];
  days: number[];
  notes?: string;
}

export const medicinesApi = {
  /**
   * Get all medicines for a pet
   */
  getByPetId: (petId: string) => apiClient.get<Medicine[]>(`/pets/${petId}/medicines`),

  /**
   * Get medicine by ID
   */
  getById: (medicineId: string) => apiClient.get<Medicine>(`/medicines/${medicineId}`),

  /**
   * Create medicine for pet
   */
  create: (data: MedicineCreateInput) =>
    apiClient.post<Medicine>(`/pets/${data.petId}/medicines`, data),

  /**
   * Update medicine
   */
  update: (medicineId: string, data: Partial<MedicineCreateInput>) =>
    apiClient.put<Medicine>(`/medicines/${medicineId}`, data),

  /**
   * Delete medicine
   */
  delete: (medicineId: string) => apiClient.delete<void>(`/medicines/${medicineId}`),

  /**
   * Mark medicine as applied
   */
  markApplied: (medicineId: string, appliedAt: string) =>
    apiClient.post<{ appliedAt: string }>(`/medicines/${medicineId}/applied`, {
      appliedAt,
    }),

  /**
   * Get today's medicines for pet
   */
  getTodaysByPetId: (petId: string) =>
    apiClient.get<Medicine[]>(`/pets/${petId}/medicines/today`),
};
