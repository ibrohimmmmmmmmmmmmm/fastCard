import { create } from "zustand";
import { axiosRequest } from "../../utils/axios";

export const useHomeStore = create((set) => ({
    products: [],
    brands: [],
    categories: [],

    getProducts: async () => {
        try {
            const { data } = await axiosRequest.get("/Product/get-products");

            set({
                products: data.data.products,
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getBrands: async () => {
        try {
            const { data } = await axiosRequest.get("/Brand/get-brands");

            set({
                brands: data.data,
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getCategories: async () => {
        try {
            const response = await axiosRequest.get("/Category/get-categories");
            let data = response.data;
            if (typeof data === "string") {
                try { data = JSON.parse(data); } catch (e) { /* ignore */ }
            }

            let extracted: any[] = [];
            if (Array.isArray(data)) extracted = data;
            else if (Array.isArray(data?.data)) extracted = data.data;

            set({ categories: extracted });
        } catch (error) {
            console.error("CATEGORIES ERROR:", error);
        }
    },
}));