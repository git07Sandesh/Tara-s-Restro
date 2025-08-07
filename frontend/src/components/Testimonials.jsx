import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Food Blogger",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Absolutely amazing experience! The authentic Nepalese flavors at Tara's Restro are unmatched. Every dish tells a story of tradition and passion.",
  },
  {
    id: 2,
    name: "Raj Kumar",
    role: "Local Resident",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Been coming here for years with my family. The consistency in quality and taste is remarkable. Tara's Restro feels like a home away from home.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Tourist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Discovered this gem during my visit to Kathmandu. The staff is incredibly welcoming and the food is exceptional. Highly recommend the traditional thali!",
  },
  {
    id: 4,
    name: "Amit Thapa",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Perfect place for business dinners. The ambiance is professional yet cozy, and the service is impeccable. Our clients are always impressed.",
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-neutral-800 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-neutral-600 text-xl max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-neutral-50 rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <Quote className="text-primary-500 w-8 h-8 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-neutral-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-neutral-800">{testimonial.name}</h4>
                  <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="bg-neutral-50 rounded-2xl p-8 shadow-medium">
              <div className="flex items-center mb-6">
                <Quote className="text-primary-500 w-8 h-8 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-neutral-700 text-lg leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-neutral-800">{testimonials[currentIndex].name}</h4>
                  <p className="text-neutral-600 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-medium hover:shadow-large transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-medium hover:shadow-large transition-all"
            >
              <ChevronRight className="w-6 h-6 text-neutral-600" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;