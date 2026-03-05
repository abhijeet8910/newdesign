/**
 * Product Service
 *
 * Currently persists via Zustand/localStorage (productStore).
 * To connect to a real backend:
 *   1. Uncomment the api calls
 *   2. Remove mock logic
 *   3. ProductStore becomes a cache layer refreshed from API
 */

import { mockDelay } from './api';
// import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    unit: string;
    description: string;
    image: string;
    farmerId: string;
    farmerName: string;
    createdAt: string;
    status: 'active' | 'sold' | 'draft';
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'status'>;

/**
 * Get all products (optionally by farmer).
 *
 * Real backend:
 *   const params = farmerId ? `?farmerId=${farmerId}` : '';
 *   return (await apiGet<Product[]>(`/products${params}`)).data;
 */
export async function getProducts(farmerId?: string): Promise<Product[]> {
    await mockDelay(300);
    const raw = localStorage.getItem('aswamithra-products');
    const all: Product[] = raw ? JSON.parse(raw)?.state?.products || [] : [];
    return farmerId ? all.filter((p) => p.farmerId === farmerId) : all;
}

/**
 * Get single product by ID.
 *
 * Real backend:
 *   return (await apiGet<Product>(`/products/${id}`)).data;
 */
export async function getProductById(id: string): Promise<Product | null> {
    await mockDelay(200);
    const products = await getProducts();
    return products.find((p) => p.id === id) || null;
}

/**
 * Create a new product listing.
 *
 * Real backend:
 *   return (await apiPost<Product>('/products', input)).data;
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
    await mockDelay(500);
    return {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'active',
    };
}

/**
 * Update a product.
 *
 * Real backend:
 *   return (await apiPut<Product>(`/products/${id}`, data)).data;
 */
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    await mockDelay(400);
    const product = await getProductById(id);
    if (!product) throw new Error('Product not found');
    return { ...product, ...data };
}

/**
 * Delete a product.
 *
 * Real backend:
 *   await apiDelete(`/products/${id}`);
 */
export async function deleteProduct(_id: string): Promise<void> {
    await mockDelay(300);
    // Actual deletion handled by productStore
}
