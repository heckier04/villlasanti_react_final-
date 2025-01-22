import React from "react";
import { useAuth } from "../hooks/UseAuth"; // Hook para manejar autenticación.
import { Navigate } from "react-router-dom"; // Navegación condicional.

const User = () => {
  const { user, logOut } = useAuth(); // Datos del usuario autenticado y función para cerrar sesión.

  if (!user) {
    // Redirige al login si el usuario no está autenticado.
    return <Navigate to="/login" />;
  }

  return (
    <div className="user-container">
      <h2 className="user-title">Bienvenido, {user.email}</h2>
      <p>Esta es tu página de usuario. Aquí puedes ver información personalizada y gestionar tu cuenta.</p>

      {/* Botón para cerrar sesión */}
      <button onClick={logOut} className="logout-button">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default User;