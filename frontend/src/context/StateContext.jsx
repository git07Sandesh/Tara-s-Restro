import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0)
    return(
        <Context.Provider
        value={{
            showCart, cartItems, totalPrice, totalQuantities, setCartItems
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context);
