import { useState, useMemo, useEffect, useCallback } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { useProductStore } from '../../../store/productStore';
import { useAuthStore } from '../../../store/authStore';
import { Search, Bell, Plus, ChevronLeft, ChevronRight, Flame, Zap, Star, Leaf, Gift, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductDetailsModal } from '../components/ProductDetailsModal';

/* ─── Category config ─── */
const CATEGORY_CONFIG: Record<string, { emoji: string; gradient: string }> = {
    All: { emoji: '🛒', gradient: 'linear-gradient(135deg, #4B6D53 0%, #2F4F37 100%)' },
    Vegetables: { emoji: '🥬', gradient: 'linear-gradient(135deg, #43A047 0%, #2E7D32 100%)' },
    Fruits: { emoji: '🍎', gradient: 'linear-gradient(135deg, #FF7043 0%, #E64A19 100%)' },
    Grains: { emoji: '🌾', gradient: 'linear-gradient(135deg, #FFA726 0%, #F57C00 100%)' },
    Spices: { emoji: '🌿', gradient: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)' },
    Dairy: { emoji: '🥛', gradient: 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)' },
    Pulses: { emoji: '🫘', gradient: 'linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)' },
    Oilseeds: { emoji: '🌻', gradient: 'linear-gradient(135deg, #FFD54F 0%, #F9A825 100%)' },
    Other: { emoji: '📦', gradient: 'linear-gradient(135deg, #78909C 0%, #455A64 100%)' },
};

/* ─── Banner slides ─── */
const BANNERS = [
    { title: 'Farm to Table', subtitle: 'Fresh produce delivered in 2 hours', gradient: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)', emoji: '🌿' },
    { title: 'Organic Week', subtitle: 'Flat 20% off on all organic products', gradient: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)', emoji: '🎉' },
    { title: 'Bulk Savings', subtitle: 'Save up to 30% on wholesale orders', gradient: 'linear-gradient(135deg, #0D47A1 0%, #42A5F5 100%)', emoji: '💰' },
    { title: 'New Harvest', subtitle: 'Season\'s freshest grains now available', gradient: 'linear-gradient(135deg, #4E342E 0%, #8D6E63 100%)', emoji: '🌾' },
];

/* ─── Farmer Spotlight ─── */
const FARMERS = [
    { name: 'Ravi Kumar', location: 'Nashik, MH', rating: 4.9, products: 12, emoji: '👨‍🌾', specialty: 'Organic Vegetables', gradient: 'linear-gradient(135deg, #2E7D32, #66BB6A)' },
    { name: 'Priya Devi', location: 'Coorg, KA', rating: 4.8, products: 8, emoji: '👩‍🌾', specialty: 'Premium Spices', gradient: 'linear-gradient(135deg, #7B1FA2, #BA68C8)' },
    { name: 'Arun Singh', location: 'Punjab', rating: 4.7, products: 15, emoji: '👨‍🌾', specialty: 'Basmati & Grains', gradient: 'linear-gradient(135deg, #E65100, #FF9800)' },
    { name: 'Lakshmi R.', location: 'Ratnagiri, MH', rating: 5.0, products: 6, emoji: '👩‍🌾', specialty: 'Alphonso Mangoes', gradient: 'linear-gradient(135deg, #C62828, #FF5252)' },
];

/* ─── Flash Deal helpers ─── */
const useCountdown = (hours: number) => {
    const [timeLeft, setTimeLeft] = useState(hours * 3600);
    useEffect(() => {
        const t = setInterval(() => setTimeLeft((p) => Math.max(0, p - 1)), 1000);
        return () => clearInterval(t);
    }, [hours]);
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return { h, m, s };
};

