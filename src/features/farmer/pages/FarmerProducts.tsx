import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS = [
    { id: '1', name: 'Fresh Tomatoes', category: 'Vegetables', price: '₹40/kg', stock: '250 kg', image: '🍅' },
    { id: '2', name: 'Organic Rice', category: 'Grains', price: '₹80/kg', stock: '1,200 kg', image: '🌾' },
    { id: '3', name: 'Farm Eggs', category: 'Dairy', price: '₹7/pc', stock: '500 pcs', image: '🥚' },
    { id: '4', name: 'Fresh Mangoes', category: 'Fruits', price: '₹120/kg', stock: '300 kg', image: '🥭' },
];

export const FarmerProducts = () => {
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
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">My Products</h1>
                        <p className="text-white/70 mt-1 text-sm">Manage your farm produce listings</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md text-white transition-all"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                        <Plus className="w-5 h-5" /> Add Product
                    </motion.button>
                </div>
            </motion.div>

            {/* Search & Filter Toolbar */}
            <div className="flex gap-3 mb-8 px-2 sm:px-0">
                <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <Search className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search products..."
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

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2 sm:px-0">
                {MOCK_PRODUCTS.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="rounded-[28px] overflow-hidden group cursor-pointer transition-all"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            boxShadow: 'var(--shadow-card)',
                        }}
                    >
                        {/* Product Image */}
                        <div className="h-40 flex items-center justify-center text-7xl"
                            style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                            {product.image}
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
                                    <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{product.category}</p>
                                </div>
                                <button className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                                    style={{ color: 'var(--color-text-secondary)' }}>
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <span className="font-black" style={{ color: 'var(--color-accent)' }}>{product.price}</span>
                                <span className="text-xs px-2 py-1 rounded-lg font-bold"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                    {product.stock}
                                </span>
                            </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="px-5 py-4 flex justify-between items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                            style={{ borderTop: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-primary)' }}>
                            <button className="flex items-center gap-1.5 text-sm font-bold transition-colors"
                                style={{ color: 'var(--color-accent)' }}>
                                <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" /> Remove
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
