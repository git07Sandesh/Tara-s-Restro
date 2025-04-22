import React from "react";
import { useStateContext } from "../context/StateContext.jsx";
import Navbar from "../components/Navbar.jsx";

const CartPage = () => {
  const { cartItems } = useStateContext();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(cartItems)
  return (
    <div className='min-h-screen bg-black bg-opacity-50 font-serif text-amber-100'>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">Cart</h1>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="bg-black p-4 rounded-lg shadow-md max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b border-gray-700 py-3">
              <img src={item.image} alt={item.dishName} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 px-4">
                <h2 className="text-lg font-serif font-semibold">{item.dishName}</h2>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
              <span className="text-md font-bold">Nrs: {item.price * item.quantity}</span>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="mt-4 flex justify-end gap-8 text-xl font-bold">
            <span>Total</span>
            <span className="ml-2">Nrs: {totalPrice}</span>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-center mt-4">
            <button className="bg-amber-500 text-black font-semibold p-4 rounded-lg hover:bg-amber-50">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
