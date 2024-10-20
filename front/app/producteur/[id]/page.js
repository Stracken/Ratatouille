"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import { getProduitsByUserId } from '@/outils/api';
import { getUserById } from '@/outils/api';
import Link from 'next/link';

export default function Producteur() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndProduits = async () => {
      try {
        const fetchedUser = await getUserById(id);
        if (fetchedUser) {
          setUser(fetchedUser);
          const fetchedProduits = await getProduitsByUserId(id);
          setProduits(fetchedProduits);
        } else {
          setError('Utilisateur non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchUserAndProduits();
  }, [id]);

  const handlePrev = () => {
    // Logique pour la navigation précédente
  };

  const handleNext = () => {
    // Logique pour la navigation suivante
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Head />
      <div className='classic'>
        <div className="card">
          <div className="baniere">
            <img src={user.photo_banniere || "/font.jpg"} alt='photo banniere' />
          </div>
          <div className="profilpic">
            <img src={user.photo_profil} alt='profil' />
          </div>
          <div className="cardcontenant">
            <div className="cardsection">
              <h1>{user.nom} {user.prenom}</h1>
              <h2>Adresse: {user.adresse}</h2>
              <h2>Ville: {user.ville}</h2>
              <h2>Code Postal: {user.code_postal}</h2>
              <h2>Téléphone: {user.telephone}</h2>
              <h2>Email: {user.email}</h2>
            </div>
            <div className="roundedgray"></div>
            <div className="cardsection">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eros est. Aliquam non dui felis. Cras ac iaculis leo. Sed vitae fermentum justo. 
              Vestibulum vel ornare libero. Morbi massa libero, dapibus aliquam justo quis, dignissim blandit velit. Sed</p>
            </div>
          </div>
        </div>
        <div className="roundedblack"></div>
        <div className="article">
          <h1>Liste des produits</h1>
          <div className="product-grid">
            <button className="nav-btn prev" onClick={handlePrev}>‹</button>
            <div className="product-grid-inner">
              {produits.map((produit) => (
                <div key={produit.id} className="product-card">
                  {produit.images && <img src={produit.images} alt={produit.nom} />}
                  <h2>{produit.nom}</h2>
                  <Link href={`/produit/${produit.id}`}><button>Voir le produit</button></Link>
                </div>
              ))}
            </div>
            <button className="nav-btn next" onClick={handleNext}>›</button>
          </div>
        </div>
        <Foot />
      </div>
      
    </>
  );
}