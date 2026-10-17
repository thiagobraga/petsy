import React from 'react';
import { Dashboard } from '../components/dashboard';

// Dashboard screen — see src/components/dashboard for the implementation,
// recreated from uploads/petsy-dashboard.png (+ sidebar overlay).
export function DashboardScreen() {
  return <Dashboard />;
}

(window as any).DashboardScreen = DashboardScreen;
