import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/produits/all');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="product-grid">
      <button className="nav-btn prev" onClick={() => document.querySelector('.product-grid-inner').scrollBy({ left: -220, behavior: 'smooth' })}>‹</button>
      <div className="product-grid-inner">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.images && <img src={product.images} alt={product.nom} />}
            <h2>{product.nom}</h2>
            <Link href={`/produit/${product.id}`}><button>Voir le produit</button></Link>
          </div>
        ))}
      </div>
      <button className="nav-btn next" onClick={() => document.querySelector('.product-grid-inner').scrollBy({ left: 220, behavior: 'smooth' })}>›</button>
    </div>
  );
}