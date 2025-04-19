import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import TopMenu from '../components/TopMenu';
import { useMenuStore } from '../../store/menu';
import DishCard from '../components/DishCard';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const { fetchDishes, dishes } = useMenuStore();

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return (
    <div className="bg-black text-white flex flex-col max-h-screen">
      <Navbar />
      <TopMenu />

      <section className="py-16 px-6 text-center bg-gradient-to-b from-yellow-600 via-zinc-600 to-black text-white">
        <h2 className="text-4xl sm:text-5xl font-bold text-amber-400 mb-12 ">
          🍽️ Quick Order
        </h2>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto h-full">
          {Array.isArray(dishes) && dishes.length > 0 ? (
            dishes.map((dish) => <DishCard key={dish._id} dish={dish} />)
          ) : (
            <h3 className="col-span-full text-center text-lg text-gray-300">No Dishes currently Available</h3>
          )}
        </div>

        {dishes.length === 0 && (
          <Link to="/menu" className="inline-block mt-8 text-amber-400 underline hover:text-amber-300">
            Check our full menu
          </Link>
        )}
      </section>
    </div>
  );
};

export default OrderPage;
