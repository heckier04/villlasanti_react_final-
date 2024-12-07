import React from "react";
import { useCart } from "../context/CartContext";

const CartWidget = () => {
  const { cartQuantity } = useCart();

  return (
    <div className="cart-widget">
      <i className="fas fa-shopping-cart cart-icon"></i>
      <span className="cart-quantity">{cartQuantity}</span>
    </div>
  );
};

export default CartWidget;
