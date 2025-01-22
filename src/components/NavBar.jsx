import React from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget"; // Asumo que CartWidget muestra el carrito de compras
import { useAuth } from "../hooks/UseAuth"; // Hook para obtener el estado de autenticación

const NavBar = () => {
  const { user, logOut } = useAuth(); // Obtiene el estado del usuario y la función de cerrar sesión

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Acerca de
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Contacto
          </NavLink>
        </li>

        {/* Mostrar el enlace de login o logout dependiendo del estado de autenticación */}
        {!user ? (
          <li>
            <NavLink to="/login" className="navbar-link">
              Iniciar sesión
            </NavLink>
          </li>
        ) : (
          <li>
            <button onClick={logOut} className="navbar-link">
              Cerrar sesión
            </button>
          </li>
        )}

        {/* Muestra el carrito siempre */}
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
