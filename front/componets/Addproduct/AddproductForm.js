"use client";
import { useState, useEffect } from 'react';
import { addProduct } from '@/outils/api';
import { useAuth } from '@/outils/AuthContext';

export default function AddProductForm() {
  console.log('AddProductForm rendering');

  const [productData, setProductData] = useState({
    nom: '',
    categorie: '',
    images: '',
    prix: '',
    quantite: '',
    description: ''
  });

  const auth = useAuth();
  console.log('Auth in AddProductForm:', auth);

  useEffect(() => {
    console.log('AddProductForm useEffect, auth:', auth);
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth || !auth.user) {
      console.log('User not authenticated');
      alert('Vous devez être connecté pour ajouter un produit');
      return;
    }
    try {
      console.log('Attempting to add product:', productData);
      await addProduct(productData, auth.user.token);
      console.log('Product added successfully');
      alert('Produit ajouté avec succès !');
      setProductData({
        nom: '',
        categorie: '',
        images: '',
        prix: '',
        quantite: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Erreur lors de l\'ajout du produit : ' + error.message);
    }
  };

  if (!auth) {
    console.log('Auth is not available in AddProductForm');
    return <p>Chargement...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (le reste du formulaire reste inchangé) ... */}
    </form>
  );
}