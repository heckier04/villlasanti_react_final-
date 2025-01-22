import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../services/FireBase";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el rol del usuario
  const getUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data().role;
      } else {
        console.warn("Documento del usuario no encontrado en Firestore.");
        return null;
      }
    } catch (err) {
      console.error("Error al obtener el rol del usuario:", err.message);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const role = await getUserRole(currentUser.uid);
        if (role) {
          setUser({ ...currentUser, role });
        } else {
          console.warn("Usuario sin rol asignado en Firestore.");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Verificar si ya hay un admin
      const adminDoc = doc(db, "users", "admin");
      const adminDocSnap = await getDoc(adminDoc);

      const role = adminDocSnap.exists() ? "user" : "admin";

      // Guardar usuario en Firestore
      await setDoc(doc(db, "users", userId), {
        email,
        role,
      });

      // Crear el documento "admin" si es admin
      if (role === "admin") {
        await setDoc(adminDoc, { email, userId });
      }

      setUser({ ...userCredential.user, role });
    } catch (err) {
      console.error("Error en el registro:", err.message);
      setError("Error en el registro. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const role = await getUserRole(userCredential.user.uid);

      if (role) {
        setUser({ ...userCredential.user, role });
      } else {
        throw new Error("El usuario no tiene rol asignado en Firestore.");
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err.message);
      setError("Hubo un error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    logOut,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
