"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/outils/api'; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const categoryId = params.categoryId;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;

      setLoading(true);
      try {
        const response = await getProductsByCategory(categoryId);
        setProducts(response.product);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <>
     
      <div>
        <h2>Produits de la catégorie {categoryId} vrai</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.nom} - {product.prix}€</li>
          ))}
        </ul>
      </div>
    </>
  );
}