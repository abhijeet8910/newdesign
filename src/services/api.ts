/**
 * API Client — centralized HTTP wrapper.
 *
 * Currently uses mock implementations.
 * To connect a real backend:
 *   1. Set BASE_URL to your API root (e.g. 'https://api.aswamithra.in/v1')
 *   2. Remove the mock delay/data from each service file
 *   3. The api() calls below will automatically attach auth headers
 */

const BASE_URL = import.meta.env.VITE_API_URL || '';

/** Get the current auth token from localStorage  */
const getToken = (): string | null => {
    try {
        const raw = localStorage.getItem('aswamithra-auth');
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.state?.accessToken || null;
    } catch {
        return null;
    }
};

interface ApiOptions extends RequestInit {
    skipAuth?: boolean;
}

interface ApiResponse<T = any> {
    data: T;
    status: number;
    ok: boolean;
}

/**
 * Core fetch wrapper — adds auth headers, parses JSON, handles errors.
 */
export async function api<T = any>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<ApiResponse<T>> {
    const { skipAuth = false, headers: customHeaders, ...rest } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((customHeaders as Record<string, string>) || {}),
    };

    if (!skipAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const response = await fetch(url, { headers, ...rest });

    // Handle 401 — clear auth and redirect
    if (response.status === 401) {
        localStorage.removeItem('aswamithra-auth');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
    }

    let data: T;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        data = await response.json();
    } else {
        data = (await response.text()) as unknown as T;
    }

    if (!response.ok) {
        const errorMessage = (data as any)?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    return { data, status: response.status, ok: response.ok };
}

/** Helper for common verbs */
export const apiGet = <T = any>(endpoint: string, opts?: ApiOptions) =>
    api<T>(endpoint, { method: 'GET', ...opts });

export const apiPost = <T = any>(endpoint: string, body: any, opts?: ApiOptions) =>
    api<T>(endpoint, { method: 'POST', body: JSON.stringify(body), ...opts });

export const apiPut = <T = any>(endpoint: string, body: any, opts?: ApiOptions) =>
    api<T>(endpoint, { method: 'PUT', body: JSON.stringify(body), ...opts });

export const apiDelete = <T = any>(endpoint: string, opts?: ApiOptions) =>
    api<T>(endpoint, { method: 'DELETE', ...opts });

/** Simulated network delay for mock services */
export const mockDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms));
