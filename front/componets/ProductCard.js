"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ item, handleQuantityChange, handleAddToCart, cart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0); // Initialiser à 0
  const [imageError, setImageError] = useState(false);

  // Utilisez une fonction pour initialiser selectedQuantity
  useEffect(() => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      setSelectedQuantity(cartItem.selectedQuantity);
    } 
  }, [cart, item.id]); // Dépend uniquement du panier et de l'ID de l'article

  const onQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) { // Vérifiez si la quantité est positive ou zéro
      setSelectedQuantity(newQuantity);
      handleQuantityChange(item.id, newQuantity); // Appel de la fonction passée en prop
    }
  };

  const onAddToCart = () => {
    handleAddToCart(item, selectedQuantity); // Appel de la fonction passée en prop
  };

  return (
    <div className="card">
      <Link href={`/productDetail/${item.id}`}>
        {!imageError ? (
          <Image 
            src={item.images} 
            alt={item.title}
            width={200}
            height={200}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="imagePlaceholder">Image non disponible</div>
        )}
        <h3>{item.title}</h3>
      </Link>
      <p>Prix: {item.price}€</p>
      <p>Quantité disponible: {item.quantity}</p>
      <div className="quantityContainer">
        <button onClick={() => onQuantityChange(Math.max(0, selectedQuantity - 1))}>-</button>
        <span>{selectedQuantity}</span>
        <button onClick={() => onQuantityChange(selectedQuantity + 1)}>+</button>
      </div>
      <button className="addButton" onClick={onAddToCart}>
        {selectedQuantity > 0 ? 'Mettre à jour le panier' : 'Ajouter au panier'}
      </button>
    </div>
  );
};

export default ProductCard;