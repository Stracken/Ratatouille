"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Foot() {
  return (
    <>
      <div className="footer">
        <div className="About">
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingBottom: "10px",
            }}
          >
            Catégories
          </h2>
          <Link href="/about" className="linkFooter">
            <h1>Boucherie</h1>
          </Link>
          <Link href="/contactez-nous" className="linkFooter">
            <h1>Fruits</h1>
          </Link>
          <Link href="/mentions_legales" className="linkFooter">
            <h1>Légumes</h1>
          </Link>
          <Link href="/cookies" className="linkFooter">
            <h1>Viandes</h1>
          </Link>
          <Link href="/cookies" className="linkFooter">
            <h1>Céréales</h1>
          </Link>
          <Link href="/cookies" className="linkFooter">
            <h1>Produits Laitiers</h1>
          </Link>
          <Link href="/cookies" className="linkFooter">
            <h1>Produits Sucrés</h1>
          </Link>
        </div>
        <div className="About">
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingBottom: "10px",
            }}
          >
            A Propos
          </h2>
          <Link href="/about" className="linkFooter">
            <h1>About</h1>
          </Link>
          <Link href="/signup" className="linkFooter">
            <h1>Vous etes producteur ?</h1>
          </Link>
          <Link href="/contactez-nous" className="linkFooter">
            <h1>Contactez-nous</h1>
          </Link>
          <Link href="/mentions_legales" className="linkFooter">
            <h1>Mentions Légales</h1>
          </Link>
          <Link href="/cookies" className="linkFooter">
            <h1>Cookies</h1>
          </Link>
        </div>
        <div className="About">
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingBottom: "10px",
            }}
          >
            Contactez-Nous
          </h2>

          <p>Nous répondrons a vos questions</p>

          <h1>7 jours sur 7 de 9h à 22h</h1>

          <ul>
            <li>Adresse : 123 Rue de la République, 75001 Paris</li>
            <Link href="/cookies" className="linkFooter">
              <li>
              <FontAwesomeIcon color="white" icon={faPhone} /> 01 01 01 01 01
              </li>
            </Link>
            <Link href="/cookies" className="linkFooter">
              <li>
              <FontAwesomeIcon icon={faEnvelope}/> contact@terroterro.com
              </li>
            </Link>
          </ul>
        </div>
        <div className="About" style={{}}>
          <div style={{display:'flex',flexDirection:"row",width:"200", height:"200" }}>
            <Image src="/logoInstagram.png" alt="instagram logo" width={80} height={80} style={{backgroundColor:"#038D00"}}/>
            <Image src="/logofb.png" alt="facebook logo" width={80} height={80}/>
          </div>
          <h1>© 2024 TERROTERRO - TOUS DROITS RESERVES</h1>
        </div>
      </div>
    </>
  );
}

export default Foot;
