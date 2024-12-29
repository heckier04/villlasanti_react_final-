import { db } from "./FireBase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import productsData from "../almacen/articulo.json";

// Función para cargar datos iniciales desde JSON a Firebase
export const initializeProducts = async () => {
  try {
    await Promise.all(productsData.map(async (product) => {
      await addProduct(product);
    }));
    console.log("Todos los productos han sido añadidos");
  } catch (error) {
    console.error("Error inicializando productos: ", error);
  }
};

// Función para agregar un producto a Firebase
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Producto añadido con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo producto: ", e);
  }
};

// Función para obtener productos desde Firebase
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error obteniendo productos: ", error);
    return [];
  }
};
