// Importaciones necesarias
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Hook para manejar autenticación.
import { getProducts, addProduct, initializeProducts } from "../services/Products"; // Servicios relacionados con productos.
import { uploadImage } from "../services/Storage"; // Servicio para subir imágenes.
import { Navigate } from "react-router-dom"; // Navegación condicional.
import { toast, ToastContainer } from 'react-toastify'; // Librería para notificaciones.
import 'react-toastify/dist/ReactToastify.css'; // Estilos de notificaciones.
import './admin.css'; // Estilos específicos del componente.

const Admin = () => {
  const { user, logOut } = useAuth(); // Datos del usuario autenticado y función para cerrar sesión.
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null }); // Estado para el nuevo producto.
  const [products, setProducts] = useState([]); // Estado de la lista de productos existentes.

  useEffect(() => {
    // Función para cargar productos al inicio.
    const fetchProducts = async () => {
      await initializeProducts(); // Inicializa productos si es necesario.
      const productsList = await getProducts(); // Obtiene los productos desde el servicio.
      setProducts(productsList); // Actualiza el estado con la lista de productos.
    };

    fetchProducts(); // Ejecuta la carga inicial de productos.
  }, []); // Dependencia vacía, ejecuta solo al montar el componente.

  if (!user) {
    // Redirige al login si el usuario no está autenticado.
    return <Navigate to="/login" />;
  }

  const handleAddProduct = async () => {
    // Valida que se haya subido una imagen.
    if (newProduct.image) {
      try {
        const imageUrl = await uploadImage(newProduct.image); // Sube la imagen.
        await addProduct({ ...newProduct, image: imageUrl }); // Agrega el producto con la imagen.
        const productsList = await getProducts(); // Actualiza la lista de productos.
        setProducts(productsList);
        setNewProduct({ name: "", price: "", image: null }); // Limpia el formulario.
        toast.success("Producto añadido con éxito"); // Notificación de éxito.
      } catch (error) {
        toast.error("Hubo un error al agregar el producto."); // Notificación de error.
      }
    } else {
      toast.error("Por favor, selecciona una imagen."); // Valida que haya imagen.
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Administración de Productos</h2>
      <button onClick={logOut} className="logout-button">Cerrar Sesión</button>

      {/* Formulario para agregar nuevo producto */}
      <div className="product-form">
        <h3 className="form-title">Agregar Nuevo Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          className="input-field"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Precio"
          className="input-field"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="file"
          className="file-input"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
        <button onClick={handleAddProduct} className="add-product-button">
          Agregar Producto
        </button>
      </div>

      {/* Lista de productos */}
      <div className="product-list">
        <h3 className="list-title">Productos Existentes</h3>
        <ul className="products">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenedor para notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Admin;
