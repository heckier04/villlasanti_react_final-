// Importaciones necesarias
import React from 'react';
import { Link } from 'react-router-dom'; // Para redireccionar a la página de checkout.
import { useCart, CartContext } from '../context/CartContext'; // Hook y contexto del carrito.

const CarritoCombinado = () => {
  // Obtiene el carrito, el precio total, y funciones del contexto del carrito.
  const { carrito = [], precioTotal, vaciarCarrito } = useContext(CartContext); 
  const { removeFromCart } = useCart(); // Función para eliminar un producto del carrito.

  // Maneja la acción de vaciar el carrito.
  const handleVaciar = () => {
    vaciarCarrito(); // Llama a la función para vaciar el carrito.
  }

  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>
      
      {carrito.length === 0 ? ( // Verifica si el carrito está vacío.
        <h2>El carrito está vacío :</h2> // Muestra mensaje si no hay productos.
      ) : (
        <div>
          {/* Mapea los productos del carrito y los muestra */}
          {carrito.map((prod) => (
            <div key={prod.id} className="cart-item">
              <img src={prod.image} alt={prod.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{prod.name}</h3>
                <p>Precio unitario: ${prod.price}</p>
                <p>Precio total: ${prod.price * prod.quantity}</p>
                <p>Cant: {prod.quantity}</p>
                {/* Botón para eliminar un producto del carrito */}
                <button onClick={() => removeFromCart(prod.id)} className="remove-item-button">
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {/* Muestra el precio total de todos los productos en el carrito */}
          <h2>Precio total: ${precioTotal()}</h2>

          {/* Acciones relacionadas con el carrito */}
          <div className="cart-actions">
            <button onClick={handleVaciar} className="clear-cart-button">
              Vaciar Carrito
            </button>
            <Link to="/checkout" className="checkout-link">
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarritoCombinado;
