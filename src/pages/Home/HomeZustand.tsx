import { create } from "zustand";
import { axiosRequest } from "../../utils/axios";

export const useHomeStore = create((set) => ({
    products: [],
    categories: [],
    brands: [],

    getProducts: async () => {
        try {
            const response = await axiosRequest.get("/Product/get-products");
            set({ products: response.data.data });
            return response.data;
        } catch (error) {
            console.error("HOME ERROR:", error);
            return null;
        }
    },
}));