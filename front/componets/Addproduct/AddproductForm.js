"use client";
import { useState, useEffect } from 'react';
import { addProduct } from '@/outils/api';

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

  useEffect(() => {
    console.log('AddProductForm useEffect');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to add product:', productData);
      await addProduct(productData);
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

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="nom">Nom du produit:</label>
      <input
        type="text"
        id="nom"
        name="nom"
        value={productData.nom}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label htmlFor="categorie">Catégorie:</label>
      <input
        type="text"
        id="categorie"
        name="categorie"
        value={productData.categorie}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label htmlFor="images">Images (URLs séparées par des virgules):</label>
      <input
        type="text"
        id="images"
        name="images"
        value={productData.images}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="prix">Prix €:</label>
      <input
        type="number"
        id="prix"
        name="prix"
        step="0.01"
        value={productData.prix}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label htmlFor="quantite">Quantité (poids):</label>
      <input
        type="number"
        id="quantite"
        name="quantite"
        step="0.001"
        value={productData.quantite}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        rows="4"
      ></textarea>
    </div>
    <button type="submit">Ajouter le produit</button>
  </form>
  );
}