import React, { useEffect, useState } from 'react';
import { getProductsByCategory} from '@/outils/api'; 
import Link from 'next/link';


export default function ProduitByCat({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectedCategory = children; // Utiliser la prop comme catégorie
  
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const productsData = await getProductsByCategory(selectedCategory);
          setProducts(productsData);
          setLoading(false);
        } catch (error) {
          setError('Erreur lors de la récupération des produits');
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [selectedCategory]);
  
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;
  
    return (
        <div className="product-grid">
        <button className="nav-btn prev" onClick={() => document.querySelector('.product-grid-inner').scrollBy({ left: -220, behavior: 'smooth' })}>‹</button>
        <div className="product-grid-inner">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-card">
                {product.images && <img src={product.images} alt={product.nom} />}
                <h2>{product.nom}</h2>
                <Link href={`/produit/${product.id}`}><button>Voir le produit</button></Link>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé pour cette catégorie.</p>
          )}
        </div>
        <button className="nav-btn next" onClick={() => document.querySelector('.product-grid-inner').scrollBy({ left: 220, behavior: 'smooth' })}>›</button>
      </div>
    );
  }