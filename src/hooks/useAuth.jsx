import { useState, useEffect, useContext, createContext, useCallback } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/FireBase";

// Crear el contexto para la autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    });

    return unsubscribe;
  }, []);

  const signUp = useCallback(async (email, password) => {
    setSignUpLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Error en el registro:", error.message);
    } finally {
      setSignUpLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setSignInLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Error en el inicio de sesión:", error.message);
    } finally {
      setSignInLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  }, []);

  const value = {
    user,
    error,
    signUp,
    signIn,
    logOut,
    signUpLoading,
    signInLoading,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
