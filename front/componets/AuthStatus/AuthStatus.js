import React from 'react';
import { useAuth } from '@/outils/AuthContext';

export default function AuthStatus() {
  const { user, logout } = useAuth();

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