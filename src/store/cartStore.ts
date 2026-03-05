import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    farmerName?: string;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
    totalItems: number;
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
    return items.reduce(
        (acc, item) => {
            acc.totalAmount += item.price * item.quantity;
            acc.totalItems += item.quantity;
            return acc;
        },
        { totalAmount: 0, totalItems: 0 }
    );
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            totalAmount: 0,
            totalItems: 0,

            addItem: (newItem) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === newItem.id);
                    const quantityToAdd = newItem.quantity || 1;

                    let updatedItems;
                    if (existingItem) {
                        updatedItems = state.items.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + quantityToAdd }
                                : item
                        );
                    } else {
                        updatedItems = [...state.items, { ...newItem, quantity: quantityToAdd }];
                    }

                    const totals = calculateTotals(updatedItems);
                    return { items: updatedItems, ...totals };
                });
            },

            removeItem: (id) => {
                set((state) => {
                    const updatedItems = state.items.filter((item) => item.id !== id);
                    const totals = calculateTotals(updatedItems);
                    return { items: updatedItems, ...totals };
                });
            },

            updateQuantity: (id, quantity) => {
                set((state) => {
                    if (quantity <= 0) {
                        const updatedItems = state.items.filter((item) => item.id !== id);
                        const totals = calculateTotals(updatedItems);
                        return { items: updatedItems, ...totals };
                    }

                    const updatedItems = state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    );
                    const totals = calculateTotals(updatedItems);
                    return { items: updatedItems, ...totals };
                });
            },

            clearCart: () => {
                set({ items: [], totalAmount: 0, totalItems: 0 });
            },
        }),
        {
            name: 'aswamithra-cart',
        }
    )
);
