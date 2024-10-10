import Image from "next/image";
import Link from "next/link";

function Head() {
    return (
        <div className="head">
            <div className="cate"><Image src="/search.png" alt="Home Image" width={30}  height={45} /></div>
            <div className="cate">
                <Link href="/" legacyBehavior><Image src="/imagesmode.png" alt="Home Image" width={30}  height={45} /></Link>
                <h1>Bonjour</h1>
            </div>
            <div className="cate">
                <Link href="/historique" legacyBehavior><Image src="/article.png" alt="Home Image" width={30}  height={45} /></Link>
                <Link href="/panier" legacyBehavior><Image src="/shopping_cart.png" alt="Home Image" width={30}  height={45} /></Link>
                <Link href="/login" legacyBehavior><Image src="/person.png" alt="Home Image" width={30}  height={45} /></Link>
            </div>
        </div>
    );
}

export default Head;