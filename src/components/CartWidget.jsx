import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cartQuantity } = useCart();

  return (
    <div className="cart-widget-container">
      <Link className="menu-link" to="/cart">
        <i className="fas fa-shopping-cart cart-widget-icon"></i>
        {cartQuantity > 0 && (
          <span className="cart-widget-quantity">{cartQuantity}</span>
        )}
      </Link>
    </div>
  );
};

export default CartWidget;
