import React, { useState, useEffect, useMemo } from "react";
import ItemList from "./ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/FireBase";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const { categoria } = useParams(); // Obtiene la categoría de la URL
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [titulo, setTitulo] = useState("Productos"); // Título de la página
  const [filter, setFilter] = useState(""); // Estado para el filtro de categoría
  const [categories, setCategories] = useState([]); // Estado para las categorías

  // Efecto para obtener los productos y categorías de Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productosRef = collection(db, "productos"); // Referencia a la colección de productos
        // Si hay una categoría, se filtran los productos por categoría
        const q = categoria ? query(productosRef, where("categoria", "==", categoria)) : productosRef;

        const resp = await getDocs(q); // Obtiene los documentos
        const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setProductos(productosData); // Establece los productos

        // Obtener las categorías únicas
        const categoriesFromData = [...new Set(productosData.map((item) => item.category))];
        setCategories(categoriesFromData); // Establece las categorías

        setTitulo(categoria ? `Productos en ${categoria}` : "Productos"); // Establece el título
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      }
    };

    fetchProducts(); // Llama a la función para cargar los productos
  }, [categoria]); // Dependencia: se ejecuta cada vez que cambia `categoria`

  // Filtrar productos por categoría usando useMemo
  const filteredItems = useMemo(() => {
    if (filter === "") return productos; // Si no hay filtro, devuelve todos los productos
    return productos.filter((item) => item.category === filter); // Filtra según la categoría seleccionada
  }, [filter, productos]); // Dependencias: cambia cuando `filter` o `productos` cambian

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Actualiza el filtro con el valor seleccionado
  };

  return (
    <div className="item-list-container">
      <div className="filter">
        <label className="filter-label">Filtrar por categoría:</label>
        <select className="filter-select" value={filter} onChange={handleFilterChange}>
          <option value="">Todos</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ItemList items={filteredItems} titulo={titulo} /> {/* Renderiza el componente ItemList con los productos filtrados */}
    </div>
  );
};

export default ItemListContainer;
