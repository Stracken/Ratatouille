// import React from 'react';
// import Image from 'next/image';
// import { getProductById } from '@/outils/api'; 
// import Link from 'next/link';

// export async function generateMetadata({ params }) {
//   const product = await getProductById(params.id);
//   return {
//     title: product.nom,
//     description: product.description,


//   };
// }

// async function ProductDetail({ params }) {
//   const product = await getProductById(params.id);

//   if (!product) {
//     return <div>Produit non trouvé</div>;
//   }

//   return (
//     <div className="product-detail">
//       <h1>{product.nom}</h1>
//       <Image 
//         src={product.images} 

//         alt={product.nom}
//         width={400}
//         height={400}
//       />
//       <p>Prix: {product.prix}€</p>
//       <p>Quantité disponible: {product.quantite}</p>
      
//       <p>{product.description}</p>
//   <Link href="/">
//   <button>Retour a l'accueil</button>
//   </Link>
//     </div>
//   );
// }

// export default ProductDetail;

// import React from 'react';
// import Image from 'next/image';
// import { getProductsSelected } from '@/outils/api';
// import Link from 'next/link';

// export async function generateMetadata({ params }) {
//   const product = await getProductsSelected(params.id);
//   return {
//     title: product.nom,
//     description: product.description,
//   };
// }

// async function ProductDetail({ params }) {
//   const product = await getProductsSelected(params.id);

//   if (!product) {
//     return <div>Produit non trouvé</div>;
//   }

//   return (
//     <div className="container">
//       <div className="cardProductDetail">
//         <Image 
//           src={product.images} 
//           alt={product.nom}
//           width={400}
//           height={400}
//           className="image"
//         />
//         <h1 className="title">{product.nom}</h1>
//         <p className="price">Prix: {product.prix}€</p>
//         <p className="quantity">Quantité disponible: {product.quantite}</p>
//         <p className="category">Catégorie: {product.categorie}</p>
//         <p className="description">Description du produit: {product.description}</p>
        
//         <div className="producerInfo">
//           <h2 className="producerTitle">Information sur le producteur</h2>
//           {product.userProducteurId && product.userProducteurId.length > 0 && (
//             <div>
//               <p>Nom du producteur: {product.user_id[0].firstName}</p>
//               <p>Information: {product.userProducteurId[0].producerInfo}</p>
//               <p>Titre: {product.userProducteurId[0].producerTitle}</p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       <Link href="/">
//         <button className="button">Retour à l'accueil</button>
//       </Link>
//     </div>
//   );
// }

// export default ProductDetail;

import Image from 'next/image';
import Link from 'next/link';
import { getProductsSelected } from '@/outils/api';

export async function generateMetadata({ params }) {
  try {
    const product = await getProductsSelected(params.id);
    return {
      title: product.nom,
      description: product.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
      description: "Product information",
    };
  }
}

export default async function ProductDetail({ params }) {
  try {
    const product = await getProductsSelected(params.id);

    if (!product) {
      return <div>Produit non trouvé</div>;
    }

    return (
      <div className="container">
        <div className="cardProductDetail">
          <Image 
            src={product.images} 
            alt={product.nom}
            width={400}
            height={400}
            className="image"
          />
          <h1 className="title">{product.nom}</h1>
          <p className="price">Prix: {product.prix}€</p>
          <p className="quantity">Quantité disponible: {product.quantite}</p>
          <p className="category">Catégorie: {product.categorie}</p>
          <p className="description">Description du produit: {product.description}</p>
          
          <div className="producerInfo">
            <h2 className="producerTitle">Information sur le producteur</h2>
            {product.userProducteurId && product.userProducteurId.length > 0 && (
              <div>
                <p>Nom du producteur: {product.user_id[0].firstName}</p>
                <p>Information: {product.userProducteurId[0].producerInfo}</p>
                <p>Titre: {product.userProducteurId[0].producerTitle}</p>
              </div>
            )}
          </div>
        </div>
        
        <Link href="/">
          <button className="button">Retour à l'accueil</button>
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Une erreur s'est produite lors du chargement du produit</div>;
  }
}