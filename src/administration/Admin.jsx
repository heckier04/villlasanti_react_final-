import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth"; // Hook para manejar autenticación
import { getProducts, addProduct, initializeProducts } from "../services/Products";
import { uploadImage } from "../services/Storage";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/FireBase"; // Configuración de Firestore
import "./admin.css";

const Admin = () => {
  const { user, logOut } = useAuth();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar loaders
  const [isAdmin, setIsAdmin] = useState(null); // Rol del usuario

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
          setIsAdmin(false);
        }
      }
    };

    const fetchProducts = async () => {
      await initializeProducts();
      const productsList = await getProducts();
      setProducts(productsList);
    };

    fetchUserRole();
    fetchProducts();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isAdmin === false) {
    return <Navigate to="/home" />;
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(newProduct.image);
      await addProduct({ ...newProduct, image: imageUrl });
      const productsList = await getProducts();
      setProducts(productsList);
      setNewProduct({ name: "", price: "", image: null });
      toast.success("Producto añadido con éxito");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
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
          type="number"
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
        <button
          onClick={handleAddProduct}
          className="add-product-button"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Agregar Producto"}
        </button>
      </div>

      {/* Lista de productos */}
      <div className="product-list">
        <h3 className="list-title">Productos Existentes</h3>
        {products.length > 0 ? (
          <ul className="products">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-details">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span>{product.name}</span>
                  <span>${product.price}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-products">No hay productos disponibles.</p>
        )}
      </div>

      {/* Contenedor para notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Admin;
