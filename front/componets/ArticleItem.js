// ArticleItem.js
import React from 'react';

const ArticleItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div style="articleContainer">
      <img src={item.images} alt={item.title} style="image" />
      <div style="articleInfo">
        <h3 style="articleName">{item.title}</h3>
        <p style="articlePrice">Prix: {parseFloat(item.price).toFixed(2)}€</p>
        <div style="quantityContainer">
          <button onClick={() => onQuantityChange(item.id, Math.max(1, item.selectedQuantity - 1))} style="articleQuantityButton">-</button>
          <span style="articleQuantity">{item.selectedQuantity}</span>
          <button onClick={() => onQuantityChange(item.id, Math.min(item.quantity, item.selectedQuantity + 1))} style="articleQuantityButton">+</button>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} style="removeButton">Supprimer</button>
    </div>
  );
};



export default ArticleItem;