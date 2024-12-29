import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/FireBase";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [item, setItem] = useState(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        const docRef = doc(db, "productos", id); // Referencia al documento en Firestore
        const docSnap = await getDoc(docRef);  // Obtener el documento

        if (docSnap.exists()) {
          setItem({ ...docSnap.data(), id: docSnap.id }); // Establece el producto si existe
        } else {
          setError("Producto no encontrado"); // Si no se encuentra el producto
        }
      } catch (err) {
        setError("Error al cargar el producto: " + err.message); // Error en la solicitud
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchProduct(); // Llama a la función para obtener el producto
  }, [id]); // Dependencia: se ejecuta cada vez que cambia el `id`

  if (loading) {
    return <p>Cargando...</p>; // Muestra el mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>{error}</p>; // Muestra el mensaje de error si ocurre algún problema
  }

  return <ItemDetail item={item} />; // Pasa el producto a `ItemDetail` si los datos están disponibles
};

export default ItemDetailContainer;
