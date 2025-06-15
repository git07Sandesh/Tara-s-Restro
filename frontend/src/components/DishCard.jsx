import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext.jsx'
import toast from 'react-hot-toast';

const base_url = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : import.meta.env.VITE_API_URL;

const DishCard = ({ dish }) => {
  const { cartItems, setCartItems } = useStateContext();
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find(item => item._id === dish._id);
    setQty(cartItem ? cartItem.quantity : 1);
  }, [cartItems, dish._id]);

  const incQty = () => setQty(prev => prev + 1);
  const decQty = () => setQty(prev => (prev > 0 ? prev - 1 : 0));

  const addToCart = () => {
    const existingItem = cartItems.find(item => item._id === dish._id);
    
    if (qty <= 0) {
      if (existingItem) {
        const updatedCart = cartItems.filter(item => item._id !== dish._id);
        setCartItems(updatedCart);
        toast.success(`${dish.dishName} removed from cart`);
      }
      return;
    }

    if (existingItem) {
      const updatedCart = cartItems.map(item => 
        item._id === dish._id ? { ...item, quantity: qty } : item
      );
      setCartItems(updatedCart);
      toast.success(`${dish.dishName} quantity updated to ${qty}`);
    } else {
      setCartItems([...cartItems, { ...dish, quantity: qty }]);
      toast.success(`${qty} ${dish.dishName} added to cart`);
    }
  };

  return (
    <div className="bg-zinc-900 border-2 border-amber-500 text-amber-100 rounded-xl shadow-md hover:shadow-yellow-500/30 transition-all duration-300 overflow-hidden">
      <figure className="w-full h-96 overflow-hidden rounded-t-xl">
  <img
    src={`${base_url}/api/menu/${dish._id}/image`}
    alt={dish.dishName}
    className="w-full h-full object-cover object-center"
  />
</figure>


      <div className="p-4 flex flex-col gap-3 bg-white">
        <h2 className="text-2xl font-extrabold font-serif text-black">{dish.dishName}</h2>
        <p className="text-xl font-serif text-black">{dish.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">Nrs: {dish.price}</span>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full shadow-inner">
            <button
              onClick={decQty}
              className="text-xl px-2 text-red-400 hover:text-red-500 font-bold"
            >
              –
            </button>
            <span className="text-base font-bold">{qty}</span>
            <button
              onClick={incQty}
              className="text-xl px-2 text-green-400 hover:text-green-500 font-bold"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={addToCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-xl font-semibold py-2 rounded-lg transition"
        >
          {cartItems.some(item => item._id === dish._id) ? "Update Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
