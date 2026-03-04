import { motion } from 'framer-motion';
import { Leaf, Shield, BarChart3 } from 'lucide-react';

const features = [
    { icon: Leaf, title: 'Farm-to-Market Pipeline', desc: 'Direct connections between farmers and businesses, cutting out middlemen for fair pricing.' },
    { icon: Shield, title: 'Transparent & Trusted', desc: 'KYC-verified users, quality assurance, and secure payment processing for every transaction.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track mandi prices, sales trends, and market demand with powerful dashboards.' },
];

export const AboutSection = () => {
    return (
        <section id="aboutus" className="py-20 sm:py-28 relative z-10 transition-colors"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                        Why ASWAMITHRA
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        Built for the Agri-Economy
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        A platform designed from the ground up to solve real problems in agricultural trade — from listing to logistics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="p-8 rounded-[28px] text-center transition-all cursor-pointer"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                boxShadow: 'var(--shadow-card)',
                            }}
                        >
                            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
                                style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                <feat.icon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <h3 className="font-black text-xl mb-3" style={{ color: 'var(--color-text-primary)' }}>{feat.title}</h3>
                            <p className="font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
