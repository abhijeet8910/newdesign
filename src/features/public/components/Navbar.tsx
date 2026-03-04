import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'}`}
            style={{
                backgroundColor: isScrolled ? 'var(--color-header-bg)' : 'transparent',
            }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isScrolled ? '' : 'bg-white'}`}
                            style={{ backgroundColor: isScrolled ? 'var(--color-accent)' : undefined }}>
                            <span className={`font-black text-sm ${isScrolled ? 'text-white' : ''}`}
                                style={{ color: isScrolled ? undefined : 'var(--color-accent)' }}>A</span>
                        </div>
                        <span className="text-xl font-black tracking-tight"
                            style={{ color: isScrolled ? 'var(--color-text-primary)' : 'white' }}>
                            ASWAMITHRA
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['About Us', 'Features', 'Contact'].map(item => (
                            <a key={item}
                                href={`#${item.toLowerCase().replace(' ', '')}`}
                                className="font-semibold transition-colors hover:opacity-70"
                                style={{ color: isScrolled ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.85)' }}>
                                {item}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 ml-4">
                            <ThemeToggle />
                            <Link to="/login" className="font-bold transition-colors"
                                style={{ color: isScrolled ? 'var(--color-text-primary)' : 'white' }}>
                                Log In
                            </Link>
                            <Link to="/register" className="px-5 py-2.5 rounded-2xl font-bold transition-all shadow-sm"
                                style={{
                                    backgroundColor: isScrolled ? 'var(--color-accent)' : 'white',
                                    color: isScrolled ? 'white' : 'var(--color-accent)',
                                }}>
                                Sign Up Free
                            </Link>
                        </div>
                    </div>

                    <button className="md:hidden p-2 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen
                            ? <X className="w-6 h-6" style={{ color: isScrolled ? 'var(--color-text-primary)' : 'white' }} />
                            : <Menu className="w-6 h-6" style={{ color: isScrolled ? 'var(--color-text-primary)' : 'white' }} />
                        }
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-full left-0 w-full shadow-xl py-4 flex flex-col px-4 gap-3"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderTop: '1px solid var(--color-border)',
                        }}
                    >
                        {['About Us', 'Features', 'Contact'].map(item => (
                            <a key={item}
                                href={`#${item.toLowerCase().replace(' ', '')}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2.5 font-semibold rounded-xl transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}>
                                {item}
                            </a>
                        ))}
                        <hr style={{ borderColor: 'var(--color-border)' }} />
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-2.5 font-bold text-center rounded-xl transition-colors"
                            style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                            Log In
                        </Link>
                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-2.5 text-white font-bold text-center rounded-xl"
                            style={{ backgroundColor: 'var(--color-accent)' }}>
                            Sign Up
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
