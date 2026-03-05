import { motion } from 'framer-motion';
import { Package, Tractor, Truck, Utensils } from 'lucide-react';

export const HowItWorksSection = () => {
    const steps = [
        {
            icon: Tractor,
            title: 'Farm Fresh Harvest',
            desc: 'Farmers harvest produce and list it directly on ASWAMITHRA at fair prices.',
            color: '#2E7D32', // Green
        },
        {
            icon: Package,
            title: 'Quality Assured',
            desc: 'Every batch is quality-checked to ensure organic and safety standards.',
            color: '#1565C0', // Blue
        },
        {
            icon: Truck,
            title: 'Fast Logistics',
            desc: 'Optimized routing delivers produce from farm to city within 12 hours.',
            color: '#E65100', // Orange
        },
        {
            icon: Utensils,
            title: 'Delivered Fresh',
            desc: 'Consumers and businesses receive farm-fresh goods at their doorstep.',
            color: '#7B1FA2', // Purple
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden transition-colors"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-sm"
                        style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        <span className="text-xs font-bold tracking-widest uppercase">The Process</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                        From <span style={{ color: 'var(--color-accent)' }}>Soil</span> to <span style={{ color: '#E65100' }}>Table</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        A transparent, direct, and zero-commission supply chain.
                    </motion.p>
                </div>

                {/* Timeline Grid */}
                <div className="relative">
                    {/* Background Line (Desktop only) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[3px] rounded-full z-0 opacity-20"
                        style={{ background: 'linear-gradient(90deg, #2E7D32, #1565C0, #E65100, #7B1FA2)' }} />

                    {/* Animated Line Fill */}
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }}
                        className="hidden lg:block absolute top-[60px] left-[10%] h-[3px] rounded-full z-0"
                        style={{ background: 'linear-gradient(90deg, #2E7D32, #1565C0, #E65100, #7B1FA2)', boxShadow: '0 0 15px rgba(0,0,0,0.2)' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div key={idx}
                                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.2 + 0.3 }}
                                className="flex flex-col items-center text-center group">

                                {/* Hexagon/Circle Icon Wrapper */}
                                <div className="p-1 mb-6 rounded-3xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                                    style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)` }}>
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                                        style={{ backgroundColor: 'var(--color-bg-elevated)', border: `2px solid ${step.color}55` }}>
                                        <step.icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: step.color }} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 rounded-[24px] transition-all duration-300 group-hover:shadow-xl w-full"
                                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white mx-auto mb-4"
                                        style={{ backgroundColor: step.color }}>
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>{step.title}</h3>
                                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
