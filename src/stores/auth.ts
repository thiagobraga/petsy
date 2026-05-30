import { create } from 'zustand';

interface AuthState {
  currentUser: { id: string; email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUser: (user: AuthState['currentUser']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isLoggedIn: false,
  login: (email: string, password: string) => {
    // Mock authentication: accept any email/password
    const user = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
    };
    set({ currentUser: user, isLoggedIn: true });
  },
  logout: () => {
    set({ currentUser: null, isLoggedIn: false });
  },
  setUser: (user) => {
    set({ currentUser: user, isLoggedIn: !!user });
  },
}));
