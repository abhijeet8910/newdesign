import { motion } from 'framer-motion';
import { Bell, Package, CheckCircle, AlertTriangle } from 'lucide-react';

const alerts = [
    { id: 1, title: 'Low Stock: Wheat', time: '2 hours ago', type: 'warning', icon: AlertTriangle },
    { id: 2, title: 'New Order #1024', time: '4 hours ago', type: 'info', icon: Package },
    { id: 3, title: 'Payment Received', time: '1 day ago', type: 'success', icon: CheckCircle },
    { id: 4, title: 'System Update', time: '2 days ago', type: 'info', icon: Bell },
];

export const AlertsPanel = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="p-6 rounded-[28px] h-full flex flex-col transition-colors"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Alerts</h3>
                <button className="text-sm font-bold hover:underline transition-colors" style={{ color: 'var(--color-accent)' }}>View All</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {alerts.map((alert, i) => {
                    const Icon = alert.icon;
                    const bgColor = alert.type === 'warning' ? '#F57C0015' :
                        alert.type === 'success' ? '#2E7D3215' : '#0288D115';
                    const iconColor = alert.type === 'warning' ? '#F57C00' :
                        alert.type === 'success' ? '#2E7D32' : '#0288D1';

                    return (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.06 }}
                            className="flex gap-3 p-3 rounded-xl cursor-pointer group transition-colors"
                            style={{ backgroundColor: 'transparent' }}
                            whileHover={{ backgroundColor: 'var(--color-bg-primary)' }}
                        >
                            <div className="p-2 rounded-xl h-fit mt-0.5" style={{ backgroundColor: bgColor }}>
                                <Icon className="w-4 h-4" style={{ color: iconColor }} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold transition-colors" style={{ color: 'var(--color-text-primary)' }}>{alert.title}</h4>
                                <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{alert.time}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};
