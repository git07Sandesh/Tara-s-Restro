import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-20 mb-10 flex flex-col items-center md:items-start md:flex-row md:justify-between">
  {/* Left Section - Logo & Social Icons */}
  <div className="flex flex-col items-center md:items-start">
    <div className="max-w-[110px]">
      <img src={Logo} alt="Logo" />
    </div>
    <div className="mt-6 flex space-x-5 text-gray-600">
      <BsTwitter className="text-2xl" />
      <SiLinkedin className="text-2xl" />
      <BsYoutube className="text-2xl" />
      <FaFacebookF className="text-2xl" />
    </div>
  </div>

  {/* Right Section - Footer Links */}
  <div className="mt-10 md:mt-0 flex flex-col md:flex-row gap-8 md:justify-end md:space-x-10 text-center md:text-left">
    <div className="hidden min-w-[190px] space-y-1 font-semibold text-gray-700 cursor-pointer md:flex md:flex-col">
      <span>Quality</span>
      <span>Help</span>
      <span>Share</span>
      <span>Careers</span>
      <span>Testimonials</span>
      <span>Work</span>
    </div>
    <div className="flex flex-col min-w-[190px] space-y-1 font-semibold text-gray-700">
      <span>244-5333-7783</span>
      <span>hello@food.com</span>
      <span>press@food.com</span>
      <span>contact@food.com</span>
    </div>
    <div className="flex flex-col min-w-[190px] space-y-1 font-semibold text-gray-700">
      <span>Terms & Conditions</span>
      <span>Privacy Policy</span>
    </div>
  </div>
</div>

  );
};

export default Footer;