import Image from "next/image";
import Link from "next/link";

function Head() {
    return (
        <div className="head">
            <div className="cate"><Image src="/search.png" alt="Home Image" width={30}  height={45} /></div>
            <div className="cate">
                <Link href="/"><Image src="/imagesmode.png" alt="Home Image" width={30}  height={45} /></Link>
                <h1>Bonjour</h1>
            </div>
            <div className="cate">
                <Link href="/historique"><Image src="/article.png" alt="Home Image" width={30}  height={45} /></Link>
                <Link href="/panier"><Image src="/shopping_cart.png" alt="Home Image" width={30}  height={45} /></Link>
                <Link href="/login"><Image src="/person.png" alt="Home Image" width={30}  height={45} /></Link>
            </div>
        </div>
    );
}

export default Head;