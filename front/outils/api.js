import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

let token = localStorage.getItem('token');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const login = (credentials) => {
  return api.post('/login', credentials)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response;
    })
    .catch(error => {
      localStorage.removeItem('token');
      throw error;
    });
};

export const signup = (userData) => {
  return api.post('/signup', userData);
};

export const addProduct = (productData) => {
  return api.post('/produit', productData);
};

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export const getProducts = () => {
  return api.get('/produits/all')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const getProductsByCategory = (category) => {
  return api.get('/produits', { params: { categorie: category } })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const getCategories = () => {
  return api.get('/categories')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export const getUserById = (id) => {
  return api.get(`/user/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const getProduitsByUserId = (userId) => {
  return api.get(`/produits/user/${userId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};