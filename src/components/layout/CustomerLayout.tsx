import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { CartDrawer } from '../../features/customer/components/CartDrawer';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomerLayout = () => {
    const location = useLocation();
    const { totalItems } = useCartStore();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="font-['Outfit',_sans-serif] transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}>

            <Outlet />

            {/* Sticky Bottom Nav Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
                <div className="rounded-t-[40px] px-8 py-5 flex justify-between items-center transition-colors duration-300"
                    style={{
                        backgroundColor: 'var(--color-sidebar-bg)',
                        boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
                    }}>
                    {[
                        { to: '/customer/home', icon: Home, label: 'Home' },
                        { to: '/customer/orders', icon: ShoppingCart, label: 'Orders' },
                        { to: '#cart', icon: Heart, label: 'Cart', onClick: () => setIsCartOpen(true) },
                        { to: '/customer/profile', icon: User, label: 'Profile' },
                    ].map((item) => {
                        const isActive = item.to !== '#cart' && location.pathname === item.to;
                        const Icon = item.icon;

                        if (item.onClick) {
                            return (
                                <button
                                    key={item.label}
                                    className="p-2 transition-all duration-200 hover:scale-110 relative"
                                    style={{ color: 'var(--color-sidebar-text)' }}
                                    onClick={item.onClick}
                                >
                                    <Icon className="w-7 h-7" />
                                    {/* Cart badge */}
                                    <AnimatePresence>
                                        {totalItems > 0 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center border-2"
                                                style={{
                                                    backgroundColor: '#E65100',
                                                    color: 'white',
                                                    borderColor: 'var(--color-sidebar-bg)',
                                                }}>
                                                {totalItems}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="p-2 transition-all duration-200 hover:scale-110"
                                style={{
                                    color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                                    opacity: isActive ? 1 : 0.5,
                                }}
                            >
                                <Icon
                                    fill={isActive ? 'currentColor' : 'none'}
                                    className="w-7 h-7"
                                />
                            </Link>
                        );
                    })}

                    {/* Theme toggle inside bottom nav for mobile */}
                    <div className="p-1">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};
