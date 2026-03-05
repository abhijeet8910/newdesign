import { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsCard } from '../components/StatsCard';
import { EarningsChart } from '../components/EarningsChart';
import { AlertsPanel } from '../components/AlertsPanel';
import { TransactionTable } from '../components/TransactionTable';
import { AddProductModal } from '../components/AddProductModal';
import { Sprout, TrendingUp, Package, IndianRupee, ArrowUpRight, Cloud, Sun, Droplets, Wind, Eye, ShoppingCart, FileText, Star } from 'lucide-react';
import { useProductStore } from '../../../store/productStore';
import { useAuthStore } from '../../../store/authStore';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

/* ─── Mock Weather ─── */
const WEATHER = {
    temp: 32, condition: 'Partly Cloudy', humidity: 68, wind: 12, forecast: [
        { day: 'Today', temp: 32, icon: '⛅' }, { day: 'Tue', temp: 34, icon: '☀️' }, { day: 'Wed', temp: 30, icon: '🌧️' },
        { day: 'Thu', temp: 28, icon: '🌧️' }, { day: 'Fri', temp: 31, icon: '⛅' },
    ]
};

/* ─── Mock Mandi Prices ─── */
const MANDI_PRICES = [
    { crop: 'Wheat', price: '₹2,450/q', change: '+3.2%', up: true, emoji: '🌾' },
    { crop: 'Rice', price: '₹3,100/q', change: '+1.8%', up: true, emoji: '🍚' },
    { crop: 'Tomato', price: '₹45/kg', change: '-5.1%', up: false, emoji: '🍅' },
    { crop: 'Onion', price: '₹32/kg', change: '+2.4%', up: true, emoji: '🧅' },
    { crop: 'Potato', price: '₹22/kg', change: '-1.2%', up: false, emoji: '🥔' },
    { crop: 'Soybean', price: '₹4,800/q', change: '+4.5%', up: true, emoji: '🫘' },
];

