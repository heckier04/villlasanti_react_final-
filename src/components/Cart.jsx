import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Importa el contexto del carrito
import { useAuth } from "../hooks/UseAuth"; // Importa el hook de autenticación
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/FireBase"; // Asegúrate de tener esta importación configurada correctamente
import { Navigate } from "react-router-dom"; // Importa Navigate para redirigir

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearFromCart, totalPrice } = useCart(); // Accedemos a las funciones del carrito
  const { user } = useAuth(); // Accedemos al usuario autenticado
  const [redirectToCheckout, setRedirectToCheckout] = useState(false); // Estado para redirigir al checkout

  // Maneja la compra
  const handlePurchase = async () => {
    if (!user) {
      alert("Por favor, inicia sesión para realizar la compra.");
      return;
    }

    try {
      const order = {
        userId: user.uid, // ID del usuario autenticado
        items: cart, // Productos en el carrito
        totalPrice: totalPrice(), // Total de la compra
        date: new Date(), // Fecha de la compra
      };

      // Guardar el pedido en Firebase Firestore
      const ordersRef = collection(db, "pedidos"); // Referencia a la colección "pedidos"
      await addDoc(ordersRef, order);

      clearFromCart(); // Limpiar el carrito después de la compra
      setRedirectToCheckout(true); // Cambiar el estado para redirigir al checkout
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Hubo un error al realizar la compra. Intenta nuevamente.");
    }
  };

  // Redirección al Checkout
  if (redirectToCheckout) {
    return <Navigate to="/checkout" />;
  }

  return (
    <div className="cart-container">
      <h1>Tu Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Precio: <span>${item.price}</span></p>
                <p>Cantidad: <span>{item.quantity}</span></p>
              </div>
              <div className="cart-item-buttons">
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <button onClick={() => clearFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${totalPrice()}</p>
            <button onClick={handlePurchase} className="purchase-button">
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
