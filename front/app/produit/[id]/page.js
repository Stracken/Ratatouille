"use client"
import { useParams } from "next/navigation";
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import { getProducts, addToCart } from "@/outils/api"; // Importer les fonctions nécessaires
import { useState, useEffect } from "react";

const Produit = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getProducts();
                const foundProduct = products.find((p) => p.id === parseInt(id));
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Produit non trouvé');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setError('Erreur lors de la récupération des produits');
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const cartItem = {
                id: product.id,
                name: product.nom,
                price: product.prix,
                quantity: quantity,
                image: product.images, // Assurez-vous d'avoir une image
            };

            addToCart(cartItem); // Ajouter le produit au panier via la fonction addToCart
            setSuccessMessage('Produit ajouté au panier avec succès !'); // Mettre à jour le message de succès

            // Réinitialiser le message après 3 secondes
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!product) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Head />
            <div className="classic">
                <div className="produit">
                    <div className="description">
                        <h1>{product.nom}</h1>
                        <div className="roundedblack" />
                        <div className="block">
                            <img src={product.images} alt={product.nom} />
                            <div className="roundedv" />
                            <div className="text">
                                <h1>Description</h1>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="text">
                            <h1>Détails</h1>
                            <div className="tab">
                                <h2>Prix au kg</h2>
                                <h2>{product.prix}€</h2>
                            </div>
                            <div className="roundedgray" />
                            <div className="tab">
                                <h2>{product.categorie}</h2>
                                <h2>{product.sous_categorie}</h2>
                            </div>
                            <div className="roundedgray" />
                            <div className="tab">
                                <h2>Quantité</h2>
                                <h2>{product.quantite} kg</h2>
                            </div>
                        </div>
                        <div className="add-to-cart">
                            <input
                                type="number"
                                min="1"
                                max={product.quantite} // Limiter la quantité à la quantité disponible
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button className="button" onClick={handleAddToCart}>Ajouter au panier</button>
                            {successMessage && <div className="success-message">{successMessage}</div>} {/* Afficher le message de succès */}
                        </div>
                    </div>
                </div>
                <div className="article">
                    <div className="prop">
                        <h1>Similaire</h1>
                    </div>
                </div>
            </div>
            <Foot />
        </div>
    );
};

export default Produit;