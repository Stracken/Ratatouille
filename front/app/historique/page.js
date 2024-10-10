"use client";
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/footer";
import Image from "next/image";
import Link from "next/link";

export default function historique() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  const C = () => {
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  };

  return (
    <>
      <div className="remplissage">
        <div className="graybg">
          <div className="dog">
            <h1>Commande en cours</h1>
            <div className="prod">
              <Image
                src="/boeuf.jpg"
                alt="Home Image"
                width={200}
                height={45}
              />
              <div className="queen">
                <div className="hans">
                  <p>10 produits pour 100€</p>
                  <p>20 Novembre 2024 à 12:50</p>
                  <Link href="" legacyBehavior>
                    <h2>Voir le reçu</h2>
                  </Link>
                  <Link href="" legacyBehavior>
                    <h2>Télécharger la facture</h2>
                  </Link>
                </div>
                <div className="flex">
                  <h1>1</h1>
                  <div>
                    <h1>Cote de boeuf</h1>
                    <p>4,500 kg</p>
                    <p>60€</p>
                  </div>
                </div>
                <div className="roundedgray"></div>
              </div>
            </div>
            <button onClick={() => C()} class="collapsible">
              Détails
            </button>
            <div class="content">
              <Image
                src="/boeuf.jpg"
                alt="Home Image"
                width={200}
                height={45}
              />
              <Image
                src="/boeuf.jpg"
                alt="Home Image"
                width={200}
                height={45}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