export const CustomerHome = () => {
    const { addItem } = useCartStore();
    const products = useProductStore((s) => s.products);
    const user = useAuthStore((s) => s.user);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [bannerIdx, setBannerIdx] = useState(0);
    const countdown = useCountdown(3);

    useEffect(() => {
        const timer = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
        return () => clearInterval(timer);
    }, []);
    const nextBanner = useCallback(() => setBannerIdx((i) => (i + 1) % BANNERS.length), []);
    const prevBanner = useCallback(() => setBannerIdx((i) => (i - 1 + BANNERS.length) % BANNERS.length), []);

    const categories = useMemo(() => {
        const cats = [...new Set(products.filter((p) => p.status === 'active').map((p) => p.category))];
        return ['All', ...cats];
    }, [products]);

    const activeProducts = useMemo(() => products.filter((p) => p.status === 'active'), [products]);

    const filteredProducts = useMemo(() => {
        let result = activeProducts;
        if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.farmerName.toLowerCase().includes(q));
        }
        return result;
    }, [activeProducts, activeCategory, searchQuery]);

    const trendingProducts = useMemo(() => activeProducts.slice(0, 6), [activeProducts]);
    const flashDeals = useMemo(() => activeProducts.filter((_, i) => i % 2 === 0).slice(0, 4), [activeProducts]);

    const handleAdd = (product: any) => {
        addItem({ id: product.id, name: product.name, price: product.price, image: product.image, farmerName: product.farmerName });
    };

    const isNew = (created: string) => { const d = Date.now() - new Date(created).getTime(); return d < 7 * 24 * 3600 * 1000; };

    const SectionHeader = ({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) => (
        <div className="flex items-center justify-between mb-4 lg:mb-5">
            <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black tracking-wide" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
            </div>
            {count !== undefined && <span className="text-[10px] lg:text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>{count} items</span>}
        </div>
    );

    const ProductCard = ({ product, idx: _idx, compact }: { product: any; idx: number; compact?: boolean }) => {
        const isNewProduct = isNew(product.createdAt);
        const stableRating = 4 + ((product.id.charCodeAt(0) % 10) / 10);
        return (
            <div
                onClick={() => setSelectedProduct(product)}
                className={`${compact ? 'rounded-[20px] p-3 min-w-[150px] sm:min-w-[170px] shrink-0' : 'rounded-[22px] sm:rounded-[28px] p-3 sm:p-4'} flex flex-col relative overflow-hidden cursor-pointer group transition-shadow duration-200 hover:shadow-lg`}
                style={{ backgroundColor: 'var(--color-bg-elevated)' }}
            >
                {/* Badges */}
                <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
                    {isNewProduct && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-sm">New</span>
                    )}
                    {product.category === 'Vegetables' && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5" style={{ backgroundColor: 'rgba(46,125,50,0.15)', color: '#2E7D32' }}>
                            <Leaf className="w-2.5 h-2.5" /> Organic
                        </span>
                    )}
                </div>

                <div className={`flex justify-center items-center ${compact ? 'text-5xl py-3' : 'text-6xl sm:text-7xl py-4 sm:py-5'} z-10`}>
                    {product.image}
                </div>
                <div className="z-10 mt-auto">
                    <h3 className={`font-bold ${compact ? 'text-xs' : 'text-sm sm:text-base'} leading-tight line-clamp-2`} style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
                    <p className="text-[9px] sm:text-[10px] font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>by {product.farmerName}</p>
                    <div className="flex items-center justify-between mt-1.5">
                        <span className={`font-black ${compact ? 'text-xs' : 'text-sm sm:text-base'}`} style={{ color: 'var(--color-accent)' }}>₹{product.price}/{product.unit}</span>
                        <div className="flex items-center gap-0.5 text-[9px] font-bold" style={{ color: '#F9A825' }}>
                            <Star className="w-2.5 h-2.5 fill-current" /> {stableRating.toFixed(1)}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                    className={`absolute bottom-2.5 right-2.5 ${compact ? 'w-7 h-7' : 'w-8 h-8 sm:w-9 sm:h-9'} rounded-xl flex items-center justify-center text-white z-20 shadow-md transition-transform duration-150 active:scale-90`}
                    style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Plus className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} />
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen pb-28 transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-primary)' }}>
            <div className="max-w-6xl mx-auto">

                {/* ═══ HEADER ═══ */}
                <header className="px-5 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-3 flex justify-between items-start">
                    <div>
                        <p className="text-sm lg:text-base" style={{ color: 'var(--color-text-muted)' }}>Hello!</p>
                        <h1 className="text-xl lg:text-3xl font-black tracking-wide mt-1">{user?.name || 'Welcome'}</h1>
                    </div>
                    <button className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center relative shadow-sm" style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}>
                        <Bell className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: '#E65100', borderColor: 'var(--color-bg-surface-alt)' }} />
                    </button>
                </header>

                {/* ═══ SEARCH ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-3 flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                        <input type="text" placeholder="Search products, categories..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl py-3.5 lg:py-4 pl-12 pr-5 focus:outline-none focus:ring-2 shadow-sm transition-colors text-sm lg:text-base"
                            style={{ backgroundColor: 'var(--color-bg-surface-alt)', color: 'var(--color-text-primary)' }} />
                    </div>
                </div>

                {/* ═══ LOYALTY REWARDS BAR ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-2">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl lg:rounded-3xl p-3.5 lg:p-5 flex items-center gap-3 lg:gap-4 overflow-hidden relative"
                        style={{ background: 'linear-gradient(135deg, #FFD54F 0%, #FF8F00 100%)' }}>
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl lg:text-2xl shrink-0">🎁</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm font-black text-amber-900">350 Reward Points</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-1.5 lg:h-2 rounded-full bg-white/30 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ delay: 0.5, duration: 1 }}
                                        className="h-full rounded-full bg-amber-900" />
                                </div>
                                <span className="text-[10px] lg:text-xs font-bold text-amber-900 shrink-0">150 to go!</span>
                            </div>
                        </div>
                        <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-amber-900/50 shrink-0" />
                    </motion.div>
                </div>

                {/* ═══ BANNER CAROUSEL ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-2">
                    <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px]">
                        <AnimatePresence mode="wait">
                            <motion.div key={bannerIdx}
                                initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4 }}
                                className="p-6 sm:p-8 lg:p-12 flex items-center justify-between min-h-[130px] sm:min-h-[150px] lg:min-h-[220px]"
                                style={{ background: BANNERS[bannerIdx].gradient }}>
                                <div className="flex-1">
                                    <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-white leading-tight">{BANNERS[bannerIdx].title}</h2>
                                    <p className="text-white/70 text-xs sm:text-sm lg:text-base mt-1.5 max-w-[220px] lg:max-w-[350px]">{BANNERS[bannerIdx].subtitle}</p>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="hidden lg:inline-flex mt-4 px-6 py-2.5 rounded-xl text-sm font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                        Shop Now →
                                    </motion.button>
                                </div>
                                <span className="text-5xl sm:text-6xl lg:text-8xl drop-shadow-xl shrink-0 ml-3">{BANNERS[bannerIdx].emoji}</span>
                            </motion.div>
                        </AnimatePresence>
                        <button onClick={prevBanner} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"><ChevronLeft className="w-3.5 h-3.5 lg:w-5 lg:h-5" /></button>
                        <button onClick={nextBanner} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"><ChevronRight className="w-3.5 h-3.5 lg:w-5 lg:h-5" /></button>
                        <div className="absolute bottom-2.5 lg:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 lg:gap-2">
                            {BANNERS.map((_, i) => <button key={i} onClick={() => setBannerIdx(i)} className="rounded-full transition-all duration-300" style={{ width: i === bannerIdx ? 18 : 5, height: i === bannerIdx ? 5 : 5, backgroundColor: i === bannerIdx ? 'white' : 'rgba(255,255,255,0.4)' }} />)}
                        </div>
                    </div>
                </div>

                {/* ═══ CATEGORIES ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-4">
                    <SectionHeader icon={<span className="text-lg">📂</span>} title="Categories" />
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1 lg:flex-wrap lg:overflow-visible lg:gap-5">
                        {categories.map((cat) => {
                            const cfg = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.Other;
                            const isActive = activeCategory === cat;
                            return (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className="flex flex-col items-center gap-2 shrink-0 lg:shrink">
                                    <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.08 }}
                                        className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center text-2xl lg:text-3xl shadow-md transition-all cursor-pointer"
                                        style={{ background: isActive ? cfg.gradient : 'var(--color-bg-surface-alt)', border: isActive ? '3px solid white' : '2px solid transparent', boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.25)' : 'none' }}>
                                        {cfg.emoji}
                                    </motion.div>
                                    <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-center" style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>{cat}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ═══ FLASH DEALS ═══ */}
                {flashDeals.length > 0 && (
                    <div className="px-5 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                    <Zap className="w-5 h-5" style={{ color: '#E65100' }} />
                                </motion.div>
                                <h2 className="text-lg sm:text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>Flash Deals</h2>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" style={{ color: '#E65100' }} />
                                <div className="flex gap-0.5">
                                    {[{ v: countdown.h, l: 'h' }, { v: countdown.m, l: 'm' }, { v: countdown.s, l: 's' }].map((t) => (
                                        <span key={t.l} className="text-[11px] font-black px-1.5 py-0.5 rounded-md text-white" style={{ backgroundColor: '#E65100' }}>
                                            {String(t.v).padStart(2, '0')}{t.l}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
                            {flashDeals.map((product, idx) => (
                                <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                                    whileHover={{ y: -3 }} onClick={() => setSelectedProduct(product)}
                                    className="rounded-[20px] p-3 min-w-[150px] sm:min-w-[170px] shrink-0 flex flex-col relative overflow-hidden cursor-pointer"
                                    style={{ backgroundColor: 'var(--color-bg-elevated)', border: '2px solid rgba(230, 81, 0, 0.15)' }}>
                                    <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-md text-white bg-gradient-to-r from-orange-500 to-red-500 z-10">-20%</span>
                                    <div className="flex justify-center items-center text-5xl py-3 drop-shadow-xl">{product.image}</div>
                                    <h3 className="font-bold text-xs leading-tight line-clamp-1" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="font-black text-xs" style={{ color: '#E65100' }}>₹{Math.round(product.price * 0.8)}</span>
                                        <span className="text-[10px] line-through" style={{ color: 'var(--color-text-muted)' }}>₹{product.price}</span>
                                    </div>
                                    <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                                        className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center text-white z-20 shadow-sm"
                                        style={{ backgroundColor: '#E65100' }}><Plus className="w-3.5 h-3.5" /></motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ SEASONAL PRODUCE ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-3">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-[24px] lg:rounded-[32px] p-5 sm:p-6 lg:p-10 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #FF6F00 0%, #FFB300 50%, #FF8F00 100%)' }}>
                        <div className="absolute -right-4 -bottom-4 text-[100px] opacity-20 rotate-12">🥭</div>
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900/60">In Season Now</span>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-1">Mango Season is Here! 🥭</h3>
                            <p className="text-white/70 text-xs sm:text-sm lg:text-base mt-1 max-w-[280px] lg:max-w-[400px]">Alphonso, Kesar & Dasheri — straight from orchards. Limited harvest!</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="mt-3 px-5 py-2 rounded-xl text-xs font-black bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                Shop Mangoes →
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* ═══ TRENDING / POPULAR ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-3">
                    <SectionHeader icon={<Flame className="w-5 h-5" style={{ color: '#E65100' }} />} title="Trending Now" />
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
                        {trendingProducts.map((product, idx) => (
                            <ProductCard key={product.id} product={product} idx={idx} compact />
                        ))}
                    </div>
                </div>

                {/* ═══ FARMER SPOTLIGHT ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-3">
                    <SectionHeader icon={<span className="text-lg">👨‍🌾</span>} title="Top Farmers" />
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
                        {FARMERS.map((farmer, idx) => (
                            <motion.div key={farmer.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -3 }}
                                className="rounded-[20px] min-w-[180px] sm:min-w-[200px] shrink-0 overflow-hidden cursor-pointer"
                                style={{ border: '1px solid var(--color-border)' }}>
                                <div className="p-4 text-center text-white relative" style={{ background: farmer.gradient }}>
                                    <span className="text-4xl drop-shadow-lg">{farmer.emoji}</span>
                                    <h4 className="font-black text-sm mt-2">{farmer.name}</h4>
                                    <div className="flex items-center justify-center gap-1 text-[10px] text-white/70 mt-0.5">
                                        <MapPin className="w-2.5 h-2.5" />{farmer.location}
                                    </div>
                                </div>
                                <div className="p-3" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
                                    <p className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{farmer.specialty}</p>
                                    <div className="flex items-center justify-between mt-1.5">
                                        <div className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: '#F9A825' }}>
                                            <Star className="w-3 h-3 fill-current" />{farmer.rating}
                                        </div>
                                        <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{farmer.products} products</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══ ALL PRODUCTS GRID ═══ */}
                <div className="px-5 sm:px-6 lg:px-8 py-3 mt-2">
                    <SectionHeader icon={<span className="text-lg">🛍️</span>} title={activeCategory === 'All' ? 'All Products' : activeCategory} count={filteredProducts.length} />

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-3">🔍</div>
                            <p className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>{searchQuery ? `No results for "${searchQuery}"` : 'No products in this category'}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
                            {filteredProducts.map((product, idx) => (
                                <ProductCard key={product.id} product={product} idx={idx} />
                            ))}
                        </div>
                    )}
                </div>

                <ProductDetailsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} />
            </div>
        </div>
    );
};
