import React from "react";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><a href="/" className="navbar-link">Inicio</a></li>
        <li><a href="/products" className="navbar-link">Productos</a></li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  );
};

export default NavBar;
