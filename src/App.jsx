import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";

import Contact from "./components/Contact";
import Admin from "./administration/Admin";
import Login from "./administration/Login";
import { AuthProvider } from "./hooks/useAuth";
import CartProvider from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const NotFound = () => <h2>Page Not Found</h2>;

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
