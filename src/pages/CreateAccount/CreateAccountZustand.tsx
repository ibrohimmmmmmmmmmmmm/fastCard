import { create } from 'zustand'
import { axiosRequest } from '../../utils/axios';

export const useCreateAccountStore = create((set) => ({
    createAccountData : [],
    postAccount : async (account : any) => {
        try {
            const response = await axiosRequest.post("/Account/register", account)
            set((state: any) => ({
                createAccountData: [...state.createAccountData, response.data],
              }));
            return response
        } catch (error) {
            console.error(error);
        }
    }
}))
