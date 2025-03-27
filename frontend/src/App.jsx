import {Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"
import LoginPage from "./pages/LoginPage"
import PhotoPage from "./pages/PhotoPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"

import { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"


function App() {
  const {userData, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if(isCheckingAuth)
  {
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
    
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={userData ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/photoes" element={<PhotoPage />} />
      <Route path="/contact" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
