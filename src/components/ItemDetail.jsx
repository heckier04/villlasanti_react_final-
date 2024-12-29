import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";
import { db } from "../services/FireBase"; 
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  // Funciones para controlar la cantidad
  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const handleSumar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    addToCart(item, cantidad);
  };

  // Cargar las reseñas desde Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const docRef = doc(db, "products", item.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReviews(docSnap.data().reviews || []);
        }
      } catch (err) {
        console.error("Error al cargar las reseñas", err);
      }
    };
    fetchReviews();
  }, [item.id]);

  // Función para agregar reseñas
  const handleAddReview = async () => {
    if (review) {
      const updatedReviews = [...reviews, { user: "Anónimo", comment: review }];
      setReviews(updatedReviews);

      // Agregar la reseña a Firebase
      const docRef = doc(db, "products", item.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({ user: "Anónimo", comment: review }),
      });

      setReview(""); // Limpiar el campo después de agregar
    }
  };

  // Asegúrate de que category no sea undefined antes de capitalizar
  const capitalizeCategory = (category) => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  };

  return (
    <div className="item-detail">
      <h2 className="item-name">{item.name}</h2>
      <p className="item-author">Autor: {item.author}</p>
      <p className="item-category">
        Categoría: {capitalizeCategory(item.category)}
      </p>
      <p className="item-description">{item.description}</p>
      <p className="item-price">Precio: ${item.price}</p>
      <img src={item.image} alt={item.name} className="item-image" />

      <ItemCount
        cantidad={cantidad}
        handleSumar={handleSumar}
        handleRestar={handleRestar}
        handleAgregar={handleAddToCart}
      />

      <button onClick={handleAddToCart} className="item-add-to-cart-btn">
        Agregar al carrito
      </button>

      <div className="reviews-section">
        <h3 className="reviews-title">Reseñas</h3>
        {reviews.length === 0 ? (
          <p className="no-reviews">Sea el primero en dejar una reseña.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-user"><strong>{review.user}</strong></p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
        <form onSubmit={(e) => e.preventDefault()} className="add-review-form">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Deja una reseña"
            className="review-textarea"
          ></textarea>
          <button type="button" onClick={handleAddReview} className="submit-review-btn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemDetail;
