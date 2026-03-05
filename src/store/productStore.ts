import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../services/productService';

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getByFarmer: (farmerId: string) => Product[];
}

// Pre-seeded mock data
const SEED_PRODUCTS: Product[] = [
    { id: 'seed-1', name: 'Organic Basmati Rice', category: 'Grains', price: 85, quantity: 500, unit: 'kg', description: 'Premium long-grain basmati from Dehradun valley', image: '🌾', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-02-15', status: 'active' },
    { id: 'seed-2', name: 'Fresh Alphonso Mangoes', category: 'Fruits', price: 300, quantity: 200, unit: 'kg', description: 'Grade A Alphonso from Ratnagiri', image: '🥭', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-02-20', status: 'active' },
    { id: 'seed-3', name: 'Red Onions', category: 'Vegetables', price: 30, quantity: 1000, unit: 'kg', description: 'Fresh harvest from Nashik farms', image: '🧅', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-02-25', status: 'active' },
    { id: 'seed-4', name: 'Turmeric Powder', category: 'Spices', price: 250, quantity: 100, unit: 'kg', description: 'Pure organic turmeric from Kerala', image: '🌿', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-03-01', status: 'active' },
    { id: 'seed-5', name: 'Farm Fresh Tomatoes', category: 'Vegetables', price: 40, quantity: 300, unit: 'kg', description: 'Vine-ripened tomatoes, no pesticides', image: '🍅', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-03-03', status: 'active' },
    { id: 'seed-6', name: 'Green Cardamom', category: 'Spices', price: 2000, quantity: 20, unit: 'kg', description: 'Premium cardamom from Coorg plantations', image: '🫛', farmerId: '1', farmerName: 'Demo User', createdAt: '2026-03-02', status: 'sold' },
];

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: SEED_PRODUCTS,

            addProduct: (product) => {
                set((state) => ({ products: [product, ...state.products] }));
            },

            updateProduct: (id, updates) => {
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, ...updates } : p
                    ),
                }));
            },

            deleteProduct: (id) => {
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                }));
            },

            getByFarmer: (farmerId) => {
                return get().products.filter((p) => p.farmerId === farmerId);
            },
        }),
        {
            name: 'aswamithra-products',
        }
    )
);
