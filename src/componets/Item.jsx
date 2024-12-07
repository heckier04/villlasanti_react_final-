import React from "react";
import { useCart } from "../context/CartContext";

const Item = ({ id, name, price, image }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({ id, name, price });
  };

  return (
    <div className="item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Precio: ${price}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Agregar al carrito</button>
    </div>
  );
};

export default Item;
