import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left - Image Carousel */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={2000}
            transitionTime={800}
          >
            {/* You can add as many slides as you want */}
            <div>
              <img 
                src="/Restro.jpg" 
                alt="Restaurant Interior 1"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img 
                src="/Restro1.jpg" 
                alt="Restaurant Interior 2"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img 
                src="/Restro2.jpg" 
                alt="Restaurant Interior 3"
                className="rounded-lg shadow-lg"
              />
            </div>
          </Carousel>
        </div>

        {/* Right - Content */}
        <div className="md:w-1/2 md:pl-10 text-center md:text-left">
          <h2 className="text-4xl font-serif mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">Tara's Restro</span>, 
            we believe great dining is more than just a meal—it’s a cherished memory.
            Our passion for fresh flavors and culinary creativity brings family, friends, and foodies together.
          </p>

          <h3 className="text-xl font-semibold mb-4">Why Dine With Us?</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>🌿 Locally sourced ingredients</li>
            <li>👨‍🍳 Expert chefs & handcrafted recipes</li>
            <li>✨ Warm, welcoming atmosphere</li>
            <li>🎉 Perfect for celebrations</li>
          </ul>

          {/* Call to Action */}
          <button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition">
            <Link to="/order">Order now </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
