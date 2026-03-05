import { useState } from 'react';
import { Users, Shield, DollarSign, Package, TrendingUp, CheckCircle, Clock, XCircle, UserPlus, AlertTriangle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const STATS = [
    { title: 'Total Users', value: '1,247', icon: Users, trend: '+89 this week', color: '#4B6D53', details: { 'Active Users': '1,180', 'Suspended': '44', 'Pending KYC': '23', 'New This Week': '89', 'New This Month': '312', 'Growth Rate': '+7.2%' } },
    { title: 'Pending KYC', value: '23', icon: Shield, trend: '5 urgent', color: '#E65100', details: { 'Farmers': '12', 'Business': '8', 'Bulk Farmers': '3', 'Urgent (> 48h)': '5', 'Avg Review Time': '6.2 hours', 'Approval Rate': '87%' } },
    { title: 'Platform Revenue', value: '₹ 2.4L', icon: DollarSign, trend: '+18%', color: '#0288D1', details: { 'This Month': '₹ 2,40,000', 'Last Month': '₹ 2,03,000', 'Commission': '₹ 1,80,000', 'Delivery Fees': '₹ 48,000', 'Other': '₹ 12,000', 'YoY Growth': '+18%' } },
    { title: 'Active Listings', value: '856', icon: Package, trend: '+124 new', color: '#7B1FA2', details: { 'Vegetables': '312', 'Grains': '198', 'Fruits': '156', 'Spices': '102', 'Others': '88', 'New This Week': '124' } },
];

const RECENT_ACTIVITY = [
    { action: 'New registration', user: 'Mohit Patel', role: 'Customer', time: '5 min ago', icon: UserPlus, color: '#4B6D53', details: { 'Email': 'mohit@email.com', 'Location': 'Pune, Maharashtra', 'Phone': '+91 98765 43210', 'KYC Status': 'Pending' } },
    { action: 'KYC approved', user: 'Farm Fresh Co.', role: 'Business', time: '1 hour ago', icon: CheckCircle, color: '#2E7D32', details: { 'Documents': '5 verified', 'Reviewer': 'Admin Team', 'Duration': '4.5 hours', 'Status': 'Approved' } },
    { action: 'Order dispute', user: '#ORD-1245', role: 'System', time: '3 hours ago', icon: XCircle, color: '#D32F2F', details: { 'Order Value': '₹ 3,200', 'Reason': 'Quality mismatch', 'Buyer': 'Priya Foods', 'Seller': 'Ravi Farms' } },
    { action: 'Product flagged', user: 'Listing #892', role: 'System', time: '5 hours ago', icon: AlertTriangle, color: '#F57C00', details: { 'Product': 'Organic Honey', 'Reason': 'Misleading label', 'Reports': '3 reports', 'Action': 'Under review' } },
    { action: 'New listing', user: 'Organic Rice 5kg', role: 'Farmer', time: '6 hours ago', icon: Package, color: '#0288D1', details: { 'Price': '₹ 80/kg', 'Quantity': '500kg', 'Farmer': 'Venkat Rao', 'Category': 'Grains' } },
    { action: 'Payment received', user: '₹ 45,000', role: 'Finance', time: '8 hours ago', icon: DollarSign, color: '#7B1FA2', details: { 'From': 'FarmFresh Corp', 'Transaction': 'TXN-8921', 'Method': 'Bank Transfer', 'Status': 'Completed' } },
];

const PLATFORM_HEALTH = [
    { metric: 'Uptime', value: '99.97%', status: 'healthy' },
    { metric: 'Avg Response', value: '142ms', status: 'healthy' },
    { metric: 'Error Rate', value: '0.03%', status: 'healthy' },
    { metric: 'Active Sessions', value: '342', status: 'healthy' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } } };

