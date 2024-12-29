// Importaciones necesarias
import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Para crear un enlace a la página del carrito.
import { CartContext } from '../context/CartContext'; // Accede al contexto del carrito.

const CartWidget = () => {
    // Obtiene la cantidad total de productos en el carrito desde el contexto.
    const { cartQuantity } = useContext(CartContext);

    return (
        <div className="cart-widget-container">
            {/* Enlace al carrito, cuando el usuario hace clic en el ícono del carrito */}
            <Link className="menu-link" to="/cart">
                {/* Ícono del carrito de compras */}
                <i className="fas fa-shopping-cart cart-widget-icon"></i> 
                {/* Si el carrito tiene productos, se muestra la cantidad de productos */}
                {cartQuantity > 0 && ( 
                    <span className="cart-widget-quantity">{cartQuantity}</span> // Muestra la cantidad de productos en el carrito
                )}
            </Link>
        </div>
    );
}

export default CartWidget;
