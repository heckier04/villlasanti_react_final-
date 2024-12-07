import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleCiudadChange = (event) => {
    setCiudad(event.target.value);
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleCodigoPostalChange = (event) => {
    setCodigoPostal(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

  // Función de validación
  const validateForm = () => {
    if (!nombre || !apellido || !email || !direccion || !ciudad || !provincia || !codigoPostal || !telefono) {
      toast.error("Por favor, complete todos los campos.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return false;
    }

    if (!/^\d+$/.test(codigoPostal)) {
      toast.error("Por favor, ingrese un código postal válido.");
      return false;
    }

    if (!/^\d+$/.test(telefono)) {
      toast.error("Por favor, ingrese un teléfono válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Aquí podrías agregar la lógica para procesar el formulario (API de pago, guardar datos, etc.)
      setTimeout(() => {
        toast.success("Pedido recibido con éxito");
        setLoading(false);
      }, 2000); // Simulando una llamada a la API
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ingrese su nombre"
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={handleApellidoChange}
            placeholder="Ingrese su apellido"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su email"
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={handleDireccionChange}
            placeholder="Ingrese su dirección"
          />
        </div>
        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            value={ciudad}
            onChange={handleCiudadChange}
            placeholder="Ingrese su ciudad"
          />
        </div>
        <div>
          <label>Provincia:</label>
          <input
            type="text"
            value={provincia}
            onChange={handleProvinciaChange}
            placeholder="Ingrese su provincia"
          />
        </div>
        <div>
          <label>Código postal:</label>
          <input
            type="text"
            value={codigoPostal}
            onChange={handleCodigoPostalChange}
            placeholder="Ingrese su código postal"
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={handleTelefonoChange}
            placeholder="Ingrese su teléfono"
          />
        </div>
        <div>
          <label>Método de pago:</label>
          <select value={metodoPago} onChange={handleMetodoPagoChange}>
            <option value="">Seleccione un método de pago</option>
            <option value="tarjeta de crédito">Tarjeta de crédito</option>
            <option value="transferencia bancaria">Transferencia bancaria</option>
            <option value="pago en efectivo">Pago en efectivo</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Enviar"}
        </button>
      </form>
      {loading && <p>Estamos procesando tu pedido...</p>}

      <ToastContainer />
    </div>
  );
};

export default Checkout;
