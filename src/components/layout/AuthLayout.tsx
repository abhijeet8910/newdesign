import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion } from 'framer-motion';

export const AuthLayout = () => {
    return (
        <div className="flex min-h-screen transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'var(--color-accent)' }}>
                                <span className="font-black text-sm text-white">A</span>
                            </div>
                            <span className="text-xl font-black tracking-tight" style={{ color: 'var(--color-accent)' }}>ASWAMITHRA</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-black leading-9 tracking-tight"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Welcome back
                        </motion.h2>
                        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold transition-colors" style={{ color: 'var(--color-accent)' }}>
                                Sign up instead
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <div className="absolute inset-0 h-full w-full flex items-center justify-center p-12 transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white max-w-xl text-center"
                    >
                        <h1 className="text-4xl font-black mb-6 tracking-tight">Empowering Direct Agro Trade</h1>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Join thousands of farmers and buyers transforming the agricultural supply chain with transparent, trustworthy, and direct transactions.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
