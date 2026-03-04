import { useState } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { Search, Bell, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductDetailsModal } from '../components/ProductDetailsModal';

const CATEGORIES = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Vegetables' },
    { id: '3', name: 'Fruits' },
    { id: '4', name: 'Grains' },
];

const MOCK_PRODUCTS = [
    { id: 'p1', name: 'Fresh Tomatoes', price: 2, image: '🍅' },
    { id: 'p2', name: 'Organic Potatoes', price: 1.5, image: '🥔' },
    { id: 'p3', name: 'Farm Onions', price: 1, image: '🧅' },
    { id: 'p4', name: 'Green Cabbage', price: 3, image: '🥬' },
];

export const CustomerHome = () => {
    const { addItem } = useCartStore();
    const [activeCategory, setActiveCategory] = useState('1');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleAdd = (product: any) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <div className="min-h-screen pb-24 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'white' }}>

            {/* Header */}
            <header className="px-6 pt-10 pb-4 flex justify-between items-start">
                <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Hello!</p>
                    <h1 className="text-xl font-black tracking-wide mt-1">Nuril Anggara</h1>
                </div>
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-sm transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}>
                    <Bell className="w-5 h-5 text-white" />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-white rounded-full border-2"
                        style={{ borderColor: 'var(--color-bg-surface-alt)' }}></span>
                </button>
            </header>

            {/* Search */}
            <div className="px-6 py-4 flex gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-full rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-1 shadow-sm transition-colors text-white"
                        style={{
                            backgroundColor: 'var(--color-bg-surface-alt)',
                            color: 'white',
                        }}
                    />
                </div>
                <button className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}>
                    <Search className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                </button>
            </div>

            {/* Categories */}
            <div className="px-6 py-2">
                <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className="relative pb-2 whitespace-nowrap"
                        >
                            <span className={`text-base font-medium tracking-wide transition-colors ${activeCategory === cat.id ? 'text-white' : ''}`}
                                style={{ color: activeCategory === cat.id ? 'white' : 'var(--color-text-muted)' }}>
                                {cat.name}
                            </span>
                            {activeCategory === cat.id && (
                                <motion.div
                                    layoutId="category-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-6 mt-8">
                <h2 className="text-2xl font-black tracking-wider mb-6">Fresh Produce</h2>

                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                    {MOCK_PRODUCTS.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedProduct(product)}
                            className="rounded-[28px] p-4 flex flex-col relative aspect-[4/5] overflow-hidden cursor-pointer group transition-colors"
                            style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                        >
                            <div className="flex-1 flex justify-center items-center text-8xl z-10 drop-shadow-2xl">
                                {product.image}
                            </div>
                            <div className="z-10 mt-auto">
                                <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--color-accent)' }}>{product.name}</h3>
                                <p className="font-semibold mt-1" style={{ color: 'var(--color-bg-surface-alt)' }}>${product.price}</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                                className="absolute bottom-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-white z-20 shadow-md transition-colors"
                                style={{ backgroundColor: 'var(--color-accent)' }}
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Promotion Section */}
            <div className="px-6 mt-10 mb-8">
                <h2 className="text-[28px] font-black tracking-wider mb-2">Promotion</h2>
                <p className="text-sm leading-relaxed max-w-[80%]" style={{ color: 'var(--color-text-muted)' }}>
                    Check out our daily mandi prices and get bigger wholesale promos
                </p>
            </div>

            <ProductDetailsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} />
        </div>
    );
};
