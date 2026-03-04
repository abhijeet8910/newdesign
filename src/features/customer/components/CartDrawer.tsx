import { X, ShoppingBag, Plus, Minus, ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../../store/cartStore';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, totalAmount, totalItems, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    const deliveryFee = 25;
    const taxes = Math.round(totalAmount * 0.05);
    const finalTotal = totalAmount + deliveryFee + taxes;

    const handleCheckout = () => {
        onClose();
        alert('Proceeding to dummy payment gateway...');
        navigate('/customer/orders');
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
                        className="fixed inset-0 backdrop-blur-sm z-50 transition-opacity"
                        style={{ backgroundColor: 'rgba(15, 26, 19, 0.5)' }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md shadow-2xl z-50 flex flex-col overflow-hidden sm:rounded-l-[40px] transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-primary)' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 shrink-0 shadow-sm z-10"
                            style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="font-black text-2xl leading-tight" style={{ color: 'var(--color-accent)' }}>Your Cart</h2>
                                    <p className="font-bold" style={{ color: 'var(--color-text-secondary)' }}>{totalItems} items</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl transition-all"
                                style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="px-8 py-4 shrink-0 flex items-center gap-3"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}>
                            <div className="bg-white/40 p-2 rounded-xl">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold">Delivery in 2 hrs</h3>
                                <p className="text-sm flex items-center gap-1 font-semibold" style={{ opacity: 0.7 }}>
                                    <MapPin className="w-3.5 h-3.5" /> 123, Jubilee Hills, Hyderabad
                                </p>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4">
                                    <ShoppingBag className="w-20 h-20" style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
                                    <p className="font-bold text-lg" style={{ color: 'var(--color-text-secondary)' }}>Your cart is empty</p>
                                    <button onClick={onClose} className="font-black underline transition-colors" style={{ color: 'var(--color-accent)' }}>
                                        Browse Produce
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex gap-4 p-4 rounded-[28px] shadow-sm items-center"
                                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}
                                    >
                                        <div className="w-20 h-20 rounded-[20px] flex items-center justify-center text-5xl shrink-0"
                                            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                                            {item.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-lg truncate leading-tight" style={{ color: 'var(--color-accent)' }}>{item.name}</h4>
                                            <div className="font-bold text-base mt-1 inline-block px-3 rounded-xl"
                                                style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <div className="flex items-center text-white rounded-[16px] shadow-md overflow-hidden h-10 w-24"
                                                style={{ backgroundColor: 'var(--color-accent)' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="flex-1 h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="flex-1 h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}

                            {/* Bill Details */}
                            {items.length > 0 && (
                                <div className="rounded-[32px] p-6 mt-8"
                                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="font-black text-xl mb-4" style={{ color: 'var(--color-accent)' }}>Bill Details</h3>
                                    <div className="space-y-3 text-[15px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                        <div className="flex justify-between">
                                            <span>Item Total</span>
                                            <span style={{ color: 'var(--color-text-primary)' }}>${totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Fee</span>
                                            <span style={{ color: 'var(--color-text-primary)' }}>${deliveryFee}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Taxes</span>
                                            <span style={{ color: 'var(--color-text-primary)' }}>${taxes}</span>
                                        </div>
                                        <div className="my-4" style={{ borderTop: '2px dashed var(--color-border)' }} />
                                        <div className="flex justify-between font-black text-xl" style={{ color: 'var(--color-text-primary)' }}>
                                            <span>Grand Total</span>
                                            <span>${finalTotal}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 shrink-0" style={{ borderTop: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-card)' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    className="w-full text-white font-black py-5 rounded-[24px] shadow-xl flex items-center justify-between px-8 transition-all"
                                    style={{ backgroundColor: 'var(--color-accent)' }}
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="text-xl leading-none mb-1">${finalTotal}</span>
                                        <span className="text-xs uppercase tracking-widest font-bold" style={{ opacity: 0.6 }}>Total</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        Checkout <ArrowRight className="w-6 h-6" />
                                    </div>
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
