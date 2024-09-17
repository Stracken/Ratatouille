import Image from "next/image"
import Mapcard from "../Mapcard/Mapcard"

function Cardprod() {
    return (
        <div className="classic">
            <Image className="baniere" src="/font.jpg" alt="baniere" width={5000} height={1000}/>
            <div className="card">
                <Image className="profilpic" src="/farmer.jpg" alt="profil" width={100} height={45}/>
                <div className="cardcontenant">
                    <div className="cardsection">
                        <h1>Lorem Ipsum</h1>
                        <h2>Tel: 00 00 00 00 00</h2>
                        <h2>Mail: exemple@ex.fr</h2>
                    </div>
                    <div className="roundedgray"></div>
                    <div className="cardsection">
                        <Mapcard/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eros est. Aliquam non dui felis. Cras ac iaculis leo. Sed vitae fermentum justo. 
                        Vestibulum vel ornare libero. Morbi massa libero, dapibus aliquam justo quis, dignissim blandit velit. Sed quis rhoncus ligula. Pellentesque lobortis nisi enim, 
                        pellentesque luctus magna dictum.</p>
                    </div>
                </div>                
            </div>
            <div className="roundedblack"></div>
        </div>
    );
}

export default Cardprod