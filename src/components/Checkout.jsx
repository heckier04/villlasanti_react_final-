// Importaciones necesarias
import React, { useContext, useState } from 'react'; 
import { CartContext } from '../context/CartContext'; // Contexto del carrito para acceder a los productos y el total
import { useForm } from 'react-hook-form'; // Para gestionar el formulario y las validaciones
import { collection, addDoc } from 'firebase/firestore'; // Métodos de Firestore para agregar documentos
import { db } from '../services/FireBase';  // Conexión a la base de datos de Firestore
import { ToastContainer, toast } from 'react-toastify'; // Para mostrar notificaciones

const Checkout = () => {
  const [pedidoId, setPedidoId] = useState(""); // Estado para almacenar el ID del pedido
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext); // Acceso al carrito y funciones relacionadas
  const { register, handleSubmit, formState: { errors } } = useForm(); // Manejo del formulario con validaciones

  // Función para procesar la compra
  const comprar = (data) => {
    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
      toast.error("Tu carrito está vacío. Agrega productos para continuar."); // Muestra un error si el carrito está vacío
      return;
    }

    // Estructura del pedido a enviar a Firestore
    const pedido = {
      cliente: data, // Datos del cliente (nombre, email, teléfono)
      productos: carrito, // Lista de productos en el carrito
      total: precioTotal() // Total de la compra
    };

    // Referencia a la colección 'pedidos' en Firestore
    const pedidosRef = collection(db, "pedidos");

    // Añadir el pedido a Firestore
    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setPedidoId(doc.id); // Setea el ID del pedido
        vaciarCarrito(); // Vaciar el carrito después de realizar la compra
        toast.success("Pedido realizado con éxito."); // Notificación de éxito
      })
      .catch((error) => {
        console.error("Error al crear el pedido: ", error);
        toast.error("Hubo un problema al procesar tu compra."); // Notificación de error
      });
  };

  // Si ya se ha creado un pedido, mostrar el número de pedido
  if (pedidoId) {
    return (
      <div className="checkout-container">
        <h1 className="checkout-title">Muchas gracias por tu compra</h1>
        <p>Tu número de pedido es: {pedidoId}</p> {/* Muestra el ID del pedido */}
        <ToastContainer />
      </div>
    );
  }

  // Formulario de checkout
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Finalizar compra</h1>
      {carrito.length === 0 && <p>No tienes productos en tu carrito.</p>} {/* Mensaje si el carrito está vacío */}
      <form className="checkout-form" onSubmit={handleSubmit(comprar)}>
        {/* Campos del formulario */}
        <input 
          type="text" 
          placeholder="Ingresá tu nombre" 
          className="checkout-input"
          {...register("nombre", { required: "El nombre es obligatorio" })} 
        />
        {errors.nombre && <span className="checkout-error">{errors.nombre.message}</span>} {/* Error si no se ingresa nombre */}

        <input 
          type="email" 
          placeholder="Ingresá tu e-mail" 
          className="checkout-input"
          {...register("email", { required: "El email es obligatorio" })} 
        />
        {errors.email && <span className="checkout-error">{errors.email.message}</span>} {/* Error si no se ingresa email */}

        <input 
          type="phone" 
          placeholder="Ingresá tu teléfono" 
          className="checkout-input"
          {...register("telefono", { required: "El teléfono es obligatorio" })} 
        />
        {errors.telefono && <span className="checkout-error">{errors.telefono.message}</span>} {/* Error si no se ingresa teléfono */}

        {/* Botón de submit */}
        <button className="checkout-button" type="submit">Comprar</button>
      </form>

      <ToastContainer /> {/* Contenedor de las notificaciones */}
    </div>
  );
};

export default Checkout;
