import React from 'react';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductDetails({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images} alt={product.title} />
      <p>Prix: {product.price}€</p>
      <p>Quantité disponible: {product.quantity}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Remplacez ceci par votre logique pour récupérer tous les produits
  const response = await fetch(`${API_URL}/produit`);
  const data = await response.json();
  
  const paths = data.products.map(product => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`${API_URL}/produit/${params.id}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
    revalidate: 10, // Revalidation après 10 secondes
  };
}