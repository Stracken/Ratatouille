"use client"
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const HomeProducts = ({}) => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/product`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products.slice(0, 6));
    } catch (error) {
      console.error('Erreur lors de la récupération des produits récents:', error);
    }
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  const handleAddToCart = (item, selectedQuantity) => {
    if (selectedQuantity > 0) {
      addToCart(item, selectedQuantity);
    } else {
      alert("La quantité doit être supérieure à zéro pour ajouter au panier.");
    }
  };
  return ( 
    <div className="containerHomeProducts">
      <div className="productListHomeProducts">
        {products.map(item => (
          <div key={item.id} className="productWrapperHomeProducts">
            {/* <Link href={`/product/${item.id}/productDetail`}> */}
            <ProductCard 
              item={{
                id: item.id,
                title: item.nom,
                price: item.prix,
                quantity: item.quantite,
                description: item.description,
                images: item.images, 
                userId: item.user_id
              }}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
              cart={cart} 
            />
            {/* </Link> */}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProducts;