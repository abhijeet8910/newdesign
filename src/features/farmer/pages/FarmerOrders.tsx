import { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, XCircle, Truck, X, MapPin, Phone, Package, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderItem { name: string; qty: string; price: number; image: string }
interface Order {
    id: string; customer: string; phone: string; items: OrderItem[]; total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'; date: string;
    address: string; paymentMethod: string;
}

const INITIAL_ORDERS: Order[] = [
    { id: 'ORD-1021', customer: 'Rajesh Kumar', phone: '+91 98765 43210', items: [{ name: 'Tomatoes', qty: '5 kg', price: 200, image: '🍅' }, { name: 'Rice', qty: '10 kg', price: 1000, image: '🍚' }], total: 1200, status: 'Pending', date: 'Today, 2:30 PM', address: 'Flat 401, Emerald Towers, Jubilee Hills', paymentMethod: 'UPI — PhonePe' },
    { id: 'ORD-1020', customer: 'Priya Sharma', phone: '+91 87654 32109', items: [{ name: 'Mangoes', qty: '3 kg', price: 360, image: '🥭' }], total: 360, status: 'Shipped', date: 'Yesterday, 10:15 AM', address: 'Tech Park, Building C, Madhapur', paymentMethod: 'Cash on Delivery' },
    { id: 'ORD-1019', customer: 'AgriCorp B2B', phone: '+91 76543 21098', items: [{ name: 'Wheat', qty: '100 kg', price: 8000, image: '🌾' }], total: 8000, status: 'Delivered', date: '2 days ago', address: 'Industrial Area, Phase 2, Gurgaon', paymentMethod: 'Bank Transfer' },
    { id: 'ORD-1018', customer: 'Suresh Reddy', phone: '+91 65432 10987', items: [{ name: 'Eggs', qty: '30 pcs', price: 210, image: '🥚' }], total: 210, status: 'Cancelled', date: '3 days ago', address: 'MG Road, Secunderabad', paymentMethod: 'UPI — GPay' },
    { id: 'ORD-1017', customer: 'Lakshmi Devi', phone: '+91 54321 09876', items: [{ name: 'Potatoes', qty: '10 kg', price: 220, image: '🥔' }, { name: 'Onions', qty: '5 kg', price: 160, image: '🧅' }], total: 380, status: 'Pending', date: '4 days ago', address: 'Ameerpet, Hyderabad', paymentMethod: 'Cash on Delivery' },
];

const TABS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_FLOW: Record<string, string> = { Pending: 'Shipped', Shipped: 'Delivered' };

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
    Pending: { icon: Clock, color: '#F57C00', bg: 'rgba(245,124,0,0.12)' },
    Shipped: { icon: Truck, color: '#1565C0', bg: 'rgba(21,101,192,0.12)' },
    Delivered: { icon: CheckCircle, color: '#2E7D32', bg: 'rgba(46,125,50,0.12)' },
    Cancelled: { icon: XCircle, color: '#C62828', bg: 'rgba(198,40,40,0.12)' },
};

