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
  rating?: number;
  reviews?: number;
  condition?: string;
  brand?: string;
  category?: string;
  isNew?: boolean;
  discount?: number;
  color?: string[];
  features?: string[];
  [key: string]: any;
}

interface ProductsState {
  products: Product[];
  categories: any[];
  brands: any[];
  colors: any[];
  minMaxPrice: { minPrice: number; maxPrice: number } | null;
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getCategories: () => Promise<void>;
  getBrands: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: [],
  brands: [],
  colors: [],
  minMaxPrice: null,
  loading: false,
  error: null,

  getProducts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosRequest.get("/Product/get-products");
      let data = response.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch(e){} }
      
      let extractedProducts: any[] = [];
      let extractedBrands: any[] = [];
      let extractedColors: any[] = [];
      let extractedMinMax = null;

      if (data?.data) {
        extractedProducts = data.data.products || [];
        extractedBrands = data.data.brands || [];
        extractedColors = data.data.colors || [];
        extractedMinMax = data.data.minMaxPrice || null;
      } else if (data?.products) {
        extractedProducts = data.products || [];
      } else if (Array.isArray(data)) {
        extractedProducts = data;
      }
      
      set((state) => ({ 
        products: extractedProducts,
        colors: extractedColors,
        minMaxPrice: extractedMinMax,
        // Only override brands if they are provided in this request
        ...(extractedBrands.length > 0 && { brands: extractedBrands })
      }));
    } catch (error: any) {
      console.error("PRODUCTS ERROR:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getCategories: async () => {
    try {
      const response = await axiosRequest.get("/Category/get-categories");
      let data = response.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch(e){} }
      
      let extractedCategories: any[] = [];
      if (Array.isArray(data)) extractedCategories = data;
      else if (Array.isArray(data?.data)) extractedCategories = data.data;
      else if (Array.isArray(data?.data?.categories)) extractedCategories = data.data.categories;
      else if (Array.isArray(data?.categories)) extractedCategories = data.categories;

      set({ categories: extractedCategories });
    } catch (error) {
      console.error("CATEGORIES ERROR:", error);
    }
  },

  getBrands: async () => {
    try {
      const response = await axiosRequest.get("/Brand/get-brands");
      let data = response.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch(e){} }
      
      let extractedBrands: any[] = [];
      if (Array.isArray(data)) extractedBrands = data;
      else if (Array.isArray(data?.data)) extractedBrands = data.data;
      else if (Array.isArray(data?.data?.brands)) extractedBrands = data.data.brands;
      else if (Array.isArray(data?.brands)) extractedBrands = data.brands;

      set({ brands: extractedBrands });
    } catch (error) {
      console.error("BRANDS ERROR:", error);
    }
  },
}));
