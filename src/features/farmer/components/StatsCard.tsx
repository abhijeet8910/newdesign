import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    delay?: number;
    color?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, trendUp, delay = 0, color = '#4B6D53' }: StatsCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-elevated)' }}
            className="p-5 sm:p-6 rounded-[28px] transition-all duration-300 cursor-pointer"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{title}</h3>
                <div className="p-2 rounded-xl" style={{ backgroundColor: color + '15' }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{value}</span>
                {trend && (
                    <span className={`text-xs font-bold ${trendUp ? 'text-emerald-500' : 'text-red-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </motion.div>
    );
};
