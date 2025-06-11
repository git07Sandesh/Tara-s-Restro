import {create} from "zustand"
import { axiosInstance } from "../src/lib/axios"
import axios from "axios"

const base_url = import.meta.env.MODE === "development" ? "http://localhost:3000/api": import.meta.env.VITE_API_URL

export const useOrderStore = create((set,get) => ({
    orders:[],
    loading:false,
    error: null,

    fetchOrders: async () => {
        set({loading: true, error: null})
        try {
            const res = await axios.get(`${base_url}/order`)
            set({orders: res.data.data, loading:false})
        } catch (error) {
            set({error: error.message || "Fetching order failed", loading:false})
        }
    },
    createOrder: async (items, total) => {
        set({loading: true, error: null});
        try {
            const res = await axios.post(`${base_url}/order`,{
                items,
                total,
            });
            set((state) => ({
                orders: [...state.orders, res.data.data],
                loading:false
            }))
        } catch (error) {
            set({error: error?.response?.data?.message || "Order Creation Failed", loading: false})
        }
    }
}))
