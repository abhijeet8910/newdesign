import { useState } from 'react';
import { Truck, Search, Filter, Star, Clock, MapPin, Users, PackageOpen, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const PIPELINE = [
    {
        id: 1, stage: 'Requested', color: 'bg-amber-400', items: [
            { name: 'Organic Rice — 500kg', supplier: 'Ravi Farms', amount: '₹ 30,000', date: 'Mar 5', rating: 4.8, location: 'Andhra Pradesh', quality: 'Grade A', paymentTerms: 'Net 30', deliveryEst: 'Mar 8' },
            { name: 'Fresh Mangoes — 200kg', supplier: 'Konkan Growers', amount: '₹ 60,000', date: 'Mar 6', rating: 4.5, location: 'Maharashtra', quality: 'Premium', paymentTerms: 'Advance', deliveryEst: 'Mar 10' },
            { name: 'Red Chilli — 50kg', supplier: 'Guntur Spices', amount: '₹ 15,000', date: 'Mar 7', rating: 4.9, location: 'Andhra Pradesh', quality: 'Grade A+', paymentTerms: 'Net 15', deliveryEst: 'Mar 9' },
        ]
    },
    {
        id: 2, stage: 'In Transit', color: 'bg-blue-400', items: [
            { name: 'Premium Wheat — 1T', supplier: 'Punjab Harvest', amount: '₹ 45,000', date: 'Mar 3', rating: 4.7, location: 'Punjab', quality: 'Grade A', paymentTerms: 'Net 30', deliveryEst: 'Mar 6' },
            { name: 'Basmati Rice — 500kg', supplier: 'Dehradun Farms', amount: '₹ 55,000', date: 'Mar 4', rating: 4.6, location: 'Uttarakhand', quality: 'Premium', paymentTerms: 'Net 30', deliveryEst: 'Mar 7' },
        ]
    },
    {
        id: 3, stage: 'Delivered', color: 'bg-emerald-400', items: [
            { name: 'Red Onions — 300kg', supplier: 'Nashik Agri', amount: '₹ 9,000', date: 'Mar 1', rating: 4.3, location: 'Maharashtra', quality: 'Grade B+', paymentTerms: 'Net 15', deliveryEst: 'Delivered' },
            { name: 'Turmeric — 100kg', supplier: 'Kerala Spices', amount: '₹ 25,000', date: 'Feb 28', rating: 4.9, location: 'Kerala', quality: 'Organic', paymentTerms: 'Advance', deliveryEst: 'Delivered' },
            { name: 'Green Cardamom — 20kg', supplier: 'Coorg Plantations', amount: '₹ 40,000', date: 'Feb 25', rating: 5.0, location: 'Karnataka', quality: 'Premium', paymentTerms: 'Net 30', deliveryEst: 'Delivered' },
        ]
    },
];

type PipelineItem = typeof PIPELINE[0]['items'][0];

const TOP_SUPPLIERS = [
    { name: 'Ravi Farms', location: 'Andhra Pradesh', products: 'Rice, Wheat', orders: 45, rating: 4.8, avatar: '🌾', reliability: 96, contact: '+91 98765 43210', email: 'ravi@farms.in', since: 'Jan 2024', totalSpend: '₹ 13,50,000' },
    { name: 'Konkan Growers', location: 'Maharashtra', products: 'Mangoes, Cashew', orders: 32, rating: 4.5, avatar: '🥭', reliability: 92, contact: '+91 87654 32109', email: 'info@konkan.com', since: 'Mar 2024', totalSpend: '₹ 10,24,000' },
    { name: 'Kerala Spices Co.', location: 'Kerala', products: 'Turmeric, Pepper', orders: 28, rating: 4.9, avatar: '🌿', reliability: 98, contact: '+91 76543 21098', email: 'info@keralaspices.in', since: 'Feb 2024', totalSpend: '₹ 11,20,000' },
    { name: 'Punjab Harvest', location: 'Punjab', products: 'Wheat, Maize', orders: 56, rating: 4.7, avatar: '🌽', reliability: 94, contact: '+91 65432 10987', email: 'sales@punjabharvest.in', since: 'Nov 2023', totalSpend: '₹ 25,20,000' },
    { name: 'Nashik Agri Corp', location: 'Maharashtra', products: 'Onions, Grapes', orders: 22, rating: 4.3, avatar: '🧅', reliability: 88, contact: '+91 54321 09876', email: 'info@nashikagri.in', since: 'Jun 2024', totalSpend: '₹ 6,60,000' },
    { name: 'Coorg Plantations', location: 'Karnataka', products: 'Coffee, Cardamom', orders: 18, rating: 5.0, avatar: '☕', reliability: 100, contact: '+91 43210 98765', email: 'sales@coorg.in', since: 'Apr 2024', totalSpend: '₹ 7,20,000' },
];

type Supplier = typeof TOP_SUPPLIERS[0];

export const BusinessProcurement = () => {
    const [view, setView] = useState<'pipeline' | 'suppliers'>('pipeline');
    const [selectedItem, setSelectedItem] = useState<{ data: PipelineItem; stage: string } | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">
            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden text-white -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #2F4A35 0%, #4B6D53 50%, #3B5A42 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">Supply Chain</span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Procurement Pipeline</h1>
                        <p className="text-white/60 mt-1 text-sm">Track orders from request to delivery.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        <PackageOpen className="w-5 h-5" /> New Order
                    </motion.button>
                </div>
            </motion.div>

            {/* Pipeline Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {PIPELINE.map((stage, i) => (
                    <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="p-4 rounded-2xl text-center"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${stage.color}`} />
                        <p className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>{stage.items.length}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{stage.stage}</p>
                    </motion.div>
                ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
                {[
                    { key: 'pipeline' as const, label: 'Order Pipeline', icon: Truck },
                    { key: 'suppliers' as const, label: 'Suppliers Directory', icon: Users },
                ].map((tab) => (
                    <button key={tab.key} onClick={() => setView(tab.key)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all"
                        style={{
                            backgroundColor: view === tab.key ? 'var(--color-accent)' : 'var(--color-bg-card)',
                            color: view === tab.key ? 'white' : 'var(--color-text-secondary)',
                            border: view === tab.key ? 'none' : '1px solid var(--color-border)',
                        }}>
                        <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Pipeline View */}
            {view === 'pipeline' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PIPELINE.map((stage, stageIdx) => (
                        <motion.div key={stage.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: stageIdx * 0.1 }}
                            className="rounded-[28px] p-5"
                            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                                <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{stage.stage}</h3>
                                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>{stage.items.length}</span>
                            </div>
                            <div className="space-y-3">
                                {stage.items.map((item, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedItem({ data: item, stage: stage.stage })}
                                        className="p-4 rounded-2xl cursor-pointer transition-colors"
                                        style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                        <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.name}</p>
                                        <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{item.supplier}</p>
                                        <p className="text-[10px] flex items-center gap-1 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                            <MapPin className="w-3 h-3" /> {item.location}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black" style={{ color: 'var(--color-accent)' }}>{item.amount}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-600">
                                                    <Star className="w-3 h-3 fill-current" /> {item.rating}
                                                </span>
                                                <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                    <Clock className="w-3 h-3" /> {item.date}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Suppliers View */}
            {view === 'suppliers' && (
                <div>
                    <div className="flex gap-3 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                            <input type="text" placeholder="Search suppliers..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <button className="px-4 rounded-xl flex items-center gap-2 text-sm font-bold"
                            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {TOP_SUPPLIERS.map((supplier, idx) => (
                            <motion.div key={supplier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -4 }} onClick={() => setSelectedSupplier(supplier)}
                                className="rounded-[28px] p-5 cursor-pointer transition-all"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl">{supplier.avatar}</div>
                                    <div>
                                        <h3 className="font-black text-base" style={{ color: 'var(--color-text-primary)' }}>{supplier.name}</h3>
                                        <p className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                                            <MapPin className="w-3 h-3" /> {supplier.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>{supplier.products}</p>
                                <div className="flex gap-2 flex-wrap mb-4">
                                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                                        style={{ backgroundColor: '#F57C0015', color: '#F57C00' }}>
                                        <Star className="w-3 h-3 fill-current" /> {supplier.rating}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-1 rounded-lg"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>{supplier.orders} orders</span>
                                    <span className="text-xs font-bold px-2 py-1 rounded-lg"
                                        style={{ backgroundColor: '#2E7D3215', color: '#2E7D32' }}>{supplier.reliability}% reliable</span>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="flex-1 py-2 rounded-xl text-sm font-bold text-white transition-all"
                                        style={{ backgroundColor: 'var(--color-accent)' }}>Order Now</motion.button>
                                    <button className="px-3 py-2 rounded-xl text-sm font-bold transition-colors"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pipeline Item Detail Modal */}
            <DetailModal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}
                title={selectedItem?.data.name || ''} subtitle={`${selectedItem?.stage} • ${selectedItem?.data.supplier}`}
                accentColor="#4B6D53"
                icon={<PackageOpen className="w-5 h-5" style={{ color: '#4B6D53' }} />}>
                {selectedItem && (
                    <div>
                        <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <p className="text-2xl font-black" style={{ color: 'var(--color-accent)' }}>{selectedItem.data.amount}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Status: {selectedItem.stage}</p>
                        </div>
                        <DetailRow label="Supplier" value={selectedItem.data.supplier} />
                        <DetailRow label="Location" value={selectedItem.data.location} />
                        <DetailRow label="Quality" value={selectedItem.data.quality} />
                        <DetailRow label="Rating" value={`⭐ ${selectedItem.data.rating}`} />
                        <DetailRow label="Payment Terms" value={selectedItem.data.paymentTerms} />
                        <DetailRow label="Order Date" value={selectedItem.data.date} />
                        <DetailRow label="Expected Delivery" value={selectedItem.data.deliveryEst} />
                    </div>
                )}
            </DetailModal>

            {/* Supplier Detail Modal */}
            <DetailModal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)}
                title={selectedSupplier?.name || ''} subtitle={selectedSupplier?.location}
                accentColor="#4B6D53"
                icon={selectedSupplier ? <span className="text-2xl">{selectedSupplier.avatar}</span> : undefined}>
                {selectedSupplier && (
                    <div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <span className="text-5xl">{selectedSupplier.avatar}</span>
                            <div>
                                <p className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedSupplier.name}</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-yellow-500/10 text-yellow-600">
                                        <Star className="w-3 h-3 fill-current" /> {selectedSupplier.rating}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600">{selectedSupplier.reliability}%</span>
                                </div>
                            </div>
                        </div>
                        <DetailRow label="Products" value={selectedSupplier.products} />
                        <DetailRow label="Total Orders" value={String(selectedSupplier.orders)} />
                        <DetailRow label="Total Spend" value={selectedSupplier.totalSpend} color="var(--color-accent)" />
                        <DetailRow label="Contact" value={selectedSupplier.contact} />
                        <DetailRow label="Email" value={selectedSupplier.email} />
                        <DetailRow label="Partner Since" value={selectedSupplier.since} />
                        <DetailRow label="Reliability" value={`${selectedSupplier.reliability}%`} color="#2E7D32" />

                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full mt-5 py-2.5 rounded-xl text-sm font-bold text-white"
                            style={{ backgroundColor: 'var(--color-accent)' }}>Place New Order</motion.button>
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
