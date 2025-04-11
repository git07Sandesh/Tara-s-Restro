// pages/Homepage.js
import React, { useState } from 'react';
import Footer from "../components/Footer";
import Info from '../components/Info';
import Navbar from '../components/Navbar';  // Import Navbar
import About from '../components/About';
import heroImage from "../assets/abc.jpg"
import TopMenu from '../components/TopMenu';

const Homepage = () => {
  

  return (
    <div className="max-h-screen bg-white">
      {/* Hero Section */}
      <div 
          className="h-screen bg-cover bg-center relative overflow-hidden"
          style={{ 
            backgroundImage: `url(${heroImage})`
          }}
        >
  <div className="absolute inset-0 bg-black/40 flex flex-col">
    <Navbar />
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center text-white animate-fade-in">
        <h1 className="text-amber-500 text-5xl md:text-7xl font-serif mb-6">
          Tara's Restro
        </h1>
        <p className="text-gray-200 text-xl md:text-2xl mb-8">
          Serving You with Excellence
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-amber-500 px-8 py-3 rounded-full text-lg hover:bg-gray-200 text-black transition">
            View Menu
          </button>
          <button className="bg-black px-8 py-3 rounded-full text-lg transform transition hover:scale-105
  shadow-md hover:shadow-xl hover:bg-gray-800 text-white">
            Reserve place for an Event
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Featured Menu Section */}
      <TopMenu />
      <About />

      {/* Info Section */}
      <Info />

      <Footer />
    </div>
  );
};

export default Homepage;