export const FarmerOrders = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusDropdown, setStatusDropdown] = useState<string | null>(null);

    const filtered = orders.filter((o) => {
        if (activeTab !== 'All' && o.status !== activeTab) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
        }
        return true;
    });

    const updateStatus = (orderId: string, newStatus: string) => {
        setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus as Order['status'] } : o));
        if (selectedOrder?.id === orderId) setSelectedOrder((prev) => prev ? { ...prev, status: newStatus as Order['status'] } : null);
        setStatusDropdown(null);
    };

    const orderStats = { total: orders.length, pending: orders.filter((o) => o.status === 'Pending').length, shipped: orders.filter((o) => o.status === 'Shipped').length, delivered: orders.filter((o) => o.status === 'Delivered').length };

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8 min-h-screen">

            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[40px] sm:rounded-[40px] shadow-xl mb-6 overflow-hidden text-white -mx-4 sm:mx-0 -mt-4 sm:mt-0"
                style={{ background: 'var(--color-hero-gradient)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Manage Orders</h1>
                    <p className="text-white/70 mt-1 text-sm">Track and fulfill customer orders</p>
                </div>
            </motion.div>

            {/* Order Stats Strip */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 px-2 sm:px-0">
                {[
                    { label: 'Total', value: orderStats.total, color: 'var(--color-accent)' },
                    { label: 'Pending', value: orderStats.pending, color: '#F57C00' },
                    { label: 'Shipped', value: orderStats.shipped, color: '#1565C0' },
                    { label: 'Delivered', value: orderStats.delivered, color: '#2E7D32' },
                ].map((s) => (
                    <div key={s.label} className="p-3 rounded-[16px] text-center"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <p className="text-xl sm:text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4 px-2 sm:px-0">
                <div className="flex-1 relative">
                    <Search className="absolute inset-y-0 left-4 my-auto h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
                    <input type="text" placeholder="Search by Order ID or Customer..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl py-3 pl-11 pr-3 text-sm focus:outline-none focus:ring-2 transition-all"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                </div>
                <button className="px-4 rounded-2xl flex items-center gap-2 text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 px-2 sm:px-0">
                {TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all"
                        style={{ backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-bg-card)', color: activeTab === tab ? 'white' : 'var(--color-text-secondary)', border: activeTab === tab ? 'none' : '1px solid var(--color-border)' }}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-3 px-2 sm:px-0">
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-3">📭</div>
                        <p className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>No orders found</p>
                    </div>
                ) : filtered.map((order, idx) => {
                    const sc = statusConfig[order.status] || statusConfig.Pending;
                    const StatusIcon = sc.icon;
                    const nextStatus = STATUS_FLOW[order.status];
                    return (
                        <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                            className="p-4 sm:p-5 rounded-[24px] cursor-pointer transition-all"
                            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                            onClick={() => setSelectedOrder(order)}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0" style={{ backgroundColor: sc.bg }}>
                                        <StatusIcon className="w-5 h-5" style={{ color: sc.color }} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-black text-sm" style={{ color: 'var(--color-accent)' }}>{order.id}</h3>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: sc.bg, color: sc.color }}>{order.status}</span>
                                        </div>
                                        <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{order.customer}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{order.items.map((i) => `${i.name} (${i.qty})`).join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-14 sm:ml-0">
                                    <div className="text-right">
                                        <span className="font-black text-base" style={{ color: 'var(--color-text-primary)' }}>₹{order.total.toLocaleString()}</span>
                                        <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{order.date}</p>
                                    </div>
                                    {nextStatus && (
                                        <button onClick={(e) => { e.stopPropagation(); updateStatus(order.id, nextStatus); }}
                                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-white shadow-sm transition-all hover:shadow-md"
                                            style={{ backgroundColor: statusConfig[nextStatus]?.color || 'var(--color-accent)' }}>
                                            Mark {nextStatus}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ═══ Order Detail Modal ═══ */}
            <AnimatePresence>
                {selectedOrder && (() => {
                    const sc = statusConfig[selectedOrder.status] || statusConfig.Pending;
                    const StatusIconM = sc.icon;
                    const nextStatus = STATUS_FLOW[selectedOrder.status];
                    return (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => { setSelectedOrder(null); setStatusDropdown(null); }} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-[28px] shadow-2xl"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

                                {/* Header */}
                                <div className="sticky top-0 z-10 flex items-center justify-between p-5 rounded-t-[28px]"
                                    style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl" style={{ backgroundColor: sc.bg }}>
                                            <Package className="w-5 h-5" style={{ color: sc.color }} />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedOrder.id}</h2>
                                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{selectedOrder.date}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setSelectedOrder(null); setStatusDropdown(null); }}
                                        className="p-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-5 space-y-4">
                                    {/* Status with Update Dropdown */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold"
                                            style={{ backgroundColor: sc.bg, color: sc.color }}>
                                            <StatusIconM className="w-4 h-4" /> {selectedOrder.status}
                                        </div>
                                        {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                                            <div className="relative">
                                                <button onClick={() => setStatusDropdown(statusDropdown ? null : selectedOrder.id)}
                                                    className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 text-white"
                                                    style={{ backgroundColor: 'var(--color-accent)' }}>
                                                    Update Status <ChevronDown className="w-3 h-3" />
                                                </button>
                                                {statusDropdown === selectedOrder.id && (
                                                    <div className="absolute right-0 top-full mt-1 w-40 rounded-xl shadow-xl z-20 overflow-hidden"
                                                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                                        {['Shipped', 'Delivered', 'Cancelled'].filter((s) => s !== selectedOrder.status).map((s) => (
                                                            <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                                                                className="w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors hover:opacity-80"
                                                                style={{ color: statusConfig[s]?.color }}>
                                                                {(() => { const I = statusConfig[s]?.icon || Clock; return <I className="w-3.5 h-3.5" />; })()}
                                                                {s}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Customer */}
                                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Customer</h4>
                                        <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{selectedOrder.customer}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <a href={`tel:${selectedOrder.phone}`} className="flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                                                <Phone className="w-3 h-3" /> {selectedOrder.phone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Items</h4>
                                        {selectedOrder.items.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-2"
                                                style={{ borderBottom: i < selectedOrder.items.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{item.image}</span>
                                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>× {item.qty}</span>
                                                </div>
                                                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>₹{item.price}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between pt-3 mt-2" style={{ borderTop: '2px solid var(--color-border)' }}>
                                            <span className="text-sm font-black">Total</span>
                                            <span className="text-lg font-black" style={{ color: 'var(--color-accent)' }}>₹{selectedOrder.total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    {[
                                        { icon: MapPin, label: 'Delivery Address', value: selectedOrder.address },
                                        { icon: Package, label: 'Payment', value: selectedOrder.paymentMethod },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                            <row.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-muted)' }}>{row.label}</span>
                                                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{row.value}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Quick Actions */}
                                    {nextStatus && (
                                        <button onClick={() => { updateStatus(selectedOrder.id, nextStatus); }}
                                            className="w-full py-3 rounded-xl text-sm font-black text-white"
                                            style={{ backgroundColor: statusConfig[nextStatus]?.color || 'var(--color-accent)' }}>
                                            ✅ Mark as {nextStatus}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
};
