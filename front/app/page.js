// "use client";
// import Map from "@/componets/Map";
// import Head from "@/componets/Head/head";
// import Foot from "@/componets/Footer/foot";
// import ProductList from "@/componets/ProduitList/ProduitList";
// import React, { useState, useEffect } from "react"
// import Image from "next/image";
// import  Link from 'next/link'
// import axios from 'axios';
// import { CartProvider } from "@/context/CartContext";


// export default function Home() {
//   var [search,  setSearch] = React.useState("");
//   var [carousel, setCarousel] = React.useState(["/south.jpg","/7.jpg","/once.jpg"]);
//   var [i, setI] = React.useState(0);
//   var [name, setName] = React.useState(carousel[i]);
//   const [products, setProducts] = useState([]);


//   useEffect(() => {
//     axios.get('/produits/all')
//       .then(response => {
//         console.log(response.data); // Vérifiez si les données sont bien récupérées
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   // const back = () => {
//   //   const newIndex = i === 0 ? carousel.length - 1 : i - 1;
//   //   setI(newIndex);
//   //   setName(carousel[newIndex]);
//   // };

//   // const next = () => {
//   //   const newIndex = i === carousel.length - 1 ? 0 : i + 1;
//   //   setI(newIndex);
//   //   setName(carousel[newIndex]);
//   // };

//   const research = () => {
//     // Utilisez l'état pour gérer la recherche
//     console.log("Recherche:", search);
//     // Ajoutez ici la logique pour traiter la recherche
//   };

//   const handleCategorySelect = (categoryId) => {
//     console.log("Catégorie sélectionnée:", categoryId.title);
//     router.push(`/product/${categoryId}`);
//   };

//   return (
//     <CartProvider>
//       <main>
//         <Head />
//         <Map/>
//         <div className="search">
//           <input
//             id="place"
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)} // Mettez à jour l'état lors de la saisie
//           />
//           <Link href="/producteur" legacyBehavior>
//             <Image
//               onClick={research}
//               src="/search.png"
//               alt="Home Image"
//               width={30}
//               height={45}
//             />
//           </Link>
//         </div>
//         <div className="sug">
//           {/* Sections répétées */}
//           {Array.from({ length: 5 }).map((_, index) => (
//             <div key={index} className="section">
//               <h1>Pièce de viande</h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//               <div className="rounded"></div>
//             </div>
//           ))}
//         </div>
//         <div className="main">
//           <Image
//             className="img"
//             src="/menu.png"
//             alt="Home Image"
//             width={50}
//             height={45}
//           />
//           <div className="roundedgray"></div>
//           <h1 className="title" style={{ fontWeight: "bold" }}>
//             Vos catégories
//           </h1>
//           <div className="container">
//             <Carousel onCategorySelect={handleCategorySelect} />
//           </div>
//           <div className="roundedgray"></div>
//           <div className="article">
//           <h1>À la une</h1>
//             <div className="prop">
//               <ProductList/>
//             </div>
//           </div>
//           <Foot/>
//         </div>
//       </main>
//     </CartProvider>
//   );
// }

"use client"
import Map from "@/componets/Map";
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import ProductList from "@/componets/ProduitList/ProduitList";
import React, { useState, useEffect } from "react"
import Image from "next/image";
import  Link from 'next/link'
import axios from 'axios';


export default function Home() {
  var [search,  setSearch] = React.useState("");
  var [carousel, setCarousel] = React.useState(["/south.jpg","/7.jpg","/once.jpg"]);
  var [i, setI] = React.useState(0);
  var [name, setName] = React.useState(carousel[i]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('/produits/all')
      .then(response => {
        console.log(response.data); // Vérifiez si les données sont bien récupérées
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const back = () => {
    if  (i === 0){
      setI(carousel.length - 1);
    } else {
      setI(i - 1);
    }
    setName(carousel[i])
  }

  const next = () => {
    if  (i === carousel.length - 1){
      setI(0);
    } else {
      setI(i + 1);
    }
    setName(carousel[i])
  }

  const research = () => {
    let s = document.getElementById("place");
    setSearch(s.value);
  }
  
  return (
    <>
      <body>
        <Head/>
        <Map/>
        <div className="search">
          <input id="place" type="text" placeholder="Search..." />
          <Link href="/producteur"><Image onClick={() => research()} src="/search.png" alt="Home Image" width={30}  height={45} /></Link>
        </div>
        <div className="sug">
          <div className="section">
            <h1>Pièce de viande</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum arcu felis, rutrum a venenatis eu, auctor at lorem.</p>
          </div>
          <div className="rounded"></div>
          <div className="section">
            <h1>Pièce de viande</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum arcu felis, rutrum a venenatis eu, auctor at lorem.</p>
          </div>
          <div className="rounded"></div>
          <div className="section">
            <h1>Pièce de viande</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum arcu felis, rutrum a venenatis eu, auctor at lorem.</p>
          </div>
          <div className="rounded"></div>
          <div className="section">
            <h1>Pièce de viande</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum arcu felis, rutrum a venenatis eu, auctor at lorem.</p>
          </div>
          <div className="rounded"></div>
          <div className="section">
            <h1>Pièce de viande</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum arcu felis, rutrum a venenatis eu, auctor at lorem.</p>
          </div>
        </div>
        <div className="main">
          <Image className="img" src="/menu.png" alt="Home Image" width={50}  height={45} />
          <div className="roundedgray"></div>
          <div className="container">
            <button onClick={()=> back()}>◄</button>
            <Image src={name} alt="carousel" width={500} height={50} />
            <button onClick={() => next()}>►</button>
          </div>
          <div className="roundedgray"></div>
          <div className="article">
          <h1>À la une</h1>
            <div className="prop">
              <ProductList/>
            </div>
          </div>
          <Foot/>
        </div>
      </body>
    </>
  );
}