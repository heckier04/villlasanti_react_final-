import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import productsData from "../almacen/articulo.json";

const ItemListContainer = () => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProducts = new Promise((resolve) => {
        setTimeout(() => resolve(productsData), 1000);
    });

    fetchProducts.then((data) => {
        setItems(data);
        setLoading(false);
    });
}, []);

return (
    <div>
        {loading ? <p>Cargando...</p> : <ItemList items={items} />}
    </div>
    );
};

export default ItemListContainer;
