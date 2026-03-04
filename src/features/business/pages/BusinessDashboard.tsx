import { useState } from 'react';
import { DollarSign, PackageOpen, Truck, Users, TrendingUp, ArrowUpRight, ShieldCheck, ChevronRight, Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const STATS = [
    { title: 'Total Purchases', value: '₹ 8,45,000', icon: DollarSign, trend: '+22%', color: '#4B6D53', details: { 'This Month': '₹ 1,20,000', 'Last Month': '₹ 98,000', 'This Quarter': '₹ 3,40,000', 'Top Category': 'Grains', 'Avg Order': '₹ 15,000', 'YoY Growth': '+22%' } },
    { title: 'Active Contracts', value: '18', icon: PackageOpen, trend: '+3 new', color: '#E65100', details: { 'New This Week': '3', 'Expiring Soon': '2', 'Long-term': '12', 'Short-term': '6', 'Avg Duration': '3 months', 'Total Value': '₹ 45,00,000' } },
    { title: 'Pending Deliveries', value: '7', icon: Truck, trend: 'On track', color: '#0288D1', details: { 'In Transit': '5', 'Out for Delivery': '2', 'Delayed': '0', 'Avg Delivery Time': '3.2 days', 'On-Time Rate': '94%', 'Total Value': '₹ 2,80,000' } },
    { title: 'Suppliers', value: '42', icon: Users, trend: '+5 this month', color: '#7B1FA2', details: { 'Active': '38', 'New This Month': '5', 'Inactive': '4', 'Avg Rating': '4.6', 'Top Region': 'Punjab', 'Top Supplier': 'Punjab Harvest' } },
];

const RECENT_ORDERS = [
    { id: 'PO-2041', item: 'Organic Rice — 500kg', supplier: 'Ravi Farms', total: '₹ 30,000', status: 'Processing', date: 'Mar 5', location: 'Andhra Pradesh', expectedDelivery: 'Mar 8', rating: 4.8 },
    { id: 'PO-2040', item: 'Fresh Mangoes — 200kg', supplier: 'Konkan Growers', total: '₹ 60,000', status: 'Shipped', date: 'Mar 4', location: 'Maharashtra', expectedDelivery: 'Mar 7', rating: 4.5 },
    { id: 'PO-2039', item: 'Premium Wheat — 1T', supplier: 'Punjab Harvest', total: '₹ 45,000', status: 'Delivered', date: 'Mar 3', location: 'Punjab', expectedDelivery: 'Mar 5', rating: 4.7 },
];

const statusColors: Record<string, { bg: string; text: string }> = {
    Processing: { bg: '#7B1FA215', text: '#7B1FA2' },
    Shipped: { bg: '#0288D115', text: '#0288D1' },
    Delivered: { bg: '#2E7D3215', text: '#2E7D32' },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } } };

