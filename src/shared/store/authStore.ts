import { create } from 'zustand';
import { AuthSession, AuthService } from '../services/authService';

interface AuthStoreState {
  user: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUserSession: (session: AuthSession | null) => void;
  initializeSession: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUserSession: (session) =>
    set({
      user: session,
      isAuthenticated: !!session,
      isLoading: false,
    }),

  initializeSession: () => {
    // Read local browser document cookies to see if active mock session is active
    if (typeof window === 'undefined') return;

    const hasSession = document.cookie.includes('mock-session-active=true');
    if (hasSession) {
      set({
        user: {
          userId: '123e4567-e89b-12d3-a456-426614174000',
          email: 'alex.rivera@example.com',
          fullName: 'Alex Rivera',
          role: 'student',
          tenantId: 'example.com',
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await AuthService.logout();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
