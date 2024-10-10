// "use client"
// import React from 'react'
// import Head from "@/componets/Head/head";
// import Foot from "@/componets/Footer/foot";
// import Image from 'next/image';
// import Mod from '@/componets/Mod/Mod';
// import Buy from '@/componets/Buy/Buy';

// export default function panier() {
//     return (
//     <>
//         <Head/>
//         <div style='remplissage'>
//             <div style='panier'>
//             <h1>Votre panier</h1>
//                 <div style='achat'>
//                     <div style="description">
//                         <h1>DETAILS</h1>
//                         <div style='produit_panier'>
//                             <Image src="/boeuf.jpg" alt="Home Image" width={200}  height={45} />
//                             <div style='wham'>
//                                 <div style='d'>
//                                     <h2>Cote de porc</h2>
//                                     <Mod/>
//                                     <h2>60€</h2>
//                                 </div>
//                                 <div style='delete'>
//                                 <Image src="/delete.png" alt="Home Image" width={35}  height={45} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div style="roundedgray"></div>
//                         <div style='produit_panier'>
//                             <Image src="/boeuf.jpg" alt="Home Image" width={200}  height={45} />
//                             <div style='wham'>
//                                 <div style='d'>
//                                     <h2>Cote de porc</h2>
//                                     <Mod/>
//                                     <h2>60€</h2>
//                                 </div>
//                                 <div style='delete'>
//                                 <Image src="/delete.png" alt="Home Image" width={35}  height={45} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div style="roundedgray"></div>
//                         <div style='produit_panier'>
//                             <Image src="/boeuf.jpg" alt="Home Image" width={200}  height={45} />
//                             <div style='wham'>
//                                 <div style='d'>
//                                     <h2>Cote de porc</h2>
//                                     <Mod/>
//                                     <h2>60€</h2>
//                                 </div>
//                                 <div style='delete'>
//                                 <Image src="/delete.png" alt="Home Image" width={35}  height={45} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div style='details'>
//                         <div style='text'>
//                             <h1>Adresse</h1>
//                             <p>Lorem ipsum</p>
//                             <h1>Numéro de téléphone</h1>
//                             <p>00 00 00 00 00</p>
//                         </div>
//                         <Buy/>
//                     </div>
//                 </div>
//             </div>
//             <Foot/>
//         </div>
//     </>
//     )
// }
"use client"
import ArticleItem from "@/componets/ArticleItem";
import { useCart } from "@/context/CartContext";


// panier.js
const BuyPage = () => {
    const cartContext = useCart(); 
    

    // Vérification si cartContext est défini
    if (!cartContext) {
      return <p>Chargement...</p>; // Ou un autre message d'erreur
    }
  
    const { cart, updateCartItemQuantity, removeFromCart } = cartContext;
  
    const totalPrice = cart.reduce((total, item) => total + item.price * item.selectedQuantity, 0).toFixed(2);

  return (
    <div style="buyPagecontainer">
      <h1 style="buyPagetitle">Page de Paiement</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <ArticleItem 
              key={item.id} 
              item={item} 
              onQuantityChange={updateCartItemQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <div>
            <h2 style="buyPageTotalPrice">Prix Total: {totalPrice}€</h2>
            <button style="buyPagePayButton">Payer Maintenant</button>
          </div>
        </>
      ) : (
        <p style="buyPageNoFood">Votre panier est vide</p>
      )}
    </div>
  );
};


    


export default BuyPage;