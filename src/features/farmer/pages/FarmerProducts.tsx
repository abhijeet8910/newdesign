import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '../../../store/productStore';
import { useAuthStore } from '../../../store/authStore';
import { AddProductModal } from '../components/AddProductModal';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';
import type { Product } from '../../../services/productService';

const statusStyles: Record<string, { bg: string; text: string }> = {
    active: { bg: 'rgba(46, 125, 50, 0.1)', text: '#2E7D32' },
    sold: { bg: 'rgba(211, 47, 47, 0.1)', text: '#D32F2F' },
    draft: { bg: 'rgba(245, 124, 0, 0.1)', text: '#F57C00' },
};

export const FarmerProducts = () => {
    const user = useAuthStore((s) => s.user);
    const products = useProductStore((s) => s.products);
    const deleteProduct = useProductStore((s) => s.deleteProduct);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const myProducts = products.filter((p) => p.farmerId === (user?.id || '1'));
    const filtered = myProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        deleteProduct(id);
        setDeleteConfirm(null);
    };

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
                        <p className="text-white/70 mt-1 text-sm">Manage your farm produce listings ({myProducts.length} products)</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAddProduct(true)}
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
            {filtered.length === 0 ? (
                <div className="text-center py-16 px-2 sm:px-0">
                    <div className="text-6xl mb-4">🌱</div>
                    <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>
                        {searchQuery ? 'No products match your search' : 'No products yet'}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        {searchQuery ? 'Try a different search term' : 'Click "Add Product" to list your first produce'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2 sm:px-0">
                    {filtered.map((product, idx) => {
                        const ss = statusStyles[product.status] || statusStyles.active;
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedProduct(product)}
                                className="rounded-[28px] overflow-hidden group cursor-pointer transition-all"
                                style={{
                                    backgroundColor: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    boxShadow: 'var(--shadow-card)',
                                }}
                            >
                                {/* Product Image */}
                                <div className="h-40 flex items-center justify-center text-7xl relative"
                                    style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                    {product.image}
                                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg"
                                        style={{ backgroundColor: ss.bg, color: ss.text }}>{product.status}</span>
                                </div>

                                {/* Product Info */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
                                            <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{product.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-black" style={{ color: 'var(--color-accent)' }}>₹{product.price}/{product.unit}</span>
                                        <span className="text-xs px-2 py-1 rounded-lg font-bold"
                                            style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                            {product.quantity} {product.unit}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Actions */}
                                <div className="px-5 py-4 flex justify-between items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                    style={{ borderTop: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-primary)' }}>
                                    <button className="flex items-center gap-1.5 text-sm font-bold transition-colors"
                                        style={{ color: 'var(--color-accent)' }} onClick={(e) => { e.stopPropagation(); setEditProduct(product); }}>
                                        <Edit className="w-4 h-4" /> Edit
                                    </button>
                                    <button className="flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-red-500 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(product.id); }}>
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Product Detail Modal */}
            <DetailModal isOpen={!!selectedProduct && !deleteConfirm} onClose={() => setSelectedProduct(null)}
                title={selectedProduct?.name || ''} subtitle={selectedProduct?.category}
                accentColor="#4B6D53"
                icon={selectedProduct ? <span className="text-2xl">{selectedProduct.image}</span> : undefined}>
                {selectedProduct && (
                    <div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <span className="text-5xl">{selectedProduct.image}</span>
                            <div>
                                <p className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedProduct.name}</p>
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg"
                                    style={{ backgroundColor: (statusStyles[selectedProduct.status] || statusStyles.active).bg, color: (statusStyles[selectedProduct.status] || statusStyles.active).text }}>
                                    {selectedProduct.status}
                                </span>
                            </div>
                        </div>
                        <DetailRow label="Price" value={`₹${selectedProduct.price}/${selectedProduct.unit}`} color="var(--color-accent)" />
                        <DetailRow label="Quantity" value={`${selectedProduct.quantity} ${selectedProduct.unit}`} />
                        <DetailRow label="Category" value={selectedProduct.category} />
                        <DetailRow label="Description" value={selectedProduct.description} />
                        <DetailRow label="Listed On" value={new Date(selectedProduct.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    </div>
                )}
            </DetailModal>

            {/* Delete Confirmation Modal */}
            <DetailModal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}
                title="Delete Product?" subtitle="This action cannot be undone"
                accentColor="#D32F2F"
                icon={<Trash2 className="w-5 h-5" style={{ color: '#D32F2F' }} />}>
                <div>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                        Are you sure you want to remove this product from your listings?
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => setDeleteConfirm(null)}
                            className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                            style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                            Cancel
                        </button>
                        <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white">
                            Delete
                        </button>
                    </div>
                </div>
            </DetailModal>

            {/* Add/Edit Product Modal */}
            <AddProductModal isOpen={showAddProduct || !!editProduct} onClose={() => { setShowAddProduct(false); setEditProduct(null); }} editProduct={editProduct} />
        </div>
    );
};
