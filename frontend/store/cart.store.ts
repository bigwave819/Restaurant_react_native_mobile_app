import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Unique cart item ID (not menu item ID)
    menuItemId: string; // Original menu item ID
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    removeItem: (id: string) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            
            addItem: (newItem) => {
                set((state) => {
                    // Generate unique ID for each cart item
                    const cartItemId = `${newItem.menuItemId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    
                    return {
                        items: [...state.items, { 
                            ...newItem, 
                            id: cartItemId,
                            quantity: 1 
                        }]
                    };
                });
            },
            
            increaseQty: (id: string) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }));
            },
            
            decreaseQty: (id: string) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ).filter(item => item.quantity > 0)
                }));
            },
            
            removeItem: (id: string) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== id)
                }));
            },
            
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
            
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            clearCart: () => {
                set({ items: [] });
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);