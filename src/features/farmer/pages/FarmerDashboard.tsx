import { motion } from 'framer-motion';
import { StatsCard } from '../components/StatsCard';
import { EarningsChart } from '../components/EarningsChart';
import { AlertsPanel } from '../components/AlertsPanel';
import { TransactionTable } from '../components/TransactionTable';
import { Sprout, TrendingUp, Package, IndianRupee, ArrowUpRight } from 'lucide-react';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export const FarmerDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto pb-8">

            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[40px] sm:rounded-[40px] shadow-xl text-white mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-4 sm:mt-0"
                style={{ background: 'var(--color-hero-gradient)' }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">
                            Farmer Dashboard
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome back, Ravi 🌾</h1>
                        <p className="text-white/60 mt-1 text-sm sm:text-base">Your mandi prices are looking strong this week.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md bg-white/15 text-white border border-white/20 backdrop-blur-sm"
                    >
                        <Sprout className="w-5 h-5" /> Add New Listing
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 px-2 sm:px-0"
            >
                <motion.div variants={fadeUp}>
                    <StatsCard title="Total Sales" value="₹ 1,24,000" icon={TrendingUp} color="#2F6B3A" />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatsCard title="Active Listings" value="12" icon={Package} color="#E65100" />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatsCard title="Revenue" value="₹ 89,600" icon={IndianRupee} color="#0288D1" />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatsCard title="Growth" value="+23%" icon={ArrowUpRight} color="#7B1FA2" />
                </motion.div>
            </motion.div>

            {/* Charts & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 px-2 sm:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-3"
                >
                    <EarningsChart />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <AlertsPanel />
                </motion.div>
            </div>

            {/* Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-2 sm:px-0"
            >
                <TransactionTable />
            </motion.div>
        </div>
    );
};
