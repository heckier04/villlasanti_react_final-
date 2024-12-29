import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, initializeProducts } from "../services/Products";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]); // Estado para los productos destacados
  const [loading, setLoading] = useState(true); // Estado para verificar si estamos cargando productos
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromFirebase = await getProducts(); // Obtener productos de Firebase
        if (productsFromFirebase.length === 0) {
          await initializeProducts(); // Si no hay productos, inicializar algunos
        }
        const updatedProducts = await getProducts(); // Obtener productos después de la inicialización
        setFeaturedProducts(updatedProducts.slice(0, 3)); // Establecer los primeros 3 productos como destacados
      } catch (err) {
        setError("Hubo un problema al cargar los productos."); // Manejo de errores
        console.error(err);
      } finally {
        setLoading(false); // Termina la carga, incluso si hubo error
      }
    };

    loadProducts(); // Llamar a la función para cargar los productos
  }, []); // Solo ejecutar una vez al montar el componente

  if (loading) {
    return <p>Cargando productos...</p>; // Si estamos cargando, mostrar mensaje
  }

  if (error) {
    return <p>{error}</p>; // Si hubo un error, mostrar el mensaje de error
  }

  return (
    <div className="home">
      <div className="home-banner">
        <h1 className="home-banner-title">¡Bienvenido a Mi E-commerce!</h1>
        <p className="home-banner-subtitle">
          Encuentra los mejores productos a los mejores precios.
        </p>
        <Link to="/products" className="home-banner-button">
          Comprar Ahora
        </Link>
      </div>

      <div className="home-featured-products">
        <h2 className="home-featured-products-title">Productos Destacados</h2>
        <div className="home-product-list">
          {featuredProducts.map((item) => (
            <div key={item.id} className="home-product-item">
              <img
                src={item.image}
                alt={`Imagen de ${item.name}`}
                className="home-product-image"
                aria-describedby={`product-${item.id}`} // Asociación de imagen y nombre para accesibilidad
              />
              <h3 id={`product-${item.id}`} className="home-product-name">
                {item.name}
              </h3>
              <p className="home-product-price">Precio: ${item.price}</p>
              <Link to={`/item/${item.id}`} className="home-view-details">
                Ver Detalles
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
