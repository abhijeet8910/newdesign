/**
 * Auth Service
 *
 * Currently returns mock data. To connect to a real backend:
 *   1. Uncomment the apiPost calls
 *   2. Remove the mock logic
 *   3. Set VITE_API_URL in your .env
 */

import { mockDelay } from './api';
// import { apiPost, apiGet } from './api';
import type { User, UserRole } from '../types';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
}

interface AuthResponse {
    user: User;
    accessToken: string;
}

/**
 * Login — mock implementation detects role from email.
 *
 * Real backend:
 *   return (await apiPost<AuthResponse>('/auth/login', credentials)).data;
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    await mockDelay(800);

    const email = credentials.email.toLowerCase();
    let mockRole: UserRole = 'Customer';
    if (email.includes('admin')) mockRole = 'Admin';
    else if (email.includes('super')) mockRole = 'Super_Admin';
    else if (email.includes('bulk')) mockRole = 'Bulk_Farmer';
    else if (email.includes('farmer')) mockRole = 'Farmer';
    else if (email.includes('business')) mockRole = 'Business';

    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        user: { id: crypto.randomUUID(), email, name, role: mockRole, isKycVerified: true },
        accessToken: `mock-jwt-${Date.now()}`,
    };
}

/**
 * Register — mock implementation.
 *
 * Real backend:
 *   return (await apiPost<AuthResponse>('/auth/register', data)).data;
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
    await mockDelay(1000);

    return {
        user: { id: crypto.randomUUID(), email: data.email, name: data.name, role: data.role, isKycVerified: false },
        accessToken: `mock-jwt-${Date.now()}`,
    };
}

/**
 * Get current user profile.
 *
 * Real backend:
 *   return (await apiGet<User>('/auth/me')).data;
 */
export async function getProfile(): Promise<User | null> {
    await mockDelay(200);
    // In mock mode, profile comes from the persisted authStore
    const raw = localStorage.getItem('aswamithra-auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.user || null;
}

/**
 * Logout — clears local state.
 *
 * Real backend: also call apiPost('/auth/logout', {});
 */
export async function logout(): Promise<void> {
    localStorage.removeItem('aswamithra-auth');
}
