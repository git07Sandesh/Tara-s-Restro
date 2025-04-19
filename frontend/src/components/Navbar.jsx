// components/Navbar.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {userData, logout} = useAuthStore()

  return (
    <nav className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="text-amber-500 text-2xl font-bold font-serif"><Link to="/">Tara's Restro </Link></div>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-amber-500 text-xl font-extrabold hover:text-gray-300 transition">Home</Link>
          <Link to="/menu" className="text-amber-500 text-xl font-extrabold hover:text-gray-300 transition">Menu</Link>
          <Link to="/order" className="text-amber-500 text-xl font-extrabold hover:text-gray-300 transition">Order</Link>
          {userData ? (<>
            <Link to="/rewards" className="text-amber-500 text-xl font-extrabold hover:text-gray-300 transition">Rewards</Link>
              <span className="text-amber-500 text-lg font-bold">Hi, <span className="text-amber-400 text-lg font-bold">{userData.name}</span></span>
              <button 
                onClick={logout} 
                className="bg-amber-500 text-black text-lg font-bold px-4 py-2 rounded hover:bg-gray-200 transition">
                Logout
              </button>
          </>) : (
            <>
              <Link to="/login" className="text-amber-500 text-xl font-extrabold hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="bg-amber-500 text-black text-xl font-extrabold px-4 py-2 rounded-full hover:bg-gray-200 transition">
                Register
              </Link>
            </>
          )}
          
          <Link to="/cart" className="text-white transition p-2 rounded-2xl duration-200 hover:bg-gray-400"><BsCart2 className="text-2xl" /></Link>
        </div>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-black bg-opacity-90 py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="text-white hover:text-gray-300 transition">Home</Link>
            <Link to="/menu" className="text-white hover:text-gray-300 transition">Full Menu</Link>
            <Link to="/login" className="text-white hover:text-gray-300 transition">Login</Link>
            <Link to="/register" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
              Register
            </Link>
            <button className=" text-white text-lg font-semibold transition duration-200 hover:bg-gray-200"><BsCart2 className="text-xl" /></button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
