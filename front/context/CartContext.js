"use client";
// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const updateCartItemQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selectedQuantity: quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, selectedQuantity: cartItem.selectedQuantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, selectedQuantity: quantity }];
      }
    });
  };
  return (
    <CartContext.Provider value={{ cart, updateCartItemQuantity, removeFromCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product, quantity) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === product.id ? { ...item, selectedQuantity: quantity } : item
//         );
//       } else {
//         return [...prevCart, { ...product, selectedQuantity: quantity }];
//       }
//     });
//   };

//   const updateCartItemQuantity = (productId, quantity) => {
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === productId ? { ...item, selectedQuantity: quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
