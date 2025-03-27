import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FcGoogle } from "react-icons/fc";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const RegisterPage = () => {
  const navigate = useNavigate()
  const {register} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  })

  const validateForm = () => {
    if(!formData.name.trim()) return toast.error("Name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email format");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length < 8) return toast.error("Password must be at least 8 characters");

    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success)
    {
      register(formData, navigate)
    }
  }
  return (
    <div>
        <Navbar />
        <div className='flex flex-col justify-center items-center gap-6 w-full'>
            <h1 
              className="text-center text-3xl font-bold font-serif text-amber-500">Register</h1>
            <form 
              onSubmit={handleSubmit} 
              action="" 
              className='flex flex-col w-1/3 justify-center gap-2'>
                
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange = {e => {setFormData({...formData, name: e.target.value})}} 
                  className='block border-2 p-2 px-6 border-gray-300 bg-gray-100 rounded-2xl'/>


                <input 
                  type="email" 
                  placeholder="you@gmail.com" 
                  value={formData.email} 
                  onChange = {e => {setFormData({...formData, email: e.target.value})}} 
                  className='block border-2 p-2 px-6  border-gray-300 bg-gray-100 rounded-2xl'/>

              <div 
                className={`relative flex items-center border-2 bg-gray-100 p-2 px-6 rounded-2xl ${showPassword ? 'border-amber-500' : "border-gray-300"}`}>
                <input 
                  type={showPassword ? "text":"password"} 
                  placeholder="********" value={formData.password} 
                  onChange = {e => {setFormData({...formData, password: e.target.value})}} 
                  className="w-full bg-transparent outline-none pr-10"/>
                <button 
                  type='button' 
                  onClick={() => setShowPassword(!showPassword)} 
                  className='absolute right-6 text-amber-500'>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                
              </div>
                
                <button 
                  type='submit' 
                  className="block border-amber-500 text-black font-bold bg-amber-500 border-2 rounded-2xl px-6 py-2"
                 >
                  Create Account </button>
                <span className='text-center text-gray-400'>or Login with:</span>
                <button className="flex gap-4 justify-center border-amber-500 text-black font-bold border-2 rounded-2xl px-6 py-2"> <FcGoogle /> Login with Google </button>
                <span>Already have an Account? <Link to={"/login"}>Login Here</Link></span>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage