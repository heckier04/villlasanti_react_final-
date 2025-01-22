import React, { useEffect, useState } from "react";
import { db } from "../services/FireBase"; // Importa la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import Item from "./Item"; // Asegúrate de tener este componente

const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {items.length === 0 ? (
        <p className="loading-message">Cargando productos...</p> // Muestra un mensaje mientras se cargan los productos
      ) : (
        // Renderiza un componente Item para cada producto
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            author={item.author}
            category={item.category}
          />
        ))
      )}
    </div>
  );
};

export default ItemList;
