import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // Muestra un componente de "Cargando..." mientras se verifica la autenticación
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Verifica si el rol del usuario coincide con el requerido
  if (requiredRole && user.role !== requiredRole) {
    // Si el usuario no tiene el rol requerido, lo redirige al home
    return <Navigate to="/home" />;
  }

  // Si está autenticado y tiene el rol adecuado, renderiza el contenido
  return children;
};

export default PrivateRoute;
