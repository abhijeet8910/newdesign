import { useState } from 'react';
import { Users, Search, Filter, Eye, MapPin, UserPlus, Ban, CheckCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailModal, DetailRow } from '../../../components/ui/DetailModal';

const ALL_USERS = [
    { name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'Farmer', status: 'Active', joined: 'Jan 15, 2026', orders: 23, location: 'Hyderabad', avatar: 'RK', phone: '+91 98765 43210', revenue: '₹ 1,84,000', lastActive: '2 hours ago' },
    { name: 'Priya Foods Pvt Ltd', email: 'priya@foods.com', role: 'Business', status: 'Active', joined: 'Feb 01, 2026', orders: 56, location: 'Mumbai', avatar: 'PF', phone: '+91 87654 32109', revenue: '₹ 8,45,000', lastActive: '30 min ago' },
    { name: 'Mohit Patel', email: 'mohit@email.com', role: 'Customer', status: 'Active', joined: 'Feb 20, 2026', orders: 8, location: 'Pune', avatar: 'MP', phone: '+91 76543 21098', revenue: '₹ 12,400', lastActive: '1 hour ago' },
    { name: 'Suresh Reddy', email: 'suresh@email.com', role: 'Farmer', status: 'Suspended', joined: 'Dec 10, 2025', orders: 15, location: 'Vijayawada', avatar: 'SR', phone: '+91 65432 10987', revenue: '₹ 67,500', lastActive: '5 days ago' },
    { name: 'GreenLeaf Organics', email: 'info@greenleaf.com', role: 'Business', status: 'Pending KYC', joined: 'Mar 01, 2026', orders: 0, location: 'Bangalore', avatar: 'GL', phone: '+91 54321 09876', revenue: '₹ 0', lastActive: '1 day ago' },
    { name: 'Anita Sharma', email: 'anita@email.com', role: 'Customer', status: 'Active', joined: 'Jan 28, 2026', orders: 12, location: 'Jaipur', avatar: 'AS', phone: '+91 43210 98765', revenue: '₹ 18,600', lastActive: '3 hours ago' },
    { name: 'FarmFresh Corp', email: 'corp@farmfresh.in', role: 'Business', status: 'Active', joined: 'Nov 15, 2025', orders: 89, location: 'Chennai', avatar: 'FC', phone: '+91 32109 87654', revenue: '₹ 12,30,000', lastActive: '15 min ago' },
    { name: 'Venkat Rao', email: 'venkat@email.com', role: 'Farmer', status: 'Active', joined: 'Feb 14, 2026', orders: 31, location: 'Guntur', avatar: 'VR', phone: '+91 21098 76543', revenue: '₹ 2,48,000', lastActive: '4 hours ago' },
];

const ROLE_TABS = ['All', 'Farmer', 'Business', 'Customer'];

const roleColors: Record<string, string> = {
    Farmer: '#4B6D53', Business: '#0288D1', Customer: '#7B1FA2', Bulk_Farmer: '#E65100',
};

const statusStyles: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'rgba(46, 125, 50, 0.1)', text: '#2E7D32' },
    Suspended: { bg: 'rgba(211, 47, 47, 0.1)', text: '#D32F2F' },
    'Pending KYC': { bg: 'rgba(245, 124, 0, 0.1)', text: '#F57C00' },
};

