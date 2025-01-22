import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart(); // Agrega clearCart para vaciar el carrito después de la compra
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Para mostrar mensaje de confirmación

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí guardarías los datos en Firebase o procesarías el pedido
    console.log("Datos del cliente:", formData);
    console.log("Productos del carrito:", cart);
    setIsSubmitted(true);
    clearCart(); // Vacía el carrito tras finalizar la compra
  };

  if (isSubmitted) {
    return <h2>¡Gracias por tu compra! Pronto recibirás tu pedido.</h2>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <h2>Resumen de tu pedido</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice()}</p>

          <h3>Detalles del cliente</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button">
              Confirmar Compra
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
