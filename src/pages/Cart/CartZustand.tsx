import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  productName?: string;
  title?: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  [key: string]: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  newItemsCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  resetNewCount: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      newItemsCount: 0,
      
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            // If exists, just update quantity (don't increment new items count)
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // New item
            return {
              items: [...state.items, { product, quantity }],
              newItemsCount: state.newItemsCount + 1,
            };
          }
        }),
        
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
        
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
        
      clearCart: () => set({ items: [], newItemsCount: 0 }),
      
      resetNewCount: () => set({ newItemsCount: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
