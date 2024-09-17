import Image from "next/image"
import { useState } from "react"

function AddToCard() {
    var [Q, setQ] = useState(1.100);

    function minus(){
        if (Q > 0.1) {
            setQ(Q - 0.1);
        }
    }

    function add(){
        setQ(Q + 0.1);
    }
    
    return (
        <div className="AddToCard">
            <div className="addQ">
                <button onClick={()=> minus()}><Image src="/remove.png" alt="minus" width={35} height={45}/></button>
                <h1>{Q.toFixed(3)}</h1>
                <button onClick={()=> add()}><Image src="/add.png" alt="add" width={35} height={45}/></button>
            </div>
            <div className="add">
                <Image src="/add_shopping_cart.png" alt="minus" width={30} height={45}/>
            </div>
        </div>
    )
}

export default AddToCard