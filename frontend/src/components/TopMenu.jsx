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
      }, 3000);
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
    <section id="menu" className="py-20 bg-amber-500 text-white">
      <div className="container mx-auto px-6">
        {/* Slideshow */}
        <h2 className="text-5xl font-serif text-center mb-12 text-amber-100 font-bold">
          Featured Dishes
        </h2>

        <div className="relative w-full flex justify-center items-center h-80 mb-16">
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {featuredItems.map((item, index) => (
              <div
                key={item._id}
                className={`absolute w-72 transition-all duration-700 ease-in-out ${getCarouselStyle(index)}`}
              >
                <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-amber-300 group">
                  <img
                    src={`${base_url}/api/menu/${item._id}/image`}
                    alt={item.dishName}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openModal(item)}
                      className="bg-white text-amber-600 font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-amber-100 transition"
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
        <h3 className="text-4xl font-serif text-center mb-10 text-white font-semibold">
          Quick Order
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredItems.map((dish) => (
            <div key={dish._id}>
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-10">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              <X />
            </button>
            {selectedItem && (
              <>
                <img
                  src={`${base_url}/api/menu/${selectedItem._id}/image`}
                  alt={selectedItem.dishName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.dishName}</h3>
                <p className="text-gray-600 mb-4 italic">{selectedItem.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-amber-600">
                    Nrs: {selectedItem.price}
                  </span>
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition">
                    Order Now
                  </button>
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
