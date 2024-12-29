import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Item = React.memo(({ id, name, price, image, author, category = "" }) => {
  const { addToCart } = useCart(); // Accede a la función para agregar al carrito

  // Maneja la acción de agregar al carrito
  const handleAddToCart = () => {
    addToCart({ id, name, price });
  };

  // Función para capitalizar la categoría
  const capitalizeCategory = (category) => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  };

  return (
    <div className="item-container">
      <img src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h4 className="item-name">{name}</h4>
        <h4 className="item-author">{author}</h4>
        <p className="item-price">Precio: ${price}</p>
        <p className="item-category">Categoría: {capitalizeCategory(category)}</p>
        <div className="item-actions">
          <Link className="item-link" to={`/item/${id}`}>
            Ver más
          </Link>
          <button onClick={handleAddToCart} className="item-add-to-cart">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
});

export default Item;
