// pages/Homepage.js
import React, { useState } from 'react';
import Footer from "../components/Footer";
import Info from '../components/Info';
import Navbar from '../components/Navbar';  // Import Navbar
import About from '../components/About';
import heroImage from "../assets/abc.jpg"
import TopMenu from '../components/TopMenu';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';

const Homepage = () => {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${heroImage})`
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <Navbar />
          <div className="flex-grow flex items-center justify-center h-full pt-20">
            <div className="text-center text-white animate-fade-in max-w-4xl mx-auto px-6">
              <h1 className="text-primary-400 text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
                Tara's Restro
              </h1>
              <p className="text-white/90 text-xl md:text-2xl lg:text-3xl mb-8 font-light">
                Serving You with Excellence
              </p>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Experience authentic Nepalese cuisine crafted with passion and tradition
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/menu" className="btn-primary">
                  View Menu
                </Link>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    document.getElementById('reservation').scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Menu Section */}
      <TopMenu />
      
      {/* About Section */}
      <About />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact/Reservation Form */}
      <div id="reservation">
        <ContactForm />
      </div>

      {/* Info Section */}
      <Info />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
