import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import productsData from "../almacen/articulo.json";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = new Promise((resolve) => {
      setTimeout(() => resolve(productsData.find((p) => p.id === parseInt(id))), 1000);
    });

    fetchProduct.then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      {loading ? <p>Cargando...</p> : <ItemDetail item={item} />}
    </div>
  );
};

export default ItemDetailContainer;
