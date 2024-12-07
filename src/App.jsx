import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './componets/NavBar';
import ItemListContainer from "./componets/ItemListContainer";
import ItemDetailContainer from "./componets/ItemDetailContainer";
import CartProvider from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
