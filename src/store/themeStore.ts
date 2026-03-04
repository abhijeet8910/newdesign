import { create } from 'zustand';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: (localStorage.getItem('aswamithra-theme') as 'light' | 'dark') || 'light',
    toggleTheme: () =>
        set((state) => {
            const next = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('aswamithra-theme', next);
            document.documentElement.classList.toggle('dark', next === 'dark');
            return { theme: next };
        }),
}));

// Initialize on first load
const saved = localStorage.getItem('aswamithra-theme') || 'light';
document.documentElement.classList.toggle('dark', saved === 'dark');
