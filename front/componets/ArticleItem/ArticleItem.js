"use client"
import { useCart } from '@/context/CartContext';
import React from 'react';
import {cart} from '@/context/CartContext'


// ArticleItem.js



const ArticleItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div style="articleContainer">
      <img src={item.images} alt={item.title} style="image"/>
      <div style="articleInfo">
        <p style="articleName">{item.title}</p>
        <p style="price">Prix: {parseFloat(item.price).toFixed(2)}€</p>
        <div style="quantityContainer">
          <button 
            onClick={() => onQuantityChange(item.id, Math.max(1, item.selectedQuantity - 1))} 
            style="quantityButton"
          >
            -
          </button>
          <span style="quantity">{item.selectedQuantity}</span>
          <button 
            onClick={() => onQuantityChange(item.id, Math.min(item.quantity, item.selectedQuantity + 1))} 
            style="quantityButton">
            +
          </button>
        </div>
      </div>
      <button 
        onClick={() => onRemove(item.id)} 
        style="removeButton"
      >
        Supprimer
      </button>
    </div>
  );
};