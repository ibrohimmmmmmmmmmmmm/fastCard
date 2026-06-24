import { create } from "zustand";
import { axiosRequest } from "../../utils/axios";

interface ProductDetailsState {
  product: any | null;
  loading: boolean;
  error: string | null;
  getProductById: (id: string | number) => Promise<void>;
}

export const useProductDetailsStore = create<ProductDetailsState>((set) => ({
  product: null,
  loading: false,
  error: null,

  getProductById: async (id: string | number) => {
    try {
      set({ loading: true, error: null, product: null });
      // First try the specific endpoint
      try {
        const response = await axiosRequest.get(`/Product/get-product-by-id?id=${id}`);
        let data = response.data;
        if (typeof data === 'string') { try { data = JSON.parse(data); } catch(e){} }
        
        let extractedProduct = null;
        if (data?.data) {
          extractedProduct = data.data;
        } else if (data) {
          extractedProduct = data;
        }

        if (extractedProduct) {
          set({ product: extractedProduct });
          return;
        }
      } catch (err) {
        console.warn("Could not fetch product by ID endpoint, falling back to finding in all products.");
      }

      // Fallback: fetch all and find
      const response = await axiosRequest.get("/Product/get-products");
      let data = response.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch(e){} }
      
      let allProducts: any[] = [];
      if (data?.data?.products) {
        allProducts = data.data.products;
      } else if (data?.products) {
        allProducts = data.products;
      } else if (Array.isArray(data)) {
        allProducts = data;
      }

      const found = allProducts.find((p: any) => p.id == id);
      set({ product: found || null });
    } catch (error: any) {
      console.error("PRODUCT DETAILS ERROR:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
