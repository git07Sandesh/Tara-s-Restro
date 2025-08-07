// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userData, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-medium' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className={`text-2xl font-bold font-serif transition-colors duration-300 ${
            isScrolled ? 'text-primary-600' : 'text-primary-400'
          }`}>
            <Link to="/" className="hover:text-primary-500 transition-colors">
              Tara's Restro
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-lg font-medium transition-colors hover:text-primary-500 ${
                isScrolled 
                  ? (isActive('/') ? 'text-primary-600' : 'text-neutral-700') 
                  : (isActive('/') ? 'text-primary-300' : 'text-white/90')
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`text-lg font-medium transition-colors hover:text-primary-500 ${
                isScrolled 
                  ? (isActive('/menu') ? 'text-primary-600' : 'text-neutral-700') 
                  : (isActive('/menu') ? 'text-primary-300' : 'text-white/90')
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/order" 
              className={`text-lg font-medium transition-colors hover:text-primary-500 ${
                isScrolled 
                  ? (isActive('/order') ? 'text-primary-600' : 'text-neutral-700') 
                  : (isActive('/order') ? 'text-primary-300' : 'text-white/90')
              }`}
            >
              Order
            </Link>
            
            {userData ? (
              <>
                <Link 
                  to="/rewards" 
                  className={`text-lg font-medium transition-colors hover:text-primary-500 ${
                    isScrolled 
                      ? (isActive('/rewards') ? 'text-primary-600' : 'text-neutral-700') 
                      : (isActive('/rewards') ? 'text-primary-300' : 'text-white/90')
                  }`}
                >
                  Rewards
                </Link>
                <span className={`text-lg font-medium ${
                  isScrolled ? 'text-neutral-700' : 'text-white/90'
                }`}>
                  Hi, <span className="text-primary-500 font-semibold">{userData.name}</span>
                </span>
                <button 
                  onClick={logout} 
                  className="bg-primary-500 hover:bg-primary-600 text-white text-lg font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`text-lg font-medium transition-colors hover:text-primary-500 ${
                    isScrolled 
                      ? (isActive('/login') ? 'text-primary-600' : 'text-neutral-700') 
                      : (isActive('/login') ? 'text-primary-300' : 'text-white/90')
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-500 hover:bg-primary-600 text-white text-lg font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
            
            <Link 
              to="/cart" 
              className={`p-2 rounded-full transition-all duration-300 hover:bg-primary-500/20 ${
                isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-primary-300'
              }`}
            >
              <BsCart2 className="text-2xl" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden transition-colors ${
              isScrolled ? 'text-neutral-700' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-large">
            <div className="flex flex-col py-4 space-y-4">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/order" 
                className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Order
              </Link>
              {userData ? (
                <>
                  <Link 
                    to="/rewards" 
                    className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rewards
                  </Link>
                  <div className="px-6 py-2">
                    <span className="text-neutral-700">Hi, <span className="text-primary-600 font-semibold">{userData.name}</span></span>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsMenuOpen(false); }} 
                    className="mx-6 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-full transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="mx-6 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-full transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              <Link 
                to="/cart" 
                className="text-neutral-700 hover:text-primary-600 transition-colors px-6 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <BsCart2 className="text-xl mr-2" />
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
