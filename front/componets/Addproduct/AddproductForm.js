"use client";
import { useState, useEffect } from 'react';
import { addProduct } from '@/outils/api';

export default function AddProductForm() {
  console.log('AddProductForm rendering');

  const categories = {
    "Viande": ["Bœuf", "Volaille", "Porc", "Agneau et mouton", "Cheval", "Gibier", "Charcuterie"],
    "Produits laitiers": ["Lait", "Beurre", "Yaourts", "Fromages", "Crèmes"],
    "Fruits et Légumes": ["Fruits frais", "Légumes frais", "Salades préparées", "Fruits et légumes en conserve", "Jus de fruits et de légumes", "Confitures"],
    "Produits de la Mer": ["Poissons frais", "Crustacés et mollusques", "Produits de la mer transformés"],
    "Produits Céréaliers": ["Farine", "Pain", "Pâtisseries industrielles", "Biscuits et biscottes", "Pâtes alimentaires", "Céréales pour petit-déjeuner", "Produits à base de malt et d'amidon"],
    "Boissons": ["Vins", "Bières", "Spiritueux", "Champagne et vins effervescents", "Cidre", "Boissons non alcoolisées", "Eaux minérales"]
  };

  const [productData, setProductData] = useState({
    nom: '',
    categorie: '',
    sous_categorie: '',
    images: '',
    prix: '',
    quantite: '',
    description: ''
  });

  const [sousCategories, setSousCategories] = useState([]);

  useEffect(() => {
    console.log('AddProductForm useEffect');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'categorie') {
      setSousCategories(categories[value] || []);
      setProductData(prevState => ({
        ...prevState,
        sous_categorie: ''
      }));
    }
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
        sous_categorie: '',
        images: '',
        prix: '',
        quantite: '',
        description: ''
      });
      setSousCategories([]);
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
        <select
          id="categorie"
          name="categorie"
          value={productData.categorie}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select> </div>
      <div>
        <label htmlFor="sous_categorie">Sous-catégorie:</label>
        <select
          id="sous_categorie"
          name="sous_categorie"
          value={productData.sous_categorie}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une sous-catégorie</option>
          {sousCategories.map((subCat) => (
            <option key={subCat} value={subCat}>{subCat}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="images">Images:</label>
        <input
          type="text"
          id="images"
          name="images"
          value={productData.images}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="prix">Prix:</label>
        <input
          type="number"
          id="prix"
          name="prix"
          value={productData.prix}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantite">Quantité:</label>
        <input
          type="number"
          id="quantite"
          name="quantite"
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
          required
        />
      </div>
      <button type="submit">Ajouter le produit</button>
    </form>
  );
}