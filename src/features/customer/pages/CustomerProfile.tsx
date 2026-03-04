import { useState } from 'react';
import { User, MapPin, Mail, Edit3, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomerProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [user] = useState({
        name: 'Riya Sharma',
        phone: '+91 98765 43210',
        email: 'riya.sharma@example.com',
        joined: 'Jan 2026'
    });

    const [addresses] = useState([
        { id: 1, type: 'Home', address: 'Flat 401, Emerald Towers', area: 'Jubilee Hills, Hyderabad', default: true },
        { id: 2, type: 'Work', address: 'Tech Park, Building C', area: 'Madhapur, Hyderabad', default: false }
    ]);

    return (
        <div className="min-h-screen text-white pb-24 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            {/* Header */}
            <header className="px-6 pt-10 pb-4">
                <h1 className="text-3xl font-black tracking-wider">My Profile</h1>
            </header>

            <div className="px-6 mt-4 space-y-6">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[32px] p-6 shadow-md relative overflow-hidden transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}
                >
                    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="w-24 h-24 bg-white/40 rounded-[24px] flex items-center justify-center shadow-inner backdrop-blur-sm"
                            style={{ color: 'var(--color-accent)' }}>
                            <User className="w-10 h-10" />
                        </div>

                        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                            <h2 className="text-2xl font-black">{user.name}</h2>
                            <p className="font-semibold mt-1" style={{ color: 'var(--color-bg-surface-alt)' }}>{user.phone} • {user.email}</p>
                            <div className="inline-flex items-center gap-1.5 text-white px-4 py-1.5 rounded-[12px] text-xs font-bold mt-4 shadow-sm"
                                style={{ backgroundColor: 'var(--color-accent)' }}>
                                <Shield className="w-3.5 h-3.5" />
                                Verified Customer
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-black text-white rounded-[16px] transition-colors shadow-sm"
                            style={{ backgroundColor: 'var(--color-bg-surface-alt)' }}
                        >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {/* Edit Form */}
                    {isEditing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mt-6 pt-6 border-t-2 border-dashed space-y-4"
                            style={{ borderColor: 'var(--color-accent)' + '30' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Full Name</label>
                                    <input type="text" defaultValue={user.name} className="w-full bg-white/60 border-2 border-transparent focus:border-current rounded-2xl px-4 py-3 font-bold outline-none transition-all"
                                        style={{ color: 'var(--color-accent)' }} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Phone Number</label>
                                    <input type="text" defaultValue={user.phone} className="w-full bg-black/10 border-2 border-transparent rounded-2xl px-4 py-3 font-bold cursor-not-allowed outline-none opacity-50" disabled />
                                </div>
                                <div>
                                    <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>Email Address</label>
                                    <input type="email" defaultValue={user.email} className="w-full bg-white/60 border-2 border-transparent focus:border-current rounded-2xl px-4 py-3 font-bold outline-none transition-all"
                                        style={{ color: 'var(--color-accent)' }} />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-3 text-white font-black rounded-2xl shadow-lg transition-all"
                                    style={{ backgroundColor: 'var(--color-accent)' }}
                                >Save Changes</motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Saved Addresses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[32px] p-6 shadow-md transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black">Saved Addresses</h3>
                        <button className="bg-white/40 px-3 py-1.5 rounded-xl text-sm font-black hover:bg-white/60 transition-colors">+ Add New</button>
                    </div>

                    <div className="space-y-4">
                        {addresses.map(addr => (
                            <div key={addr.id} className={`p-5 rounded-[24px] border-2 ${addr.default ? 'border-current bg-white/40' : 'border-transparent bg-white/20'} flex gap-4 transition-all hover:bg-white/40`}>
                                <div className="mt-1">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-black text-lg">{addr.type}</h4>
                                        {addr.default && <span className="text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg"
                                            style={{ backgroundColor: 'var(--color-accent)' }}>Default</span>}
                                    </div>
                                    <p className="font-bold text-sm leading-relaxed">{addr.address}</p>
                                    <p className="font-semibold text-sm" style={{ opacity: 0.7 }}>{addr.area}</p>
                                </div>
                                <button className="self-start p-2 bg-white/30 rounded-xl hover:bg-white/50 transition-colors hidden sm:block">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Settings Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-[32px] shadow-md overflow-hidden transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}
                >
                    <div className="divide-y-2 divide-dashed" style={{ borderColor: 'var(--color-accent)' + '15' }}>
                        <button className="w-full flex items-center justify-between p-6 hover:bg-white/20 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-white/40 rounded-2xl"><Mail className="w-6 h-6" /></div>
                                <div className="text-left">
                                    <p className="font-black text-lg">Communication Preferences</p>
                                    <p className="text-sm font-semibold" style={{ opacity: 0.7 }}>Manage SMS & Email updates</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 opacity-50" />
                        </button>
                        <button className="w-full flex items-center justify-between p-6 hover:bg-white/20 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-white/40 rounded-2xl"><Shield className="w-6 h-6" /></div>
                                <div className="text-left">
                                    <p className="font-black text-lg">Account Security</p>
                                    <p className="text-sm font-semibold" style={{ opacity: 0.7 }}>Change password, 2FA</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 opacity-50" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
