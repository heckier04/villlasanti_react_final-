import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const cartQuantity = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
