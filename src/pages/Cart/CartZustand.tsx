import { create } from "zustand";
import { axiosRequest } from "../../utils/axios";

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
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  resetNewCount: () => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  newItemsCount: 0,
  
  fetchCart: async () => {
    try {
      const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
      let fetchedItems: CartItem[] = [];
      
      const itemsArray = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
      
      fetchedItems = itemsArray.map((item: any) => {
        if (item.product && item.quantity !== undefined) {
           return { product: item.product, quantity: item.quantity };
        }
        if (item.quantity !== undefined) {
           const { quantity, ...productData } = item;
           return { product: productData as Product, quantity };
        }
        return { product: item as Product, quantity: 1 };
      });
      
      set({ items: fetchedItems });
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  },

  addToCart: async (product, quantity = 1) => {
    try {
      const state = get();
      const existingItem = state.items.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        set({
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        });
      } else {
        set({
          items: [...state.items, { product, quantity }],
          newItemsCount: state.newItemsCount + 1,
        });
      }

      for (let i = 0; i < quantity; i++) {
        await axiosRequest.post(`/Cart/add-product-to-cart?id=${product.id}`);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  },
  
  removeFromCart: async (productId) => {
    try {
      set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      }));
      await axiosRequest.delete(`/Cart/delete-product-from-cart?id=${productId}`);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  },
  
  updateQuantity: async (productId, quantity) => {
    try {
      const state = get();
      const item = state.items.find(i => i.product.id === productId);
      if (!item) return;
      
      const oldQuantity = item.quantity;
      const newQuantity = Math.max(1, quantity);
      const diff = newQuantity - oldQuantity;
      
      if (diff === 0) return;
      
      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
      
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          await axiosRequest.put(`/Cart/increase-product-in-cart?id=${productId}`);
        }
      } else {
        for (let i = 0; i < Math.abs(diff); i++) {
          await axiosRequest.put(`/Cart/reduce-product-in-cart?id=${productId}`);
        }
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  },
  
  clearCart: async () => {
    try {
      set({ items: [], newItemsCount: 0 });
      await axiosRequest.delete("/Cart/clear-cart");
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  },
  
  resetNewCount: () => set({ newItemsCount: 0 }),
}));
