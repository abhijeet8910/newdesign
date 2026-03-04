import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';

const data = [
    { name: 'Jan', sales: 4000, expenses: 2400 },
    { name: 'Feb', sales: 3000, expenses: 1398 },
    { name: 'Mar', sales: 2000, expenses: 9800 },
    { name: 'Apr', sales: 2780, expenses: 3908 },
    { name: 'May', sales: 1890, expenses: 4800 },
    { name: 'Jun', sales: 2390, expenses: 3800 },
    { name: 'Jul', sales: 3490, expenses: 4300 },
];

export const EarningsChart = () => {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="p-6 rounded-[28px] h-full transition-colors"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Sales Trend</h3>
                <select className="text-sm rounded-xl px-3 py-1.5 focus:outline-none font-semibold transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                    }}>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isDark ? '#A2BFA6' : '#4B6D53'} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={isDark ? '#A2BFA6' : '#4B6D53'} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#5B6B65' : '#5B6B65', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#5B6B65' : '#5B6B65', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#1A2E20' : '#1C2826',
                                border: 'none',
                                borderRadius: '16px',
                                color: '#FFFFFF',
                                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
                                padding: '12px 16px',
                            }}
                            itemStyle={{ color: '#FFFFFF' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke={isDark ? '#A2BFA6' : '#4B6D53'}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSales)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
