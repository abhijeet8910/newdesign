import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const transactions = [
    { id: '#1021', item: 'Corn', qty: '5kg', buyer: 'John Doe', status: 'Shipped', date: '2023-11-20' },
    { id: '#1022', item: 'Rice', qty: '10kg', buyer: 'Jane Smith', status: 'Pending', date: '2023-11-21' },
    { id: '#1023', item: 'Wheat', qty: '50kg', buyer: 'AgriCorp', status: 'Delivered', date: '2023-11-18' },
    { id: '#1024', item: 'Tomatoes', qty: '20kg', buyer: 'Fresh Mart', status: 'Processing', date: '2023-11-22' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
    Delivered: { bg: '#2E7D3215', text: '#2E7D32' },
    Shipped: { bg: '#0288D115', text: '#0288D1' },
    Pending: { bg: '#F57C0015', text: '#F57C00' },
    Processing: { bg: '#7B1FA215', text: '#7B1FA2' },
};

export const TransactionTable = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-[28px] overflow-hidden transition-colors"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            <div className="p-6 flex justify-between items-center"
                style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <h3 className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>Recent Orders</h3>
                <button className="text-sm font-bold px-4 py-2 rounded-xl hover:opacity-80 transition-all"
                    style={{ color: 'var(--color-accent)', backgroundColor: 'var(--color-badge-bg)' }}>
                    View All
                </button>
            </div>

            {/* Mobile View: Stacked Cards */}
            <div className="block sm:hidden divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {transactions.map((txn, i) => {
                    const sc = statusColors[txn.status] || statusColors.Pending;
                    return (
                        <motion.div
                            key={txn.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            className="p-4 transition-colors"
                            style={{ backgroundColor: 'var(--color-bg-card)' }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{txn.id}</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                    style={{ backgroundColor: sc.bg, color: sc.text }}>
                                    {txn.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                        {txn.item} <span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>({txn.qty})</span>
                                    </h4>
                                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        {txn.buyer} • <Clock className="w-3 h-3" /> {new Date(txn.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <button className="text-sm font-bold px-3 py-1.5 rounded-xl transition-all"
                                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                    {txn.status === 'Pending' ? 'Fulfill' : 'Details'}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Desktop View */}
            <table className="hidden sm:table w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs font-black uppercase tracking-wider"
                        style={{
                            backgroundColor: 'var(--color-bg-primary)',
                            color: 'var(--color-text-secondary)',
                            borderBottom: '1px solid var(--color-border)',
                        }}>
                        <th className="p-4 pl-6">Order ID</th>
                        <th className="p-4">Item</th>
                        <th className="p-4">Qty</th>
                        <th className="p-4">Buyer</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 pr-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn, i) => {
                        const sc = statusColors[txn.status] || statusColors.Pending;
                        return (
                            <motion.tr
                                key={txn.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                                className="transition-colors cursor-pointer"
                                style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                            >
                                <td className="p-4 pl-6 font-bold text-sm" style={{ color: 'var(--color-accent)' }}>{txn.id}</td>
                                <td className="p-4 font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{txn.item}</td>
                                <td className="p-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{txn.qty}</td>
                                <td className="p-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{txn.buyer}</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{ backgroundColor: sc.bg, color: sc.text }}>
                                        {txn.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{new Date(txn.date).toLocaleDateString()}</td>
                                <td className="p-4 pr-6">
                                    <button className="text-sm font-bold px-3 py-1.5 rounded-xl transition-all"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                        Details
                                    </button>
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </table>
        </motion.div>
    );
};
