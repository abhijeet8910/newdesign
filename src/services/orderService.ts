/**
 * Order Service
 *
 * Currently returns mock data.
 * To connect to a real backend:
 *   1. Uncomment the api calls
 *   2. Remove mock arrays
 */

import { mockDelay } from './api';
// import { apiGet, apiPost } from './api';

export interface Order {
    id: string;
    items: { productId: string; name: string; quantity: number; price: number }[];
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    buyerName: string;
    sellerName: string;
    createdAt: string;
    deliveryDate?: string;
}

const MOCK_ORDERS: Order[] = [
    { id: 'ORD-2041', items: [{ productId: 'p1', name: 'Organic Rice — 500kg', quantity: 1, price: 30000 }], total: 30000, status: 'pending', buyerName: 'Priya Foods', sellerName: 'Ravi Farms', createdAt: '2026-03-05', deliveryDate: '2026-03-08' },
    { id: 'ORD-2040', items: [{ productId: 'p2', name: 'Fresh Mangoes — 200kg', quantity: 1, price: 60000 }], total: 60000, status: 'shipped', buyerName: 'FarmFresh Corp', sellerName: 'Konkan Growers', createdAt: '2026-03-04', deliveryDate: '2026-03-07' },
    { id: 'ORD-2039', items: [{ productId: 'p3', name: 'Premium Wheat — 1T', quantity: 1, price: 45000 }], total: 45000, status: 'delivered', buyerName: 'GreenLeaf Organics', sellerName: 'Punjab Harvest', createdAt: '2026-03-03', deliveryDate: '2026-03-05' },
    { id: 'ORD-2038', items: [{ productId: 'p4', name: 'Red Chilli — 50kg', quantity: 1, price: 15000 }], total: 15000, status: 'confirmed', buyerName: 'SpiceKing Exports', sellerName: 'Guntur Spices', createdAt: '2026-03-02' },
];

/**
 * Get all orders (optionally filtered).
 *
 * Real backend:
 *   return (await apiGet<Order[]>('/orders')).data;
 */
export async function getOrders(): Promise<Order[]> {
    await mockDelay(400);
    return MOCK_ORDERS;
}

/**
 * Get order by ID.
 *
 * Real backend:
 *   return (await apiGet<Order>(`/orders/${id}`)).data;
 */
export async function getOrderById(id: string): Promise<Order | null> {
    await mockDelay(200);
    return MOCK_ORDERS.find((o) => o.id === id) || null;
}

/**
 * Create a new order from cart items.
 *
 * Real backend:
 *   return (await apiPost<Order>('/orders', data)).data;
 */
export async function createOrder(data: {
    items: { productId: string; name: string; quantity: number; price: number }[];
    total: number;
    buyerName: string;
}): Promise<Order> {
    await mockDelay(800);
    return {
        id: `ORD-${Date.now().toString().slice(-4)}`,
        ...data,
        sellerName: 'Multiple Sellers',
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
}

/**
 * Update order status.
 *
 * Real backend:
 *   return (await apiPut<Order>(`/orders/${id}`, { status })).data;
 */
export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    await mockDelay(400);
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return { ...order, status };
}
