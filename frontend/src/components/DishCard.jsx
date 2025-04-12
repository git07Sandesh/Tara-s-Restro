import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext.jsx'
import toast from 'react-hot-toast';



const base_url = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : import.meta.env.VITE_API_BASE_URL;


const DishCard = ({ dish }) => {
  const { cartItems, setCartItems } = useStateContext();
  const [qty, setQty] = useState(0);

  // Sync quantity with cart and handle removal
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
        // Remove item from cart
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
    <div className="card bg-black font-serif text-amber-100 w-auto shadow-sm ">
        <figure className='w-full h-4/6'>
            <img
            src={`${base_url}/api/menu/${item._id}/image`}
            alt={dish.dishName} className='size-10/12'/>
        </figure>
        <div className="card-body">
            <h2 className="card-title text-2xl font-extrabold">{dish.dishName}</h2>
            <p className='text-lg text-amber-300'>{dish.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-bold text-amber-500 bg-gray-500 px-3 py-1 rounded-md shadow-md">
                Nrs: {dish.price}
              </span>

              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                <button onClick={decQty} className="text-xl px-2 text-red-400 hover:text-red-500">
                -
                </button>
                <span className="text-lg font-bold px-3">{qty}</span>
                <button onClick={incQty} className="text-xl px-2 text-green-400 hover:text-green-500">
                +
                </button>
              </div>
            </div>
            <div className="card-actions mt-4">
          <button onClick={addToCart} className="btn bg-amber-500 text-black font-semibold w-full rounded-lg">
            {cartItems.some(item => item._id === dish._id) ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
        </div>
    </div>
  )
}

export default DishCard