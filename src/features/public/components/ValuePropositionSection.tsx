import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, HandHeart } from 'lucide-react';

export const ValuePropositionSection = () => {
    const values = [
        {
            title: "0% Commission for Farmers",
            desc: "Farmers keep 100% of their profits. We make money on logistics and premium B2B features, not by squeezing producers.",
            icon: HandHeart,
            color: "#E65100", // Orange
            className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-orange-500/10 to-transparent",
            delay: 0.1
        },
        {
            title: "100% Organic Certified",
            desc: "Every listed farm goes through strict verification to ensure chemical-free produce.",
            icon: Leaf,
            color: "#2E7D32", // Green
            className: "md:col-span-1 md:row-span-1 bg-gradient-to-bl from-green-500/10 to-transparent",
            delay: 0.2
        },
        {
            title: "Same-Day Delivery",
            desc: "Strategic micro-warehousing ensures your produce goes from farm to table within 12 hours.",
            icon: Zap,
            color: "#1565C0", // Blue
            className: "md:col-span-1 md:row-span-1 bg-gradient-to-tr from-blue-500/10 to-transparent",
            delay: 0.3
        },
        {
            title: "Trusted & Transparent",
            desc: "Real-time tracking, transparent pricing, and direct farmer communication.",
            icon: ShieldCheck,
            color: "#7B1FA2", // Purple
            className: "md:col-span-2 md:row-span-1 bg-gradient-to-tl from-purple-500/10 to-transparent",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden transition-colors"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-sm"
                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                        <span className="text-xs font-bold tracking-widest uppercase">Why Choose Us</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                        Empowering Farmers. <br className="hidden md:block" /> Delighting Consumers.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {values.map((item, idx) => (
                        <motion.div key={idx}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`p-8 rounded-[32px] group relative overflow-hidden ${item.className}`}
                            style={{
                                backgroundColor: 'var(--color-bg-elevated)',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                            }}>

                            {/* Abstract background shape */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-150"
                                style={{ backgroundColor: item.color, filter: 'blur(40px)' }} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md"
                                    style={{ backgroundColor: 'var(--color-bg-card)', border: `1px solid ${item.color}33` }}>
                                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
                                    <p className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
