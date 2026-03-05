import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, DollarSign, Package, Users, Calendar, Star, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const MONTHLY_SPENDING = [
    { month: 'Sep', amount: 320000, label: '₹ 3.2L' },
    { month: 'Oct', amount: 450000, label: '₹ 4.5L' },
    { month: 'Nov', amount: 380000, label: '₹ 3.8L' },
    { month: 'Dec', amount: 520000, label: '₹ 5.2L' },
    { month: 'Jan', amount: 680000, label: '₹ 6.8L' },
    { month: 'Feb', amount: 750000, label: '₹ 7.5L' },
    { month: 'Mar', amount: 845000, label: '₹ 8.4L' },
];

const TOP_CATEGORIES = [
    { name: 'Grains & Cereals', spending: '₹ 3,20,000', orders: 34, pct: 38, color: '#4B6D53', trend: '+12%', up: true },
    { name: 'Fruits', spending: '₹ 1,80,000', orders: 18, pct: 21, color: '#E65100', trend: '+8%', up: true },
    { name: 'Spices', spending: '₹ 1,45,000', orders: 15, pct: 17, color: '#D32F2F', trend: '+22%', up: true },
    { name: 'Vegetables', spending: '₹ 1,10,000', orders: 22, pct: 13, color: '#0288D1', trend: '-5%', up: false },
    { name: 'Dairy & Eggs', spending: '₹ 90,000', orders: 12, pct: 11, color: '#7B1FA2', trend: '+3%', up: true },
];

const SUPPLIER_PERFORMANCE = [
    { name: 'Punjab Harvest', orders: 56, onTime: 94, quality: 4.7, spend: '₹ 2,52,000', emoji: '🌽', topProduct: 'Wheat', avgDelivery: '2.8 days', region: 'Punjab', since: 'Nov 2023' },
    { name: 'Ravi Farms', orders: 45, onTime: 96, quality: 4.8, spend: '₹ 1,35,000', emoji: '🌾', topProduct: 'Rice', avgDelivery: '3.1 days', region: 'Andhra Pradesh', since: 'Jan 2024' },
    { name: 'Kerala Spices Co.', orders: 28, onTime: 98, quality: 4.9, spend: '₹ 1,12,000', emoji: '🌿', topProduct: 'Turmeric', avgDelivery: '4.2 days', region: 'Kerala', since: 'Feb 2024' },
    { name: 'Konkan Growers', orders: 32, onTime: 92, quality: 4.5, spend: '₹ 1,02,400', emoji: '🥭', topProduct: 'Mangoes', avgDelivery: '3.5 days', region: 'Maharashtra', since: 'Mar 2024' },
    { name: 'Nashik Agri Corp', orders: 22, onTime: 88, quality: 4.3, spend: '₹ 66,000', emoji: '🧅', topProduct: 'Onions', avgDelivery: '2.5 days', region: 'Maharashtra', since: 'Jun 2024' },
];

type SupplierPerf = typeof SUPPLIER_PERFORMANCE[0];

const KPI_CARDS = [
    { title: 'Total Spent (FY)', value: '₹ 8,45,000', icon: DollarSign, trend: '+22%', up: true, color: '#4B6D53', details: { 'Q1': '₹ 1,14,000', 'Q2': '₹ 2,15,000', 'Q3': '₹ 2,72,000', 'Q4 (projected)': '₹ 2,44,000', 'Budget Utilization': '78%', 'Cost Savings': '₹ 1,20,000' } },
    { title: 'Total Orders', value: '156', icon: Package, trend: '+18%', up: true, color: '#E65100', details: { 'Completed': '142', 'Cancelled': '3', 'In Progress': '11', 'Avg Value': '₹ 15,200', 'Repeat Orders': '68%', 'New Suppliers': '8' } },
    { title: 'Active Suppliers', value: '42', icon: Users, trend: '+5', up: true, color: '#0288D1', details: { 'Verified': '38', 'New This Month': '5', 'Top Rated (4.5+)': '18', 'Regions Covered': '12', 'Avg Rating': '4.6', 'Exclusive Partners': '6' } },
    { title: 'Avg Delivery Time', value: '3.2 days', icon: Calendar, trend: '-0.5d', up: true, color: '#7B1FA2', details: { 'Fastest': '1 day', 'Slowest': '7 days', 'On-Time Rate': '94%', 'Improved By': '0.5 days', 'Late Deliveries': '6', 'Same-Day Available': '3 suppliers' } },
];

