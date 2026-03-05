import { useState } from 'react';
import { Package, MapPin, ChevronRight, CheckCircle, Clock, X, Truck, Calendar, Star, XCircle, RotateCcw, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../../store/cartStore';

interface OrderItem { name: string; qty: string; price: number; image?: string }
interface Order {
    id: string; date: string; status: 'Delivered' | 'Shipped' | 'Processing' | 'Confirmed' | 'Cancelled'; total: number;
    items: OrderItem[]; deliveryAddress: string; paymentMethod: string; deliveryDate: string; trackingId: string;
}

const MOCK_ORDERS: Order[] = [
    { id: 'ORD-2026-892', date: 'Today, 02:45 PM', status: 'Delivered', total: 245, items: [{ name: 'Fresh Tomatoes', qty: '1 kg', price: 40, image: '🍅' }, { name: 'Red Onions', qty: '2 kg', price: 60, image: '🧅' }, { name: 'Green Cabbage', qty: '1 kg', price: 35, image: '🥬' }], deliveryAddress: 'Flat 401, Emerald Towers, Jubilee Hills', paymentMethod: 'UPI — PhonePe', deliveryDate: '5 Mar 2026, 4:30 PM', trackingId: 'ASW-TRK-892451' },
    { id: 'ORD-2026-871', date: 'Yesterday, 10:15 AM', status: 'Shipped', total: 150, items: [{ name: 'Farm Eggs', qty: '12 pcs', price: 84, image: '🥚' }, { name: 'Fresh Milk', qty: '2 L', price: 66, image: '🥛' }], deliveryAddress: 'Tech Park, Building C, Madhapur', paymentMethod: 'Cash on Delivery', deliveryDate: '6 Mar 2026, 12:00 PM', trackingId: 'ASW-TRK-871320' },
    { id: 'ORD-2026-800', date: '3 Mar 2026, 09:00 AM', status: 'Processing', total: 320, items: [{ name: 'Organic Potatoes', qty: '5 kg', price: 200, image: '🥔' }, { name: 'Fresh Coriander', qty: '500g', price: 20, image: '🌿' }], deliveryAddress: 'Flat 401, Emerald Towers, Jubilee Hills', paymentMethod: 'UPI — GPay', deliveryDate: '7 Mar 2026', trackingId: '—' },
    { id: 'ORD-2026-645', date: '28 Feb 2026, 04:30 PM', status: 'Cancelled', total: 450, items: [{ name: 'Basmati Rice', qty: '5 kg', price: 425, image: '🌾' }, { name: 'Turmeric', qty: '100g', price: 25, image: '🟡' }], deliveryAddress: 'Flat 401, Emerald Towers, Jubilee Hills', paymentMethod: 'Credit Card', deliveryDate: '—', trackingId: '—' },
];

const TRACKING_STEPS = ['Confirmed', 'Processing', 'Shipped', 'Delivered'] as const;

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle }> = {
    Delivered: { color: '#2E7D32', bg: 'rgba(46,125,50,0.12)', icon: CheckCircle },
    Shipped: { color: '#1565C0', bg: 'rgba(21,101,192,0.12)', icon: Truck },
    Processing: { color: '#F57C00', bg: 'rgba(245,124,0,0.12)', icon: Clock },
    Confirmed: { color: '#7B1FA2', bg: 'rgba(123,31,162,0.12)', icon: CheckCircle },
    Cancelled: { color: '#C62828', bg: 'rgba(198,40,40,0.12)', icon: XCircle },
};

const getStepIndex = (status: string) => {
    const idx = TRACKING_STEPS.indexOf(status as any);
    return idx >= 0 ? idx : -1;
};

export const CustomerOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const addItem = useCartStore((s) => s.addItem);

    const handleReorder = (order: Order) => {
        order.items.forEach((item) => {
            addItem({ id: `reorder-${item.name}-${Date.now()}`, name: item.name, price: item.price, image: item.image || '📦' });
        });
    };

    return (
        <div className="min-h-screen pb-28 transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-primary)' }}>
            <div className="max-w-5xl mx-auto">

                <header className="px-5 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-4 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wide">Your Orders</h1>
                    <div className="px-3 py-1.5 rounded-xl text-xs lg:text-sm font-bold" style={{ backgroundColor: 'var(--color-bg-surface-alt)', color: 'var(--color-text-primary)' }}>
                        {MOCK_ORDERS.length} Orders
                    </div>
                </header>

                <div className="px-5 sm:px-6 lg:px-8 mt-2 space-y-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                    {MOCK_ORDERS.map((order, idx) => {
                        const sc = statusConfig[order.status] || statusConfig.Processing;
                        const StatusIcon = sc.icon;
                        const stepIdx = getStepIndex(order.status);
                        return (
                            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                                className="rounded-[24px] p-5 shadow-sm transition-colors"
                                style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>

                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-base sm:text-lg" style={{ color: 'var(--color-text-primary)' }}>Order #{order.id.split('-')[2]}</h3>
                                            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{order.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-black text-lg sm:text-xl" style={{ color: 'var(--color-text-primary)' }}>₹{order.total}</span>
                                        <div className="flex items-center justify-end gap-1 text-[10px] font-bold uppercase mt-0.5" style={{ color: sc.color }}>
                                            <StatusIcon className="w-3 h-3" /> {order.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Timeline */}
                                {order.status !== 'Cancelled' && (
                                    <div className="mb-4 py-3 px-2">
                                        <div className="flex items-center justify-between relative">
                                            {/* Progress line bg */}
                                            <div className="absolute top-3 left-4 right-4 h-[3px] rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
                                            {/* Filled progress line */}
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${(stepIdx / (TRACKING_STEPS.length - 1)) * 100}%` }}
                                                transition={{ delay: 0.3, duration: 0.8 }}
                                                className="absolute top-3 left-4 h-[3px] rounded-full" style={{ backgroundColor: sc.color }} />
                                            {TRACKING_STEPS.map((step, si) => {
                                                const completed = si <= stepIdx;
                                                const isCurrent = si === stepIdx;
                                                return (
                                                    <div key={step} className="flex flex-col items-center z-10 relative" style={{ width: `${100 / TRACKING_STEPS.length}%` }}>
                                                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + si * 0.1 }}
                                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isCurrent ? 'ring-4 ring-offset-1' : ''}`}
                                                            style={{
                                                                backgroundColor: completed ? sc.color : 'var(--color-bg-primary)',
                                                                color: completed ? 'white' : 'var(--color-text-muted)',
                                                                border: completed ? 'none' : '2px solid var(--color-border)',
                                                            }}>
                                                            {completed ? '✓' : si + 1}
                                                        </motion.div>
                                                        <span className="text-[9px] font-bold mt-1.5 text-center" style={{ color: completed ? sc.color : 'var(--color-text-muted)' }}>{step}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Items with images */}
                                <div className="rounded-[16px] p-3 mb-3" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                    <div className="flex flex-col gap-2 text-sm font-bold">
                                        {order.items.slice(0, 3).map((item, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <span className="text-lg">{item.image || '📦'}</span>
                                                <span className="flex-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.name} × {item.qty}</span>
                                                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>₹{item.price}</span>
                                            </div>
                                        ))}
                                        {order.items.length > 3 && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>+{order.items.length - 3} more</span>}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t gap-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                                        <MapPin className="w-3.5 h-3.5" /> {order.deliveryAddress.split(',')[0]}
                                    </div>
                                    <div className="flex gap-2">
                                        {order.status !== 'Cancelled' && (
                                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                                onClick={() => handleReorder(order)}
                                                className="flex items-center gap-1.5 font-bold text-xs px-3 py-2 rounded-xl transition-all"
                                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                                <RotateCcw className="w-3.5 h-3.5" /> Reorder
                                            </motion.button>
                                        )}
                                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                            onClick={() => setSelectedOrder(order)}
                                            className="flex items-center gap-1 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm"
                                            style={{ backgroundColor: 'var(--color-accent)' }}>
                                            Details <ChevronRight className="w-3.5 h-3.5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ═══ Order Detail Modal ═══ */}
                <AnimatePresence>
                    {selectedOrder && (() => {
                        const sc = statusConfig[selectedOrder.status] || statusConfig.Processing;
                        const StatusIconModal = sc.icon;
                        const stepIdx = getStepIndex(selectedOrder.status);
                        return (
                            <>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                    onClick={() => setSelectedOrder(null)} />
                                <motion.div initial={{ opacity: 0, y: 60, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
                                    className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-[28px] shadow-2xl"
                                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

                                    {/* Modal Header */}
                                    <div className="sticky top-0 z-10 flex items-center justify-between p-5 rounded-t-[28px]"
                                        style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: sc.bg }}>
                                                <Package className="w-5 h-5" style={{ color: sc.color }} />
                                            </div>
                                            <div>
                                                <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>Order #{selectedOrder.id.split('-')[2]}</h2>
                                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{selectedOrder.date}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        {/* Status badge */}
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                                            <StatusIconModal className="w-4 h-4" /> {selectedOrder.status}
                                        </div>

                                        {/* Tracking in modal */}
                                        {selectedOrder.status !== 'Cancelled' && (
                                            <div className="py-3 px-2 rounded-xl" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                                <div className="flex items-center justify-between relative">
                                                    <div className="absolute top-3 left-4 right-4 h-[3px] rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(stepIdx / (TRACKING_STEPS.length - 1)) * 100}%` }}
                                                        transition={{ delay: 0.2, duration: 0.6 }}
                                                        className="absolute top-3 left-4 h-[3px] rounded-full" style={{ backgroundColor: sc.color }} />
                                                    {TRACKING_STEPS.map((step, si) => {
                                                        const completed = si <= stepIdx;
                                                        return (
                                                            <div key={step} className="flex flex-col items-center z-10 relative" style={{ width: `${100 / TRACKING_STEPS.length}%` }}>
                                                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                                                                    style={{ backgroundColor: completed ? sc.color : 'var(--color-bg-card)', color: completed ? 'white' : 'var(--color-text-muted)', border: completed ? 'none' : '2px solid var(--color-border)' }}>
                                                                    {completed ? '✓' : si + 1}
                                                                </div>
                                                                <span className="text-[9px] font-bold mt-1.5 text-center" style={{ color: completed ? sc.color : 'var(--color-text-muted)' }}>{step}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Items */}
                                        <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                            <h4 className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>Items</h4>
                                            {selectedOrder.items.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < selectedOrder.items.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{item.image || '📦'}</span>
                                                        <div>
                                                            <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                                                            <span className="text-xs ml-1.5" style={{ color: 'var(--color-text-muted)' }}>× {item.qty}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>₹{item.price}</span>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: '2px solid var(--color-border)' }}>
                                                <span className="text-sm font-black" style={{ color: 'var(--color-text-primary)' }}>Total</span>
                                                <span className="text-lg font-black" style={{ color: 'var(--color-accent)' }}>₹{selectedOrder.total}</span>
                                            </div>
                                        </div>

                                        {/* Detail rows */}
                                        {[
                                            { icon: MapPin, label: 'Delivery Address', value: selectedOrder.deliveryAddress },
                                            { icon: Calendar, label: 'Delivery Date', value: selectedOrder.deliveryDate },
                                            { icon: Truck, label: 'Tracking ID', value: selectedOrder.trackingId },
                                            { icon: Star, label: 'Payment', value: selectedOrder.paymentMethod },
                                        ].map((row, i) => (
                                            <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                                <row.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-muted)' }}>{row.label}</span>
                                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{row.value}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-2">
                                            {selectedOrder.status === 'Delivered' && (
                                                <button className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>⭐ Rate Order</button>
                                            )}
                                            {selectedOrder.status !== 'Cancelled' && (
                                                <button onClick={() => { handleReorder(selectedOrder); setSelectedOrder(null); }}
                                                    className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
                                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                                    <ShoppingCart className="w-4 h-4" /> Reorder
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </div>
    );
};
