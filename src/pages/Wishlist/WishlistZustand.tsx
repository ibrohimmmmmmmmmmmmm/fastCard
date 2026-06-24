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
  rating?: number;
  reviews?: number;
  condition?: string;
  brand?: string;
  category?: string;
  isNew?: boolean;
  discount?: number;
  color?: string[];
  features?: string[];
}

interface WishlistState {
  items: Product[];
  newItemsCount: number;
  toggleWishlist: (product: Product) => void;
  resetNewCount: () => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      newItemsCount: 0,
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return {
              items: state.items.filter((item) => item.id !== product.id),
            };
          } else {
            return {
              items: [...state.items, product],
              newItemsCount: state.newItemsCount + 1,
            };
          }
        }),
      resetNewCount: () => set({ newItemsCount: 0 }),
      clearWishlist: () => set({ items: [], newItemsCount: 0 }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
