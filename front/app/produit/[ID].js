import { useParams } from 'next';
import Head from "@/componets/Head/head";
import Foot from "@/componets/Footer/foot";
import Cardprod from "@/componets/Cardprod/Cardprod";
import Image from "next/image";
import AddToCard from "@/componets/AddToCard/AddToCard";
import { getProducts } from '../api';

const Produit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProducts();
      const products = response.data;
      const product = products.find((product) => product.id === parseInt(id));
      setProduct(product);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Head />
      <div className="classic">
        <div className="produit">
          <div className="description">
            <h1>{product.nom}</h1>
            <div className="roundedblack"/>
            <div className="block">
              <Image src={product.image} alt="product" width={200} height={50}/>
              <div className="roundedv"/>
              <div className="text">
                <h1>Description</h1>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="text">
              <h1>Détails</h1>
              <div className="tab">
                <h2>Prix au kg</h2>
                <h2>{product.prix}€/kg</h2>
              </div>
              <div className="roundedgray"/>
              <div className="tab">
                <h2>Viande</h2>
                <h2>{product.viande}</h2>
              </div>
              <div className="roundedgray"/>
              <div className="tab">
                <h2>Race</h2>
                <h2>{product.race}</h2>
              </div>
            </div>
            <AddToCard/>
          </div>
        </div>
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
      </div>
      <Foot/>
    </div>
  );
};

export default Produit;