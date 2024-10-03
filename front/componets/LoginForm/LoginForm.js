"use client";
import { useState, useEffect } from 'react';
import { login as apiLogin } from '@/outils/api';
import { useAuth } from '@/outils/AuthContext';
import Link from 'next/link';

export default function LoginForm() {
  console.log('LoginForm rendering');

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const auth = useAuth();
  console.log('Auth in LoginForm:', auth);

  useEffect(() => {
    console.log('LoginForm useEffect, auth:', auth);
  }, [auth]);

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
      if (auth && auth.login) {
        auth.login(data.token, data.role);
        alert('Connexion réussie !');
        setCredentials({
          email: '',
          password: ''
        });
      } else {
        console.error('Auth or auth.login is undefined');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion : ' + error.message);
    }
  };

  if (!auth) {
    console.log('Auth is not available in LoginForm');
    return <p>Chargement...</p>;
  }

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
      <Link href="/signup"><button type="button">Créer un compte</button></Link>
    </form>
  );
}