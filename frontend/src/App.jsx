
import React from "react"
import {Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"

import { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import CheckoutPage from "./pages/CartPage"
import RewardsPage from "./pages/RewardsPage"
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage"
import OrderPage from "./pages/OrderPage"


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
      <Route path="/dashboard" element={userData ? <Dashboard /> : <Navigate to="/register" />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin07" element={<AdminPage />} />
    </Routes>
    <Toaster />
    
    </>
  )
}

export default App