export const AdminUsers = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<typeof ALL_USERS[0] | null>(null);

    const filtered = ALL_USERS.filter((u) => {
        const matchesRole = activeTab === 'All' || u.role === activeTab;
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">
            {/* Hero Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #1A2E20 0%, #2F4A35 50%, #3B5A42 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">Administration</span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">User Management</h1>
                        <p className="text-white/60 mt-1 text-sm">View, manage, and moderate all platform users.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        <UserPlus className="w-5 h-5" /> Add User
                    </motion.button>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total', count: 1247, color: '#4B6D53' },
                    { label: 'Active', count: 1180, color: '#2E7D32' },
                    { label: 'Suspended', count: 44, color: '#D32F2F' },
                    { label: 'Pending KYC', count: 23, color: '#F57C00' },
                ].map((s) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl text-center"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
                        <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                    <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                </div>
                <button className="px-4 rounded-xl flex items-center gap-2 text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Role Tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
                {ROLE_TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all"
                        style={{
                            backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-bg-card)',
                            color: activeTab === tab ? 'white' : 'var(--color-text-secondary)',
                            border: activeTab === tab ? 'none' : '1px solid var(--color-border)',
                        }}>
                        {tab === 'All' && <Users className="w-4 h-4" />}
                        {tab} {tab === 'All' ? `(${ALL_USERS.length})` : `(${ALL_USERS.filter(u => u.role === tab).length})`}
                    </button>
                ))}
            </div>

            {/* Users List */}
            <div className="rounded-[28px] overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    {filtered.map((user, idx) => {
                        const ss = statusStyles[user.status] || statusStyles.Active;
                        return (
                            <motion.div key={user.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                                onClick={() => setSelectedUser(user)}
                                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all hover:opacity-90">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-sm shrink-0"
                                        style={{ backgroundColor: roleColors[user.role] || '#4B6D53' }}>{user.avatar}</div>
                                    <div>
                                        <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{user.name}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                            {user.email} • <MapPin className="w-3 h-3 inline" /> {user.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-16 sm:ml-0 flex-wrap">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                                        style={{ backgroundColor: (roleColors[user.role] || '#4B6D53') + '15', color: roleColors[user.role] || '#4B6D53' }}>{user.role}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                                        style={{ backgroundColor: ss.bg, color: ss.text }}>{user.status}</span>
                                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{user.orders} orders</span>
                                    <button className="p-2 rounded-xl transition-all"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                    {filtered.length === 0 && (
                        <div className="p-12 text-center">
                            <Users className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                            <p className="font-bold" style={{ color: 'var(--color-text-secondary)' }}>No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* User Detail Modal */}
            <DetailModal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}
                title={selectedUser?.name || ''} subtitle={selectedUser?.role}
                accentColor={roleColors[selectedUser?.role || ''] || '#4B6D53'}
                icon={selectedUser && <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black text-white"
                    style={{ backgroundColor: roleColors[selectedUser.role] || '#4B6D53' }}>{selectedUser.avatar.charAt(0)}</div>}>
                {selectedUser && (
                    <div>
                        {/* Avatar large */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                                style={{ backgroundColor: roleColors[selectedUser.role] || '#4B6D53' }}>{selectedUser.avatar}</div>
                            <div>
                                <p className="text-lg font-black" style={{ color: 'var(--color-text-primary)' }}>{selectedUser.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg"
                                        style={{ backgroundColor: (roleColors[selectedUser.role]) + '15', color: roleColors[selectedUser.role] }}>{selectedUser.role}</span>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg"
                                        style={{ backgroundColor: (statusStyles[selectedUser.status] || statusStyles.Active).bg, color: (statusStyles[selectedUser.status] || statusStyles.Active).text }}>{selectedUser.status}</span>
                                </div>
                            </div>
                        </div>
                        <DetailRow label="Email" value={selectedUser.email} />
                        <DetailRow label="Phone" value={selectedUser.phone} />
                        <DetailRow label="Location" value={selectedUser.location} />
                        <DetailRow label="Joined" value={selectedUser.joined} />
                        <DetailRow label="Total Orders" value={String(selectedUser.orders)} />
                        <DetailRow label="Revenue" value={selectedUser.revenue} color="var(--color-accent)" />
                        <DetailRow label="Last Active" value={selectedUser.lastActive} />

                        <div className="flex gap-2 mt-5">
                            {selectedUser.status === 'Active' && (
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-red-500/10 text-red-500">
                                    <Ban className="w-4 h-4" /> Suspend
                                </button>
                            )}
                            {selectedUser.status === 'Suspended' && (
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600">
                                    <CheckCircle className="w-4 h-4" /> Reactivate
                                </button>
                            )}
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                <Mail className="w-4 h-4" /> Email
                            </button>
                        </div>
                    </div>
                )}
            </DetailModal>
        </div>
    );
};
