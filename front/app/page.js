"use client"
import Map from "@/componets/Map";
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import React, { useState } from "react"
import Image from "next/image";
import  Link from 'next/link'

export default function Home() {
  var [search,  setSearch] = React.useState("");
  var [carousel, setCarousel] = React.useState(["/south.jpg","/7.jpg","/once.jpg"]);
  var [i, setI] = React.useState(0);
  var [name, setName] = React.useState(carousel[i]);

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
            <h1>Pour vous</h1>
            <div className="prop">
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              <Image src="/random.png" alt="Home Image" width={200}  height={45} />
            </div>
          </div>
            <div className="roundedgray"></div>
            <div className="article">
              <h1>À proximité</h1>
              <div className="prop">
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              </div>
              <div className="roundedgray"></div>
            </div>
            <div className="article">
              <h1>Vos catégories</h1>
              <div className="prop">
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
                <Image src="/random.png" alt="Home Image" width={200}  height={45} />
              </div>
              <div className="roundedgray"></div>
            </div>
            <Foot/>
        </div>
      </body>
    </>
  );
}
