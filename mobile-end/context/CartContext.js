import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      // Si le produit existe déjà dans le panier
      if (existingItem) {
        // on retourne un nouveau tableau où la quantité du produit existant est mise à jour.
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, selectedQuantity: quantity }
            : item
        );
      }
      // Si le produit n'existe pas dans le panier, on l'ajoute avec la quantité spécifiée.

      return [...currentCart, { ...product, selectedQuantity: quantity }];
    });
  };
// met à jour la quantité d'un produit dans le panier
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, selectedQuantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    // filtre le panier pour exclure le produit avec l'ID spécifié
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };
  // calcule le nombre total d'articles dans le panier
  const cartItemsCount = cart.length;
  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart, cartItemsCount}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);