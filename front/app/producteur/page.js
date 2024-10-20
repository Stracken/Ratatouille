"use client";
import React from "react";
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import Cardprod from "@/componets/Cardprod/Cardprod";
import Image from "next/image";

export default function producteur() {
  return (
    <>
      <Head />
      <div className="classic">
        <Cardprod />
        <div className="article">
          <h1>Liste des produits</h1>
          <div className="prop">
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
            <Image src="/random.png" alt="Home Image" width={200} height={45} />
          </div>
        </div>
        <Foot />
      </div>
    </>
  );
}
