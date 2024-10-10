//outils/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const signup = (userData) => api.post('/signup', userData);
export const login = (credentials) => api.post('/login', credentials);
export const addProduct = (productData, token) => api.post('/product', productData, {
  headers: { Authorization: `Bearer ${token}` }
});
// Fonction pour obtenir des produits par catégorie
export async function getProductsByCategory (productData) {
  try {
    const response = await fetch(`http://localhost:3000/${productData}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  } catch (error) {
    console.error("Error in getProductsByCategory:", error);
    throw error;
  }
}

export async function getProductsSelected(id) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  } catch (error) {
    console.error("Error in getProductsSelected:", error);
    throw error;
  }
}
export async function getProductById(id) {
  // Ici, vous feriez normalement un appel à votre API ou base de données
  // Pour cet exemple, nous allons simuler un appel API
  const response = await fetch(`http://localhost:3000/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}
// export async function getProductsByCategory(categoryId) {
//   // Simuler un appel API
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   // Données factices
//   const fakeProducts = [
//     { id: 1, name: 'Produit 1', price: 19.99, category: categoryId },
//     { id: 2, name: 'Produit 2', price: 29.99, category: categoryId },
//     { id: 3, name: 'Produit 3', price: 39.99, category: categoryId },
// //   ];

//   return { data: fakeProducts };
// }



export default api;