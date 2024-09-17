"use client"
import Head from "@/componets/Head/head"
import Foot from "@/componets/Footer/foot"
import Cardprod from "@/componets/Cardprod/Cardprod"
import Produit from "@/componets/Produit/Produit"
import Image from "next/image"

export default function produit() {

    return (
        <>
        <Head/>
        <div className="classic">
            <Produit/>
            <Cardprod/>
            <div className="article">
                <h1>Liste des produits</h1>
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
        <Foot/>
        </div>
        </>
    )
}