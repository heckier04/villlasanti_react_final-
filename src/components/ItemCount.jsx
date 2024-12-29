import React from 'react';

const ItemCount = ({ cantidad, handleRestar, handleSumar, handleAgregar }) => {
  return (
    <div className="item-count-container">
      <div className="item-count">
        <button 
          onClick={handleRestar} 
          aria-label="Disminuir cantidad" 
          className="item-count-btn"
        >
          -
        </button>
        <p className="item-count-number">{cantidad}</p>
        <button 
          onClick={handleSumar} 
          aria-label="Incrementar cantidad" 
          className="item-count-btn"
        >
          +
        </button>
      </div>

      <button 
        className="add-to-cart-btn" 
        onClick={handleAgregar} 
        aria-label="Agregar al carrito"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
