import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Edit3, Shield, ChevronRight, Plus, Trash2, X, LogOut, Bell, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { useCartStore } from '../../../store/cartStore';

interface Address { id: string; type: string; address: string; area: string; isDefault: boolean }

export const CustomerProfile = () => {
    const authUser = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const clearCart = useCartStore((s) => s.clearCart);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: authUser?.name || 'Riya Sharma', email: authUser?.email || 'riya@example.com', phone: '+91 98765 43210' });
    const [saveMsg, setSaveMsg] = useState('');

    const [addresses, setAddresses] = useState<Address[]>([
        { id: '1', type: 'Home', address: 'Flat 401, Emerald Towers', area: 'Jubilee Hills, Hyderabad', isDefault: true },
        { id: '2', type: 'Work', address: 'Tech Park, Building C', area: 'Madhapur, Hyderabad', isDefault: false },
    ]);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [addrForm, setAddrForm] = useState({ type: 'Home', address: '', area: '' });
    const [addrErrors, setAddrErrors] = useState<Record<string, string>>({});
    const [editAddr, setEditAddr] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Settings modals
    const [showPrefs, setShowPrefs] = useState(false);
    const [prefs, setPrefs] = useState({ sms: true, email: true, promo: false });
    const [showSecurity, setShowSecurity] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleSaveProfile = () => { setSaveMsg('✅ Profile saved!'); setTimeout(() => { setSaveMsg(''); setIsEditing(false); }, 1500); };

    const handleAddAddress = () => {
        const errs: Record<string, string> = {};
        if (!addrForm.address.trim()) errs.address = 'Address is required';
        if (!addrForm.area.trim()) errs.area = 'Area is required';
        setAddrErrors(errs);
        if (Object.keys(errs).length > 0) return;

        if (editAddr) {
            setAddresses((prev) => prev.map((a) => a.id === editAddr ? { ...a, type: addrForm.type, address: addrForm.address.trim(), area: addrForm.area.trim() } : a));
        } else {
            setAddresses((prev) => [...prev, { id: crypto.randomUUID(), type: addrForm.type, address: addrForm.address.trim(), area: addrForm.area.trim(), isDefault: false }]);
        }
        setAddrForm({ type: 'Home', address: '', area: '' }); setEditAddr(null); setShowAddAddress(false);
    };

    const handleSetDefault = (id: string) => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    const handleDeleteAddress = (id: string) => { setAddresses((prev) => prev.filter((a) => a.id !== id)); setDeleteConfirm(null); };
    const handleLogout = () => { logout(); clearCart(); navigate('/login'); };

    const startEditAddr = (addr: Address) => {
        setAddrForm({ type: addr.type, address: addr.address, area: addr.area }); setEditAddr(addr.id); setShowAddAddress(true);
    };

    const inputStyle = { backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' };

    const [copied, setCopied] = useState(false);
    const referralCode = 'ASWAMITHRA' + (authUser?.name?.slice(0, 3).toUpperCase() || 'USR') + '100';
    const handleCopyCode = () => { navigator.clipboard.writeText(referralCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };

    const stats = [
        { label: 'Orders', value: '12', emoji: '📦', color: '#2E7D32' },
        { label: 'Spent', value: '₹4,850', emoji: '💰', color: '#E65100' },
        { label: 'Items', value: '47', emoji: '🛒', color: '#1565C0' },
        { label: 'Favourite', value: 'Veggies', emoji: '🥬', color: '#7B1FA2' },
    ];

    return (
        <div className="min-h-screen pb-28 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-primary)' }}>
            <div className="max-w-5xl mx-auto">

                <header className="px-5 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wide">My Profile</h1>
                </header>

                <div className="px-5 sm:px-6 lg:px-8 mt-2 columns-1 lg:columns-2 lg:gap-6 space-y-5 lg:space-y-0">

                    {/* Order Stats Dashboard */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="break-inside-avoid mb-5 lg:mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
                        {stats.map((stat, idx) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                                className="rounded-[20px] p-4 text-center transition-colors"
                                style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                                <span className="text-2xl">{stat.emoji}</span>
                                <p className="font-black text-lg mt-1" style={{ color: stat.color }}>{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Referral Invite Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="break-inside-avoid mb-5 lg:mb-6 rounded-[24px] p-5 sm:p-6 lg:p-8 overflow-hidden relative"
                        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)' }}>
                        <div className="absolute -right-6 -bottom-6 text-[80px] opacity-10 rotate-12">🎁</div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">🎉</span>
                                <h3 className="text-lg font-black text-white">Invite Friends, Earn ₹100!</h3>
                            </div>
                            <p className="text-white/70 text-xs mb-3">Share your code — they get ₹50 off, you earn ₹100 credit.</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white font-mono font-bold text-sm tracking-wider">
                                    {referralCode}
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={handleCopyCode}
                                    className="px-4 py-2.5 rounded-xl font-bold text-xs text-green-900 bg-white shadow-sm transition-all">
                                    {copied ? '✅ Copied!' : '📋 Copy'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="break-inside-avoid mb-5 lg:mb-6 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 lg:p-8 shadow-sm transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-inner"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                                <User className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{profileForm.name}</h2>
                                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-text-muted)' }}>{profileForm.phone} • {profileForm.email}</p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold mt-3"
                                    style={{ backgroundColor: 'rgba(46,125,50,0.1)', color: '#2E7D32' }}>
                                    <Shield className="w-3 h-3" /> Verified Customer
                                </div>
                            </div>
                            <button onClick={() => setIsEditing(!isEditing)}
                                className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-colors"
                                style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>
                                <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>

                        <AnimatePresence>
                            {isEditing && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="mt-5 pt-5 space-y-3 overflow-hidden" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
                                            <input type="text" value={profileForm.name} onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                                                className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Email</label>
                                            <input type="email" value={profileForm.email} onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                                                className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={inputStyle} />
                                        </div>
                                    </div>
                                    {saveMsg && <p className="text-sm font-bold" style={{ color: '#2E7D32' }}>{saveMsg}</p>}
                                    <div className="flex justify-end">
                                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSaveProfile}
                                            className="px-6 py-2.5 text-white font-bold text-sm rounded-xl shadow-sm"
                                            style={{ backgroundColor: 'var(--color-accent)' }}>Save Changes</motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Saved Addresses */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="break-inside-avoid mb-5 lg:mb-6 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 lg:p-8 shadow-sm transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>Saved Addresses</h3>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => { setAddrForm({ type: 'Home', address: '', area: '' }); setEditAddr(null); setShowAddAddress(true); }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold"
                                style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
                                <Plus className="w-3.5 h-3.5" /> Add New
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            {addresses.map((addr) => (
                                <div key={addr.id}
                                    className="p-4 rounded-[16px] flex gap-3 transition-all"
                                    style={{
                                        backgroundColor: addr.isDefault ? 'var(--color-badge-bg)' : 'var(--color-bg-primary)',
                                        border: addr.isDefault ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                                    }}>
                                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{addr.type}</h4>
                                            {addr.isDefault && <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md text-white"
                                                style={{ backgroundColor: 'var(--color-accent)' }}>Default</span>}
                                        </div>
                                        <p className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{addr.address}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{addr.area}</p>
                                        <div className="flex gap-3 mt-2">
                                            <button onClick={() => startEditAddr(addr)} className="text-[11px] font-bold" style={{ color: 'var(--color-accent)' }}>Edit</button>
                                            {!addr.isDefault && <button onClick={() => handleSetDefault(addr.id)} className="text-[11px] font-bold" style={{ color: 'var(--color-text-muted)' }}>Set Default</button>}
                                            {!addr.isDefault && <button onClick={() => setDeleteConfirm(addr.id)} className="text-[11px] font-bold text-red-500">Delete</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Settings */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="break-inside-avoid mb-5 lg:mb-6 rounded-[24px] sm:rounded-[28px] shadow-sm overflow-hidden transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                        {[
                            { icon: Bell, label: 'Communication Preferences', sub: 'Manage SMS & Email updates', onClick: () => setShowPrefs(true) },
                            { icon: Lock, label: 'Account Security', sub: 'Change password, 2FA', onClick: () => setShowSecurity(true) },
                            { icon: LogOut, label: 'Sign Out', sub: 'Log out of your account', onClick: () => setShowLogoutConfirm(true), danger: true },
                        ].map((item, i) => (
                            <button key={i} onClick={item.onClick}
                                className="w-full flex items-center justify-between p-4 sm:p-5 hover:opacity-80 transition-all"
                                style={{ borderBottom: i < 2 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: (item as any).danger ? 'rgba(198,40,40,0.1)' : 'var(--color-badge-bg)' }}>
                                        <item.icon className="w-5 h-5" style={{ color: (item as any).danger ? '#C62828' : 'var(--color-text-secondary)' }} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm sm:text-base" style={{ color: (item as any).danger ? '#C62828' : 'var(--color-text-primary)' }}>{item.label}</p>
                                        <p className="text-[11px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.sub}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* ═══ MODALS ═══ */}

                {/* Add/Edit Address Modal */}
                <AnimatePresence>
                    {showAddAddress && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => setShowAddAddress(false)} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md rounded-[28px] shadow-2xl"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <div className="flex items-center justify-between p-5 rounded-t-[28px]" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                    <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{editAddr ? 'Edit Address' : 'Add Address'}</h2>
                                    <button onClick={() => setShowAddAddress(false)} className="p-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}><X className="w-4 h-4" /></button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Address Type</label>
                                        <div className="flex gap-2">
                                            {['Home', 'Work', 'Other'].map((t) => (
                                                <button key={t} type="button" onClick={() => setAddrForm((p) => ({ ...p, type: t }))}
                                                    className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                                                    style={{ backgroundColor: addrForm.type === t ? 'var(--color-accent)' : 'var(--color-bg-primary)', color: addrForm.type === t ? 'white' : 'var(--color-text-secondary)', border: addrForm.type === t ? 'none' : '1px solid var(--color-border)' }}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Address Line</label>
                                        <input type="text" placeholder="e.g. Flat 101, Green Valley" value={addrForm.address} onChange={(e) => { setAddrForm((p) => ({ ...p, address: e.target.value })); setAddrErrors((p) => ({ ...p, address: '' })); }}
                                            className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, borderColor: addrErrors.address ? '#D32F2F' : 'var(--color-border)' }} />
                                        {addrErrors.address && <p className="text-xs text-red-500 mt-1">{addrErrors.address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Area / City</label>
                                        <input type="text" placeholder="e.g. Jubilee Hills, Hyderabad" value={addrForm.area} onChange={(e) => { setAddrForm((p) => ({ ...p, area: e.target.value })); setAddrErrors((p) => ({ ...p, area: '' })); }}
                                            className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, borderColor: addrErrors.area ? '#D32F2F' : 'var(--color-border)' }} />
                                        {addrErrors.area && <p className="text-xs text-red-500 mt-1">{addrErrors.area}</p>}
                                    </div>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddAddress}
                                        className="w-full py-3 rounded-xl text-sm font-black text-white"
                                        style={{ backgroundColor: 'var(--color-accent)' }}>
                                        {editAddr ? '✏️ Update Address' : '📍 Save Address'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Delete Address Confirm */}
                <AnimatePresence>
                    {deleteConfirm && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => setDeleteConfirm(null)} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-sm rounded-[28px] p-6 shadow-2xl text-center"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <Trash2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#C62828' }} />
                                <h3 className="text-base font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>Delete Address?</h3>
                                <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>This cannot be undone.</p>
                                <div className="flex gap-2">
                                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>Cancel</button>
                                    <button onClick={() => handleDeleteAddress(deleteConfirm)} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white">Delete</button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Communication Preferences Modal */}
                <AnimatePresence>
                    {showPrefs && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => setShowPrefs(false)} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md rounded-[28px] shadow-2xl"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                    <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>Communication Preferences</h2>
                                    <button onClick={() => setShowPrefs(false)} className="p-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}><X className="w-4 h-4" /></button>
                                </div>
                                <div className="p-5 space-y-4">
                                    {[
                                        { key: 'sms' as const, label: 'SMS Notifications', desc: 'Order updates via text' },
                                        { key: 'email' as const, label: 'Email Notifications', desc: 'Receipts & summaries' },
                                        { key: 'promo' as const, label: 'Promotional Offers', desc: 'Deals & discounts' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.label}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                            </div>
                                            <button onClick={() => setPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))}
                                                className="w-11 h-6 rounded-full relative transition-colors duration-200"
                                                style={{ backgroundColor: prefs[item.key] ? 'var(--color-accent)' : 'var(--color-border)' }}>
                                                <motion.div animate={{ x: prefs[item.key] ? 20 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => setShowPrefs(false)}
                                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white mt-2"
                                        style={{ backgroundColor: 'var(--color-accent)' }}>Save Preferences</button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Security Modal */}
                <AnimatePresence>
                    {showSecurity && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => setShowSecurity(false)} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md rounded-[28px] shadow-2xl"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                    <h2 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>Account Security</h2>
                                    <button onClick={() => setShowSecurity(false)} className="p-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}><X className="w-4 h-4" /></button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Current Password</label>
                                        <input type="password" className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>New Password</label>
                                        <input type="password" className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Confirm New Password</label>
                                        <input type="password" className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2" style={inputStyle} />
                                    </div>
                                    <button onClick={() => setShowSecurity(false)}
                                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                                        style={{ backgroundColor: 'var(--color-accent)' }}>Update Password</button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Logout Confirmation */}
                <AnimatePresence>
                    {showLogoutConfirm && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(15,26,19,0.6)', backdropFilter: 'blur(8px)' }}
                                onClick={() => setShowLogoutConfirm(false)} />
                            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                                className="fixed inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-sm rounded-[28px] p-6 shadow-2xl text-center"
                                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <LogOut className="w-10 h-10 mx-auto mb-3" style={{ color: '#C62828' }} />
                                <h3 className="text-base font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>Sign Out?</h3>
                                <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>You'll need to log in again to access your account.</p>
                                <div className="flex gap-2">
                                    <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-secondary)' }}>Cancel</button>
                                    <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white">Sign Out</button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
