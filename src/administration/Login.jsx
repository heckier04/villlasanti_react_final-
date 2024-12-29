// Importaciones necesarias
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Hook para manejar autenticación.
import { Navigate } from "react-router-dom"; // Navegación condicional.

const Login = () => {
  const { signIn, user } = useAuth(); // Función para iniciar sesión y usuario autenticado.
  const [email, setEmail] = useState(""); // Estado para el correo electrónico.
  const [password, setPassword] = useState(""); // Estado para la contraseña.
  const [error, setError] = useState(null); // Estado para manejar errores.

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario.
    try {
      await signIn(email, password); // Intentar iniciar sesión.
    } catch (err) {
      setError("Credenciales incorrectas. Intenta nuevamente."); // Manejar error de inicio de sesión.
    }
  };

  if (user) {
    // Redirige al panel de administración si el usuario está autenticado.
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>} {/* Muestra mensaje de error si existe */}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