export const FarmerDashboard = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const user = useAuthStore((s) => s.user);
    const products = useProductStore((s) => s.products);
    const myProducts = products.filter((p) => p.farmerId === (user?.id || '1'));
    const activeListings = myProducts.filter((p) => p.status === 'active').length;
    const totalRevenue = myProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const topProducts = [...myProducts].sort((a, b) => b.price * b.quantity - a.price * a.quantity).slice(0, 4);

    const formatCurrency = (n: number) => {
        if (n >= 100000) return `₹ ${(n / 100000).toFixed(1)}L`;
        if (n >= 1000) return `₹ ${(n / 1000).toFixed(0)}K`;
        return `₹ ${n}`;
    };

    return (
        <div className="max-w-7xl mx-auto pb-8">

            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[40px] sm:rounded-[40px] shadow-xl text-white mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-4 sm:mt-0"
                style={{ background: 'var(--color-hero-gradient)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16" />
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">
                            Farmer Dashboard
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome back, {user?.name || 'Farmer'} 🌾</h1>
                        <p className="text-white/60 mt-1 text-sm sm:text-base">Your mandi prices are looking strong this week.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowAddProduct(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        <Sprout className="w-5 h-5" /> Add New Listing
                    </motion.button>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8 px-2 sm:px-0">
                {[
                    { label: 'Add Product', emoji: '🌱', action: () => setShowAddProduct(true) },
                    { label: 'View Orders', emoji: '📦', action: () => window.location.hash = '#orders' },
                    { label: 'My Products', emoji: '🛒', action: () => window.location.hash = '#products' },
                    { label: 'Reports', emoji: '📊', action: () => { } },
                ].map((item) => (
                    <button key={item.label} onClick={item.action}
                        className="p-3 sm:p-4 rounded-[20px] flex flex-col items-center gap-1.5 transition-all hover:shadow-md"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                        <span className="text-[10px] sm:text-xs font-bold" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <motion.div variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 px-2 sm:px-0">
                <motion.div variants={fadeUp}><StatsCard title="Total Sales" value={formatCurrency(totalRevenue)} icon={TrendingUp} color="#2F6B3A" /></motion.div>
                <motion.div variants={fadeUp}><StatsCard title="Active Listings" value={String(activeListings)} icon={Package} color="#E65100" /></motion.div>
                <motion.div variants={fadeUp}><StatsCard title="Total Products" value={String(myProducts.length)} icon={IndianRupee} color="#0288D1" /></motion.div>
                <motion.div variants={fadeUp}><StatsCard title="Growth" value="+23%" icon={ArrowUpRight} color="#7B1FA2" /></motion.div>
            </motion.div>

            {/* Weather + Mandi Prices Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-2 sm:px-0">

                {/* Weather Widget */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-[28px] p-5 sm:p-6 overflow-hidden relative"
                    style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #42A5F5 100%)' }}>
                    <div className="absolute -right-8 -top-8 text-[100px] opacity-10">⛅</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Cloud className="w-5 h-5 text-white/80" />
                            <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Weather Today</h3>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <span className="text-5xl sm:text-6xl font-black text-white">{WEATHER.temp}°</span>
                                <p className="text-sm text-white/60 mt-1">{WEATHER.condition}</p>
                            </div>
                            <div className="flex flex-col gap-1.5 text-xs text-white/70">
                                <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {WEATHER.humidity}% Humidity</span>
                                <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> {WEATHER.wind} km/h Wind</span>
                                <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> UV Index: Moderate</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                            {WEATHER.forecast.map((f) => (
                                <div key={f.day} className="flex-1 flex flex-col items-center gap-0.5 py-1">
                                    <span className="text-[10px] font-bold text-white/50">{f.day}</span>
                                    <span className="text-lg">{f.icon}</span>
                                    <span className="text-xs font-bold text-white">{f.temp}°</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Mandi Price Ticker */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="rounded-[28px] p-5 sm:p-6"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Mandi Prices</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>Live</span>
                    </div>
                    <div className="space-y-2.5">
                        {MANDI_PRICES.map((item) => (
                            <div key={item.crop} className="flex items-center justify-between py-2 px-3 rounded-xl transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-lg">{item.emoji}</span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.crop}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black" style={{ color: 'var(--color-text-primary)' }}>{item.price}</span>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                                        style={{ backgroundColor: item.up ? 'rgba(46,125,50,0.1)' : 'rgba(211,47,47,0.1)', color: item.up ? '#2E7D32' : '#D32F2F' }}>
                                        {item.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Top Performing Products */}
            {topProducts.length > 0 && (
                <div className="mb-8 px-2 sm:px-0">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5" style={{ color: '#F9A825' }} />
                        <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Top Performing Products</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {topProducts.map((product, idx) => (
                            <div key={product.id}
                                className="rounded-[20px] p-4 flex flex-col items-center text-center relative overflow-hidden"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md text-white"
                                    style={{ backgroundColor: idx === 0 ? '#F9A825' : idx === 1 ? '#90A4AE' : idx === 2 ? '#8D6E63' : 'var(--color-accent)' }}>
                                    #{idx + 1}
                                </span>
                                <span className="text-4xl mt-2 mb-2">{product.image}</span>
                                <h4 className="text-xs font-bold line-clamp-1" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h4>
                                <p className="text-xs font-black mt-1" style={{ color: 'var(--color-accent)' }}>₹{product.price}/{product.unit}</p>
                                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{product.quantity} {product.unit} in stock</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Charts & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 px-2 sm:px-0">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
                    <EarningsChart />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
                    <AlertsPanel />
                </motion.div>
            </div>

            {/* Transactions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="px-2 sm:px-0">
                <TransactionTable />
            </motion.div>

            <AddProductModal isOpen={showAddProduct} onClose={() => setShowAddProduct(false)} />
        </div>
    );
};
