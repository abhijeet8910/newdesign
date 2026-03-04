import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Lush green farm landscape"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003300]/90 to-[#1B5E20]/70 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6 bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                        India's Agri-Marketplace
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
                        Empowering Farmers.<br className="hidden md:block" />
                        <span className="text-[#FF833A]">Connecting Markets.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        ASWAMITHRA bridges the gap between farmers and buyers, enabling direct, transparent, and profitable agricultural trade.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/register"
                        className="inline-flex items-center justify-center gap-2 bg-[#FF833A] hover:bg-[#E65100] text-white font-black text-lg px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Get Started Free
                    </Link>
                    <Link to="/login"
                        className="inline-flex items-center justify-center text-white bg-white/10 hover:bg-white/20 font-bold text-lg px-8 py-4 rounded-2xl transition-all border border-white/30 backdrop-blur-sm">
                        Log In
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent z-10"></div>
        </section>
    );
};
