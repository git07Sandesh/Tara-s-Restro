import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Star, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        {/* Main About Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Left - Image Carousel */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <Carousel
              showThumbs={false}
              autoPlay
              infiniteLoop
              interval={3500}
              transitionTime={800}
              showStatus={false}
              showIndicators={true}
              stopOnHover
              className="rounded-2xl overflow-hidden shadow-large"
            >
              <div>
                <img 
                  src="/Restro.jpg" 
                  alt="Restaurant Interior 1"
                  className="rounded-2xl h-96 object-cover"
                />
              </div>
              <div>
                <img 
                  src="/Restro1.jpg" 
                  alt="Restaurant Interior 2"
                  className="rounded-2xl h-96 object-cover"
                />
              </div>
              <div>
                <img 
                  src="/Restro2.jpg" 
                  alt="Restaurant Interior 3"
                  className="rounded-2xl h-96 object-cover"
                />
              </div>
            </Carousel>
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 lg:pl-10 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-neutral-800 mb-6">
              Our Story
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg mb-8">
              At <span className="text-primary-600 font-semibold">Tara's Restro</span>, 
              we believe great dining is more than just a meal—it's a cherished memory.
              Our passion for fresh flavors and culinary creativity brings family, friends, and foodies together.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-neutral-800 mb-6">Why Dine With Us?</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-2xl mr-3">🌿</span>
                <span className="text-neutral-700 text-lg">Locally sourced ingredients</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-2xl mr-3">👨‍🍳</span>
                <span className="text-neutral-700 text-lg">Expert chefs & handcrafted recipes</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-2xl mr-3">✨</span>
                <span className="text-neutral-700 text-lg">Warm, welcoming atmosphere</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-2xl mr-3">🎉</span>
                <span className="text-neutral-700 text-lg">Perfect for celebrations</span>
              </div>
            </div>

            <Link to="/order" className="btn-primary inline-block">
              Order Now
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Users className="text-primary-500 w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-neutral-800 mb-2">5000+</h4>
            <p className="text-neutral-600 font-medium">Happy Customers</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Star className="text-primary-500 w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-neutral-800 mb-2">4.9</h4>
            <p className="text-neutral-600 font-medium">Average Rating</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Award className="text-primary-500 w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-neutral-800 mb-2">15+</h4>
            <p className="text-neutral-600 font-medium">Awards Won</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <Clock className="text-primary-500 w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-neutral-800 mb-2">10+</h4>
            <p className="text-neutral-600 font-medium">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;