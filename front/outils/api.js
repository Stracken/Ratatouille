import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // L'URL de votre serveur backend
});

export const signup = (userData) => api.post('/signup', userData);
export const login = (credentials) => api.post('/login', credentials);
export const addProduct = (productData, token) => api.post('/produit', productData, {
  headers: { Authorization: `Bearer ${token}` }
});

export default api;