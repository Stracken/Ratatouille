"use client";
import Map from "@/componets/Map";
import Head from "@/componets/Head/head";
import Footer from "@/componets/Footer/footer";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/componets/Carousel/Carousel";
import { useRouter } from "next/navigation";
import HomeProducts from "../componets/HomeProducts";
import { CartProvider } from "../context/CartContext";

export default function Home() {
  const [search, setSearch] = useState("");
  const [carousel, setCarousel] = useState([]);
  const [i, setI] = useState(0);
  const [name, setName] = useState(carousel[i]);
  const router = useRouter();

  // const back = () => {
  //   const newIndex = i === 0 ? carousel.length - 1 : i - 1;
  //   setI(newIndex);
  //   setName(carousel[newIndex]);
  // };

  // const next = () => {
  //   const newIndex = i === carousel.length - 1 ? 0 : i + 1;
  //   setI(newIndex);
  //   setName(carousel[newIndex]);
  // };

  const research = () => {
    // Utilisez l'état pour gérer la recherche
    console.log("Recherche:", search);
    // Ajoutez ici la logique pour traiter la recherche
  };

  const handleCategorySelect = (categoryId) => {
    console.log("Catégorie sélectionnée:", categoryId.title);
    router.push(`/product/${categoryId}`);
  };

  return (
    <CartProvider>
      <main>
        <Head />
        <Map/>
        <div className="search">
          <input
            id="place"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Mettez à jour l'état lors de la saisie
          />
          <Link href="/producteur" legacyBehavior>
            <Image
              onClick={research}
              src="/search.png"
              alt="Home Image"
              width={30}
              height={45}
            />
          </Link>
        </div>
        <div className="sug">
          {/* Sections répétées */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="section">
              <h1>Pièce de viande</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="rounded"></div>
            </div>
          ))}
        </div>
        <div className="main">
          <Image
            className="img"
            src="/menu.png"
            alt="Home Image"
            width={50}
            height={45}
          />
          <div className="roundedgray"></div>
          <h1 className="title" style={{ fontWeight: "bold" }}>
            Vos catégories
          </h1>
          <div className="container">
            <Carousel onCategorySelect={handleCategorySelect} />
          </div>
          <div className="roundedgray"></div>
          <div className="article">
            <h1>Nos produits récents</h1>
            <HomeProducts />
          </div>
          <div className="roundedgray"></div>
          <div className="article">
            <h1>À proximité</h1>
            <div className="prop">
              {Array.from({ length: 7 }).map((_, index) => (
                <Image
                  key={index}
                  src="/random.png"
                  alt="Home Image"
                  width={200}
                  height={45}
                />
              ))}
            </div>
            <div className="roundedgray"></div>
          </div>
          {/* Répétez pour les catégories */}
          <Footer />
        </div>
      </main>
    </CartProvider>
  );
}
