/**
 * Diary entry management endpoints
 */

import { apiClient } from './client';

export interface DiaryEntry {
  id: string;
  petId: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'sick';
  text: string;
  photos?: string[];
  tags?: string[];
  createdAt: string;
}

export interface DiaryEntryCreateInput {
  petId: string;
  date: string;
  mood: DiaryEntry['mood'];
  text: string;
  photos?: string[];
  tags?: string[];
}

export const diaryApi = {
  /**
   * Get all diary entries for a pet
   */
  getByPetId: (petId: string) => apiClient.get<DiaryEntry[]>(`/pets/${petId}/diary`),

  /**
   * Get diary entry by ID
   */
  getById: (entryId: string) => apiClient.get<DiaryEntry>(`/diary/${entryId}`),

  /**
   * Create diary entry for pet
   */
  create: (data: DiaryEntryCreateInput) =>
    apiClient.post<DiaryEntry>(`/pets/${data.petId}/diary`, data),

  /**
   * Update diary entry
   */
  update: (entryId: string, data: Partial<DiaryEntryCreateInput>) =>
    apiClient.put<DiaryEntry>(`/diary/${entryId}`, data),

  /**
   * Delete diary entry
   */
  delete: (entryId: string) => apiClient.delete<void>(`/diary/${entryId}`),

  /**
   * Get diary entries for specific date range
   */
  getByDateRange: (petId: string, startDate: string, endDate: string) =>
    apiClient.get<DiaryEntry[]>(
      `/pets/${petId}/diary?startDate=${startDate}&endDate=${endDate}`
    ),

  /**
   * Add photo to diary entry
   */
  addPhoto: (entryId: string, photoData: string) =>
    apiClient.post<{ photoUrl: string }>(`/diary/${entryId}/photos`, { photoData }),
};
