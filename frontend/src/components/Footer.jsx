import React from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-serif mb-6 md:mb-0">Tara's Restro</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition"><BsInstagram size={24} /></a>
              <a href="https://www.facebook.com/profile.php?id=100021514861046" className="hover:text-gray-300 transition"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-gray-300 transition"><BsTwitter size={24} /></a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Tara's Restro. All rights reserved.
          </div>
        </div>
      </footer>

  );
};

export default Footer;