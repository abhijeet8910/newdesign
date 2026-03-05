import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { login as authLogin } from '../../../services/authService';
import { motion } from 'framer-motion';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const storeLogin = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();

    // If user was trying to access a protected page, redirect there after login
    const from = (location.state as any)?.from?.pathname;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { user, accessToken } = await authLogin({ email, password });

            storeLogin(user, accessToken);

            // Navigate based on role or return to intended page
            if (from) {
                navigate(from, { replace: true });
            } else if (user.role === 'Admin' || user.role === 'Super_Admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'Farmer' || user.role === 'Bulk_Farmer') {
                navigate('/farmer/dashboard');
            } else if (user.role === 'Business') {
                navigate('/business/dashboard');
            } else {
                navigate('/customer/home');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
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
            {error && (
                <div className="p-3 rounded-xl text-sm font-bold text-red-500" style={{ backgroundColor: 'rgba(211, 47, 47, 0.1)' }}>
                    {error}
                </div>
            )}

            {/* Hint */}
            <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>
                <strong>Demo:</strong> Use email containing <code className="font-bold">farmer</code>, <code className="font-bold">admin</code>, <code className="font-bold">business</code>, or any email for Customer. Any password works.
            </div>

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
