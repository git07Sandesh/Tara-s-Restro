import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/menu";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import DishCard from "./DishCard";

const base_url =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;

const TopMenu = () => {
  const fetchFeatured = useMenuStore((state) => state.fetchFeatured);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getFeatured = async () => {
      const featured = await fetchFeatured();
      setFeaturedItems(featured);
    };
    getFeatured();
  }, []);

  useEffect(() => {
    if (featuredItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featuredItems]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  const getCarouselStyle = (index) => {
    const total = featuredItems.length;
    const distance = (index - currentIndex + total) % total;
    const wrappedDistance = distance > total / 2 ? distance - total : distance;

    if (wrappedDistance === 0) {
      return "z-30 scale-110 brightness-100 opacity-100 left-1/2 transform -translate-x-1/2";
    } else if (Math.abs(wrappedDistance) === 1) {
      return "z-20 scale-100 brightness-90 opacity-100 left-[30%] transform -translate-x-1/2";
    } else if (Math.abs(wrappedDistance) === 2) {
      return "z-10 scale-95 brightness-75 opacity-75 left-[70%] transform -translate-x-1/2";
    } else {
      return "opacity-0 scale-90 pointer-events-none absolute";
    }
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
      <div className="container mx-auto px-6">
        {/* Slideshow */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-4 animate-slide-up">
            Featured Dishes
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Discover our chef's special creations, crafted with the finest ingredients
          </p>
        </div>

        <div className="relative w-full flex justify-center items-center h-80 mb-20">
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {featuredItems.map((item, index) => (
              <div
                key={item._id}
                className={`absolute w-72 transition-all duration-700 ease-in-out ${getCarouselStyle(index)}`}
              >
                <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-large border-4 border-white/20 group backdrop-blur-sm">
                  <img
                    src={`${base_url}/api/menu/${item._id}/image`}
                    alt={item.dishName}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => openModal(item)}
                      className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-full shadow-large hover:bg-primary-50 transition-all transform hover:scale-105"
                    >
                      👀 Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Order Grid */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Quick Order
          </h3>
          <p className="text-white/80 text-lg">
            Order your favorites with just a few clicks
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((dish) => (
            <div key={dish._id} className="animate-scale-in">
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-0 z-10 overflow-hidden animate-scale-in">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 text-neutral-600 hover:text-neutral-800 hover:bg-white transition-all"
            >
              <X size={20} />
            </button>
            {selectedItem && (
              <>
                <div className="relative">
                  <img
                    src={`${base_url}/api/menu/${selectedItem._id}/image`}
                    alt={selectedItem.dishName}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-neutral-800 mb-2">
                    {selectedItem.dishName}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      NPR {selectedItem.price}
                    </span>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-medium">
                      Order Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default TopMenu;
