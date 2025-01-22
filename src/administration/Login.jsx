import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

const Login = () => {
  const { signUp, signIn, user, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "user") return <Navigate to="/user" />;
  }

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Registrarse" : "Iniciar Sesión"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegistering ? "new-password" : "current-password"}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
      <p>
        {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)} disabled={loading}>
          {isRegistering ? "Inicia Sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
};

export default Login;
