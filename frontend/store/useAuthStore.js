import {create} from "zustand"
import { axiosInstance } from "../src/lib/axios.js"
import toast from "react-hot-toast"


const base_url = "http://localhost:3000"

export const useAuthStore = create((set, get) => ({
    userData: null,
    isCheckingAuth:true,
    isRegistering: false,
    checkAuth: async () => {
      try {
        const response = await axiosInstance.get("/auth/check")
        set({userData: response.data});
      } catch (error) {
        console.log("Error in checkAuth:", error);
        set({userData: null});
      } finally{
        set({isCheckingAuth: false});
      } 
    },
    register: async(formData, navigate) => {
        
        set({isRegistering: true})
        try {
            const response = await axiosInstance.post("/auth/register", formData)
            console.log(response.data)
            set({userData: response.data})
            toast.success("Account Created Successfully");
            console.log("User Registered:", response.data)
            navigate("/dashboard");
        } catch (error) {
            toast.error("Registration failed:", error.response.data.message)
            console.error("Registration failed:", error.response.data.message)
        } finally{
            set({isRegistering: false});
        }
    }

}))

