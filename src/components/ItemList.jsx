import React, { useEffect, useState } from "react";
import { db } from "../services/FireBase"; // Importa la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([]); // Estado para almacenar los productos

  // Efecto para obtener los productos de Firebase al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtiene todos los documentos de la colección "products"
        const querySnapshot = await getDocs(collection(db, "products"));
        
        // Mapea los documentos y extrae los datos
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Desestructura los datos del documento
        }));
        
        // Actualiza el estado con los productos obtenidos
        setItems(productsData);
      } catch (error) {
        // Si ocurre un error, lo muestra en la consola
        console.error("Error al obtener los productos: ", error);
      }
    };

    fetchProducts(); // Llama a la función para obtener los productos
  }, []); // Solo se ejecuta una vez cuando el componente se monta

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
