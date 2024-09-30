import { useState } from 'react';
import { login } from '@/outils/api';
import { useAuth } from '@/outils/AuthContext';
import Link from 'next/link';
import { AuthProvider } from '@/outils/AuthContext';

export default function LoginForm({ Component, pageProps }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { login: authLogin } = useAuth();

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
      const { data } = await login(credentials);
      authLogin(data.token, data.role);
      alert('Connexion réussie !');
      // Réinitialiser le formulaire après une connexion réussie
      setCredentials({
        email: '',
        password: ''
      });
    } catch (error) {
      alert('Erreur de connexion : ' + error.message);
    }
  };

  return (
    <>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
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
      <Link href="/signup"><button>Creer un compte</button></Link>
    </form>
    </>
  );
}