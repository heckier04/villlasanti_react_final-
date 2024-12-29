import React from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget"; // Asumo que CartWidget muestra el carrito de compras

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} aria-label="Ir a la página de inicio">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} aria-label="Ver todos los productos">
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} aria-label="Ver el carrito de compras">
            Carrito
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} aria-label="Acerca de nosotros">
            Acerca de
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"} aria-label="Página de contacto">
            Contacto
          </NavLink>
        </li>
        <li>
          <CartWidget /> {/* Componente del carrito de compras */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
