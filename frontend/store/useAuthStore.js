import {create} from "zustand"
import { axiosInstance } from "../src/lib/axios.js"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"



const base_url = import.meta.env.MODE === "development" ? "http://localhost:3000/api": import.meta.env.VITE_API_URL

export const useAuthStore = create((set, get) => ({
    userData: null,
    isCheckingAuth: true,
    isRegistering: false,
    isLoggingIn: false,
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
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed:", error.response.data.message)
            console.error("Registration failed:", error.response.data.message)
        } finally{
            set({isRegistering: false});
        }
    },
    login: async (formData, navigate) => {
      
      set({isLoggingIn: true})
      try {
        const response = await axiosInstance.post("/auth/login", formData)
        set({userData: response.data});
        toast.success("Logged in Successfully");
        navigate("/");

      } catch (error) {
        toast.error(error.response.data.message)
      }finally{
        set({isLoggingIn: false});
      }
    },
    logout: async () => {
      try {
        console.log("receive");
        await axiosInstance.post("/auth/logout");
        console.log("sent");
        set({userData: null});
        console.log(userData);
        toast.success("Logged Out Successfully")
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }


}))

