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

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};

export const updateQuantity = (id, quantity) => {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === id);
  if (existingProduct) {
    existingProduct.quantity = quantity; // Met à jour la quantité
    localStorage.setItem('cart', JSON.stringify(cart));
  }
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