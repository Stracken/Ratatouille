"use client"
import React, { useState, useEffect } from 'react';
import LoginForm from '@/componets/LoginForm/LoginForm';
import AddProductForm from '@/componets/Addproduct/AddproductForm';
import Link from 'next/link'
import Head from '@/componets/Head/head';
import Foot from '@/componets/Footer/foot';
import { logout } from '@/outils/api';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si un utilisateur est connecté
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Assurez-vous de supprimer le token
  };

  return (
    <>
      <Head />
      <div className="classic">
        <div className='formulaire'>
          {!isLoggedIn ? (
            <>
              <h2>Connexion</h2>
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
              <button type="button" className='button'> 
                <Link href="/signup">Créer un compte</Link>
              </button>
            </>
          ) : (
            <>
              <h2>Ajouter un produit</h2>
              <AddProductForm />
              <button onClick={handleLogout} className='button-warning'>Se déconnecter</button>
            </>
          )}
        </div>
        <Foot />
      </div>
      
    </>
  );
}