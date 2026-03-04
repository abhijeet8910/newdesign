import { create } from 'zustand';
import type { User } from '../types';

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    accessToken: null,
    login: (user, token) => set({ user, isAuthenticated: true, accessToken: token }),
    logout: () => set({ user: null, isAuthenticated: false, accessToken: null }),
}));
