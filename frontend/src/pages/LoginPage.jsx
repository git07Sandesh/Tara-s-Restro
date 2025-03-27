import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FcGoogle } from "react-icons/fc";
import {FaEye, FaEyeSlash} from "react-icons/fa";
 

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div>
        <Navbar />
        <div className='flex flex-col justify-center items-center gap-6 w-full'>
            <h1 
              className="text-center text-3xl font-bold font-serif text-amber-500">Login</h1>
            <form 
              onSubmit={handleSubmit} 
              action="" 
              className='flex flex-col w-1/3 justify-center gap-2'>
              
                <input 
                  type="email" 
                  placeholder="you@gmail.com" 
                  value={formData.email} 
                  onChange = {e => {setFormData({...formData, email: e.target.value})}} 
                  className='block border-2 p-2 px-6 border-gray-300 bg-gray-100 rounded-2xl'/>

              <div className={`flex justify-between border-2 p-2 px-6 bg-gray-100 rounded-2xl ${showPassword ? 'border-amber-500' : "border-gray-300"}`}>
                <input 
                  type={showPassword ? "text":"password"} 
                  placeholder="********" value={formData.password} 
                  onChange = {e => {setFormData({...formData, password: e.target.value})}} 
                  className=""/>
                <button 
                  type='button' 
                  onClick={() => setShowPassword(!showPassword)} 
                  className='text-amber-500'>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                
              </div>
                

                <button 
                  type='submit' 
                  className="block border-amber-500 text-black font-bold bg-amber-500 border-2 rounded-2xl px-6 py-2"
                 >Login</button>
                <span className='text-gray-400'>Forgot Password?</span>
                <button className="flex gap-4 justify-center border-amber-500 text-black font-bold border-2 rounded-2xl px-6 py-2"> <FcGoogle /> Login with Google </button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage