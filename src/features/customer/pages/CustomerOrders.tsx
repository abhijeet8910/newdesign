import { Package, MapPin, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
    {
        id: 'ORD-2026-892',
        date: 'Today, 02:45 PM',
        status: 'Delivered',
        total: 245,
        items: [
            { name: 'Fresh Tomatoes', qty: '1 kg' },
            { name: 'Onions', qty: '2 kg' }
        ]
    },
    {
        id: 'ORD-2026-871',
        date: 'Yesterday, 10:15 AM',
        status: 'Delivered',
        total: 150,
        items: [
            { name: 'Farm Eggs', qty: '12 pcs' },
            { name: 'Fresh Milk', qty: '2 L' }
        ]
    },
    {
        id: 'ORD-2026-645',
        date: '28 Feb 2026, 04:30 PM',
        status: 'Cancelled',
        total: 450,
        items: [
            { name: 'Organic Potatoes', qty: '5 kg' }
        ]
    }
];

export const CustomerOrders = () => {
    return (
        <div className="min-h-screen text-white pb-24 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            {/* Header */}
            <header className="px-6 pt-10 pb-4 flex items-center justify-between">
                <h1 className="text-3xl font-black tracking-wider">Your Orders</h1>
                <div className="text-white px-4 py-2 rounded-xl text-sm font-black shadow-sm"
                    style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}>
                    {MOCK_ORDERS.length} Orders
                </div>
            </header>

            <div className="px-6 mt-4 space-y-6">
                {MOCK_ORDERS.map((order, idx) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -2 }}
                        className="rounded-[32px] p-6 shadow-md cursor-pointer transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div className="flex gap-4">
                                <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 shadow-inner ${order.status === 'Delivered' ? 'text-white' :
                                    order.status === 'Cancelled' ? 'bg-red-900/10 text-red-900' :
                                        'text-current opacity-60'
                                    }`}
                                    style={{
                                        backgroundColor: order.status === 'Delivered' ? 'var(--color-accent)' :
                                            order.status === 'Cancelled' ? undefined : 'var(--color-badge-bg)',
                                    }}>
                                    <Package className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl leading-tight">Order #{order.id.split('-')[2]}</h3>
                                    <p className="font-semibold text-sm mt-0.5" style={{ opacity: 0.7 }}>{order.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-black text-2xl">${order.total}</span>
                                <div className={`mt-1 flex items-center justify-end gap-1.5 text-xs font-black tracking-wide uppercase ${order.status === 'Cancelled' ? 'text-red-900' : ''
                                    }`}>
                                    {order.status === 'Delivered' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                    {order.status}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white/40 rounded-[24px] p-5 mb-5 border-2 border-transparent hover:border-white/60 transition-colors">
                            <div className="flex flex-col gap-2 text-sm font-bold">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-lg text-white flex items-center justify-center text-[10px] shrink-0"
                                            style={{ backgroundColor: 'var(--color-accent)' }}>{item.qty}</div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t-2 border-dashed gap-4"
                            style={{ borderColor: 'var(--color-accent)' + '15' }}>
                            <div className="flex items-center gap-2 text-sm font-bold" style={{ opacity: 0.7 }}>
                                <MapPin className="w-5 h-5" />
                                Delivered to Home
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center justify-center gap-2 text-white font-black text-sm px-6 py-3 rounded-2xl transition-all shadow-sm"
                                style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}
                            >
                                View Details <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
