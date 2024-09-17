import Image from "next/image"
import AddToCard from "../AddToCard/AddToCard"

function Produit() {

    return(
        <div className="produit">
            <div className="description">
                <h1>Pièce de boeuf</h1>
                <div className="roundedblack"/>
                <div className="block">
                    <Image src="/boeuf.jpg" alt="product" width={200} height={50}/>
                    <div className="roundedv"/>
                    <div className="text">
                        <h1>Description</h1>
                        <p>La pièce de bœuf se présente sous la forme d'un épais morceau de viande d'un rouge profond et soutenu.
                        Sa texture ferme et compacte laisse deviner une chair tendre et savoureuse.
                        Des filaments de gras nacré parcourent la chair, promettant une explosion de saveurs fondantes.
                        Une fine couche de gras ambré recouvre la surface, prête à dégouliner de sucs lors de la cuisson.
                        L'arôme puissant et capiteux qui s'en dégage éveille instantanément les papilles gustatives.</p>
                    </div>
                </div>
            </div>
            <div className="details">
                <div className="text">
                    <h1>Détails</h1>
                    <div className="tab">
                        <h2>Prix au kg</h2>
                        <h2>??€/kg</h2>
                    </div>
                    <div className="roundedgray"/>
                    <div className="tab">
                        <h2>Viande</h2>
                        <h2>Boeuf</h2>
                    </div>
                    <div className="roundedgray"/>
                    <div className="tab">
                        <h2>Race</h2>
                        <h2>Charolaise</h2>
                    </div>
                </div>
                <AddToCard/>
            </div>
        </div>
    )
}

export default Produit