export const AdminDashboard = () => {
    const [selectedStat, setSelectedStat] = useState<typeof STATS[0] | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<typeof RECENT_ACTIVITY[0] | null>(null);

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">

            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #1A2E20 0%, #2F4A35 50%, #3B5A42 100%)' }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">
                            Platform Control Center
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Admin Dashboard</h1>
                        <p className="text-white/60 mt-1 text-sm">Monitor, manage, and moderate the ASWAMITHRA ecosystem.</p>
                    </div>
                    <div className="px-4 py-2 rounded-2xl text-xs font-bold bg-white/10 text-white/90 border border-white/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        All Systems Operational
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {STATS.map((stat) => (
                    <motion.div key={stat.title} variants={fadeUp}
                        onClick={() => setSelectedStat(stat)}
                        whileHover={{ y: -4, boxShadow: 'var(--shadow-elevated)' }}
                        className="p-5 rounded-[28px] transition-all cursor-pointer"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: stat.color + '15' }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.title}</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
                        <p className="text-xs font-semibold mt-1" style={{ color: 'var(--color-accent)' }}>{stat.trend}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                {/* Activity Feed */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="lg:col-span-3 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="text-lg font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h3>
                    <div className="space-y-3">
                        {RECENT_ACTIVITY.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                                    onClick={() => setSelectedActivity(item)}
                                    className="flex gap-4 items-center p-3 rounded-2xl cursor-pointer transition-all hover:shadow-sm"
                                    style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                    <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: item.color + '15' }}>
                                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>{item.action}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.user} • {item.role}</p>
                                    </div>
                                    <span className="text-[10px] font-semibold whitespace-nowrap flex items-center gap-1 shrink-0"
                                        style={{ color: 'var(--color-text-muted)' }}>
                                        <Clock className="w-3 h-3" /> {item.time}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Platform Health */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="text-lg font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Platform Health</h3>
                    <div className="space-y-3">
                        {PLATFORM_HEALTH.map((item, i) => (
                            <motion.div key={item.metric}
                                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                                className="flex items-center justify-between p-4 rounded-2xl"
                                style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.metric}</span>
                                </div>
                                <span className="text-sm font-black" style={{ color: 'var(--color-accent)' }}>{item.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    <h4 className="font-black text-sm mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>User Breakdown</h4>
                    <div className="space-y-3">
                        {[
                            { role: 'Customers', count: 890, pct: 71, color: '#7B1FA2' },
                            { role: 'Farmers', count: 245, pct: 20, color: '#4B6D53' },
                            { role: 'Business', count: 89, pct: 7, color: '#0288D1' },
                            { role: 'Admins', count: 23, pct: 2, color: '#E65100' },
                        ].map((r) => (
                            <div key={r.role}>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span style={{ color: 'var(--color-text-secondary)' }}>{r.role}</span>
                                    <span style={{ color: 'var(--color-text-primary)' }}>{r.count}</span>
                                </div>
                                <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }}
                                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full" style={{ backgroundColor: r.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className="font-black text-sm mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>Top Regions</h4>
                    <div className="space-y-3">
                        {[
                            { state: 'Andhra Pradesh', users: 312 },
                            { state: 'Maharashtra', users: 245 },
                            { state: 'Karnataka', users: 198 },
                            { state: 'Telangana', users: 156 },
                        ].map((r) => (
                            <div key={r.state} className="flex items-center justify-between p-3 rounded-xl"
                                style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                <span className="text-xs font-bold flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    <MapPin className="w-3 h-3" /> {r.state}
                                </span>
                                <span className="text-xs font-black" style={{ color: 'var(--color-accent)' }}>{r.users}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Revenue & User Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Trend */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>Platform Revenue (GMV)</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600">+34% YoY</span>
                    </div>
                    <div className="flex items-end justify-between gap-2 h-36">
                        {[
                            { month: 'Sep', value: 4.2 }, { month: 'Oct', value: 5.8 }, { month: 'Nov', value: 5.1 },
                            { month: 'Dec', value: 7.2 }, { month: 'Jan', value: 8.5 }, { month: 'Feb', value: 9.1 }, { month: 'Mar', value: 10.4 },
                        ].map((m, i, arr) => {
                            const max = Math.max(...arr.map((a) => a.value));
                            return (
                                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                                    <span className="text-[9px] font-bold" style={{ color: 'var(--color-text-muted)' }}>₹{m.value}L</span>
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${(m.value / max) * 100}%` }}
                                        transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                                        className="w-full rounded-xl" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.3 + (i / arr.length) * 0.7 }} />
                                    <span className="text-[9px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>{m.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* User Growth */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>User Growth by Role</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600">+289 this month</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { role: 'Farmers', count: 520, total: 1200, color: '#4B6D53', emoji: '👨‍🌾', growth: '+45' },
                            { role: 'Businesses', count: 180, total: 1200, color: '#0288D1', emoji: '🏢', growth: '+12' },
                            { role: 'Customers', count: 892, total: 1200, color: '#7B1FA2', emoji: '🛒', growth: '+232' },
                        ].map((r) => (
                            <div key={r.role}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{r.emoji}</span>
                                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{r.role}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black" style={{ color: r.color }}>{r.count}</span>
                                        <span className="text-[10px] font-bold text-emerald-600">{r.growth}</span>
                                    </div>
                                </div>
                                <div className="w-full h-3 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(r.count / r.total) * 100}%` }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                        className="h-full rounded-full" style={{ backgroundColor: r.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            {/* Stat Detail Modal */}
            <DetailModal isOpen={!!selectedStat} onClose={() => setSelectedStat(null)}
                title={selectedStat?.title || ''} subtitle={selectedStat?.trend}
                accentColor={selectedStat?.color}
                icon={selectedStat && <selectedStat.icon className="w-5 h-5" style={{ color: selectedStat.color }} />}>
                {selectedStat && (
                    <div>
                        <div className="text-center mb-5 p-5 rounded-2xl" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <p className="text-4xl font-black" style={{ color: selectedStat.color }}>{selectedStat.value}</p>
                            <p className="text-xs font-bold mt-1" style={{ color: 'var(--color-accent)' }}>{selectedStat.trend}</p>
                        </div>
                        {Object.entries(selectedStat.details).map(([key, val]) => (
                            <DetailRow key={key} label={key} value={val} />
                        ))}
                    </div>
                )}
            </DetailModal>

            {/* Activity Detail Modal */}
            <DetailModal isOpen={!!selectedActivity} onClose={() => setSelectedActivity(null)}
                title={selectedActivity?.action || ''} subtitle={selectedActivity?.time}
                accentColor={selectedActivity?.color}
                icon={selectedActivity && <selectedActivity.icon className="w-5 h-5" style={{ color: selectedActivity.color }} />}>
                {selectedActivity && (
                    <div>
                        <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{selectedActivity.user}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{selectedActivity.role} • {selectedActivity.time}</p>
                        </div>
                        {Object.entries(selectedActivity.details).map(([key, val]) => (
                            <DetailRow key={key} label={key} value={val} />
                        ))}
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
