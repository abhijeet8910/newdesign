import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    accentColor?: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const DetailModal = ({ isOpen, onClose, title, subtitle, accentColor = 'var(--color-accent)', icon, children }: DetailModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50"
                        style={{ backgroundColor: 'rgba(15, 26, 19, 0.6)', backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                        className="fixed inset-x-4 bottom-4 top-auto sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-[28px] shadow-2xl"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-5 rounded-t-[28px]"
                            style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <div className="flex items-center gap-3">
                                {icon && (
                                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: accentColor + '15' }}>
                                        {icon}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
                                    {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>}
                                </div>
                            </div>
                            <button onClick={onClose}
                                className="p-2 rounded-xl transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

/* Reusable detail row used inside modals */
export const DetailRow = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: color || 'var(--color-text-primary)' }}>{value}</span>
    </div>
);
