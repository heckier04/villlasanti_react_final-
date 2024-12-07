import React from "react";

const ItemDetail = ({ item }) => {
  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <img src={item.image} alt={item.name} />
    </div>
  );
};

export default ItemDetail;

