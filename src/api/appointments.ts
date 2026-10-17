/**
 * Appointment management endpoints
 */

import { apiClient } from './client';

export interface Appointment {
  id: string;
  petId: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  veterinarian?: string;
  notes?: string;
  status: 'next' | 'past' | 'cancelled';
}

export interface AppointmentCreateInput {
  petId: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  veterinarian?: string;
  notes?: string;
}

export const appointmentsApi = {
  /**
   * Get all appointments for a pet
   */
  getByPetId: (petId: string) => apiClient.get<Appointment[]>(`/pets/${petId}/appointments`),

  /**
   * Get appointment by ID
   */
  getById: (appointmentId: string) => apiClient.get<Appointment>(`/appointments/${appointmentId}`),

  /**
   * Create appointment for pet
   */
  create: (data: AppointmentCreateInput) =>
    apiClient.post<Appointment>(`/pets/${data.petId}/appointments`, data),

  /**
   * Update appointment
   */
  update: (appointmentId: string, data: Partial<AppointmentCreateInput>) =>
    apiClient.put<Appointment>(`/appointments/${appointmentId}`, data),

  /**
   * Delete appointment
   */
  delete: (appointmentId: string) => apiClient.delete<void>(`/appointments/${appointmentId}`),

  /**
   * Get upcoming appointments for pet
   */
  getUpcoming: (petId: string) =>
    apiClient.get<Appointment[]>(`/pets/${petId}/appointments/upcoming`),

  /**
   * Get past appointments for pet
   */
  getPast: (petId: string) => apiClient.get<Appointment[]>(`/pets/${petId}/appointments/past`),
};
