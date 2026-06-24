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
}));