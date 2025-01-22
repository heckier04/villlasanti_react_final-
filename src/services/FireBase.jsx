import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Verificación de la carga de las variables de entorno
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Configuración de Firebase desde las variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
