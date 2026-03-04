import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
    { id: '#ORD-1021', customer: 'Rajesh Kumar', items: 'Tomatoes (5kg), Rice (10kg)', total: '₹ 1,200', status: 'Pending', date: 'Today' },
    { id: '#ORD-1020', customer: 'Priya Sharma', items: 'Mangoes (3kg)', total: '₹ 360', status: 'Shipped', date: 'Yesterday' },
    { id: '#ORD-1019', customer: 'AgriCorp B2B', items: 'Wheat (100kg)', total: '₹ 8,000', status: 'Delivered', date: '2 days ago' },
    { id: '#ORD-1018', customer: 'Suresh Reddy', items: 'Eggs (30 pcs)', total: '₹ 210', status: 'Cancelled', date: '3 days ago' },
];

const TABS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
    Pending: { icon: Clock, color: '#F57C00', bg: '#F57C0015' },
    Shipped: { icon: Clock, color: '#0288D1', bg: '#0288D115' },
    Delivered: { icon: CheckCircle, color: '#2E7D32', bg: '#2E7D3215' },
    Cancelled: { icon: XCircle, color: '#D32F2F', bg: '#D32F2F15' },
};

export const FarmerOrders = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredOrders = activeTab === 'All' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === activeTab);

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8 min-h-screen">
            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[40px] sm:rounded-[40px] shadow-xl mb-8 overflow-hidden text-white -mx-4 sm:mx-0 -mt-4 sm:mt-0"
                style={{ backgroundColor: 'var(--color-bg-surface)' }}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Manage Orders</h1>
                    <p className="text-white/70 mt-1 text-sm">Track and fulfill customer orders</p>
                </div>
            </motion.div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-6 px-2 sm:px-0">
                <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <Search className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
                    </span>
                    <input
                        type="text"
                        placeholder="Find an order by ID or Customer..."
                        className="block w-full rounded-2xl py-3 pl-11 pr-3 text-sm focus:outline-none focus:ring-2 transition-all"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-primary)',
                        }}
                    />
                </div>
                <button className="px-4 rounded-2xl flex items-center gap-2 text-sm font-bold transition-all"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                    }}>
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 px-2 sm:px-0">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all"
                        style={{
                            backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-bg-card)',
                            color: activeTab === tab ? 'white' : 'var(--color-text-secondary)',
                            border: activeTab === tab ? 'none' : '1px solid var(--color-border)',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4 px-2 sm:px-0">
                {filteredOrders.map((order, idx) => {
                    const sc = statusConfig[order.status] || statusConfig.Pending;
                    const StatusIcon = sc.icon;
                    return (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            whileHover={{ y: -2 }}
                            className="p-5 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                boxShadow: 'var(--shadow-card)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: sc.bg }}>
                                    <StatusIcon className="w-5 h-5" style={{ color: sc.color }} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="font-black" style={{ color: 'var(--color-accent)' }}>{order.id}</h3>
                                        <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{order.date}</span>
                                    </div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{order.customer}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{order.items}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 ml-16 sm:ml-0">
                                <span className="font-black text-lg" style={{ color: 'var(--color-text-primary)' }}>{order.total}</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                    style={{ backgroundColor: sc.bg, color: sc.color }}>
                                    {order.status}
                                </span>
                                <button className="p-2 rounded-xl transition-all hover:opacity-80"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
