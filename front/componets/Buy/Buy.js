import Image from "next/image"

function Buy() {
    
    return (
        <div className="buy">
            <h1>Payer</h1>
            <Image src="/credit_card.png" alt="credit card" width={50}  height={50} />
        </div>
    )
}

export default Buy