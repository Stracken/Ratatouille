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
            console.log('Produit ajouté au panier:', cartItem);
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
                        <img src={product.images} alt={product.nom} />
                        <div className="prix">{product.prix} €</div>
                        <input
                            type="number"
                            min="1"
                            max={product.quantite}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button onClick={handleAddToCart}>Ajouter au panier</button>
                    </div>
                </div>
            </div>
            <Foot />
        </div>
 );
};

export default Produit;