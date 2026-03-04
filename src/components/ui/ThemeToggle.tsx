import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
            style={{
                backgroundColor: isDark ? 'var(--color-surface)' : '#E2E8F0',
            }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                style={{
                    backgroundColor: isDark ? '#A2BFA6' : '#FFFFFF',
                }}
                animate={{ x: isDark ? 22 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-[#1A2E20]" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-[#E65100]" />
                )}
            </motion.div>
        </motion.button>
    );
};
