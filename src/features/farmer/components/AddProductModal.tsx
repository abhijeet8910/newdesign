import { useState, useEffect } from 'react';
import { X, Package, Sprout, IndianRupee, Scale, FileText, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../../../store/productStore';
import { useAuthStore } from '../../../store/authStore';
import type { Product } from '../../../services/productService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    editProduct?: Product | null;
}

const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy', 'Pulses', 'Oilseeds', 'Other'];
const UNITS = ['kg', 'quintal', 'ton', 'dozen', 'pieces', 'litre'];
const EMOJIS: Record<string, string> = {
    Vegetables: '🥬', Fruits: '🍎', Grains: '🌾', Spices: '🌿',
    Dairy: '🥛', Pulses: '🫘', Oilseeds: '🌻', Other: '📦',
};

export const AddProductModal = ({ isOpen, onClose, editProduct }: Props) => {
    const addProduct = useProductStore((s) => s.addProduct);
    const updateProduct = useProductStore((s) => s.updateProduct);
    const user = useAuthStore((s) => s.user);
    const isEditMode = !!editProduct;

    const emptyForm = { name: '', category: 'Vegetables', price: '', quantity: '', unit: 'kg', description: '' };
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (editProduct) {
            setForm({ name: editProduct.name, category: editProduct.category, price: String(editProduct.price), quantity: String(editProduct.quantity), unit: editProduct.unit, description: editProduct.description });
        } else {
            setForm(emptyForm);
        }
        setErrors({});
        setSuccess(false);
    }, [editProduct, isOpen]);

    const update = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = 'Product name is required';
        if (!form.price || Number(form.price) <= 0) errs.price = 'Enter a valid price';
        if (!form.quantity || Number(form.quantity) <= 0) errs.quantity = 'Enter a valid quantity';
        if (!form.description.trim()) errs.description = 'Description is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate a small delay (this is where the API call would go)
        await new Promise((r) => setTimeout(r, 600));

        if (isEditMode && editProduct) {
            updateProduct(editProduct.id, {
                name: form.name.trim(),
                category: form.category,
                price: Number(form.price),
                quantity: Number(form.quantity),
                unit: form.unit,
                description: form.description.trim(),
                image: EMOJIS[form.category] || '📦',
            });
        } else {
            addProduct({
                id: crypto.randomUUID(),
                name: form.name.trim(),
                category: form.category,
                price: Number(form.price),
                quantity: Number(form.quantity),
                unit: form.unit,
                description: form.description.trim(),
                image: EMOJIS[form.category] || '📦',
                farmerId: user?.id || '1',
                farmerName: user?.name || 'Unknown Farmer',
                createdAt: new Date().toISOString(),
                status: 'active',
            });
        }

        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setForm(emptyForm);
            onClose();
        }, 1200);
    };

    const inputClass = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all";
    const inputStyle = (hasError: boolean) => ({
        backgroundColor: 'var(--color-bg-primary)',
        border: `1.5px solid ${hasError ? '#D32F2F' : 'var(--color-border)'}`,
        color: 'var(--color-text-primary)',
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15, 26, 19, 0.6)', backdropFilter: 'blur(8px)' }}
                        onClick={onClose} />

                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed inset-x-4 bottom-4 top-auto sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-[28px] shadow-2xl"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-5 rounded-t-[28px]"
                            style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl" style={{ backgroundColor: '#4B6D5315' }}>
                                    <Sprout className="w-5 h-5" style={{ color: '#4B6D53' }} />
                                </div>
                                <div>
                                    <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{isEditMode ? 'Update your product details' : 'List a new produce on the marketplace'}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-xl transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Success State */}
                        {success ? (
                            <div className="p-10 text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">✅</motion.div>
                                <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{isEditMode ? 'Product Updated!' : 'Product Added!'}</h3>
                                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{isEditMode ? 'Your changes have been saved.' : 'Your listing is now live on the marketplace.'}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                {/* Product Name */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <Package className="w-3.5 h-3.5" /> Product Name
                                    </label>
                                    <input type="text" placeholder="e.g. Organic Basmati Rice" value={form.name}
                                        onChange={(e) => update('name', e.target.value)} className={inputClass} style={inputStyle(!!errors.name)} />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <Tag className="w-3.5 h-3.5" /> Category
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {CATEGORIES.map((cat) => (
                                            <button key={cat} type="button" onClick={() => update('category', cat)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                                style={{
                                                    backgroundColor: form.category === cat ? 'var(--color-accent)' : 'var(--color-bg-primary)',
                                                    color: form.category === cat ? 'white' : 'var(--color-text-secondary)',
                                                    border: form.category === cat ? 'none' : '1px solid var(--color-border)',
                                                }}>
                                                {EMOJIS[cat]} {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & Quantity row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            <IndianRupee className="w-3.5 h-3.5" /> Price (₹)
                                        </label>
                                        <input type="number" placeholder="e.g. 85" value={form.price}
                                            onChange={(e) => update('price', e.target.value)} className={inputClass} style={inputStyle(!!errors.price)} />
                                        {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            <Scale className="w-3.5 h-3.5" /> Quantity
                                        </label>
                                        <input type="number" placeholder="e.g. 500" value={form.quantity}
                                            onChange={(e) => update('quantity', e.target.value)} className={inputClass} style={inputStyle(!!errors.quantity)} />
                                        {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
                                    </div>
                                </div>

                                {/* Unit */}
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>Unit</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {UNITS.map((u) => (
                                            <button key={u} type="button" onClick={() => update('unit', u)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                                style={{
                                                    backgroundColor: form.unit === u ? 'var(--color-accent)' : 'var(--color-bg-primary)',
                                                    color: form.unit === u ? 'white' : 'var(--color-text-secondary)',
                                                    border: form.unit === u ? 'none' : '1px solid var(--color-border)',
                                                }}>
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <FileText className="w-3.5 h-3.5" /> Description
                                    </label>
                                    <textarea placeholder="Describe your produce — quality, farming method, origin..."
                                        value={form.description} onChange={(e) => update('description', e.target.value)}
                                        rows={3} className={inputClass + ' resize-none'} style={inputStyle(!!errors.description)} />
                                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                                </div>

                                {/* Submit */}
                                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-xl text-sm font-black text-white disabled:opacity-60 transition-all"
                                    style={{ backgroundColor: 'var(--color-accent)' }}>
                                    {isSubmitting ? (isEditMode ? '⏳ Updating...' : '⏳ Adding...') : (isEditMode ? '✏️ Update Product' : '✨ Add Product')}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
