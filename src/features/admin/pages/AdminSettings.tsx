import { useState } from 'react';
import { Globe, Shield, Bell, DollarSign, Save, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToggleProps { label: string; description: string; enabled: boolean; onToggle: () => void; }

const Toggle = ({ label, description, enabled, onToggle }: ToggleProps) => (
    <div className="flex items-center justify-between p-4 rounded-2xl transition-all"
        style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)' }}>
        <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
        </div>
        <button onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${enabled ? 'bg-emerald-500' : ''}`}
            style={!enabled ? { backgroundColor: 'var(--color-border)' } : {}}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const InputField = ({ label, value, placeholder }: { label: string; value: string; placeholder: string }) => (
    <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>{label}</label>
        <input type="text" defaultValue={value} placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors"
            style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
    </div>
);

export const AdminSettings = () => {
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        maintenance: false,
        registration: true,
        emailVerification: true,
        twoFactor: false,
        newUser: true,
        orderUpdates: true,
        kycAlerts: true,
        systemAlerts: true,
    });

    const toggle = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

    const sections = [
        {
            title: 'General',
            subtitle: 'Basic platform configuration',
            icon: Globe,
            color: '#4B6D53',
            content: (
                <div className="space-y-4">
                    <InputField label="Platform Name" value="ASWAMITHRA" placeholder="Enter platform name" />
                    <InputField label="Support Email" value="support@aswamithra.in" placeholder="Enter support email" />
                    <InputField label="Contact Phone" value="+91 1800-123-4567" placeholder="Enter phone number" />
                    <InputField label="Platform URL" value="https://aswamithra.in" placeholder="Enter URL" />
                    <div className="pt-2 space-y-3">
                        <Toggle label="Maintenance Mode" description="Temporarily disable the platform for all users" enabled={toggles.maintenance} onToggle={() => toggle('maintenance')} />
                        <Toggle label="Open Registration" description="Allow new users to register on the platform" enabled={toggles.registration} onToggle={() => toggle('registration')} />
                    </div>
                </div>
            ),
        },
        {
            title: 'Security',
            subtitle: 'Authentication and access control',
            icon: Shield,
            color: '#0288D1',
            content: (
                <div className="space-y-4">
                    <InputField label="Session Timeout (minutes)" value="60" placeholder="e.g. 60" />
                    <InputField label="Max Login Attempts" value="5" placeholder="e.g. 5" />
                    <InputField label="Password Min Length" value="8" placeholder="e.g. 8" />
                    <div className="pt-2 space-y-3">
                        <Toggle label="Email Verification Required" description="Require email verification for new registrations" enabled={toggles.emailVerification} onToggle={() => toggle('emailVerification')} />
                        <Toggle label="Two-Factor Authentication" description="Enforce 2FA for all admin accounts" enabled={toggles.twoFactor} onToggle={() => toggle('twoFactor')} />
                    </div>
                </div>
            ),
        },
        {
            title: 'Notifications',
            subtitle: 'Email and push notification settings',
            icon: Bell,
            color: '#7B1FA2',
            content: (
                <div className="space-y-3">
                    <Toggle label="New User Notifications" description="Get notified when a new user registers" enabled={toggles.newUser} onToggle={() => toggle('newUser')} />
                    <Toggle label="Order Update Emails" description="Send email updates for order status changes" enabled={toggles.orderUpdates} onToggle={() => toggle('orderUpdates')} />
                    <Toggle label="KYC Submission Alerts" description="Notify admins of new KYC submissions" enabled={toggles.kycAlerts} onToggle={() => toggle('kycAlerts')} />
                    <Toggle label="System Health Alerts" description="Receive alerts for system health issues" enabled={toggles.systemAlerts} onToggle={() => toggle('systemAlerts')} />
                </div>
            ),
        },
        {
            title: 'Commission & Fees',
            subtitle: 'Platform transaction fee configuration',
            icon: DollarSign,
            color: '#E65100',
            content: (
                <div className="space-y-4">
                    <InputField label="Farmer Commission (%)" value="5" placeholder="e.g. 5" />
                    <InputField label="Business Commission (%)" value="3" placeholder="e.g. 3" />
                    <InputField label="Customer Delivery Fee (₹)" value="40" placeholder="e.g. 40" />
                    <InputField label="Payment Gateway Fee (%)" value="2" placeholder="e.g. 2" />
                    <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(245, 124, 0, 0.08)', border: '1px solid rgba(245, 124, 0, 0.2)' }}>
                        <p className="text-xs font-bold" style={{ color: '#E65100' }}>⚠️ Commission changes will apply to new transactions only. Existing orders are not affected.</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-8 min-h-screen">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 rounded-b-[32px] sm:rounded-[32px] shadow-xl mb-8 overflow-hidden -mx-4 sm:mx-0 -mt-8 sm:mt-0"
                style={{ background: 'linear-gradient(135deg, #1A2E20 0%, #2F4A35 50%, #3B5A42 100%)' }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/10 text-white/80 border border-white/20">
                            Configuration
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Platform Settings</h1>
                        <p className="text-white/60 mt-1 text-sm">Configure platform behavior, security, and fees.</p>
                    </div>
                    <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold bg-white/10 text-white/80 border border-white/20">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold shadow-md text-white"
                            style={{ backgroundColor: 'var(--color-accent)' }}>
                            <Save className="w-4 h-4" /> Save Changes
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 sm:px-0">
                {sections.map((section, idx) => (
                    <motion.div key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-[28px] p-6 transition-colors"
                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: section.color + '15' }}>
                                <section.icon className="w-5 h-5" style={{ color: section.color }} />
                            </div>
                            <div>
                                <h3 className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{section.title}</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{section.subtitle}</p>
                            </div>
                        </div>
                        {section.content}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
