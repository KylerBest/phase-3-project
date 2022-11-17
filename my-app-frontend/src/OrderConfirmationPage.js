import React, {useState} from "react";

function OrderConfirmationPage({cart, setCart, updateCart, changePage, updateHistory}){
    const [name, setName] = useState("")

    function placeOrder(){
        fetch("http://localhost:9292/orders", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: name,
                cart: cart
            })
        })
            .then(r => r.json())
            .then(order => {
                setCart({})
                updateHistory(order)
                changePage()
            })
    }

    return (
        <div className="order-confirmation-page">
            <h1>Confirm Order</h1>
            <div className="cart">
                <h1>Cart</h1>
                <ul className="cart-items">
                    {Object.values(cart).map(product => 
                        <p key={product.id} className="cart-product"> 
                            <button className="remove-button" onClick={() => updateCart(product, -1)}>➖</button>
                            <button className="remove-button" onClick={() => updateCart(product, 1)}>➕</button>
                            {product.name} (${parseFloat(product.price).toFixed(2)})  <span className="amount">x{product.quantity}</span> 
                        </p>
                    )}
                </ul>
                <h2 className="total">Total: ${parseFloat(Object.values(cart).reduce((total, product) => total + product.price * product.quantity, 0)).toFixed(2)}</h2>
                <form className="name-form" onSubmit={e => e.preventDefault()}>
                    <label 
                        className="label"
                        htmlFor="name">
                            Enter Name:
                    </label>
                    <input 
                        className="enter-name" 
                        id="name" 
                        type="text"
                        placeholder="Name Required"
                        disabled={Object.values(cart).length < 1}
                        onChange={e => setName(e.target.value)}
                    />
                </form>
            </div>
            <button 
                disabled={name.length < 1 || Object.values(cart).length < 1} 
                className="order-button"
                onClick={() => placeOrder()}
            >
                Confirm Order
            </button>
        </div>
    )
}

export default OrderConfirmationPage