import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, selectedQuantity: quantity }
            : item
        );
      }
      return [...currentCart, { ...product, selectedQuantity: quantity }];
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, selectedQuantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };
  const cartItemsCount = cart.length;
  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart, cartItemsCount}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);