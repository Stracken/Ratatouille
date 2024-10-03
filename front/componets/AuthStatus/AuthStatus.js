import React from 'react';
import { useAuth } from '@/outils/AuthContext';

export default function AuthStatus() {
  console.log('AuthStatus rendering');
  
  const auth = useAuth();
  console.log('AuthStatus auth:', auth);

  if (!auth) {
    return <p>Chargement...</p>;
  }

  const { user, logout } = auth;
  console.log('AuthStatus user:', user);

  if (user) {
    return (
      <div>
        <p>Connecté en tant que : {user.role}</p>
        <button onClick={logout}>Se déconnecter</button>
      </div>
    );
  }

  return <p>Non connecté</p>;
}