import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Plus, Minus, Star, Heart } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';

interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

export const ProductDetailsModal = ({ isOpen, onClose, product }: ProductDetailsModalProps) => {
    const { items, addItem, updateQuantity } = useCartStore();

    if (!product) return null;

    const cartItem = items.find(i => i.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center sm:p-4"
                        style={{ backgroundColor: 'rgba(15, 26, 19, 0.7)' }}
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative transition-colors"
                            style={{ backgroundColor: 'var(--color-bg-card)' }}
                        >
                            {/* Top Image Area */}
                            <div className="relative pt-12 pb-8 rounded-b-[40px] z-10"
                                style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-colors"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center cursor-pointer transition-colors"
                                    style={{ color: 'var(--color-accent)' }}>
                                    <Heart className="w-5 h-5" />
                                </div>

                                <motion.div
                                    initial={{ scale: 0.8, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{ delay: 0.1, type: "spring" }}
                                    className="w-full flex justify-center items-center text-[180px] drop-shadow-2xl"
                                >
                                    {product.image}
                                </motion.div>
                            </div>

                            {/* Details */}
                            <div className="p-8 pb-32 overflow-y-auto hide-scrollbar -mt-6 z-0 pt-12 transition-colors"
                                style={{ backgroundColor: 'var(--color-bg-card)' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-4xl font-black leading-none tracking-tight" style={{ color: 'var(--color-accent)' }}>{product.name}</h2>
                                    <span className="text-3xl font-black px-3 py-1 rounded-2xl"
                                        style={{ color: 'var(--color-text-secondary)', border: '2px solid var(--color-border)' }}>
                                        ${product.price}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                                        <span>4.9</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                        <Clock className="w-4 h-4" />
                                        <span>Delivery in 2 hrs</span>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-text-primary)' }}>About</h3>
                                    <p className="leading-relaxed font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                        This {product.name} is freshly harvested and carefully sorted for the best quality. Perfect for your daily needs and sourced directly from verified local farmers.
                                    </p>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <div className="flex-1 p-4 rounded-3xl flex flex-col items-center justify-center text-center"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', border: '1px solid var(--color-border-subtle)' }}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-xl bg-white/30">🌱</div>
                                        <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>100% Organic</span>
                                    </div>
                                    <div className="flex-1 p-4 rounded-3xl flex flex-col items-center justify-center text-center"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', border: '1px solid var(--color-border-subtle)' }}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-xl bg-white/30">⭐</div>
                                        <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>Farm Fresh</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Action */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20"
                                style={{
                                    background: `linear-gradient(to top, var(--color-bg-card) 60%, transparent)`,
                                }}>
                                {quantity === 0 ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAdd}
                                        className="w-full text-white font-bold text-lg py-5 rounded-[24px] shadow-xl transition-all flex items-center justify-center gap-2"
                                        style={{ backgroundColor: 'var(--color-accent)' }}
                                    >
                                        <Plus className="w-6 h-6" /> Add to Cart
                                    </motion.button>
                                ) : (
                                    <div className="w-full flex items-center justify-between text-white rounded-[24px] shadow-xl p-2"
                                        style={{ backgroundColor: 'var(--color-accent)' }}>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                            className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                                        >
                                            <Minus className="w-6 h-6" />
                                        </button>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-medium uppercase tracking-widest" style={{ opacity: 0.6 }}>In Cart</span>
                                            <span className="font-black text-2xl leading-none">{quantity}</span>
                                        </div>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                            className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
