import Image from "next/image"
import { useState } from "react"

function Mod() {
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
        <div className="mod">
            <div className="addQ">
                <button onClick={()=> minus()}><Image src="/remove.png" alt="minus" width={35} height={45}/></button>
                <h1>{Q.toFixed(3)}</h1>
                <button onClick={()=> add()}><Image src="/add.png" alt="add" width={35} height={45}/></button>
            </div>
        </div>
    )
}

export default Mod