const maxSpend = Math.max(...MONTHLY_SPENDING.map((m) => m.amount));

export const BusinessAnalytics = () => {
    const [selectedKPI, setSelectedKPI] = useState<typeof KPI_CARDS[0] | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierPerf | null>(null);
    const [dateRange, setDateRange] = useState('FY 2025-26');
    const [exported, setExported] = useState(false);

    const handleExport = () => { setExported(true); setTimeout(() => setExported(false), 2000); };

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">
            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden text-white -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #2F4A35 0%, #4B6D53 50%, #3B5A42 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">Business Intelligence</span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Analytics & Insights</h1>
                        <p className="text-white/60 mt-1 text-sm">Data-driven procurement insights for smarter decisions.</p>
                    </div>
                    <div className="px-4 py-2 rounded-2xl text-xs font-bold bg-white/10 text-white/90 border border-white/20 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {dateRange}
                    </div>
                </div>
            </motion.div>

            {/* Date Range Filter + Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {['This Month', 'Last Quarter', 'Last 6 Months', 'FY 2025-26'].map((range) => (
                        <button key={range} onClick={() => setDateRange(range)}
                            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all"
                            style={{ backgroundColor: dateRange === range ? 'var(--color-accent)' : 'var(--color-bg-card)', color: dateRange === range ? 'white' : 'var(--color-text-secondary)', border: dateRange === range ? 'none' : '1px solid var(--color-border)' }}>
                            {range}
                        </button>
                    ))}
                </div>
                <button onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ backgroundColor: exported ? 'rgba(46,125,50,0.1)' : 'var(--color-bg-card)', color: exported ? '#2E7D32' : 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                    <Download className="w-4 h-4" /> {exported ? '✅ Exported!' : 'Export Report'}
                </button>
            </div>            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {KPI_CARDS.map((kpi, i) => (
                    <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        onClick={() => setSelectedKPI(kpi)}
                        whileHover={{ y: -4, boxShadow: 'var(--shadow-elevated)' }}
                        className="p-5 rounded-[28px] transition-all cursor-pointer"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: kpi.color + '15' }}>
                                <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${kpi.up ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
                                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>{kpi.title}</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                {/* Monthly Spending Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="lg:col-span-3 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Monthly Spending Trend</h3>
                        <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600">
                            <ArrowUpRight className="w-3 h-3" /> +22% vs last year
                        </span>
                    </div>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {MONTHLY_SPENDING.map((m, i) => {
                            const heightPct = (m.amount / maxSpend) * 100;
                            return (
                                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{m.label}</span>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPct}%` }}
                                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                                        className="w-full rounded-xl min-h-[8px] relative group cursor-pointer"
                                        style={{
                                            backgroundColor: 'var(--color-accent)',
                                            opacity: i === MONTHLY_SPENDING.length - 1 ? 1 : 0.3 + (i / MONTHLY_SPENDING.length) * 0.5,
                                        }}
                                    />
                                    <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>{m.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 rounded-[28px] p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <h3 className="text-lg font-black mb-5" style={{ color: 'var(--color-text-primary)' }}>Category Breakdown</h3>
                    <div className="space-y-4">
                        {TOP_CATEGORIES.map((c, i) => (
                            <motion.div key={c.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                                        <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black" style={{ color: 'var(--color-text-primary)' }}>{c.spending}</span>
                                        <span className={`text-[10px] font-bold ${c.up ? 'text-emerald-600' : 'text-red-500'}`}>{c.trend}</span>
                                    </div>
                                </div>
                                <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full" style={{ backgroundColor: c.color }} />
                                </div>
                                <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{c.orders} orders • {c.pct}% of total</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Supplier Performance Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="rounded-[28px] overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="p-6">
                    <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Supplier Performance</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Click on a supplier for detailed analytics</p>
                </div>

                <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3"
                    style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    {['Supplier', 'Orders', 'On-Time %', 'Quality', 'Total Spend', ''].map((h) => (
                        <span key={h} className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</span>
                    ))}
                </div>

                <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    {SUPPLIER_PERFORMANCE.map((s, idx) => (
                        <motion.div key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + idx * 0.05 }}
                            onClick={() => setSelectedSupplier(s)}
                            className="grid grid-cols-2 sm:grid-cols-6 gap-4 px-6 py-4 items-center hover:opacity-90 cursor-pointer transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{s.emoji}</span>
                                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.name}</span>
                            </div>
                            <span className="text-sm font-black" style={{ color: 'var(--color-text-primary)' }}>{s.orders}</span>
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    <div className="h-full rounded-full" style={{
                                        width: `${s.onTime}%`,
                                        backgroundColor: s.onTime >= 95 ? '#2E7D32' : s.onTime >= 90 ? '#F57C00' : '#D32F2F',
                                    }} />
                                </div>
                                <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.onTime}%</span>
                            </div>
                            <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-yellow-600">⭐ {s.quality}</span>
                            <span className="hidden sm:block text-sm font-black" style={{ color: 'var(--color-accent)' }}>{s.spend}</span>
                            <div className="hidden sm:block text-right">
                                <button className="p-2 rounded-xl transition-all"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                    <BarChart3 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* KPI Detail Modal */}
            <DetailModal isOpen={!!selectedKPI} onClose={() => setSelectedKPI(null)}
                title={selectedKPI?.title || ''} subtitle={selectedKPI?.trend}
                accentColor={selectedKPI?.color}
                icon={selectedKPI && <selectedKPI.icon className="w-5 h-5" style={{ color: selectedKPI.color }} />}>
                {selectedKPI && (
                    <div>
                        <div className="text-center mb-5 p-5 rounded-2xl" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <p className="text-4xl font-black" style={{ color: selectedKPI.color }}>{selectedKPI.value}</p>
                            <span className={`inline-flex items-center gap-1 text-xs font-bold mt-2 ${selectedKPI.up ? 'text-emerald-600' : 'text-red-500'}`}>
                                {selectedKPI.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {selectedKPI.trend}
                            </span>
                        </div>
                        {Object.entries(selectedKPI.details).map(([key, val]) => (
                            <DetailRow key={key} label={key} value={val} />
                        ))}
                    </div>
                )}
            </DetailModal>

            {/* Supplier Performance Detail Modal */}
            <DetailModal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)}
                title={selectedSupplier?.name || ''} subtitle={selectedSupplier?.region}
                accentColor="#4B6D53"
                icon={selectedSupplier ? <span className="text-2xl">{selectedSupplier.emoji}</span> : undefined}>
                {selectedSupplier && (
                    <div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <span className="text-5xl">{selectedSupplier.emoji}</span>
                            <div>
                                <p className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedSupplier.name}</p>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-yellow-500/10 text-yellow-600">
                                        <Star className="w-3 h-3 fill-current" /> {selectedSupplier.quality}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600">{selectedSupplier.onTime}% on-time</span>
                                </div>
                            </div>
                        </div>
                        <DetailRow label="Total Orders" value={String(selectedSupplier.orders)} />
                        <DetailRow label="Total Spend" value={selectedSupplier.spend} color="var(--color-accent)" />
                        <DetailRow label="On-Time Rate" value={`${selectedSupplier.onTime}%`} color={selectedSupplier.onTime >= 95 ? '#2E7D32' : '#F57C00'} />
                        <DetailRow label="Quality Rating" value={`⭐ ${selectedSupplier.quality}`} />
                        <DetailRow label="Top Product" value={selectedSupplier.topProduct} />
                        <DetailRow label="Avg Delivery" value={selectedSupplier.avgDelivery} />
                        <DetailRow label="Region" value={selectedSupplier.region} />
                        <DetailRow label="Partner Since" value={selectedSupplier.since} />
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
