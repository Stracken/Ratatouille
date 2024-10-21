"use client"
import React, { useState, useEffect } from 'react';
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import { getCart, removeFromCart, clearCart, updateQuantity } from "@/outils/api"; // Importer les fonctions nécessaires
import Image from 'next/image';

const Panier = () => {
    const [cart, setCart] = useState(getCart());
    const [total, setTotal] = useState(0);
    const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès

    useEffect(() => {
        const calculateTotal = () => {
            let total = 0;
            cart.forEach((item) => {
                total += item.price * item.quantity;
            });
            setTotal(total);
        };
        calculateTotal();
    }, [cart]);

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    const handleClearCart = () => {
        clearCart();
        setCart(getCart());
        setSuccessMessage('Votre panier a été vidé avec succès !'); // Mettre à jour le message de succès
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return; // Ne pas permettre des quantités inférieures à 1
        updateQuantity(id, quantity);
        setCart(getCart());
    };

    return (
        <>
            <Head />
            <div className="classic">
            <div className='cart-container'>
                <h1 className='cart-title'>Votre panier</h1>
                <div className='cart-content'>
                    <div className='cart-items'>
                        {cart.length === 0 ? (
                            <p>Votre panier est vide.</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className='cart-item'>
                                    <img src={item.image} alt={item.name} />
                                    <div className='item-details'>
                                        <h2 className='item-name'>{item.name}</h2>
                                        <h2 className='item-price'>{item.price}€</h2>
                                        <h2 className='item-quantity'>
                                            Quantité: 
                                            <input 
                                                type="number" 
                                                value={item.quantity} 
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                style={{ width: '50px', marginLeft: '10px' }}
                                            />
                                        </h2>
                                    </div>
                                    <div className='clear-cart-button' onClick={() => handleRemoveFromCart(item.id)}>
                                        Supprimer
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='cart-summary'>
                        <h1 className='summary-title'>Récapitulatif</h1>
                        <p className='total-amount'>{total} €</p>
                        {successMessage && <div className="success-message">{successMessage}</div>} {/* Afficher le message de succès */}
                        <button onClick={handleClearCart} className='clear-cart-button'>Vider le panier</button>
                    </div>
                </div>
            </div>
            <Foot /></div>
        </>
    );
};

export default Panier;