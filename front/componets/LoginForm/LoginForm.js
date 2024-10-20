"use client";
import { useState, useEffect } from 'react';
import { login as apiLogin } from '@/outils/api';

export default function LoginForm() {
  console.log('LoginForm rendering');

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log('LoginForm useEffect');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with credentials:', credentials);
      const { data } = await apiLogin(credentials);
      console.log('Login response:', data);
      alert('Connexion réussie !');
      setCredentials({
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion : ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="login-password">Mot de passe:</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}