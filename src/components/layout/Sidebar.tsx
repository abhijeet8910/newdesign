import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, X,
    Shield, BarChart3, Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const logout = useAuthStore((state: any) => state.logout);
    const user = useAuthStore((state: any) => state.user);

    const getNavItems = () => {
        const role = user?.role;
        switch (role) {
            case 'Farmer':
            case 'Bulk_Farmer':
                return [
                    { name: 'Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
                    { name: 'My Products', path: '/farmer/products', icon: Package },
                    { name: 'Orders', path: '/farmer/orders', icon: ShoppingCart },
                ];
            case 'Business':
                return [
                    { name: 'Dashboard', path: '/business/dashboard', icon: LayoutDashboard },
                    { name: 'Procurement', path: '/business/procurement', icon: Truck },
                    { name: 'Analytics', path: '/business/analytics', icon: BarChart3 },
                ];
            case 'Admin':
            case 'Super_Admin':
                return [
                    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
                    { name: 'User Management', path: '/admin/users', icon: Users },
                    { name: 'KYC Queue', path: '/admin/kyc', icon: Shield },
                    { name: 'Settings', path: '/admin/settings', icon: Settings },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Mobile backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{ backgroundColor: 'rgba(15, 26, 19, 0.7)', backdropFilter: 'blur(4px)' }}
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 font-['Outfit',_sans-serif] shadow-2xl lg:shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    backgroundColor: 'var(--color-sidebar-bg)',
                    borderRight: '1px solid var(--color-border-subtle)',
                }}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-between px-6"
                    style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-accent)' }}>
                            <span className="font-black text-sm" style={{ color: 'var(--color-sidebar-text-active)' }}>A</span>
                        </div>
                        <span className="text-lg font-black tracking-tight" style={{ color: 'var(--color-sidebar-text-active)' }}>
                            ASWAMITHRA
                        </span>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-1 rounded-lg transition-colors hover:opacity-80"
                        style={{ color: 'var(--color-sidebar-text)' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <div className="flex flex-1 flex-col gap-y-2 px-3 py-5 overflow-y-auto">
                    <ul role="list" className="flex flex-1 flex-col gap-y-1 w-full">
                        {navItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className="group flex gap-x-3 rounded-xl px-3 py-2.5 text-sm leading-6 font-semibold transition-all duration-200"
                                        style={{
                                            backgroundColor: isActive ? 'var(--color-sidebar-active)' : 'transparent',
                                            color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                                        }}
                                    >
                                        <item.icon
                                            className="h-5 w-5 shrink-0 transition-colors"
                                            style={{
                                                color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                                            }}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}

                        <li className="mt-auto">
                            <button
                                onClick={logout}
                                className="group flex w-full gap-x-3 rounded-xl px-3 py-2.5 text-sm leading-6 font-semibold text-red-400 hover:text-red-300 transition-colors"
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};
