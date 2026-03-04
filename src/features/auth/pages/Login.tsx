import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import type { UserRole } from '../../../types';
import { motion } from 'framer-motion';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state: any) => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));

            let mockRole: UserRole = 'Customer';
            if (email.includes('admin')) mockRole = 'Admin';
            else if (email.includes('bulk')) mockRole = 'Bulk_Farmer';
            else if (email.includes('farmer')) mockRole = 'Farmer';
            else if (email.includes('business')) mockRole = 'Business';

            login(
                { id: '1', email, name: 'Demo User', role: mockRole },
                'mock-jwt-token'
            );

            if (mockRole === 'Admin') navigate('/admin/dashboard');
            else if (mockRole === 'Farmer' || mockRole === 'Bulk_Farmer') navigate('/farmer/dashboard');
            else if (mockRole === 'Business') navigate('/business/dashboard');
            else navigate('/customer/home');

        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            onSubmit={handleLogin}
        >
            <div>
                <label htmlFor="email" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: 'var(--color-input-bg)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-primary)',
                        }}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-bold leading-6" style={{ color: 'var(--color-text-primary)' }}>
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: 'var(--color-input-bg)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-primary)',
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ accentColor: 'var(--color-accent)' }}
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
                        Remember me
                    </label>
                </div>

                <div className="text-sm leading-6">
                    <a href="#" className="font-bold transition-colors" style={{ color: 'var(--color-accent)' }}>
                        Forgot password?
                    </a>
                </div>
            </div>

            <div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-2xl px-3 py-3 text-sm font-black text-white shadow-md transition-all disabled:opacity-50"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </motion.button>
            </div>
        </motion.form>
    );
};
