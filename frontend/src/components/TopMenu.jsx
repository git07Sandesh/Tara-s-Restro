import React, { useEffect, useState } from 'react';
import { useMenuStore } from '../../store/menu';


const base_url = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : import.meta.env.VITE_API_BASE_URL;


const TopMenu = () => {
  const fetchFeatured = useMenuStore((state) => state.fetchFeatured);
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const getFeatured = async () => {
      const featured = await fetchFeatured();
      setFeaturedItems(featured);
    };

    getFeatured();
  }, []);

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-100">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-serif text-center mb-12 text-amber-600 underline underline-offset-4 decoration-amber-400">
          🌟 Featured Menu
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 relative group"
              >
                <div className="relative overflow-hidden rounded-t-xl h-48">
                  <img
                      src={`${base_url}/api/menu/${item._id}/image`}
                      alt={item.dishName}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.dishName}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-amber-600">Nrs: {item.price}</span>
                    <button className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500 text-lg">No featured dishes yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopMenu;
