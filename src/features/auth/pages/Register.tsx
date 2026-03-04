import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../../../types';
import { motion } from 'framer-motion';

export const Register = () => {
    const [role, setRole] = useState<UserRole>('Customer');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login');
        }, 800);
    };

    const inputStyle = {
        backgroundColor: 'var(--color-input-bg)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            onSubmit={handleRegister}
        >
            {/* Role Selection */}
            <div className="flex rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid var(--color-border)' }}>
                {['Customer', 'Farmer', 'Business'].map((tabRole) => (
                    <button
                        key={tabRole}
                        type="button"
                        onClick={() => setRole(tabRole as UserRole)}
                        className="flex-1 px-4 py-2.5 text-sm font-bold transition-all"
                        style={{
                            backgroundColor: role === tabRole ? 'var(--color-accent)' : 'var(--color-bg-card)',
                            color: role === tabRole ? 'white' : 'var(--color-text-secondary)',
                        }}
                    >
                        {tabRole}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>First name</label>
                    <input id="firstName" type="text" required style={inputStyle}
                        className="mt-2 block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>Last name</label>
                    <input id="lastName" type="text" required style={inputStyle}
                        className="mt-2 block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2" />
                </div>
            </div>

            <div>
                <label htmlFor="reg-email" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>Email address</label>
                <div className="mt-2">
                    <input id="reg-email" type="email" required style={inputStyle}
                        className="block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2" />
                </div>
            </div>

            <div>
                <label htmlFor="reg-password" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>Password</label>
                <div className="mt-2">
                    <input id="reg-password" type="password" required style={inputStyle}
                        className="block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2" />
                </div>
            </div>

            <div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-2xl px-3 py-3 text-sm font-black text-white shadow-md transition-all disabled:opacity-50"
                    style={{ backgroundColor: '#E65100' }}
                >
                    {isLoading ? 'Creating account...' : `Sign up as ${role}`}
                </motion.button>
            </div>
        </motion.form>
    );
};