export const BusinessDashboard = () => {
    const [selectedStat, setSelectedStat] = useState<typeof STATS[0] | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<typeof RECENT_ORDERS[0] | null>(null);

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">

            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden text-white -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #2F4A35 0%, #4B6D53 50%, #3B5A42 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">B2B Procurement Hub</span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Business Dashboard</h1>
                        <p className="text-white/60 mt-1 text-sm sm:text-base">Manage bulk orders, suppliers, and procurement pipeline.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        <PackageOpen className="w-5 h-5" /> New Purchase Order
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {STATS.map((stat) => (
                    <motion.div key={stat.title} variants={fadeUp}
                        onClick={() => setSelectedStat(stat)}
                        whileHover={{ y: -4, boxShadow: 'var(--shadow-elevated)' }}
                        className="p-5 rounded-[28px] transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: stat.color + '15' }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <span className="text-xs font-bold px-2 py-1 rounded-lg"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>{stat.trend}</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.title}</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                {/* Recent Orders */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="lg:col-span-3 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="text-lg font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Recent Orders</h3>
                    <div className="space-y-3">
                        {RECENT_ORDERS.map((order, idx) => {
                            const sc = statusColors[order.status] || statusColors.Processing;
                            return (
                                <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.06 }}
                                    onClick={() => setSelectedOrder(order)}
                                    className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:shadow-sm"
                                    style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                            <Package className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-black" style={{ color: 'var(--color-accent)' }}>{order.id}</span>
                                                <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                    <Clock className="w-3 h-3" /> {order.date}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{order.item}</p>
                                            <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>{order.supplier}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-sm hidden sm:block" style={{ color: 'var(--color-text-primary)' }}>{order.total}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                                            style={{ backgroundColor: sc.bg, color: sc.text }}>{order.status}</span>
                                        <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Spending Summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="text-lg font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Spending by Category</h3>
                    <div className="space-y-3">
                        {[
                            { category: 'Grains & Cereals', amount: '₹ 3,20,000', pct: 38, color: '#4B6D53' },
                            { category: 'Fruits', amount: '₹ 1,80,000', pct: 21, color: '#E65100' },
                            { category: 'Spices', amount: '₹ 1,45,000', pct: 17, color: '#D32F2F' },
                            { category: 'Vegetables', amount: '₹ 1,10,000', pct: 13, color: '#0288D1' },
                            { category: 'Others', amount: '₹ 90,000', pct: 11, color: '#7B1FA2' },
                        ].map((c) => (
                            <div key={c.category}>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span style={{ color: 'var(--color-text-secondary)' }}>{c.category}</span>
                                    <span style={{ color: 'var(--color-text-primary)' }}>{c.amount}</span>
                                </div>
                                <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full" style={{ backgroundColor: c.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className="font-black text-sm mt-8 mb-4" style={{ color: 'var(--color-text-primary)' }}>Top Suppliers</h4>
                    <div className="space-y-3">
                        {[
                            { name: 'Punjab Harvest', orders: 56, emoji: '🌽' },
                            { name: 'Ravi Farms', orders: 45, emoji: '🌾' },
                            { name: 'Konkan Growers', orders: 32, emoji: '🥭' },
                        ].map((s) => (
                            <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl"
                                style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                <span className="text-2xl">{s.emoji}</span>
                                <div className="flex-1">
                                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.name}</p>
                                    <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{s.orders} orders</p>
                                </div>
                                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'New Purchase Order', icon: PackageOpen, accent: '#4B6D53' },
                        { label: 'View Suppliers', icon: Users, accent: '#0288D1' },
                        { label: 'Track Shipments', icon: Truck, accent: '#E65100' },
                        { label: 'Quality Reports', icon: ShieldCheck, accent: '#7B1FA2' },
                    ].map((action, i) => (
                        <motion.button key={action.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.08 }} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                            className="p-5 rounded-[24px] text-left group transition-all"
                            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="p-2.5 rounded-xl w-fit mb-3" style={{ backgroundColor: action.accent + '15' }}>
                                <action.icon className="w-5 h-5" style={{ color: action.accent }} />
                            </div>
                            <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{action.label}</p>
                            <ArrowUpRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: 'var(--color-text-secondary)' }} />
                        </motion.button>
                    ))}
                </div>
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

            {/* Order Detail Modal */}
            <DetailModal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}
                title={selectedOrder?.id || ''} subtitle={selectedOrder?.supplier}
                accentColor={statusColors[selectedOrder?.status || '']?.text || '#7B1FA2'}
                icon={<Package className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />}>
                {selectedOrder && (
                    <div>
                        <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <p className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedOrder.item}</p>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mt-1 inline-block"
                                style={{ backgroundColor: statusColors[selectedOrder.status]?.bg, color: statusColors[selectedOrder.status]?.text }}>{selectedOrder.status}</span>
                        </div>
                        <DetailRow label="Order ID" value={selectedOrder.id} color="var(--color-accent)" />
                        <DetailRow label="Supplier" value={selectedOrder.supplier} />
                        <DetailRow label="Location" value={selectedOrder.location} />
                        <DetailRow label="Total" value={selectedOrder.total} color="var(--color-accent)" />
                        <DetailRow label="Order Date" value={selectedOrder.date} />
                        <DetailRow label="Expected Delivery" value={selectedOrder.expectedDelivery} />
                        <DetailRow label="Supplier Rating" value={`⭐ ${selectedOrder.rating}`} />
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
