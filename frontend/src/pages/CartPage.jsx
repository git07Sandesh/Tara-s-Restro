import React from "react";
import { useStateContext } from "../context/StateContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { useOrderStore } from "../../store/order.js";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";


const CartPage = () => {
  const { cartItems, setCartItems, clearCart} = useStateContext();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(cartItems)

  const {createOrder, loading, error} = useOrderStore();
  const handleCheckout = async () => {
    if(cartItems.length === 0){
      return toast.error("Cart is empty")
    }
    try {
      await createOrder(cartItems, totalPrice);
      toast.success("Order Placed Successfully")
      clearCart();

    } catch (error) {
      toast.error("Failed to place an order")
    }
  }
  const handleClearItems = (itemToRemove) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem._id !== itemToRemove._id);
    setCartItems(newCartItems);
  }
  const increaseQty = (item) => {
    console.log("clicked")
    const newCartItems = cartItems.map((cartItem) => {
      if(cartItem._id === item._id)
      {
        return {...cartItem, quantity: cartItem.quantity + 1 }
      }
      return cartItem;
    })
    setCartItems(newCartItems);
  }
  const decreaseQty = (item) => {
    const newCartItems = cartItems.map((cartItem) => {
      if(cartItem._id === item._id && cartItem.quantity > 1)
      {
        return {...cartItem, quantity: cartItem.quantity - 1}
      }
      return cartItem;
    })
    setCartItems(newCartItems)
  }
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
                
                {item.quantity < 1 ? <span className="text-sm text-gray-400">Qty: {item.quantity}</span>:
                <div className="flex gap-2 m-4">
                  <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                  
                    <button className="bg-amber-500 text-black font-semibold p-2 rounded-lg hover:bg-amber-100"
                      onClick={() => increaseQty(item)}>+ </button>
                      
                    <button className="bg-amber-500 text-black font-semibold p-2 rounded-lg hover:bg-amber-100"
                      onClick={() => decreaseQty(item)}>- </button>
                  </div>
                 }
              </div>
              <div className="flex gap-2 m-4">
                <button className="bg-amber-500 text-red-500 font-sheriff font-semibold p-2 rounded-lg hover:bg-amber-100"
                  onClick={() => handleClearItems(item)}>Delete </button>
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
            <button className="bg-amber-500 text-black font-semibold p-4 rounded-lg hover:bg-amber-50"
              onClick={handleCheckout}
              disabled={loading}>
              {loading? <div>
                <Loader className="animate-spin" />
                <span>Processing...</span>
                </div>:"Proceed to Checkout"}
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
