import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

// Crear el contexto para el carrito
const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};

// Proveedor del contexto
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart || []; // Recuperar el carrito del localStorage o iniciar vacío
  });

  // Función para agregar un artículo al carrito
  const addToCart = useCallback((item, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  }, []);

  // Función para eliminar un artículo del carrito
  const removeFromCart = useCallback((itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== itemId);
      }
    });
  }, []);

  // Función para vaciar el carrito
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calcular la cantidad total de productos en el carrito
  const cartQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Calcular el total del carrito
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Proveer el contexto con los valores
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export { CartContext };
